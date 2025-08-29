// pages/categories.jsx
"use client";

import React from "react";
import TableUI from "@/components/UI/TableUI/TableUI";

const page = () => {
  const props = {
    tableName: "List Explore Categories",
    apiName: "categories/list/isInExplore",
    getById: "id",
    createButton: "/masters/categories/create", // route for the blank “Create” form
    createButtonText: "Add Category",
    deleteApi: "categories",
    editUrl: "categories",
    tableColumns: [
      {
        title: "Image",
        render: (row: any) =>
          row.logoUrl ? (
            <img
              src={
                "https://saloom-api.amalgamatetechnologies.com" + row.logoUrl
              }
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
