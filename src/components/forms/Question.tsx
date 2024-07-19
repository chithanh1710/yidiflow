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
import { KeyboardEvent, useCallback, useState } from "react";
import { QuillEditor } from "./QuillEditor";
import { X } from "lucide-react";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter } from "next/navigation";

export default function Question() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formQuestionSchema>>({
    resolver: zodResolver(formQuestionSchema),
    defaultValues: {
      title: "123456",
      explanation: "123416551413851351351",
      tags: ["123", "456"],
    },
  });

  async function onSubmit(values: z.infer<typeof formQuestionSchema>) {
    setIsSubmitting(true);
    form.reset();

    try {
      await createQuestion(values);
      router.push("/");
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const { value } = e.currentTarget;
        if (value !== "" && value.length < 15) {
          if (form.getValues("tags").length < 3) {
            form.setValue("tags", [...form.getValues("tags"), value]);
            form.clearErrors("tags");
            e.currentTarget.value = "";
          } else {
            form.setError("tags", {
              message: "You cannot enter more than 3 tags",
            });
          }
        } else {
          form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
      }
    },
    [form]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <QuillEditor form={form} value={field.value} />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  disabled={isSubmitting || field.value.length >= 3}
                  onKeyDown={handleKeyDown}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Add tags..."
                />
              </FormControl>
              {field.value.length > 0 && (
                <div className="flex gap-4 !mt-6">
                  {field.value.map((tag, i) => (
                    <div
                      className="px-4 py-1 bg-primary-500 flex items-center gap-2 rounded-md text-light-900 text-sm"
                      key={i}
                    >
                      <span>{tag}</span>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          form.setValue(
                            "tags",
                            field.value.filter((_, index) => index !== i)
                          );
                        }}
                        variant="ghost"
                        className="px-2 py-2 h-full"
                      >
                        <X width={14} height={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
