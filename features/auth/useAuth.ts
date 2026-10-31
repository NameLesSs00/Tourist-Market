import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authApi from "@/clientApi/authApi";
import useAuthStore from "./authStore";
import { LoginRequest, ChangePasswordRequest } from "@/models/auth";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/errorUtils";

export { extractErrorMessage };

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data);
        toast.success(response.message || "Logged in successfully!");
        router.push("/admin/dashboard");
      } else {
        toast.error(response.message || "Login failed.");
      }
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
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
