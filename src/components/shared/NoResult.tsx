import Image from "next/image";
import React from "react";
import ButtonAskQuestion from "./ButtonAskQuestion";

export default function NoResult({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-full justify-center items-center text-center gap-2 mt-10">
      <Image
        alt="Image No Results Found"
        src="/assets/images/dark-illustration.png"
        width={280}
        height={280}
        className="hidden dark:block w-[80%] h-auto object-contain"
      />
      <Image
        alt="Image No Results Found"
        src="/assets/images/light-illustration.png"
        width={280}
        height={280}
        className="block dark:hidden w-[80%] h-auto object-contain"
      />
      <h2 className="h2-bold mt-8 text-dark300_light900">{title}</h2>
      <p className="body-regular text-dark500_light700 max-w-md">
        {description}
      </p>
      <ButtonAskQuestion
        link="/ask-question"
        linkTitle="Ask a Question"
        className="mt-6 justify-center"
      />
    </div>
  );
}
