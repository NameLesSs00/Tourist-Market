import React from "react";
import { FiFilter, FiRotateCcw } from "react-icons/fi";
import { VEHICLE_TYPE_LIST, VehicleType } from "@/models/transferRoutePrice";
import type { TransferLocationItem } from "@/models/transferLocation";

export interface TransferRoutePriceFilterState {
  fromLocationId?: string;
  toLocationId?: string;
  vehicleType?: VehicleType | number;
  isActive?: boolean;
}

interface TransferRoutePriceFiltersProps {
  filters: TransferRoutePriceFilterState;
  onChange: (filters: TransferRoutePriceFilterState) => void;
  onReset: () => void;
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
}

export function TransferRoutePriceFilters({
  filters,
  onChange,
  onReset,
  fromLocations,
  toLocations,
}: TransferRoutePriceFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.fromLocationId ||
      filters.toLocationId ||
      filters.vehicleType !== undefined ||
      filters.isActive !== undefined
  );

  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pr-1">
        <FiFilter className="h-3.5 w-3.5 text-[#0E4A68]" />
        <span>Filters:</span>
      </div>

      {/* From Location Filter */}
      <select
        value={filters.fromLocationId || ""}
        onChange={(e) =>
          onChange({
            ...filters,
            fromLocationId: e.target.value || undefined,
          })
        }
        className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0E4A68] focus:bg-white"
      >
        <option value="">All Pickups</option>
        {fromLocations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* To Location Filter */}
      <select
        value={filters.toLocationId || ""}
        onChange={(e) =>
          onChange({
            ...filters,
            toLocationId: e.target.value || undefined,
          })
        }
        className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0E4A68] focus:bg-white"
      >
        <option value="">All Destinations</option>
        {toLocations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      {/* Vehicle Type Filter */}
      <select
        value={filters.vehicleType !== undefined ? String(filters.vehicleType) : ""}
        onChange={(e) =>
          onChange({
            ...filters,
            vehicleType: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0E4A68] focus:bg-white"
      >
        <option value="">All Vehicle Types</option>
        {VEHICLE_TYPE_LIST.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label} ({v.passengerRange})
          </option>
        ))}
      </select>

      {/* Active Status Filter */}
      <select
        value={
          filters.isActive === true
            ? "true"
            : filters.isActive === false
            ? "false"
            : ""
        }
        onChange={(e) =>
          onChange({
            ...filters,
            isActive:
              e.target.value === "true"
                ? true
                : e.target.value === "false"
                ? false
                : undefined,
          })
        }
        className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#0E4A68] focus:bg-white"
      >
        <option value="">All Statuses</option>
        <option value="true">Active Only</option>
        <option value="false">Inactive Only</option>
      </select>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
        >
          <FiRotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
