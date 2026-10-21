"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiCompass, FiHash, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useExcursionCategoryAllLanguagesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/faq";
import type {
  ExcursionCategoryCreateRequest,
  ExcursionCategoryItem,
  ExcursionCategoryUpdateRequest,
} from "@/models/excursionCategory";

interface ExcursionCategoryFormPanelProps {
  open: boolean;
  onClose: () => void;
  category?: ExcursionCategoryItem | null;
  onSubmitCreate: (data: ExcursionCategoryCreateRequest) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: ExcursionCategoryUpdateRequest;
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function ExcursionCategoryFormPanel({
  open,
  onClose,
  category,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: ExcursionCategoryFormPanelProps) {
  const isEdit = Boolean(category);

  // In edit mode, fetch all 4 translations in parallel
  const detailQuery = useExcursionCategoryAllLanguagesQuery(
    isEdit && open ? category?.id ?? null : null
  );

  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && category) {
      if (detailQuery.data) {
        setName(detailQuery.data.name || emptyLocalized());
        setDisplayOrder(detailQuery.data.displayOrder ?? 0);
        setIsActive(detailQuery.data.isActive ?? true);
      } else {
        setName({
          en: category.name || "",
          ru: "",
          de: "",
          fr: "",
        });
        setDisplayOrder(category.displayOrder ?? 0);
        setIsActive(category.isActive ?? true);
      }
      setErrors({});
    } else if (!isEdit) {
      setName(emptyLocalized());
      setDisplayOrder(0);
      setIsActive(true);
      setErrors({});
    }
  }, [category, isEdit, detailQuery.data, open]);

  const handleNameChange = (lang: LangCode, value: string) => {
    setName((prev) => ({ ...prev, [lang]: value }));
    if (errors[`name.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`name.${lang}`];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.en?.trim()) {
      newErrors["name.en"] = "English category name is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required English name.");
      return;
    }

    if (isEdit && category) {
      const updatePayload: ExcursionCategoryUpdateRequest = {
        name,
        displayOrder: Number(displayOrder) || 0,
        isActive,
      };
      onSubmitUpdate({ id: category.id, body: updatePayload });
    } else {
      const createPayload: ExcursionCategoryCreateRequest = {
        name,
        displayOrder: Number(displayOrder) || 0,
      };
      onSubmitCreate(createPayload);
    }
  };

  const isLoadingDetail = isEdit && detailQuery.isLoading;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Excursion Category" : "Add Excursion Category"}
      subtitle={
        isEdit
          ? `Update category details and translations for “${category?.name}”.`
          : "Create an excursion category with multi-language titles."
      }
      icon={<FiCompass className="h-5 w-5" />}
      widthClassName="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="excursion-category-form"
            disabled={isSubmitting || isLoadingDetail}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Category"}
          </button>
        </>
      }
    >
      {isLoadingDetail ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
          <p className="mt-3 text-xs text-[#64748B]">
            Loading category translations...
          </p>
        </div>
      ) : (
        <form
          id="excursion-category-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Multi-language Category Names */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#083952]">
                Category Name (Multi-Language)
              </label>
              <p className="mt-0.5 text-[11px] text-[#64748B]">
                English is required. Other languages are optional and will automatically inherit the English name if left blank.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              {LANGS.map((lang) => {
                const isEn = lang === "en";
                const err = errors[`name.${lang}`];
                const inputId = `category-name-${lang}`;

                return (
                  <div key={lang} className="space-y-1">
                    <label
                      htmlFor={inputId}
                      className="flex items-center gap-2 text-xs font-semibold text-[#334155]"
                    >
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
                      <span>{LANG_LABELS[lang]}</span>
                      {isEn ? (
                        <span className="text-[#DC2626]">*</span>
                      ) : (
                        <span className="text-[11px] font-normal text-[#94A3B8]">
                          (optional)
                        </span>
                      )}
                    </label>

                    <input
                      id={inputId}
                      type="text"
                      value={name[lang] ?? ""}
                      onChange={(e) => handleNameChange(lang, e.target.value)}
                      placeholder={`e.g. Category name in ${LANG_LABELS[lang]}`}
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                        err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                      }`}
                    />
                    {err && (
                      <p className="text-[11px] font-medium text-[#DC2626]">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Display Order */}
          <div className="space-y-1.5">
            <label
              htmlFor="category-display-order"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]"
            >
              <FiHash className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Display Order</span>
            </label>
            <input
              id="category-display-order"
              type="number"
              min={0}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
              placeholder="0"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            />
            <p className="text-[11px] text-[#64748B]">
              Controls sorting on the website (lower numbers appear first).
            </p>
          </div>

          {/* Active Status Toggle (Edit mode only) */}
          {isEdit && (
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#083952]">
                    Category Status
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {isActive
                      ? "Active: Category and its tours are visible to tourists."
                      : "Suspended: Category is hidden from public view."}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isActive}
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isActive ? "bg-[#0E4A68]" : "bg-[#CBD5E1]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </SlidePanel>
  );
}

export default ExcursionCategoryFormPanel;
