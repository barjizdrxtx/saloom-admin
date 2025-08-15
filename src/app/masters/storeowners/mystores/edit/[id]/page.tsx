"use client";

import React from "react";
import StoresForm from "../../components/StoresForm";


const page = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <StoresForm editId={id} />
    </div>
  );
};

export default page;
