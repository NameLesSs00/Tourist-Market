"use client";

import React from "react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";
import { ServiceSpecification } from "../../types";

interface ServiceSpecificationsGridProps {
  specifications?: ServiceSpecification[];
  inclusions?: string[];
  modelYear?: string;
  transmission?: string;
  airConditioning?: string;
  locale?: string;
}

export function ServiceSpecificationsGrid({
  specifications,
  inclusions,
  modelYear,
  transmission,
  airConditioning,
  locale = "en",
}: ServiceSpecificationsGridProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;

  // Consolidate legacy specs if structured specifications are missing
  const specs =
    specifications && specifications.length > 0
      ? specifications
      : [
          modelYear ? { label: t.specModelYear, value: modelYear } : null,
          transmission ? { label: t.specTransmission, value: transmission } : null,
          airConditioning ? { label: t.specAirConditioning, value: airConditioning } : null,
        ].filter(Boolean) as ServiceSpecification[];

  if (specs.length === 0 && (!inclusions || inclusions.length === 0)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6 pt-2 w-full min-w-0">
      {/* Specifications Grid */}
      {specs.length > 0 && (
        <div className="flex flex-col gap-2.5 w-full min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
            <FiInfo className="text-[#DE7423] shrink-0" />
            <span>{t.specificationsTitle}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full min-w-0">
            {specs.map((spec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col gap-0.5 min-w-0"
              >
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider break-words">
                  {spec.label}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0E4A68] break-words">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusions List */}
      {inclusions && inclusions.length > 0 && (
        <div className="flex flex-col gap-2.5 w-full min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
            <FiCheckCircle className="text-emerald-600 shrink-0" />
            <span>{t.inclusionsTitle}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#0E4A68] w-full min-w-0">
            {inclusions.map((inc, idx) => (
              <div key={idx} className="flex items-start gap-2 min-w-0">
                <FiCheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span className="leading-snug break-words">{inc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceSpecificationsGrid;

