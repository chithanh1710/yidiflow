"use client";
import { MetricContent } from "@/components/shared/MetricContent";
import { handleVoteOrSave } from "@/lib/actions/vote.action";
import { Schema } from "mongoose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { count } from "console";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (count > 2) router.push("/sign-in");
  }, [count, router]);
  return (
    <form
      className={
        type === "question"
          ? "flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end"
          : "flex items-center gap-4"
      }
      action={(formData) => {
        setIsSubmitting(true);
        const data = formData.get("typeAction") as string;
        const { name, value } = JSON.parse(data);
        toast.promise(handleVoteOrSave(formData), {
          loading: `Submitting your ${name.toLowerCase()}...`,
          success: () => {
            setIsSubmitting(false);
            return value ? "Vote removed successfully!" : `${name} successful!`;
          },
          error: (error) => {
            setCount((c) => c + 1);
            setIsSubmitting(false);
            toast((t) => (
              <div className="flex items-center gap-2">
                <p>
                  Please <b>log in</b> to continue.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push("/sign-in");
                  }}
                >
                  Login
                </Button>
              </div>
            ));
            return error.message || "An error occurred. Please try again.";
          },
        });
      }}
    >
      <button
        disabled={isSubmitting}
        name="typeAction"
        className="disabled:cursor-not-allowed"
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
        disabled={isSubmitting}
        name="typeAction"
        className="disabled:cursor-not-allowed"
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
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed"
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
