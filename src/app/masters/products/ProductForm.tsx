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
import * as Yup from "yup";

// ✅ Validation intentionally kept commented out per your request
// import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  // features: Yup.string(),
  // description: Yup.string(),
  categoryId: Yup.string().required("Category ID is required"),
  // brandId: Yup.string().required("Brand ID is required"),
  // isEnabled: Yup.boolean(),
  // isHomepageProduct: Yup.boolean(),
  // image: Yup.mixed(),
});

const ProductForm = ({ editId }: any) => {
  const API_BASE = "https://saloom-api.amalgamatetechnologies.com";

  const router = useRouter();
  const { fetchedData: product } = useQueryFetch(
    editId ? `products/${editId}` : null
  );

  const { fetchedData: categories } = useQueryFetch(`categories`);

  const { fetchedData: brands } = useQueryFetch(`brands`);

  const formik = useFormik({
    initialValues: {
      // Basic fields
      name: product?.name || "",
      features: product?.features || "",
      description: product?.description || "",
      categoryId: product?.categoryId ?? "",
      brandId: product?.brandId ?? "",
      isEnabled: product?.isEnabled ?? true,
      isHomepageProduct: product?.isHomepageProduct ?? false,
      // Image:
      // - For new: null (file will be selected)
      // - For edit: you can show existing URL; if user selects a new file, it replaces it
      image: product?.imageUrl || null,
    },
    validationSchema, // commented out
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("saloom_access_token") || "";

        // Build FormData; only append image if it's a File (i.e., user picked a new one)
        const fd = new FormData();

        const entries = {
          name: values.name,
          features: values.features,
          description: values.description,
          categoryId: values.categoryId,
          brandId: values.brandId,
          isEnabled: values.isEnabled ? "true" : "false",
          isHomepageProduct: values.isHomepageProduct ? "true" : "false",
        };

        Object.entries(entries).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(k, v);
        });

        if (values.image instanceof File) {
          fd.append("image", values.image);
        }
        // If editing and no new file selected, omit "image" so backend keeps existing one.

        const url = editId ? `products/${editId}` : "products";
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
        router.push("/masters/products");
      } catch (err: any) {
        message.error(err?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const formData = [
    {
      title: "Image",
      name: "image",
      type: "image",
      imageSize: "500×500",
      baseUrl: API_BASE,
    },
    { title: "Name", name: "name", type: "text" },
    { title: "Features", name: "features", type: "text" },
    {
      title: "Description",
      name: "description",
      type: "textEditor",
      colSpan: 1,
    },
    {
      title: "Category ID",
      name: "categoryId",
      type: "dropDown",
      dropData: categories,
      dropTitle: "name",
    },
    {
      title: "Brand ID",
      name: "brandId",
      type: "dropDown",
      dropData: brands,
      dropTitle: "name",
    },
    { title: "Enabled", name: "isEnabled", type: "checkbox" },
    { title: "Homepage Product", name: "isHomepageProduct", type: "checkbox" },
  ];

  return (
    <div className="w-full">
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

export default ProductForm;
