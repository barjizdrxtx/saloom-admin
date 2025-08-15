import React from "react";

const Formik_TextField = ({ data, value, onChange, onBlur, error }: any) => {
  return (
    <div className="w-full mt-2">
      <input
        name={data.name}
        value={value}
        placeholder={data.title}
        type={data.type}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md p-1.5 focus:outline-none focus:border-blue-500`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default Formik_TextField;
