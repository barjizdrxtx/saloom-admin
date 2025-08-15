"use client";

import React, { Suspense } from "react";
import StoresPage from "./components/StoresPage";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoresPage />
    </Suspense>
  );
};

export default page;
