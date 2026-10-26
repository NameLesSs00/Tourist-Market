import apiClient from "./apiConfig";
import type {
  ExcursionAdminDetailResponse,
  ExcursionImageItem,
} from "@/models/excursionDetails";

export interface SetPrimaryImageResponse {
  excursionId: string;
  primaryImageId: string;
  primaryImageUrl: string;
}

/**
 * Reads full unified excursion details using the admin endpoint.
 */
export async function getAdminExcursionById(
  id: string,
  lang: string = "en",
  currency: string = "USD"
): Promise<ExcursionAdminDetailResponse> {
  const { data } = await apiClient.get<ExcursionAdminDetailResponse>(
    `/admin/excursions/${id}`,
    { params: { lang, currency } }
  );
  const raw = data as any;
  return (raw?.data || raw) as ExcursionAdminDetailResponse;
}

/**
 * Fetches all gallery images for an excursion.
 */
export async function getExcursionImages(
  excursionId: string
): Promise<ExcursionImageItem[]> {
  const { data } = await apiClient.get<ExcursionImageItem[]>(
    `/admin/excursions/${excursionId}/images`
  );
  const raw = data as any;
  return (raw?.data || raw || []) as ExcursionImageItem[];
}

/**
 * Uploads an image to an excursion gallery.
 */
export async function uploadExcursionImage(
  excursionId: string,
  file: File,
  isPrimary: boolean = false
): Promise<ExcursionImageItem> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<ExcursionImageItem>(
    `/admin/excursions/${excursionId}/images`,
    formData,
    {
      params: { isPrimary },
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  const raw = data as any;
  return (raw?.data || raw) as ExcursionImageItem;
}

/**
 * Sets an existing gallery image as primary.
 */
export async function setExcursionPrimaryImage(
  excursionId: string,
  imageId: string
): Promise<SetPrimaryImageResponse> {
  const { data } = await apiClient.put<SetPrimaryImageResponse>(
    `/admin/excursions/${excursionId}/primary-image`,
    { imageId }
  );
  const raw = data as any;
  return (raw?.data || raw) as SetPrimaryImageResponse;
}

/**
 * Deletes an excursion gallery image.
 */
export async function deleteExcursionImage(
  excursionId: string,
  imageId: string
): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete<{ success: boolean; message: string }>(
    `/admin/excursions/${excursionId}/images/${imageId}`
  );
  return data;
}

/**
 * Uploads or replaces the hero image for an excursion.
 */
export async function uploadExcursionHeroImage(
  excursionId: string,
  file: File
): Promise<{ success?: boolean; message?: string; heroImageUrl?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await apiClient.post<{ success?: boolean; message?: string; heroImageUrl?: string }>(
    `/admin/excursions/${excursionId}/hero-image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  const raw = data as any;
  return raw?.data || raw;
}

/**
 * Deletes the hero image for an excursion.
 */
export async function deleteExcursionHeroImage(
  excursionId: string
): Promise<{ success?: boolean; message?: string }> {
  const { data } = await apiClient.delete<{ success?: boolean; message?: string }>(
    `/admin/excursions/${excursionId}/hero-image`
  );
  return data;
}
