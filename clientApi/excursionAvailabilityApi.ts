import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  ExcursionAvailabilityDay,
  ExcursionAvailabilityDayResult,
  ExcursionAvailabilityResult,
  UpdateDayAvailabilityItem,
  UpdateWeeklyAvailabilityRequest,
} from "@/models/excursionAvailability";

export async function getExcursionAvailability(
  excursionId: string
): Promise<ExcursionAvailabilityResult> {
  const { data } = await apiClient.get<ExcursionAvailabilityResult>(
    `/excursions/${excursionId}/availability`
  );
  return data;
}

export async function updateWeeklyAvailability(
  excursionId: string,
  body: UpdateWeeklyAvailabilityRequest
): Promise<ExcursionAvailabilityResult> {
  const { data } = await apiClient.post<ExcursionAvailabilityResult>(
    `/excursions/${excursionId}/availability`,
    body
  );
  return data;
}

export async function getExcursionAvailabilityDay(
  excursionId: string,
  availabilityId: string
): Promise<ExcursionAvailabilityDayResult> {
  const { data } = await apiClient.get<ExcursionAvailabilityDayResult>(
    `/excursions/${excursionId}/availability/${availabilityId}`
  );
  return data;
}

export async function updateExcursionAvailabilityDay(
  excursionId: string,
  availabilityId: string,
  body: UpdateDayAvailabilityItem
): Promise<ExcursionAvailabilityDayResult> {
  const { data } = await apiClient.put<ExcursionAvailabilityDayResult>(
    `/excursions/${excursionId}/availability/${availabilityId}`,
    body
  );
  return data;
}

export async function deleteExcursionAvailabilityDay(
  excursionId: string,
  availabilityId: string
): Promise<ApiResponse<null>> {
  const { data } = await apiClient.delete<ApiResponse<null>>(
    `/excursions/${excursionId}/availability/${availabilityId}`
  );
  return data;
}
