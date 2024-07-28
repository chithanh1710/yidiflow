import { getIdToString, upVote_DownVote_Save } from "@/lib/utils";
import React from "react";
import { MetricContent } from "../shared/MetricContent";
import { IAnswer } from "@/database/answer.model";
import { IUser } from "@/database/user.model";
import ParseHTML from "../shared/ParseHTML";
import { Votes } from "@/components/shared/Votes";

export default async function AnswerCard({
  answer,
  pageID,
}: {
  answer: IAnswer & {
    author: IUser;
  };
  pageID: string;
}) {
  const { _id, author, upVotes, downVotes, createAt, content } = answer;
  const { picture, _id: idAuthor, name, username } = author;
  const { hasDownVoted, hasUpVoted } = await upVote_DownVote_Save({
    questionId: _id,
    downVotes,
    upVotes,
  });
  return (
    <article
      className="light-border border-b py-4"
      key={getIdToString(answer._id)}
    >
      <div className="flex justify-between flex-wrap items-center gap-6 max-sm:flex-col-reverse">
        <div className="max-sm:self-start">
          <MetricContent
            createAt={createAt}
            typePage="answered"
            img={picture}
            alt="Image user"
            classNameP="paragraph-semibold text-dark300_light700"
            author={{
              _id: getIdToString(idAuthor),
              name,
              picture,
              username,
            }}
          />
        </div>

        <div className="text-dark100_light900 text-xs flex justify-between items-center max-sm:w-full">
          <div className="sm:hidden">
            <MetricContent
              alt="Clock icon"
              img="/assets/icons/clock.svg"
              typePage="Answered"
              createAt={createAt}
              classNameImg="!hidden"
              classNameP="small-regular text-light400_light500 line-clamp-1"
            />
          </div>

          <Votes
            pageID={pageID}
            type="answer"
            hasDownVoted={!!hasDownVoted}
            hasUpVoted={!!hasUpVoted}
            itemId={getIdToString(_id)}
            downVotes={downVotes}
            upVotes={upVotes}
          />
        </div>
      </div>
      <ParseHTML content={content} />
    </article>
  );
}
