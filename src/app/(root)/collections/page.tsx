import { Search } from "@/components/shared/Search";
import { Filter } from "@/components/shared/Filter";
import { QuestionFilters } from "@/constants/filters";
import ButtonAskQuestion from "@/components/shared/ButtonAskQuestion";
import { SearchParamsProps } from "@/types";
import { ListQuestion } from "../../../components/shared/ListQuestion";

export default async function page({ searchParams }: SearchParamsProps) {
  const { q = "", filter = "", page = 1 } = searchParams;
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Question</h1>
        <ButtonAskQuestion link="/ask-question" linkTitle="Ask a Question" />
      </div>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="q" placeholder="Search questions..." />
        <Filter dataList={QuestionFilters} />
      </div>
      <ListQuestion
        isCollection={true}
        q={q}
        filter={filter}
        page={Number(page)}
      />
    </>
  );
}
