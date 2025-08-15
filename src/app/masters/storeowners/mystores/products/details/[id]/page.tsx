"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { StepProgress } from "../../../components/StepProgress";
import AddVariant from "./components/AddVariant";
import Cookies from "js-cookie";

const ProductDetailPage = ({ params }: any) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [variantForm, setVariantForm] = useState({
    name: "",
    sku: "",
    price: "",
    comparePrice: "",
    costPrice: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    imageUrl: "",
    isActive: true,
    sortOrder: "0",
  });

  const fetchProduct = () => {
    if (!id) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.data ?? res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch product.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleOpenModal = () => {
    setVariantForm({
      name: "",
      sku: "",
      price: "",
      comparePrice: "",
      costPrice: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      imageUrl: "",
      isActive: true,
      sortOrder: "0",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVariantForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmitVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Retrieve auth token
      const token = Cookies.get("adminToken") || "";

      // Send variant data with Authorization header
      await axios.post(
        `/product-variants`,
        {
          productId: parseInt(id, 10),
          name: variantForm.name,
          sku: variantForm.sku,
          price: variantForm.price,
          comparePrice: variantForm.comparePrice,
          costPrice: variantForm.costPrice,
          weight: variantForm.weight,
          dimensions: {
            length: parseFloat(variantForm.length),
            width: parseFloat(variantForm.width),
            height: parseFloat(variantForm.height),
          },
          imageUrl: variantForm.imageUrl,
          isActive: variantForm.isActive,
          sortOrder: parseInt(variantForm.sortOrder, 10),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleCloseModal();
      fetchProduct();
    } catch (err) {
      console.error(err);
      // Optionally show error to user
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-indigo-500 font-semibold">
          Loading product...
        </div>
      </div>
    );
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!product)
    return (
      <div className="p-6 text-center text-gray-500">No product found.</div>
    );

  const {
    productImages = [],
    categories,
    stores,
    productVariants = [],
    productReviews = [],
    dimensions = {},
    tags = [],
    ...fields
  } = product;

  const mainImage = productImages[0]?.imageUrl;
  const altText = productImages[0]?.altText || product.name;

  const infoRows: [string, any][] = [
    ["ID", fields.id],
    ["Slug", fields.slug],
    ["Short Description", fields.shortDescription],
    ["SKU", fields.sku],
    ["Brand", fields.brand],
    ["Price", `$${fields.price}`],
    ["Compare Price", <s key="cp">${fields.comparePrice}</s>],
    ["Cost Price", `$${fields.costPrice}`],
    ["Weight", `${fields.weight} kg`],
    [
      "Dimensions",
      `${dimensions.width}×${dimensions.height}×${dimensions.length}`,
    ],
    ["Category ID", fields.categoryId],
    ["Meta Title", fields.metaTitle],
    ["Meta Description", fields.metaDescription],
    ["SEO URL", fields.seoUrl],
    ["Active", fields.isActive ? "Yes" : "No"],
    ["Featured", fields.isFeatured ? "Yes" : "No"],
    ["Requires Shipping", fields.requiresShipping ? "Yes" : "No"],
    ["Track Inventory", fields.trackInventory ? "Yes" : "No"],
    ["Created At", dayjs(fields.createdAt).format("MMM D, YYYY HH:mm")],
    ["Updated At", dayjs(fields.updatedAt).format("MMM D, YYYY HH:mm")],
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen py-4 px-4">
      <StepProgress currentStep={4} />

      <div className="mt-5 w-full bg-indigo-600 rounded-lg shadow-lg p-8 mb-8 text-white flex flex-col md:flex-row items-center gap-6">
        {mainImage && (
          <img
            src={mainImage}
            alt={altText}
            className="w-full md:w-1/4 rounded-lg border-4 border-white"
          />
        )}
        <div className="flex-1 space-y-3">
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <p className="text-lg">{product.description}</p>
          <div className="flex items-center gap-4 mt-4">
            {stores.logoUrl && (
              <img
                src={stores.logoUrl}
                alt={stores.name}
                className="w-16 h-16 rounded-full ring-4 ring-indigo-300"
              />
            )}
            <div className="space-y-1">
              <div className="text-xl font-semibold">{stores.name}</div>
              <div className="text-sm opacity-90">
                {stores.currency} • {stores.timezone}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Details</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {infoRows.map(([label, value]) => (
              <React.Fragment key={label}>
                <dt className="text-sm font-medium text-gray-500 uppercase">
                  {label}
                </dt>
                <dd className="text-sm text-gray-800">{value}</dd>
              </React.Fragment>
            ))}
            <dt className="text-sm font-medium text-gray-500 uppercase">
              Tags
            </dt>
            <dd>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </dd>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-teal-600">Category</h3>
          <div className="flex items-center gap-4">
            {categories.imageUrl && (
              <img
                src={categories.imageUrl}
                alt={categories.name}
                className="w-20 h-20 rounded-lg border-2 border-teal-200"
              />
            )}
            <div>
              <div className="text-lg font-medium">{categories.name}</div>
              <div className="text-sm text-gray-500">
                {categories.description}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-teal-600">
              Variants & Reviews
            </h3>
            <button
              onClick={handleOpenModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Add Variant
            </button>
          </div>
          <p className="text-sm mb-2">
            Variants:{" "}
            <span className="font-medium">{productVariants.length}</span>
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 mb-4">
            {productVariants.map((v: any) => (
              <li key={v.id}>
                <span className="font-medium">{v.name}</span> (SKU: {v.sku}) — $
                {v.price}
              </li>
            ))}
          </ul>
          <p className="text-sm">
            Reviews:{" "}
            <span className="font-medium">{productReviews.length}</span>
          </p>

          {showModal && (
            <AddVariant
              handleSubmitVariant={handleSubmitVariant}
              variantForm={variantForm}
              handleFormChange={handleFormChange}
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
