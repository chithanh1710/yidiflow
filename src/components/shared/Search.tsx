"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Search({
  route,
  placeholder,
  className,
}: {
  route: string;
  placeholder: string;
  className?: string;
}) {
  const id = Math.random();
  return (
    <div
      className={cn(
        "flex gap-6 text-light400_light500 background-light800_dark300 h-14 p-4 rounded-xl w-full",
        className
      )}
    >
      <label htmlFor={"search" + route + placeholder + id}>
        <Image
          alt="Search icon"
          src="assets/icons/search.svg"
          width={26}
          height={26}
        />
      </label>
      <input
        className="bg-transparent w-full outline-none"
        onChange={() => {}}
        type="text"
        id={"search" + route + placeholder + id}
        placeholder={placeholder}
      />
    </div>
  );
}
