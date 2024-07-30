import { Filter } from "@/components/shared/Filter";
import { Search } from "@/components/shared/Search";
import { UserFilters } from "@/constants/filters";
import { getAllUser } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import { UserCard } from "../../../components/cards/UserCard";
import PaginationPage from "@/components/shared/PaginationPage";
import { Suspense } from "react";
import BounceLoading from "@/components/loading/BounceLoading";

export default async function page({ searchParams }: SearchParamsProps) {
  const { q = "", page = 1, filter = "" } = searchParams;
  const { allUser, totalPages } = await getAllUser({
    searchQuery: q,
    filter,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
        <Search route="q" placeholder="Search amazing minds here..." />
        <Filter dataList={UserFilters} />
      </div>
      <ListUser
        filter={filter}
        q={q}
        allUser={allUser}
        page={Number(page)}
        totalPages={totalPages}
      />
    </>
  );
}

function ListUser({
  allUser,
  totalPages,
  page,
  q,
  filter,
}: {
  allUser: any;
  totalPages: number;
  page: number;
  q: string;
  filter: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-14">
          <BounceLoading />
        </div>
      }
      key={page + q + filter}
    >
      {allUser.length > 0 ? (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-10">
          {allUser.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))}
        </section>
      ) : (
        <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center mt-10">
          <p>No users yet</p>
          <Link href="sign-up" className="text-accent-blue mt-2 font-bold">
            Join to be the first!
          </Link>
        </div>
      )}
      {totalPages > 1 && (
        <PaginationPage curPage={Number(page) || 1} totalPages={totalPages} />
      )}
    </Suspense>
  );
}
