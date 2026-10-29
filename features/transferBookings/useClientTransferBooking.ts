"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTransferBooking,
  previewTransferBooking,
} from "@/clientApi/transferBookingApi";
import {
  getTransferFromLocations,
  getTransferToLocations,
} from "@/clientApi/transferLocationApi";
import { getCountries } from "@/clientApi/countryApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import type {
  CreateTransferBookingRequest,
  CreateTransferBookingResponse,
  TransferBookingPreviewParams,
} from "@/models/transferBooking";

export const TRANSFER_FROM_LOCATIONS_KEY = ["transfer-from-locations"] as const;
export const TRANSFER_TO_LOCATIONS_KEY = ["transfer-to-locations"] as const;
export const COUNTRIES_KEY = ["countries"] as const;
export const TRANSFER_PREVIEW_KEY = ["transfer-preview"] as const;

export function useTransferFromLocations(lang: string = "en") {
  return useQuery({
    queryKey: [...TRANSFER_FROM_LOCATIONS_KEY, lang],
    queryFn: async () => {
      const res = await getTransferFromLocations({ pageSize: 100, lang });
      return res.data?.items || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTransferToLocations(lang: string = "en") {
  return useQuery({
    queryKey: [...TRANSFER_TO_LOCATIONS_KEY, lang],
    queryFn: async () => {
      const res = await getTransferToLocations({ pageSize: 100, lang });
      return res.data?.items || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTransferCountries(lang: string = "en") {
  return useQuery({
    queryKey: [...COUNTRIES_KEY, lang],
    queryFn: async () => {
      return getCountries(lang);
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useTransferPreview(
  params: Partial<TransferBookingPreviewParams> & {
    fromLocationId?: string;
    toLocationId?: string;
    adults?: number;
    children?: number;
    tripType?: number;
  }
) {
  const isEnabled =
    Boolean(params.fromLocationId) &&
    Boolean(params.toLocationId) &&
    Number(params.adults || 0) >= 1;

  return useQuery({
    queryKey: [
      ...TRANSFER_PREVIEW_KEY,
      params.fromLocationId,
      params.toLocationId,
      params.adults,
      params.children,
      params.tripType,
    ],
    queryFn: async () => {
      return previewTransferBooking({
        fromLocationId: params.fromLocationId!,
        toLocationId: params.toLocationId!,
        adults: params.adults || 1,
        children: params.children || 0,
        tripType: params.tripType || 1,
      });
    },
    enabled: isEnabled,
    staleTime: 60 * 1000,
  });
}

export function useCreateTransferBooking(options?: {
  onSuccess?: (data: CreateTransferBookingResponse) => void;
  onError?: (error: unknown) => void;
}) {
  return useMutation({
    mutationFn: async (payload: CreateTransferBookingRequest) => {
      return createTransferBooking(payload);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Transfer booking submitted successfully!");
      options?.onSuccess?.(data);
    },
    onError: (err) => {
      const msg = extractErrorMessage(
        err,
        "Failed to submit transfer booking. Please check your information and try again."
      );
      toast.error(msg);
      options?.onError?.(err);
    },
  });
}
