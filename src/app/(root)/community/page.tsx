import { Filter } from "@/components/shared/Filter";
import { Search } from "@/components/shared/Search";
import { TagQuestion } from "@/components/shared/TagQuestion";
import { UserFilters } from "@/constants/filters";
import { getAllUser } from "@/lib/actions/user.action";
import { getIdToString } from "@/lib/utils";
import Image from "next/image";

export default async function page() {
  const allUser = await getAllUser({});
  console.log(allUser[0].saved[0].tags[0]);
  // return (
  //   <>
  //     <h1 className="h1-bold text-dark100_light900">All Users</h1>
  //     <div className="mt-10 flex justify-between gap-5 lg:flex-col lg:items-start max-sm:flex-col sm:items-center">
  //       <Search route="q" placeholder="Search amazing minds here..." />
  //       <Filter dataList={UserFilters} />
  //     </div>
  //     <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mt-10">
  //       {allUser.map((user) => (
  //         <div
  //           key={user.clerkId}
  //           className="h-[300px] rounded-xl bg-dark-300 border border-dark-400 flex flex-col gap-2 justify-between items-center p-6"
  //         >
  //           <Image
  //             className="rounded-full object-cover bg-yellow-200"
  //             alt={`Image ${user.name}`}
  //             src={user.picture}
  //             width={96}
  //             height={96}
  //           />
  //           {user.saved.map((question) => {
  //             return (
  //               <TagQuestion
  //                 _id={getIdToString(question)}
  //                 key={getIdToString(question)}
  //               />
  //             );
  //           })}
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}
