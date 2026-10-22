"use client";

import React from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type { SiteServiceOptionUpsert } from "@/models/siteServiceItem";

interface SiteServiceItemOptionsManagerProps {
  options: SiteServiceOptionUpsert[];
  onChange: (options: SiteServiceOptionUpsert[]) => void;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function SiteServiceItemOptionsManager({
  options,
  onChange,
}: SiteServiceItemOptionsManagerProps) {
  const handleAddOptionGroup = () => {
    const newGroup: SiteServiceOptionUpsert = {
      name: emptyLocalized(),
      values: [
        {
          key: emptyLocalized(),
          value: emptyLocalized(),
        },
      ],
    };
    onChange([...options, newGroup]);
  };

  const handleRemoveOptionGroup = (groupIndex: number) => {
    onChange(options.filter((_, idx) => idx !== groupIndex));
  };

  const handleGroupNameChange = (
    groupIndex: number,
    lang: LangCode,
    val: string
  ) => {
    const updated = options.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        name: { ...grp.name, [lang]: val },
      };
    });
    onChange(updated);
  };

  const handleAddValue = (groupIndex: number) => {
    const updated = options.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        values: [
          ...grp.values,
          {
            key: emptyLocalized(),
            value: emptyLocalized(),
          },
        ],
      };
    });
    onChange(updated);
  };

  const handleRemoveValue = (groupIndex: number, valueIndex: number) => {
    const updated = options.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        values: grp.values.filter((_, vIdx) => vIdx !== valueIndex),
      };
    });
    onChange(updated);
  };

  const handleValueKeyChange = (
    groupIndex: number,
    valueIndex: number,
    lang: LangCode,
    val: string
  ) => {
    const updated = options.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      const updatedValues = grp.values.map((v, vIdx) => {
        if (vIdx !== valueIndex) return v;
        return {
          ...v,
          key: { ...v.key, [lang]: val },
        };
      });
      return { ...grp, values: updatedValues };
    });
    onChange(updated);
  };

  const handleValueValChange = (
    groupIndex: number,
    valueIndex: number,
    lang: LangCode,
    val: string
  ) => {
    const updated = options.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      const updatedValues = grp.values.map((v, vIdx) => {
        if (vIdx !== valueIndex) return v;
        return {
          ...v,
          value: { ...v.value, [lang]: val },
        };
      });
      return { ...grp, values: updatedValues };
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#083952]">
            Customizable Variation Options
          </label>
          <p className="text-[11px] text-[#64748B]">
            E.g. Rental Duration with choices like &quot;1-3 Days&quot; &rarr; &quot;55 USD per day&quot; in all languages.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddOptionGroup}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680C] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer transition-colors"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Option Group</span>
        </button>
      </div>

      {options.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center text-xs text-[#94A3B8]">
          No customizable options configured. Click &quot;Add Option Group&quot; to define durations, packages, or tiers.
        </div>
      ) : (
        <div className="space-y-5">
          {options.map((grp, grpIdx) => (
            <div
              key={grp.id || `opt-grp-${grpIdx}`}
              className="space-y-4 rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 shadow-2xs"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-xs font-bold text-[#083952]">
                  Option Group #{grpIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveOptionGroup(grpIdx)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer transition-colors"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  <span>Remove Group</span>
                </button>
              </div>

              {/* Group Name in all 4 languages */}
              <div className="space-y-2 rounded-xl border border-[#E2E8F0] bg-white p-3">
                <label className="text-[11px] font-semibold text-[#083952]">
                  Option Group Name (e.g. &quot;Rental Duration&quot;)
                </label>
                <div className="space-y-2">
                  {LANGS.map((lang) => (
                    <div key={`grp-name-${grpIdx}-${lang}`} className="flex items-center gap-2">
                      <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                        <Image
                          src={LANG_FLAGS[lang]}
                          alt={LANG_LABELS[lang]}
                          fill
                          className="object-cover"
                          sizes="16px"
                        />
                      </span>
                      <span className="w-16 shrink-0 text-[11px] font-medium text-[#475569]">
                        {LANG_LABELS[lang]} {lang === "en" && <span className="text-[#DC2626]">*</span>}
                      </span>
                      <input
                        type="text"
                        value={grp.name[lang] || ""}
                        onChange={(e) =>
                          handleGroupNameChange(grpIdx, lang, e.target.value)
                        }
                        placeholder={
                          lang === "en"
                            ? 'e.g., "Rental Duration"'
                            : `Name in ${LANG_LABELS[lang]} (optional)`
                        }
                        className="flex-1 rounded-lg border border-[#CBD5E1] bg-white px-2.5 py-1.5 text-xs text-[#083952] placeholder-[#94A3B8] focus:border-[#0E4A68] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Choices List */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#083952]">
                    Choice Values (Variations)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddValue(grpIdx)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#0E4A6820] bg-white px-2.5 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A680A] cursor-pointer transition-colors"
                  >
                    <FiPlus className="h-3 w-3" />
                    <span>Add Choice</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {grp.values.map((v, valIdx) => (
                    <div
                      key={v.id || `val-${grpIdx}-${valIdx}`}
                      className="space-y-3 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                        <span className="text-[11px] font-bold text-[#0E4A68]">
                          Choice #{valIdx + 1}
                        </span>
                        {grp.values.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveValue(grpIdx, valIdx)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#DC2626] hover:underline cursor-pointer"
                          >
                            <FiTrash2 className="h-3 w-3" />
                            <span>Remove Choice</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Key Column */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-semibold text-[#475569]">
                            Choice Key (e.g. &quot;1-3 Days&quot;)
                          </span>
                          <div className="space-y-1.5">
                            {LANGS.map((lang) => (
                              <div
                                key={`key-${grpIdx}-${valIdx}-${lang}`}
                                className="flex items-center gap-1.5"
                              >
                                <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                                  <Image
                                    src={LANG_FLAGS[lang]}
                                    alt={LANG_LABELS[lang]}
                                    fill
                                    className="object-cover"
                                    sizes="16px"
                                  />
                                </span>
                                <input
                                  type="text"
                                  value={v.key[lang] || ""}
                                  onChange={(e) =>
                                    handleValueKeyChange(
                                      grpIdx,
                                      valIdx,
                                      lang,
                                      e.target.value
                                    )
                                  }
                                  placeholder={
                                    lang === "en"
                                      ? 'Key (e.g. "1-3 Days") *'
                                      : `${LANG_LABELS[lang]} key`
                                  }
                                  className="flex-1 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#083952] placeholder-[#94A3B8] focus:border-[#0E4A68] focus:bg-white focus:outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Value Column */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-semibold text-[#475569]">
                            Display Value (e.g. &quot;55 USD per day&quot;)
                          </span>
                          <div className="space-y-1.5">
                            {LANGS.map((lang) => (
                              <div
                                key={`val-${grpIdx}-${valIdx}-${lang}`}
                                className="flex items-center gap-1.5"
                              >
                                <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                                  <Image
                                    src={LANG_FLAGS[lang]}
                                    alt={LANG_LABELS[lang]}
                                    fill
                                    className="object-cover"
                                    sizes="16px"
                                  />
                                </span>
                                <input
                                  type="text"
                                  value={v.value[lang] || ""}
                                  onChange={(e) =>
                                    handleValueValChange(
                                      grpIdx,
                                      valIdx,
                                      lang,
                                      e.target.value
                                    )
                                  }
                                  placeholder={
                                    lang === "en"
                                      ? 'Value (e.g. "55 USD per day") *'
                                      : `${LANG_LABELS[lang]} value`
                                  }
                                  className="flex-1 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#083952] placeholder-[#94A3B8] focus:border-[#0E4A68] focus:bg-white focus:outline-none"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
