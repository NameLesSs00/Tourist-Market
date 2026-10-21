"use client";

import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiX } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Page title row with an optional primary action (e.g. "Add FAQ"). */
export function PageHeader({ title, description, actionLabel, onAction }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-poppins text-2xl font-semibold text-[#083952]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#64748B]">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D48C28] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] shadow-sm transition-all hover:bg-[#B9741A] active:scale-[0.98] cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/** Debounced search box: `onChange` fires after the user stops typing. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 400,
}: SearchInputProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    if (local === value) return;
    const t = setTimeout(() => onChange(local), debounceMs);
    return () => clearTimeout(t);
  }, [local, value, debounceMs, onChange]);

  return (
    <div className="relative w-full sm:max-w-sm">
      <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
      <input
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 pl-10 pr-9 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6833]"
      />
      {local && (
        <button
          type="button"
          onClick={() => {
            setLocal("");
            onChange("");
          }}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#94A3B8] hover:text-[#475569] cursor-pointer"
        >
          <FiX className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
