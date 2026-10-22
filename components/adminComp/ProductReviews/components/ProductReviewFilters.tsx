"use client";

import React from "react";
import { FiFilter, FiRotateCcw } from "react-icons/fi";
import { SearchInput } from "@/components/adminComp/Shared/PageHeader";

export interface ProductOption {
  id: number;
  title: string;
}

interface ProductReviewFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  productId?: number;
  onProductChange: (id?: number) => void;
  rate?: number;
  onRateChange: (rate?: number) => void;
  isPublished?: boolean;
  onPublishedChange: (published?: boolean) => void;
  sortBy?: string;
  onSortByChange: (sortBy?: string) => void;
  products: ProductOption[];
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function ProductReviewFilters({
  search,
  onSearchChange,
  productId,
  onProductChange,
  rate,
  onRateChange,
  isPublished,
  onPublishedChange,
  sortBy,
  onSortByChange,
  products,
  onReset,
  hasActiveFilters,
}: ProductReviewFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by customer, email, comment..."
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Product Filter */}
          <select
            value={productId ?? ""}
            onChange={(e) =>
              onProductChange(e.target.value ? Number(e.target.value) : undefined)
            }
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Products</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={rate ?? ""}
            onChange={(e) =>
              onRateChange(e.target.value ? Number(e.target.value) : undefined)
            }
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Ratings</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
            <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
            <option value="3">⭐⭐⭐ (3 Stars)</option>
            <option value="2">⭐⭐ (2 Stars)</option>
            <option value="1">⭐ (1 Star)</option>
          </select>

          {/* Published Status Filter */}
          <select
            value={
              isPublished === undefined ? "" : isPublished ? "true" : "false"
            }
            onChange={(e) =>
              onPublishedChange(
                e.target.value === ""
                  ? undefined
                  : e.target.value === "true"
              )
            }
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="true">Published</option>
            <option value="false">Pending (Unpublished)</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy ?? ""}
            onChange={(e) => onSortByChange(e.target.value || undefined)}
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">Default Order</option>
            <option value="rate_desc">Rating: High to Low</option>
            <option value="rate_asc">Rating: Low to High</option>
            <option value="helpful_desc">Most Helpful</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#083952] transition-colors cursor-pointer"
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
