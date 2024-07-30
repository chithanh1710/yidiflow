"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { PAGE_SIZE } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import console from "console";
import { Document, Schema } from "mongoose";

export async function getAllUser(params: GetAllUsersParams) {
  try {
    await connectToDatabase();
    const { filter, page = 1, pageSize = PAGE_SIZE, searchQuery } = params;
    const skip = (page - 1) * pageSize;
    let query: any = {};

    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }

    if (filter === "newUser") {
      query.joinedAt = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) };
    } else if (filter === "oldUser") {
      query.joinedAt = { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) };
    } else if (filter === "topContributors") {
      query.reputation = { $gt: 0 };
    }

    const totalItems = await User.countDocuments(query);
    const allUser = await User.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ joinedAt: -1 })
      .populate({
        path: "saved",
        model: Question,
      });
    const totalPages = Math.ceil(totalItems / pageSize);
    return { allUser, totalPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = auth();
    const mongoUser = await getUserById({ userId });
    return mongoUser;
  } catch (error) {
    console.error(error);
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

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(userParams);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(userParams: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, path, updateData } = userParams;
    const newUser = await User.findOneAndUpdate(
      { clerkId: clerkId },
      updateData,
      { new: true }
    );

    revalidatePath(path, "page");
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteUser(userParams: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = userParams;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) throw new Error("User not found");

    const userQuestionIds = await Question.find({
      author: user._id,
    }).distinct("_id");

    await Question.deleteMany({ author: user._id });

    const deletedUser = User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
