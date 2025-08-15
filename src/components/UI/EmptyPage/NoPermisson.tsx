import React from "react";

const NoPermisson = () => {
  return (
    <div>
      <div className="flex justify-center items-center w-full mt-20 ">
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg space-y-4 animate-fadeIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-1.414-1.414-4.95 4.95-4.95-4.95-1.414 1.414 4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">
            No Permission to View
          </h2>
          <p className="text-gray-500 text-center">
            You don’t have permission to access this section. <br /> Please
            contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoPermisson;
