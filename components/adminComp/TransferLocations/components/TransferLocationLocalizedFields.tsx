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

interface TransferLocationLocalizedFieldsProps {
  name: LocalizedText;
  errors: Record<string, string>;
  onNameChange: (lang: LangCode, value: string) => void;
}

export function TransferLocationLocalizedFields({
  name,
  errors,
  onNameChange,
}: TransferLocationLocalizedFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#083952]">
          Location Name
        </label>
        <span className="text-[11px] text-[#64748B]">English is required.</span>
      </div>

      <div className="space-y-3">
        {LANGS.map((lang) => {
          const isEn = lang === "en";
          const err = errors[`name.${lang}`];

          return (
            <div key={`loc-name-${lang}`} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                  <Image
                    src={LANG_FLAGS[lang]}
                    alt={lang}
                    width={18}
                    height={12}
                    className="rounded-xs object-cover"
                  />
                  <span>{LANG_LABELS[lang]}</span>
                  {isEn && <span className="text-[#DC2626]">*</span>}
                </span>
                {!isEn && !name[lang]?.trim() && name.en?.trim() && (
                  <span className="text-[10px] text-[#94A3B8]">
                    Falls back to English
                  </span>
                )}
              </div>

              <input
                type="text"
                value={name[lang] || ""}
                onChange={(e) => onNameChange(lang, e.target.value)}
                placeholder={
                  isEn
                    ? "e.g. Hurghada International Airport (HRG)"
                    : `Location name in ${LANG_LABELS[lang]} (optional)`
                }
                className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                  err
                    ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                    : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
                }`}
              />
              {err && <p className="text-[11px] text-[#EF4444]">{err}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
