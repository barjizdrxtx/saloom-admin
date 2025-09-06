// pages/products.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import Actions from "@/components/UI/TableUI/Components/Actions"; // adjust if the path differs

/* ───────────────────────── Constants ───────────────────────── */
const MEDIA_BASE = "https://saloom-api.amalgamatetechnologies.com";

/* ───────────────────────── Types ───────────────────────── */
type Mode = "grid" | "list";

type Brand = {
  name?: string;
  logoUrl?: string;
};

type Product = {
  id: string;
  name?: string;
  brand?: Brand;
  imageUrl?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  isEnabled?: boolean;
  isHomepageProduct?: boolean;
  categoryId?: string | null;
};

type Category = {
  id: string;
  name?: string;
  isEnabled?: boolean;
  logoUrl?: string;
  isInExplore?: boolean;
  isInTopcategory?: boolean;
  isInToolsAndWorkshop?: boolean;
};

type Totals = {
  categories: number;
  products: number;
};

/* ───────────────────────── Utils ───────────────────────── */
function slugify(s = "") {
  return s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/* ───────────────────────── Small UI Bits ───────────────────────── */
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
      className={`inline-flex items-center font-medium rounded-full ring-1 ${size} ${
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

/* ───────────────── View Toggle (icon-only) ───────────────── */
const ViewToggle: React.FC<{ mode: Mode; setMode: (m: Mode) => void }> = ({
  mode,
  setMode,
}) => {
  const Btn: React.FC<{
    k: Mode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = ({ k, label, icon: Icon }) => {
    const active = mode === k;
    return (
      <button
        type="button"
        onClick={() => setMode(k)}
        aria-pressed={active}
        title={label}
        className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm transition
          ${
            active
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
          }`}
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Btn k="grid" label="Cards" icon={LayoutGrid} />
      <Btn k="list" label="List" icon={List} />
    </div>
  );
};

