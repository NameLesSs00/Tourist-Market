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

interface ProductLocalizedFieldsProps {
  title: LocalizedText;
  subtitle: LocalizedText;
  priceFor: LocalizedText;
  errors: Record<string, string>;
  onTitleChange: (lang: LangCode, value: string) => void;
  onSubtitleChange: (lang: LangCode, value: string) => void;
  onPriceForChange: (lang: LangCode, value: string) => void;
}

export function ProductLocalizedFields({
  title,
  subtitle,
  priceFor,
  errors,
  onTitleChange,
  onSubtitleChange,
  onPriceForChange,
}: ProductLocalizedFieldsProps) {
  return (
    <div className="space-y-6">
      {/* 1. Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Product Title
          </label>
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
                    <Image
                      src={LANG_FLAGS[lang]}
                      alt={lang}
                      width={18}
                      height={12}
                      className="rounded-xs object-cover"
                    />
                    {LANG_LABELS[lang]}
                    {isEn && <span className="text-[#DC2626]">*</span>}
                  </span>
                  {!isEn && !title[lang]?.trim() && title.en?.trim() && (
                    <span className="text-[10px] text-[#94A3B8]">
                      Falls back to English
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={title[lang] || ""}
                  onChange={(e) => onTitleChange(lang, e.target.value)}
                  placeholder={`e.g. Premium Red Sea Souvenir Gift Box (${lang.toUpperCase()})`}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
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

      {/* 2. Subtitle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Subtitle / Summary
          </label>
          <span className="text-[11px] text-[#64748B]">English is required.</span>
        </div>
        <div className="space-y-2.5">
          {LANGS.map((lang) => {
            const isEn = lang === "en";
            const err = errors[`subtitle.${lang}`];
            return (
              <div key={`subtitle-${lang}`} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                    <Image
                      src={LANG_FLAGS[lang]}
                      alt={lang}
                      width={18}
                      height={12}
                      className="rounded-xs object-cover"
                    />
                    {LANG_LABELS[lang]}
                    {isEn && <span className="text-[#DC2626]">*</span>}
                  </span>
                  {!isEn && !subtitle[lang]?.trim() && subtitle.en?.trim() && (
                    <span className="text-[10px] text-[#94A3B8]">
                      Falls back to English
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={subtitle[lang] || ""}
                  onChange={(e) => onSubtitleChange(lang, e.target.value)}
                  placeholder={`e.g. A curated collection of authentic local Egyptian crafts (${lang.toUpperCase()})`}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
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

      {/* 3. Price Unit (Price For) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Price Unit Description (&quot;Price For&quot;)
          </label>
          <span className="text-[11px] text-[#64748B]">English is required.</span>
        </div>
        <div className="space-y-2.5">
          {LANGS.map((lang) => {
            const isEn = lang === "en";
            const err = errors[`priceFor.${lang}`];
            return (
              <div key={`priceFor-${lang}`} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-[#334155]">
                    <Image
                      src={LANG_FLAGS[lang]}
                      alt={lang}
                      width={18}
                      height={12}
                      className="rounded-xs object-cover"
                    />
                    {LANG_LABELS[lang]}
                    {isEn && <span className="text-[#DC2626]">*</span>}
                  </span>
                  {!isEn && !priceFor[lang]?.trim() && priceFor.en?.trim() && (
                    <span className="text-[10px] text-[#94A3B8]">
                      Falls back to English
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={priceFor[lang] || ""}
                  onChange={(e) => onPriceForChange(lang, e.target.value)}
                  placeholder={`e.g. per box, per piece, per kg (${lang.toUpperCase()})`}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
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
    </div>
  );
}
