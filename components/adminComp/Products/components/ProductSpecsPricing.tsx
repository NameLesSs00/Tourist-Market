"use client";

import React from "react";
import { FiDollarSign, FiFolder, FiLoader } from "react-icons/fi";
import { useProductSubcategoriesQuery } from "@/features/productSubcategories/useProductSubcategories";

interface ProductSpecsPricingProps {
  subCategoryId: number;
  onSubCategoryChange: (id: number) => void;
  price: number;
  onPriceChange: (price: number) => void;
  errors?: Record<string, string>;
}

export function ProductSpecsPricing({
  subCategoryId,
  onSubCategoryChange,
  price,
  onPriceChange,
  errors,
}: ProductSpecsPricingProps) {
  const subcategoriesQuery = useProductSubcategoriesQuery({ pageSize: 100 });
  const subcategories = subcategoriesQuery.data?.items ?? [];

  return (
    <div className="rounded-2xl border border-[#0E4A6815] bg-[#F8FAFC] p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Parent Subcategory Selector */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiFolder className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Product Subcategory</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <select
              value={subCategoryId || ""}
              onChange={(e) => onSubCategoryChange(Number(e.target.value) || 0)}
              className="w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs font-medium text-[#083952] transition-colors focus:border-[#0E4A68] focus:bg-white focus:outline-none"
            >
              <option value="">Select Subcategory...</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
            {subcategoriesQuery.isLoading && (
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <FiLoader className="h-4 w-4 animate-spin text-[#94A3B8]" />
              </div>
            )}
          </div>
          {errors?.subCategoryId && (
            <p className="mt-1 text-[11px] font-medium text-[#DC2626]">
              {errors.subCategoryId}
            </p>
          )}
        </div>

        {/* Price Input */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Base Price ($ USD)</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price === 0 ? "" : price}
            onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
            placeholder="e.g. 35.00"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs font-medium text-[#083952] transition-colors focus:border-[#0E4A68] focus:bg-white focus:outline-none"
          />
          {errors?.price && (
            <p className="mt-1 text-[11px] font-medium text-[#DC2626]">
              {errors.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
