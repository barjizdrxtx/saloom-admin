// pages/bookings.jsx (or .tsx)
"use client";

import React from "react";
import TableUI from "@/components/UI/TableUI/TableUI";

const BookingsPage = () => {
  const props = {
    tableName: "List All Orders",
    apiName: "admin/orders",
    getById: "id",
    tableColumns: [
      { title: "Order No", value: "orderNumber" },
      {
        title: "Date",
        // grab the ISO date and show only the date part:
        render: (row) => new Date(row.orderDate).toLocaleDateString("en-GB"),
      },
      {
        title: "Count",
        isNumber: true,
        // sum up all item quantities:
        render: (row) =>
          row.orderItems.reduce((sum, item) => sum + item.quantity, 0),
      },
    
      {
        title: "Customer Name",
        render: (row) =>
          `${row.billingAddress.firstName} ${row.billingAddress.lastName}`,
      },
      { title: "Mobile", value: "billingAddress.phone" },
      { title: "Status", value: "status" },
      { title: "Net Price", value: "totalAmount", isNumber: true },
      { title: "Payment Status", value: "paymentStatus" },
    ],
  };

  return (
    <div className="w-full">
      <TableUI {...props} />
    </div>
  );
};

export default BookingsPage;
