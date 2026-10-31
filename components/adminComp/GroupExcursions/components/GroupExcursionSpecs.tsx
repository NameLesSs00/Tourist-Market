"use client";

import React from "react";
import { FiCheck, FiClock, FiLayers, FiSliders, FiStar, FiUsers } from "react-icons/fi";
import { useExcursionCategoriesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";

interface GroupExcursionSpecsProps {
  categoryId: string;
  slug?: string;
  stars: string;
  durationHours: number;
  maxParticipants: number;
  videoUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  errors: Record<string, string>;
  onCategoryIdChange: (val: string) => void;
  onSlugChange?: (val: string) => void;
  onStarsChange: (val: string) => void;
  onDurationHoursChange: (val: number) => void;
  onMaxParticipantsChange: (val: number) => void;
  onVideoUrlChange?: (val: string) => void;
  onIsFeaturedChange: (val: boolean) => void;
  onIsActiveChange: (val: boolean) => void;
}

export function GroupExcursionSpecs({
  categoryId,
  stars,
  durationHours,
  maxParticipants,
  isFeatured,
  isActive,
  errors,
  onCategoryIdChange,
  onStarsChange,
  onDurationHoursChange,
  onMaxParticipantsChange,
  onIsFeaturedChange,
  onIsActiveChange,
}: GroupExcursionSpecsProps) {
  const categoriesQuery = useExcursionCategoriesQuery({ pageSize: 100 });
  const categoryList = categoriesQuery.data?.items ?? [];

  return (
    <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0E4A6815] text-[#0E4A68]">
          <FiSliders className="h-4 w-4" />
        </div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E4A68]">
          Specifications & Classification
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category */}
        <div className="sm:col-span-1">
          <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-[#334155]">
            <FiLayers className="h-3.5 w-3.5 text-[#0E4A68]" />
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={categoryId}
            onChange={(e) => onCategoryIdChange(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          >
            <option value="">Select a category...</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-[11px] text-red-500">{errors.categoryId}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#334155]">
            <FiClock className="h-3.5 w-3.5 text-[#0E4A68]" /> Duration (Hours)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={durationHours || ""}
            onChange={(e) => onDurationHoursChange(Math.max(0, Number(e.target.value) || 0))}
            placeholder="8"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
        </div>

        {/* Stars */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#334155]">
            <FiStar className="h-3.5 w-3.5 text-[#D48C28]" /> Stars Rating
          </label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={stars}
            onChange={(e) => onStarsChange(e.target.value)}
            placeholder="e.g. 5 or 4.8"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
        </div>

        {/* Max Participants */}
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#334155]">
            <FiUsers className="h-3.5 w-3.5 text-[#0E4A68]" /> Max Participants <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={maxParticipants || ""}
            onChange={(e) => onMaxParticipantsChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
            placeholder="e.g. 25"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
          {errors.maxParticipants && (
            <p className="mt-1 text-[11px] text-red-500">{errors.maxParticipants}</p>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#F1F5F9]">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#334155]">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => onIsFeaturedChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#0E4A68]"
          />
          <span>Featured Excursion</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#334155]">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => onIsActiveChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#0E4A68]"
          />
          <span className="flex items-center gap-1">
            <FiCheck className="h-3.5 w-3.5 text-emerald-600" /> Active & Visible
          </span>
        </label>
      </div>
    </div>
  );
}

export default GroupExcursionSpecs;
