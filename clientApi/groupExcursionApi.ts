import apiClient from "./apiConfig";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import type {
  GroupExcursionAllLanguagesDetail,
  GroupExcursionCreateRequest,
  GroupExcursionDetailItem,
  GroupExcursionListResponse,
  GroupExcursionQueryParams,
  GroupExcursionUpdateRequest,
} from "@/models/groupExcursion";

export async function getGroupExcursions(
  params: GroupExcursionQueryParams = {}
): Promise<GroupExcursionListResponse> {
  const { data } = await apiClient.get<GroupExcursionListResponse>(
    "/admin/excursions/group",
    {
      params: {
        currency: "USD",
        page: 1,
        pageSize: 10,
        ...params,
      },
    }
  );
  const raw = data as any;
  return (raw?.data || raw) as GroupExcursionListResponse;
}

export async function getGroupExcursionById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<GroupExcursionDetailItem> {
  const { data } = await apiClient.get<GroupExcursionDetailItem>(
    `/admin/excursions/${id}`,
    { params: { lang, currency } }
  );
  const raw = data as any;
  return (raw?.data || raw) as GroupExcursionDetailItem;
}

export async function getGroupExcursionAllLanguages(
  id: string
): Promise<GroupExcursionAllLanguagesDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang: LangCode) => {
      const item = await getGroupExcursionById(id, lang, "USD");
      return { lang, item };
    })
  );

  const title: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const subtitle: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const excursionType: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const shortDescription: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  const fullProgram: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let baseItem: GroupExcursionDetailItem | null = null;

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

  if (!baseItem) {
    throw new Error("Failed to load group excursion details.");
  }

  const categoryId =
    baseItem.category?.id ||
    baseItem.categoryId ||
    (baseItem as any)?.categorySlug ||
    "";

  return {
    base: baseItem,
    categoryId,
    title,
    subtitle,
    excursionType,
    shortDescription,
    fullProgram,
  };
}

export async function createGroupExcursion(
  body: GroupExcursionCreateRequest,
  lang: string = "en"
): Promise<{ id: string; success?: boolean }> {
  const { data } = await apiClient.post<{ id: string; success?: boolean }>(
    "/admin/excursions/group",
    body,
    { params: { lang } }
  );
  const raw = data as any;
  return raw?.data || raw;
}

export async function updateGroupExcursion(
  id: string,
  body: GroupExcursionUpdateRequest,
  lang: string = "en"
): Promise<{ success?: boolean }> {
  const payload = {
    ...body,
    excursionType: body.excursionType || body.translations?.excursionType?.en || "",
  };
  const { data } = await apiClient.put<{ success?: boolean }>(
    `/admin/excursions/${id}`,
    payload,
    { params: { lang } }
  );
  const raw = data as any;
  return raw?.data || raw;
}

export async function deleteGroupExcursion(
  id: string
): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete<{ success: boolean; message: string }>(
    `/admin/excursions/${id}`
  );
  return data;
}
