"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import TableUI from "@/components/UI/TableUI/TableUI";
import { StepProgress } from "../../components/StepProgress";

const MainProducts = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "";
  const storeId = searchParams.get("storeid") || "";
  const qs = `?userId=${userId}&storeid=${storeId}`;

  const props = {
    tableName: "Store Products",
    apiName: `products?storeId=${storeId}`,
    getById: "id",
    createButtonText: "Add Product",
    createButton: `/masters/storeowners/mystores/products/create${qs}`,
    detailsRoute: `/masters/storeowners/mystores/products/details`,
    editUrl: `/masters/storeowners/mystores/products`,
    actionButton: "EDIT VARIANTS DELETE",
    tableColumns: [
      {
        title: "Image",
        render: (row) =>
          row.productImages?.[0]?.imageUrl ? (
            <img
              src={row.productImages[0].imageUrl}
              alt={row.name}
              className="h-8 w-8 object-cover rounded"
            />
          ) : (
            "–"
          ),
      },
      { title: "Name", value: "name" },
      { title: "Price", value: "price", isNumber: true },
      { title: "Category", value: "categories.name" },
      { title: "Brand", value: "brand" },
      {
        title: "Active",
        render: (row) => (row.isActive ? "Yes" : "No"),
      },
    ],
  };

  return (
    <div className="w-full">
      <StepProgress currentStep={3} />
      <TableUI {...props} />
    </div>
  );
};

export default MainProducts;
