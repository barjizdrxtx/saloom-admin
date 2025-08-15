"use client";

import React from "react";
import CategoryPage from "../../BannerForm";
import BannerForm from "../../BannerForm";

const page = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <BannerForm editId={id} />
    </div>
  );
};

export default page;
