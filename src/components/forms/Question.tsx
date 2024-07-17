"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { formQuestionSchema } from "@/lib/validations";
import { useEffect, useState } from "react";
import { QuillEditor } from "./QuillEditor";
import { X } from "lucide-react";

export default function Question() {
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const form = useForm<z.infer<typeof formQuestionSchema>>({
    resolver: zodResolver(formQuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  useEffect(() => {
    form.setValue("tags", tags);
    form.setValue("explanation", text);
  }, [tags, form, text]);

  function onSubmit(values: z.infer<typeof formQuestionSchema>) {
    console.log(values);
    form.reset();
    setTags([]);
    setText("");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Title..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re ask a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <QuillEditor setValue={setText} value={text} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              {field.value.length < 20 && (
                <FormMessage className="text-red-500" />
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (tags.length < 3) {
                        e.preventDefault();
                        const value = e.currentTarget.value;
                        setTags((prev) => [...prev, value]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Add tags..."
                />
              </FormControl>
              {tags.length > 0 ? (
                <div className="flex gap-4 !mt-6">
                  {tags.map((tag, i) => (
                    <div
                      className="px-4 py-1 bg-primary-500 flex items-center gap-2 rounded-md text-light-900"
                      key={i}
                    >
                      {tag}
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setTags((prev) =>
                            prev.filter((_, index) => index !== i)
                          );
                        }}
                        variant="ghost"
                        className="px-2 py-0.5"
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Add up to 3 tags to describe what your question is about.
                    You need to press enter to add a tag
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
