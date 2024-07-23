import Link from "next/link";
import { Button } from "../ui/button";
import { getTag } from "@/lib/actions/tag.action";

export async function TagQuestion({ _id }: { _id: string }) {
  const { name } = await getTag(_id);
  return (
    <Link href={`/tags/${_id}`}>
      <Button className="uppercase text-[10px] px-5 h-8 text-light400_light500 background-light800_dark300 shadow">
        {name}
      </Button>
    </Link>
  );
}
