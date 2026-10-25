"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiLoader, FiX } from "react-icons/fi";
import { LANG_FLAGS, LANG_LABELS, LANGS, type LocalizedText } from "@/models/localization";
import type { ExcursionFaqUpsertRequest } from "@/models/excursionDetails";

interface ExcursionFaqFormProps {
  initialValues?: { displayOrder: number; question: LocalizedText; answer: LocalizedText } | null;
  isLoadingInitial?: boolean;
  isSaving: boolean;
  onSubmit: (payload: ExcursionFaqUpsertRequest) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const emptyText = (): LocalizedText => ({ en: "", ru: "", de: "", fr: "" });

export function ExcursionFaqForm({
  initialValues,
  isLoadingInitial = false,
  isSaving,
  onSubmit,
  onCancel,
  isEdit = false,
}: ExcursionFaqFormProps) {
  const [question, setQuestion] = useState<LocalizedText>(emptyText());
  const [answer, setAnswer] = useState<LocalizedText>(emptyText());
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) {
      setQuestion(initialValues.question || emptyText());
      setAnswer(initialValues.answer || emptyText());
      setDisplayOrder(initialValues.displayOrder ?? 1);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.en?.trim()) {
      setError("English question is required.");
      return;
    }
    setError(null);
    const enQ = question.en.trim();
    const enA = answer.en?.trim() || "";

    onSubmit({
      displayOrder,
      isActive: true,
      question: {
        en: enQ,
        ru: question.ru?.trim() || enQ,
        de: question.de?.trim() || enQ,
        fr: question.fr?.trim() || enQ,
      },
      answer: {
        en: enA,
        ru: answer.ru?.trim() || enA,
        de: answer.de?.trim() || enA,
        fr: answer.fr?.trim() || enA,
      },
    });
  };

  if (isLoadingInitial) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/70">
        <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
        <div>
          <h5 className="text-xs font-bold text-[#0E4A68]">{isEdit ? "Edit FAQ" : "Add New FAQ"}</h5>
          <p className="text-[11px] text-gray-500">
            Languages shown together. Optional languages fall back to English.
          </p>
        </div>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 cursor-pointer">
          <FiX className="h-4 w-4" />
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {/* Question section with all 4 languages and flags */}
      <fieldset className="space-y-2.5 rounded-xl border border-gray-200 bg-white p-3">
        <legend className="px-1 text-xs font-bold text-[#083952]">Question (All Languages)</legend>
        {LANGS.map((lang) => (
          <div key={`faq-q-${lang}`} className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#334155]">
              <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1] shadow-2xs">
                <Image src={LANG_FLAGS[lang]} alt={LANG_LABELS[lang]} fill className="object-cover" sizes="20px" />
              </span>
              <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white">
                {lang}
              </span>
              <span>{LANG_LABELS[lang]}</span>
              {lang === "en" ? (
                <span className="text-red-600">*</span>
              ) : (
                <span className="text-[10px] font-normal text-gray-400">(optional)</span>
              )}
            </label>
            <input
              type="text"
              value={question[lang] || ""}
              onChange={(e) => setQuestion((p) => ({ ...p, [lang]: e.target.value }))}
              placeholder={`e.g. What is the cancellation policy? (${LANG_LABELS[lang]})`}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-[#0E4A68] focus:ring-1 focus:ring-[#0E4A6820]"
            />
          </div>
        ))}
      </fieldset>

      {/* Answer section with all 4 languages and flags */}
      <fieldset className="space-y-2.5 rounded-xl border border-gray-200 bg-white p-3">
        <legend className="px-1 text-xs font-bold text-[#083952]">Answer (All Languages)</legend>
        {LANGS.map((lang) => (
          <div key={`faq-a-${lang}`} className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#334155]">
              <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1] shadow-2xs">
                <Image src={LANG_FLAGS[lang]} alt={LANG_LABELS[lang]} fill className="object-cover" sizes="20px" />
              </span>
              <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-white">
                {lang}
              </span>
              <span>{LANG_LABELS[lang]}</span>
              {lang === "en" ? (
                <span className="text-red-600">*</span>
              ) : (
                <span className="text-[10px] font-normal text-gray-400">(optional)</span>
              )}
            </label>
            <textarea
              rows={2}
              value={answer[lang] || ""}
              onChange={(e) => setAnswer((p) => ({ ...p, [lang]: e.target.value }))}
              placeholder={`Answer text in ${LANG_LABELS[lang]}...`}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 outline-none focus:border-[#0E4A68] focus:ring-1 focus:ring-[#0E4A6820]"
            />
          </div>
        ))}
      </fieldset>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-gray-700">Display Order:</label>
          <input
            type="number"
            min={1}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Math.max(1, Number(e.target.value) || 1))}
            className="w-16 rounded-lg border border-gray-200 bg-white px-2 py-1 text-center text-xs text-gray-800 outline-none focus:border-[#0E4A68]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] disabled:opacity-50 cursor-pointer"
          >
            {isSaving && <FiLoader className="h-3.5 w-3.5 animate-spin" />}
            {isSaving ? "Saving..." : isEdit ? "Update FAQ" : "Save FAQ"}
          </button>
        </div>
      </div>
    </form>
  );
}
