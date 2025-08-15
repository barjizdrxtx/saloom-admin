import React, { useState } from "react";

const ToggleButton = ({ isToggled, setIsToggled }: any) => {
  const toggleButtonClasses = `
    flex items-center justify-between
    w-12 h-6 rounded-full bg-gray-300
    px-1
  `;

  const toggleHandleClasses = `
    w-5 h-5 rounded-full
    ${
      isToggled ? "transform translate-x-full bg-red-600" : "bg-white"
    } shadow-md`;

  const handleToggle = () => {
    setIsToggled((prevState: any) => !prevState);
  };

  return (
    <div
      className={`px-2 md:bg-white flex justify-start items-center rounded-full`}
    >
      <button
        style={{ direction: "ltr" }}
        className={toggleButtonClasses}
        onClick={handleToggle}
      >
        <div className={toggleHandleClasses}></div>
      </button>

      <div className="m-2 text-sm text-nowrap">Show Disabled</div>
    </div>
  );
};

export default ToggleButton;
