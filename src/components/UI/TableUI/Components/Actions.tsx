"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Popconfirm, Popover, message } from "antd";
import { CustomIcon } from "@/components/UI/Icons/Icons";

export default function Actions({
  id,
  editUrl,
  deleteApi,
  refetch,
  actionButton,
}: any) {
  const router = useRouter();
  const token = Cookies.get("saloom_access_token") || "";

  // Don't render if no actions specified
  if (!actionButton || actionButton.length === 0) {
    return null;
  }

  const handleEdit = () => {
    router.push(`${editUrl}/edit/${id}`);
  };

  const handleVariants = () => {
    router.push(`${editUrl}/variants/${id}`);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${deleteApi}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        message.success(res.data.message || "Deleted successfully");
        refetch();
        router.refresh();
      } else {
        message.error(res.data.message || "Delete failed");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Failed to delete record";
      message.error(errorMsg);
    }
  };

  const buttonClass =
    "flex items-center cursor-pointer px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 backdrop-blur";

  // Build popover content based on allowed actions
  const popoverContent = (
    <div className="flex flex-col space-y-2">
      {actionButton.includes("EDIT") && (
        <button onClick={handleEdit} className={buttonClass}>
          <CustomIcon name="edit" className="text-green-400 mr-2" />
          <span className="text-green-400 font-semibold cursor-pointer">Edit</span>
        </button>
      )}{" "}
      {actionButton.includes("VARIANTS") && (
        <button onClick={handleVariants} className={buttonClass}>
          <CustomIcon name="dashboard" className="text-blue-400 mr-2" />
          <span className="text-blue-400 font-semibold cursor-pointer">Add Variants</span>
        </button>
      )}
      {actionButton.includes("DELETE") && (
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <button className={buttonClass}>
            <CustomIcon name="delete" className="text-red-400 mr-2" />
            <span className="text-red-400 font-semibold cursor-pointer">Delete</span>
          </button>
        </Popconfirm>
      )}
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      trigger="click"
      placement="bottomRight"
      overlayClassName="!bg-transparent"
      overlayInnerStyle={{
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "1rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CustomIcon name="settings" className="text-green-600 text-2xl" />
    </Popover>
  );
}
