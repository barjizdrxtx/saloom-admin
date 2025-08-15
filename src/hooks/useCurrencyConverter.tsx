import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const allowedCurrencies = ["QAR", "SAR", "AED", "OMR", "KWD", "BHD"];

const useCurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  let toCurrency = Cookies.get("toCurrency");
  if (!toCurrency || !allowedCurrencies.includes(toCurrency)) {
    toCurrency = "QAR";
  }

  useEffect(() => {
    axios
      .get("https://open.er-api.com/v6/latest/QAR")
      .then((response) => {
        const currencyData = response.data;
        const filteredCurrencies = Object.keys(currencyData.rates).filter(
          (currency) => allowedCurrencies.includes(currency)
        );
        setCurrencies(filteredCurrencies);
        setExchangeRate(currencyData.rates[toCurrency]);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, [toCurrency]);

  const handleAmountChange = (inputAmount: number) => {
    setAmount(inputAmount);
    if (exchangeRate) {
      setConvertedAmount(inputAmount * exchangeRate);
    }
  };

  return {
    currencies,
    exchangeRate,
    amount,
    convertedAmount,
    handleAmountChange,
  };
};

export default useCurrencyConverter;
