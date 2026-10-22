"use client";

import React from "react";
import Image from "next/image";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";

interface ProductSubcategoryLocalizedFieldsProps {
  name: LocalizedText;
  errors: Record<string, string>;
  onNameChange: (lang: LangCode, value: string) => void;
}

export function ProductSubcategoryLocalizedFields({
  name,
  errors,
  onNameChange,
}: ProductSubcategoryLocalizedFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#083952]">
          Product Subcategory Name
        </label>
        <span className="text-[11px] text-[#64748B]">
          English is required.
        </span>
      </div>

      <div className="space-y-3">
        {LANGS.map((lang) => {
          const isEn = lang === "en";
          const error = errors[`name.${lang}`];

          return (
            <div key={lang} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#334155]">
                  <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                    <Image
                      src={LANG_FLAGS[lang]}
                      alt={LANG_LABELS[lang]}
                      fill
                      className="object-cover"
                      sizes="16px"
                    />
                  </span>
                  <span>{LANG_LABELS[lang]}</span>
                  {isEn && <span className="text-[#DC2626]">*</span>}
                </span>
                {!isEn && (
                  <span className="text-[11px] text-[#94A3B8]">
                    Optional
                  </span>
                )}
              </div>

              <input
                type="text"
                value={name[lang] || ""}
                onChange={(e) => onNameChange(lang, e.target.value)}
                placeholder={
                  isEn
                    ? "e.g., Handmade Papyrus Scrolls"
                    : `Name in ${LANG_LABELS[lang]} (optional)`
                }
                className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                  error
                    ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                    : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
                }`}
              />
              {error && (
                <p className="text-[11px] text-[#EF4444]">{error}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
