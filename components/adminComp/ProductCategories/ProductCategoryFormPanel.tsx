"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiHash, FiImage, FiLayers, FiLoader, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useProductCategoryAllLanguagesQuery } from "@/features/productCategories/useProductCategoryAdmin";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type {
  ProductCategoryItem,
  ProductCategoryUpsertRequest,
} from "@/models/productCategory";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface ProductCategoryFormPanelProps {
  open: boolean;
  onClose: () => void;
  category?: ProductCategoryItem | null;
  onSubmitCreate: (data: {
    body: ProductCategoryUpsertRequest;
    imageFile?: File | null;
  }) => void;
  onSubmitUpdate: (data: {
    id: number;
    body: ProductCategoryUpsertRequest;
    imageFile?: File | null;
    removeImage?: boolean;
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function ProductCategoryFormPanel({
  open,
  onClose,
  category,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: ProductCategoryFormPanelProps) {
  const isEdit = Boolean(category);

  // In edit mode, query all 4 translations in parallel
  const detailQuery = useProductCategoryAllLanguagesQuery(
    isEdit && open ? category?.id ?? null : null
  );

  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Image upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  useEffect(() => {
    if (isEdit && category) {
      if (detailQuery.data) {
        setName(detailQuery.data.name || emptyLocalized());
        setDisplayOrder(detailQuery.data.displayOrder ?? 0);
      } else {
        setName({
          en: category.name || "",
          ru: "",
          de: "",
          fr: "",
        });
        setDisplayOrder(category.displayOrder ?? 0);
      }
      setSelectedFile(null);
      setFilePreview(null);
      setRemoveExistingImage(false);
      setErrors({});
    } else if (!isEdit) {
      setName(emptyLocalized());
      setDisplayOrder(0);
      setSelectedFile(null);
      setFilePreview(null);
      setRemoveExistingImage(false);
      setErrors({});
    }
  }, [category, isEdit, detailQuery.data, open]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

    setSelectedFile(file);
    setRemoveExistingImage(false);
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

    const body: ProductCategoryUpsertRequest = {
      name,
      displayOrder: Number(displayOrder) || 0,
    };

    if (isEdit && category) {
      onSubmitUpdate({
        id: category.id,
        body,
        imageFile: selectedFile,
        removeImage: removeExistingImage && !selectedFile,
      });
    } else {
      onSubmitCreate({
        body,
        imageFile: selectedFile,
      });
    }
  };

  // Determine which preview URL to render
  const existingImageUrl =
    !removeExistingImage && category?.imageUrl
      ? getBackendImageUrl(category.imageUrl)
      : null;
  const currentImageUrl = filePreview || existingImageUrl;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Product Category" : "Add Product Category"}
      subtitle={
        isEdit
          ? "Update localized category names, display order, and cover image."
          : "Create a new product category with localized titles and an optional cover image."
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-category-form"
            disabled={isSubmitting || (isEdit && detailQuery.isLoading)}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer"
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
      {/* Loading banner for multi-language edit */}
      {isEdit && detailQuery.isLoading && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#0E4A6820] bg-[#0E4A680A] p-3 text-xs text-[#0E4A68]">
          <FiLoader className="h-4 w-4 animate-spin" />
          <span>Loading all language translations from server...</span>
        </div>
      )}

      <form
        id="product-category-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Cover Image Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#083952]">
            Category Cover Image (Optional)
          </label>

          {currentImageUrl ? (
            <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={currentImageUrl}
                  alt="Category Cover Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  unoptimized
                />
              </div>

              {/* Action bar over image */}
              <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-white p-3">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <FiImage className="h-4 w-4 text-[#0E4A68]" />
                  <span className="truncate max-w-[200px]">
                    {selectedFile
                      ? selectedFile.name
                      : "Current cover image attached"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6814] cursor-pointer"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedFile) {
                        handleClearSelectedFile();
                      } else {
                        setRemoveExistingImage(true);
                      }
                    }}
                    className="flex items-center gap-1 rounded-lg border border-[#EF444430] bg-[#FEF2F2] px-3 py-1.5 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2] cursor-pointer"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-8 text-center transition-colors hover:border-[#0E4A68] hover:bg-[#0E4A6805]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0E4A68] shadow-2xs transition-transform group-hover:scale-105">
                <FiUploadCloud className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs font-semibold text-[#083952]">
                Click or drag image here to upload
              </p>
              <p className="mt-1 text-[11px] text-[#94A3B8]">
                PNG, JPG, or WebP up to 5MB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Localized Category Titles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#083952]">
              Localized Category Name
            </label>
            <span className="text-[11px] text-[#64748B]">
              English is required; others fallback to English.
            </span>
          </div>

          <div className="space-y-3">
            {LANGS.map((lang) => {
              const isEn = lang === "en";
              const error = errors[`name.${lang}`];

              return (
                <div key={lang} className="space-y-1">
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
                      <span className="text-[11px] text-[#94A3B8]">
                        Optional
                      </span>
                    )}
                  </div>

                  <input
                    type="text"
                    value={name[lang] || ""}
                    onChange={(e) => handleNameChange(lang, e.target.value)}
                    placeholder={
                      isEn
                        ? "e.g., Handcrafted Papyrus"
                        : `Category name in ${LANG_LABELS[lang]} (optional)`
                    }
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-[#083952] placeholder-[#94A3B8] shadow-2xs transition-colors focus:outline-none focus:ring-2 ${
                      error
                        ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20"
                        : "border-[#CBD5E1] focus:border-[#0E4A68] focus:ring-[#0E4A68]/20"
                    }`}
                  />
                  {error && (
                    <p className="text-[11px] text-[#EF4444]">{error}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Display Order */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiHash className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Display Order</span>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2.5 text-xs text-[#083952] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
          />
          <p className="text-[11px] text-[#64748B]">
            Determines the sorting order in store category listings (lower numbers appear first).
          </p>
        </div>
      </form>
    </SlidePanel>
  );
}

export default ProductCategoryFormPanel;
