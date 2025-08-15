import React, { useState } from "react";
import { CustomIcon } from "../Icons/Icons";

// Define a list of 20 color options
const colorOptions = [
  "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", 
  "#E74C3C", "#3498DB", "#2ECC71", "#F39C12", "#C0392B",
  "#1ABC9C", "#9B59B6", "#34495E", "#E67E22", "#16A085",
  "#2980B9", "#D35400", "#7D3C98", "#F4D03F", "#EAB8B4"
];

const FormikColorPicker = ({
  className,
  data,
  value,
  onChange,
  error,
}: any) => {
  const [showColorPalette, setShowColorPalette] = useState(false); // State to toggle color palette

  const errorMessage =
    typeof error === "object" && error !== null ? error.message : error;

  const handleColorSelect = (color: string) => {
    onChange({ target: { name: data.name, value: color } }); // Update the color value
    setShowColorPalette(false); // Close the color palette
  };

  return (
    <div className={` ${data.width === "w-fit" ? "w-fit" : `w-full mt-${data.mt}`} ${className}`}>
      <div className="pb-1 font-normal text-sm">{data.title}</div>
      <div className="relative w-full">
        <div
          className={`w-full border rounded-md p-2 cursor-pointer`}
          style={{ backgroundColor: value }} // Display selected color
          onClick={() => setShowColorPalette(!showColorPalette)} // Toggle color palette
        >
          {value || "Choose a Color"} {/* Display the selected color hex code or prompt */}
        </div>
        {showColorPalette && ( // Show color palette when toggled
          <div className="absolute mt-2 bg-white border rounded-md p-2 shadow-lg">
            <div className="text-sm font-medium mb-1">Choose a Color:</div>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 cursor-pointer rounded-full border-2 border-transparent hover:border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)} // Handle color selection
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormikColorPicker;
