import React from "react";

const MyTextField2 = ({
  title,
  onChange,
  defaultValue,
  type = "text",
  my = 4,
}: any) => {
  return (
    <div className={`w-full my-${my}`}>
      <div className="text-sm font-bold mb-1">{title}</div>
      <input
        defaultValue={defaultValue}
        type={type}
        className="w-full border border-gray-300 rounded-md p-1.5 
       focus:outline-none focus:border-blue-500"
        onChange={onChange}
      />
    </div>
  );
};

export default MyTextField2;
