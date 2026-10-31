import { extractErrorMessage } from "@/shared/utils/errorUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCurrency,
  deleteCurrency,
  getActiveCurrencies,
  getCurrencies,
  updateCurrency,
} from "@/clientApi/currencyApi";
import type {
  CurrencyQueryParams,
  CurrencyUpsertRequest,
} from "@/models/currency";

/**
 * Query hook for paginated currencies.
 */
export function useCurrenciesQuery(params: CurrencyQueryParams = {}) {
  return useQuery({
    queryKey: ["admin", "currencies", params],
    queryFn: async () => {
      const res = await getCurrencies(params);
      return res.data;
    },
  });
}

/**
 * Query hook for all active currencies.
 */
export function useActiveCurrenciesQuery() {
  return useQuery({
    queryKey: ["currencies", "active"],
    queryFn: async () => {
      const res = await getActiveCurrencies();
      return res.data ?? [];
    },
  });
}

/**
 * Mutation hook for creating a currency.
 */
export function useCreateCurrencyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: CurrencyUpsertRequest) => createCurrency(body),
    onSuccess: () => {
      toast.success("Currency created successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "currencies"] });
      qc.invalidateQueries({ queryKey: ["currencies", "active"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to create currency."));
    },
  });
}

/**
 * Mutation hook for updating an existing currency.
 */
export function useUpdateCurrencyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: CurrencyUpsertRequest }) =>
      updateCurrency(id, body),
    onSuccess: () => {
      toast.success("Currency updated successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "currencies"] });
      qc.invalidateQueries({ queryKey: ["currencies", "active"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to update currency."));
    },
  });
}

/**
 * Mutation hook for deleting a currency.
 */
export function useDeleteCurrencyMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCurrency(id),
    onSuccess: () => {
      toast.success("Currency deleted successfully.");
      qc.invalidateQueries({ queryKey: ["admin", "currencies"] });
      qc.invalidateQueries({ queryKey: ["currencies", "active"] });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err, "Failed to delete currency."));
    },
  });
}
