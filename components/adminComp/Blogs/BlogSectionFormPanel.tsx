"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiLayers, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { PowerPointsBuilder } from "./PowerPointsBuilder";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type {
  BlogSectionCreateRequest,
  BlogSectionItem,
  BlogSectionUpdateRequest,
  LocalizedArray,
  PowerPointPair,
} from "@/models/blog";

interface BlogSectionFormPanelProps {
  open: boolean;
  onClose: () => void;
  blogId: string;
  section?: BlogSectionItem | null;
  onSubmitCreate: (data: BlogSectionCreateRequest) => void;
  onSubmitUpdate: (data: BlogSectionUpdateRequest) => void;
  isSubmitting?: boolean;
}

function emptyLocalized(): LocalizedText {
  return { en: "", ru: "", de: "", fr: "" };
}

function emptyLocalizedPairs(): Record<LangCode, PowerPointPair[]> {
  return { en: [], ru: [], de: [], fr: [] };
}

export function BlogSectionFormPanel({
  open,
  onClose,
  blogId,
  section,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting = false,
}: BlogSectionFormPanelProps) {
  const isEdit = Boolean(section);
  const [activeLang, setActiveLang] = useState<LangCode>("en");

  // Form states
  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [shortDescription, setShortDescription] = useState<LocalizedText>(
    emptyLocalized()
  );
  const [description, setDescription] = useState<LocalizedText>(
    emptyLocalized()
  );
  const [points, setPoints] = useState<Record<LangCode, PowerPointPair[]>>(
    emptyLocalizedPairs()
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate values when opening
  useEffect(() => {
    if (!open) return;
    setActiveLang("en");
    setErrors({});

    if (section) {
      // Editing: populate section values. The single section endpoint gives English/active values.
      // Reconstruct pairs from keys and values arrays.
      const initialPairs = emptyLocalizedPairs();
      const count = Math.max(
        section.keys?.length ?? 0,
        section.values?.length ?? 0
      );
      const sectionPairs: PowerPointPair[] = [];
      for (let i = 0; i < count; i++) {
        sectionPairs.push({
          key: section.keys?.[i] ?? "",
          value: section.values?.[i] ?? "",
        });
      }

      // Seed all languages initially with existing data
      LANGS.forEach((l) => {
        initialPairs[l] = [...sectionPairs];
      });

      setTitle({
        en: section.title ?? "",
        ru: section.title ?? "",
        de: section.title ?? "",
        fr: section.title ?? "",
      });
      setShortDescription({
        en: section.shortDescription ?? "",
        ru: section.shortDescription ?? "",
        de: section.shortDescription ?? "",
        fr: section.shortDescription ?? "",
      });
      setDescription({
        en: section.description ?? "",
        ru: section.description ?? "",
        de: section.description ?? "",
        fr: section.description ?? "",
      });
      setPoints(initialPairs);
    } else {
      // Creating: clear fields
      setTitle(emptyLocalized());
      setShortDescription(emptyLocalized());
      setDescription(emptyLocalized());
      setPoints(emptyLocalizedPairs());
    }
  }, [open, section]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // English is mandatory
    if (!title.en?.trim()) {
      newErrors["title.en"] = "English Title is required.";
    }
    if (!description.en?.trim()) {
      newErrors["description.en"] = "English Description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setActiveLang("en");
      toast.error("Please fill in the required English fields.");
      return;
    }

    // Convert PowerPointPairs back into parallel keys and values arrays
    const keys = {} as LocalizedArray;
    const values = {} as LocalizedArray;

    LANGS.forEach((l) => {
      const activePairs = points[l] ?? [];
      // Filter out totally empty rows
      const valid = activePairs.filter(
        (p) => p.key.trim() || p.value.trim()
      );
      keys[l] = valid.map((p) => p.key);
      values[l] = valid.map((p) => p.value);
    });

    if (isEdit) {
      onSubmitUpdate({
        title,
        shortDescription,
        description,
        keys,
        values,
      });
    } else {
      onSubmitCreate({
        blogId,
        title,
        shortDescription,
        description,
        keys,
        values,
      });
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Blog Section" : "Add Blog Section"}
      subtitle="Sections divide the blog into structured chapters with highlight points."
      icon={<FiLayers className="h-5 w-5" />}
      widthClassName="max-w-3xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-section-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Add Section"}
          </button>
        </>
      }
    >
      <form
        id="blog-section-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Language Tabs Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#64748B]">
            Language Content Tab
          </label>
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-1.5">
            {LANGS.map((lang) => {
              const active = activeLang === lang;
              const hasContent =
                Boolean(title[lang]?.trim()) ||
                Boolean(description[lang]?.trim()) ||
                (points[lang]?.length ?? 0) > 0;

              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-white text-[#0E4A68] shadow-xs ring-1 ring-[#0E4A6826]"
                      : "text-[#64748B] hover:bg-white/60 hover:text-[#0E4A68]"
                  }`}
                >
                  <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                    <Image
                      src={LANG_FLAGS[lang]}
                      alt={LANG_LABELS[lang]}
                      fill
                      className="object-cover"
                      sizes="20px"
                    />
                  </span>
                  <span>{LANG_LABELS[lang]}</span>
                  {lang === "en" && (
                    <span className="text-[10px] text-[#DC2626] font-bold">
                      *
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {activeLang !== "en" && (
            <p className="text-[11px] text-[#94A3B8]">
              Optional: Fields left empty will automatically inherit the
              English content upon save.
            </p>
          )}
        </div>

        {/* Localized Section Content Fields */}
        <div className="space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-2xs">
          {/* Section Title */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#083952]">
              <span>Section Title ({LANG_LABELS[activeLang]})</span>
              {activeLang === "en" && (
                <span className="text-[#DC2626]">*</span>
              )}
            </label>
            <input
              type="text"
              value={title[activeLang] ?? ""}
              onChange={(e) => {
                setTitle((prev) => ({
                  ...prev,
                  [activeLang]: e.target.value,
                }));
                if (errors[`title.${activeLang}`]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[`title.${activeLang}`];
                    return next;
                  });
                }
              }}
              placeholder={`e.g., Unveiling the Pyramids (${LANG_LABELS[activeLang]})`}
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                errors[`title.${activeLang}`]
                  ? "border-[#FCA5A5]"
                  : "border-[#E2E8F0]"
              }`}
            />
            {errors[`title.${activeLang}`] && (
              <p className="text-[11px] font-medium text-[#DC2626]">
                {errors[`title.${activeLang}`]}
              </p>
            )}
          </div>

          {/* Section Short Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#083952]">
              Short Description / Overview ({LANG_LABELS[activeLang]})
            </label>
            <input
              type="text"
              value={shortDescription[activeLang] ?? ""}
              onChange={(e) =>
                setShortDescription((prev) => ({
                  ...prev,
                  [activeLang]: e.target.value,
                }))
              }
              placeholder="Brief summary or introductory sentence..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            />
          </div>

          {/* Section Full Description */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#083952]">
              <span>Full Content & Details ({LANG_LABELS[activeLang]})</span>
              {activeLang === "en" && (
                <span className="text-[#DC2626]">*</span>
              )}
            </label>
            <textarea
              rows={5}
              value={description[activeLang] ?? ""}
              onChange={(e) => {
                setDescription((prev) => ({
                  ...prev,
                  [activeLang]: e.target.value,
                }));
                if (errors[`description.${activeLang}`]) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next[`description.${activeLang}`];
                    return next;
                  });
                }
              }}
              placeholder="Write the comprehensive paragraph content for this section..."
              className={`w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                errors[`description.${activeLang}`]
                  ? "border-[#FCA5A5]"
                  : "border-[#E2E8F0]"
              }`}
            />
            {errors[`description.${activeLang}`] && (
              <p className="text-[11px] font-medium text-[#DC2626]">
                {errors[`description.${activeLang}`]}
              </p>
            )}
          </div>
        </div>

        {/* Key & Value Highlights */}
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-semibold text-[#083952]">
              Key Highlights & Details
            </h4>
            <p className="text-xs text-[#64748B]">
              Optional structured key-value items for this section (e.g.,
              &quot;Best Time&quot; : &quot;Sunrise&quot;).
            </p>
          </div>

          <PowerPointsBuilder
            lang={activeLang}
            pairs={points[activeLang] ?? []}
            onChange={(newPairs) =>
              setPoints((prev) => ({
                ...prev,
                [activeLang]: newPairs,
              }))
            }
            required={activeLang === "en" && (points.en?.length ?? 0) > 0}
          />
        </div>
      </form>
    </SlidePanel>
  );
}

export default BlogSectionFormPanel;
