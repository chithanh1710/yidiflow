import { TagQuestion } from "@/components/shared/TagQuestion";
import { getIdToString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function UserCard({ user }: { user: any }) {
  return (
    <article className="background-light900_dark200 shadow-light100_darknone light-border rounded-2xl border p-8">
      <Link
        href={`/profile/${user._id}`}
        className="flex flex-col items-center gap-4"
      >
        <Image
          className="rounded-full object-cover bg-yellow-200"
          alt={`Image ${user.name}`}
          src={user.picture}
          width={96}
          height={96}
        />
        <h3 className="h3-bold text-dark200_light900 line-clamp-1">
          {user.name}
        </h3>
        <p className="body-regular text-dark500_light500">@{user.username}</p>
      </Link>
      <div className="mt-2 flex gap-3">
        {user.saved
          .flatMap((item: any) => item.tags)
          .map(
            (tag: any, i: number) =>
              i < 3 && (
                <TagQuestion
                  _id={getIdToString(tag)}
                  key={getIdToString(tag)}
                />
              )
          )}
      </div>
    </article>
  );
}
