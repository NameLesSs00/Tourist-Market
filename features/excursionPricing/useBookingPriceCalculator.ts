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

  useEffect(() => {
    if (!enabled || !excursionId || adults < 1) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (isPrivate) {
        privateMutation.mutate(
          {
            excursionId,
            data: {
              adults,
              children,
              infants,
              selectedAttractionIds,
              selectedServiceIds,
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
    excursionId,
    isPrivate,
    adults,
    children,
    infants,
    selectedAttractionIds,
    selectedServiceIds,
    currency,
    debounceMs,
    enabled,
  ]);

  return {
    privateResult,
    groupResult,
    isLoading: privateMutation.isPending || groupMutation.isPending,
    error: privateMutation.error || groupMutation.error,
    reset: () => {
      setPrivateResult(null);
      setGroupResult(null);
    },
  };
}
