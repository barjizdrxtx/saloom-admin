"use client";

import React, { useEffect, useState } from "react";
import { message } from "antd";
import { CustomIcon } from "../Icons/Icons";

export const ImagePreview = ({ data, image, setImage, imageSize, baseUrl }) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let revoke;
    if (!image) {
      setPreview(null);
      return;
    }
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreview(url);
      revoke = () => URL.revokeObjectURL(url);
      return revoke;
    }
    if (typeof image === "string") {
      const abs = image.startsWith("http")
        ? image
        : `${(baseUrl || "").replace(/\/+$/, "")}${
            image.startsWith("/") ? "" : "/"
          }${image}`;
      setPreview(abs);
    }
    return revoke;
  }, [image, baseUrl]);

  const handleAddImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!allowedFileTypes.includes(file.type)) {
      message.error("Allowed: JPEG, JPG, PNG, WEBP");
      return;
    }
    setImage(file);
    message.success("Image selected");
  };

  const handleRemoveImage = () => {
    setImage(null);
    message.info("Image removed");
  };

  return (
    <div className=" w-fit relative p-4 bg-white border border-gray-300 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-gray-800">{data.title}</h3>
      </div>

      <label
        htmlFor={`upload-input-${data.title}`}
        className={`relative flex justify-center items-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden cursor-pointer ${
          preview ? "" : "bg-gray-100"
        }`}
      >
        {preview ? (
          <div className="w-full h-full relative">
            <img
              src={preview}
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/40 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity"
              onClick={handleRemoveImage}
            >
              <div className="bg-red-500 w-8 h-8 flex justify-center items-center rounded-full">
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

      <div className="mt-3 text-start text-gray-600 text-xs space-y-1">
        <p>Use Square Image for Best Fit</p>
      </div>
    </div>
  );
};
