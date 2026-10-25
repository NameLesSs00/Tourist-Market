"use client";

import React, { useState } from "react";
import { FiMapPin, FiPlus, FiX } from "react-icons/fi";
import { useAttractionsQuery } from "@/features/attractions/useAttractionAdmin";

interface AttractionItemDisplay {
  id: string;
  title: string;
}

interface PrivateExcursionAttractionPickerProps {
  selectedAttractions: AttractionItemDisplay[];
  maxAttractions: number;
  onAddAttraction: (attraction: AttractionItemDisplay) => void;
  onRemoveAttraction: (id: string) => void;
}

export function PrivateExcursionAttractionPicker({
  selectedAttractions,
  maxAttractions,
  onAddAttraction,
  onRemoveAttraction,
}: PrivateExcursionAttractionPickerProps) {
  const attractionsQuery = useAttractionsQuery({ pageSize: 100 });
  const rawData = attractionsQuery.data as any;
  const allAttractions: AttractionItemDisplay[] =
    rawData?.items ?? rawData?.data?.items ?? (Array.isArray(rawData) ? rawData : []);
  const [selectedId, setSelectedId] = useState("");

  const selectedIds = new Set(selectedAttractions.map((a) => a.id));
  const availableAttractions = allAttractions.filter((a) => !selectedIds.has(a.id));

  const handleAdd = () => {
    if (!selectedId) return;
    const found = allAttractions.find((a) => a.id === selectedId);
    if (found) {
      onAddAttraction({ id: found.id, title: found.title });
      setSelectedId("");
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiMapPin className="h-3.5 w-3.5 text-[#0E4A68]" />
          Assigned Attractions (From Attractions)
        </label>
        <span className="text-[11px] font-medium text-[#64748B]">
          {selectedAttractions.length} assigned
          {maxAttractions > 0 && ` · Customer picks up to ${maxAttractions}`}
        </span>
      </div>

      {/* Selector dropdown + Add button */}
      <div className="flex items-center gap-2">
        <select
          value={selectedId}
          disabled={attractionsQuery.isLoading || availableAttractions.length === 0}
          onChange={(e) => setSelectedId(e.target.value)}
          className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68] disabled:bg-[#F1F5F9]"
        >
          <option value="">
            {attractionsQuery.isLoading
              ? "Loading attractions..."
              : availableAttractions.length === 0
              ? "No more attractions available"
              : "Choose an attraction to include..."}
          </option>
          {availableAttractions.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
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
      {selectedAttractions.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedAttractions.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680A] px-2.5 py-1 text-xs font-medium text-[#0E4A68]"
            >
              <FiMapPin className="h-3 w-3" />
              {item.title}
              <button
                type="button"
                onClick={() => onRemoveAttraction(item.id)}
                className="ml-1 rounded p-0.5 text-[#0E4A68] hover:bg-[#0E4A6820] hover:text-[#DC2626] cursor-pointer"
                aria-label={`Remove ${item.title}`}
              >
                <FiX className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-[#94A3B8]">
          No attractions assigned yet. Select from the dropdown above.
        </p>
      )}
    </div>
  );
}
