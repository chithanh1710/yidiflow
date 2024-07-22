"use server";

import { z } from "zod";
import { connectToDatabase } from "../mongoose";
import { formQuestionSchema } from "../validations";
import { auth } from "@clerk/nextjs/server";
import Question, { IQuestion } from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import { getUserById } from "./user.action";
import User, { IUser } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { GetQuestionsParams, QuestionFullParams } from "./shared.types";
import { PAGE_SIZE } from "@/constants";

export async function createQuestion(
  params: z.infer<typeof formQuestionSchema>
) {
  try {
    await connectToDatabase();
    const { userId } = auth();
    const mongoUser = await getUserById({ userId });
    if (!mongoUser?._id) throw new Error("Not found user");
    const { explanation: content, tags, title } = params;
    const question = await Question.create({
      title,
      content,
      author: mongoUser._id,
    });
    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        {
          $setOnInsert: { name: tag },
          $push: { question: question._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    await User.findOneAndUpdate(mongoUser._id, {
      $addToSet: { saved: question._id },
    });

    revalidatePath("/", "page");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestions(
  params: GetQuestionsParams
): Promise<QuestionFullParams[]> {
  const { page = 1, pageSize = PAGE_SIZE } = params;
  const skip = (page - 1) * pageSize;
  try {
    await connectToDatabase();
    const questions: QuestionFullParams[] = await Question.find({})
      .skip(skip)
      .limit(pageSize)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createAt: -1 })
      .lean();
    return questions;
  } catch (error) {
    console.error("Get question error", error);
    throw error;
  }
}

export async function getAuthorById(id: string): Promise<IUser> {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) throw new Error(id);
    return user;
  } catch (error) {
    console.error("Get question error", error);
    throw error;
  }
}

export async function getTag(id: string): Promise<ITag> {
  try {
    await connectToDatabase();
    const tag = await Tag.findById(id);
    if (!tag) throw new Error("Not found tag");
    return tag;
  } catch (error) {
    console.error("Get question error", error);
    throw error;
  }
}
