"use server";

import { z } from "zod";
import { connectToDatabase } from "../mongoose";
import { formQuestionSchema } from "../validations";
import Question, { IQuestion } from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User, { IUser } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { GetQuestionsParams, QuestionFullParams } from "./shared.types";
import { PAGE_SIZE } from "@/constants";
import { getCurrentUser } from "./user.action";
import { Error } from "mongoose";

export async function createQuestion(
  params: z.infer<typeof formQuestionSchema>
) {
  try {
    await connectToDatabase();
    const mongoUser = await getCurrentUser();
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
    let optionFilter: any = {};
    let queryConditions: any = {
      title: { $regex: searchQuery, $options: "i" },
    };
    switch (filter) {
      case "newest":
        optionFilter.createAt = -1;
        break;
      case "recommended":
        optionFilter.views = -1;
        break;
      case "frequent":
        optionFilter.answers = -1;
        break;
      case "unanswered":
        optionFilter.createAt = -1;
        queryConditions.answers = { $size: 0 };
        break;
      default:
        optionFilter.createAt = -1;
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

export async function getQuestionById(id: string): Promise<QuestionFullParams> {
  try {
    await connectToDatabase();
    const question: QuestionFullParams | null = await Question.findById(id)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "tags",
        model: Tag,
      })
      .lean();
    if (!question) throw new Error("Not found data");
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
