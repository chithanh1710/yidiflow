import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const hotQuestions = [
  {
    _id: 1,
    title: "test 1",
  },
  {
    _id: 2,
    title: "test 2",
  },
  {
    _id: 3,
    title: "test 3",
  },
  {
    _id: 4,
    title: "test 4",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "test 1",
    totalQuestion: 3,
  },
  {
    _id: 2,
    name: "test 2",
    totalQuestion: 6,
  },
  {
    _id: 3,
    name: "test 3",
    totalQuestion: 9,
  },
  {
    _id: 4,
    name: "test 4",
    totalQuestion: 10,
  },
];

export default function RightSidebar() {
  return (
    <section className="sticky w-[330px] h-screen flex-shrink-0 custom-scrollbar overflow-y-auto background-light900_dark200 light-border border-l shadow-light-300 dark:shadow-none top-0 right-0 p-6 pt-36 max-xl:hidden ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Hot Network</h3>
        <div className="flex flex-col gap-4 mt-4">
          {hotQuestions.map((item) => (
            <Link
              className="flex w-full justify-between items-center gap-6 cursor-pointer"
              key={item._id}
              href={"/questions/" + item._id}
            >
              <span className="body-medium text-dark500_light700">
                {item.title}
              </span>
              <span className="body-medium text-dark500_light700">
                <Image
                  alt="Chevron right icon"
                  src="/assets/icons/chevron-right.svg"
                  width={26}
                  height={26}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-4">
          {popularTags.map((item) => (
            <Link
              className="flex w-full justify-between items-center gap-6 cursor-pointer"
              key={item._id}
              href={"/tags/" + item._id}
            >
              <Button variant="secondary">
                <span className="body-medium text-dark500_light700">
                  {item.name}
                </span>
              </Button>
              <span className="body-medium text-dark500_light700">
                {item.totalQuestion > 100
                  ? item.totalQuestion + "+"
                  : item.totalQuestion}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
