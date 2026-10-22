import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  CountryItem,
  CountryLocalizedDetail,
  CountryUpsertRequest,
} from "@/models/country";

/**
 * Public endpoint to fetch all countries for a given language.
 * Anyone on the platform can call this without authentication.
 */
export async function getCountries(
  lang: string = "en"
): Promise<CountryItem[]> {
  const { data } = await apiClient.get<CountryItem[] | { data: CountryItem[] }>(
    "/countries",
    {
      params: { lang },
    }
  );

  // Safely normalize whether backend returns a raw array or ApiResponse wrapper
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray((data as { data: CountryItem[] }).data)) {
    return (data as { data: CountryItem[] }).data;
  }
  return [];
}

/**
 * Admin endpoint to create a new country with localized names.
 */
export async function createCountry(
  body: CountryUpsertRequest
): Promise<CountryItem> {
  const { data } = await apiClient.post<CountryItem | { data: CountryItem }>(
    "/admin/countries",
    body
  );
  if (data && "data" in data && (data as { data: CountryItem }).data) {
    return (data as { data: CountryItem }).data;
  }
  return data as CountryItem;
}

/**
 * Admin endpoint to update an existing country.
 */
export async function updateCountry(
  id: string,
  body: CountryUpsertRequest
): Promise<CountryItem> {
  const { data } = await apiClient.put<CountryItem | { data: CountryItem }>(
    `/admin/countries/${id}`,
    body
  );
  if (data && "data" in data && (data as { data: CountryItem }).data) {
    return (data as { data: CountryItem }).data;
  }
  return data as CountryItem;
}

/**
 * Admin endpoint to permanently delete a country by ID.
 */
export async function deleteCountry(id: string): Promise<boolean> {
  await apiClient.delete(`/admin/countries/${id}`);
  return true;
}

/**
 * Reconstructs a country's localized names across all 4 languages
 * by fetching them in parallel. Used when opening the edit panel.
 */
export async function getCountryAllLanguages(
  id: string
): Promise<CountryLocalizedDetail | null> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang) => {
      const list = await getCountries(lang);
      const found = list.find((c) => c.id === id);
      return { lang, item: found };
    })
  );

  let baseItem: CountryItem | null = null;
  const localizedName: LocalizedText = {
    en: "",
    ru: "",
    de: "",
    fr: "",
  };

  for (const res of results) {
    if (res.status === "fulfilled" && res.value.item) {
      const { lang, item } = res.value;
      if (!baseItem) baseItem = item;
      localizedName[lang as LangCode] = item.name || "";
    }
  }

  if (!baseItem) return null;

  // Fallback missing translations to English if available
  const fallback = localizedName.en || baseItem.name;
  for (const lang of LANGS) {
    if (!localizedName[lang]) {
      localizedName[lang] = fallback;
    }
  }

  return {
    id: baseItem.id,
    code: baseItem.code,
    phoneCode: baseItem.phoneCode,
    name: localizedName,
  };
}
