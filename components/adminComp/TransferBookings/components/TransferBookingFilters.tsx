"use client";

import React from "react";
import { FiChevronDown, FiFilter, FiSearch, FiX } from "react-icons/fi";
import {
  TRANSFER_BOOKING_STATUS_LABELS,
  TransferBookingStatus,
} from "@/models/transferBooking";

interface TransferBookingFiltersProps {
  statusFilter: TransferBookingStatus | "all";
  onStatusFilterChange: (status: TransferBookingStatus | "all") => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  statusCounts: {
    all: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export function TransferBookingFilters({
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
  statusCounts,
}: TransferBookingFiltersProps) {
  const hasActiveFilters = statusFilter !== "all" || Boolean(searchQuery.trim());

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Status Dropdown Filter */}
        <div className="relative inline-block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <FiFilter className="h-3.5 w-3.5 text-[#0E4A68]" />
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              const val = e.target.value;
              onStatusFilterChange(val === "all" ? "all" : (Number(val) as TransferBookingStatus));
            }}
            className="appearance-none rounded-xl border border-slate-200 bg-white pl-8 pr-8 py-2 text-xs font-semibold text-slate-800 outline-none transition hover:border-slate-300 focus:border-[#0E4A68] focus:ring-1 focus:ring-[#0E4A6815] cursor-pointer shadow-2xs"
          >
            <option value="all">All Statuses ({statusCounts.all})</option>
            <option value={TransferBookingStatus.Pending}>
              {TRANSFER_BOOKING_STATUS_LABELS[TransferBookingStatus.Pending]} ({statusCounts.pending})
            </option>
            <option value={TransferBookingStatus.Confirmed}>
              {TRANSFER_BOOKING_STATUS_LABELS[TransferBookingStatus.Confirmed]} ({statusCounts.confirmed})
            </option>
            <option value={TransferBookingStatus.Completed}>
              {TRANSFER_BOOKING_STATUS_LABELS[TransferBookingStatus.Completed]} ({statusCounts.completed})
            </option>
            <option value={TransferBookingStatus.Cancelled}>
              {TRANSFER_BOOKING_STATUS_LABELS[TransferBookingStatus.Cancelled]} ({statusCounts.cancelled})
            </option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <FiChevronDown className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onStatusFilterChange("all");
              onSearchQueryChange("");
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
          >
            <FiX className="h-3 w-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <FiSearch className="h-3.5 w-3.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search customer, phone, email, route..."
          className="w-full rounded-xl border border-slate-200 bg-white pl-8 pr-8 py-2 text-xs text-slate-800 outline-none transition focus:border-[#0E4A68] focus:ring-1 focus:ring-[#0E4A6815] shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchQueryChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <FiX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
