// page.tsx
"use client";

import React, { Suspense } from "react";
import CategoryPage from "../BannerForm";
import BannerForm from "../BannerForm";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerForm  />
    </Suspense>
  );
};

export default page;
