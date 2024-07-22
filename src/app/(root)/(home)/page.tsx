import { Search } from "@/components/shared/Search";
import { HomeFilter } from "@/components/shared/HomeFilter";
import { HomePageFilters } from "@/constants/filters";
import { QuestionCard } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import ButtonAskQuestion from "@/components/shared/ButtonAskQuestion";
import { getQuestions } from "@/lib/actions/question.action";
import { getIdToString } from "@/lib/utils";

export default async function page() {
  const questions = await getQuestions({ page: 1, pageSize: 10 });
  console.log(questions);
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
            <QuestionCard
              key={getIdToString(question._id)}
              question={question}
            />
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
