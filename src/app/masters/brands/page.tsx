// pages/categories.jsx
"use client";

import TableUI from "@/components/UI/TableUI/TableUI";
import React from "react";

const page = () => {
  const props = {
    tableName: "List All Brands",
    apiName: "brands",
    getById: "id",
    createButton: "/masters/brands/create", // route for the blank “Create” form
    createButtonText: "Add Brand",
    detailsRoute: `/masters/brands/sub`,
    deleteApi: "brands",
    editUrl: "brands",
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
