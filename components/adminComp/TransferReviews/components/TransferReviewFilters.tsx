"use client";

import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { SearchInput } from "@/components/adminComp/Shared/PageHeader";

interface TransferReviewFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  rate?: number;
  onRateChange: (rate?: number) => void;
  isApproved?: boolean;
  onApprovedChange: (approved?: boolean) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function TransferReviewFilters({
  search,
  onSearchChange,
  rate,
  onRateChange,
  isApproved,
  onApprovedChange,
  onReset,
  hasActiveFilters,
}: TransferReviewFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search customer, email, phone, or comment..."
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Rating Filter */}
          <select
            value={rate ?? ""}
            onChange={(e) =>
              onRateChange(e.target.value ? Number(e.target.value) : undefined)
            }
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars (Excellent)</option>
            <option value="4">4 Stars (Very Good)</option>
            <option value="3">3 Stars (Good)</option>
            <option value="2">2 Stars (Fair)</option>
            <option value="1">1 Star (Poor)</option>
          </select>

          {/* Approved Status Filter */}
          <select
            value={
              isApproved === undefined ? "" : isApproved ? "true" : "false"
            }
            onChange={(e) =>
              onApprovedChange(
                e.target.value === ""
                  ? undefined
                  : e.target.value === "true"
              )
            }
            className="rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#334155] focus:border-[#0E4A68] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="true">Approved</option>
            <option value="false">Pending Approval</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-medium text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#083952] transition-colors cursor-pointer"
            >
              <FiRotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

