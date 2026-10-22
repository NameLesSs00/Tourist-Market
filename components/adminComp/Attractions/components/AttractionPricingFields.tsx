"use client";

import React from "react";
import { FiDollarSign, FiHash } from "react-icons/fi";

interface AttractionPricingFieldsProps {
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  displayOrder: number;
  errors?: Record<string, string>;
  onAdultPriceChange: (value: number) => void;
  onChildPriceChange: (value: number) => void;
  onInfantPriceChange: (value: number) => void;
  onDisplayOrderChange: (value: number) => void;
}

export function AttractionPricingFields({
  adultPriceUsd,
  childPriceUsd,
  infantPriceUsd,
  displayOrder,
  errors,
  onAdultPriceChange,
  onChildPriceChange,
  onInfantPriceChange,
  onDisplayOrderChange,
}: AttractionPricingFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Pricing Tiers (USD) */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Pricing Tiers (USD)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#64748B]">
              Adult Price ($)
            </label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={adultPriceUsd}
              onChange={(e) => onAdultPriceChange(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            />
            {errors?.adultPriceUsd && (
              <p className="text-[11px] text-[#EF4444]">{errors.adultPriceUsd}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#64748B]">
              Child Price ($)
            </label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={childPriceUsd}
              onChange={(e) => onChildPriceChange(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            />
            {errors?.childPriceUsd && (
              <p className="text-[11px] text-[#EF4444]">{errors.childPriceUsd}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[#64748B]">
              Infant Price ($)
            </label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={infantPriceUsd}
              onChange={(e) => onInfantPriceChange(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            />
            {errors?.infantPriceUsd && (
              <p className="text-[11px] text-[#EF4444]">{errors.infantPriceUsd}</p>
            )}
          </div>
        </div>
      </div>

      {/* Display Order */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiHash className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Display Order</span>
        </label>
        <input
          type="number"
          min={0}
          step={1}
          value={displayOrder}
          onChange={(e) => onDisplayOrderChange(parseInt(e.target.value, 10) || 0)}
          className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
        />
      </div>
    </div>
  );
}
