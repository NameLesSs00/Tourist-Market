"use client";

import React from "react";
import { FiDollarSign } from "react-icons/fi";

interface GroupExcursionPricingFieldsProps {
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  errors: Record<string, string>;
  onAdultPriceChange: (val: number) => void;
  onChildPriceChange: (val: number) => void;
  onInfantPriceChange: (val: number) => void;
}

export function GroupExcursionPricingFields({
  adultPriceUsd,
  childPriceUsd,
  infantPriceUsd,
  errors,
  onAdultPriceChange,
  onChildPriceChange,
  onInfantPriceChange,
}: GroupExcursionPricingFieldsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0E4A6815] text-[#0E4A68]">
          <FiDollarSign className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E4A68]">
            Per-Person Pricing (USD)
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Base rates charged per seat for group tours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Adult */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Adult Price (USD) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-[#94A3B8]">$</span>
            <input
              type="number"
              min="0"
              step="1"
              value={adultPriceUsd || ""}
              onChange={(e) => onAdultPriceChange(Math.max(0, Number(e.target.value) || 0))}
              placeholder="0"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-7 pr-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
          </div>
          {errors.adultPriceUsd && (
            <p className="mt-1 text-[11px] text-red-500">{errors.adultPriceUsd}</p>
          )}
        </div>

        {/* Child */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Child Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-[#94A3B8]">$</span>
            <input
              type="number"
              min="0"
              step="1"
              value={childPriceUsd || ""}
              onChange={(e) => onChildPriceChange(Math.max(0, Number(e.target.value) || 0))}
              placeholder="0"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-7 pr-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
          </div>
        </div>

        {/* Infant */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Infant Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-xs text-[#94A3B8]">$</span>
            <input
              type="number"
              min="0"
              step="1"
              value={infantPriceUsd || ""}
              onChange={(e) => onInfantPriceChange(Math.max(0, Number(e.target.value) || 0))}
              placeholder="0"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] pl-7 pr-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupExcursionPricingFields;
