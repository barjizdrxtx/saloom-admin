"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { message } from "antd";
import { User, Lock, Eye, EyeOff, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

// Validation
const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Input Field
function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  icon,
  rightSlot,
}: any) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-[#4A2515] mb-2">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-2xl border bg-white transition focus-within:shadow-lg focus-within:shadow-[#D38729]/30 focus-within:ring-2 focus-within:ring-[#D38729] ${
          error ? "border-red-400 ring-2 ring-red-100" : "border-gray-300"
        }`}
      >
        {icon && <span className="pl-3 pr-1 text-gray-400">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={label}
          autoComplete="off"
          className="w-full py-3 px-3 rounded-2xl outline-none bg-white text-gray-900 placeholder:text-gray-400"
        />
        {rightSlot && (
          <span className="absolute right-3 inset-y-0 flex items-center">
            {rightSlot}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}

// Page
const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, helpers) => {
      try {
        const { data } = await axios.post("auth/login", values);
        if (data?.success) {
          Cookies.set("adminToken", data?.result?.access_token);
          message.success("Login Successful");
          router.push("/masters/products");
        } else {
          message.error(data?.message || "Login failed");
        }
      } catch (err: any) {
        message.error(err?.response?.data?.message ?? "Please Try Again");
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  const userErr = (formik.touched.username && formik.errors.username) || "";
  const passErr = (formik.touched.password && formik.errors.password) || "";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FBF3EA]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#D38729] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#4A2515] opacity-20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_10px_50px_-15px_rgba(0,0,0,0.2)] md:grid-cols-2"
        >
          {/* Left panel */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D38729] via-[#ff773d] to-[#c34a16]" />
            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <BadgeCheck className="h-4 w-4" />
                  Secure Access
                </div>
                <h1 className="mt-6 text-3xl font-extrabold leading-tight">
                  Welcome Back
                </h1>
                <p className="mt-2 text-white/80">
                  Sign in to manage products, track performance, and keep your
                  dashboard up to date.
                </p>
              </div>
              <ul className="mt-10 space-y-4">
                {[
                  "Lightning-fast dashboard",
                  "Role-based secure login",
                  "Modern, responsive UI",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-white/70">
                © {new Date().getFullYear()} Dashboard
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-8 md:p-10">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#4A2515]">
                Login to Dashboard
              </h2>
              <p className="mt-1 text-gray-600">
                Please enter your details to proceed
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} noValidate>
              <InputField
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={userErr}
                icon={<User className="h-5 w-5" />}
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={passErr}
                icon={<Lock className="h-5 w-5" />}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                }
              />
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#D38729] to-[#d34d13] px-4 py-3 text-white shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D38729] ${
                  formik.isSubmitting
                    ? "opacity-80"
                    : "hover:from-[#4A2515] hover:to-[#D38729]"
                }`}
              >
                <span className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {formik.isSubmitting ? "Signing in…" : "Login"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
