"use client";

import React from "react";
import Actions from "@/components/UI/TableUI/Components/Actions";

const MEDIA_BASE = "https://saloom-api.amalgamatetechnologies.com";

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
  isEnabled?: boolean;
  isHomepageProduct?: boolean;
  categoryId?: string | null;
};

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

/* card + row + header */
const ProductCard: React.FC<{ p: Product; onAfterAction: () => void }> = ({
  p,
  onAfterAction,
}) => {
  const id = p?.id;
  const name = (p?.name || "").trim() || "— Untitled —";
  const brandName = p?.brand?.name || "—";
  const brandLogo = p?.brand?.logoUrl
    ? `${MEDIA_BASE}${p.brand.logoUrl}`
    : null;
  const img = p?.imageUrl ? `${MEDIA_BASE}${p.imageUrl}` : null;
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
      className={`group overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-shadow hover:shadow-md ${
        disabled ? "opacity-90" : ""
      }`}
    >
      <div className="relative">
        <div
          className={`aspect-square overflow-hidden bg-gray-100 ${
            disabled ? "grayscale" : ""
          }`}
        >
          {img ? (
            <img
              src={img}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>

        <div
          className="absolute right-3 top-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rounded-xl bg-white/95 px-2 py-1 ring-1 ring-gray-300 backdrop-blur shadow">
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

      <div className="p-3">
        <h4 className="line-clamp-2 font-medium text-gray-900">{name}</h4>
        <div className="mt-2 flex items-center gap-2">
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={brandName}
              className="h-5 w-5 rounded object-cover ring-1 ring-gray-200"
              loading="lazy"
            />
          ) : null}
          <span className="text-sm text-gray-700">{brandName}</span>
        </div>
        {p?.description?.trim() ? (
          <p className="mt-2 line-clamp-2 text-xs text-gray-500">
            {p.description}
          </p>
        ) : null}
        <div className="mt-3 text-[11px] text-gray-500">Updated: {updated}</div>
      </div>
    </div>
  );
};

const ProductRow: React.FC<{ p: Product; onAfterAction: () => void }> = ({
  p,
  onAfterAction,
}) => {
  const id = p?.id;
  const name = (p?.name || "").trim() || "— Untitled —";
  const brandName = p?.brand?.name || "—";
  const brandLogo = p?.brand?.logoUrl
    ? `${MEDIA_BASE}${p.brand.logoUrl}`
    : null;
  const img = p?.imageUrl ? `${MEDIA_BASE}${p.imageUrl}` : null;
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
      <div
        className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200 sm:h-20 sm:w-20 ${
          disabled ? "grayscale" : ""
        }`}
      >
        {img ? (
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 py-3 pr-2">
        <div className="mt-1 flex items-center gap-2">
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={brandName}
              className="h-5 w-5 rounded object-cover ring-1 ring-gray-200"
              loading="lazy"
            />
          ) : null}
          <span className="text-sm text-gray-700">{brandName}</span>
        </div>

        {p?.description?.trim() ? (
          <p className="mt-1 line-clamp-1 text-xs text-gray-500">
            {p.description}
          </p>
        ) : null}

        <div className="mt-1 text-[11px] text-gray-500">Updated: {updated}</div>
      </div>

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

const CategoryHeader: React.FC<{
  cat: Category;
  count: number;
  disabledCount: number;
  onAddProduct: (cat: Category) => void;
  onRefetch: () => void;
}> = ({ cat, count, disabledCount, onAddProduct, onRefetch }) => {
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

  return (
    <div className="mb-3 px-2 sm:px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddProduct(cat)}
            className="rounded-xl bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black"
            title="Add Product in this category"
          >
            Add Product
          </button>
        </div>
      </div>

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

        {cat?.logoUrl ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 ring-1 ring-gray-200">
            <img
              src={`${MEDIA_BASE}${cat.logoUrl}`}
              alt={name}
              className="h-4 w-4 rounded object-cover"
              loading="lazy"
            />
            <span className="text-xs text-gray-700">Logo</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

const CategorySection: React.FC<{
  cat: Category;
  items: Product[];
  onAfterAction: () => void;
  onAddProduct: (cat: Category) => void;
}> = ({ cat, items, onAfterAction, onAddProduct }) => {
  const disabledCount = items.filter((p) => !p?.isEnabled).length;

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
          {items.map((p) => (
            <ProductRow key={p.id} p={p} onAfterAction={onAfterAction} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
