import React from "react";

// Define prop types for better type safety
interface FormikTextAreaProps {
  data: {
    title: string;
    name: string;
    placeholder?: string;
  };
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string | { message?: string };
}

// Function to sanitize input values
const sanitizeInput = (value: string) => {
  return value.replace(/<\/?script[^>]*>/gi, "");
};

const FormikTextArea: React.FC<FormikTextAreaProps> = ({
  data,
  value,
  onChange,
  onBlur,
  error,
}) => {
  const errorMessage =
    typeof error === "object" && error !== null ? error.message : error;

  return (
    <div className="w-full mt-4">
      <label
        htmlFor={data.name}
        className="pb-1 text-sm font-medium text-gray-700"
      >
        {data.title}
      </label>
      <textarea
        id={data.name}
        name={data.name}
        value={sanitizeInput(value)}
        className={`w-full mt-1 p-3 text-gray-800 placeholder-gray-400 rounded-lg border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out`}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={data.placeholder}
        rows={5} // Adjust the number of rows as needed
      />
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">
          {sanitizeInput(errorMessage)}
        </div>
      )}
    </div>
  );
};

export default FormikTextArea;
