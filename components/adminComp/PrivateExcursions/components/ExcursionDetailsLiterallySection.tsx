"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { LANG_FLAGS, LANG_LABELS, type LangCode } from "@/models/localization";
import type { KeyValuePair } from "@/models/excursionDetails";

interface ExcursionDetailsLiterallySectionProps {
  items: KeyValuePair[];
  activeLang?: LangCode;
  onAddItem: (key: string, value: string) => void;
  onUpdateItem: (index: number, key: string, value: string) => void;
  onRemoveItem: (index: number) => void;
}

export function ExcursionDetailsLiterallySection({
  items,
  activeLang,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: ExcursionDetailsLiterallySectionProps) {
  const [draftKey, setDraftKey] = useState("");
  const [draftValue, setDraftValue] = useState("");

  const handleAdd = () => {
    if (!draftKey.trim() || !draftValue.trim()) return;
    onAddItem(draftKey.trim(), draftValue.trim());
    setDraftKey("");
    setDraftValue("");
  };

  const handleQuickAdd = (presetKey: string) => {
    setDraftKey(presetKey);
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-[#083952]">Itinerary & Detailed Program</h4>
            {activeLang && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-medium text-[#334155]">
                <span className="relative flex h-3 w-4.5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                  <Image src={LANG_FLAGS[activeLang]} alt={LANG_LABELS[activeLang]} fill className="object-cover" sizes="18px" />
                </span>
                <span>{LANG_LABELS[activeLang]}</span>
              </span>
            )}
            <span className="rounded-full bg-[#D48C2815] px-2 py-0.5 text-[11px] font-semibold text-[#D48C28]">
              {items.length} sections
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Key-value itinerary segments (e.g. Title, Description, Itinerary 1, Itinerary 2).
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-[#94A3B8]">Quick Keys:</span>
          {["Title", "Description", `Itinerary ${Math.max(1, items.filter((x) => x.key.startsWith("Itinerary")).length + 1)}`].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handleQuickAdd(preset)}
              className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1 text-[11px] font-semibold text-[#475569] hover:border-[#0E4A68] hover:text-[#0E4A68] transition cursor-pointer"
            >
              +{preset}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5 space-y-2.5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <input
            type="text"
            value={draftKey}
            onChange={(e) => setDraftKey(e.target.value)}
            placeholder="Key (e.g. Itinerary 1)"
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          />
          <div className="sm:col-span-2 flex items-center gap-2">
            <input
              type="text"
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              placeholder="Value (e.g. The Giza Plateau: Icons of Eternity...)"
              className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!draftKey.trim() || !draftValue.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-2 text-xs font-semibold text-[#FFFFFF] shadow-2xs hover:bg-[#0A374E] transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <FiPlus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E2E8F0] p-4 text-center text-xs text-[#94A3B8]">
          No itinerary items added yet for this language. Use the fields above to add stops or program phases.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={`${index}-${item.key}`}
              className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2 transition hover:bg-[#FFFFFF]"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={item.key}
                  onChange={(e) => onUpdateItem(index, e.target.value, item.value)}
                  className="w-1/3 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-semibold text-[#083952] outline-none transition focus:border-[#0E4A68]"
                />
                <button
                  type="button"
                  onClick={() => onRemoveItem(index)}
                  title="Remove this item"
                  className="p-1 text-[#94A3B8] hover:text-[#DC2626] transition cursor-pointer"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <textarea
                value={item.value}
                rows={2}
                onChange={(e) => onUpdateItem(index, item.key, e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1.5 text-xs text-[#334155] outline-none transition focus:border-[#0E4A68] leading-relaxed resize-y"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
