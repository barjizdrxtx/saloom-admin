import { Fragment, useState, useEffect } from "react";
import DoubleSeat_1 from "../Svg/DoubleSeat_1";
import SingleSeat_1 from "../Svg/SingleSeat_1";

const MyDropdown = ({
  title,
  data,
  iscreateSeat,
  handleCategoryChange,
  handleSeatColor,
  defaultValue,
}: any) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const defaultItem = data?.find((item: any) => item.id === defaultValue);
    if (defaultItem) {
      setSelectedValue(defaultItem);
    }
  }, [defaultValue, data]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value: any) => {
    handleCategoryChange(value.id, iscreateSeat);
    handleSeatColor(value.color, iscreateSeat);
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className=" w-full relative inline-block text-left my-0">
      <div className="text-sm font-bold mb-1">{title}</div>
      <div className="mt-0">
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-start w-full px-4 py-2 text-sm font-medium text-gray-700      border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {selectedValue ? (
            <div className="cursor-pointer w-full flex justify-between items-center">
              <div className="cursor-pointer capitalize">
                {selectedValue?.category?.category}
              </div>
              <div className="cursor-pointer relative flex justify-center items-center">
                <SingleSeat_1
                  width={27}
                  height={18}
                  color={selectedValue.color}
                />
                <DoubleSeat_1
                  position="left"
                  width={27}
                  height={18}
                  color={selectedValue.color}
                />
                <DoubleSeat_1
                  position="right"
                  width={27}
                  height={18}
                  color={selectedValue.color}
                />
              </div>
            </div>
          ) : (
            `Select a ${title}`
          )}
        </button>
      </div>
      {isOpen && (
        <Fragment>
          <div
            className="fixed inset-0 h-full w-full cursor-default"
            onClick={toggleDropdown}
          ></div>
          <div className="w-full bg-white absolute z-10 mt-2 origin-top-right      border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
            {data?.map((el: any) => (
              <div
                key={el.id}
                className=" flex  justify-between items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectOption(el)}
              >
                <div className="cursor-pointer capitalize w-full py-2 pl-4">
                  {el?.category?.category}
                </div>
                <div className="cursor-pointer relative pr-2">
                  <div className="cursor-pointer relative flex justify-center items-center">
                    <SingleSeat_1 width={27} height={18} color={el.color} />
                    <DoubleSeat_1
                      position="left"
                      width={27}
                      height={18}
                      color={el.color}
                    />
                    <DoubleSeat_1
                      position="right"
                      width={27}
                      height={18}
                      color={el.color}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MyDropdown;
