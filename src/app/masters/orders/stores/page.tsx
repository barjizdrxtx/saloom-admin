// pages/stores.jsx
"use client";

import React from "react";
import TableUI from "@/components/UI/TableUI/TableUI";

const page = () => {
  const props = {
    tableName: "Orders By Stores",
    apiName: "stores",
    getById: "id",
    detailsRoute: `/masters/orders/stores`,
    tableColumns: [
      {
        title: "Logo",
        render: (row: any) =>
          row.logoUrl ? (
            <img
              src={row.logoUrl}
              alt="logo"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            "–"
          ),
      },
      { title: "Name", value: "name" },
      { title: "Status", value: "status" },
    ],
  };

  return (
    <div className="w-full">
      <TableUI {...props} />
    </div>
  );
};

export default page;
