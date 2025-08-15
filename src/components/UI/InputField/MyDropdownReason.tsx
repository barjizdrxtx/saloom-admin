import { Fragment, useState, useEffect } from "react";

const MyDropdownReason = ({
  title,
  data,
  defaultValue,
  setValue,
  myvalue,
}: any) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState<any[]>(data); // State for filtered items

  useEffect(() => {
    const defaultItem = data?.find((item: any) => item.id === defaultValue);
    if (defaultItem) {
      setSelectedValue(defaultItem);
    }
  }, [defaultValue, data]);

  useEffect(() => {
    // Filter the dropdown items based on the search query
    if (searchQuery.trim()) {
      const filtered = data?.filter((item: any) =>
        String(item[myvalue]).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset if no search query
    }
  }, [searchQuery, data, myvalue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value: any) => {
    setSelectedValue(value);
    setValue(value.name); // Update the setValue callback with the selected id
    setIsOpen(false);
  };

  return (
    <div className="w-full relative inline-block text-left">
      <div className="text-sm font-bold mb-1">{title}</div>
      <button
        onClick={toggleDropdown}
        type="button"
        className="bg-white inline-flex justify-start w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <div className="flex justify-between items-center w-full">
          <span className="capitalize">
            {selectedValue ? selectedValue[myvalue] : `Select a ${title}`}
          </span>
          <span className="ml-2">
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </button>

      {isOpen && (
        <Fragment>
          <div className="fixed z-40 inset-0" onClick={toggleDropdown}></div>
          <div className="bg-white w-full absolute z-50 mt-2 origin-top-right border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {/* Search Input */}
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none"
              />
            </div>
            {/* Dropdown options */}
            {filteredData?.map((el: any) => (
              <div
                key={el.id}
                className="flex justify-between items-center text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectOption(el)}
              >
                <div className="capitalize w-full py-2 pl-4">{el[myvalue]}</div>
              </div>
            ))}
            {filteredData?.length === 0 && (
              <div className="py-2 pl-4 text-sm text-gray-500">No results found</div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default MyDropdownReason;
