"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { LANG_FLAGS, LANG_LABELS, type LangCode } from "@/models/localization";

interface ExcursionDetailsListSectionProps {
  title: string;
  description: string;
  items: string[];
  placeholder?: string;
  badgeLabel?: string;
  activeLang?: LangCode;
  onAddItem: (text: string) => void;
  onRemoveItem: (index: number) => void;
}

export function ExcursionDetailsListSection({
  title,
  description,
  items,
  placeholder = "Add an item and press Enter...",
  badgeLabel,
  activeLang,
  onAddItem,
  onRemoveItem,
}: ExcursionDetailsListSectionProps) {
  const [draft, setDraft] = useState("");

  const handleAdd = () => {
    if (!draft.trim()) return;
    onAddItem(draft.trim());
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-[#083952]">{title}</h4>
            {activeLang && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-medium text-[#334155]">
                <span className="relative flex h-3 w-4.5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                  <Image src={LANG_FLAGS[activeLang]} alt={LANG_LABELS[activeLang]} fill className="object-cover" sizes="18px" />
                </span>
                <span>{LANG_LABELS[activeLang]}</span>
              </span>
            )}
            <span className="rounded-full bg-[#0E4A680F] px-2 py-0.5 text-[11px] font-semibold text-[#0E4A68]">
              {items.length} {badgeLabel || "items"}
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68] focus:bg-[#FFFFFF]"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!draft.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-2 text-xs font-semibold text-[#FFFFFF] shadow-2xs hover:bg-[#0A374E] transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          <FiPlus className="h-3.5 w-3.5" />
          <span>Add</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E2E8F0] p-3 text-center text-xs text-[#94A3B8]">
          No entries added yet for this language. Type above and click Add.
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={`${index}-${item.slice(0, 16)}`}
              className="group flex items-start justify-between gap-3 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-2.5 transition hover:border-[#E2E8F0] hover:bg-[#FFFFFF]"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-[10px] font-bold text-[#475569]">
                  {index + 1}
                </span>
                <span className="text-xs text-[#1E293B] leading-relaxed break-words">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                title="Remove item"
                className="shrink-0 p-1 text-[#94A3B8] hover:text-[#DC2626] transition cursor-pointer"
              >
                <FiTrash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
