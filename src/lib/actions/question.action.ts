"use server";

import { any, number, z } from "zod";
import { connectToDatabase } from "../mongoose";
import { formQuestionSchema } from "../validations";
import Question, { IQuestion } from "@/database/question.model";
import Tag, { ITag } from "@/database/tag.model";
import User, { IUser } from "@/database/user.model";
import { revalidatePath } from "next/cache";
import {
  GetQuestionsParams,
  GetSavedQuestionsParams,
  QuestionFullParams,
} from "./shared.types";
import { PAGE_SIZE } from "@/constants";
import { getCurrentUser } from "./user.action";
import { Error, model } from "mongoose";
import page from "@/app/(root)/(home)/page";
import { skip } from "node:test";

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

    revalidatePath("/", "page");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestions(
  params: GetQuestionsParams
): Promise<{ questions: QuestionFullParams[]; totalPages: number }> {
  const {
    page = 1,
    pageSize = PAGE_SIZE,
    filter = "",
    searchQuery = "",
  } = params;
  const skip = (page - 1) * pageSize;
  try {
    await connectToDatabase();
    const { optionFilter, queryConditions } = queryOptionQuestion(
      filter,
      searchQuery
    );

    const totalItems = await Question.countDocuments(queryConditions);
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

    const totalPages = Math.ceil(totalItems / pageSize);
    return { questions, totalPages };
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

export async function incView(id: string) {
  try {
    await connectToDatabase();
    await Question.updateOne({ _id: id }, { $inc: { views: 1 } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCollections(
  params: GetQuestionsParams
): Promise<{ questions: QuestionFullParams[]; totalPages: number }> {
  const {
    filter = "",
    page = 1,
    pageSize = PAGE_SIZE,
    searchQuery = "",
  } = params;

  const { optionFilter, queryConditions } = queryOptionCollection(
    filter,
    searchQuery
  );

  const { _id } = await getCurrentUser();
  const skip = (page - 1) * pageSize;
  const { saved: questions } = (await User.findById(_id).populate({
    path: "saved",
    model: Question,
    match: queryConditions,
    options: { sort: optionFilter, skip, limit: pageSize },
    populate: { path: "tags", model: Tag },
  })) as IUser & {
    saved: QuestionFullParams[];
  };

  const totalQuestions = await Question.countDocuments({
    _id: { $in: questions.map((q: any) => q._id) },
    ...queryConditions,
  });

  const totalPages = Math.ceil(totalQuestions / pageSize);

  return { questions, totalPages };
}

function queryOptionQuestion(filter: string, searchQuery: string) {
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
  return { optionFilter, queryConditions };
}

function queryOptionCollection(filter: string, searchQuery: string) {
  let optionFilter: any = {};
  let queryConditions: any = {
    title: { $regex: searchQuery, $options: "i" },
  };

  switch (filter) {
    case "most_recent":
      optionFilter.createAt = -1; // Sắp xếp giảm dần theo ngày tạo (mới nhất)
      break;
    case "oldest":
      optionFilter.createAt = 1; // Sắp xếp tăng dần theo ngày tạo (cũ nhất)
      break;
    case "most_voted":
      optionFilter.upVotes = -1; // Sắp xếp giảm dần theo số lượng vote
      break;
    case "most_viewed":
      optionFilter.views = -1; // Sắp xếp giảm dần theo số lượng lượt xem
      break;
    case "most_answered":
      optionFilter.answers = -1; // Sắp xếp giảm dần theo số lượng câu trả lời
      break;
    default:
      optionFilter.createAt = -1; // Mặc định sắp xếp giảm dần theo ngày tạo (mới nhất)
  }

  return { optionFilter, queryConditions };
}
