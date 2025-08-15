"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TableUI2 from "@/components/UI/TableUI/TableUI2";

// Reusable StepProgress component
export const StepProgress = ({ currentStep = 1 }) => {
  const router = useRouter();
  const steps = [
    { label: "Store Owners", key: 1 },
    { label: "Stores", key: 2 },
    { label: "Products", key: 3 },
    { label: "Products Details", key: 4 },
  ];

  return (
    <div className="w-3/5 mx-auto mt-4">
      <div className="flex items-center justify-between">
        {steps.map(({ label, key }, idx) => {
          const isActive = key <= currentStep;
          const isLast = idx === steps.length - 1;
          return (
            <React.Fragment key={key}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => router.back()}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors ${
                    isActive ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  {key}
                </div>
                <span
                  className={`ml-2 font-medium transition-colors ${
                    isActive ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    key < currentStep ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
