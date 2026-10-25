import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import { LANGS, type LangCode, type LocalizedText } from "@/models/localization";
import {
  fillMissingVehiclePrivateLanguages,
  type PagedVehiclePrivateResult,
  type VehiclePrivateAllLanguagesDetail,
  type VehiclePrivateItem,
  type VehiclePrivateQueryParams,
  type VehiclePrivateUpsertRequest,
} from "@/models/vehiclePrivate";

export async function getVehiclePrivates(
  params: VehiclePrivateQueryParams = {}
): Promise<PagedVehiclePrivateResult> {
  const query: Record<string, string | number | boolean> = {};

  if (typeof params.isActive === "boolean") query.IsActive = params.isActive;
  query.PageNumber = params.pageNumber ?? 1;
  query.PageSize = params.pageSize ?? 10;

  const headers: Record<string, string> = {};
  if (params.lang) headers["Accept-Language"] = params.lang;

  const { data } = await apiClient.get<PagedVehiclePrivateResult>("/vehicle-private", {
    params: query,
    headers,
  });

  return data;
}

export async function getVehiclePrivateById(
  id: string,
  lang: string = "en"
): Promise<ApiResponse<VehiclePrivateItem>> {
  const { data } = await apiClient.get<ApiResponse<VehiclePrivateItem>>(
    `/vehicle-private/${id}`,
    {
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

export async function getVehiclePrivateAllLanguages(
  id: string
): Promise<VehiclePrivateAllLanguagesDetail> {
  const results = await Promise.allSettled(
    LANGS.map(async (lang) => {
      const { data } = await apiClient.get<ApiResponse<VehiclePrivateItem>>(
        `/vehicle-private/${id}`,
        {
          headers: {
            "Accept-Language": lang,
          },
        }
      );
      return {
        lang,
        name: data.data?.name || "",
        isActive: Boolean(data.data?.isActive),
      };
    })
  );

  const name: LocalizedText = { en: "", ru: "", de: "", fr: "" };
  let isActive = true;

  for (const r of results) {
    if (r.status === "fulfilled") {
      name[r.value.lang as LangCode] = r.value.name;
      isActive = r.value.isActive;
    }
  }

  return { id, name, isActive };
}

export async function createVehiclePrivate(
  body: VehiclePrivateUpsertRequest,
  lang: string = "en"
): Promise<ApiResponse<VehiclePrivateItem>> {
  const payload = fillMissingVehiclePrivateLanguages(body);
  const { data } = await apiClient.post<ApiResponse<VehiclePrivateItem>>(
    "/vehicle-private",
    payload,
    {
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

export async function updateVehiclePrivate(
  id: string,
  body: VehiclePrivateUpsertRequest,
  lang: string = "en"
): Promise<ApiResponse<VehiclePrivateItem>> {
  const payload = fillMissingVehiclePrivateLanguages(body);
  const { data } = await apiClient.put<ApiResponse<VehiclePrivateItem>>(
    `/vehicle-private/${id}`,
    payload,
    {
      headers: {
        "Accept-Language": lang,
      },
    }
  );
  return data;
}

export async function deleteVehiclePrivate(
  id: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/vehicle-private/${id}`
  );
  return data;
}
