import React from "react";
import { CustomIcon } from "../Icons/Icons";

export const PrimaryButton = ({
  children,
  eyeIcon,
  onClick,
  className,
  width,
  addIcon,
  saveIcon, // Add saveIcon as a prop
}: any) => {
  return (
    <div className={`text-white `} style={{ width: width }}>
      <button
        onClick={onClick}
        className={`${className} p-2 px-4 rounded-md flex justify-center items-center`}
      >
        {addIcon && (
          <>
            <CustomIcon name="add" />
            <div className="mx-1"></div>
          </>
        )}
        {eyeIcon && (
          <>
            <CustomIcon name="visibility" />
            <div className="mx-1"></div>
          </>
        )}
        {saveIcon && ( // Add the Save icon conditionally
          <>
            <CustomIcon name="save" />
            <div className="mx-1"></div>
          </>
        )}
        {children}
      </button>
    </div>
  );
};
