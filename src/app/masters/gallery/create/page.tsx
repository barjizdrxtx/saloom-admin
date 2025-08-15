// page.tsx
"use client";

import React, { Suspense } from "react";
import GalleryPage from "../GalleryPage";


const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryPage  />
    </Suspense>
  );
};

export default page;
