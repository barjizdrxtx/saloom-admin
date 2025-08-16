"use client";

import React from "react";
import BrandPage from "../../BrandPage";

const page = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <BrandPage editId={id} />
    </div>
  );
};

export default page;
