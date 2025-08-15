import React, { useState, useEffect } from "react";

const MyTextField = ({ data, onChange }: any) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // Set the initial default value when component mounts
    if (data.defaultValue !== undefined) {
      setValue(data.defaultValue);
    }
  }, [data.defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    // Remove any non-numeric characters
    newValue = newValue.replace(/[^0-9.]/g, "");
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full my-4">
      <div className="text-sm font-normal mb-1">{data.title}</div>
      <input
        type={data.type}
        className="w-full border border-gray-300 rounded-md p-1.5 
        focus:outline-none focus:border-blue-500"
        // placeholder={data.title}
        onChange={handleChange}
        value={value} // Use value instead of defaultValue
      />
    </div>
  );
};

export default MyTextField;
