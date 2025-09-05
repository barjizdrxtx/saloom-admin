import React from "react";

const FormikCheckBox = ({ data, onChange, value }: any) => {
  return (
    <div className="w-full flex items-center space-x-3 py-2">
      {/* Custom styled checkbox */}
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="peer hidden"
        />
        <div
          className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 
                     rounded-md peer-checked:border-blue-500 peer-checked:bg-blue-500 
                     transition-colors duration-200"
        >
          {/* Checkmark */}
          {value && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="ml-3 text-sm text-gray-800 font-medium">
          {data.title}
        </span>
      </label>
    </div>
  );
};

export default FormikCheckBox;
