"use client";

import React, { useState } from "react";
import { FiPackage, FiPlus, FiX } from "react-icons/fi";
import { useExcursionServicesQuery } from "@/features/excursionServices/useExcursionServices";

interface ServiceItemDisplay {
  id: string;
  title: string;
}

interface PrivateExcursionServicePickerProps {
  selectedServices: ServiceItemDisplay[];
  onAddService: (service: ServiceItemDisplay) => void;
  onRemoveService: (id: string) => void;
}

export function PrivateExcursionServicePicker({
  selectedServices,
  onAddService,
  onRemoveService,
}: PrivateExcursionServicePickerProps) {
  const servicesQuery = useExcursionServicesQuery({ pageSize: 100 });
  const rawData = servicesQuery.data as any;
  const allServices: ServiceItemDisplay[] =
    rawData?.items ?? rawData?.data?.items ?? (Array.isArray(rawData) ? rawData : []);
  const [selectedId, setSelectedId] = useState("");

  const selectedIds = new Set(selectedServices.map((s) => s.id));
  const availableServices = allServices.filter((s) => !selectedIds.has(s.id));

  const handleAdd = () => {
    if (!selectedId) return;
    const found = allServices.find((s) => s.id === selectedId);
    if (found) {
      onAddService({ id: found.id, title: found.title });
      setSelectedId("");
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiPackage className="h-3.5 w-3.5 text-[#0E4A68]" />
          Assigned Extra Services (From ExcursionServices)
        </label>
        <span className="text-[11px] font-medium text-[#64748B]">
          {selectedServices.length} selected
        </span>
      </div>

      {/* Selector dropdown + Add button */}
      <div className="flex items-center gap-2">
        <select
          value={selectedId}
          disabled={servicesQuery.isLoading || availableServices.length === 0}
          onChange={(e) => setSelectedId(e.target.value)}
          className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68] disabled:bg-[#F1F5F9]"
        >
          <option value="">
            {servicesQuery.isLoading
              ? "Loading extra services..."
              : availableServices.length === 0
              ? "No more extra services available"
              : "Choose an extra service to include..."}
          </option>
          {availableServices.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!selectedId}
          className="flex items-center gap-1 rounded-xl bg-[#0E4A68] px-3 py-2 text-xs font-medium text-[#FFFFFF] transition hover:bg-[#0A374E] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          <FiPlus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>

      {/* Selected chips */}
      {selectedServices.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedServices.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D48C2825] bg-[#D48C280D] px-2.5 py-1 text-xs font-medium text-[#D48C28]"
            >
              <FiPackage className="h-3 w-3" />
              {item.title}
              <button
                type="button"
                onClick={() => onRemoveService(item.id)}
                className="ml-1 rounded p-0.5 text-[#D48C28] hover:bg-[#D48C2820] hover:text-[#DC2626] cursor-pointer"
                aria-label={`Remove ${item.title}`}
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-[#94A3B8]">
          No extra services assigned yet. Select from the dropdown above.
        </p>
      )}
    </div>
  );
}
