"use client";

import React from "react";
import type { ProductKeyItem } from "@/models/product";

interface ProductDetailsDescriptionProps {
  title?: string;
  subtitle?: string;
  keys?: ProductKeyItem[];
}

export function ProductDetailsDescription({
  title = "Product Overview",
  subtitle,
  keys = [],
}: ProductDetailsDescriptionProps) {
  const hasKeys = Array.isArray(keys) && keys.length > 0;

  return (
    <div
      className="w-full p-6 sm:p-8 md:p-10 font-poppins select-none shadow-xs"
      style={{
        background: "#FFFFFF",
        border: "0.8px solid #E2E8F0",
        borderRadius: "16px",
      }}
    >
      {/* ─── Main Title & Subtitle ─── */}
      <div className="mb-6 sm:mb-8 space-y-2.5">
        <h3 className="text-[26px] sm:text-[30px] md:text-[34px] font-bold text-[#0E4A68] tracking-tight">
          {title}
        </h3>

        {subtitle && subtitle !== title && (
          <p className="text-[16px] sm:text-[17px] text-[#64748B] font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* ─── Dynamic Sections (Title then Description) ─── */}
      {hasKeys ? (
        <div className="flex flex-col gap-7 sm:gap-9">
          {keys.map((keyItem, index) => {
            const values = keyItem.values || [];
            return (
              <div
                key={`spec-key-${keyItem.id || index}`}
                className="space-y-3"
              >
                {/* Section Title (Key) */}
                <h4 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#0E4A68] tracking-tight">
                  {keyItem.name}
                </h4>

                {/* Section Description (Values) */}
                <div className="space-y-2.5 text-[16px] sm:text-[17px] md:text-[18px] leading-relaxed text-[#334155]">
                  {values.length > 0 ? (
                    values.map((v, valIdx) => (
                      <p
                        key={`spec-val-${v.id || valIdx}`}
                        className="whitespace-pre-line"
                      >
                        {v.value}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#94A3B8] italic">No description provided.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback when no dynamic keys exist yet */
        <div className="text-[16px] sm:text-[17px] leading-relaxed text-[#475569]">
          <p>
            {subtitle ||
              "Authentic premium product delivered straight to your hotel room with Egypt Tourist Market."}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsDescription;
