import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  PagedSiteServiceSubItemsResult,
  SiteServiceItemImage,
  SiteServiceOptionUpsert,
  SiteServiceFeatureUpsert,
  SiteServiceSubItem,
  SiteServiceSubItemLocalizedDetail,
  SiteServiceSubItemQueryParams,
  SiteServiceSubItemUpsertRequest,
} from "@/models/siteServiceItem";

/**
 * Fetches paginated site service sub-items with optional filters.
 */
export async function getSiteServiceSubItems(
  params: SiteServiceSubItemQueryParams = {}
): Promise<ApiResponse<PagedSiteServiceSubItemsResult>> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.serviceId?.trim()) queryParams.serviceId = params.serviceId.trim();
  if (params.search?.trim()) queryParams.search = params.search.trim();
  if (typeof params.isActive === "boolean") queryParams.isActive = params.isActive;
  if (params.currency?.trim()) queryParams.currency = params.currency.trim();

  const lang = params.lang || "en";
  const page = params.pageNumber ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.pageNumber = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ApiResponse<PagedSiteServiceSubItemsResult>>(
    "/services/subservices",
    {
      params: queryParams,
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

/**
 * Fetches a single site service sub-item by ID in a specific language.
 */
export async function getSiteServiceSubItemById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<SiteServiceSubItem>> {
  const { data } = await apiClient.get<ApiResponse<SiteServiceSubItem>>(
    `/services/subservices/${id}`,
    {
      params: { currency },
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

/**
 * Creates a new site service sub-item with nested localized options and features.
 */
export async function createSiteServiceSubItem(
  body: SiteServiceSubItemUpsertRequest
): Promise<ApiResponse<SiteServiceSubItem>> {
  const { data } = await apiClient.post<ApiResponse<SiteServiceSubItem>>(
    "/services/subservices",
    body
  );
  return data;
}

/**
 * Updates an existing site service sub-item by ID.
 */
export async function updateSiteServiceSubItem(
  id: string,
  body: SiteServiceSubItemUpsertRequest
): Promise<ApiResponse<SiteServiceSubItem>> {
  const { data } = await apiClient.put<ApiResponse<SiteServiceSubItem>>(
    `/services/subservices/${id}`,
    body
  );
  return data;
}

/**
 * Permanently deletes a site service sub-item by ID.
 */
export async function deleteSiteServiceSubItem(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/services/subservices/${id}`
  );
  return data;
}

/**
 * Uploads multiple gallery images for a site service sub-item.
 */
export async function uploadSiteServiceItemImages(
  id: string,
  files: File[]
): Promise<ApiResponse<SiteServiceItemImage[]>> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const { data } = await apiClient.post<ApiResponse<SiteServiceItemImage[]>>(
    `/services/subservices/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

/**
 * Deletes a single gallery image from a site service sub-item.
 */
export async function deleteSiteServiceItemImage(
  imageId: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/services/subservices/images/${imageId}`
  );
  return data;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

/**
 * Queries all supported languages in parallel to reconstruct full localized strings, options, and features for editing.
 */
export async function getSiteServiceSubItemAllLanguages(
  id: string
): Promise<SiteServiceSubItemLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const res = await getSiteServiceSubItemById(id, lang);
      return { lang, data: res.data };
    })
  );

  const title: LocalizedText = emptyLocalized();
  const subtitle: LocalizedText = emptyLocalized();
  const description: LocalizedText = emptyLocalized();
  const textTopImage: LocalizedText = emptyLocalized();
  const note: LocalizedText = emptyLocalized();
  const alert: LocalizedText = emptyLocalized();

  let baseItem: SiteServiceSubItem | null = null;
  const langMap = new Map<LangCode, SiteServiceSubItem>();

  for (const r of results) {
    if (r.status === "fulfilled" && r.value.data) {
      const { lang, data } = r.value;
      langMap.set(lang, data);
      title[lang] = data.title || "";
      subtitle[lang] = data.subtitle || "";
      description[lang] = data.description || "";
      textTopImage[lang] = data.textTopImage || "";
      note[lang] = data.note || "";
      alert[lang] = data.alert || "";
      if (!baseItem) baseItem = data;
    }
  }

  // Reconcile nested Options
  const baseOptions = baseItem?.options || [];
  const reconstructedOptions: SiteServiceOptionUpsert[] = baseOptions.map(
    (opt, optIdx) => {
      const optName: LocalizedText = emptyLocalized();
      LANGS.forEach((l) => {
        const itemInLang = langMap.get(l);
        const match =
          itemInLang?.options?.find((o) => o.id === opt.id) ||
          itemInLang?.options?.[optIdx];
        optName[l] = match?.name || "";
      });

      const values = (opt.values || []).map((v, valIdx) => {
        const valKey: LocalizedText = emptyLocalized();
        const valValue: LocalizedText = emptyLocalized();

        LANGS.forEach((l) => {
          const itemInLang = langMap.get(l);
          const optMatch =
            itemInLang?.options?.find((o) => o.id === opt.id) ||
            itemInLang?.options?.[optIdx];
          const valMatch =
            optMatch?.values?.find((vItem) => vItem.id === v.id) ||
            optMatch?.values?.[valIdx];
          valKey[l] = valMatch?.key || "";
          valValue[l] = valMatch?.value || "";
        });

        return {
          id: v.id,
          key: valKey,
          value: valValue,
        };
      });

      return {
        id: opt.id,
        name: optName,
        values,
      };
    }
  );

  // Reconcile nested Features
  const baseFeatures = baseItem?.features || [];
  const reconstructedFeatures: SiteServiceFeatureUpsert[] = baseFeatures.map(
    (feat, featIdx) => {
      const featName: LocalizedText = emptyLocalized();
      LANGS.forEach((l) => {
        const itemInLang = langMap.get(l);
        const match =
          itemInLang?.features?.find((f) => f.id === feat.id) ||
          itemInLang?.features?.[featIdx];
        featName[l] = match?.name || "";
      });

      const values = (feat.values || []).map((v, valIdx) => {
        const valName: LocalizedText = emptyLocalized();

        LANGS.forEach((l) => {
          const itemInLang = langMap.get(l);
          const featMatch =
            itemInLang?.features?.find((f) => f.id === feat.id) ||
            itemInLang?.features?.[featIdx];
          const valMatch =
            featMatch?.values?.find((vItem) => vItem.id === v.id) ||
            featMatch?.values?.[valIdx];
          valName[l] = valMatch?.name || "";
        });

        return {
          id: v.id,
          name: valName,
        };
      });

      return {
        id: feat.id,
        name: featName,
        values,
      };
    }
  );

  return {
    id,
    serviceId: baseItem?.serviceId || "",
    title,
    subtitle,
    description,
    textTopImage,
    note,
    alert,
    basePriceUSD: baseItem?.basePriceUSD ?? 0,
    isActive: baseItem?.isActive ?? true,
    images: baseItem?.images || [],
    options: reconstructedOptions,
    features: reconstructedFeatures,
    createdAt: baseItem?.createdAt ?? new Date().toISOString(),
  };
}
