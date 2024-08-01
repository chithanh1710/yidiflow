import { Filter } from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import PaginationPage from "@/components/shared/PaginationPage";
import { Search } from "@/components/shared/Search";
import { TagFilters } from "@/constants/filters";
import { getAllTag } from "@/lib/actions/tag.action";
import { getIdToString } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

export default async function page({ searchParams }: SearchParamsProps) {
  const { filter, q, page = 1 } = searchParams;
  const { tags: allTag, totalPages } = await getAllTag({
    filter: filter,
    page: Number(page),
    searchQuery: q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="q" placeholder="Search by tag name..." />
        <Filter dataList={TagFilters} />
      </div>
      {allTag.length > 0 ? (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 mt-10">
          {allTag.map((tag) => (
            <article
              key={getIdToString(tag._id)}
              className="background-light900_dark200 shadow-light100_darknone light-border flex w-full flex-col gap-3 items-start justify-center rounded-2xl border p-8"
            >
              <Link
                href={`/tags/${encodeURIComponent(tag.name)}/${tag._id}`}
                className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5"
              >
                <p className="paragraph-semibold text-dark300_light900">
                  {tag.name}
                </p>
              </Link>
              <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">
                  {tag.questions.length}+
                </span>
                Questions
              </p>
            </article>
          ))}
        </section>
      ) : (
        <NoResult
          description="No tags available. Be the first to create a new tag and get started!"
          title="No tags have been created yet"
        />
      )}
      <PaginationPage curPage={Number(page)} totalPages={totalPages} />
    </>
  );
}
