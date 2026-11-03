"use client";

import React from "react";
import { FiDollarSign, FiLayers } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";
import { ServiceOptionGroup } from "../../types";

interface ServicePricingTiersProps {
  optionsTiers?: ServiceOptionGroup[];
  costServices?: string[];
  locale?: string;
}

export function ServicePricingTiers({
  optionsTiers,
  costServices,
  locale = "en",
}: ServicePricingTiersProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;
  const hasStructuredTiers = optionsTiers && optionsTiers.length > 0;
  const hasLegacyCost = costServices && costServices.length > 0;

  if (!hasStructuredTiers && !hasLegacyCost) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 pt-2 w-full min-w-0">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiLayers className="text-[#DE7423] shrink-0" />
        <span>{t.pricingTitle}</span>
      </h3>

      {/* Structured Option Groups */}
      {hasStructuredTiers && (
        <div className="flex flex-col gap-4 w-full min-w-0">
          {optionsTiers.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col gap-2.5 w-full min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-[#0E4A68]/80">
                {group.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full min-w-0">
                {group.tiers.map((tier, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 sm:p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0E4A68]/40 transition-all flex flex-col justify-between gap-1.5 min-w-0 shadow-xs"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug break-words">
                      {tier.key}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#0E4A68] break-words">
                      {tier.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legacy Cost Services fallback */}
      {!hasStructuredTiers && hasLegacyCost && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#0E4A68] w-full min-w-0">
          {costServices.map((cost, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center gap-2 min-w-0"
            >
              <FiDollarSign className="text-[#DE7423] shrink-0" />
              <span className="font-medium break-words">{cost}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServicePricingTiers;

