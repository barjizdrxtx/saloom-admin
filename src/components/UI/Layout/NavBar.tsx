import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useTheme } from "next-themes";
import { CustomIcon } from "../Icons/Icons";
import { IconButton } from "@/components/UI/Icons/Icons";
import useJwtDecode from "@/hooks/useJwtDecode";

export const NavBar = () => {
  const router = useRouter();
  const [isPopup, setIsPopup] = useState(false);

  const adminToken = Cookies.get("adminToken");
  const decodedToken: any = useJwtDecode(adminToken);

  const handleLogout = async () => {
    Cookies.remove("adminToken");
    Cookies.remove("authToken");
    window.location.reload();
  };

  return (
    <div
      style={{ height: "10vh" }}
      className="w-full border-b justify-between items-center px-5 py-2 hidden md:flex"
    >
      <div className="flex justify-start">
        <img
          className="cursor-pointer"
          onClick={() => router.push("/masters/products")}
          width="100px"
          src="/assets/logo.png"
          alt="Logo"
        />
      </div>

      <div className="flex justify-end items-center">
        <div className="flex flex-col px-3 bg-white rounded-lg">
          <div className="capitalize text-lg font-semibold text-gray-800 mb-1">
            {decodedToken?.decodedToken?.username || ""}
          </div>
          <div className="capitalize text-md text-gray-600">
            {decodedToken?.decodedToken?.type || ""}
          </div>
        </div>
        <IconButton onClick={() => setIsPopup(!isPopup)}>
          <img width="40px" src="/assets/profile.png" alt="" />
        </IconButton>
      </div>

      {isPopup && (
        <div
          className="fixed right-10 top-20 z-50 shadow-2xl bg-white/20 backdrop-blur-lg rounded-xl py-1 pl-2 pr-10 flex 
    flex-col items-start border border-white/10 transition-transform transform hover:scale-105"
        >
          <div
            onClick={handleLogout}
            className="flex items-center py-2 hover:bg-white/10 transition rounded-lg w-full px-0 cursor-pointer"
          >
            <CustomIcon className="mx-2 text-red-500" name="logout" />
            <div className="text-red-500 font-semibold">Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
};
