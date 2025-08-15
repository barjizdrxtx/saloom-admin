// MyTextField.js

import React from "react";

const MyTextField = ({ data, onChange }: any) => {
  const handleChange = (event: any) => {
    let value = event.target.value;
    // Remove any non-numeric characters
    value = value.replace(/[^0-9.]/g, "");
    onChange(value);
  };

  return (
    <div className="w-full my-4">
      <div className="text-sm font-normal mb-1">{data.title}</div>
      <input
        defaultValue={data.defaultValue}
        type={data.type}
        className="w-full border border-gray-300 rounded-md p-1.5 
        focus:outline-none focus:border-blue-500"
        // placeholder={data.title}
        onChange={handleChange}
        value={data.value} // Ensure value is controlled
      />
    </div>
  );
};

export default MyTextField;
