import React from "react";
import * as moment from "moment-timezone";

const FormikDateTimePicker = ({
  data,
  value,
  onChange,
  onBlur,
  error,
}: any) => {
  const handleDateTimeChange = (e: any) => {
    const selectedDateTime = e.target.value;
    onChange(selectedDateTime); // Pass the raw input value to onChange
  };

  // Format value to be compatible with input type="datetime-local"
  const formattedValue = value
    ? moment.utc(value).format("YYYY-MM-DDTHH:mm") // Remove timezone conversion
    : "";

  return (
    <div className="w-full">
      <div className="pb-1 font-normal text-sm text-gray-700">
        {data.title}
      </div>
      <input
        name={data.name}
        value={formattedValue}
        type="datetime-local"
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md p-2 focus:outline-none focus:border-blue-500`}
        onChange={handleDateTimeChange}
        onBlur={onBlur}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormikDateTimePicker;
