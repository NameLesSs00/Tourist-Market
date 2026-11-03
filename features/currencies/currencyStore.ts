import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyItem } from "@/models/currency";
import {
  DEFAULT_CURRENCIES,
  DEFAULT_CURRENCY,
  convertBaseUsdToCurrency,
  formatCurrencyAmount,
} from "@/shared/utils/currencyUtils";

export interface CurrencyStoreState {
  selectedCurrency: CurrencyItem;
  currencies: CurrencyItem[];
  isLoading: boolean;
  setCurrency: (currencyOrCode: string | CurrencyItem) => void;
  setCurrencies: (currencies: CurrencyItem[]) => void;
  setIsLoading: (loading: boolean) => void;
  convertPrice: (amountInUsd: number, targetCode?: string) => number;
  formatPrice: (amountInUsd: number, targetCode?: string) => string;
}

function syncCurrencyCookie(code: string) {
  if (typeof document !== "undefined") {
    document.cookie = `NEXT_CURRENCY=${encodeURIComponent(
      code
    )}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

export const useCurrencyStore = create<CurrencyStoreState>()(
  persist(
    (set, get) => ({
      selectedCurrency: DEFAULT_CURRENCY,
      currencies: DEFAULT_CURRENCIES,
      isLoading: false,

      setCurrency: (currencyOrCode) => {
        const { currencies } = get();
        let target: CurrencyItem | undefined;

        if (typeof currencyOrCode === "string") {
          target = currencies.find(
            (c) => c.code.toUpperCase() === currencyOrCode.toUpperCase()
          );
          if (!target) {
            target = {
              id: 0,
              code: currencyOrCode.toUpperCase(),
              name: currencyOrCode.toUpperCase(),
              symbol: currencyOrCode.toUpperCase(),
              exchangeRate: 1,
              isActive: true,
            };
          }
        } else {
          target = currencyOrCode;
        }

        syncCurrencyCookie(target.code);
        set({ selectedCurrency: target });
      },

      setCurrencies: (newCurrencies) => {
        if (!newCurrencies || newCurrencies.length === 0) return;

        const currentCode = get().selectedCurrency.code;
        const matchingCurrent = newCurrencies.find(
          (c) => c.code.toUpperCase() === currentCode.toUpperCase()
        );

        set({
          currencies: newCurrencies,
          selectedCurrency: matchingCurrent || get().selectedCurrency,
        });
      },

      setIsLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      convertPrice: (amountInUsd: number, targetCode?: string) => {
        const { selectedCurrency, currencies } = get();
        const code = targetCode || selectedCurrency.code;
        const currency =
          currencies.find((c) => c.code.toUpperCase() === code.toUpperCase()) ||
          selectedCurrency;

        return convertBaseUsdToCurrency(amountInUsd, currency.exchangeRate);
      },

      formatPrice: (amountInUsd: number, targetCode?: string) => {
        const { selectedCurrency, currencies } = get();
        const code = targetCode || selectedCurrency.code;
        const currency =
          currencies.find((c) => c.code.toUpperCase() === code.toUpperCase()) ||
          selectedCurrency;

        const converted = convertBaseUsdToCurrency(
          amountInUsd,
          currency.exchangeRate
        );
        return formatCurrencyAmount(converted, currency.symbol, currency.code);
      },
    }),
    {
      name: "user_currency_store",
      partialize: (state) => ({
        selectedCurrency: state.selectedCurrency,
      }),
    }
  )
);

