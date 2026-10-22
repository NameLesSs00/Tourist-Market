"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { usePrivateExcursionAllLanguagesQuery } from "@/features/privateExcursions/usePrivateExcursionAdmin";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type {
  PrivateExcursionListItem,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";
import {
  PrivateExcursionAttractionPicker,
  PrivateExcursionLocalizedFields,
  PrivateExcursionServicePicker,
  PrivateExcursionSpecsPricing,
} from "./components";

interface PrivateExcursionFormPanelProps {
  open: boolean;
  onClose: () => void;
  excursion?: PrivateExcursionListItem | null;
  onSubmitCreate: (data: {
    body: PrivateExcursionUpsertRequest;
    attractionIds?: string[];
    serviceIds?: string[];
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: PrivateExcursionUpsertRequest;
    attractionIds?: string[];
    serviceIds?: string[];
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({ en: "", ru: "", de: "", fr: "" });

export function PrivateExcursionFormPanel({
  open,
  onClose,
  excursion,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: PrivateExcursionFormPanelProps) {
  const isEdit = Boolean(excursion);
  const detailQuery = usePrivateExcursionAllLanguagesQuery(
    isEdit && open ? excursion?.id : null
  );

  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [subtitle, setSubtitle] = useState<LocalizedText>(emptyLocalized());
  const [excursionType, setExcursionType] = useState<LocalizedText>(emptyLocalized());
  const [shortDescription, setShortDescription] = useState<LocalizedText>(emptyLocalized());
  const [fullProgram, setFullProgram] = useState<LocalizedText>(emptyLocalized());

  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [adultPriceUsd, setAdultPriceUsd] = useState(0);
  const [childPriceUsd, setChildPriceUsd] = useState(0);
  const [infantPriceUsd, setInfantPriceUsd] = useState(0);
  const [stars, setStars] = useState("5");
  const [maxAttractions, setMaxAttractions] = useState(3);
  const [durationHours, setDurationHours] = useState(5);
  const [videoUrl, setVideoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [selectedAttractions, setSelectedAttractions] = useState<Array<{ id: string; title: string }>>([]);
  const [selectedServices, setSelectedServices] = useState<Array<{ id: string; title: string }>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && excursion) {
      if (detailQuery.data) {
        setTitle(detailQuery.data.title || emptyLocalized());
        setSubtitle(detailQuery.data.subtitle || emptyLocalized());
        setExcursionType(detailQuery.data.excursionType || emptyLocalized());
        setShortDescription(detailQuery.data.shortDescription || emptyLocalized());
        setFullProgram(detailQuery.data.fullProgram || emptyLocalized());
        setSlug(detailQuery.data.slug || excursion.slug || "");
        setAdultPriceUsd(detailQuery.data.adultPriceUsd ?? 0);
        setChildPriceUsd(detailQuery.data.childPriceUsd ?? 0);
        setInfantPriceUsd(detailQuery.data.infantPriceUsd ?? 0);
        setStars(detailQuery.data.stars || "5");
        setMaxAttractions(detailQuery.data.maxAttractions ?? 3);
        setDurationHours(detailQuery.data.durationHours ?? 5);
        setVideoUrl(detailQuery.data.videoUrl || "");
        setIsFeatured(detailQuery.data.isFeatured ?? false);
        setIsActive(detailQuery.data.isActive ?? true);
        setSelectedAttractions(detailQuery.data.assignedAttractions || []);
        setSelectedServices(detailQuery.data.assignedServices || []);
      } else {
        setTitle({ en: excursion.title || "", ru: "", de: "", fr: "" });
        setSubtitle({ en: excursion.subtitle || "", ru: "", de: "", fr: "" });
        setExcursionType({ en: excursion.excursionType || "", ru: "", de: "", fr: "" });
        setShortDescription({ en: excursion.shortDescription || "", ru: "", de: "", fr: "" });
        setSlug(excursion.slug || "");
        setAdultPriceUsd(excursion.prices?.[0]?.adultPrice ?? 0);
        setChildPriceUsd(excursion.prices?.[0]?.childPrice ?? 0);
        setInfantPriceUsd(excursion.prices?.[0]?.infantPrice ?? 0);
        setStars(excursion.stars || "5");
        setMaxAttractions(excursion.maxAttractions ?? 3);
        setDurationHours(excursion.durationHours ?? 5);
        setIsFeatured(excursion.isFeatured ?? false);
      }
    } else if (!isEdit) {
      setTitle(emptyLocalized());
      setSubtitle(emptyLocalized());
      setExcursionType(emptyLocalized());
      setShortDescription(emptyLocalized());
      setFullProgram(emptyLocalized());
      setCategoryId("");
      setSlug("");
      setAdultPriceUsd(0);
      setChildPriceUsd(0);
      setInfantPriceUsd(0);
      setStars("5");
      setMaxAttractions(3);
      setDurationHours(5);
      setVideoUrl("");
      setIsFeatured(false);
      setIsActive(true);
      setSelectedAttractions([]);
      setSelectedServices([]);
      setErrors({});
    }
  }, [isEdit, excursion, detailQuery.data]);

  const handleTitleChange = (lang: LangCode, val: string) => {
    setTitle((prev) => ({ ...prev, [lang]: val }));
    if (lang === "en" && !isEdit && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    }
    if (errors[`title.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`title.${lang}`];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!title.en?.trim()) newErrors["title.en"] = "English title is required";
    if (!slug?.trim()) newErrors.slug = "Slug is required";
    if (!categoryId?.trim() && !isEdit) newErrors.categoryId = "Category selection is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in required fields.");
      return;
    }

    const body: PrivateExcursionUpsertRequest = {
      slug: slug.trim(),
      categoryId: categoryId.trim(),
      adultPriceUsd,
      childPriceUsd,
      infantPriceUsd,
      stars: stars.trim() || "5",
      maxAttractions,
      durationHours,
      videoUrl: videoUrl.trim(),
      isFeatured,
      isActive,
      title,
      subtitle,
      excursionType,
      shortDescription,
      fullProgram,
    };

    const attractionIds = selectedAttractions.map((a) => a.id);
    const serviceIds = selectedServices.map((s) => s.id);

    if (isEdit && excursion) {
      onSubmitUpdate({ id: excursion.id, body, attractionIds, serviceIds });
    } else {
      onSubmitCreate({ body, attractionIds, serviceIds });
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Private Excursion" : "New Private Excursion"}
      subtitle="Manage private excursion details, pricing, assigned attractions and extra services"
      widthClassName="max-w-2xl"
    >
      {detailQuery.isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <FiLoader className="h-7 w-7 animate-spin text-[#0E4A68]" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 pb-8">
          <PrivateExcursionSpecsPricing
            categoryId={categoryId}
            slug={slug}
            adultPriceUsd={adultPriceUsd}
            childPriceUsd={childPriceUsd}
            infantPriceUsd={infantPriceUsd}
            stars={stars}
            maxAttractions={maxAttractions}
            durationHours={durationHours}
            videoUrl={videoUrl}
            isFeatured={isFeatured}
            isActive={isActive}
            errors={errors}
            onCategoryIdChange={setCategoryId}
            onSlugChange={setSlug}
            onAdultPriceChange={setAdultPriceUsd}
            onChildPriceChange={setChildPriceUsd}
            onInfantPriceChange={setInfantPriceUsd}
            onStarsChange={setStars}
            onMaxAttractionsChange={setMaxAttractions}
            onDurationHoursChange={setDurationHours}
            onVideoUrlChange={setVideoUrl}
            onIsFeaturedChange={setIsFeatured}
            onIsActiveChange={setIsActive}
          />

          <PrivateExcursionAttractionPicker
            selectedAttractions={selectedAttractions}
            maxAttractions={maxAttractions}
            onAddAttraction={(attr) => setSelectedAttractions((prev) => [...prev, attr])}
            onRemoveAttraction={(id) => setSelectedAttractions((prev) => prev.filter((a) => a.id !== id))}
          />

          <PrivateExcursionServicePicker
            selectedServices={selectedServices}
            onAddService={(serv) => setSelectedServices((prev) => [...prev, serv])}
            onRemoveService={(id) => setSelectedServices((prev) => prev.filter((s) => s.id !== id))}
          />

          <PrivateExcursionLocalizedFields
            title={title}
            subtitle={subtitle}
            excursionType={excursionType}
            shortDescription={shortDescription}
            fullProgram={fullProgram}
            errors={errors}
            onTitleChange={handleTitleChange}
            onSubtitleChange={(lang, val) => setSubtitle((prev) => ({ ...prev, [lang]: val }))}
            onExcursionTypeChange={(lang, val) => setExcursionType((prev) => ({ ...prev, [lang]: val }))}
            onShortDescriptionChange={(lang, val) => setShortDescription((prev) => ({ ...prev, [lang]: val }))}
            onFullProgramChange={(lang, val) => setFullProgram((prev) => ({ ...prev, [lang]: val }))}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] shadow-sm hover:bg-[#0A374E] cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create Excursion"}
            </button>
          </div>
        </form>
      )}
    </SlidePanel>
  );
}
