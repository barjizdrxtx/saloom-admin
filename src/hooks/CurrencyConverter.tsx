import React from "react";

import Cookies from "js-cookie";
import useCurrencyConverter from "./useCurrencyConverter";
const CurrencyConverter = () => {
  const { amount, convertedAmount, handleAmountChange } =
    useCurrencyConverter();

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Currency Converter
      </h2>
      <div className="mb-4">
        <label className="block mb-2 text-gray-600">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold">Converted Amount:</h3>
        <p className="text-lg">
          {convertedAmount} {Cookies.get("toCurrency") || "BHD"}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
