// app/masters/category/[editId]/page.tsx
"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { useQueryFetch, useQueryFetch2 } from "@/hooks/useQueryFetch";
import FormikForm from "@/components/UI/Formik/FormikForm";

const BrandPage = ({ editId }: any) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const storeId = searchParams.get("storeid");

  // Fetch existing category if editing, and list of categories for parent dropdown
  const { fetchedData: category, isLoading: catLoading } = useQueryFetch2(
    editId ? `categories/${editId}` : null
  );

  console.log("Category data:", category);

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      imageUrl: category?.imageUrl || "",
      metaTitle: category?.metaTitle || "",
      metaDescription: category?.metaDescription || "",
      sortOrder: category?.sortOrder ?? 0,
      isActive: category?.isActive ?? true,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("storeOwnerToken") || "";
        const url = editId ? `categories/${editId}` : "categories";
        const method = editId ? "patch" : "post";
        await axios({
          method,
          url,
          data: values,
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success("Category saved");
        router.back();
      } catch (err: any) {
        console.error(err);
        message.error(err.response?.data?.message || "Save failed");
      }
    },
  });

  const formData = [
    {
      title: "Cover Image",
      name: "imageUrl",
      type: "image",
      imageSize: "width: 500px, height: 500px",
    },
    { title: "Name", name: "name", type: "text" },
    { title: "Slug", name: "slug", type: "text" },
    { title: "Description", name: "description", type: "textArea" },
    { title: "Meta Title", name: "metaTitle", type: "text" },
    { title: "Meta Description", name: "metaDescription", type: "textArea" },
    { title: "Sort Order", name: "sortOrder", type: "number" },
    { title: "Active", name: "isActive", type: "checkbox" },
  ];

  return (
    <div className="">
      <FormikForm
        title={editId ? "Edit Category" : "New Category"}
        formik={formik}
        formData={formData}
        editId={editId}
        path="/masters/categories"
      />
    </div>
  );
};

export default BrandPage;
