import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "@/components/shared/Search";
import { HomeFilter } from "@/components/shared/HomeFilter";
import { HomePageFilters } from "@/constants/filters";
import { QuestionCard } from "@/components/shared/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import ButtonAskQuestion from "@/components/shared/ButtonAskQuestion";

const questions = [
  {
    _id: 1,
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      {
        _id: 1,
        name: "python",
      },
      {
        _id: 2,
        name: "sql",
      },
    ],
    author: "John Doe",
    upVotes: 10,
    answers: 2,
    views: 100,
    createAt: "2021-09-01T12:00:00.000Z",
  },
  {
    _id: 2,
    title: "How do I use express as a custom in NextJS?",
    tags: [
      {
        _id: 1,
        name: "nextjs",
      },
      {
        _id: 2,
        name: "sql",
      },
    ],
    author: "Chi Thanh",
    upVotes: 10,
    answers: 2,
    views: 100,
    createAt: "2022-09-01T12:00:00.000Z",
  },
];

export default function page() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <ButtonAskQuestion link="/ask-question" linkTitle="Ask a Question" />
      </div>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="/ask-questions" placeholder="Search questions..." />
        <HomeFilter dataList={HomePageFilters} />
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {questions.length < 0 ? (
          questions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          />
        )}
      </div>
    </>
  );
}
