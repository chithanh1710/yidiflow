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
import { useRouter } from "next/navigation";
import React from "react";
import { createAnswer } from "@/lib/actions/answer.action";

const formSchema = z.object({
  explanation: z.string().min(10, {
    message: "Explanation must be at least 10 characters.",
  }),
});

export function AnswerQuestion({ idQuestion }: { idQuestion: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      explanation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitting(true);
    form.reset();

    try {
      await createAnswer({
        content: values.explanation,
        questionId: idQuestion,
      });
    } catch (error) {
      console.error(error);
      throw error;
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
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem{" "}
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
