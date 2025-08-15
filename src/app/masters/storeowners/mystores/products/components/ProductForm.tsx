"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";
import { useQueryFetch, useQueryFetch2 } from "@/hooks/useQueryFetch";
import FormikForm from "@/components/UI/Formik/FormikForm";

export default function ProductPage({ editId }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeid") || "";

  // fetch existing product if editing
  const { fetchedData: data, isLoading } = useQueryFetch2(
    editId ? `products/${editId}` : null
  );
  const product = data?.data;

  // fetch categories for dropdown
  const { fetchedData: categories } = useQueryFetch(`categories`);

  // build formik
  const formik = useFormik({
    initialValues: {
      storeId: storeId,
      images: product?.images ?? [],
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      shortDescription: product?.shortDescription || "",
      sku: product?.sku || "",
      price: product?.price || "",
      comparePrice: product?.comparePrice || "",
      costPrice: product?.costPrice || "",
      weight: product?.weight || "",
      dimensions: product?.dimensions || { length: "", width: "", height: "" },
      categoryId: product?.categoryId,
      brand: product?.brand || "",
      metaTitle: product?.metaTitle || "",
      metaDescription: product?.metaDescription || "",
      isActive: product?.isActive ?? true,
      isFeatured: product?.isFeatured ?? false,
      requiresShipping: product?.requiresShipping ?? true,
      trackInventory: product?.trackInventory ?? true,
      seoUrl: product?.seoUrl || "",
      tags: (product?.tags || []).join(", "),
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("storeOwnerToken") || "";
        // start with all values
        let payload: any = {
          ...values,
          tags: values.tags.split(",").map((t: any) => t.trim()),
        };
        // when editing, omit slug & images
        if (editId) {
          const { slug, images, ...rest } = payload;
          payload = rest;
        }
        const url = editId ? `products/${editId}` : "products";
        const method = editId ? "patch" : "post";
        const res = await axios({
          method,
          url,
          data: payload,
          headers: { Authorization: `Bearer ${token}` },
        });
        message.success(res.data.message || "Saved successfully");
        router.back();
      } catch (err: any) {
        message.error(err?.response.data?.message);
      }
    },
  });

  // base form schema
  const baseFormData = [
    {
      title: "Images",
      name: "images",
      type: "multiImages",
      imageSize: "800x600",
    },
    { title: "Name", name: "name", type: "text" },

    { title: "Description", name: "description", type: "textEditor" },
    { title: "Short Description", name: "shortDescription", type: "text" },
    { title: "SKU", name: "sku", type: "text" },
    { title: "Price", name: "price", type: "number" },
    { title: "Compare Price", name: "comparePrice", type: "number" },
    { title: "Cost Price", name: "costPrice", type: "number" },
    { title: "Weight", name: "weight", type: "number" },
    { title: "Length", name: "dimensions.length", type: "number" },
    { title: "Width", name: "dimensions.width", type: "number" },
    { title: "Height", name: "dimensions.height", type: "number" },
    {
      title: "Category",
      name: "categoryId",
      type: "dropDown",
      dropData: categories,
      dropTitle: "name",
    },
    { title: "Brand", name: "brand", type: "text" },
    { title: "Meta Title", name: "metaTitle", type: "text" },
    { title: "Meta Description", name: "metaDescription", type: "text" },
    { title: "Active", name: "isActive", type: "checkbox" },
    { title: "Featured", name: "isFeatured", type: "checkbox" },
    { title: "Requires Shipping", name: "requiresShipping", type: "checkbox" },
    { title: "Track Inventory", name: "trackInventory", type: "checkbox" },
    { title: "Slug", name: "slug", type: "text" },
    { title: "SEO URL", name: "seoUrl", type: "text" },
    { title: "Tags", name: "tags", type: "text" },
  ];

  // remove slug & images fields from form when editing
  const formData = editId
    ? baseFormData.filter((f) => f.name !== "slug" && f.name !== "images")
    : baseFormData;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading…</div>
      </div>
    );
  }

  return (
    <div>
      <FormikForm
        title={editId ? "Edit Product" : "New Product"}
        formik={formik}
        formData={formData}
        editId={editId}
        path="/masters/products"
      />
    </div>
  );
}
