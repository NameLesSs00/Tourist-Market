"use client";

import React from "react";
import { FiCheckCircle, FiEyeOff } from "react-icons/fi";

interface SiteServiceStatusPickerProps {
  isActive: boolean;
  onChange: (active: boolean) => void;
}

export function SiteServiceStatusPicker({
  isActive,
  onChange,
}: SiteServiceStatusPickerProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#083952]">
            Service Status
          </label>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              isActive
                ? "bg-[#ECFDF5] text-[#059669]"
                : "bg-[#F1F5F9] text-[#64748B]"
            }`}
          >
            {isActive ? (
              <>
                <FiCheckCircle className="h-3 w-3" /> Active
              </>
            ) : (
              <>
                <FiEyeOff className="h-3 w-3" /> Inactive
              </>
            )}
          </span>
        </div>
        <p className="text-[11px] text-[#64748B]">
          {isActive
            ? "Visible to customers across the site."
            : "Hidden from customer view and catalog."}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        onClick={() => onChange(!isActive)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20 ${
          isActive ? "bg-[#059669]" : "bg-[#CBD5E1]"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isActive ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
