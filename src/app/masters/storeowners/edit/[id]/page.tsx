"use client";

import React, { Suspense } from "react";
import StoreOwnersForm from "../../components/StoreOwnersForm";

const page = ({ params }: any) => {
  const { id } = params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreOwnersForm editId={id} />
    </Suspense>
  );
};

export default page;
