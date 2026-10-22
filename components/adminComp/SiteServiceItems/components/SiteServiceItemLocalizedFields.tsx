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

interface SiteServiceItemLocalizedFieldsProps {
  title: LocalizedText;
  subtitle: LocalizedText;
  textTopImage: LocalizedText;
  description: LocalizedText;
  note: LocalizedText;
  alert: LocalizedText;
  errors: Record<string, string>;
  onTitleChange: (lang: LangCode, value: string) => void;
  onSubtitleChange: (lang: LangCode, value: string) => void;
  onTextTopImageChange: (lang: LangCode, value: string) => void;
  onDescriptionChange: (lang: LangCode, value: string) => void;
  onNoteChange: (lang: LangCode, value: string) => void;
  onAlertChange: (lang: LangCode, value: string) => void;
}

export function SiteServiceItemLocalizedFields({
  title,
  subtitle,
  textTopImage,
  description,
  note,
  alert,
  errors,
  onTitleChange,
  onSubtitleChange,
  onTextTopImageChange,
  onDescriptionChange,
  onNoteChange,
  onAlertChange,
}: SiteServiceItemLocalizedFieldsProps) {
  return (
    <div className="space-y-6">
      {/* 1. Item Title */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Service Item Title
          </label>
          <span className="text-[11px] text-[#64748B]">English is required.</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => {
            const isEn = lang === "en";
            const error = errors[`title.${lang}`];
            return (
              <div key={`title-${lang}`} className="space-y-1">
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
                    <span className="text-[11px] text-[#94A3B8]">Optional</span>
                  )}
                </div>
                <input
                  type="text"
                  value={title[lang] || ""}
                  onChange={(e) => onTitleChange(lang, e.target.value)}
                  placeholder={
                    isEn
                      ? "e.g., Kia Cerato Rental"
                      : `Title in ${LANG_LABELS[lang]} (optional)`
                  }
                  className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                    error
                      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                      : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
                  }`}
                />
                {error && <p className="text-[11px] text-[#EF4444]">{error}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Subtitle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">Subtitle</label>
          <span className="text-[11px] text-[#94A3B8]">Optional tagline</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => (
            <div key={`sub-${lang}`} className="space-y-1">
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
                </span>
              </div>
              <input
                type="text"
                value={subtitle[lang] || ""}
                onChange={(e) => onSubtitleChange(lang, e.target.value)}
                placeholder={`Subtitle in ${LANG_LABELS[lang]}`}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Text Top Image */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Text Top Image (Banner Badge)
          </label>
          <span className="text-[11px] text-[#94A3B8]">Optional overlay badge</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => (
            <div key={`tti-${lang}`} className="space-y-1">
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
                </span>
              </div>
              <input
                type="text"
                value={textTopImage[lang] || ""}
                onChange={(e) => onTextTopImageChange(lang, e.target.value)}
                placeholder={`Banner text in ${LANG_LABELS[lang]}`}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Description */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Description
          </label>
          <span className="text-[11px] text-[#64748B]">English is required.</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => {
            const isEn = lang === "en";
            const error = errors[`description.${lang}`];
            return (
              <div key={`desc-${lang}`} className="space-y-1">
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
                    <span className="text-[11px] text-[#94A3B8]">Optional</span>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={description[lang] || ""}
                  onChange={(e) => onDescriptionChange(lang, e.target.value)}
                  placeholder={
                    isEn
                      ? "Describe the service item, features, and key highlights..."
                      : `Description in ${LANG_LABELS[lang]} (optional)`
                  }
                  className={`w-full rounded-xl border bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                    error
                      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                      : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
                  }`}
                />
                {error && <p className="text-[11px] text-[#EF4444]">{error}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Note */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Important Note (e.g. ID requirements)
          </label>
          <span className="text-[11px] text-[#94A3B8]">Optional instructions</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => (
            <div key={`note-${lang}`} className="space-y-1">
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
                </span>
              </div>
              <input
                type="text"
                value={note[lang] || ""}
                onChange={(e) => onNoteChange(lang, e.target.value)}
                placeholder={`Note in ${LANG_LABELS[lang]} (e.g., A valid passport is required...)`}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 6. Alert */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#083952]">
            Alert / Warning (e.g. Restrictions)
          </label>
          <span className="text-[11px] text-[#94A3B8]">Optional restriction warning</span>
        </div>
        <div className="space-y-3">
          {LANGS.map((lang) => (
            <div key={`alert-${lang}`} className="space-y-1">
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
                </span>
              </div>
              <input
                type="text"
                value={alert[lang] || ""}
                onChange={(e) => onAlertChange(lang, e.target.value)}
                placeholder={`Alert warning in ${LANG_LABELS[lang]} (e.g., Off-road driving forbidden...)`}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
