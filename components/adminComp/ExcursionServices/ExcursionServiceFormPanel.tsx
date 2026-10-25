"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useExcursionServiceAllLanguagesQuery } from "@/features/excursionServices/useExcursionServices";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type {
  ExcursionServiceImage,
  ExcursionServiceItem,
  ExcursionServiceUpsertRequest,
} from "@/models/excursionService";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import {
  ExcursionServiceGalleryManager,
  ExcursionServiceHeroUploader,
  ExcursionServiceLocalizedFields,
  ExcursionServicePricingFields,
} from "./components";

interface ExcursionServiceFormPanelProps {
  open: boolean;
  onClose: () => void;
  serviceItem?: ExcursionServiceItem | null;
  onSubmitCreate: (data: {
    body: ExcursionServiceUpsertRequest;
    heroFile?: File | null;
    galleryFiles?: File[];
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: ExcursionServiceUpsertRequest;
    heroFile?: File | null;
    removeHero?: boolean;
    newGalleryFiles?: File[];
    deletedGalleryImageIds?: string[];
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function ExcursionServiceFormPanel({
  open,
  onClose,
  serviceItem,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: ExcursionServiceFormPanelProps) {
  const isEdit = Boolean(serviceItem);

  // In edit mode, query all 4 translations in parallel
  const detailQuery = useExcursionServiceAllLanguagesQuery(
    isEdit && open ? serviceItem?.id ?? null : null
  );

  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [description, setDescription] = useState<LocalizedText>(emptyLocalized());
  const [adultPriceUsd, setAdultPriceUsd] = useState<number>(0);
  const [childPriceUsd, setChildPriceUsd] = useState<number>(0);
  const [infantPriceUsd, setInfantPriceUsd] = useState<number>(0);
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Hero Cover Image states
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [removeHero, setRemoveHero] = useState<boolean>(false);

  // Gallery Images states
  const [existingGallery, setExistingGallery] = useState<ExcursionServiceImage[]>([]);
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isEdit && serviceItem) {
      if (detailQuery.data) {
        setTitle(detailQuery.data.titleLocalized || emptyLocalized());
        setDescription(detailQuery.data.descriptionLocalized || emptyLocalized());
        setDisplayOrder(detailQuery.data.displayOrder ?? 0);
        setAdultPriceUsd(detailQuery.data.adultPriceUsd ?? 0);
        setChildPriceUsd(detailQuery.data.childPriceUsd ?? 0);
        setInfantPriceUsd(detailQuery.data.infantPriceUsd ?? 0);
        setExistingGallery(detailQuery.data.images ?? []);
      } else {
        setTitle({
          en: serviceItem.title || "",
          ru: "",
          de: "",
          fr: "",
        });
        setDescription({
          en: serviceItem.description || "",
          ru: "",
          de: "",
          fr: "",
        });
        setDisplayOrder(serviceItem.displayOrder ?? 0);
        setAdultPriceUsd(serviceItem.adultPriceUsd ?? 0);
        setChildPriceUsd(serviceItem.childPriceUsd ?? 0);
        setInfantPriceUsd(serviceItem.infantPriceUsd ?? 0);
        setExistingGallery(serviceItem.images ?? []);
      }
      setHeroFile(null);
      setHeroPreview(null);
      setRemoveHero(false);
      setDeletedGalleryIds([]);
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
      setErrors({});
    } else if (!isEdit) {
      setTitle(emptyLocalized());
      setDescription(emptyLocalized());
      setDisplayOrder(0);
      setAdultPriceUsd(0);
      setChildPriceUsd(0);
      setInfantPriceUsd(0);
      setExistingGallery([]);
      setDeletedGalleryIds([]);
      setHeroFile(null);
      setHeroPreview(null);
      setRemoveHero(false);
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
      setErrors({});
    }
  }, [serviceItem, isEdit, detailQuery.data, open]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (heroPreview) URL.revokeObjectURL(heroPreview);
      newGalleryPreviews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, [heroPreview, newGalleryPreviews]);

  const handleTitleChange = (lang: LangCode, value: string) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
    if (errors[`title.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`title.${lang}`];
        return next;
      });
    }
  };

  const handleDescriptionChange = (lang: LangCode, value: string) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
    if (errors[`description.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`description.${lang}`];
        return next;
      });
    }
  };

  const handleHeroSelect = (file: File) => {
    if (heroPreview) URL.revokeObjectURL(heroPreview);
    setHeroFile(file);
    setRemoveHero(false);
    setHeroPreview(URL.createObjectURL(file));
  };

  const handleClearHero = () => {
    setHeroFile(null);
    if (heroPreview) {
      URL.revokeObjectURL(heroPreview);
      setHeroPreview(null);
    }
    if (isEdit && serviceItem?.heroImage) {
      setRemoveHero(true);
    }
  };

  const handleAddGalleryFiles = (files: File[]) => {
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewGalleryFiles((prev) => [...prev, ...files]);
    setNewGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveExistingGalleryImage = (id: string) => {
    setExistingGallery((prev) => prev.filter((img) => img.id !== id));
    setDeletedGalleryIds((prev) => [...prev, id]);
  };

  const handleRemoveNewGalleryImage = (index: number) => {
    const previewToRevoke = newGalleryPreviews[index];
    if (previewToRevoke) URL.revokeObjectURL(previewToRevoke);

    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.en?.trim()) {
      newErrors["title.en"] = "English service title is required.";
    }

    if (!description.en?.trim()) {
      newErrors["description.en"] = "English description is required.";
    }

    if (adultPriceUsd < 0) {
      newErrors.adultPriceUsd = "Adult price cannot be negative.";
    }

    if (childPriceUsd < 0) {
      newErrors.childPriceUsd = "Child price cannot be negative.";
    }

    if (infantPriceUsd < 0) {
      newErrors.infantPriceUsd = "Infant price cannot be negative.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields.");
      return;
    }

    const body: ExcursionServiceUpsertRequest = {
      title,
      description,
      displayOrder: Number(displayOrder) || 0,
      adultPriceUsd: Number(adultPriceUsd) || 0,
      childPriceUsd: Number(childPriceUsd) || 0,
      infantPriceUsd: Number(infantPriceUsd) || 0,
    };

    if (isEdit && serviceItem) {
      onSubmitUpdate({
        id: serviceItem.id,
        body,
        heroFile,
        removeHero: removeHero && !heroFile,
        newGalleryFiles,
        deletedGalleryImageIds: deletedGalleryIds,
      });
    } else {
      onSubmitCreate({
        body,
        heroFile,
        galleryFiles: newGalleryFiles,
      });
    }
  };

  const existingHeroUrl =
    !removeHero && serviceItem?.heroImage
      ? getBackendImageUrl(serviceItem.heroImage)
      : null;
  const currentHeroUrl = heroPreview || existingHeroUrl;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Service Option" : "Add Service Option"}
      subtitle={
        isEdit
          ? "Update localized details, pricing, cover hero, and gallery photos."
          : "Create an excursion service option or upgrade with pricing and photos."
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
            form="excursion-service-form"
            disabled={isSubmitting || (isEdit && detailQuery.isLoading)}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Option"}
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
        id="excursion-service-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Hero Cover Image Subcomponent */}
        <ExcursionServiceHeroUploader
          currentHeroUrl={currentHeroUrl}
          heroFile={heroFile}
          onFileSelect={handleHeroSelect}
          onRemove={handleClearHero}
        />

        {/* Localized Titles & Descriptions Subcomponent */}
        <ExcursionServiceLocalizedFields
          title={title}
          description={description}
          errors={errors}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />

        {/* Pricing & Order Subcomponent */}
        <ExcursionServicePricingFields
          adultPriceUsd={adultPriceUsd}
          childPriceUsd={childPriceUsd}
          infantPriceUsd={infantPriceUsd}
          displayOrder={displayOrder}
          errors={errors}
          onAdultPriceUsdChange={(val) => {
            setAdultPriceUsd(val);
            if (errors.adultPriceUsd) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.adultPriceUsd;
                return next;
              });
            }
          }}
          onChildPriceUsdChange={(val) => {
            setChildPriceUsd(val);
            if (errors.childPriceUsd) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.childPriceUsd;
                return next;
              });
            }
          }}
          onInfantPriceUsdChange={(val) => {
            setInfantPriceUsd(val);
            if (errors.infantPriceUsd) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.infantPriceUsd;
                return next;
              });
            }
          }}
          onDisplayOrderChange={setDisplayOrder}
        />

        {/* Gallery Photos Subcomponent */}
        <ExcursionServiceGalleryManager
          existingGallery={existingGallery}
          newGalleryPreviews={newGalleryPreviews}
          onAddFiles={handleAddGalleryFiles}
          onRemoveExisting={handleRemoveExistingGalleryImage}
          onRemoveNew={handleRemoveNewGalleryImage}
        />
      </form>
    </SlidePanel>
  );
}

export default ExcursionServiceFormPanel;
