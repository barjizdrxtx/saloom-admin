"use client";

import React from "react";
import TableUI2 from "@/components/UI/TableUI/TableUI2";
import { StepProgress } from "./mystores/components/StepProgress";

const StoreOwnersPage = () => {
  const props = {
    tableName: "List All Store Owners",
    apiName: "store-owners",
    getById: "id",
    createButton: "/masters/storeowners/create",
    detailsRoute: "/masters/storeowners/mystores?userId=",
    createButtonText: "Add Store Owner",
    deleteApi: "store-owners",
    editUrl: "storeowners",
    actionButton: "EDIT DELETE",
    tableColumns: [
      {
        title: "Avatar",
        render: (row) =>
          row.avatarUrl ? (
            <img
              src={row.avatarUrl}
              alt="avatar"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            "–"
          ),
      },
      { title: "First Name", value: "firstName" },
      { title: "Email", value: "email" },
      { title: "Phone", value: "phone" },
      {
        title: "Stores Count",
        render: (row) => row._count?.stores ?? 0,
        isNumber: true,
      },
    ],
  };

  return (
    <div className="w-full p-4">
      <StepProgress currentStep={1} />
      <TableUI2 {...props} />
    </div>
  );
};

export default StoreOwnersPage;
