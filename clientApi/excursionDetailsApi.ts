import { apiClient } from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode } from "@/models/localization";
import type {
  ExcursionDetailsAllLanguages,
  ExcursionDetailsDto,
  ExcursionDetailsUpsertRequest,
  KeyValuePair,
} from "@/models/excursionDetails";

export async function getExcursionDetails(
  excursionId: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<ApiResponse<ExcursionDetailsDto>> {
  const { data } = await apiClient.get<ApiResponse<ExcursionDetailsDto>>(
    `/excursions-details/excursion/${excursionId}`,
    { params: { lang, currency } }
  );
  return data;
}

export async function getExcursionDetailsAllLanguages(
  excursionId: string
): Promise<ExcursionDetailsAllLanguages> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const res = await getExcursionDetails(excursionId, lang, "USD");
      return { lang, item: res.data };
    })
  );

  let detailsId: string | undefined;
  let exists = false;

  const highlights = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, string[]>;
  const includes = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, string[]>;
  const excludes = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, string[]>;
  const whatToBring = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, string[]>;
  const cancellationPolicy = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, string[]>;
  const literally = { en: [], ru: [], de: [], fr: [] } as Record<LangCode, KeyValuePair[]>;

  results.forEach((r) => {
    if (r.status === "fulfilled" && r.value.item) {
      const { lang, item } = r.value;
      exists = true;
      if (item.id) detailsId = item.id;
      highlights[lang] = item.highlights || [];
      includes[lang] = item.includes || [];
      excludes[lang] = item.excludes || [];
      whatToBring[lang] = item.whatToBring || [];
      cancellationPolicy[lang] = item.cancellationPolicy || [];
      literally[lang] = item.literally || [];
    }
  });

  return {
    id: detailsId,
    excursionId,
    exists,
    highlights,
    includes,
    excludes,
    whatToBring,
    cancellationPolicy,
    literally,
  };
}

export async function createExcursionDetails(
  excursionId: string,
  body: ExcursionDetailsUpsertRequest,
  lang: string = "en"
): Promise<ApiResponse<ExcursionDetailsDto>> {
  const { data } = await apiClient.post<ApiResponse<ExcursionDetailsDto>>(
    `/excursions-details/excursion/${excursionId}`,
    body,
    { params: { lang } }
  );
  return data;
}

export async function updateExcursionDetails(
  excursionId: string,
  body: ExcursionDetailsUpsertRequest,
  lang: string = "en"
): Promise<ApiResponse<ExcursionDetailsDto>> {
  const { data } = await apiClient.put<ApiResponse<ExcursionDetailsDto>>(
    `/excursions-details/excursion/${excursionId}`,
    body,
    { params: { lang } }
  );
  return data;
}

export async function deleteExcursionDetails(
  excursionId: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/excursions-details/excursion/${excursionId}`
  );
  return data;
}
