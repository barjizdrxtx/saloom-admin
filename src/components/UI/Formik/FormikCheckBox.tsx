import React from "react";

const FormikCheckBox = ({ data, onChange, value }: any) => {
  return (
    <div className="w-full flex justify-start items-center">
      <div className="font-normal text-sm mr-5">{data.title}</div>
      <div className="flex justify-start items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-500"
          onChange={(e) => onChange(e.target.checked)}
          checked={value} // Use the value from Formik form values
        />
      </div>
    </div>
  );
};

export default FormikCheckBox;
