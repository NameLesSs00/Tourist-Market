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

interface PrivateExcursionLocalizedFieldsProps {
  title: LocalizedText;
  subtitle: LocalizedText;
  excursionType: LocalizedText;
  shortDescription: LocalizedText;
  fullProgram: LocalizedText;
  errors: Record<string, string>;
  onTitleChange: (lang: LangCode, value: string) => void;
  onSubtitleChange: (lang: LangCode, value: string) => void;
  onExcursionTypeChange: (lang: LangCode, value: string) => void;
  onShortDescriptionChange: (lang: LangCode, value: string) => void;
  onFullProgramChange: (lang: LangCode, value: string) => void;
}

export function PrivateExcursionLocalizedFields({
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
}: PrivateExcursionLocalizedFieldsProps) {
  return (
    <div className="space-y-6">
      {/* 1. Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">Excursion Title</label>
          <span className="text-[11px] text-[#64748B]">English is required.</span>
        </div>
        <div className="space-y-2.5">
          {LANGS.map((lang) => {
            const isEn = lang === "en";
            const err = errors[`title.${lang}`];
            return (
              <div key={`title-${lang}`} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                    <Image src={LANG_FLAGS[lang]} alt={lang} width={18} height={12} className="rounded-xs object-cover" />
                    {LANG_LABELS[lang]}
                    {isEn && <span className="text-[#DC2626]">*</span>}
                  </span>
                  {!isEn && !title[lang]?.trim() && title.en?.trim() && (
                    <span className="text-[10px] text-[#94A3B8]">Falls back to English</span>
                  )}
                </div>
                <input
                  type="text"
                  value={title[lang] || ""}
                  onChange={(e) => onTitleChange(lang, e.target.value)}
                  placeholder={`e.g. Private Dolphin House Speedboat Trip (${lang.toUpperCase()})`}
                  className={`w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:ring-2 ${
                    err ? "border-[#EF4444] focus:ring-[#EF444420]" : "border-[#E2E8F0] focus:border-[#0E4A68] focus:ring-[#0E4A6815]"
                  }`}
                />
                {err && <p className="text-[11px] text-[#EF4444]">{err}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Subtitle */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#083952]">Subtitle / Tagline</label>
        <div className="space-y-2.5">
          {LANGS.map((lang) => (
            <div key={`subtitle-${lang}`} className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#334155]">
                <Image src={LANG_FLAGS[lang]} alt={lang} width={18} height={12} className="rounded-xs object-cover" />
                {LANG_LABELS[lang]}
              </span>
              <input
                type="text"
                value={subtitle[lang] || ""}
                onChange={(e) => onSubtitleChange(lang, e.target.value)}
                placeholder={`e.g. Swim with wild dolphins and explore secluded coral reefs (${lang.toUpperCase()})`}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6815]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Excursion Type */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#083952]">Excursion Type</label>
        <div className="space-y-2.5">
          {LANGS.map((lang) => (
            <div key={`type-${lang}`} className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#334155]">
                <Image src={LANG_FLAGS[lang]} alt={lang} width={18} height={12} className="rounded-xs object-cover" />
                {LANG_LABELS[lang]}
              </span>
              <input
                type="text"
                value={excursionType[lang] || ""}
                onChange={(e) => onExcursionTypeChange(lang, e.target.value)}
                placeholder={`e.g. Private Boat Trip, Historical Day Tour (${lang.toUpperCase()})`}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6815]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Short Description */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#083952]">Short Description</label>
        <div className="space-y-2.5">
          {LANGS.map((lang) => (
            <div key={`shortDesc-${lang}`} className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#334155]">
                <Image src={LANG_FLAGS[lang]} alt={lang} width={18} height={12} className="rounded-xs object-cover" />
                {LANG_LABELS[lang]}
              </span>
              <textarea
                rows={2}
                value={shortDescription[lang] || ""}
                onChange={(e) => onShortDescriptionChange(lang, e.target.value)}
                placeholder={`Brief summary of the experience (${lang.toUpperCase()})...`}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6815]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Full Program */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-[#083952]">Full Program / Itinerary</label>
        <div className="space-y-2.5">
          {LANGS.map((lang) => (
            <div key={`program-${lang}`} className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#334155]">
                <Image src={LANG_FLAGS[lang]} alt={lang} width={18} height={12} className="rounded-xs object-cover" />
                {LANG_LABELS[lang]}
              </span>
              <textarea
                rows={4}
                value={fullProgram[lang] || ""}
                onChange={(e) => onFullProgramChange(lang, e.target.value)}
                placeholder={`1. Private hotel pickup.\n2. Marina boarding.\n3. Guided snorkeling stops... (${lang.toUpperCase()})`}
                className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6815]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
