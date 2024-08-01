import { type ClassValue, clsx } from "clsx";
import { Schema } from "mongoose";
import { Types } from "mongoose";
import { twMerge } from "tailwind-merge";
import { getCurrentUser } from "./actions/user.action";
import { notFound } from "next/navigation";

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

export async function upVote_DownVote_Save({
  upVotes,
  downVotes,
  questionId,
}: {
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  questionId: any;
}) {
  const user = await getCurrentUser();
  let _id, saved;
  if (user) {
    _id = user._id;
    saved = user.saved;
  } else return {};
  const hasUpVoted = upVotes.find(
    (item) => getIdToString(item) === getIdToString(_id)
  );
  const hasDownVoted = downVotes.find(
    (item) => getIdToString(item) === getIdToString(_id)
  );
  if (saved) {
    const hasSaved = saved.find(
      (item) => getIdToString(item) === getIdToString(questionId)
    );
    return { hasDownVoted, hasSaved, hasUpVoted };
  } else return { hasDownVoted, hasUpVoted };
}

export const scrollToElementWithOffset = (selector: string, offset: number) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export function Skip(page: number, pageSize: number): number {
  if (page <= 0) {
    notFound();
  } else {
    return (page - 1) * pageSize;
  }
}
