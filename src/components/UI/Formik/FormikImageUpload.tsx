import React, { useState } from "react";

const FormikImageUpload = ({ data, value, onChange, onBlur, error }: any) => {
  const [preview, setPreview] = useState(value);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label>{data.label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        onBlur={onBlur}
      />
      {preview && <img src={preview} alt="Preview" className="mt-2" />}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default FormikImageUpload;
