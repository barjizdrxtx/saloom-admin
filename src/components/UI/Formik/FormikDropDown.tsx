import React, { useState, useEffect } from "react";
import { CustomIcon } from "../Icons/Icons";

const FormikDropDown = ({ data, onChange, error, value }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState<string | undefined>(undefined);
  const [defaultValue, setDefaultValue] = useState<any>(undefined);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (selectedValue: any) => {
    setIsOpen(false);
    onChange(selectedValue.id);
    setList(selectedValue[data.dropTitle]);
    setDefaultValue(selectedValue);
  };

  // Set the default value if the id matches 33
  useEffect(() => {
    const defaultOption = data.dropData?.find((el: any) => el.id === value);
    if (defaultOption) {
      setDefaultValue(defaultOption);
      setList(defaultOption[data.dropTitle]);
    }
  }, [data.dropData, value]);

  return (
    <div className={`w-full flex flex-col justify-center items-start mt-1`}>
      <div className="pb-1 font-normal text-sm">{data.title}</div>
      <div className="w-full">
        <button
          onClick={toggleDropdown}
          type="button"
          className={`flex justify-between items-center w-full 
          p-1.5 text-sm font-medium border rounded-md`}
          aria-haspopup="true"
          aria-expanded="true"
        >
          {value ? list : `Select a ${data.title}`}
          <div>
            <CustomIcon name="arrow_drop_down" />
          </div>
        </button>
      </div>
      <div className="w-full relative mt-1 bg-blue-50">
        {isOpen && (
          <div className="w-full bg-white absolute z-50 left-0 top-0      border rounded-md">
            {data.dropData?.map((el: any, index: any) => (
              <div
                key={el.id}
                className="flex justify-between items-center text-sm text-gray-700 hover:bg-gray-100"
              >
                <div
                  className="capitalize w-full py-2 pl-4 cursor-pointer"
                  onClick={() => {
                    handleSelectOption(el);
                  }}
                >
                  {el[data.dropTitle]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormikDropDown;
