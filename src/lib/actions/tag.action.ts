import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams } from "./shared.types";
import { PAGE_SIZE } from "@/constants";
import Question from "@/database/question.model";
import { notFound } from "next/navigation";
import { Skip } from "../utils";
import { match } from "assert";

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

export async function getAllTag(params: GetAllTagsParams) {
  try {
    await connectToDatabase();
    const { filter, page = 1, pageSize = PAGE_SIZE, searchQuery = "" } = params;

    const queryConditions = { name: { $regex: searchQuery, $options: "i" } };
    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: 1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      default:
        sortOptions = { questions: 1 };
        break;
    }

    const skip = Skip(page, pageSize);
    const totalItems = await Tag.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalItems / pageSize);

    const tags = await Tag.find(queryConditions)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    return { tags, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllQuestionByTag({
  id,
  pageSize = PAGE_SIZE,
  searchQuery = "",
  page = 1,
  filter,
}: {
  page?: number;
  id: string;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}) {
  try {
    await connectToDatabase();

    let queryConditions: any = {
      title: { $regex: searchQuery, $options: "i" },
    };
    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { views: -1 };
        break;
      case "recent":
        sortOptions = { createAt: -1 };
        break;
      case "name":
        sortOptions = { title: 1 };
        break;
      case "old":
        sortOptions = { createAt: 1 };
        break;
      default:
        sortOptions = { createAt: -1 };
        break;
    }

    const skip = Skip(page, pageSize);

    const tags = await Tag.findById(id).populate({
      path: "questions",
      model: Question,
      match: { title: { $regex: searchQuery, $options: "i" } },
      options: { skip: skip, limit: pageSize, sort: sortOptions },
    });

    if (!tags) notFound();

    const totalItems = await Question.countDocuments({
      _id: { $in: tags?.questions.map((question: any) => question._id) },
      ...queryConditions,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    return { tags, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
