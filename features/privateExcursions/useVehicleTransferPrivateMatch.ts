import { useQuery } from "@tanstack/react-query";
import { matchVehicleTransferPrivate } from "@/clientApi/vehicleTransferPrivateApi";
import { useCurrencyStore } from "@/features/currencies/currencyStore";
import type { VehicleTransferPrivateItem } from "@/models/vehicleTransferPrivate";

export function useVehicleTransferPrivateMatch(
  privateExcursionId: string | undefined,
  passengerCount: number,
  lang: string = "en",
  currencyParam?: string
) {
  const storeCurrency = useCurrencyStore((state) => state.selectedCurrency.code);
  const currency = currencyParam || storeCurrency || "USD";

  return useQuery<VehicleTransferPrivateItem | null>({
    queryKey: [
      "vehicle-transfer-private-match",
      privateExcursionId,
      passengerCount,
      lang,
      currency,
    ],
    queryFn: async () => {
      const res = await matchVehicleTransferPrivate({
        privateExcursionId: privateExcursionId!,
        passengerCount,
        lang,
        currency,
      });
      return res?.data ?? null;
    },
    enabled: Boolean(privateExcursionId) && passengerCount >= 1,
    staleTime: 30 * 1000,
    retry: 1,
  });
}

