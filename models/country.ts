import type { LangCode, LocalizedText } from "./faq";

/**
 * A single country entity returned by GET /api/countries.
 */
export interface CountryItem {
  id: string; // GUID, hidden in UI
  code: string; // e.g. "EG", "US", "123"
  phoneCode: string; // e.g. "+20", "+1"
  name: string; // Localized name in the queried language
}

/**
 * Request payload for creating or updating a country.
 * Supports localized names in en, ru, de, fr.
 */
export interface CountryUpsertRequest {
  code: string;
  phoneCode: string;
  name: LocalizedText;
}

/**
 * Full localized country entity used during editing in the admin panel.
 */
export interface CountryLocalizedDetail {
  id: string;
  code: string;
  phoneCode: string;
  name: LocalizedText;
}
