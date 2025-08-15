"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CustomIcon, IconButton } from "../Icons/Icons";
import { siderbar } from "./helper";
import Cookies from "js-cookie";
import useJwtDecode from "@/hooks/useJwtDecode";

export const SideBar = () => {
  const [openMenuName, setOpenMenuName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [isPopup, setIsPopup] = useState(false);

  const admin = Cookies.get("adminToken");

  const decodedToken: any = useJwtDecode(admin);

  const handleItemClick = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const renderMenuItems = (items: any[], parentMenu: string) =>
    items.map((child: any, idx: number) => (
      <div
        key={idx}
        className={`flex items-center justify-start px-2 py-3 cursor-pointer rounded-lg ${
          pathName === child.path
            ? "text-primary"
            : "text-gray-400 hover:bg-gray-100"
        } transition duration-300`}
        onClick={() => handleItemClick(child.path)}
      >
        <CustomIcon
          fontSize={pathName === child.path ? 20 : 15}
          name="fiber_manual_record"
        />
        <span className="ml-2 text-sm">{child.text}</span>
      </div>
    ));

  const renderSidebarItems = () =>
    siderbar.map((item: any, idx: number) => (
      <div key={idx} className="w-full">
        <div
          className={`w-12 h-12 flex justify-center items-center cursor-pointer mt-2 px-2 py-3 rounded-lg ${
            pathName.startsWith(item.path)
              ? "bg-primary text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => handleItemClick(item.children[0].children[0].path)}
          title={item.name}
        >
          <CustomIcon name={item.icon} />
        </div>
      </div>
    ));

  const renderChildItems = (item: any) =>
    item.children.map((data: any) => (
      <div
        key={data.name}
        className="cursor-pointer w-full flex flex-col justify-start items-center"
      >
        <div
          onClick={() =>
            data.children.length > 1
              ? setOpenMenuName((prev) =>
                  prev === data.name ? null : data.name
                )
              : handleItemClick(data.children[0].path)
          }
          className={`${
            data.children.some((child: any) => pathName.startsWith(child.path))
              ? "text-primary"
              : "text-gray-500 hover:bg-gray-100"
          } w-full flex justify-between items-center transition duration-300 p-2 my-1 rounded-lg`}
        >
          <div className="flex items-center p-1">
            <CustomIcon name={data.icon} />
            <div className="pl-2">{data.name}</div>
          </div>
          {data.children.length > 1 && (
            <div
              className={`${
                openMenuName === data.name
                  ? "border border-primary bg-primary text-white"
                  : data.children.some((child: any) =>
                      pathName.startsWith(child.path)
                    )
                  ? "border border-primary bg-primary text-white"
                  : "border border-primary bg-white text-primary"
              }  rounded-full w-6 h-6 flex justify-center items-center`}
            >
              <CustomIcon
                fontSize={20}
                name={openMenuName === data.name ? "remove" : "add"}
                className=" text-md"
              />
            </div>
          )}
        </div>
        {openMenuName === data.name && (
          <div className="w-full ml-2">
            {renderMenuItems(data.children, item.name)}
          </div>
        )}
      </div>
    ));

  const renderSidebar = () => (
    <div
      className="relative flex flex-col w-fit cursor-pointer border-r p-2 h-screen"
      style={{ height: "90vh" }}
    >
      {renderSidebarItems()}
    </div>
  );

  const renderChildSidebar = () => (
    <div className="bg-white flex flex-col cursor-pointer border-r p-2  md:w-full">
      {siderbar
        .filter((item: any) => pathName.startsWith(item.path))
        .map((item: any) => (
          <div key={item.id} className="w-full">
            {renderChildItems(item)}
          </div>
        ))}
    </div>
  );

  return (
    <div style={{ height: "90vh" }} className="xs:w-fit md:w-1/6">
      <div className=" xs:flex justify-start items-center md:hidden w-full p-3 bg-white fixed top-0 left-0">
        <button
          className="text-gray-500 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <CustomIcon name="menu" />
        </button>

        <div>
          <img
            className="ml-10 cursor-pointer"
            onClick={() => router.push("/masters/products")}
            width="60px"
            src="/assets/logo.png"
            alt="Logo"
          />
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-20 z-0"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <IconButton onClick={() => setIsPopup(!isPopup)}>
          <img width="40px" src="/assets/profile.png" alt="" />
        </IconButton>
      </div>

      <div className="pt-0 xs:hidden md:flex xs:fixed md:static top-0 left-0 bg-white z-40">
        {renderSidebar()}
        {renderChildSidebar()}
      </div>

      {isMenuOpen && (
        <div className="pt-0 flex xs:fixed md:static top-0 left-0 bg-white z-40">
          {renderSidebar()}
          {renderChildSidebar()}
        </div>
      )}

      {isPopup && (
        <div
          onClick={async () => {
            await Cookies.remove("adminToken");
            window.location.reload();
          }}
          className="fixed right-10 top-20 z-50 shadow-2xl bg-white/20 backdrop-blur-lg rounded-xl py-1 pl-2 pr-10 flex 
    flex-col items-start border border-white/10 transition-transform transform hover:scale-105"
        >
          <div className="flex items-center py-2 hover:bg-white/10 transition rounded-lg w-full px-0 cursor-pointer">
            <CustomIcon className="mx-2 text-black" name="person" />
            <div className="text-black font-semibold capitalize">
              {decodedToken?.decodedToken?.username}
            </div>
          </div>
          <div className="flex items-center py-2 hover:bg-white/10 transition rounded-lg w-full px-0 cursor-pointer">
            <CustomIcon className="mx-2 text-red-500" name="logout" />
            <div className="text-red-500 font-semibold">Log Out</div>
          </div>
        </div>
      )}
    </div>
  );
};
