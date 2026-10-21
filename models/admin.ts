/**
 * Allowed roles for system administrators.
 */
export type AdminRole = "SuperAdmin" | "Admin";

export const ADMIN_ROLES: AdminRole[] = ["SuperAdmin", "Admin"];

/**
 * Helper to check if a user has the SuperAdmin role.
 */
export function isSuperAdmin(user?: { roles?: string[] } | null): boolean {
  if (!user || !Array.isArray(user.roles)) return false;
  return user.roles.some((r) => r.toLowerCase() === "superadmin");
}

/**
 * Summary of an Administrator returned in the paged list.
 */
export interface AdminUserItem {
  id: string; // GUID, hidden in UI
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: AdminRole[];
  createdAt: string;
  updatedAt?: string | null;
  emailConfirmed?: boolean;
  lockoutEnabled?: boolean;
  lockoutEnd?: string | null;
}

/**
 * Paged result returned by GET /api/admins
 */
export interface PagedAdminsResult {
  items: AdminUserItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Filter & pagination parameters for GET /api/admins
 */
export interface AdminQueryParams {
  search?: string;
  role?: string;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDescending?: boolean;
}

/**
 * Request payload for creating a new Administrator (POST /api/admins).
 */
export interface AdminCreateRequest {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: AdminRole[];
}

/**
 * Request payload for updating an existing Administrator (PUT /api/admins/{id}).
 */
export interface AdminUpdateRequest {
  userName: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  roles: AdminRole[];
}
