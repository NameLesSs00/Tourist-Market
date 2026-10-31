"use client";

import React from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
} from "@/models/localization";
import type { ProductFormKeyRow } from "../useProductForm";

interface ProductKeysManagerProps {
  keys: ProductFormKeyRow[];
  onAddKey: () => void;
  onRemoveKey: (index: number) => void;
  onUpdateTitle: (index: number, lang: LangCode, value: string) => void;
  onUpdateDescription: (index: number, lang: LangCode, value: string) => void;
}

export function ProductKeysManager({
  keys,
  onAddKey,
  onRemoveKey,
  onUpdateTitle,
  onUpdateDescription,
}: ProductKeysManagerProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
        <div>
          <label className="text-xs font-semibold text-[#083952]">
            Product Specifications & Details
          </label>
          <p className="text-[11px] text-[#64748B] mt-0.5">
            Add specifications (e.g. Hair Type, Ingredients, Volume) where Name is the Title and Value is the Description.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddKey}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#0E4A68] bg-[#0E4A680A] px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] cursor-pointer transition-colors"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Specification</span>
        </button>
      </div>

      {/* Empty State */}
      {keys.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#CBD5E1] p-6 text-center">
          <p className="text-xs text-[#64748B]">
            No specifications added yet. Click &quot;Add Specification&quot; above to add characteristics such as Hair Type, Ingredients, or Volume.
          </p>
        </div>
      )}

      {/* Specifications List */}
      <div className="space-y-4">
        {keys.map((keyItem, index) => (
          <div
            key={`key-row-${index}`}
            className="rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 space-y-4 shadow-2xs"
          >
            {/* Header with index and delete button */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <span className="text-xs font-bold text-[#0E4A68]">
                Specification #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemoveKey(index)}
                aria-label={`Delete specification ${index + 1}`}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer transition-colors"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>

            {/* 1. Title (Key Name) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#083952]">
                  Specification Title
                </span>
                <span className="text-[10px] text-[#64748B]">
                  e.g. Hair Type, Ingredients, Volume
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LANGS.map((lang) => {
                  const isEn = lang === "en";
                  return (
                    <div key={`title-${index}-${lang}`} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#334155]">
                        <Image
                          src={LANG_FLAGS[lang]}
                          alt={lang}
                          width={14}
                          height={10}
                          className="rounded-xs object-cover"
                        />
                        <span>{LANG_LABELS[lang]}</span>
                        {isEn && <span className="text-[#DC2626]">*</span>}
                      </div>
                      <input
                        type="text"
                        value={keyItem.title[lang] || ""}
                        onChange={(e) =>
                          onUpdateTitle(index, lang, e.target.value)
                        }
                        placeholder={`Title in ${lang.toUpperCase()}`}
                        className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs text-[#083952] placeholder:text-slate-400 focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Description (Key Value) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#083952]">
                  Specification Description
                </span>
                <span className="text-[10px] text-[#64748B]">
                  e.g. Dry & Damaged Hair, 500 ml
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LANGS.map((lang) => {
                  const isEn = lang === "en";
                  return (
                    <div
                      key={`desc-${index}-${lang}`}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#334155]">
                        <Image
                          src={LANG_FLAGS[lang]}
                          alt={lang}
                          width={14}
                          height={10}
                          className="rounded-xs object-cover"
                        />
                        <span>{LANG_LABELS[lang]}</span>
                        {isEn && <span className="text-[#DC2626]">*</span>}
                      </div>
                      <textarea
                        rows={2}
                        value={keyItem.description[lang] || ""}
                        onChange={(e) =>
                          onUpdateDescription(index, lang, e.target.value)
                        }
                        placeholder={`Description in ${lang.toUpperCase()}`}
                        className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs text-[#083952] placeholder:text-slate-400 focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] resize-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductKeysManager;

