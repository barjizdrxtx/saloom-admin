"use client";

import React from "react";
import CategoryPage from "../../CategoryPage";

const page = ({ params }: any) => {
  const { id } = params;

  return (
    <div>
      <CategoryPage editId={id} />
    </div>
  );
};

export default page;
