"use client";

import React from "react";
import { FiDollarSign, FiClock, FiStar, FiVideo, FiLayers } from "react-icons/fi";
import { useExcursionCategoriesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";

interface PrivateExcursionSpecsPricingProps {
  categoryId: string;
  slug: string;
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  stars: string;
  maxAttractions: number;
  durationHours: number;
  videoUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  errors: Record<string, string>;
  onCategoryIdChange: (val: string) => void;
  onSlugChange: (val: string) => void;
  onAdultPriceChange: (val: number) => void;
  onChildPriceChange: (val: number) => void;
  onInfantPriceChange: (val: number) => void;
  onStarsChange: (val: string) => void;
  onMaxAttractionsChange: (val: number) => void;
  onDurationHoursChange: (val: number) => void;
  onVideoUrlChange: (val: string) => void;
  onIsFeaturedChange: (val: boolean) => void;
  onIsActiveChange: (val: boolean) => void;
}

export function PrivateExcursionSpecsPricing({
  categoryId,
  slug,
  adultPriceUsd,
  childPriceUsd,
  infantPriceUsd,
  stars,
  maxAttractions,
  durationHours,
  videoUrl,
  isFeatured,
  isActive,
  errors,
  onCategoryIdChange,
  onSlugChange,
  onAdultPriceChange,
  onChildPriceChange,
  onInfantPriceChange,
  onStarsChange,
  onMaxAttractionsChange,
  onDurationHoursChange,
  onVideoUrlChange,
  onIsFeaturedChange,
  onIsActiveChange,
}: PrivateExcursionSpecsPricingProps) {
  const categoriesQuery = useExcursionCategoriesQuery({ pageSize: 100 });
  const categoryList = categoriesQuery.data?.items ?? [];

  return (
    <div className="space-y-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-[#083952]">Configuration & Pricing</h3>

      {/* Category & Slug */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiLayers className="h-3.5 w-3.5 text-[#0E4A68]" />
            Excursion Category <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={categoryId}
            onChange={(e) => onCategoryIdChange(e.target.value)}
            className={`w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.categoryId
                ? "border-[#EF4444] focus:ring-[#EF444420]"
                : "border-[#E2E8F0] focus:border-[#0E4A68] focus:ring-[#0E4A6815]"
            }`}
          >
            <option value="">Select Category...</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-[11px] text-[#EF4444]">{errors.categoryId}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#083952]">
            URL Slug <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="e.g. private-dolphin-house-trip"
            className={`w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
              errors.slug
                ? "border-[#EF4444] focus:ring-[#EF444420]"
                : "border-[#E2E8F0] focus:border-[#0E4A68] focus:ring-[#0E4A6815]"
            }`}
          />
          {errors.slug && <p className="text-[11px] text-[#EF4444]">{errors.slug}</p>}
        </div>
      </div>

      {/* Pricing USD: Adult, Child, Infant */}
      <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
          Pricing (USD)
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <span className="text-[11px] text-[#64748B]">Adult Price</span>
            <input
              type="number"
              min={0}
              step="any"
              value={adultPriceUsd}
              onChange={(e) => onAdultPriceChange(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-[#64748B]">Child Price</span>
            <input
              type="number"
              min={0}
              step="any"
              value={childPriceUsd}
              onChange={(e) => onChildPriceChange(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-[#64748B]">Infant Price</span>
            <input
              type="number"
              min={0}
              step="any"
              value={infantPriceUsd}
              onChange={(e) => onInfantPriceChange(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
            />
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-[#334155]">
            <FiClock className="h-3 w-3 text-[#0E4A68]" /> Duration (Hours)
          </label>
          <input
            type="number"
            min={0}
            value={durationHours}
            onChange={(e) => onDurationHoursChange(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
          />
        </div>
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-xs font-medium text-[#334155]">
            <FiStar className="h-3 w-3 text-[#D48C28]" /> Stars Rating
          </label>
          <input
            type="text"
            value={stars}
            onChange={(e) => onStarsChange(e.target.value)}
            placeholder="e.g. 5 or 4.5"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#334155]">Max Attractions</label>
          <input
            type="number"
            min={0}
            value={maxAttractions}
            onChange={(e) => onMaxAttractionsChange(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
          />
        </div>
      </div>

      {/* Video URL */}
      <div className="space-y-1">
        <label className="flex items-center gap-1 text-xs font-medium text-[#334155]">
          <FiVideo className="h-3 w-3 text-[#0E4A68]" /> Video URL (YouTube / Vimeo)
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => onVideoUrlChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none focus:border-[#0E4A68]"
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-6 pt-1">
        <label className="flex items-center gap-2.5 text-xs font-medium text-[#0F172A] cursor-pointer">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => onIsFeaturedChange(e.target.checked)}
            className="h-4 w-4 rounded text-[#D48C28] focus:ring-[#D48C28]"
          />
          Featured Excursion
        </label>
        <label className="flex items-center gap-2.5 text-xs font-medium text-[#0F172A] cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => onIsActiveChange(e.target.checked)}
            className="h-4 w-4 rounded text-[#0E4A68] focus:ring-[#0E4A68]"
          />
          Active / Published
        </label>
      </div>
    </div>
  );
}
