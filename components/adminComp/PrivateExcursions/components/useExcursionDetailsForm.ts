import { useEffect, useState } from "react";
import { LANGS, type LangCode } from "@/models/localization";
import type {
  ExcursionDetailsAllLanguages,
  ExcursionDetailsUpsertRequest,
  KeyValuePair,
  LocalizedArray,
  LocalizedKeyValueArray,
} from "@/models/excursionDetails";

const createEmptyLocalizedArray = (): LocalizedArray => ({
  en: [],
  ru: [],
  de: [],
  fr: [],
});

const createEmptyLocalizedKeyValueArray = (): LocalizedKeyValueArray => ({
  en: [],
  ru: [],
  de: [],
  fr: [],
});

interface UseExcursionDetailsFormProps {
  excursionId: string;
  detailData?: ExcursionDetailsAllLanguages | null;
  onSubmit: (body: ExcursionDetailsUpsertRequest) => void;
}

export function useExcursionDetailsForm({
  excursionId,
  detailData,
  onSubmit,
}: UseExcursionDetailsFormProps) {
  const [activeLang, setActiveLang] = useState<LangCode>("en");

  const [highlights, setHighlights] = useState<LocalizedArray>(createEmptyLocalizedArray);
  const [includes, setIncludes] = useState<LocalizedArray>(createEmptyLocalizedArray);
  const [excludes, setExcludes] = useState<LocalizedArray>(createEmptyLocalizedArray);
  const [whatToBring, setWhatToBring] = useState<LocalizedArray>(createEmptyLocalizedArray);
  const [cancellationPolicy, setCancellationPolicy] = useState<LocalizedArray>(createEmptyLocalizedArray);
  const [literally, setLiterally] = useState<LocalizedKeyValueArray>(createEmptyLocalizedKeyValueArray);

  useEffect(() => {
    if (detailData) {
      setHighlights(detailData.highlights ?? createEmptyLocalizedArray());
      setIncludes(detailData.includes ?? createEmptyLocalizedArray());
      setExcludes(detailData.excludes ?? createEmptyLocalizedArray());
      setWhatToBring(detailData.whatToBring ?? createEmptyLocalizedArray());
      setCancellationPolicy(detailData.cancellationPolicy ?? createEmptyLocalizedArray());
      setLiterally(detailData.literally ?? createEmptyLocalizedKeyValueArray());
    } else {
      setHighlights(createEmptyLocalizedArray());
      setIncludes(createEmptyLocalizedArray());
      setExcludes(createEmptyLocalizedArray());
      setWhatToBring(createEmptyLocalizedArray());
      setCancellationPolicy(createEmptyLocalizedArray());
      setLiterally(createEmptyLocalizedKeyValueArray());
    }
  }, [detailData, excursionId]);

  const addListItem = (
    field: "highlights" | "includes" | "excludes" | "whatToBring" | "cancellationPolicy",
    text: string
  ) => {
    const val = text.trim();
    if (!val) return;
    const setters = {
      highlights: setHighlights,
      includes: setIncludes,
      excludes: setExcludes,
      whatToBring: setWhatToBring,
      cancellationPolicy: setCancellationPolicy,
    };
    setters[field]((prev) => ({
      ...prev,
      [activeLang]: [...(prev[activeLang] || []), val],
    }));
  };

  const removeListItem = (
    field: "highlights" | "includes" | "excludes" | "whatToBring" | "cancellationPolicy",
    index: number
  ) => {
    const setters = {
      highlights: setHighlights,
      includes: setIncludes,
      excludes: setExcludes,
      whatToBring: setWhatToBring,
      cancellationPolicy: setCancellationPolicy,
    };
    setters[field]((prev) => ({
      ...prev,
      [activeLang]: (prev[activeLang] || []).filter((_, i) => i !== index),
    }));
  };

  const addLiterallyItem = (key: string, value: string) => {
    setLiterally((prev) => ({
      ...prev,
      [activeLang]: [...(prev[activeLang] || []), { key: key.trim(), value: value.trim() }],
    }));
  };

  const updateLiterallyItem = (index: number, key: string, value: string) => {
    setLiterally((prev) => {
      const list = [...(prev[activeLang] || [])];
      list[index] = { key, value };
      return { ...prev, [activeLang]: list };
    });
  };

  const removeLiterallyItem = (index: number) => {
    setLiterally((prev) => ({
      ...prev,
      [activeLang]: (prev[activeLang] || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fillMissingArray = (source: LocalizedArray): LocalizedArray => {
      const out = { ...source };
      const fallback = source.en || [];
      LANGS.forEach((l) => {
        if (!out[l] || out[l].length === 0) out[l] = fallback;
      });
      return out;
    };

    const fillMissingLiterally = (source: LocalizedKeyValueArray): LocalizedKeyValueArray => {
      const out = { ...source };
      const fallback = source.en || [];
      LANGS.forEach((l) => {
        if (!out[l] || out[l].length === 0) out[l] = fallback;
      });
      return out;
    };

    const payload: ExcursionDetailsUpsertRequest = {
      excursionId,
      highlights: fillMissingArray(highlights),
      includes: fillMissingArray(includes),
      excludes: fillMissingArray(excludes),
      whatToBring: fillMissingArray(whatToBring),
      cancellationPolicy: fillMissingArray(cancellationPolicy),
      literally: fillMissingLiterally(literally),
    };

    onSubmit(payload);
  };

  return {
    activeLang,
    setActiveLang,
    highlights: highlights[activeLang] || [],
    includes: includes[activeLang] || [],
    excludes: excludes[activeLang] || [],
    whatToBring: whatToBring[activeLang] || [],
    cancellationPolicy: cancellationPolicy[activeLang] || [],
    literally: literally[activeLang] || [],
    addListItem,
    removeListItem,
    addLiterallyItem,
    updateLiterallyItem,
    removeLiterallyItem,
    handleSubmit,
  };
}
