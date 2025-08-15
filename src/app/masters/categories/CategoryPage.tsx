// pages/masters/product/[editId]?.jsx
"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryFetch } from "../../../hooks/useQueryFetch";
import FormikForm from "../../../components/UI/Formik/FormikForm";
import { message } from "antd";

// ✅ Validation intentionally kept commented out per your request
// import * as Yup from "yup";
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   features: Yup.string(),
//   description: Yup.string(),
//   price: Yup.number().required("Price is required"),
//   categoryId: Yup.string().required("Category ID is required"),
//   brandId: Yup.string().required("Brand ID is required"),
//   isEnabled: Yup.boolean(),
//   isHomepageProduct: Yup.boolean(),
//   logo: Yup.mixed(),
// });

const CategoryPage = ({ editId }: any) => {
  const router = useRouter();
  const { fetchedData: product } = useQueryFetch(
    editId ? `categories/${editId}` : null
  );

  const formik = useFormik({
    initialValues: {
      // Basic fields
      name: product?.name || "",

      // logo:
      // - For new: null (file will be selected)
      // - For edit: you can show existing URL; if user selects a new file, it replaces it
      logo: product?.logoUrl || null,
    },
    // validationSchema, // commented out
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("adminToken") || "";

        // Build FormData; only append logo if it's a File (i.e., user picked a new one)
        const fd = new FormData();

        const entries = {
          name: values.name,
        };

        Object.entries(entries).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(k, v);
        });

        if (values.logo instanceof File) {
          fd.append("logo", values.logo);
        }
        // If editing and no new file selected, omit "logo" so backend keeps existing one.

        const url = editId ? `categories/${editId}` : "categories";
        const method = editId ? "PATCH" : "POST";

        const res = await axios({
          method,
          url,
          data: fd,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        message.success(res?.data?.message || "Saved");
        router.push("/masters/categories");
      } catch (err: any) {
        message.error(err?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const formData = [
    { title: "Logo", name: "logo", type: "image", logoSize: "500×500" },
    { title: "Name", name: "name", type: "text" },
  ];

  return (
    <div className="w-full">
      <FormikForm
        title={editId ? "Edit Categories" : "New Categories"}
        formData={formData}
        formik={formik}
        editId={editId}
        path="/masters/categories"
      />
    </div>
  );
};

export default CategoryPage;
