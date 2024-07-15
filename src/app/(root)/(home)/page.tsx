import { Search } from "@/components/shared/Search";
import { HomeFilter } from "@/components/shared/HomeFilter";
import { HomePageFilters } from "@/constants/filters";
import { QuestionCard } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import ButtonAskQuestion from "@/components/shared/ButtonAskQuestion";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      {
        _id: "1",
        name: "python",
      },
      {
        _id: "2",
        name: "sql",
      },
    ],
    author: { _id: "1", picture: "", name: "John Doe" },
    upVotes: 9612312312,
    answers: [],
    views: 61534,
    createAt: new Date("2024-07-02T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How do I use express as a custom in NextJS?",
    tags: [
      {
        _id: "1",
        name: "nextjs",
      },
      {
        _id: "2",
        name: "sql",
      },
    ],
    author: { _id: "1", picture: "", name: "Chi Thanh" },
    upVotes: 54135,
    answers: [],
    views: 1531231,
    createAt: new Date("2022-09-01T12:00:00.000Z"),
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
        {questions.length > 0 ? (
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
