"use client";

import React from "react";


type Props = {
  query: string;
  setQuery: (q: string) => void;
  onAddCategory: () => void;
};


const HeaderBar: React.FC<Props> = ({
  query,
  setQuery,
  onAddCategory,
}) => {
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

          <button
            onClick={onAddCategory}
            className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium text-white"
            title="Add Category"
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
