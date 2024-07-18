"use server";

import { z } from "zod";
import { connectToDatabase } from "../mongoose";
import { formQuestionSchema } from "../validations";
import { currentUser } from "@clerk/nextjs/server";

export async function createQuestion({
  explanation,
  tags,
  title,
}: z.infer<typeof formQuestionSchema>) {
  try {
    await connectToDatabase();
    const user = await currentUser();
    const newQuestion = {
      actor_name: user?.fullName,
      email: user?.emailAddresses,
      explanation,
      tags,
      title,
      createDate: new Date().toISOString(),
    };
    console.log(user?.fullName);
  } catch (error) {
    throw error;
  }
}
