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
//   title: Yup.string().required("title is required"),
//   features: Yup.string(),
//   description: Yup.string(),
//   price: Yup.number().required("Price is required"),
//   categoryId: Yup.string().required("Category ID is required"),
//   brandId: Yup.string().required("Brand ID is required"),
//   isEnabled: Yup.boolean(),
//   isHomepageProduct: Yup.boolean(),
//   image: Yup.mixed(),
// });

const GalleryPage = ({ editId }: any) => {
  const router = useRouter();
  const { fetchedData: product } = useQueryFetch(
    editId ? `gallery/${editId}` : null
  );

  const formik = useFormik({
    initialValues: {
      // Basic fields
      title: product?.title || "",
      description: product?.description || "",
      isEnabled: product?.isEnabled ?? true,

      // Image:
      // - For new: null (file will be selected)
      // - For edit: you can show existing URL; if user selects a new file, it replaces it
      image: product?.imageUrl || null,
    },
    // validationSchema, // commented out
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("adminToken") || "";

        // Build FormData; only append image if it's a File (i.e., user picked a new one)
        const fd = new FormData();

        const entries = {
          title: values.title,
          description: values.description,
          isEnabled: values.isEnabled ? "true" : "false",
        };

        Object.entries(entries).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(k, v);
        });

        if (values.image instanceof File) {
          fd.append("image", values.image);
        }
        // If editing and no new file selected, omit "image" so backend keeps existing one.

        const url = editId ? `gallery/${editId}` : "gallery";
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
        router.push("/masters/gallery");
      } catch (err: any) {
        message.error(err?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const formData = [
    { title: "Image", name: "image", type: "image", imageSize: "500×500" },
    { title: "title", name: "title", type: "text" },
    { title: "Description", name: "description", type: "text" },
    { title: "Enabled", name: "isEnabled", type: "checkbox" },
  ];

  return (
    <div classtitle="w-full">
      <FormikForm
        title={editId ? "Edit Product" : "New Product"}
        formData={formData}
        formik={formik}
        editId={editId}
        path="/masters/products"
      />
    </div>
  );
};

export default GalleryPage;
