"use client";

import React from "react";
import GalleryPage from "../../GalleryPage";

const page = ({ params }: any) => {
  const { id } = params;

  return (
    <>
      <GalleryPage editId={id} />
    </>
  );
};

export default page;
