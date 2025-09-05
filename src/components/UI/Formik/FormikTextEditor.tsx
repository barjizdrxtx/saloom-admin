import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface FormikTextEditorProps {
  data: {
    name: string;
    title: string;
  };
  value: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  onBlur?: (event: { target: { name: string } }) => void;
  error?: string;
  className?: string;
  modules?: any;
  formats?: string[];
  placeholder?: string;
  maxLength?: number;
}

const FormikTextEditor: React.FC<FormikTextEditorProps> = ({
  data,
  value,
  onChange,
  onBlur,
  error,
  className = "",
  modules,
  formats,
  placeholder = "Write something...",
  maxLength,
}) => {
  const [editorHeight, setEditorHeight] = useState(200);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(value?.split(/\s+/).filter(Boolean).length);
  }, [value]);

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    // Remove <script> tags and any occurrence of "script" as a keyword
    const sanitizedValue = content
      .replace(/<\/?script[^>]*>/gi, "") // Removes <script> and </script> tags
      .replace(/\bscript\b/gi, ""); // Removes the word "script" from text

    // Count words after sanitization
    const currentWordCount = sanitizedValue.split(/\s+/).filter(Boolean).length;

    // Ensure the content doesn't exceed max length
    if (!maxLength || currentWordCount <= maxLength) {
      onChange({
        target: {
          name: data.name,
          value: sanitizedValue,
        },
      });
    }

    setWordCount(currentWordCount);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur({
        target: {
          name: data.name,
        },
      });
    }
  };

  const defaultModules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["code-block"],
      [{ direction: "rtl" }],
      [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
      [{ align: "center" }, { align: "right" }, { align: "justify" }],
      [{ list: "check" }],
      [{ direction: "rtl" }, { direction: "ltr" }],
      ["clean"],
    ],
  };

  const defaultFormats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "code-block",
    "direction",
    "check",
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="pb-1 pt-1  text-sm text-gray-800 font-semibold">
        {data.title}
      </div>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:border-blue-500 xs:mb-40 md:mb-16`}
        style={{ height: `${editorHeight}px` }}
        modules={modules || defaultModules}
        formats={formats || defaultFormats}
        placeholder={placeholder}
      />
      <div className="text-gray-500 text-xs mt-1">{wordCount} words</div>
      {error && <div className="text-red-500 text-sm mt-1 pt-2">{error}</div>}
    </div>
  );
};

export default FormikTextEditor;
