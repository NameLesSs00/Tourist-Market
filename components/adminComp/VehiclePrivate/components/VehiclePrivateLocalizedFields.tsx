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

interface VehiclePrivateLocalizedFieldsProps {
  name: LocalizedText;
  errors: Record<string, string>;
  onNameChange: (lang: LangCode, value: string) => void;
}

export function VehiclePrivateLocalizedFields({
  name,
  errors,
  onNameChange,
}: VehiclePrivateLocalizedFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#083952]">
          Vehicle Name
        </label>
        <span className="text-[11px] text-[#64748B]">English is required.</span>
      </div>

      <div className="space-y-3">
        {LANGS.map((lang) => {
          const isEn = lang === "en";
          const err = errors[`name.${lang}`];

          return (
            <div key={`vehicle-name-${lang}`} className="space-y-1">
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
                placeholder={isEn ? "e.g. Standard Private Car" : `Translation in ${LANG_LABELS[lang]}...`}
                className={`w-full rounded-xl border bg-[#F8FAFC] px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] outline-none transition-all focus:bg-white focus:border-[#0E4A68] ${
                  err ? "border-[#DC2626] focus:border-[#DC2626]" : "border-[#0E4A6822]"
                }`}
              />
              {err && <p className="text-[11px] text-[#DC2626]">{err}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
