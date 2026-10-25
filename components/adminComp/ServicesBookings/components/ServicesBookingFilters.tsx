"use client";

import React from "react";
import { FiCalendar, FiRotateCcw } from "react-icons/fi";
import { SearchInput } from "@/components/adminComp/Shared/PageHeader";
import {
  ServicesBookingStatus,
  SERVICES_BOOKING_STATUS_LABELS,
} from "@/models/servicesBooking";

interface ServicesBookingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status?: ServicesBookingStatus;
  onStatusChange: (status?: ServicesBookingStatus) => void;
  fromDate?: string;
  onFromDateChange: (date?: string) => void;
  toDate?: string;
  onToDateChange: (date?: string) => void;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function ServicesBookingFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  hasActiveFilters,
  onReset,
}: ServicesBookingFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input using shared SearchInput component */}
        <div className="min-w-[240px] flex-1">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by customer, hotel, email, service..."
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-[170px]">
          <select
            value={status !== undefined ? String(status) : ""}
            onChange={(e) => {
              const val = e.target.value;
              onStatusChange(val ? (Number(val) as ServicesBookingStatus) : undefined);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          >
            <option value="">All Statuses</option>
            {Object.values(ServicesBookingStatus)
              .filter((v): v is ServicesBookingStatus => typeof v === "number")
              .map((s) => (
                <option key={s} value={String(s)}>
                  {SERVICES_BOOKING_STATUS_LABELS[s]}
                </option>
              ))}
          </select>
        </div>

        {/* From Date */}
        <div className="relative w-[160px]">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={fromDate ? fromDate.split("T")[0] : ""}
            onChange={(e) => onFromDateChange(e.target.value ? `${e.target.value}T00:00:00Z` : undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          />
        </div>

        {/* To Date */}
        <div className="relative w-[160px]">
          <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="date"
            value={toDate ? toDate.split("T")[0] : ""}
            onChange={(e) => onToDateChange(e.target.value ? `${e.target.value}T23:59:59Z` : undefined)}
            className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-700 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
          />
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <FiRotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ServicesBookingFilters;
