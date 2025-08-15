"use client";

import React, { useRef } from "react";
import axios from "axios";
import { message } from "antd";
import { CustomIcon } from "../Icons/Icons";

// Define the shape of each image slot
interface ImageSlot {
  imageUrl: string;
  altText?: string;
  sortOrder?: number;
  isPrimary?: boolean;
}

interface MultiImagePreviewProps {
  data: {
    title: string;
    width: number | string;
    height: number | string;
    fontSize?: number;
    imageSize?: string;
  };
  images: ImageSlot[];
  setImages: (images: ImageSlot[]) => void;
}

export const MultiImagePreview: React.FC<MultiImagePreviewProps> = ({
  data,
  images,
  setImages,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  // Handle a new file selection
  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedFileTypes.includes(file.type)) {
      message.error("Allowed file types: jpeg, jpg, png, webp");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/images/upload", formData);
      if (res.data.success) {
        const newImg: ImageSlot = {
          imageUrl: res.data.data.url,
          altText: "",
          sortOrder: images.length,
          isPrimary: false,
        };
        setImages([...images, newImg]);
        message.success("Image uploaded successfully");
      } else {
        message.error(res.data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      message.error("Error uploading image");
    } finally {
      e.target.value = ""; // reset file input
    }
  };

  // Remove an image slot by index
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    message.info("Image removed");
  };

  return (
    <div className="space-y-4">
      {/* Header with Add button */}
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{data.title}</h4>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Image
        </button>
      </div>

      {/* Grid of existing images + upload slot */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative border rounded overflow-hidden"
            style={{ width: data.width, height: data.height }}
          >
            <img
              src={img.imageUrl}
              alt={img.altText || `Image ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
            >
              <CustomIcon name="close" fontSize={16} className="text-white" />
            </button>
          </div>
        ))}

        {/* Upload placeholder slot */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition"
          style={{ width: data.width, height: data.height }}
        >
          <CustomIcon
            name="image"
            fontSize={data.fontSize || 40}
            className="text-gray-400"
          />
          <span className="text-sm text-gray-500 mt-2">Click to upload</span>
        </div>
      </div>

      {/* Hidden file input for uploads */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleAddImage}
        style={{ display: "none" }}
      />

      {/* Footer with recommended size */}
      {data.imageSize && (
        <div className="text-gray-400 text-sm">
          Recommended size: {data.imageSize}
        </div>
      )}
    </div>
  );
};
