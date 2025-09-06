// pages/products.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import CategorySection, {
  Category,
  Mode,
  Product,
} from "./components/CategorySection";
import CategoryTabs from "./components/CategoryTabs";
import HeaderBar from "./components/HeaderBar";

/* utils */
function slugify(s = "") {
  return s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type Totals = { categories: number; products: number };

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

  const fetchAllCategories = async (): Promise<Category[]> => {
    const pageSize = 100;
    let page = 1;
    let all: Category[] = [];
    while (true) {
      const { data } = await axios.get("categories?inactive=true", {
        params: { page, limit: pageSize },
        headers: tokenHeader(),
      });
      const batch: Category[] = Array.isArray(data?.result) ? data.result : [];
      all = all.concat(batch);
      if (batch.length < pageSize) break;
      page += 1;
      if (page > 50) break;
    }
    return all;
  };

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

  const productsByCatId = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const p of products) {
      const key = p?.categoryId || "__uncategorized__";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    for (const [, arr] of map) {
      arr.sort((a, b) => {
        const A = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
        const B = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
        return B - A;
      });
    }
    return map;
  }, [products]);

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
    const byName = (c: Category) => (c?.name || "").toLowerCase().includes(q);
    return bundles.filter(({ cat, items }) => byName(cat) || items.length > 0);
  }, [categories, productsByCatId, query]);

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
    // adjust route as needed
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
        query={query}
        setQuery={setQuery}
        mode={mode}
        setMode={setMode}
        onAddCategory={handleAddCategory}
      />

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
                    onAddProduct={() =>
                      handleAddProduct({ id: "" } as Category)
                    }
                  />
                )}
              </>
            )}

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
