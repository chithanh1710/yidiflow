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
import { error } from "console";

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
          $push: { questions: question._id },
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
  const {
    page = 1,
    pageSize = PAGE_SIZE,
    filter = "",
    searchQuery = "",
  } = params;
  const skip = (page - 1) * pageSize;
  try {
    await connectToDatabase();
    let optionFilter = {};
    let queryConditions: any = {
      title: { $regex: searchQuery, $options: "i" },
    };
    switch (filter) {
      case "newest":
        optionFilter = { createdAt: -1 };
        break;
      case "recommended":
        optionFilter = { views: -1 };
        break;
      case "frequent":
        optionFilter = { answers: -1 };
        break;
      case "unanswered":
        optionFilter = { createdAt: -1 };
        queryConditions.answers = { $size: 0 };
        break;
      default:
        optionFilter = { createdAt: -1 };
    }
    const questions: QuestionFullParams[] = await Question.find(queryConditions)
      .skip(skip)
      .limit(pageSize)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort(optionFilter)
      .lean();
    return questions;
  } catch (error) {
    console.error("Get question error", error);
    throw error;
  }
}
