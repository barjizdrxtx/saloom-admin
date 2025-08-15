import React from "react";

const FormikDatePicker = ({ data, value, onChange, onBlur, error }: any) => {
  // Function to handle date change
  const handleDateChange = (e: any) => {
    const selectedDate = e.target.value;
    onChange(selectedDate); // Call onChange with the selected date
  };

  return (
    <div className="w-full">
      <div className="pb-1 font-normal text-sm text-gray-700">
        {data.title}
      </div>
      <input
        name={data.name}
        value={value || ""}
        type="date"
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md p-2 focus:outline-none focus:border-blue-500`}
        onChange={handleDateChange} // Use the handleDateChange function
        onBlur={onBlur}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormikDatePicker;
