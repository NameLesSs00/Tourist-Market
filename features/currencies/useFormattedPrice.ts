"use client";

import { useEffect, useMemo } from "react";
import { hydrateCurrencyStore, useCurrencyStore } from "./currencyStore";
import {
  convertBaseUsdToCurrency,
  formatCurrencyAmount,
} from "@/shared/utils/currencyUtils";

/**
 * Returns a reactive currency formatter for USD base amounts. Use when the
 * formatted amounts are dynamic (lists, computed totals). The returned
 * function identity changes with the selected currency, so consumers
 * re-render on currency switches (unlike selecting the store's stable
 * `formatPrice` reference).
 */
export function useCurrencyFormat() {
  const selectedCurrency = useCurrencyStore((s) => s.selectedCurrency);
  const currencies = useCurrencyStore((s) => s.currencies);

  useEffect(() => {
    hydrateCurrencyStore();
  }, []);

  return useMemo(() => {
    return (amountInUsd: number, targetCode?: string): string => {
      const code = targetCode || selectedCurrency.code;
      const currency =
        currencies.find((c) => c.code.toUpperCase() === code.toUpperCase()) ||
        selectedCurrency;
      const converted = convertBaseUsdToCurrency(
        amountInUsd,
        currency.exchangeRate
      );
      return formatCurrencyAmount(converted, currency.symbol, currency.code);
    };
  }, [selectedCurrency, currencies]);
}

/**
 * Reactive currency formatter for a USD base amount.
 * Unlike `useCurrencyStore((s) => s.formatPrice)` (a stable function
 * reference that never re-renders consumers), this hook subscribes to the
 * selected currency / rate list so prices update immediately when the user
 * switches currency in the header.
 */
export function useFormattedPrice(amountInUsd: number): string {
  const formatPrice = useCurrencyFormat();
  return formatPrice(amountInUsd);
}
