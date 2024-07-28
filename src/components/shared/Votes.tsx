import { MetricContent } from "@/components/shared/MetricContent";
import { handleVoteOrSave } from "@/lib/actions/vote.action";
import { Schema } from "mongoose";

export function Votes({
  upVotes,
  downVotes,
  itemId,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
  type,
}: {
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  itemId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
  type: "question" | "answer";
}) {
  return (
    <form
      className={
        type === "question"
          ? "flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end"
          : "flex items-center gap-4"
      }
      action={handleVoteOrSave}
    >
      <button
        name="typeAction"
        value={JSON.stringify({ name: "upVote", value: hasUpVoted })}
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
        value={JSON.stringify({ name: "downVote", value: hasDownVoted })}
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
          value={JSON.stringify({ name: "upVote", value: hasSaved })}
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