/* ───────────────── Header Bar ───────────────── */
const HeaderBar: React.FC<{
  totals: Totals;
  query: string;
  setQuery: (q: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  onRefresh: () => void;
  onAddCategory: () => void;
}> = ({ query, setQuery, mode, setMode, onAddCategory }) => {
  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
            Products by Category
          </h1>
        </div>

        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-full md:w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories or products…"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ⌕
            </div>
          </div>

          <ViewToggle mode={mode} setMode={setMode} />

          <button
            onClick={onAddCategory}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            title="Add Category"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────────── Category Tabs ───────────────── */
const CategoryTabs: React.FC<{
  tab: "enabled" | "disabled";
  setTab: (t: "enabled" | "disabled") => void;
  enabledCount: number;
  disabledCount: number;
}> = ({ tab, setTab, enabledCount, disabledCount }) => {
  const Btn: React.FC<{
    id: "enabled" | "disabled";
    label: string;
    count: number;
  }> = ({ id, label, count }) => {
    const active = tab === id;
    return (
      <button
        onClick={() => setTab(id)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
          active
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
        }`}
      >
        {label}{" "}
        <span className={active ? "opacity-80" : "text-gray-400"}>
          ({count})
        </span>
      </button>
    );
  };
  return (
    <div className="sticky top-[68px] z-10 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl gap-2 px-4 py-3">
        <Btn id="enabled" label="Enabled" count={enabledCount} />
        <Btn id="disabled" label="Disabled" count={disabledCount} />
      </div>
    </div>
  );
};

/* ─────────────── Product Card & Row ─────────────── */
const ProductCard: React.FC<{
  p: Product;
  onAfterAction: () => void;
}> = ({ p, onAfterAction }) => {
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
      {/* Image */}
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

        {/* Product badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {p?.isHomepageProduct ? (
            <Badge tone="amber" subtle>
              Homepage
            </Badge>
          ) : null}
          {disabled ? (
            <Badge tone="red" subtle>
              Disabled
            </Badge>
          ) : (
            <Badge tone="green" subtle>
              Enabled
            </Badge>
          )}
        </div>

        {/* Actions */}
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

      {/* Card body */}
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

const ProductRow: React.FC<{
  p: Product;
  onAfterAction: () => void;
}> = ({ p, onAfterAction }) => {
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
      {/* thumb */}
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

      {/* middle */}
      <div className="flex-1 py-3 pr-2">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-medium text-gray-900">{name}</h4>
          {p?.isHomepageProduct ? <Badge tone="amber">Homepage</Badge> : null}
          {disabled ? (
            <Badge tone="red">Disabled</Badge>
          ) : (
            <Badge tone="green">Enabled</Badge>
          )}
        </div>

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

      {/* right actions */}
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

/* ─────────────── Category Header ─────────────── */
const CategoryHeader: React.FC<{
  cat: Category;
  count: number;
  disabledCount: number;
  onAddProduct: (cat: Category) => void;
  onRefetch: () => void;
}> = ({ cat, count, disabledCount, onAddProduct, onRefetch }) => {
  const flags = [
    { key: "isEnabled", label: "Enabled", on: !!cat?.isEnabled },
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

        {/* Category actions (Edit/Delete) */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-white px-2 py-1 ring-1 ring-gray-200">
            <Actions
              id={cat?.id}
              editUrl="categories"
              deleteApi="categories"
              refetch={onRefetch}
              actionButton={["EDIT", "DELETE"]}
            />
          </div>
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

/* ─────────────── Category Section ─────────────── */
const CategorySection: React.FC<{
  cat: Category;
  items: Product[];
  mode: Mode;
  onAfterAction: () => void;
  onAddProduct: (cat: Category) => void;
}> = ({ cat, items, mode, onAfterAction, onAddProduct }) => {
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
      ) : mode === "grid" ? (
        <div className="px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} onAfterAction={onAfterAction} />
            ))}
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

/* ─────────────── Page ─────────────── */
export default function ProductsByCategoryPage(): JSX.Element {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("grid");
  const [tab, setTab] = useState<"enabled" | "disabled">("enabled");
  const [query, setQuery] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  const tokenHeader = (): Record<string, string> => {
    const token = Cookies.get("saloom_access_token") || "";
    return { Authorization: token ? `Bearer ${token}` : "" };
  };

  // Pull ALL categories (walk pagination)
  const fetchAllCategories = async (): Promise<Category[]> => {
    const pageSize = 100;
    let page = 1;
    let all: Category[] = [];
    // relies on axios baseURL being configured globally elsewhere
    while (true) {
      const { data } = await axios.get("categories?inactive=true", {
        params: { page, limit: pageSize },
        headers: tokenHeader(),
      });
      const batch: Category[] = Array.isArray(data?.result) ? data.result : [];
      all = all.concat(batch);
      if (batch.length < pageSize) break;
      page += 1;
      if (page > 50) break; // hard ceiling
    }
    return all;
  };

  // Pull ALL products
  const fetchAllProducts = async (): Promise<Product[]> => {
    const pageSize = 1000;
    const { data } = await axios.get("products", {
      params: { page: 1, limit: pageSize },
      headers: tokenHeader(),
    });
    return Array.isArray(data?.result) ? (data.result as Product[]) : [];
  };

  const refresh = async () => {
    setLoading(true);
    setErr("");
    try {
      const [cats, prods] = await Promise.all([
        fetchAllCategories(),
        fetchAllProducts(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (e: any) {
      setErr(e?.message || "Failed to load data.");
      setCategories([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map products into categoryId buckets
  const productsByCatId = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of products) {
      const key = p?.categoryId || "__uncategorized__";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    // sort each bucket by updatedAt desc
    for (const [, arr] of map) {
      arr.sort((a, b) => {
        const A = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
        const B = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
        return B - A;
      });
    }
    return map;
  }, [products]);

  // Build list of {cat, items} for all categories (search-aware)
  const allCategoryBundles = useMemo(() => {
    const q = query.trim().toLowerCase();

    const productMatches = (p: Product) => {
      if (!q) return true;
      const name = (p?.name || "").toLowerCase();
      const desc = (p?.description || "").toLowerCase();
      const brand = (p?.brand?.name || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || brand.includes(q);
    };

    const bundles = categories.map((c) => {
      const items = (productsByCatId.get(c.id) || []).filter(productMatches);
      return { cat: c, items };
    });

    if (!q) return bundles;

    // If searching, keep categories whose NAME matches even if they have 0 matching products
    const byName = (c: Category) => (c?.name || "").toLowerCase().includes(q);
    return bundles.filter(({ cat, items }) => byName(cat) || items.length > 0);
  }, [categories, productsByCatId, query]);

  // Split into enabled vs disabled
  const enabledBundles = useMemo(
    () =>
      allCategoryBundles
        .filter(({ cat }) => !!cat?.isEnabled)
        .sort((a, b) => (a.cat?.name || "").localeCompare(b.cat?.name || "")),
    [allCategoryBundles]
  );

  const disabledBundles = useMemo(
    () =>
      allCategoryBundles
        .filter(({ cat }) => !cat?.isEnabled)
        .sort((a, b) => (a.cat?.name || "").localeCompare(b.cat?.name || "")),
    [allCategoryBundles]
  );

  // Uncategorized products (show only under Enabled tab to avoid confusion)
  const uncategorizedItems = useMemo(() => {
    const items = productsByCatId.get("__uncategorized__") || [];
    if (!query.trim()) return items;
    const q = query.trim().toLowerCase();
    return items.filter((p) => {
      const name = (p?.name || "").toLowerCase();
      const desc = (p?.description || "").toLowerCase();
      const brand = (p?.brand?.name || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || brand.includes(q);
    });
  }, [productsByCatId, query]);

  const totals = useMemo<Totals>(
    () => ({ categories: categories.length, products: products.length }),
    [categories.length, products.length]
  );

  const handleAddCategory = () => {
    // adjust route to your app structure
    router.push("/masters/categories/create");
  };

  const handleAddProduct = (cat: Category) => {
    router.push(
      `/masters/products/create?categoryId=${encodeURIComponent(cat?.id || "")}`
    );
  };

  return (
    <div className="w-full">
      <HeaderBar
        totals={totals}
        query={query}
        setQuery={setQuery}
        mode={mode}
        setMode={setMode}
        onRefresh={refresh}
        onAddCategory={handleAddCategory}
      />

      {/* Enabled / Disabled Tabs */}
      <CategoryTabs
        tab={tab}
        setTab={setTab}
        enabledCount={enabledBundles.length}
        disabledCount={disabledBundles.length}
      />

      <div className="mx-auto max-w-screen-2xl py-4">
        {loading ? (
          <div className="grid h-[50vh] place-items-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
          </div>
        ) : err ? (
          <div className="px-4 py-8 text-center text-red-600">{err}</div>
        ) : (
          <>
            {/* Enabled tab content */}
            {tab === "enabled" && (
              <>
                {enabledBundles.length === 0 ? (
                  <div className="px-4 py-12 text-center text-gray-500">
                    No enabled categories.
                  </div>
                ) : (
                  enabledBundles.map(({ cat, items }) => (
                    <CategorySection
                      key={cat?.id || slugify(cat?.name || "uncategorized")}
                      cat={cat}
                      items={items}
                      mode={mode}
                      onAfterAction={refresh}
                      onAddProduct={handleAddProduct}
                    />
                  ))
                )}

                {/* Uncategorized block (only under Enabled tab) */}
                {uncategorizedItems.length > 0 && (
                  <CategorySection
                    cat={{
                      id: "__uncategorized__",
                      name: "Uncategorized",
                      isEnabled: true,
                    }}
                    items={uncategorizedItems}
                    mode={mode}
                    onAfterAction={refresh}
                    onAddProduct={() => handleAddProduct({ id: "" })}
                  />
                )}
              </>
            )}

            {/* Disabled tab content */}
            {tab === "disabled" && (
              <>
                {disabledBundles.length === 0 ? (
                  <div className="px-4 py-12 text-center text-gray-500">
                    No disabled categories.
                  </div>
                ) : (
                  disabledBundles.map(({ cat, items }) => (
                    <CategorySection
                      key={cat?.id || slugify(cat?.name || "uncategorized")}
                      cat={cat}
                      items={items}
                      mode={mode}
                      onAfterAction={refresh}
                      onAddProduct={handleAddProduct}
                    />
                  ))
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
