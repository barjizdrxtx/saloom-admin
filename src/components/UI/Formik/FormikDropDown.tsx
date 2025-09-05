import React, { useEffect, useMemo, useRef, useState } from "react";
import { CustomIcon } from "../Icons/Icons";

type DropDataItem = { id: string | number; [k: string]: any };

type Props = {
  data: {
    title: string;
    dropData: DropDataItem[];
    dropTitle: string; // key to show as label, e.g. "name"
  };
  value?: string | number;
  onChange: (id: string | number) => void;
  error?: string;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
};

const FormikDropDown: React.FC<Props> = ({
  data,
  value,
  onChange,
  error,
  placeholder,
  searchable = true,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const labelKey = data.dropTitle;

  const selectedOption = useMemo(
    () => data.dropData?.find((el) => el.id === value),
    [data.dropData, value]
  );

  const displayLabel =
    selectedOption?.[labelKey] ??
    (placeholder || `Select a ${data.title || "option"}`);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.dropData || [];
    return (data.dropData || []).filter((el) =>
      String(el[labelKey] ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [data.dropData, labelKey, query]);

  const toggle = () => setIsOpen((s) => !s);

  const handleSelect = (opt: DropDataItem) => {
    setIsOpen(false);
    onChange(opt.id);
    setQuery(""); // reset search after pick
  };

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // If value changes from outside, ensure dropdown closes
  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  return (
    <div ref={wrapRef} className={`w-full flex flex-col mt-1 ${className}`}>
      {data.title && (
        <div className="pb-1  text-sm text-gray-800 font-semibold">
          {data.title}
        </div>
      )}

      {/* Reduced-height trigger */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex justify-between items-center w-full py-2.5 px-2 text-sm border rounded-md 
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span
          className={`truncate ${
            selectedOption ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {displayLabel}
        </span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <CustomIcon name="arrow_drop_down" />
        </span>
      </button>

      <div className="relative w-full mt-1">
        {isOpen && (
          <div
            role="listbox"
            className="absolute z-50 left-0 right-0 bg-white border rounded-md shadow-sm"
          >
            {/* Search bar (reduced padding) */}
            {searchable && (
              <div className="sticky top-0 bg-white border-b px-2 py-1.5">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search`}
                  className="w-full h-8 px-2 text-sm border rounded outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Options (smaller rows, capped height, scrollable) */}
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No matches
                </div>
              )}

              {filtered.map((el) => {
                const isActive = el.id === value;
                return (
                  <div
                    key={el.id}
                    onClick={() => handleSelect(el)}
                    className={`flex items-center justify-between text-sm cursor-pointer
                                px-3 py-1.5 hover:bg-gray-100 ${
                                  isActive ? "bg-gray-50" : ""
                                }`}
                  >
                    <span className="capitalize truncate">{el[labelKey]}</span>
                    {isActive && (
                      <span className="shrink-0">
                        <CustomIcon name="check" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default FormikDropDown;
