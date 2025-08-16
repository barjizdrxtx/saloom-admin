// pages/gallery.jsx
"use client";

import TableUI from "@/components/UI/TableUI/TableUI";
import React from "react";

const page = () => {
  const props = {
    tableName: "List All Gallery",
    apiName: "gallery",
    getById: "id",
    createButton: "/masters/gallery/create", // route for the blank “Create” form
    createButtonText: "Add Gallery",
    detailsRoute: `/masters/gallery/sub`,
    deleteApi: "gallery",
    editUrl: "gallery",
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
