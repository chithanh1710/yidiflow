"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";

export async function handleVoteOrSave(formData: FormData) {
  try {
    const mongoUser = await getCurrentUser();
    if (!mongoUser || !mongoUser._id) throw new Error("You need to login");

    const data = formData.get("typeAction") as string;
    if (!data) throw new Error("No action data found");

    const parsedData = JSON.parse(data);
    const { name, type, value, itemId, pageID } = parsedData;
    const { _id: userId } = mongoUser;

    if (type === "question") {
      const question = await Question.findOne({ _id: itemId });
      if (!question) throw new Error("Question not found");

      switch (name) {
        case "Up vote":
          if (value) {
            await Question.updateOne(
              { _id: itemId },
              { $pull: { upVotes: userId } }
            );
          } else {
            if (question.downVotes.includes(userId)) {
              await Question.updateOne(
                { _id: itemId },
                { $pull: { downVotes: userId } }
              );
            }
            await Question.updateOne(
              { _id: itemId },
              { $addToSet: { upVotes: userId } }
            );
          }
          break;
        case "Down vote":
          if (value) {
            await Question.updateOne(
              { _id: itemId },
              { $pull: { downVotes: userId } }
            );
          } else {
            if (question.upVotes.includes(userId)) {
              await Question.updateOne(
                { _id: itemId },
                { $pull: { upVotes: userId } }
              );
            }
            await Question.updateOne(
              { _id: itemId },
              { $addToSet: { downVotes: userId } }
            );
          }
          break;
        case "Save":
          if (value) {
            await User.updateOne({ _id: userId }, { $pull: { saved: itemId } });
          } else {
            await User.updateOne(
              { _id: userId },
              { $addToSet: { saved: itemId } }
            );
          }
          break;
        default:
          throw new Error("Unknown action name");
      }
    } else {
      const answer = await Answer.findOne({ _id: itemId });
      if (!answer) throw new Error("Answer not found");

      switch (name) {
        case "Up vote":
          if (value) {
            await Answer.updateOne(
              { _id: itemId },
              { $pull: { upVotes: userId } }
            );
          } else {
            if (answer.downVotes.includes(userId)) {
              await Answer.updateOne(
                { _id: itemId },
                { $pull: { downVotes: userId } }
              );
            }
            await Answer.updateOne(
              { _id: itemId },
              { $addToSet: { upVotes: userId } }
            );
          }
          break;
        case "Down vote":
          if (value) {
            await Answer.updateOne(
              { _id: itemId },
              { $pull: { downVotes: userId } }
            );
          } else {
            if (answer.upVotes.includes(userId)) {
              await Answer.updateOne(
                { _id: itemId },
                { $pull: { upVotes: userId } }
              );
            }
            await Answer.updateOne(
              { _id: itemId },
              { $addToSet: { downVotes: userId } }
            );
          }
          break;
        default:
          throw new Error("Unknown action name");
      }
    }

    await revalidatePath(`/question/${pageID}`);
  } catch (error) {
    console.error("Server Error:", error);
    throw error;
  }
}
