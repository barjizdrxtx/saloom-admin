"use client";

import React from "react";
import { LayoutGrid, List } from "lucide-react";

export type Mode = "grid" | "list";

type Props = {
  query: string;
  setQuery: (q: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  onAddCategory: () => void;
};

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

const HeaderBar: React.FC<Props> = ({
  query,
  setQuery,
  mode,
  setMode,
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

export default HeaderBar;
