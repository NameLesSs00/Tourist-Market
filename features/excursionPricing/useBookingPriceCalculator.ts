import { useEffect, useRef, useState } from "react";
import {
  useGroupPricePreviewMutation,
  usePrivatePricePreviewMutation,
} from "./useExcursionPricePreview";
import type {
  PreviewGroupPriceResponse,
  PreviewPrivatePriceResponse,
} from "@/models/excursionPricePreview";

export interface BookingCalculatorParams {
  excursionId?: string | null;
  isPrivate?: boolean;
  adults: number;
  children: number;
  infants: number;
  selectedAttractionIds?: string[];
  selectedServiceIds?: string[];
  currency?: string;
  debounceMs?: number;
  enabled?: boolean;
}

export function useBookingPriceCalculator({
  excursionId,
  isPrivate = false,
  adults,
  children,
  infants,
  selectedAttractionIds = [],
  selectedServiceIds = [],
  currency = "USD",
  debounceMs = 350,
  enabled = true,
}: BookingCalculatorParams) {
  const [privateResult, setPrivateResult] = useState<PreviewPrivatePriceResponse | null>(null);
  const [groupResult, setGroupResult] = useState<PreviewGroupPriceResponse | null>(null);

  const privateMutation = usePrivatePricePreviewMutation();
  const groupMutation = useGroupPricePreviewMutation();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPayloadKeyRef = useRef<string>("");

  const attractionIdsKey = (selectedAttractionIds || []).slice().sort().join(",");
  const serviceIdsKey = (selectedServiceIds || []).slice().sort().join(",");
  const payloadKey = `${excursionId || ""}|${isPrivate}|${adults}|${children}|${infants}|${currency}|${attractionIdsKey}|${serviceIdsKey}`;

  useEffect(() => {
    if (!enabled || !excursionId || adults < 1) {
      return;
    }

    // Only mutate if payload has actually changed compared to the last executed payload
    if (lastPayloadKeyRef.current === payloadKey) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      lastPayloadKeyRef.current = payloadKey;

      if (isPrivate) {
        privateMutation.mutate(
          {
            excursionId,
            data: {
              adults,
              children,
              infants,
              selectedAttractionIds: selectedAttractionIds || [],
              selectedServiceIds: selectedServiceIds || [],
              currency,
            },
          },
          {
            onSuccess: (data) => setPrivateResult(data),
          }
        );
      } else {
        groupMutation.mutate(
          {
            excursionId,
            data: {
              adults,
              children,
              infants,
              currency,
            },
          },
          {
            onSuccess: (data) => setGroupResult(data),
          }
        );
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    payloadKey,
    enabled,
    excursionId,
    isPrivate,
    adults,
    children,
    infants,
    currency,
    debounceMs,
  ]);

  return {
    privateResult,
    groupResult,
    isLoading: privateMutation.isPending || groupMutation.isPending,
    error: privateMutation.error || groupMutation.error,
    reset: () => {
      lastPayloadKeyRef.current = "";
      setPrivateResult(null);
      setGroupResult(null);
    },
  };
}
