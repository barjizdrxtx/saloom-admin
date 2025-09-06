"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryFetch } from "../../../hooks/useQueryFetch";
import FormikForm from "../../../components/UI/Formik/FormikForm";
import { message } from "antd";

const API_BASE = "https://saloom-api.amalgamatetechnologies.com";

const CategoryPage = ({ editId }: any) => {
  const router = useRouter();
  const { fetchedData: categories } = useQueryFetch(
    editId ? `categories/${editId}` : null
  );

  const formik = useFormik({
    initialValues: {
      name: categories?.name || "",
      logo: categories?.logoUrl || null,
      isEnabled: categories?.isEnabled ?? true,
      isInExplore: categories?.isInExplore ?? true,
      isInTopcategory: categories?.isInTopcategory ?? true,
      isInToolsAndWorkshop: categories?.isInToolsAndWorkshop ?? true,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("saloom_access_token") || "";
        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("isEnabled", String(!!values.isEnabled));
        fd.append("isInExplore", String(!!values.isInExplore));
        fd.append("isInTopcategory", String(!!values.isInTopcategory));
        fd.append(
          "isInToolsAndWorkshop",
          String(!!values.isInToolsAndWorkshop)
        );
        if (values.logo instanceof File) fd.append("logo", values.logo);

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
        router.push("/masters/products");
      } catch (err: any) {
        message.error(err?.response?.data?.message || "Something went wrong");
      }
    },
  });

  const formData = [
    {
      title: "Logo",
      name: "logo",
      type: "image",
      imageSize: "500×500",
      baseUrl: API_BASE, // used to resolve relative logoUrl
    },
    { title: "Name", name: "name", type: "text" },
    { title: "Enabled", name: "isEnabled", type: "checkbox" },
    { title: "Show in Explore", name: "isInExplore", type: "checkbox" },
    {
      title: "Show in Top Category",
      name: "isInTopcategory",
      type: "checkbox",
    },
    {
      title: "Show in Tools & Workshop",
      name: "isInToolsAndWorkshop",
      type: "checkbox",
    },
  ];

  return (
    <div className="w-full">
      <FormikForm
        title={editId ? "Edit Categories" : "New Categories"}
        formData={formData}
        formik={formik}
        editId={editId}
        path="/masters/products"
      />
    </div>
  );
};

export default CategoryPage;
