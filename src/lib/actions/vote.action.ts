"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { getCurrentUser } from "./user.action";
import { revalidatePath } from "next/cache";

export async function handleVoteOrSave(formData: FormData) {
  const data = formData.get("typeAction") as string;
  const { name, type, value, itemId, pageID } = JSON.parse(data);
  const { _id: userId } = await getCurrentUser();
  if (type === "question") {
    switch (name) {
      case "upVote":
        if (value) {
          // TH: ĐÃ TỒN TẠI
          // XOÁ NÓ RA KHỎI upVotes
          await Question.updateOne(
            { _id: itemId },
            { $pull: { upVotes: userId } }
          );
        } else {
          // TH: KHÔNG TỒN TẠI
          const question = await Question.findOne({ _id: itemId });

          if (question?.downVotes.includes(userId)) {
            // NẾU TỒN TẠI TRONG downVotes THÌ XOÁ ĐI
            await Question.updateOne(
              { _id: itemId },
              { $pull: { downVotes: userId } }
            );
          }

          // CUỐI CÙNG LÀ THÊM VÀO upVotes
          await Question.updateOne(
            { _id: itemId },
            { $addToSet: { upVotes: userId } }
          );
        }
        break;
      case "downVote":
        if (value) {
          // TH: ĐÃ TỒN TẠI
          // XOÁ NÓ RA KHỎI downVotes
          await Question.updateOne(
            { _id: itemId },
            { $pull: { downVotes: userId } }
          );
        } else {
          // TH: KHÔNG TỒN TẠI
          const question = await Question.findOne({ _id: itemId });

          if (question?.upVotes.includes(userId)) {
            // NẾU TỒN TẠI TRONG upVotes THÌ XOÁ ĐI
            await Question.updateOne(
              { _id: itemId },
              { $pull: { upVotes: userId } }
            );
          }

          // CUỐI CÙNG LÀ THÊM VÀO downVotes
          await Question.updateOne(
            { _id: itemId },
            { $addToSet: { downVotes: userId } }
          );
        }
        break;
      case "save":
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
        console.error("Action error");
        throw new Error("Action unknown");
    }
  } else {
    switch (name) {
      case "upVote":
        if (value) {
          // TH: ĐÃ TỒN TẠI
          // XOÁ NÓ RA KHỎI upVotes
          await Answer.updateOne(
            { _id: itemId },
            { $pull: { upVotes: userId } }
          );
        } else {
          // TH: KHÔNG TỒN TẠI
          const answer = await Answer.findOne({ _id: itemId });

          if (answer?.downVotes.includes(userId)) {
            // NẾU TỒN TẠI TRONG downVotes THÌ XOÁ ĐI
            await Answer.updateOne(
              { _id: itemId },
              { $pull: { downVotes: userId } }
            );
          }

          // CUỐI CÙNG LÀ THÊM VÀO upVotes
          await Answer.updateOne(
            { _id: itemId },
            { $addToSet: { upVotes: userId } }
          );
        }
        break;
      case "downVote":
        if (value) {
          // TH: ĐÃ TỒN TẠI
          // XOÁ NÓ RA KHỎI downVotes
          await Answer.updateOne(
            { _id: itemId },
            { $pull: { downVotes: userId } }
          );
        } else {
          // TH: KHÔNG TỒN TẠI
          const answer = await Answer.findOne({ _id: itemId });

          if (answer?.upVotes.includes(userId)) {
            // NẾU TỒN TẠI TRONG upVotes THÌ XOÁ ĐI
            await Answer.updateOne(
              { _id: itemId },
              { $pull: { upVotes: userId } }
            );
          }

          // CUỐI CÙNG LÀ THÊM VÀO downVotes
          await Answer.updateOne(
            { _id: itemId },
            { $addToSet: { downVotes: userId } }
          );
        }
        break;
      default:
        console.error("Action error");
        throw new Error("Action unknown");
    }
  }

  revalidatePath(`/question/${pageID}`, "page");
}
