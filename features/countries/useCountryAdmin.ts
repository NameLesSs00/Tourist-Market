import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCountry,
  deleteCountry,
  getCountries,
  getCountryAllLanguages,
  updateCountry,
} from "@/clientApi/countryApi";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANGS, type LocalizedText } from "@/models/localization";
import type { CountryUpsertRequest } from "@/models/country";

export const COUNTRIES_KEY = ["countries"] as const;

/**
 * Fills in any missing or blank non-English language fields with the English value
 * to prevent backend 400 validation rejections.
 */
export function fillMissingCountryLanguages(name: LocalizedText): LocalizedText {
  const fallback = name.en?.trim() || "";
  const result: LocalizedText = { ...name };

  for (const lang of LANGS) {
    if (!result[lang] || !result[lang].trim()) {
      result[lang] = fallback;
    }
  }

  return result;
}

/**
 * Hook to fetch countries for a specific language (defaults to "en").
 */
export function useCountriesQuery(lang: string = "en") {
  return useQuery({
    queryKey: [...COUNTRIES_KEY, "list", lang],
    queryFn: () => getCountries(lang),
    placeholderData: keepPreviousData,
  });
}

/**
 * Hook to fetch multi-language country data for editing.
 */
export function useCountryAllLanguagesQuery(id: string | null) {
  return useQuery({
    queryKey: [...COUNTRIES_KEY, "detail", id],
    queryFn: () => (id ? getCountryAllLanguages(id) : null),
    enabled: Boolean(id),
  });
}

/**
 * Hook to create a country.
 */
export function useCreateCountryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CountryUpsertRequest) => {
      const sanitized: CountryUpsertRequest = {
        ...body,
        name: fillMissingCountryLanguages(body.name),
      };
      return await createCountry(sanitized);
    },
    onSuccess: (data) => {
      toast.success(`Country “${data.name}” created successfully.`);
      queryClient.invalidateQueries({ queryKey: COUNTRIES_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to create country.");
    },
  });
}

/**
 * Hook to update an existing country.
 */
export function useUpdateCountryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: CountryUpsertRequest;
    }) => {
      const sanitized: CountryUpsertRequest = {
        ...body,
        name: fillMissingCountryLanguages(body.name),
      };
      return await updateCountry(id, sanitized);
    },
    onSuccess: (data) => {
      toast.success(`Country “${data.name}” updated successfully.`);
      queryClient.invalidateQueries({ queryKey: COUNTRIES_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to update country.");
    },
  });
}

/**
 * Hook to delete a country.
 */
export function useDeleteCountryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteCountry(id);
      return id;
    },
    onSuccess: () => {
      toast.success("Country deleted successfully.");
      queryClient.invalidateQueries({ queryKey: COUNTRIES_KEY });
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err) || "Failed to delete country.");
    },
  });
}
