"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Search({
  route,
  placeholder,
  className,
}: {
  route: string;
  placeholder: string;
  className?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const param = new URLSearchParams(searchParams.toString());
      if (search !== "") {
        param.set(route, search);
      } else {
        param.delete(route);
      }
      router.replace(`${pathname}?${param.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, pathname, searchParams, router, route]);

  return (
    <div
      className={cn(
        "flex gap-6 text-light400_light500 background-light800_dark300 h-14 p-4 rounded-xl w-full",
        className
      )}
    >
      <label htmlFor={"search" + route + placeholder}>
        <Image
          alt="Search icon"
          src="assets/icons/search.svg"
          width={26}
          height={26}
        />
      </label>
      <input
        className="bg-transparent w-full outline-none"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        id={"search" + route + placeholder}
        placeholder={placeholder}
      />
    </div>
  );
}
