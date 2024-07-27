import { getIdToString } from "@/lib/utils";
import React from "react";
import { MetricContent } from "../shared/MetricContent";
import { IAnswer } from "@/database/answer.model";
import { IUser } from "@/database/user.model";

export default function AnswerCard({
  answer,
}: {
  answer: IAnswer & {
    author: IUser;
  };
}) {
  const { _id, author, upVotes, downVotes, createAt } = answer;
  const { picture, _id: idAuthor, name, username } = author;
  return (
    <article
      className="light-border border-b py-10"
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
        <div className="flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end">
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
      <div
        className="markdown w-full min-w-full undefined"
        dangerouslySetInnerHTML={{ __html: answer.content }}
      />
    </article>
  );
}
