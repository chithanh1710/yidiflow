import { QuestionCard } from "@/components/cards/QuestionCard";
import { Filter } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { Search } from "@/components/shared/Search";
import { TagFilters } from "@/constants/filters";
import { getAllQuestionByTag } from "@/lib/actions/tag.action";
import { getIdToString } from "@/lib/utils";
import { URLProps } from "@/types";

export default async function page({ params, searchParams }: URLProps) {
  const { id } = params;
  const { q } = searchParams;
  const allQuestionByTag = await getAllQuestionByTag({ id, searchQuery: q });
  console.log(allQuestionByTag);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        {allQuestionByTag?.name}
      </h1>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="q" placeholder="Search tag questions..." />
        <Filter dataList={TagFilters} />
      </div>
      <div className="mt-12 flex flex-col gap-6">
        {allQuestionByTag.questions.length > 0 ? (
          allQuestionByTag.questions.map((question: any) => (
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