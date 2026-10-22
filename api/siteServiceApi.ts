import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  PagedSiteServicesResult,
  SiteServiceItem,
  SiteServiceLocalizedDetail,
  SiteServiceQueryParams,
  SiteServiceUpsertRequest,
} from "@/models/siteService";

/**
 * Fetches paginated site services with optional search and pagination.
 */
export async function getSiteServices(
  params: SiteServiceQueryParams = {}
): Promise<ApiResponse<PagedSiteServicesResult>> {
  const queryParams: Record<string, string | number> = {};

  if (params.search?.trim()) queryParams.search = params.search.trim();

  const lang = params.lang || "en";
  queryParams.lang = lang;
  queryParams.language = lang;

  const page = params.pageNumber ?? 1;
  const pageSize = params.pageSize ?? 10;
  queryParams.pageNumber = page;
  queryParams.pageSize = pageSize;

  const { data } = await apiClient.get<ApiResponse<PagedSiteServicesResult>>(
    "/services/services",
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
 * Fetches a single site service by ID in a specific language.
 */
export async function getSiteServiceById(
  id: string,
  lang: string = "en"
): Promise<ApiResponse<SiteServiceItem>> {
  const { data } = await apiClient.get<ApiResponse<SiteServiceItem>>(
    `/services/services/${id}`,
    {
      params: { lang, language: lang },
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

/**
 * Creates a new site service with localized title and description.
 */
export async function createSiteService(
  body: SiteServiceUpsertRequest
): Promise<ApiResponse<SiteServiceItem>> {
  const { data } = await apiClient.post<ApiResponse<SiteServiceItem>>(
    "/services/services",
    body
  );
  return data;
}

/**
 * Updates an existing site service by ID.
 */
export async function updateSiteService(
  id: string,
  body: SiteServiceUpsertRequest
): Promise<ApiResponse<SiteServiceItem>> {
  const { data } = await apiClient.put<ApiResponse<SiteServiceItem>>(
    `/services/services/${id}`,
    body
  );
  return data;
}

/**
 * Permanently deletes a site service by ID.
 */
export async function deleteSiteService(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/services/services/${id}`
  );
  return data;
}

/**
 * Uploads a cover image for a site service.
 */
export async function uploadSiteServiceImage(
  id: string,
  file: File
): Promise<ApiResponse<SiteServiceItem>> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ApiResponse<SiteServiceItem>>(
    `/services/services/${id}/image`,
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
 * Deletes the cover image from a site service.
 */
export async function deleteSiteServiceImage(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/services/services/${id}/image`
  );
  return data;
}

/**
 * Queries all supported languages in parallel to reconstruct full localized title and description for editing.
 */
export async function getSiteServiceAllLanguages(
  id: string
): Promise<SiteServiceLocalizedDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const res = await getSiteServiceById(id, lang);
      return { lang, data: res.data };
    })
  );

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const description: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: SiteServiceItem | null = null;

  for (const r of results) {
    if (r.status === "fulfilled" && r.value.data) {
      title[r.value.lang] = r.value.data.title || "";
      description[r.value.lang] = r.value.data.description || "";
      if (!baseItem) baseItem = r.value.data;
    }
  }

  return {
    id,
    imageUrl: baseItem?.imageUrl ?? null,
    isActive: baseItem?.isActive ?? true,
    title,
    description,
    createdAt: baseItem?.createdAt ?? new Date().toISOString(),
  };
}
