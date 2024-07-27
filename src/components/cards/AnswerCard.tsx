import { getIdToString } from "@/lib/utils";
import React from "react";
import { MetricContent } from "../shared/MetricContent";
import { IAnswer } from "@/database/answer.model";
import { IUser } from "@/database/user.model";
import ParseHTML from "../shared/ParseHTML";

export default function AnswerCard({
  answer,
}: {
  answer: IAnswer & {
    author: IUser;
  };
}) {
  const { _id, author, upVotes, downVotes, createAt, content } = answer;
  const { picture, _id: idAuthor, name, username } = author;
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
          <div className="flex items-center gap-4">
            <MetricContent
              alt="Up vote icon"
              img="/assets/icons/upVote.svg"
              title="Up vote"
              isPageQuestionId={true}
              value={upVotes.length}
              classNameP="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1"
            />
            <MetricContent
              alt="Down vote icon"
              img="/assets/icons/downVote.svg"
              title="Down vote"
              isPageQuestionId={true}
              value={downVotes.length}
              classNameP="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1"
            />
          </div>
        </div>
      </div>
      <ParseHTML content={content} />
    </article>
  );
}
