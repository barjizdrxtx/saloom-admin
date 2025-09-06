// CategorySection.tsx
"use client";

import React from "react";
import Actions from "@/components/UI/TableUI/Components/Actions";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { Pencil, Trash2 } from "lucide-react";

export type Mode = "list";
export type Category = {
  id: string;
  name?: string;
  isEnabled?: boolean;
  logoUrl?: string;
  isInExplore?: boolean;
  isInTopcategory?: boolean;
  isInToolsAndWorkshop?: boolean;
};

export type Product = {
  id: string;
  name?: string;
  brand?: { name?: string; logoUrl?: string };
  imageUrl?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  isEnabled?: boolean; // inactive => false
  isHomepageProduct?: boolean;
  categoryId?: string | null;
};

const MEDIA_BASE = "https://saloom-api.amalgamatetechnologies.com";

// resolve absolute media URL
const abs = (u?: string | null) =>
  u ? (u.startsWith("http") ? u : `${MEDIA_BASE}${u}`) : "";

/* tiny UI bits */
const Badge: React.FC<{
  children: React.ReactNode;
  tone?: "gray" | "green" | "amber" | "red" | "blue";
  subtle?: boolean;
}> = ({ children, tone = "gray", subtle = false }) => {
  const tones: Record<string, string> = {
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
    green: "bg-green-100 text-green-700 ring-green-200",
    amber: "bg-amber-100 text-amber-700 ring-amber-200",
    red: "bg-red-100 text-red-700 ring-red-200",
    blue: "bg-blue-100 text-blue-700 ring-blue-200",
  };
  const size = subtle ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ${size} ${
        tones[tone] || tones.gray
      }`}
    >
      {children}
    </span>
  );
};

const Dot: React.FC<{ ok: boolean }> = ({ ok }) => (
  <span
    className={`inline-block h-1.5 w-1.5 rounded-full ${
      ok ? "bg-emerald-500" : "bg-gray-300"
    }`}
  />
);

/* Row (list-only view). Disabled items are grayed. */
const ProductRow: React.FC<{ p: Product; onAfterAction: () => void }> = ({
  p,
  onAfterAction,
}) => {
  const id = p?.id;
  const name = (p?.name || "").trim() || "— Untitled —";
  const brandName = p?.brand?.name || "—";
  const brandLogo = p?.brand?.logoUrl ? abs(p.brand.logoUrl) : null;
  const img = p?.imageUrl ? abs(p.imageUrl) : null;
  const updated = p?.updatedAt
    ? new Date(p.updatedAt).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";
  const disabled = !p?.isEnabled;

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl bg-white ring-1 ring-gray-200 transition hover:bg-gray-50 ${
        disabled ? "opacity-90" : ""
      }`}
    >
      {/* thumb (grayscale when disabled) */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200 sm:h-20 sm:w-20">
        {img ? (
          <img
            src={img}
            alt={name}
            className={`h-full w-full object-cover ${
              disabled ? "grayscale" : ""
            }`}
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-gray-400">
            No image
          </div>
        )}

        {/* Disabled badge overlay */}
        {disabled && (
          <span className="absolute top-1 left-1 rounded-md bg-red-600/80 px-1.5 py-0.5 text-[10px] font-medium text-white shadow">
            Disabled
          </span>
        )}
      </div>

      <div className="flex-1 py-3 pr-2">
        {brandLogo ? (
          <div className="mt-1 flex items-end gap-2">
            <img
              src={brandLogo}
              alt={brandName}
              className="h-5 w-5 rounded object-cover ring-1 ring-gray-200"
              loading="lazy"
            />

            <span className="text-sm text-gray-700">{brandName}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-400">No Brand</span>
        )}
      </div>

      {/* right actions for product */}
      <div className="px-2 py-2 sm:px-3" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-xl bg-white px-2 py-1 ring-1 ring-gray-200 shadow-sm">
          <Actions
            id={id}
            editUrl="products"
            deleteApi="products"
            refetch={onAfterAction}
            actionButton={["EDIT", "DELETE"]}
          />
        </div>
      </div>
    </div>
  );
};

