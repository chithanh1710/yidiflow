"use client";

import { incView } from "@/lib/actions/question.action";
import Link from "next/link";

export default function LinkIncView({
  _id,
  title,
}: {
  _id: string;
  title: string;
}) {
  return (
    <Link onClick={async () => await incView(_id)} href={`/question/${_id}`}>
      {title}
    </Link>
  );
}
