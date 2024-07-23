import { TagQuestion } from "@/components/shared/TagQuestion";
import { getIdToString } from "@/lib/utils";
import Image from "next/image";

export function UserCard({ user }: { user: any }) {
  return (
    <article className="background-light900_dark200 light-border flex w-full h-full flex-col gap-3 items-center justify-center rounded-2xl border p-8">
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
