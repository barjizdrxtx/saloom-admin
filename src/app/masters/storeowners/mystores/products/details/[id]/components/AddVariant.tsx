import React from "react";
import { ImagePreview } from "@/components/UI/ImagePreview/ImagePreview";

interface VariantForm {
  name: string;
  sku: string;
  price: string;
  comparePrice: string;
  costPrice: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: string;
}

type AddVariantProps = {
  handleSubmitVariant: (e: React.FormEvent) => void;
  variantForm: VariantForm;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
};

const AddVariant: React.FC<AddVariantProps> = ({
  handleSubmitVariant,
  variantForm,
  handleFormChange,
  handleCloseModal,
}) => {
  const textFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
  ];

  const priceFields = [
    { name: "price", label: "Price", required: true },
    { name: "comparePrice", label: "Compare Price" },
    { name: "costPrice", label: "Cost Price" },
  ];

  const dimensionFields = [
    { name: "weight", label: "Weight (kg)", step: "0.01" },
    { name: "length", label: "Length (cm)", step: "0.1" },
    { name: "width", label: "Width (cm)", step: "0.1" },
    { name: "height", label: "Height (cm)", step: "0.1" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 overflow-y-auto max-h-[90vh]">
        <h4 className="text-lg font-semibold mb-6">Add Variant</h4>
        <form onSubmit={handleSubmitVariant} className="space-y-6">
          {/* Image Upload */}
          <ImagePreview
            data={{ title: "Variant Image" }}
            image={variantForm.imageUrl}
            setImage={(url: string) =>
              handleFormChange({
                target: { name: "imageUrl", value: url },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            imageSize="200x200"
          />

          {/* Text Inputs */}
          {textFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={(variantForm as any)[field.name]}
                onChange={handleFormChange}
                required={field.required}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-300"
              />
            </div>
          ))}

          {/* Price Grid */}
          <div className="grid grid-cols-3 gap-4">
            {priceFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={(variantForm as any)[field.name]}
                  onChange={handleFormChange}
                  required={field.required}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-300"
                />
              </div>
            ))}
          </div>

          {/* Dimension Grid */}
          <div className="grid grid-cols-4 gap-4">
            {dimensionFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  step={field.step}
                  value={(variantForm as any)[field.name]}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-300"
                />
              </div>
            ))}
          </div>

          {/* Active & Sort Order */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={variantForm.isActive}
                onChange={handleFormChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <input
                type="number"
                name="sortOrder"
                value={variantForm.sortOrder}
                onChange={handleFormChange}
                className="mt-1 block w-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariant;
