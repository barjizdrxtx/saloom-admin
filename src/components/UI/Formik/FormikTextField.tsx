import React, { useState } from "react";
import { CustomIcon } from "../Icons/Icons";

const FormikTextField = ({
  className,
  data,
  value,
  onChange,
  onBlur,
  error,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const errorMessage =
    typeof error === "object" && error !== null ? error.message : error;

  // Function to sanitize input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value;

    // Remove any form of "<script>" or "script"
    sanitizedValue = sanitizedValue.replace(/<\/?script[^>]*>/gi, "");

    // If it's a number input, remove spaces
    if (data.type === "number") {
      sanitizedValue = sanitizedValue.replace(/\s+/g, "");
    }

    // Apply character limit if provided
    if (data.charLimit) {
      sanitizedValue = sanitizedValue.slice(0, data.charLimit);
    }

    onChange({ target: { name: e.target.name, value: sanitizedValue } });
  };

  return (
    <div
      className={`${
        data.width === "w-fit" ? "w-fit" : "w-full"
      } ${className} mt-${data.mt}`}
    >
      <label className="pb-1 text-sm font-medium text-gray-700">
        {data.title}
      </label>
      <div className="relative mt-1">
        <input
          disabled={data.disabled}
          name={data.name}
          value={value}
          type={data.type === "password" && showPassword ? "text" : data.type}
          className={`w-full ${
            data.disabled && "bg-gray-500 text-white"
          } rounded-lg p-3 text-gray-800 placeholder-gray-400 border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
          onChange={handleInputChange}
          onBlur={onBlur}
          placeholder={data.placeholder}
          maxLength={data.charLimit || undefined} // Enforces limit at input level
        />
        {data.type === "password" && (
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            <CustomIcon
              name={showPassword ? "visibility_off" : "visibility"}
              fontSize={20}
            />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormikTextField;
