"use server";

import Answer, { IAnswer } from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";
import { GetAnswersParams } from "./shared.types";
import { PAGE_SIZE } from "@/constants";
import User, { IUser } from "@/database/user.model";
import Question from "@/database/question.model";

export async function createAnswer(params: {
  questionId: string;
  content: string;
}) {
  try {
    await connectToDatabase();
    const mongoUser = await getCurrentUser();
    if (!mongoUser || !mongoUser._id) throw new Error("You need to login");
    const { content, questionId } = params;
    const newAnswer = await Answer.create({
      content,
      author: mongoUser._id,
      question: questionId,
    });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(`/question/${questionId}`, "page");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllAnswerById(
  params: GetAnswersParams
): Promise<{ allAnswer: (IAnswer & { author: IUser })[]; totalPages: number }> {
  try {
    await connectToDatabase();
    const { questionId, page = 1, pageSize = PAGE_SIZE, sortBy } = params;
    const skip = (page - 1) * pageSize;
    let sort: any = {};
    switch (sortBy) {
      case "highestUpvotes":
        sort.upVotes = -1;
        break;
      case "lowestUpvotes":
        sort.upVotes = 1;
        break;
      case "recent":
        sort.createAt = -1;
        break;
      case "old":
        sort.createAt = 1;
        break;
      default:
        sort.upVotes = -1;
        sort.createAt = -1;
        break;
    }

    const countAnswer = await Answer.countDocuments({ question: questionId });
    const allAnswer = (await Answer.find({ question: questionId })
      .skip(skip)
      .limit(pageSize)
      .sort(sort)
      .populate<{ author: IUser }>({
        path: "author",
        model: User,
      })) as (IAnswer & { author: IUser })[];

    // await new Promise((res) => setTimeout(() => res(""), 3000));
    const totalPages = Math.ceil(countAnswer / pageSize);
    return { allAnswer, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
