import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { extractErrorMessage } from "@/shared/utils/errorUtils";

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "https://touristtt.runasp.net/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Request interceptor to automatically attach JWT Bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("admin_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling and 401 redirection
apiClient.interceptors.response.use(
  (response) => {
    // If backend returns HTTP 200/201 but the payload indicates failure (ApiResponse envelope)
    let body = response.data;
    if (typeof body === "string" && body.trim().startsWith("{")) {
      try {
        body = JSON.parse(body.trim());
      } catch {
        // keep original
      }
    }

    if (
      body &&
      typeof body === "object" &&
      (body.success === false || body.isSuccess === false)
    ) {
      const errorMsg = extractErrorMessage(body, body.message || "Operation failed.");
      const error = new AxiosError(
        errorMsg,
        "ERR_BAD_RESPONSE",
        response.config,
        response.request,
        response
      );
      (error as unknown as Record<string, unknown>).userMessage = errorMsg;
      error.message = errorMsg;
      return Promise.reject(error);
    }

    return response;
  },
  (error) => {
    // Populate normalized error message so any consumer accessing error.message
    // gets the real backend message instead of generic Axios status code.
    const userFriendlyMsg = extractErrorMessage(error);
    if (error && typeof error === "object") {
      error.message = userFriendlyMsg;
      (error as unknown as Record<string, unknown>).userMessage = userFriendlyMsg;
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Clear token and cookie if unauthorized
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_auth_storage");
      document.cookie = "admin_token=; path=/; max-age=0; SameSite=Lax";

      // If currently inside an admin route, redirect to admin login
      if (
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.startsWith("/admin/login")
      ) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
