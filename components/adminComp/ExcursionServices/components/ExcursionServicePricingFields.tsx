"use client";

import React from "react";
import { FiDollarSign, FiHash } from "react-icons/fi";

interface ExcursionServicePricingFieldsProps {
  adultPriceUsd: number;
  childPriceUsd: number;
  infantPriceUsd: number;
  displayOrder: number;
  errors?: Record<string, string>;
  onAdultPriceUsdChange: (value: number) => void;
  onChildPriceUsdChange: (value: number) => void;
  onInfantPriceUsdChange: (value: number) => void;
  onDisplayOrderChange: (value: number) => void;
}

export function ExcursionServicePricingFields({
  adultPriceUsd,
  childPriceUsd,
  infantPriceUsd,
  displayOrder,
  errors,
  onAdultPriceUsdChange,
  onChildPriceUsdChange,
  onInfantPriceUsdChange,
  onDisplayOrderChange,
}: ExcursionServicePricingFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Adult Price in USD */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Adult Price (USD)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step="0.5"
            value={adultPriceUsd}
            onChange={(e) => onAdultPriceUsdChange(parseFloat(e.target.value) || 0)}
            className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors?.adultPriceUsd
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          />
        </div>
        {errors?.adultPriceUsd && (
          <p className="text-[11px] text-[#EF4444]">{errors.adultPriceUsd}</p>
        )}
      </div>

      {/* Child Price in USD */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Child Price (USD)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step="0.5"
            value={childPriceUsd}
            onChange={(e) => onChildPriceUsdChange(parseFloat(e.target.value) || 0)}
            className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors?.childPriceUsd
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          />
        </div>
        {errors?.childPriceUsd && (
          <p className="text-[11px] text-[#EF4444]">{errors.childPriceUsd}</p>
        )}
      </div>

      {/* Infant Price in USD */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>Infant Price (USD)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            step="0.5"
            value={infantPriceUsd}
            onChange={(e) => onInfantPriceUsdChange(parseFloat(e.target.value) || 0)}
            className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs font-mono font-semibold text-[#083952] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
              errors?.infantPriceUsd
                ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
            }`}
          />
        </div>
        {errors?.infantPriceUsd && (
          <p className="text-[11px] text-[#EF4444]">{errors.infantPriceUsd}</p>
        )}
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

export default ExcursionServicePricingFields;
