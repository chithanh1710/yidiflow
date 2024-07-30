"use client";
import { MetricContent } from "@/components/shared/MetricContent";
import { handleVoteOrSave } from "@/lib/actions/vote.action";
import { Schema } from "mongoose";
import toast from "react-hot-toast";

export function Votes({
  upVotes,
  downVotes,
  itemId,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
  type,
  pageID,
}: {
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  itemId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
  type: "question" | "answer";
  pageID: string;
}) {
  return (
    <form
      className={
        type === "question"
          ? "flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end"
          : "flex items-center gap-4"
      }
      action={async (formData) => {
        const data = formData.get("typeAction") as string;
        const { name, value } = JSON.parse(data);
        await toast.promise(handleVoteOrSave(formData), {
          loading: "Submitting your vote...",
          success: value ? "Vote removed successfully!" : `${name} successful!`,
          error: "An error occurred. Please try again.",
        });
      }}
    >
      <button
        name="typeAction"
        value={JSON.stringify({
          pageID,
          name: "Up vote",
          type,
          value: hasUpVoted,
          itemId,
        })}
      >
        <MetricContent
          alt="Up vote icon"
          img={
            hasUpVoted
              ? "/assets/icons/upVoted.svg"
              : "/assets/icons/upVote.svg"
          }
          title="Up vote"
          isPageQuestionId={true}
          value={upVotes.length}
          classNameP="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1"
        />
      </button>
      <button
        name="typeAction"
        value={JSON.stringify({
          pageID,
          name: "Down vote",
          value: hasDownVoted,
          type,
          itemId,
        })}
      >
        <MetricContent
          alt="Down vote icon"
          img={
            hasDownVoted
              ? "/assets/icons/downVoted.svg"
              : "/assets/icons/downVote.svg"
          }
          title="Down vote"
          isPageQuestionId={true}
          value={downVotes.length}
          classNameP="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1"
        />
      </button>
      {typeof hasSaved !== "undefined" && (
        <button
          name="typeAction"
          value={JSON.stringify({
            pageID,
            name: "Save",
            value: hasSaved,
            type,
            itemId,
          })}
        >
          <MetricContent
            alt="View icon"
            img={
              hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            classNameImg="text-primary-500"
          />
        </button>
      )}
    </form>
  );
}
