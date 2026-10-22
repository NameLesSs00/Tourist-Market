"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type { SiteServiceItem } from "@/models/siteService";
import type {
  SiteServiceFeatureUpsert,
  SiteServiceItemImage,
  SiteServiceOptionUpsert,
  SiteServiceSubItem,
  SiteServiceSubItemUpsertRequest,
} from "@/models/siteServiceItem";
import { useSiteServiceSubItemAllLanguagesQuery } from "@/features/siteServiceItems/useSiteServiceItems";
import { useSiteServicesQuery } from "@/features/siteServices/useSiteServices";
import {
  SiteServiceItemFeaturesManager,
  SiteServiceItemGalleryManager,
  SiteServiceItemLocalizedFields,
  SiteServiceItemOptionsManager,
  SiteServiceItemPricingStatus,
} from "./components";

interface SiteServiceItemFormPanelProps {
  open: boolean;
  item?: SiteServiceSubItem;
  defaultServiceId?: string;
  onClose: () => void;
  onSubmitCreate: (data: {
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
    deletedImageIds?: string[];
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function SiteServiceItemFormPanel({
  open,
  item,
  defaultServiceId,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: SiteServiceItemFormPanelProps) {
  const isEdit = Boolean(item);
  const detailQuery = useSiteServiceSubItemAllLanguagesQuery(item?.id);

  // Fetch parent site services for dropdown
  const siteServicesQuery = useSiteServicesQuery({ pageSize: 100 });
  const siteServices: SiteServiceItem[] = siteServicesQuery.data?.items ?? [];

  // Form states
  const [serviceId, setServiceId] = useState<string>("");
  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [subtitle, setSubtitle] = useState<LocalizedText>(emptyLocalized());
  const [textTopImage, setTextTopImage] = useState<LocalizedText>(emptyLocalized());
  const [description, setDescription] = useState<LocalizedText>(emptyLocalized());
  const [note, setNote] = useState<LocalizedText>(emptyLocalized());
  const [alert, setAlert] = useState<LocalizedText>(emptyLocalized());
  const [basePriceUSD, setBasePriceUSD] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [options, setOptions] = useState<SiteServiceOptionUpsert[]>([]);
  const [features, setFeatures] = useState<SiteServiceFeatureUpsert[]>([]);

  // Gallery states
  const [existingGallery, setExistingGallery] = useState<SiteServiceItemImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && item) {
      if (detailQuery.data) {
        setServiceId(detailQuery.data.serviceId || item.serviceId || "");
        setTitle(detailQuery.data.title || emptyLocalized());
        setSubtitle(detailQuery.data.subtitle || emptyLocalized());
        setTextTopImage(detailQuery.data.textTopImage || emptyLocalized());
        setDescription(detailQuery.data.description || emptyLocalized());
        setNote(detailQuery.data.note || emptyLocalized());
        setAlert(detailQuery.data.alert || emptyLocalized());
        setBasePriceUSD(detailQuery.data.basePriceUSD ?? item.basePriceUSD ?? 0);
        setIsActive(detailQuery.data.isActive ?? item.isActive ?? true);
        setOptions(detailQuery.data.options || []);
        setFeatures(detailQuery.data.features || []);
        setExistingGallery(detailQuery.data.images || item.images || []);
      } else {
        setServiceId(item.serviceId || "");
        setTitle({ en: item.title || "", ru: "", de: "", fr: "" });
        setSubtitle({ en: item.subtitle || "", ru: "", de: "", fr: "" });
        setTextTopImage({ en: item.textTopImage || "", ru: "", de: "", fr: "" });
        setDescription({ en: item.description || "", ru: "", de: "", fr: "" });
        setNote({ en: item.note || "", ru: "", de: "", fr: "" });
        setAlert({ en: item.alert || "", ru: "", de: "", fr: "" });
        setBasePriceUSD(item.basePriceUSD ?? 0);
        setIsActive(item.isActive ?? true);
        setOptions([]);
        setFeatures([]);
        setExistingGallery(item.images || []);
      }
      setDeletedImageIds([]);
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
      setErrors({});
    } else if (!isEdit) {
      setServiceId(defaultServiceId || "");
      setTitle(emptyLocalized());
      setSubtitle(emptyLocalized());
      setTextTopImage(emptyLocalized());
      setDescription(emptyLocalized());
      setNote(emptyLocalized());
      setAlert(emptyLocalized());
      setBasePriceUSD(0);
      setIsActive(true);
      setOptions([]);
      setFeatures([]);
      setExistingGallery([]);
      setDeletedImageIds([]);
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
      setErrors({});
    }
  }, [item, isEdit, detailQuery.data, open, defaultServiceId]);

  useEffect(() => {
    return () => {
      newGalleryPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newGalleryPreviews]);

  const handleAddFiles = (files: File[]) => {
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewGalleryFiles((prev) => [...prev, ...files]);
    setNewGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveExistingImage = (id: string) => {
    setExistingGallery((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const handleRemoveNewImage = (index: number) => {
    const previewToRevoke = newGalleryPreviews[index];
    if (previewToRevoke) URL.revokeObjectURL(previewToRevoke);

    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!serviceId.trim()) {
      newErrors.serviceId = "Parent site service is required.";
    }

    if (!title.en?.trim()) {
      newErrors["title.en"] = "English item title is required.";
    }

    if (!description.en?.trim()) {
      newErrors["description.en"] = "English description is required.";
    }

    if (basePriceUSD < 0) {
      newErrors.basePriceUSD = "Price cannot be negative.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    const body: SiteServiceSubItemUpsertRequest = {
      serviceId,
      title,
      subtitle,
      description,
      textTopImage,
      note,
      alert,
      basePriceUSD: Number(basePriceUSD) || 0,
      isActive,
      options,
      features,
    };

    if (isEdit && item) {
      onSubmitUpdate({
        id: item.id,
        body,
        newGalleryFiles,
        deletedImageIds,
      });
    } else {
      onSubmitCreate({
        body,
        newGalleryFiles,
      });
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Site Service Item" : "Add Site Service Item"}
      subtitle={
        isEdit
          ? "Update service item specs, variations, perks, and gallery."
          : "Create an item with options, features, and photos."
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="site-service-item-form"
            disabled={isSubmitting || (isEdit && detailQuery.isLoading)}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer transition-colors"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Item"}
          </button>
        </>
      }
    >
      {/* Edit Loading Banner */}
      {isEdit && detailQuery.isLoading && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#0E4A6820] bg-[#0E4A680A] p-3 text-xs text-[#0E4A68]">
          <FiLoader className="h-4 w-4 animate-spin" />
          <span>Loading localized translations from server...</span>
        </div>
      )}

      <form
        id="site-service-item-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* 1. Photos & Gallery at the Top */}
        <SiteServiceItemGalleryManager
          existingGallery={existingGallery}
          newGalleryPreviews={newGalleryPreviews}
          onAddFiles={handleAddFiles}
          onRemoveExisting={handleRemoveExistingImage}
          onRemoveNew={handleRemoveNewImage}
        />

        {/* 2. Parent Service, Base Price & Active Status */}
        <SiteServiceItemPricingStatus
          serviceId={serviceId}
          services={siteServices}
          isLoadingServices={siteServicesQuery.isLoading}
          basePriceUSD={basePriceUSD}
          isActive={isActive}
          errors={errors}
          onServiceChange={(val) => {
            setServiceId(val);
            if (errors.serviceId) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.serviceId;
                return next;
              });
            }
          }}
          onPriceChange={setBasePriceUSD}
          onStatusChange={setIsActive}
        />

        {/* 3. Localized Fields without tabs */}
        <SiteServiceItemLocalizedFields
          title={title}
          subtitle={subtitle}
          textTopImage={textTopImage}
          description={description}
          note={note}
          alert={alert}
          errors={errors}
          onTitleChange={handleTitleChange}
          onSubtitleChange={(lang, val) =>
            setSubtitle((prev) => ({ ...prev, [lang]: val }))
          }
          onTextTopImageChange={(lang, val) =>
            setTextTopImage((prev) => ({ ...prev, [lang]: val }))
          }
          onDescriptionChange={handleDescriptionChange}
          onNoteChange={(lang, val) =>
            setNote((prev) => ({ ...prev, [lang]: val }))
          }
          onAlertChange={(lang, val) =>
            setAlert((prev) => ({ ...prev, [lang]: val }))
          }
        />

        {/* 4. Customizable Variation Options */}
        <SiteServiceItemOptionsManager
          options={options}
          onChange={setOptions}
        />

        {/* 5. Included Perks & Specifications */}
        <SiteServiceItemFeaturesManager
          features={features}
          onChange={setFeatures}
        />
      </form>
    </SlidePanel>
  );
}
