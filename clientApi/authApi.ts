import apiClient from "./apiConfig";
import {
  ApiResponse,
  LoginRequest,
  LoginResponseData,
  AdminUser,
  ChangePasswordRequest,
} from "@/models/auth";

export const authApi = {
  /**
   * Authenticate admin user
   * POST /api/auth/login
   */
  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponseData>> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      "/auth/login",
      payload
    );
    return response.data;
  },

  /**
   * Fetch current authenticated admin user profile
   * GET /api/auth/me
   */
  async getMe(): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.get<ApiResponse<AdminUser>>("/auth/me");
    return response.data;
  },

  /**
   * Change current admin password
   * POST /api/auth/change-password
   */
  async changePassword(
    payload: ChangePasswordRequest
  ): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>(
      "/auth/change-password",
      payload
    );
    return response.data;
  },
};

export default authApi;
