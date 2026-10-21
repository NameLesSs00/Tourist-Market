import apiClient from "./apiConfig";
import type { ApiResponse } from "@/models/auth";
import type {
  AdminCreateRequest,
  AdminQueryParams,
  AdminUpdateRequest,
  AdminUserItem,
  PagedAdminsResult,
} from "@/models/admin";

/**
 * Fetches paginated administrators list with optional search and filters.
 */
export async function getAdmins(
  params: AdminQueryParams = {}
): Promise<ApiResponse<PagedAdminsResult>> {
  const queryParams: Record<string, string | number | boolean> = {};

  if (params.search?.trim()) queryParams.Search = params.search.trim();
  if (params.role?.trim()) queryParams.Role = params.role.trim();
  if (params.isActive !== undefined) queryParams.IsActive = params.isActive;
  if (params.pageNumber !== undefined) queryParams.PageNumber = params.pageNumber;
  if (params.pageSize !== undefined) queryParams.PageSize = params.pageSize;
  if (params.sortBy?.trim()) queryParams.SortBy = params.sortBy.trim();
  if (params.sortDescending !== undefined) queryParams.SortDescending = params.sortDescending;

  const { data } = await apiClient.get<ApiResponse<PagedAdminsResult>>("/admins", {
    params: queryParams,
  });
  return data;
}

/**
 * Fetches full details for a single administrator by ID.
 */
export async function getAdminById(
  id: string
): Promise<ApiResponse<AdminUserItem>> {
  const { data } = await apiClient.get<ApiResponse<AdminUserItem>>(`/admins/${id}`);
  return data;
}

/**
 * Creates a new administrator account.
 */
export async function createAdmin(
  body: AdminCreateRequest
): Promise<ApiResponse<AdminUserItem>> {
  const { data } = await apiClient.post<ApiResponse<AdminUserItem>>("/admins", body);
  return data;
}

/**
 * Updates an existing administrator's details, active status, and role.
 */
export async function updateAdmin(
  id: string,
  body: AdminUpdateRequest
): Promise<ApiResponse<AdminUserItem>> {
  const { data } = await apiClient.put<ApiResponse<AdminUserItem>>(`/admins/${id}`, body);
  return data;
}

/**
 * Permanently deletes an administrator by ID.
 */
export async function deleteAdmin(
  id: string
): Promise<ApiResponse<boolean>> {
  const { data } = await apiClient.delete<ApiResponse<boolean>>(`/admins/${id}`);
  return data;
}
