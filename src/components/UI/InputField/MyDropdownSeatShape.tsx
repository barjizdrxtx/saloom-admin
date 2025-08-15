import React, { useState } from "react";
import { CustomIcon } from "../Icons/Icons";

const MyDropdownSeatShape = ({ data, onChange, error }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption]: any = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (selectedValue: any) => {
    setIsOpen(false);
    onChange(selectedValue.id);
    setSelectedOption(selectedValue);
  };

     

  return (
    <div className="w-full flex flex-col justify-center items-start mt-4">
      <div
        className={`pb-1 font-semibold text-sm text-gray-700"
        `}
      >
        {data.title}
      </div>
      <div className="w-full">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex justify-between items-center w-full p-1.5 text-sm font-medium border rounded-md"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          {selectedOption ? (
            <div className="flex justify-start items-center">
              <selectedOption.icon1 className="text-black" />
              <div className="mx-2"></div>
              <selectedOption.icon2 className="text-black" />
            </div>
          ) : (
            `Select a ${data.title}`
          )}
          <div>
            <CustomIcon name="arrow_drop_down" />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="w-full relative mt-1 bg-blue-50">
          <div className="w-full absolute z-50 left-0 top-0      border rounded-md">
            {data.dropData?.map((el: any) => (
              <div
                key={el.id}
                className="flex justify-between items-center text-sm text-gray-700 hover:bg-gray-100"
              >
                <div
                  onClick={() => handleSelectOption(el)}
                  className="w-full flex justify-start p-2 items-center border-b cursor-pointer"
                >
                  <el.icon1 className="text-black" />
                  <div className="mx-2"></div>
                  <el.icon2 className="text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default MyDropdownSeatShape;
