import Link from "next/link";
import { Button } from "../ui/button";

export function TagQuestion({ tag }: { tag: { _id: string; name: string } }) {
  return (
    <Link key={tag._id} href={`/tags/${tag._id}`}>
      <Button className="uppercase text-[10px] px-5 h-8 text-light400_light500 background-light800_dark300 shadow">
        {tag.name}
      </Button>
    </Link>
  );
}
