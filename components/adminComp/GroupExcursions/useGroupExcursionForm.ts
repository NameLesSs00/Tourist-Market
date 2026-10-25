"use client";

import { useEffect, useState } from "react";
import type { LangCode, LocalizedText } from "@/models/localization";
import type {
  GroupExcursionAllLanguagesDetail,
  GroupExcursionCreateRequest,
  GroupExcursionListItem,
  GroupExcursionUpdateRequest,
} from "@/models/groupExcursion";

interface UseGroupExcursionFormOptions {
  isEdit: boolean;
  excursion?: GroupExcursionListItem | null;
  detailData?: GroupExcursionAllLanguagesDetail;
  onSubmitCreate: (body: GroupExcursionCreateRequest) => void;
  onSubmitUpdate: (data: { id: string; body: GroupExcursionUpdateRequest }) => void;
}

const emptyLoc = (): LocalizedText => ({ en: "", ru: "", de: "", fr: "" });

export function useGroupExcursionForm({
  isEdit,
  excursion,
  detailData,
  onSubmitCreate,
  onSubmitUpdate,
}: UseGroupExcursionFormOptions) {
  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [adultPriceUsd, setAdultPriceUsd] = useState(0);
  const [childPriceUsd, setChildPriceUsd] = useState(0);
  const [infantPriceUsd, setInfantPriceUsd] = useState(0);
  const [stars, setStars] = useState("5");
  const [durationHours, setDurationHours] = useState(8);
  const [videoUrl, setVideoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [title, setTitle] = useState<LocalizedText>(emptyLoc());
  const [subtitle, setSubtitle] = useState<LocalizedText>(emptyLoc());
  const [excursionType, setExcursionType] = useState<LocalizedText>(emptyLoc());
  const [shortDescription, setShortDescription] = useState<LocalizedText>(emptyLoc());
  const [fullProgram, setFullProgram] = useState<LocalizedText>(emptyLoc());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && excursion) {
      setSlug(excursion.slug || "");
      const catId = excursion.category?.id || excursion.categoryId || "";
      if (catId) setCategoryId(catId);
      if (excursion.excursionType) {
        setExcursionType((p) => ({ ...p, en: p.en || excursion.excursionType }));
      }
      setAdultPriceUsd(excursion.price?.adultPrice ?? 0);
      setChildPriceUsd(excursion.price?.childPrice ?? 0);
      setInfantPriceUsd(excursion.price?.infantPrice ?? 0);
      setStars(excursion.stars || "5");
      setDurationHours(excursion.durationHours || 0);
      setIsFeatured(Boolean(excursion.isFeatured));
      setIsActive(true);
    }
  }, [isEdit, excursion]);

  useEffect(() => {
    if (detailData) {
      if (detailData.title) setTitle(detailData.title);
      if (detailData.subtitle) setSubtitle(detailData.subtitle);
      if (detailData.excursionType) setExcursionType(detailData.excursionType);
      if (detailData.shortDescription) setShortDescription(detailData.shortDescription);
      if (detailData.fullProgram) setFullProgram(detailData.fullProgram);

      const base = detailData.base;
      const catId = detailData.categoryId || base?.category?.id || base?.categoryId || "";
      if (catId) setCategoryId(catId);

      if (base) {
        setSlug(base.slug || "");
        setVideoUrl(base.videoUrl || "");
        setDurationHours(base.durationHours || 0);
        setStars(base.stars || "5");
        setIsFeatured(Boolean(base.isFeatured));
        if (base.price) {
          setAdultPriceUsd(base.price.adultPrice ?? 0);
          setChildPriceUsd(base.price.childPrice ?? 0);
          setInfantPriceUsd(base.price.infantPrice ?? 0);
        }
      }
    }
  }, [detailData]);

  const handleTitleChange = (lang: LangCode, val: string) => {
    setTitle((prev) => ({ ...prev, [lang]: val }));
    if (lang === "en" && !isEdit && !isSlugManual) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.en?.trim()) errs["title.en"] = "English Title is required.";
    if (!categoryId.trim()) errs.categoryId = "Category is required.";
    if (!slug.trim()) errs.slug = "Slug is required.";
    if (adultPriceUsd <= 0) errs.adultPriceUsd = "Adult price must be greater than 0.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit && excursion) {
      onSubmitUpdate({
        id: excursion.id,
        body: {
          slug: slug.trim(),
          categoryId,
          excursionType: excursionType.en || "",
          adultPriceUsd,
          childPriceUsd,
          infantPriceUsd,
          stars,
          maxAttractions: 0,
          durationHours,
          videoUrl: videoUrl.trim(),
          isFeatured,
          isActive,
          translations: { title, subtitle, excursionType, shortDescription, fullProgram },
        },
      });
    } else {
      onSubmitCreate({
        slug: slug.trim(),
        categoryId,
        adultPriceUsd,
        childPriceUsd,
        infantPriceUsd,
        stars,
        durationHours,
        videoUrl: videoUrl.trim(),
        isFeatured,
        isActive,
        title,
        subtitle,
        excursionType,
        shortDescription,
        fullProgram,
      });
    }
  };

  return {
    categoryId,
    slug,
    adultPriceUsd,
    childPriceUsd,
    infantPriceUsd,
    stars,
    durationHours,
    videoUrl,
    isFeatured,
    isActive,
    title,
    subtitle,
    excursionType,
    shortDescription,
    fullProgram,
    errors,
    setCategoryId,
    setSlug: (val: string) => { setIsSlugManual(true); setSlug(val); },
    setAdultPriceUsd,
    setChildPriceUsd,
    setInfantPriceUsd,
    setStars,
    setDurationHours,
    setVideoUrl,
    setIsFeatured,
    setIsActive,
    handleTitleChange,
    setSubtitle: (l: LangCode, v: string) => setSubtitle((p) => ({ ...p, [l]: v })),
    setExcursionType: (l: LangCode, v: string) => setExcursionType((p) => ({ ...p, [l]: v })),
    setShortDescription: (l: LangCode, v: string) => setShortDescription((p) => ({ ...p, [l]: v })),
    setFullProgram: (l: LangCode, v: string) => setFullProgram((p) => ({ ...p, [l]: v })),
    handleSubmit,
  };
}

export default useGroupExcursionForm;
