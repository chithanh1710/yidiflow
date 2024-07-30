import { QuestionCard } from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import PaginationPage from "@/components/shared/PaginationPage";
import { getCollections, getQuestions } from "@/lib/actions/question.action";
import { QuestionFullParams } from "@/lib/actions/shared.types";
import { getIdToString } from "@/lib/utils";
import { Suspense } from "react";
import { ListSkeletonHomePage } from "../skeleton/SkeletonHomePage";

export async function ListQuestion({
  q,
  filter,
  page,
  isCollection,
}: {
  q: string;
  filter: string;
  page: number;
  isCollection: boolean;
}) {
  let dataQuestions: QuestionFullParams[];
  let dataTotalPages: number;
  if (isCollection) {
    const { questions, totalPages } = await getCollections({
      page: Number(page),
      searchQuery: q,
      filter,
    });
    dataQuestions = questions;
    dataTotalPages = totalPages;
  } else {
    const { questions, totalPages } = await getQuestions({
      page: Number(page),
      searchQuery: q,
      filter,
    });
    dataQuestions = questions;
    dataTotalPages = totalPages;
  }
  return (
    <Suspense fallback={<ListSkeletonHomePage />} key={q + filter + page}>
      <div className="mt-12 flex flex-col gap-6">
        {dataQuestions.length > 0 ? (
          dataQuestions.map((question) => (
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
      <PaginationPage curPage={Number(page) || 1} totalPages={dataTotalPages} />
    </Suspense>
  );
}
