"use client";

import React, { Suspense } from "react";
import StoreOwnersForm from "../components/StoreOwnersForm";


const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <StoreOwnersForm editId={undefined} />
    </Suspense>
  );
};

export default page;
