"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActiveCurrencies } from "@/clientApi/currencyApi";
import { useCurrencyStore } from "./currencyStore";
import { DEFAULT_CURRENCIES } from "@/shared/utils/currencyUtils";
import type { CurrencyItem } from "@/models/currency";

export const CLIENT_ACTIVE_CURRENCIES_KEY = ["client", "currencies", "active"];

export function useClientCurrencies() {
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);
  const setIsLoading = useCurrencyStore((state) => state.setIsLoading);
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);
  const currencies = useCurrencyStore((state) => state.currencies);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const convertPrice = useCurrencyStore((state) => state.convertPrice);

  const query = useQuery({
    queryKey: CLIENT_ACTIVE_CURRENCIES_KEY,
    queryFn: async () => {
      try {
        const response = await getActiveCurrencies();
        const items = response?.data;
        if (Array.isArray(items) && items.length > 0) {
          const active = items.filter((c: CurrencyItem) => c.isActive);
          const order = ["USD", "EUR", "GBP"];
          active.sort((a, b) => {
            const idxA = order.indexOf(a.code.toUpperCase());
            const idxB = order.indexOf(b.code.toUpperCase());
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return a.code.localeCompare(b.code);
          });
          return active;
        }
      } catch {
        // Fall back gracefully to default supported currencies on network failure
      }
      return DEFAULT_CURRENCIES;
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    setIsLoading(query.isLoading);
  }, [query.isLoading, setIsLoading]);

  useEffect(() => {
    if (query.data && query.data.length > 0) {
      setCurrencies(query.data);
    }
  }, [query.data, setCurrencies]);

  return {
    currencies,
    selectedCurrency,
    setCurrency,
    formatPrice,
    convertPrice,
    isLoading: query.isLoading,
  };
}

