"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Filter({
  dataList,
}: {
  dataList: { value: string; name: string }[];
}) {
  const [curValue, setCurValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "";
    if (curValue !== currentFilter) {
      if (curValue) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", curValue);
        router.replace(pathname + "?" + params, { scroll: false });
      } else {
        setCurValue(currentFilter);
      }
    }
  }, [curValue, pathname, router, searchParams]);

  return (
    <>
      <div className="lg:hidden block">
        <Select value={curValue} onValueChange={(value) => setCurValue(value)}>
          <SelectTrigger className="body-regular light-border h-14 sm:w-48 w-full px-5 py-2.5 rounded-xl text-dark500_light700 background-light800_dark300">
            <SelectValue placeholder="Select a Filter" />
          </SelectTrigger>
          <SelectContent>
            {dataList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden gap-3 lg:flex w-full overflow-x-auto max-w-full mt-5">
        {dataList.map((item) => (
          <Button
            onClick={() => setCurValue(item.value)}
            className={`px-6 py-3 hover:!bg-primary-500 hover:!text-light-900 font-semibold tracking-wide ${
              item.value === curValue
                ? "!text-primary-500 bg-primary-500/10 dark:bg-dark-400"
                : "text-light400_light500 background-light800_dark300"
            }   `}
            key={item.value}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
}
