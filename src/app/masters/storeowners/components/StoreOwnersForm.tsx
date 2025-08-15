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

const StoreOwnersForm = ({ editId }) => {
  const router = useRouter();
  const { fetchedData: owner, isLoading } = useQueryFetch(
    editId ? `store-owners/${editId}` : null
  );

  // Conditionally require password only when creating; optional on edit
  const passwordSchema = editId
    ? Yup.string().test(
        "password-length",
        "Minimum 6 characters",
        (value) => !value || value.length >= 6
      )
    : Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: passwordSchema,
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    avatarUrl: Yup.string().url("Must be a valid URL"),
  });

  const formik = useFormik({
    initialValues: {
      email: owner?.email || "",
      password: "", // always blank on edit or new
      firstName: owner?.firstName || "",
      lastName: owner?.lastName || "",
      phone: owner?.phone || "",
      avatarUrl: owner?.avatarUrl || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("adminToken") || "";
        const url = editId ? `store-owners/${editId}` : "store-owners";
        const method = editId ? "PATCH" : "POST";

        // If editing and no password entered, remove it so we don't overwrite
        if (editId && !values.password) {
          delete values.password;
        }

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
        router.push("/masters/storeowners");
      } catch (err: any) {
        message.error(err?.response.data?.message);
      }
    },
  });

  // Build form fields; omit password on edit
  const formData = [
    {
      title: "Avatar",
      name: "avatarUrl",
      type: "image",
      width: "120px",
      height: "120px",
      fontSize: 40,
      imageSize: "300×300px recommended",
    },
    { title: "Email", name: "email", type: "text" },
    ...(!editId
      ? [{ title: "Password", name: "password", type: "password" }]
      : []),
    { title: "First Name", name: "firstName", type: "text" },
    { title: "Last Name", name: "lastName", type: "text" },
    { title: "Phone", name: "phone", type: "text" },
  ];

  return (
    <div className="w-full">
      <FormikForm
        title={editId ? "Edit Store Owner" : "New Store Owner"}
        formData={formData}
        formik={formik}
        editId={editId}
        path="/masters/storeowners"
      />
    </div>
  );
};

export default StoreOwnersForm;
