import { type ClassValue, clsx } from "clsx";
import { Schema } from "mongoose";
import { Types } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export function getIdToString(id: unknown): string {
  if (id instanceof Types.ObjectId) {
    return id.toString();
  }
  throw new Error("Invalid ID");
}

export function upVote_DownVote_Save({
  upVotes,
  downVotes,
  saved,
  authorId,
  questionId,
}: {
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  saved?: Schema.Types.ObjectId[];
  authorId: any;
  questionId: any;
}) {
  const hasUpVoted = upVotes.find(
    (item) => getIdToString(item) === getIdToString(authorId)
  );
  const hasDownVoted = downVotes.find(
    (item) => getIdToString(item) === getIdToString(authorId)
  );
  if (saved) {
    const hasSaved = saved.find(
      (item) => getIdToString(item) === getIdToString(questionId)
    );
    return { hasDownVoted, hasSaved, hasUpVoted };
  } else return { hasDownVoted, hasUpVoted };
}
