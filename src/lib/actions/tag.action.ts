import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams } from "./shared.types";
import { PAGE_SIZE } from "@/constants";
import { error } from "console";
import Question from "@/database/question.model";
import { notFound } from "next/navigation";

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
    const skip = (page - 1) * pageSize;
    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { follower: -1 };
        break;
      case "recent":
        sortOptions = { createOn: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createOn: 1 };
        break;
      default:
        sortOptions = { follower: -1 };
        break;
    }
    const tags = await Tag.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    return tags;
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
    const skip = (page - 1) * pageSize;
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
