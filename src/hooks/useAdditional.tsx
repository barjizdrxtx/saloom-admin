import { useState, useEffect } from "react";
import { useQueryFetch } from "@/hooks/useQueryFetch";

const useAdditional = () => {
  const { fetchedData: general, isLoading, error } = useQueryFetch("settings");
  const [settings, setSettings] = useState({
    logo: "",
    termsInEnglish: "",
    termsInArabic: "",
    whatsappNo: "",
    copyrightInEnglish: "",
    copyrightInArabic: "",
  });

  useEffect(() => {
    if (general) {
      setSettings({
        logo: general.logo || "",
        termsInEnglish: general.termsInEnglish || "",
        termsInArabic: general.termsInArabic || "",
        whatsappNo: general.whatsappNo || "",
        copyrightInEnglish: general.copyrightInEnglish || "",
        copyrightInArabic: general.copyrightInArabic || "",
      });
    }
  }, [general]);

  return {
    ...settings,
    isLoading,
    error,
  };
};

export default useAdditional;
