"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { notFound, usePathname } from "next/navigation";

export default function PaginationPage({
  totalPages,
  curPage,
}: {
  totalPages: number;
  curPage: number;
}) {
  const pathname = usePathname();
  if (totalPages > 0 && (curPage <= 0 || curPage > totalPages)) notFound();
  return (
    totalPages > 1 && (
      <Pagination className="mt-10 mb-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => curPage - 1 > 0 || e.preventDefault()}
              className={`!text-light-500 ${
                curPage - 1 > 0
                  ? "background-light800_dark300 shadow border dark:border-none font-semibold"
                  : "!bg-white dark:!bg-black cursor-not-allowed select-none"
              }`}
              href={`${pathname}?page=${curPage - 1}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={`body-medium text-dark200_light800 ${
                curPage - 1 > 0 ? "" : "hidden"
              }`}
              href={`${pathname}?page=${curPage - 1}`}
            >
              {curPage - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={`body-medium !text-white !bg-primary-500`}
              href={`${pathname}?page=${curPage}`}
            >
              {curPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className={`body-medium text-dark200_light800 ${
                curPage < totalPages ? "" : "hidden"
              }`}
              href={`${pathname}?page=${curPage + 1}`}
            >
              {curPage + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={(e) => curPage < totalPages || e.preventDefault()}
              className={`!text-light-500 ${
                curPage < totalPages
                  ? "background-light800_dark300 shadow border dark:border-none font-medium"
                  : "!bg-white dark:!bg-black cursor-not-allowed select-none"
              }`}
              href={`${pathname}?page=${curPage + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
