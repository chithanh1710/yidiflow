import { UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";
import BounceLoading from "../loading/BounceLoading";

export const QuillEditor = ({
  value,
  form,
  formAnswer,
  disabled,
}: {
  disabled: boolean;
  value: string;
  form?: UseFormReturn<
    {
      title: string;
      explanation: string;
      tags: string[];
    },
    any,
    undefined
  >;
  formAnswer?: UseFormReturn<
    {
      explanation: string;
    },
    any,
    undefined
  >;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
    "color",
    "background",
  ];

  if (disabled)
    return (
      <div className="flex justify-center items-center p-6">
        <BounceLoading />
      </div>
    );

  return form ? (
    <div>
      <ReactQuill
        className="rounded-md background-light900_dark300 text-dark400_light800"
        value={value}
        onChange={(value) => {
          form.setValue("explanation", value);
        }}
        onBlur={(e) => {
          if (e && e?.index < 20) {
            form.setError("explanation", {
              type: "required",
              message: "String must contain at least 20 character(s)",
            });
          } else {
            form.clearErrors("explanation");
          }
        }}
        modules={modules}
        formats={formats}
      />
    </div>
  ) : (
    formAnswer && (
      <div>
        <ReactQuill
          className="rounded-md background-light900_dark300 text-dark400_light800"
          value={value}
          onChange={(value) => {
            formAnswer.setValue("explanation", value);
          }}
          onBlur={(e) => {
            if (e && e?.index < 20) {
              formAnswer.setError("explanation", {
                type: "required",
                message: "String must contain at least 20 character(s)",
              });
            } else {
              formAnswer.clearErrors("explanation");
            }
          }}
          modules={modules}
          formats={formats}
        />
      </div>
    )
  );
};
