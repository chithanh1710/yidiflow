import Image from "next/image";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { TagQuestion } from "../shared/TagQuestion";
import Link from "next/link";
import { formatAndDivideNumber, getIdToString } from "@/lib/utils";
import { getAuthorById } from "@/lib/actions/user.action";
import { QuestionFullParams } from "@/lib/actions/shared.types";

export async function QuestionCard({
  question,
}: {
  question: QuestionFullParams;
}) {
  const { answers, author, createAt, tags, title, upVotes, views, _id } =
    question;
  const tagsFormat = Array.from(new Set(tags));
  const { picture, name } = await getAuthorById(getIdToString(author._id));
  return (
    <div className="card-wrapper rounded-xl p-9 sm:px-11 text-dark100_light900">
      <span className="sm:hidden text-xs capitalize">
        {formatDistanceToNow(createAt, { addSuffix: true })}
      </span>
      <h3 className="h3-bold text-dark100_light900 line-clamp-1">
        <Link href={`/ask-question/${_id}`}>{title}</Link>
      </h3>
      <div className="my-6 flex gap-2 flex-wrap">
        {tagsFormat.map((tag) => (
          <TagQuestion
            _id={getIdToString(tag._id)}
            key={getIdToString(tag._id)}
          />
        ))}
      </div>
      <div className="flex justify-between flex-wrap items-center gap-6">
        <MetricContent
          img={picture}
          alt="Image user"
          createAt={createAt}
          author={{ _id: getIdToString(author._id), name, picture }}
        />
        <div className="flex flex-wrap gap-4 text-dark100_light900 text-xs">
          <MetricContent
            alt="Up vote icon"
            img="/assets/icons/like.svg"
            title="Votes"
            value={upVotes.length}
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
      </div>
    </div>
  );
}

function MetricContent({
  value,
  title,
  img,
  alt,
  createAt,
  author,
}: {
  value?: number;
  title?: string;
  img: string;
  alt: string;
  createAt?: Date;
  author?: { _id: string; picture: string; name: string };
}) {
  return author && createAt ? (
    <Link className="flex gap-2" href={`/profile/${author._id}`}>
      <Image
        alt={alt}
        src={img}
        width={24}
        height={24}
        className="rounded-full object-cover"
      />
      <p className="text-sm flex text-dark100_light900 gap-1 items-center flex-wrap">
        {author.name}
        <span className="max-sm:hidden flex">
          <Dot />
          asked {formatDistanceToNow(createAt, { addSuffix: true })}
        </span>
      </p>
    </Link>
  ) : (
    <div className="flex gap-1">
      <Image alt={alt} src={img} width={16} height={16} />
      <p>
        <span>{formatAndDivideNumber(value || 0)}</span> {title}
      </p>
    </div>
  );
}
