"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const UploadSVG = ({ value, onChange, onBlur, error }) => {
  const [pathData, setPathData] = useState(value || "");

  useEffect(() => {
    if (value) {
      setPathData(value);
    }
  }, [value]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(e.target.result, "image/svg+xml");
        const pathElement = doc.querySelector("path");

        if (pathElement) {
          const pathValue = pathElement.getAttribute("d");
          setPathData(pathValue);
          onChange(pathValue);
        } else {
          alert("No <path> element found in the SVG file.");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post(
        "/api/upload-path",
        { pathData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Path data uploaded successfully!");
      } else {
        alert("Failed to upload path data.");
      }
    } catch (error) {
      console.error("Error uploading path data:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/svg+xml"
        onChange={handleFileChange}
        onBlur={onBlur}
      />
      {pathData && (
        <div>
          <h3>Extracted Path Data</h3>
          <code>{pathData}</code>
          <button type="button" onClick={handleUpload}>
            Upload Path Data
          </button>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default UploadSVG;
