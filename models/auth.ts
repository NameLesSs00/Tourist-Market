export interface ApiResponse<T = unknown> {
  success: boolean;
  isSuccess: boolean;
  message: string | null;
  data: T;
  errors: string[] | string | Record<string, string[]> | null;
}

export interface AdminUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  expiresAt: string;
  user: AdminUser;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
