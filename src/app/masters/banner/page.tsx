// pages/categories.jsx
"use client";

import React from "react";
import TableUI from "@/components/UI/TableUI/TableUI";

const page = () => {
  const props = {
    tableName: "List All Banners",
    apiName: "banners",
    getById: "id",
    createButton: "/masters/banner/create", // route for the blank “Create” form
    createButtonText: "Add Banner",
    deleteApi: "banners",
    editUrl: "banners",
    tableColumns: [
      {
        title: "Image",
        render: (row: any) =>
          row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="h-8 w-8 object-cover rounded"
            />
          ) : (
            "–"
          ),
      },
      { title: "Name", value: "name" },

      { title: "Sort Order", value: "sortOrder", isNumber: true },
      {
        title: "Active",
        render: (row: any) => (row.isActive ? "Yes" : "No"),
      },
    ],
    actionButton: ["EDIT", "DELETE"], // actions to be displayed in the table
  };

  return (
    <div className="w-full">
      <TableUI {...props} />
    </div>
  );
};

export default page;