/* Category header with logo + custom Edit/Delete buttons */
const CategoryHeader: React.FC<{
  cat: Category;
  count: number;
  disabledCount: number;
  onAddProduct: (cat: Category) => void;
  onRefetch: () => void;
}> = ({ cat, count, disabledCount, onAddProduct, onRefetch }) => {
  const router = useRouter();

  const tokenHeader = (): Record<string, string> => {
    const token = Cookies.get("saloom_access_token") || "";
    return { Authorization: token ? `Bearer ${token}` : "" };
  };

  const handleEdit = () => {
    router.push(`/masters/categories/edit/${cat?.id}`);
  };

  const handleDelete = async () => {
    if (!cat?.id) return;
    const ok = window.confirm(
      `Delete category "${cat?.name || ""}"? This cannot be undone.`
    );
    if (!ok) return;
    try {
      await axios.delete(`categories/${cat.id}`, {
        headers: tokenHeader(),
      });
      onRefetch();
    } catch (e: any) {
      alert(e?.response?.data?.message || "Failed to delete category");
    }
  };

  const flags = [
    { key: "isInExplore", label: "Explore", on: !!cat?.isInExplore },
    {
      key: "isInTopcategory",
      label: "Top Category",
      on: !!cat?.isInTopcategory,
    },
    {
      key: "isInToolsAndWorkshop",
      label: "Tools & Workshop",
      on: !!cat?.isInToolsAndWorkshop,
    },
  ];
  const name = cat?.name || "Uncategorized";
  const catDisabled = !cat?.isEnabled;

  const catLogo = cat?.logoUrl ? abs(cat.logoUrl) : "";

  return (
    <div className="mb-3 px-2 sm:px-4">
      <div className="flex items-center justify-between">
        {/* Left: logo + name + counts */}
        <div className="flex items-center gap-3">
          {/* Category image (with fallback square) */}
          <div
            className={`h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-md ring-1 ring-gray-200 bg-gray-100 grid place-items-center ${
              catDisabled ? "grayscale" : ""
            }`}
            title={name}
          >
            {catLogo ? (
              <img
                src={catLogo}
                alt={name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                />
                <path
                  d="M7 15l3-3 3 3 4-4 3 3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" />
              </svg>
            )}
          </div>

          <h3
            className={`text-xl font-semibold ${
              catDisabled ? "text-gray-700" : "text-gray-900"
            }`}
          >
            {name}
          </h3>

          <Badge tone="gray" subtle>
            {count}
          </Badge>
          {disabledCount > 0 ? (
            <Badge tone="red" subtle>
              {disabledCount} disabled
            </Badge>
          ) : null}
          {catDisabled ? <Badge tone="red">Category Disabled</Badge> : null}
        </div>

        {/* Right: custom buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
            title="Edit Category"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            title="Delete Category"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

          <button
            onClick={() => onAddProduct(cat)}
            className="rounded-xl bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
            title="Add Product in this category"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Flags */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {flags.map((f) => (
          <span
            key={f.key}
            className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-gray-700 ring-1 ring-gray-200"
            title={`${f.label}: ${f.on ? "Yes" : "No"}`}
          >
            <Dot ok={!!f.on} />
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
};

/* Category section (list-only; shows both active+inactive products) */
const CategorySection: React.FC<{
  cat: Category;
  items: Product[];
  onAfterAction: () => void;
  onAddProduct: (cat: Category) => void;
}> = ({ cat, items, onAfterAction, onAddProduct }) => {
  const disabledCount = items.filter((p) => !p?.isEnabled).length;

  // Enabled first, then disabled at the bottom
  const enabledItems = items.filter((p) => p?.isEnabled);
  const disabledItems = items.filter((p) => !p?.isEnabled);
  const orderedItems = [...enabledItems, ...disabledItems];

  return (
    <section className="mb-10">
      <CategoryHeader
        cat={cat}
        count={items.length}
        disabledCount={disabledCount}
        onAddProduct={onAddProduct}
        onRefetch={onAfterAction}
      />

      {items.length === 0 ? (
        <div className="px-2 sm:px-4">
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
            No products in this category yet.
          </div>
        </div>
      ) : (
        <div className="space-y-3 px-2 sm:px-4">
          {orderedItems.map((p) => (
            <ProductRow key={p.id} p={p} onAfterAction={onAfterAction} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
