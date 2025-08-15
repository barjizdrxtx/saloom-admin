// components/ImagePreview.jsx
"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";
import { CustomIcon } from "../Icons/Icons";

export const ImagePreview = ({ data, image, setImage, imageSize }) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const [preview, setPreview] = useState(null);

  // Build preview for either an existing URL string or a freshly-picked File
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (typeof image === "string") {
      setPreview(image);
    }
  }, [image]);

  const handleAddImage = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!allowedFileTypes.includes(file.type)) {
      message.error("Allowed: JPEG, JPG, PNG, WEBP");
      return;
    }

    // ✅ Set the File into Formik state (no upload here)
    setImage(file);
    message.success("Image selected");
  };

  const handleRemoveImage = () => {
    setImage(null);
    message.info("Image removed");
  };

  return (
    <div className="w-full max-w-xs relative p-4 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-gray-800">{data.title}</h3>
      </div>

      {/* Square Upload Area */}
      <label
        htmlFor={`upload-input-${data.title}`}
        className={`relative flex justify-center items-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden transition-opacity duration-300 cursor-pointer ${
          preview ? "hover:opacity-90" : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {preview ? (
          <div className="w-full h-full relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              onClick={handleRemoveImage}
            >
              <div className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-full shadow-lg">
                <CustomIcon name="close" fontSize={16} className="text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <CustomIcon name="image" fontSize={32} className="text-blue-400" />
            <p className="mt-1 text-gray-500 text-xs">Click to upload</p>
          </div>
        )}

        <input
          id={`upload-input-${data.title}`}
          type="file"
          accept={allowedFileTypes.join(",")}
          onChange={handleAddImage}
          className="hidden"
        />
      </label>

      {/* Footer */}
      <div className="mt-3 text-center text-gray-400 text-xs space-y-1">
        <p>Recommended size: {imageSize || "500×500"}</p>
        <p>Formats: JPG, PNG, WEBP</p>
      </div>
    </div>
  );
};
