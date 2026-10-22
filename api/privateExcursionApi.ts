import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  PagedPrivateExcursionsResult,
  PrivateExcursionAllLanguagesDetail,
  PrivateExcursionDetail,
  PrivateExcursionQueryParams,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";

/**
 * Fetches paginated private excursions with optional category filter, language, and currency.
 */
export async function getPrivateExcursions(
  params: PrivateExcursionQueryParams = {}
): Promise<PagedPrivateExcursionsResult> {
  const queryParams: Record<string, string | number> = {
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 10,
    lang: params.lang || "en",
    currency: params.currency || "USD",
  };
  if (params.categoryId?.trim()) {
    queryParams.categoryId = params.categoryId.trim();
  }

  const { data } = await apiClient.get<PagedPrivateExcursionsResult>(
    "/private-excursions",
    { params: queryParams }
  );
  return data;
}

/**
 * Fetches a single private excursion by ID.
 */
export async function getPrivateExcursionById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<PrivateExcursionDetail> {
  const { data } = await apiClient.get<{ success: boolean; data: PrivateExcursionDetail }>(
    `/private-excursions/${id}`,
    { params: { lang, currency } }
  );
  return data.data;
}

/**
 * Fetches all 4 languages in parallel to reconstruct multi-language form values for editing.
 */
export async function getPrivateExcursionAllLanguages(
  id: string
): Promise<PrivateExcursionAllLanguagesDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const item = await getPrivateExcursionById(id, lang, "USD");
      return { lang, item };
    })
  );

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const subtitle: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const excursionType: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const shortDescription: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const fullProgram: LocalizedText = { en: "", ru: "", de: "", fr: "" };

  let baseItem: PrivateExcursionDetail | null = null;

  for (const res of results) {
    if (res.status === "fulfilled") {
      const { lang, item } = res.value;
      if (!baseItem || lang === "en") baseItem = item;
      if (item.title) title[lang] = item.title;
      if (item.subtitle) subtitle[lang] = item.subtitle;
      if (item.excursionType) excursionType[lang] = item.excursionType;
      if (item.shortDescription) shortDescription[lang] = item.shortDescription;
      if (item.fullProgram) fullProgram[lang] = item.fullProgram;
    }
  }

  // Also query assigned attractions and services
  let assignedAttractions: Array<{ id: string; title: string }> = [];
  let assignedServices: Array<{ id: string; title: string }> = [];

  try {
    const attrRes = await getPrivateExcursionAttractions(id);
    assignedAttractions = attrRes.map((a) => ({ id: a.id, title: a.title }));
  } catch {
    // fallback to empty if endpoint fails
  }

  try {
    const servRes = await getPrivateExcursionServices(id);
    assignedServices = servRes.map((s) => ({ id: s.id, title: s.title }));
  } catch {
    // fallback to empty if endpoint fails
  }

  const adultPrice = baseItem?.prices?.[0]?.adultPrice ?? 0;
  const childPrice = baseItem?.prices?.[0]?.childPrice ?? 0;
  const infantPrice = baseItem?.prices?.[0]?.infantPrice ?? 0;

  return {
    id,
    slug: baseItem?.slug ?? "",
    categoryId: "",
    adultPriceUsd: adultPrice,
    childPriceUsd: childPrice,
    infantPriceUsd: infantPrice,
    stars: baseItem?.stars ?? "5",
    maxAttractions: baseItem?.maxAttractions ?? 3,
    durationHours: baseItem?.durationHours ?? 5,
    videoUrl: baseItem?.videoUrl ?? "",
    isFeatured: baseItem?.isFeatured ?? false,
    isActive: true,
    title,
    subtitle,
    excursionType,
    shortDescription,
    fullProgram,
    assignedAttractions,
    assignedServices,
  };
}

/**
 * Creates a new private excursion.
 */
export async function createPrivateExcursion(
  body: PrivateExcursionUpsertRequest,
  lang: string = "en"
): Promise<{ success: boolean; data: PrivateExcursionDetail }> {
  const { data } = await apiClient.post<{ success: boolean; data: PrivateExcursionDetail }>(
    "/private-excursions",
    body,
    { params: { lang } }
  );
  return data;
}

/**
 * Updates an existing private excursion.
 */
export async function updatePrivateExcursion(
  id: string,
  body: PrivateExcursionUpsertRequest,
  lang: string = "en"
): Promise<{ success: boolean; data: PrivateExcursionDetail }> {
  const { data } = await apiClient.put<{ success: boolean; data: PrivateExcursionDetail }>(
    `/private-excursions/${id}`,
    body,
    { params: { lang } }
  );
  return data;
}

/**
 * Deletes a private excursion.
 */
export async function deletePrivateExcursion(id: string): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}`);
}

/**
 * Gets attractions assigned to a private excursion.
 */
export async function getPrivateExcursionAttractions(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<Array<{ id: string; title: string; description: string; heroImage: string | null }>> {
  const { data } = await apiClient.get<{
    success: boolean;
    data: Array<{ id: string; title: string; description: string; heroImage: string | null }>;
  }>(`/private-excursions/${id}/attractions`, { params: { lang, currency } });
  return data.data ?? [];
}

/**
 * Assigns attractions to a private excursion.
 */
export async function assignPrivateExcursionAttractions(
  id: string,
  attractionIds: string[]
): Promise<void> {
  await apiClient.post(`/private-excursions/${id}/attractions`, { attractionIds });
}

/**
 * Removes an attraction from a private excursion.
 */
export async function removePrivateExcursionAttraction(
  id: string,
  attractionId: string
): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}/attractions/${attractionId}`);
}

/**
 * Gets excursion services assigned to a private excursion.
 */
export async function getPrivateExcursionServices(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<Array<{ id: string; title: string; description: string; heroImage: string | null }>> {
  const { data } = await apiClient.get<{
    success: boolean;
    data: Array<{ id: string; title: string; description: string; heroImage: string | null }>;
  }>(`/private-excursions/${id}/services`, { params: { lang, currency } });
  return data.data ?? [];
}

/**
 * Assigns excursion services to a private excursion.
 */
export async function assignPrivateExcursionServices(
  id: string,
  serviceIds: string[]
): Promise<void> {
  await apiClient.post(`/private-excursions/${id}/services`, { serviceIds });
}

/**
 * Removes an excursion service from a private excursion.
 */
export async function removePrivateExcursionService(
  id: string,
  serviceId: string
): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}/services/${serviceId}`);
}
