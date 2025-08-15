import React, { useState } from "react";
import { NavBar } from "./NavBar";
import axios from "axios";
import { SideBar } from "./Sidebar";
import Cookies from "js-cookie";

export const Layout = (props: any) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="select-none w-full flex">
        <NavBar />
      </div>

      <div className="select-none w-full flex  bg-red">
         <SideBar />

        <div style={{height:"90vh"}} className="overflow-y-scroll xs:w-full xs:mt-12 md:mt-0 md:w-5/6">
          {props.children}
        </div>
      </div>
    </div>
  );
};
