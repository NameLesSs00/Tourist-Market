import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import {
  fillMissingTransferLocationLanguages,
  type PagedTransferLocationsResult,
  type TransferLocationAllLanguagesDetail,
  type TransferLocationItem,
  type TransferLocationQueryParams,
  type TransferLocationUpsertRequest,
} from "@/models/transferLocation";

async function fetchLocations(
  endpoint: string,
  params: TransferLocationQueryParams
): Promise<PagedTransferLocationsResult> {
  const queryParams: Record<string, string | number> = {};
  queryParams.pageNumber = params.pageNumber ?? 1;
  queryParams.pageSize = params.pageSize ?? 10;
  queryParams.lang = params.lang || params.language || "en";

  const { data } = await apiClient.get<PagedTransferLocationsResult>(endpoint, {
    params: queryParams,
  });
  return data;
}

async function fetchLocationAllLanguages(
  endpointPrefix: string,
  id: string
): Promise<TransferLocationAllLanguagesDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang) => {
      const { data } = await apiClient.get<ApiResponse<TransferLocationItem>>(
        `${endpointPrefix}/${id}`,
        { params: { lang } }
      );
      return { lang, name: data.data?.name || "" };
    })
  );

  const name: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  for (const r of results) {
    if (r.status === "fulfilled") {
      name[r.value.lang as LangCode] = r.value.name;
    }
  }

  return { id, name };
}

// ---------------------------------------------------------------------------
// Transfer From Locations (Pickups)
// ---------------------------------------------------------------------------

export async function getTransferFromLocations(
  params: TransferLocationQueryParams = {}
): Promise<PagedTransferLocationsResult> {
  return fetchLocations("/transfer-from-locations", params);
}

export async function getTransferFromLocationById(
  id: string,
  lang: string = "en"
): Promise<ApiResponse<TransferLocationItem>> {
  const { data } = await apiClient.get<ApiResponse<TransferLocationItem>>(
    `/transfer-from-locations/${id}`,
    { params: { lang } }
  );
  return data;
}

export async function getTransferFromLocationAllLanguages(
  id: string
): Promise<TransferLocationAllLanguagesDetail> {
  return fetchLocationAllLanguages("/transfer-from-locations", id);
}

export async function createTransferFromLocation(
  body: TransferLocationUpsertRequest
): Promise<ApiResponse<TransferLocationItem>> {
  const payload = fillMissingTransferLocationLanguages(body);
  const { data } = await apiClient.post<ApiResponse<TransferLocationItem>>(
    "/transfer-from-locations",
    payload
  );
  return data;
}

export async function updateTransferFromLocation(
  id: string,
  body: TransferLocationUpsertRequest
): Promise<ApiResponse<TransferLocationItem>> {
  const payload = fillMissingTransferLocationLanguages(body);
  const { data } = await apiClient.put<ApiResponse<TransferLocationItem>>(
    `/transfer-from-locations/${id}`,
    payload
  );
  return data;
}

export async function deleteTransferFromLocation(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/transfer-from-locations/${id}`
  );
  return data;
}

// ---------------------------------------------------------------------------
// Transfer To Locations (Destinations)
// ---------------------------------------------------------------------------

export async function getTransferToLocations(
  params: TransferLocationQueryParams = {}
): Promise<PagedTransferLocationsResult> {
  return fetchLocations("/transfer-to-locations", params);
}

export async function getTransferToLocationById(
  id: string,
  lang: string = "en"
): Promise<ApiResponse<TransferLocationItem>> {
  const { data } = await apiClient.get<ApiResponse<TransferLocationItem>>(
    `/transfer-to-locations/${id}`,
    { params: { lang } }
  );
  return data;
}

export async function getTransferToLocationAllLanguages(
  id: string
): Promise<TransferLocationAllLanguagesDetail> {
  return fetchLocationAllLanguages("/transfer-to-locations", id);
}

export async function createTransferToLocation(
  body: TransferLocationUpsertRequest
): Promise<ApiResponse<TransferLocationItem>> {
  const payload = fillMissingTransferLocationLanguages(body);
  const { data } = await apiClient.post<ApiResponse<TransferLocationItem>>(
    "/transfer-to-locations",
    payload
  );
  return data;
}

export async function updateTransferToLocation(
  id: string,
  body: TransferLocationUpsertRequest
): Promise<ApiResponse<TransferLocationItem>> {
  const payload = fillMissingTransferLocationLanguages(body);
  const { data } = await apiClient.put<ApiResponse<TransferLocationItem>>(
    `/transfer-to-locations/${id}`,
    payload
  );
  return data;
}

export async function deleteTransferToLocation(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/transfer-to-locations/${id}`
  );
  return data;
}
