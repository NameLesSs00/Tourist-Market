"use client";

import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { SearchInput } from "@/components/adminComp/Shared/PageHeader";

export interface SubServiceOption {
  id: string;
  name: string;
}

interface ServiceReviewFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  subServiceId?: string;
  onSubServiceChange: (id?: string) => void;
  rate?: number;
  onRateChange: (rate?: number) => void;
  isPublished?: boolean;
  onPublishedChange: (published?: boolean) => void;
  subServices: SubServiceOption[];
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function ServiceReviewFilters({
  search,
  onSearchChange,
  subServiceId,
  onSubServiceChange,
  rate,
  onRateChange,
  isPublished,
  onPublishedChange,
  subServices,
  onReset,
  hasActiveFilters,
}: ServiceReviewFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search by customer, email, comment..."
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-Service Filter */}
          <select
            value={subServiceId ?? ""}
            onChange={(e) => onSubServiceChange(e.target.value || undefined)}
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Site Service Items</option>
            {subServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
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
