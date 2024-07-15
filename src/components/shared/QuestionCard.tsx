import { Button } from "../ui/button";
import Image from "next/image";
import { IQuestionType } from "@/interfaces/IQuestionType";
import Link from "next/link";

export function QuestionCard({ question }: { question: IQuestionType }) {
  const { _id, answers, author, createAt, tags, title, upVotes, views } =
    question;

  return (
    <div className="px-8 py-6 rounded-xl background-light900_dark200 shadow-light-300 dark:shadow-none">
      <h3 className="h3-bold text-dark100_light900 line-clamp-1">{title}</h3>
      <div className="my-4 flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag._id}`}>
            <Button className="uppercase text-[10px] px-5 h-8 text-light400_light500 background-light800_dark300 shadow">
              {tag.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center gap-6">
        <div className="flex gap-2">
          <Image
            alt={`Image user`}
            src="/assets/images/logo.png"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <p className="text-sm">{author}</p>
        </div>
        <div className="flex gap-4 text-dark100_light900 text-xs">
          <div className="flex gap-1">
            <Image
              alt={`Up vote icon`}
              src="/assets/icons/like.svg"
              width={16}
              height={16}
            />
            <p>
              <span>{upVotes}</span> Votes
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              alt={`Message vote icon`}
              src="/assets/icons/message.svg"
              width={16}
              height={16}
            />
            <p>
              <span>{answers}</span> Answers
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              alt={`View icon`}
              src="/assets/icons/eye.svg"
              width={16}
              height={16}
            />
            <p>
              <span>{views}</span> Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
