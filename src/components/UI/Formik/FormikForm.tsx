// components/UI/Formik/FormikForm.jsx
"use client";

import React from "react";
import FormikDropDown from "./FormikDropDown";
import FormikCheckBox from "./FormikCheckBox";
import FormikDatePicker from "./FormikDatePicker";
import { PrimaryButton } from "../Button/CustomizedButton";
import UploadSVG from "../ImagePreview/UploadSVG";
import FormikTextField from "./FormikTextField";
import FormikTextEditor from "./FormikTextEditor";
import FormikTextArea from "./FormikTextArea";
import { useRouter } from "next/navigation";
import FormikDateTimePicker from "./FormikDateTimePicker";
import FormikColorPicker from "./FormikColorPicker";
import MapLocation from "./MapLocation";
import { ImagePreview } from "../ImagePreview/ImagePreview";

const FormikForm = ({
  title,
  formik,
  formData,
  editId,
  path,
  width = "full",
  gridMd = "grid-cols-2",
}) => {
  const router = useRouter();

  return (
    <div className="xs:full md:w-4/6 px-5 flex flex-col justify-center items-start pb-96">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-5">
        <div className="text-2xl font-bold">
          {editId ? ` ${title}` : `Add  ${title}`}
        </div>
        <div className="xs:hidden md:flex justify-end items-start">
          <button
            onClick={() => formik.handleSubmit()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-200"
          >
            {editId ? "Update" : "Save"}
          </button>
          <div className="mx-2" />
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transform hover:scale-105 transition-transform duration-200"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div
          className={`w-${width} grid grid-cols-1
         
           gap-x-4 gap-y-2`}
        >
          {/* md:${gridMd} */}
          {formData.map((field, idx) => {
            const span = field.grid === 1 ? "md:col-span-2" : "md:col-span-1";
            const value = field.name.includes(".")
              ? field.name
                  .split(".")
                  .reduce((acc, k) => (acc ? acc[k] : undefined), formik.values)
              : formik.values[field.name];

            return (
              <div key={idx} className={span}>
                {/* TEXT / NUMBER / EMAIL / PASSWORD */}
                {["text", "number", "email", "password"].includes(
                  field.type
                ) && (
                  <FormikTextField
                    data={field}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* TEXT EDITOR */}
                {field.type === "textEditor" && (
                  <FormikTextEditor
                    data={field}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* COLOR PICKER */}
                {field.type === "colorPicker" && (
                  <FormikColorPicker
                    data={field}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* TEXTAREA */}
                {field.type === "textArea" && (
                  <FormikTextArea
                    data={field}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* SVG UPLOAD */}
                {field.type === "svg" && (
                  <UploadSVG
                    value={value}
                    onChange={(val) => formik.setFieldValue(field.name, val)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* SINGLE IMAGE PREVIEW */}
                {field.type === "image" && (
                  <ImagePreview
                    data={field}
                    imageSize={field.imageSize}
                    baseUrl={field.baseUrl}
                    image={formik.values[field.name]}
                    setImage={(val) => formik.setFieldValue(field.name, val)}
                  />
                )}

                {/* DROPDOWN */}
                {field.type === "dropDown" && (
                  <FormikDropDown
                    data={field}
                    value={value}
                    onChange={(val) => formik.setFieldValue(field.name, val)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* DATE PICKER */}
                {field.type === "date" && (
                  <FormikDatePicker
                    data={field}
                    value={value}
                    onChange={(val) => formik.setFieldValue(field.name, val)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* DATE-TIME PICKER */}
                {field.type === "dateTime" && (
                  <FormikDateTimePicker
                    data={field}
                    value={value}
                    onChange={(val) => formik.setFieldValue(field.name, val)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <FormikCheckBox
                    data={field}
                    value={formik.values[field.name]}
                    onChange={(val) => formik.setFieldValue(field.name, val)}
                    onBlur={() => formik.setFieldTouched(field.name, true)}
                    error={
                      formik.touched[field.name] && formik.errors[field.name]
                    }
                  />
                )}

                {/* MAP LOCATION */}
                {field.type === "mapLocation" && <MapLocation />}
              </div>
            );
          })}
        </div>
      </form>

      {/* Mobile Buttons */}
      {title !== "Event" && (
        <div className="xs:flex md:hidden bg-white w-full flex justify-start items-start mt-10 space-x-4">
          <PrimaryButton onClick={() => formik.handleSubmit()}>
            {editId ? "Update" : "Save"}
          </PrimaryButton>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FormikForm;
