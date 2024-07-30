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
import { useState } from "react";
import { QuillEditor } from "./QuillEditor";
import React from "react";
import { createAnswer } from "@/lib/actions/answer.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { scrollToElementWithOffset } from "@/lib/utils";

const formSchema = z.object({
  answer: z.string().min(10, {
    message: "Answer must be at least 10 characters.",
  }),
});

export function AnswerQuestion({ idQuestion }: { idQuestion: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      form.reset();
      await toast.promise(
        createAnswer({
          content: values.answer,
          questionId: idQuestion,
        }),
        {
          loading: "Submitting your answer...",
          success: () => {
            router.replace(`/question/${idQuestion}?filter=recent`, {
              scroll: false,
            });
            scrollToElementWithOffset("#section-answer", 200);
            return "Answer submitted successfully!";
          },
          error: (err) =>
            err.message ||
            "An error occurred while submitting your answer. Please try again.",
        }
      );
    } catch (error) {
      console.error("Answer Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed answer of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <QuillEditor
                  disabled={isSubmitting}
                  formAnswer={form}
                  value={field.value}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 10 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            disabled={isSubmitting}
            className="!bg-primary-500 !text-white "
            type="submit"
          >
            Post Answer
          </Button>
        </div>
      </form>
    </Form>
  );
}
