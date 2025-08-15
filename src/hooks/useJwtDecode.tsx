import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

const useJwtDecode = (token: any) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [decodedHeader, setDecodedHeader] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setDecodedToken(decoded);

        const decodedHeader: any = jwtDecode(token, { header: true });
        setDecodedHeader(decodedHeader);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  return { decodedToken, decodedHeader };
};

export default useJwtDecode;
