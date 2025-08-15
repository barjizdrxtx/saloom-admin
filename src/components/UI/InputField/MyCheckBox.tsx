import React from "react";

const MyCheckBox = ({ title, onChange, checked }: any) => {
  return (
    <div className="w-full flex justify-start items-center my-4">
      <div className="mr-4 flex-1 font-bold text-sm">{title}</div>
      {/* Render the checkbox */}

      <div className="flex-5 flex justify-start items-center">
        <input
          type="checkbox"
          className="  form-checkbox h-5 w-5 text-blue-500"
          onChange={onChange}
          checked={checked} // Use the property to determine checked state
        />
      </div>
    </div>
  );
};

export default MyCheckBox;
