import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  PagedPrivateExcursionsResult,
  PrivateExcursionAllLanguagesDetail,
  PrivateExcursionDetail,
  PrivateExcursionListResponse,
  PrivateExcursionQueryParams,
  PrivateExcursionUpsertRequest,
} from "@/models/privateExcursion";

export async function getPrivateExcursions(
  params: PrivateExcursionQueryParams = {}
): Promise<PagedPrivateExcursionsResult> {
  const queryParams: Record<string, string | number> = {
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 10,
    lang: params.lang || "en",
    currency: params.currency || "USD",
  };
  if (params.categoryId?.trim()) queryParams.categoryId = params.categoryId.trim();
  const { data } = await apiClient.get<PagedPrivateExcursionsResult>("/private-excursions", { params: queryParams });
  return data;
}

export async function getClientPrivateExcursions(
  params: PrivateExcursionQueryParams = {}
): Promise<PrivateExcursionListResponse> {
  const response = await getPrivateExcursions(params);
  return response.data;
}

export async function getPrivateExcursionById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<PrivateExcursionDetail> {
  const { data } = await apiClient.get<any>(`/private-excursions/${id}`, { params: { lang, currency } });
  return (data?.data ?? data) as PrivateExcursionDetail;
}

export async function getPrivateExcursionAttractions(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<Array<{ id: string; title: string; description?: string; heroImage?: string | null }>> {
  const { data } = await apiClient.get<any>(`/private-excursions/${id}/attractions`, { params: { lang, currency } });
  return Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
}

export async function assignPrivateExcursionAttractions(id: string, attractionIds: string[]): Promise<void> {
  await apiClient.post(`/private-excursions/${id}/attractions`, { attractionIds });
}

export async function removePrivateExcursionAttraction(id: string, attractionId: string): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}/attractions/${attractionId}`);
}

export async function getPrivateExcursionServices(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<Array<{ id: string; title: string; description?: string; heroImage?: string | null }>> {
  const { data } = await apiClient.get<any>(`/private-excursions/${id}/services`, { params: { lang, currency } });
  return Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
}

export async function assignPrivateExcursionServices(id: string, serviceIds: string[]): Promise<void> {
  await apiClient.post(`/private-excursions/${id}/services`, { serviceIds });
}

export async function removePrivateExcursionService(id: string, serviceId: string): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}/services/${serviceId}`);
}

export async function getPrivateExcursionAllLanguages(id: string): Promise<PrivateExcursionAllLanguagesDetail> {
  const [localizedResults, rawAttractions, rawServices] = await Promise.all([
    Promise.allSettled(
      LANGS.map(async (lang: LangCode) => {
        const item = await getPrivateExcursionById(id, lang, "USD");
        return { lang, item };
      })
    ),
    getPrivateExcursionAttractions(id).catch(() => []),
    getPrivateExcursionServices(id).catch(() => []),
  ]);

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const subtitle: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const excursionType: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const shortDescription: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const fullProgram: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: PrivateExcursionDetail | null = null;

  for (const res of localizedResults) {
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

  const assignedAttractions = (
    rawAttractions && rawAttractions.length > 0
      ? rawAttractions
      : Array.isArray(baseItem?.attractions)
      ? baseItem.attractions
      : []
  ).map((a: any) => ({
    id: a.id,
    title: a.title || a.name || "",
  }));
  const assignedServices = (
    rawServices && rawServices.length > 0
      ? rawServices
      : Array.isArray(baseItem?.services)
      ? baseItem.services
      : []
  ).map((s: any) => ({
    id: s.id,
    title: s.title || s.name || "",
  }));

  const categoryId =
    (baseItem as any)?.category?.id ||
    (baseItem as any)?.categoryId ||
    (baseItem as any)?.categorySlug ||
    "";

  return {
    id,
    slug: baseItem?.slug ?? "",
    categoryId,
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

export async function createPrivateExcursion(
  body: PrivateExcursionUpsertRequest,
  lang: string = "en"
): Promise<{ success: boolean; data: PrivateExcursionDetail }> {
  const payload = {
    ...body,
    excursionType: typeof body.excursionType === "string" ? body.excursionType : body.excursionType?.en || "",
  };
  const { data } = await apiClient.post<any>("/private-excursions", payload, { params: { lang } });
  return data?.data ? data : { success: true, data };
}

export async function updatePrivateExcursion(
  id: string,
  body: PrivateExcursionUpsertRequest,
  lang: string = "en"
): Promise<{ success: boolean; data: PrivateExcursionDetail }> {
  const payload = {
    ...body,
    excursionType: typeof body.excursionType === "string" ? body.excursionType : body.excursionType?.en || "",
  };
  const { data } = await apiClient.put<any>(`/private-excursions/${id}`, payload, { params: { lang } });
  return data?.data ? data : { success: true, data };
}

export async function deletePrivateExcursion(id: string): Promise<void> {
  await apiClient.delete(`/private-excursions/${id}`);
}
