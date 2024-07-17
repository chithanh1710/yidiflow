import { UseFormReturn } from "react-hook-form";
import ReactQuill from "react-quill";

export const QuillEditor = ({
  value,
  form,
}: {
  value: string;
  form: UseFormReturn<
    {
      title: string;
      explanation: string;
      tags: string[];
    },
    any,
    undefined
  >;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
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
  ];
  return (
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
  );
};
