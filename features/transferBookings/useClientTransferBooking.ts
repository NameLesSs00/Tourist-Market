"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createTransferBooking,
  matchTransferBooking,
  previewTransferBooking,
} from "@/clientApi/transferBookingApi";
import {
  getTransferFromLocations,
  getTransferToLocations,
} from "@/clientApi/transferLocationApi";
import { getCountries } from "@/clientApi/countryApi";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import type {
  CreateTransferBookingRequest,
  CreateTransferBookingResponse,
  TransferBookingPreviewParams,
  TransferMatchParams,
  TransferMatchResponseDto,
} from "@/models/transferBooking";

export const TRANSFER_FROM_LOCATIONS_KEY = ["transfer-from-locations"] as const;
export const TRANSFER_TO_LOCATIONS_KEY = ["transfer-to-locations"] as const;
export const COUNTRIES_KEY = ["countries"] as const;
export const TRANSFER_PREVIEW_KEY = ["transfer-preview"] as const;
export const TRANSFER_MATCH_KEY = ["transfer-match"] as const;

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

export function useTransferMatch(
  params: Partial<TransferMatchParams> & {
    fromLocationId?: string;
    toLocationId?: string;
    adults?: number;
    children?: number;
    tripType?: number;
    additionalHours?: number;
    currency?: string;
    lang?: string;
  }
) {
  const fromLocationId = params.fromLocationId || params.FromLocationId;
  const toLocationId = params.toLocationId || params.ToLocationId;
  const adults = params.adults ?? params.Adults ?? 1;
  const children = params.children ?? params.Children ?? 0;
  const tripType = params.tripType ?? params.TripType ?? 1;
  const additionalHours = params.additionalHours ?? params.AdditionalHours ?? 0;
  const currency = params.currency || "USD";
  const lang = params.lang || "en";

  const isEnabled =
    Boolean(fromLocationId) &&
    Boolean(toLocationId) &&
    Number(adults) >= 1;

  return useQuery<TransferMatchResponseDto | null>({
    queryKey: [
      ...TRANSFER_MATCH_KEY,
      fromLocationId,
      toLocationId,
      adults,
      children,
      tripType,
      additionalHours,
      currency,
      lang,
    ],
    queryFn: async () => {
      if (!fromLocationId || !toLocationId) return null;
      return matchTransferBooking({
        FromLocationId: fromLocationId,
        ToLocationId: toLocationId,
        Adults: adults,
        Children: children,
        TripType: tripType,
        AdditionalHours: additionalHours,
        currency,
        lang,
      });
    },
    enabled: isEnabled,
    staleTime: 60 * 1000,
    retry: (failureCount, err: unknown) => {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 404) return false;
      return failureCount < 1;
    },
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
    retry: (failureCount, err: unknown) => {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr?.response?.status === 404) return false;
      return failureCount < 1;
    },
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
