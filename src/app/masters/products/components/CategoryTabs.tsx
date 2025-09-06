"use client";

import React from "react";

type Tab = "enabled" | "disabled";

type Props = {
  tab: Tab;
  setTab: (t: Tab) => void;
  enabledCount: number;
  disabledCount: number;
};

const CategoryTabs: React.FC<Props> = ({
  tab,
  setTab,
  enabledCount,
  disabledCount,
}) => {
  const Btn: React.FC<{
    id: Tab;
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

export default CategoryTabs;
