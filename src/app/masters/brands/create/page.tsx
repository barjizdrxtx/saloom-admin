// page.tsx
"use client";

import React, { Suspense } from "react";
import CategoryPage from "../BrandPage";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryPage  />
    </Suspense>
  );
};

export default page;
