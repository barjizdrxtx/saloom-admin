"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import TableUIStores from "../../../../../components/UI/TableUI/TableUIStores";
import { StepProgress } from "./StepProgress";

const StoresPage: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") ?? "";

  const props = {
    tableName: "My Stores",
    apiName: `stores/${userId}/stores`,
    getById: "id",
    createButton: `/masters/storeowners/mystores/create`,
    detailsRoute: `/masters/storeowners/mystores/products?userId=${userId}`,
    deleteApi: "stores",
    editUrl: "mystores",
    actionButton: "EDIT DELETE",
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
    <div>
      <StepProgress currentStep={2} />
      <TableUIStores {...props} />
    </div>
  );
};

export default StoresPage;
