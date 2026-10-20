import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi from "@/api/authApi";
import useAuthStore from "./authStore";
import { LoginRequest, ChangePasswordRequest } from "@/models/auth";
import axios from "axios";

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data);
        router.push("/admin/dashboard");
      }
    },
  });
}

export function useMeQuery() {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const isTokenValid = useAuthStore((state) => state.isTokenValid);

  return useQuery({
    queryKey: ["admin", "me"],
    queryFn: async () => {
      const response = await authApi.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      }
      return response.data;
    },
    enabled: Boolean(token && isTokenValid()),
    staleTime: 5 * 60 * 1000,
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (payload: ChangePasswordRequest) =>
      authApi.changePassword(payload),
  });
}

/**
 * Utility helper to extract user-friendly error messages from backend responses
 */
export function extractErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data?.message) {
      return data.message;
    }
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      return data.errors.join(", ");
    }
    if (typeof data?.errors === "string") {
      return data.errors;
    }
    if (data?.errors && typeof data.errors === "object") {
      const messages = Object.values(data.errors).flat();
      if (messages.length > 0) return messages.join(", ");
    }
    if (error.response?.status === 401) {
      return "Invalid username or password. Please try again.";
    }
    if (error.response?.status === 500) {
      return "Server error occurred. Please try again later.";
    }
  }
  return "An unexpected error occurred. Please check your connection.";
}
