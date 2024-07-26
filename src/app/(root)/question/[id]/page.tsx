import { MetricContent } from "@/components/shared/MetricContent";
import ParseHTML from "@/components/shared/ParseHTML";
import { TagQuestion } from "@/components/shared/TagQuestion";
import { getQuestionById } from "@/lib/actions/question.action";
import { getIdToString } from "@/lib/utils";
import { ParamsProps } from "@/types";

export default async function page({ params }: ParamsProps) {
  const { id } = params;
  const data = await getQuestionById(id);
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
  } = data;
  const { name, username, email, picture, _id: idAuthor } = author;
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
            value={answers.length}
            classNameP="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1"
          />
          <MetricContent
            alt="View icon"
            img="/assets/icons/star-red.svg"
            classNameImg="text-primary-500"
          />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {title}
      </h2>
      <div className="flex flex-wrap gap-4 text-dark100_light900 text-xs max-sm:self-end mt-5 mb-8">
        <MetricContent
          alt="Up vote icon"
          img="/assets/icons/clock.svg"
          title="Votes"
          value={upVotes.length}
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
    </>
  );
}
