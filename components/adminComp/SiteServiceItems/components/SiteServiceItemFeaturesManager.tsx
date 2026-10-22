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
import type { SiteServiceFeatureUpsert } from "@/models/siteServiceItem";

interface SiteServiceItemFeaturesManagerProps {
  features: SiteServiceFeatureUpsert[];
  onChange: (features: SiteServiceFeatureUpsert[]) => void;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function SiteServiceItemFeaturesManager({
  features,
  onChange,
}: SiteServiceItemFeaturesManagerProps) {
  const handleAddFeatureGroup = () => {
    const newGroup: SiteServiceFeatureUpsert = {
      name: emptyLocalized(),
      values: [
        {
          name: emptyLocalized(),
        },
      ],
    };
    onChange([...features, newGroup]);
  };

  const handleRemoveFeatureGroup = (groupIndex: number) => {
    onChange(features.filter((_, idx) => idx !== groupIndex));
  };

  const handleGroupNameChange = (
    groupIndex: number,
    lang: LangCode,
    val: string
  ) => {
    const updated = features.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        name: { ...grp.name, [lang]: val },
      };
    });
    onChange(updated);
  };

  const handleAddValue = (groupIndex: number) => {
    const updated = features.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        values: [
          ...grp.values,
          {
            name: emptyLocalized(),
          },
        ],
      };
    });
    onChange(updated);
  };

  const handleRemoveValue = (groupIndex: number, valueIndex: number) => {
    const updated = features.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      return {
        ...grp,
        values: grp.values.filter((_, vIdx) => vIdx !== valueIndex),
      };
    });
    onChange(updated);
  };

  const handleValueNameChange = (
    groupIndex: number,
    valueIndex: number,
    lang: LangCode,
    val: string
  ) => {
    const updated = features.map((grp, idx) => {
      if (idx !== groupIndex) return grp;
      const updatedValues = grp.values.map((v, vIdx) => {
        if (vIdx !== valueIndex) return v;
        return {
          ...v,
          name: { ...v.name, [lang]: val },
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
            Included Perks &amp; Specifications
          </label>
          <p className="text-[11px] text-[#64748B]">
            E.g. Vehicle Specifications &rarr; &quot;Automatic Transmission&quot;, &quot;Power Steering &amp; AC&quot; in all languages.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddFeatureGroup}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6820] bg-[#0E4A680C] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer transition-colors"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Feature Group</span>
        </button>
      </div>

      {features.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center text-xs text-[#94A3B8]">
          No included perks configured. Click &quot;Add Feature Group&quot; to highlight vehicle specs, equipment, or inclusions.
        </div>
      ) : (
        <div className="space-y-5">
          {features.map((grp, grpIdx) => (
            <div
              key={grp.id || `feat-grp-${grpIdx}`}
              className="space-y-4 rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 shadow-2xs"
            >
              {/* Group Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-xs font-bold text-[#083952]">
                  Feature Group #{grpIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeatureGroup(grpIdx)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer transition-colors"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                  <span>Remove Group</span>
                </button>
              </div>

              {/* Group Name in all 4 languages */}
              <div className="space-y-2 rounded-xl border border-[#E2E8F0] bg-white p-3">
                <label className="text-[11px] font-semibold text-[#083952]">
                  Feature Group Name (e.g. &quot;Vehicle Specifications&quot;)
                </label>
                <div className="space-y-2">
                  {LANGS.map((lang) => (
                    <div key={`feat-name-${grpIdx}-${lang}`} className="flex items-center gap-2">
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
                            ? 'e.g., "Vehicle Specifications"'
                            : `Name in ${LANG_LABELS[lang]} (optional)`
                        }
                        className="flex-1 rounded-lg border border-[#CBD5E1] bg-white px-2.5 py-1.5 text-xs text-[#083952] placeholder-[#94A3B8] focus:border-[#0E4A68] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Perk Items List */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#083952]">
                    Included Specifications / Perks
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddValue(grpIdx)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#0E4A6820] bg-white px-2.5 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A680A] cursor-pointer transition-colors"
                  >
                    <FiPlus className="h-3 w-3" />
                    <span>Add Perk Item</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {grp.values.map((v, valIdx) => (
                    <div
                      key={v.id || `fval-${grpIdx}-${valIdx}`}
                      className="space-y-2 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-1.5">
                        <span className="text-[11px] font-bold text-[#0E4A68]">
                          Perk #{valIdx + 1}
                        </span>
                        {grp.values.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveValue(grpIdx, valIdx)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#DC2626] hover:underline cursor-pointer"
                          >
                            <FiTrash2 className="h-3 w-3" />
                            <span>Remove Perk</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        {LANGS.map((lang) => (
                          <div
                            key={`fval-lang-${grpIdx}-${valIdx}-${lang}`}
                            className="flex items-center gap-2"
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
                            <span className="w-16 shrink-0 text-[11px] font-medium text-[#475569]">
                              {LANG_LABELS[lang]} {lang === "en" && <span className="text-[#DC2626]">*</span>}
                            </span>
                            <input
                              type="text"
                              value={v.name[lang] || ""}
                              onChange={(e) =>
                                handleValueNameChange(
                                  grpIdx,
                                  valIdx,
                                  lang,
                                  e.target.value
                                )
                              }
                              placeholder={
                                lang === "en"
                                  ? 'e.g., "Automatic Transmission" *'
                                  : `Perk in ${LANG_LABELS[lang]} (optional)`
                              }
                              className="flex-1 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#083952] placeholder-[#94A3B8] focus:border-[#0E4A68] focus:bg-white focus:outline-none"
                            />
                          </div>
                        ))}
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
