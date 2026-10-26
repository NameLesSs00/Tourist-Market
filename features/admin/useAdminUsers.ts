import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
} from "@/clientApi/adminApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  AdminCreateRequest,
  AdminQueryParams,
  AdminUpdateRequest,
} from "@/models/admin";

export const ADMIN_USERS_KEY = ["admin", "users"] as const;

/**
 * Hook to query paginated administrators with optional search and filters.
 */
export function useAdminUsersQuery(
  params: AdminQueryParams = {},
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "list", params],
    queryFn: async () => {
      const res = await getAdmins(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to query a single administrator's full details.
 */
export function useAdminUserDetailQuery(id: string | null) {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "detail", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getAdminById(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

/**
 * Hook to create a new administrator.
 */
export function useCreateAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: AdminCreateRequest) => {
      const res = await createAdmin(body);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        `Administrator “${data.userName}” created successfully.`
      );
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to create administrator.");
    },
  });
}

/**
 * Hook to update an existing administrator.
 */
export function useUpdateAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: AdminUpdateRequest;
    }) => {
      const res = await updateAdmin(id, body);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(
        `Administrator “${data.userName}” updated successfully.`
      );
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to update administrator.");
    },
  });
}

/**
 * Hook to delete an administrator.
 */
export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteAdmin(id);
      return id;
    },
    onSuccess: () => {
      toast.success("Administrator deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to delete administrator.");
    },
  });
}
