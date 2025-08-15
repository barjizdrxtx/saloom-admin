"use client";

import React from "react";
import ProductForm from "../../components/ProductForm";

const page = ({ params }: any) => {

  const { id } = params;

  return (
    <>
      <ProductForm editId={id} />
    </>
  );
};

export default page;
