"use client";

import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { SearchInput } from "@/components/adminComp/Shared/PageHeader";
import { BookingStatus } from "@/models/productBooking";

interface ProductBookingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status?: BookingStatus;
  onStatusChange: (status?: BookingStatus) => void;
  fromDate?: string;
  toDate?: string;
  onFromDateChange: (date?: string) => void;
  onToDateChange: (date?: string) => void;
  currency?: string;
  onCurrencyChange: (currency?: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function ProductBookingFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  currency,
  onCurrencyChange,
  hasActiveFilters,
  onReset,
}: ProductBookingFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="min-w-[240px] flex-1">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by customer, reference, phone, email..."
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-[170px]">
          <select
            value={status !== undefined ? String(status) : ""}
            onChange={(e) => {
              const val = e.target.value;
              onStatusChange(val ? (Number(val) as BookingStatus) : undefined);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          >
            <option value="">All Statuses</option>
            <option value={String(BookingStatus.Pending)}>Pending</option>
            <option value={String(BookingStatus.Confirmed)}>Confirmed</option>
            <option value={String(BookingStatus.Completed)}>Completed</option>
            <option value={String(BookingStatus.Cancelled)}>Cancelled</option>
          </select>
        </div>

        {/* Currency Dropdown */}
        <div className="w-[120px]">
          <select
            value={currency || ""}
            onChange={(e) => onCurrencyChange(e.target.value || undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          >
            <option value="">Currency</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="EGP">EGP (LE)</option>
          </select>
        </div>

        {/* From Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>From:</span>
          <input
            type="date"
            value={fromDate || ""}
            onChange={(e) => onFromDateChange(e.target.value || undefined)}
            className="rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>To:</span>
          <input
            type="date"
            value={toDate || ""}
            onChange={(e) => onToDateChange(e.target.value || undefined)}
            className="rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          />
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
          >
            <FiRotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductBookingFilters;
