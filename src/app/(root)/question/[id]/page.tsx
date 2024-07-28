import { ListAnswerCard } from "@/components/cards/ListAnswerCard";
import { AnswerQuestion } from "@/components/forms/AnswerQuestion";
import BounceLoading from "@/components/loading/BounceLoading";
import { Filter } from "@/components/shared/Filter";
import { MetricContent } from "@/components/shared/MetricContent";
import ParseHTML from "@/components/shared/ParseHTML";
import { TagQuestion } from "@/components/shared/TagQuestion";
import { AnswerFilters } from "@/constants/filters";
import { getQuestionById } from "@/lib/actions/question.action";
import { getIdToString, upVote_DownVote_Save } from "@/lib/utils";
import { URLProps } from "@/types";
import Image from "next/image";
import { Suspense } from "react";
import { Votes } from "../../../../components/shared/Votes";

export default async function page({ params, searchParams }: URLProps) {
  const { id } = params;
  const dataQuestion = await getQuestionById(id);
  const {
    _id: idQuestion,
    tags,
    upVotes,
    views,
    downVotes,
    title,
    content,
    author,
    answers,
    createAt,
  } = dataQuestion;

  const { name, username, email, picture, _id: idAuthor } = author;
  const { hasDownVoted, hasUpVoted, hasSaved } = await upVote_DownVote_Save({
    questionId: idQuestion,
    downVotes,
    upVotes,
  });
  return (
    <>
      <div className="flex justify-between flex-wrap items-center gap-6 max-sm:flex-col-reverse">
        <div className="max-sm:self-start">
          <MetricContent
            img={picture}
            alt="Image user"
            classNameP="paragraph-semibold text-dark300_light700"
            author={{ _id: getIdToString(idAuthor), name, picture, username }}
          />
        </div>
        <Votes
          pageID={id}
          type="question"
          hasDownVoted={!!hasDownVoted}
          hasUpVoted={!!hasUpVoted}
          hasSaved={!!hasSaved}
          itemId={getIdToString(idQuestion)}
          downVotes={downVotes}
          upVotes={upVotes}
        />
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end mt-5 mb-8">
        <MetricContent
          alt="Clock icon"
          img="/assets/icons/clock.svg"
          createAt={createAt}
        />
        <MetricContent
          alt="Message icon"
          img="/assets/icons/message.svg"
          title="Answers"
          value={answers.length}
        />
        <MetricContent
          alt="View icon"
          img="/assets/icons/eye.svg"
          title="Views"
          value={views}
        />
      </div>
      <section>
        <ParseHTML content={content} />
        <div className="flex gap-4">
          {tags.map((tag) => (
            <TagQuestion
              _id={getIdToString(tag._id)}
              key={getIdToString(tag._id)}
            />
          ))}
        </div>
      </section>
      <section id="section-answer" className="my-10">
        <div className="flex justify-end">
          <Filter isShowListButton={false} dataList={AnswerFilters} />
        </div>
        <Suspense
          key={id + searchParams.filter}
          fallback={
            <div className="flex py-10 justify-center items-center">
              <BounceLoading />
            </div>
          }
        >
          <ListAnswerCard filter={searchParams.filter} id={id} />
        </Suspense>
      </section>
      <section>
        <div className="flex justify-between items-center my-10 max-sm:flex-col max-sm:items-start gap-6">
          <p className="paragraph-semibold text-dark400_light800">
            Write your answer here
          </p>
          <button className="max-sm:w-full inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 bg-slate-900 hover:bg-slate-900/90 dark:bg-slate-50 dark:hover:bg-slate-50/90 h-9 btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
            <Image
              src="/assets/icons/stars.svg"
              alt="Star icon"
              width={12}
              height={12}
            />
            <p>Generate AI answer</p>
          </button>
        </div>
        <AnswerQuestion idQuestion={getIdToString(idQuestion)} />
      </section>
    </>
  );
}
