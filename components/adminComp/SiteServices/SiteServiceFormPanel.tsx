"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared";
import {
  type LangCode,
  type LocalizedText,
} from "@/models/localization";
import type {
  SiteServiceItem,
  SiteServiceUpsertRequest,
} from "@/models/siteService";
import { useSiteServiceAllLanguagesQuery } from "@/features/siteServices/useSiteServices";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import {
  SiteServiceImageUploader,
  SiteServiceLocalizedFields,
  SiteServiceStatusPicker,
} from "./components";

interface SiteServiceFormPanelProps {
  open: boolean;
  serviceItem?: SiteServiceItem;
  onClose: () => void;
  onSubmitCreate: (data: {
    body: SiteServiceUpsertRequest;
    imageFile?: File | null;
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: SiteServiceUpsertRequest;
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

export function SiteServiceFormPanel({
  open,
  serviceItem,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: SiteServiceFormPanelProps) {
  const isEdit = Boolean(serviceItem);
  const detailQuery = useSiteServiceAllLanguagesQuery(serviceItem?.id);

  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [description, setDescription] = useState<LocalizedText>(emptyLocalized());
  const [isActive, setIsActive] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && serviceItem) {
      if (detailQuery.data) {
        setTitle(detailQuery.data.title || emptyLocalized());
        setDescription(detailQuery.data.description || emptyLocalized());
        setIsActive(detailQuery.data.isActive ?? true);
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
        setIsActive(serviceItem.isActive ?? true);
      }
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
      setErrors({});
    } else if (!isEdit) {
      setTitle(emptyLocalized());
      setDescription(emptyLocalized());
      setIsActive(true);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
      setErrors({});
    }
  }, [serviceItem, isEdit, detailQuery.data, open]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

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

  const handleImageSelect = (file: File) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClearImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (isEdit && serviceItem?.imageUrl) {
      setRemoveImage(true);
    }
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields.");
      return;
    }

    const body: SiteServiceUpsertRequest = {
      title,
      description,
      isActive,
    };

    if (isEdit && serviceItem) {
      onSubmitUpdate({
        id: serviceItem.id,
        body,
        imageFile,
        removeImage: removeImage && !imageFile,
      });
    } else {
      onSubmitCreate({
        body,
        imageFile,
      });
    }
  };

  const existingImageUrl =
    !removeImage && serviceItem?.imageUrl
      ? getBackendImageUrl(serviceItem.imageUrl)
      : null;
  const currentImageUrl = imagePreview || existingImageUrl;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Site Service" : "Add Site Service"}
      subtitle={
        isEdit
          ? "Update localized service details, status, and cover image."
          : "Create a new site service to showcase across the platform."
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
            form="site-service-form"
            disabled={isSubmitting || (isEdit && detailQuery.isLoading)}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer transition-colors"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Service"}
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
        id="site-service-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Cover Image Upload at the Top */}
        <SiteServiceImageUploader
          currentImageUrl={currentImageUrl}
          imageFile={imageFile}
          onFileSelect={handleImageSelect}
          onRemove={handleClearImage}
        />

        {/* Localized Titles and Descriptions in the Middle */}
        <SiteServiceLocalizedFields
          title={title}
          description={description}
          errors={errors}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
        />

        {/* Status Toggle at the Bottom */}
        <SiteServiceStatusPicker
          isActive={isActive}
          onChange={setIsActive}
        />
      </form>
    </SlidePanel>
  );
}
