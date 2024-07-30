import { QuestionCard } from "@/components/cards/QuestionCard";
import { Filter } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import PaginationPage from "@/components/shared/PaginationPage";
import { Search } from "@/components/shared/Search";
import { TagFilters } from "@/constants/filters";
import { getAllQuestionByTag } from "@/lib/actions/tag.action";
import { getIdToString } from "@/lib/utils";
import { URLProps } from "@/types";
import { Suspense } from "react";
import { ListSkeletonHomePage } from "@/components/skeleton/SkeletonHomePage";
import { notFound } from "next/navigation";

export default async function page({ params, searchParams }: URLProps) {
  const { id, name: nameNoDecode } = params;
  const name = decodeURIComponent(nameNoDecode || "");
  const { q = "", page = 1, filter = "" } = searchParams;
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 uppercase">{name}</h1>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="q" placeholder="Search tag questions..." />
        <Filter dataList={TagFilters} />
      </div>
      <ListQuestionByTag
        name={name}
        filter={filter}
        id={id}
        page={Number(page)}
        q={q}
      />
    </>
  );
}

async function ListQuestionByTag({
  id,
  q,
  filter,
  page,
  name,
}: {
  id: string;
  q: string;
  filter: string;
  page: number;
  name: string;
}) {
  const { tags, totalPages } = await getAllQuestionByTag({
    id,
    searchQuery: q,
    filter,
    page: Number(page),
  });

  if (name !== tags.name) return notFound();

  return (
    <Suspense key={id + q + filter + page} fallback={<ListSkeletonHomePage />}>
      <div className="mt-12 flex flex-col gap-6">
        {tags.questions.length > 0 ? (
          tags.questions.map((question: any) => (
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
      <PaginationPage curPage={Number(page)} totalPages={totalPages} />
    </Suspense>
  );
}
