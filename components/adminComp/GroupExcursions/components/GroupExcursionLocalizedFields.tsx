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

interface GroupExcursionLocalizedFieldsProps {
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
  errors: Record<string, string>;
  onTitleChange: (lang: LangCode, val: string) => void;
  onSubtitleChange: (lang: LangCode, val: string) => void;
  onExcursionTypeChange: (lang: LangCode, val: string) => void;
  onShortDescriptionChange: (lang: LangCode, val: string) => void;
  onFullProgramChange: (lang: LangCode, val: string) => void;
}

export function GroupExcursionLocalizedFields({
  title,
  subtitle,
  excursionType,
  shortDescription,
  fullProgram,
  errors,
  onTitleChange,
  onSubtitleChange,
  onExcursionTypeChange,
  onShortDescriptionChange,
  onFullProgramChange,
}: GroupExcursionLocalizedFieldsProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#083952]">Multilingual Content & Program</h3>
        <span className="text-[11px] text-[#64748B]">Languages stacked sequentially</span>
      </div>

      <div className="space-y-4">
        {LANGS.map((lang) => {
          const isEn = lang === "en";
          const err = errors[`title.${lang}`];

          return (
            <div
              key={lang}
              className={`rounded-2xl border p-4 sm:p-5 transition space-y-3.5 ${
                isEn
                  ? "border-[#0E4A6830] bg-[#FFFFFF] shadow-2xs"
                  : "border-[#E2E8F0] bg-[#F8FAFC]"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-2xs border border-[#CBD5E1]">
                    <Image src={LANG_FLAGS[lang]} alt={lang} fill className="object-cover" sizes="20px" />
                  </span>
                  <span className="text-xs font-bold text-[#083952] uppercase tracking-wider">
                    {LANG_LABELS[lang]}
                  </span>
                  {isEn && <span className="text-xs font-bold text-[#DC2626]">* Primary</span>}
                </div>
                {!isEn && !title[lang]?.trim() && title.en?.trim() && (
                  <span className="text-[10px] text-[#94A3B8]">Falls back to English if empty</span>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#334155]">
                  Title ({lang.toUpperCase()}) {isEn && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={title[lang] || ""}
                  onChange={(e) => onTitleChange(lang, e.target.value)}
                  placeholder={`e.g. Orange Bay Island Full-Day Snorkeling Trip (${lang.toUpperCase()})`}
                  className={`w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:ring-2 ${
                    err ? "border-red-500 focus:ring-red-100" : "border-[#E2E8F0] focus:border-[#0E4A68] focus:ring-[#0E4A6815]"
                  }`}
                />
                {err && <p className="mt-1 text-[11px] text-red-500">{err}</p>}
              </div>

              {/* Subtitle & Excursion Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#334155]">
                    Subtitle ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={subtitle[lang] || ""}
                    onChange={(e) => onSubtitleChange(lang, e.target.value)}
                    placeholder="Short tagline..."
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-[#334155]">
                    Excursion Type Tag ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={excursionType[lang] || ""}
                    onChange={(e) => onExcursionTypeChange(lang, e.target.value)}
                    placeholder="e.g. Boat Trip & Island Tour"
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#334155]">
                  Short Description ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={shortDescription[lang] || ""}
                  onChange={(e) => onShortDescriptionChange(lang, e.target.value)}
                  placeholder="Overview summary for cards..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
                />
              </div>

              {/* Full Program */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-[#334155]">
                  Full Program Schedule ({lang.toUpperCase()})
                </label>
                <textarea
                  rows={3}
                  value={fullProgram[lang] || ""}
                  onChange={(e) => onFullProgramChange(lang, e.target.value)}
                  placeholder="Detailed tour itinerary..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GroupExcursionLocalizedFields;
