"use client";

import React, { Suspense } from "react";
import MainProducts from "./components/MainProducts";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainProducts />
    </Suspense>
  );
};

export default page;
