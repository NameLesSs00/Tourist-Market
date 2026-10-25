import type { LocalizedText } from "./localization";

export interface VehiclePrivateItem {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface VehiclePrivateUpsertRequest {
  name: LocalizedText;
  isActive?: boolean;
}

export interface VehiclePrivateAllLanguagesDetail {
  id: string;
  name: LocalizedText;
  isActive: boolean;
}

export interface VehiclePrivateQueryParams {
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
  search?: string;
}

export interface PagedVehiclePrivateData {
  items: VehiclePrivateItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedVehiclePrivateResult {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: PagedVehiclePrivateData;
  errors: string[] | null;
}

/** Fallback empty ru/de/fr translations to English so the backend never receives empty strings */
export function fillMissingVehiclePrivateLanguages(
  body: VehiclePrivateUpsertRequest
): VehiclePrivateUpsertRequest {
  const fallback = body.name?.en?.trim() || "";
  return {
    name: {
      en: fallback,
      ru: body.name?.ru?.trim() || fallback,
      de: body.name?.de?.trim() || fallback,
      fr: body.name?.fr?.trim() || fallback,
    },
    isActive: body.isActive !== undefined ? body.isActive : true,
  };
}
