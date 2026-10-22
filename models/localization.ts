// ---------------------------------------------------------------------------
// Localization & Multilingual Data Contracts
// ---------------------------------------------------------------------------

export type LangCode = "en" | "ru" | "de" | "fr";

export const LANGS: LangCode[] = ["en", "ru", "de", "fr"];

export const LANG_LABELS: Record<LangCode, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
};

export const LANG_FLAGS: Record<LangCode, string> = {
  en: "/flags/gb.svg",
  ru: "/flags/ru.svg",
  de: "/flags/de.svg",
  fr: "/flags/fr.svg",
};

export type LocalizedText = Record<LangCode, string>;
