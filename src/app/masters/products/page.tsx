// pages/products.jsx
"use client";

import React from "react";
import TableUI from "@/components/UI/TableUI/TableUI";

const ProductsPage = () => {
  const props = {
    createButton: "/masters/products/create", // route for the blank “Create” form
    tableName: "List All Products",
    apiName: "products",
    getById: "id",
    createButtonText: "Add Product",
    tableColumns: [
      {
        title: "Image",
        render: (row: any) =>
          row.imageUrl ? (
            <img
              src={
                "https://saloom-api.amalgamatetechnologies.com" + row.imageUrl
              }
              alt={row.name}
              className="h-8 w-8 object-cover rounded"
            />
          ) : (
            "–"
          ),
      },
      { title: "Name", value: "name" },
      { title: "Price", value: "price" },
      { title: "Description", value: "description" },

      // { title: "Price", value: "price", isNumber: true },
      // { title: "Category", value: "categories.name" },
      // { title: "Brand", value: "brand" },
      // {
      //   title: "Active",
      //   render: (row) => (row.isActive ? "Yes" : "No"),
      // },
    ],
  };

  return (
    <div className="w-full">
      <TableUI {...props} />
    </div>
  );
};

export default ProductsPage;
