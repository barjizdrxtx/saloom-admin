// pages/masters/store/[editId]?.jsx
"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useQueryFetch } from "@/hooks/useQueryFetch";
import FormikForm from "@/components/UI/Formik/FormikForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  slug: Yup.string().required("Slug is required"),
  description: Yup.string(),
  logoUrl: Yup.string().url("Must be a valid URL"),
  status: Yup.string().required("Status is required"),
  currency: Yup.string().required("Currency is required"),
});

const StoresForm = ({ editId }: any) => {
  const router = useRouter();
  const { fetchedData: store, isLoading } = useQueryFetch(
    editId ? `stores/${editId}` : null
  );

  const formik = useFormik({
    initialValues: {
      name: store?.name || "",
      slug: store?.slug || "",
      description: store?.description || "",
      logoUrl: store?.logoUrl || "",
      status: store?.status || "active",
      currency: store?.currency || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("storeOwnerToken") || "";
        const url = editId ? `stores/${editId}` : "stores";
        const method = editId ? "PUT" : "POST";

        const res = await axios({
          method,
          url,
          data: values,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        message.success(res.data.message || "Saved successfully");
        router.back();
      } catch (err: any) {
        message.error(err?.response.data?.message);
      }
    },
  });

  const formData = [
    {
      title: "Logo",
      name: "logoUrl",
      type: "image",
      width: "200px",
      height: "200px",
      fontSize: 50,
      imageSize: "w-1080px h- 1080px",
      imageZoom: "100px",
    },
    { title: "Name", name: "name", type: "text" },
    { title: "Slug", name: "slug", type: "text" },
    { title: "Description", name: "description", type: "text" },

    {
      title: "Status",
      name: "status",
      type: "dropDown",
      dropTitle: "title",
      dropData: [
        { id: "active", title: "Active" },
        { id: "inactive", title: "Inactive" },
      ],
    },
    { title: "Currency", name: "currency", type: "text" },
  ];

  return (
    <div className="w-full">
      <FormikForm
        title={editId ? "Edit Store" : "New Store"}
        formData={formData}
        formik={formik}
        editId={editId}
        path="/masters/stores"
      />
    </div>
  );
};

export default StoresForm;
