"use client";

import React from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { LANG_FLAGS, LANG_LABELS, type LangCode } from "@/models/faq";
import type { PowerPointPair } from "@/models/blog";

interface PowerPointsBuilderProps {
  lang: LangCode;
  pairs: PowerPointPair[];
  onChange: (pairs: PowerPointPair[]) => void;
  required?: boolean;
}

export function PowerPointsBuilder({
  lang,
  pairs,
  onChange,
  required = false,
}: PowerPointsBuilderProps) {
  const handleAdd = () => {
    onChange([...pairs, { key: "", value: "" }]);
  };

  const handleRemove = (index: number) => {
    const next = pairs.filter((_, i) => i !== index);
    onChange(next);
  };

  const handleChange = (
    index: number,
    field: "key" | "value",
    val: string
  ) => {
    const next = pairs.map((item, i) =>
      i === index ? { ...item, [field]: val } : item
    );
    onChange(next);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1] shadow-2xs">
            <Image
              src={LANG_FLAGS[lang]}
              alt={LANG_LABELS[lang]}
              fill
              className="object-cover"
              sizes="20px"
            />
          </span>
          <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {lang}
          </span>
          <span className="text-xs font-semibold text-[#083952]">
            Key & Value Items
          </span>
          {required ? (
            <span className="text-xs text-[#DC2626]">*</span>
          ) : (
            <span className="text-[11px] text-[#94A3B8]">(optional)</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A68] bg-white px-2.5 py-1 text-xs font-semibold text-[#0E4A68] shadow-2xs transition-all hover:bg-[#0E4A68] hover:text-white cursor-pointer"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Points list */}
      {pairs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <p className="text-xs text-[#94A3B8]">
            No key-value items added for {LANG_LABELS[lang]}.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-1.5 text-xs font-semibold text-[#0E4A68] hover:underline cursor-pointer"
          >
            + Add item
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {pairs.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col sm:flex-row sm:items-start gap-2 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-2xs transition-colors hover:border-[#CBD5E1]"
            >
              {/* Item index indicator */}
              <div className="flex items-center justify-between sm:justify-start gap-2 pt-2 sm:pt-2.5">
                <span className="text-xs font-semibold text-[#64748B]">
                  #{index + 1}
                </span>
              </div>

              {/* Input grid */}
              <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[10px] font-semibold text-[#64748B]">
                    Title / Key
                  </label>
                  <input
                    type="text"
                    value={item.key}
                    onChange={(e) =>
                      handleChange(index, "key", e.target.value)
                    }
                    placeholder="e.g., Best Timing, Highlights"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-[10px] font-semibold text-[#64748B]">
                    Detail / Description
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                    placeholder="e.g., Early mornings for best photos & cool weather"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
                  />
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                aria-label="Remove point"
                className="self-end sm:self-center rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626] cursor-pointer"
                title="Remove point"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PowerPointsBuilder;
