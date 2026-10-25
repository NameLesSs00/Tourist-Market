"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { LangCode, LocalizedText } from "@/models/localization";
import type {
  PrivateExcursionAllLanguagesDetail,
  PrivateExcursionListItem,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";

interface UsePrivateExcursionFormProps {
  isEdit: boolean;
  excursion?: PrivateExcursionListItem | null;
  detailData?: PrivateExcursionAllLanguagesDetail | null;
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
    previousAttractionIds?: string[];
    previousServiceIds?: string[];
  }) => void;
}

const emptyLocalized = (): LocalizedText => ({ en: "", ru: "", de: "", fr: "" });

export function usePrivateExcursionForm({
  isEdit,
  excursion,
  detailData,
  onSubmitCreate,
  onSubmitUpdate,
}: UsePrivateExcursionFormProps) {
  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [subtitle, setSubtitle] = useState<LocalizedText>(emptyLocalized());
  const [excursionType, setExcursionType] = useState<LocalizedText>(emptyLocalized());
  const [shortDescription, setShortDescription] = useState<LocalizedText>(emptyLocalized());
  const [fullProgram, setFullProgram] = useState<LocalizedText>(emptyLocalized());
  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState("5");
  const [maxAttractions, setMaxAttractions] = useState(3);
  const [durationHours, setDurationHours] = useState(5);
  const [videoUrl, setVideoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedAttractions, setSelectedAttractions] = useState<Array<{ id: string; title: string }>>([]);
  const [selectedServices, setSelectedServices] = useState<Array<{ id: string; title: string }>>([]);
  const [initialAttractionIds, setInitialAttractionIds] = useState<string[]>([]);
  const [initialServiceIds, setInitialServiceIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && excursion) {
      const catId = detailData?.categoryId || (excursion as any)?.category?.id || (excursion as any)?.categoryId || "";
      if (catId) setCategoryId(catId);

      if (detailData) {
        setTitle(detailData.title || emptyLocalized());
        setSubtitle(detailData.subtitle || emptyLocalized());
        setExcursionType(detailData.excursionType || emptyLocalized());
        setShortDescription(detailData.shortDescription || emptyLocalized());
        setFullProgram(detailData.fullProgram || emptyLocalized());
        setSlug(detailData.slug || excursion.slug || "");
        setStars(detailData.stars || "5");
        setMaxAttractions(detailData.maxAttractions ?? 3);
        setDurationHours(detailData.durationHours ?? 5);
        setVideoUrl(detailData.videoUrl || "");
        setIsFeatured(detailData.isFeatured ?? false);
        setIsActive(detailData.isActive ?? true);
        const aList = detailData.assignedAttractions || [];
        const sList = detailData.assignedServices || [];
        setSelectedAttractions(aList);
        setSelectedServices(sList);
        setInitialAttractionIds(aList.map((a) => a.id));
        setInitialServiceIds(sList.map((s) => s.id));
      } else {
        setTitle({ en: excursion.title || "", ru: "", de: "", fr: "" });
        setSubtitle({ en: excursion.subtitle || "", ru: "", de: "", fr: "" });
        setExcursionType({ en: excursion.excursionType || "", ru: "", de: "", fr: "" });
        setShortDescription({ en: excursion.shortDescription || "", ru: "", de: "", fr: "" });
        setSlug(excursion.slug || "");
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
      setStars("5");
      setMaxAttractions(3);
      setDurationHours(5);
      setVideoUrl("");
      setIsFeatured(false);
      setIsActive(true);
      setSelectedAttractions([]);
      setSelectedServices([]);
      setInitialAttractionIds([]);
      setInitialServiceIds([]);
    }
  }, [isEdit, excursion, detailData]);

  const handleTitleChange = (lang: LangCode, value: string) => {
    setTitle((prev) => ({ ...prev, [lang]: value }));
    if (lang === "en" && !isEdit) {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
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
    if (!categoryId?.trim()) newErrors.categoryId = "Category selection is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in required fields.");
      return;
    }

    const body: PrivateExcursionUpsertRequest = {
      slug: slug.trim(), categoryId: categoryId.trim(), stars: stars.trim() || "5",
      maxAttractions, durationHours, videoUrl: videoUrl.trim(), isFeatured, isActive,
      title, subtitle, excursionType, shortDescription, fullProgram,
    };

    const attractionIds = selectedAttractions.map((a) => a.id);
    const serviceIds = selectedServices.map((s) => s.id);

    if (isEdit && excursion) {
      onSubmitUpdate({
        id: excursion.id, body, attractionIds, serviceIds,
        previousAttractionIds: initialAttractionIds, previousServiceIds: initialServiceIds,
      });
    } else {
      onSubmitCreate({ body, attractionIds, serviceIds });
    }
  };

  return {
    title, subtitle, excursionType, shortDescription, fullProgram, categoryId, slug,
    stars, maxAttractions, durationHours, videoUrl, isFeatured, isActive,
    selectedAttractions, selectedServices, errors, setCategoryId, setSlug, setStars,
    setMaxAttractions, setDurationHours, setVideoUrl, setIsFeatured, setIsActive,
    setSelectedAttractions, setSelectedServices, handleTitleChange,
    setSubtitle, setExcursionType, setShortDescription, setFullProgram, handleSubmit,
  };
}

export default usePrivateExcursionForm;
