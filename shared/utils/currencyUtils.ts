import type { CurrencyItem } from "@/models/currency";

// Fallback rates follow the backend convention: exchangeRate = USD value of 1 unit
// of the currency (e.g. EUR 1.12 means 1 EUR = 1.12 USD). Mirrors the active
// currencies returned by GET /api/currency in the sandbox backend.
export const DEFAULT_CURRENCIES: CurrencyItem[] = [
  {
    id: 1,
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    exchangeRate: 1,
    isActive: true,
  },
  {
    id: 2,
    code: "EUR",
    name: "Euro",
    symbol: "€",
    exchangeRate: 1.12,
    isActive: true,
  },
  {
    id: 3,
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    exchangeRate: 1.34,
    isActive: true,
  },
  {
    id: 4,
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    exchangeRate: 0.011,
    isActive: true,
  },
  {
    id: 5,
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    exchangeRate: 0.71,
    isActive: true,
  },
];

export const DEFAULT_CURRENCY: CurrencyItem = DEFAULT_CURRENCIES[0];

/**
 * Converts a base USD amount into the target currency using exchangeRate.
 * exchangeRate is the USD value of 1 unit of the target currency
 * (e.g. EUR 1.12 -> 100 USD = 100 / 1.12 = 89.29 EUR).
 * Note: If exchangeRate is 0 or invalid, returns the base amount.
 */
export function convertBaseUsdToCurrency(
  amountInUsd: number,
  exchangeRate: number = 1
): number {
  if (!amountInUsd || isNaN(amountInUsd)) return 0;
  if (!exchangeRate || exchangeRate <= 0) return amountInUsd;
  // Divide because the rate expresses how many USD one unit of the currency is worth
  return Math.round((amountInUsd / exchangeRate) * 100) / 100;
}

/**
 * Formats a numeric price with a currency symbol or code.
 */
export function formatCurrencyAmount(
  amount: number,
  symbol: string = "$",
  code?: string
): string {
  const numeric = typeof amount === "number" && !isNaN(amount) ? amount : 0;
  const formattedNumber = numeric.toFixed(2);

  if (symbol && symbol !== code) {
    // E.g. "$120.00" or "€120.00"
    return `${symbol}${formattedNumber}`;
  }

  // E.g. "120.00 USD"
  return `${formattedNumber} ${code || "USD"}`;
}

