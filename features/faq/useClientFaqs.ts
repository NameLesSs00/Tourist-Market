import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getClientFaqs } from "@/clientApi/faqApi";
import type { FaqItem, FaqPage, FaqQueryParams } from "@/models/faq";

export const CLIENT_FAQS_KEY = ["client", "faqs"] as const;

/**
 * Public TanStack Query hook to fetch FAQs with caching, localization, and displayOrder sorting.
 */
export function useClientFaqsQuery(
  params: FaqQueryParams = {},
  locale: string = "en"
) {
  const query = useQuery<FaqPage>({
    queryKey: [...CLIENT_FAQS_KEY, locale, params],
    queryFn: async () => {
      return await getClientFaqs({
        language: locale,
        pageSize: 20,
        ...params,
      });
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const rawItems = query.data?.items ?? [];
  // Sort items by displayOrder ascending
  const items: FaqItem[] = [...rawItems].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  return {
    ...query,
    items,
  };
}
