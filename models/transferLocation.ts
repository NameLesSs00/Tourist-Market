import type { LocalizedText } from "./localization";

export type TransferLocationType = "from" | "to";

export interface TransferLocationItem {
  id: string;
  name: string;
}

export interface TransferLocationUpsertRequest {
  name: LocalizedText;
}

export interface TransferLocationAllLanguagesDetail {
  id: string;
  name: LocalizedText;
}

export interface TransferLocationQueryParams {
  pageNumber?: number;
  pageSize?: number;
  lang?: string;
  language?: string;
}

export interface PagedTransferLocationsData {
  items: TransferLocationItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedTransferLocationsResult {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: PagedTransferLocationsData;
}

/** Fallback empty ru/de/fr translations to English so the backend never receives empty strings */
export function fillMissingTransferLocationLanguages(
  body: TransferLocationUpsertRequest
): TransferLocationUpsertRequest {
  const fallback = body.name?.en?.trim() || "";
  return {
    name: {
      en: fallback,
      ru: body.name?.ru?.trim() || fallback,
      de: body.name?.de?.trim() || fallback,
      fr: body.name?.fr?.trim() || fallback,
    },
  };
}
