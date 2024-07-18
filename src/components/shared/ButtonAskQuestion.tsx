import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function ButtonAskQuestion({
  className,
  link,
  linkTitle,
}: {
  className?: string;
  link: string;
  linkTitle: string;
}) {
  return (
    <Link
      href={link}
      className={cn("flex justify-end max-sm:w-full", className)}
    >
      <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
        {linkTitle}
      </Button>
    </Link>
  );
}
