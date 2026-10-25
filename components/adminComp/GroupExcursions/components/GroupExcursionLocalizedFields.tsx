"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LANG_FLAGS, LANG_LABELS, LANGS, type LangCode, type LocalizedText } from "@/models/localization";

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
  const [activeLang, setActiveLang] = useState<LangCode>("en");

  return (
    <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E4A68]">
          Multilingual Content & Program
        </h3>
        {/* Language Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-[#F8FAFC] p-1 border border-[#E2E8F0]">
          {LANGS.map((lang) => {
            const active = activeLang === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                  active
                    ? "bg-[#FFFFFF] text-[#0E4A68] shadow-2xs"
                    : "text-[#64748B] hover:text-[#0E4A68]"
                }`}
              >
                <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-2xs border border-[#CBD5E1]">
                  <Image src={LANG_FLAGS[lang]} alt={LANG_LABELS[lang]} fill className="object-cover" sizes="16px" />
                </span>
                <span>{lang.toUpperCase()}</span>
                {lang === "en" && <span className="text-red-500 font-bold">*</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {/* Title */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Title ({activeLang.toUpperCase()}) {activeLang === "en" && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={title[activeLang] || ""}
            onChange={(e) => onTitleChange(activeLang, e.target.value)}
            placeholder="e.g. Orange Bay Island Full-Day Snorkeling Trip"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
          {activeLang === "en" && errors["title.en"] && (
            <p className="mt-1 text-[11px] text-red-500">{errors["title.en"]}</p>
          )}
        </div>

        {/* Subtitle & Excursion Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[#334155]">
              Subtitle ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={subtitle[activeLang] || ""}
              onChange={(e) => onSubtitleChange(activeLang, e.target.value)}
              placeholder="e.g. Crystal-clear waters and white sandy beaches"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-[#334155]">
              Excursion Type Tag ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={excursionType[activeLang] || ""}
              onChange={(e) => onExcursionTypeChange(activeLang, e.target.value)}
              placeholder="e.g. Boat Trip & Island Tour"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Short Description ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={2}
            value={shortDescription[activeLang] || ""}
            onChange={(e) => onShortDescriptionChange(activeLang, e.target.value)}
            placeholder="Concise summary for cards and overview..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
        </div>

        {/* Full Program */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-[#334155]">
            Full Program Schedule ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={4}
            value={fullProgram[activeLang] || ""}
            onChange={(e) => onFullProgramChange(activeLang, e.target.value)}
            placeholder="Detailed timeline: departure, snorkeling stops, lunch, return..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
        </div>
      </div>
    </div>
  );
}

export default GroupExcursionLocalizedFields;
