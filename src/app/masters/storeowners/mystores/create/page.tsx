"use client";

import React, { Suspense } from "react";
import StoresForm from "../components/StoresForm";

const page = () => {
  return (
         <Suspense fallback={<div>Loading...</div>}>
      <StoresForm editId={undefined} />
    </Suspense>
  );
};

export default page;
