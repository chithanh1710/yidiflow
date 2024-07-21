"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

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
