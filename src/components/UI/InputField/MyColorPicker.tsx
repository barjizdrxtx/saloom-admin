import React, { useState, useEffect } from "react";

const MyColorPicker = ({
  data,
  value,
  onChange,
  onBlur,
  error,
}: any) => {
  const { title, name } = data;
  const [color, setColor] = useState(value || "#000000");

  useEffect(() => {
 
      setColor(value || "#000000"); // Otherwise, set it to the value prop
  
  }, [value, onChange, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const newValue = e.target.value;
      setColor(newValue);
      onChange({ target: { name, value: newValue } }); // Pass synthetic event with name and value to onChange
  
  };

  const handleBlur = () => {
    onBlur({ target: { name } }); // Pass synthetic event with name to onBlur
  };

  return (
    <div className="w-full flex flex-col justify-center items-start mt-4">
      <div className={`pb-1 font-semibold text-sm`}>{title}</div>
      <div className="w-full flex justify-start items-center">
        <input
          type="color"
          value={color}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-4/6 h-10"
          aria-label={title}
          style={{
            backgroundColor: color,
          }}
        />
        <div className="mx-2">{`hex: ${color}`}</div>
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message if there's an error */}
    </div>
  );
};

export default MyColorPicker;
