"use client";

import React from "react";
import { FiHash, FiLayers, FiLoader, FiRefreshCw } from "react-icons/fi";
import type { ProductCategoryItem } from "@/models/productCategory";

interface ProductSubcategoryCategoryPickerProps {
  categoryId: number;
  categories: ProductCategoryItem[];
  displayOrder: number;
  isLoading?: boolean;
  errors?: Record<string, string>;
  onCategoryChange: (categoryId: number) => void;
  onDisplayOrderChange: (order: number) => void;
  onRefresh?: () => void;
}

export function ProductSubcategoryCategoryPicker({
  categoryId,
  categories,
  displayOrder,
  isLoading = false,
  errors,
  onCategoryChange,
  onDisplayOrderChange,
  onRefresh,
}: ProductSubcategoryCategoryPickerProps) {
  const handleSelectFocus = () => {
    if (categories.length === 0 && onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Parent Product Category Picker */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiLayers className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Parent Product Category</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <div className="flex items-center gap-1">
            {isLoading && (
              <span className="flex items-center gap-1 text-[11px] text-[#0E4A68]">
                <FiLoader className="h-3 w-3 animate-spin" />
                <span>Loading...</span>
              </span>
            )}
            {onRefresh && !isLoading && (
              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex items-center gap-1 text-[11px] text-[#64748B] hover:text-[#0E4A68] cursor-pointer"
                title="Reload product categories"
              >
                <FiRefreshCw className="h-2.5 w-2.5" />
                <span>Reload</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <select
            value={categoryId || ""}
            onChange={(e) => onCategoryChange(Number(e.target.value) || 0)}
            onFocus={handleSelectFocus}
            onClick={handleSelectFocus}
            disabled={isLoading && categories.length === 0}
            className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 disabled:bg-[#F8FAFC] disabled:opacity-60 ${
              errors?.categoryId
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          >
            {isLoading && categories.length === 0 ? (
              <option value="">Loading product categories...</option>
            ) : categories.length === 0 ? (
              <option value="">No product categories found (click to reload)</option>
            ) : (
              <option value="">Select a product category...</option>
            )}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {errors?.categoryId && (
          <p className="text-[11px] text-[#EF4444]">{errors.categoryId}</p>
        )}
      </div>

      {/* Display Order */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiHash className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Display Order</span>
        </label>
        <input
          type="number"
          min={0}
          step={1}
          value={displayOrder}
          onChange={(e) => onDisplayOrderChange(parseInt(e.target.value, 10) || 0)}
          className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
        />
      </div>
    </div>
  );
}
