"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PrivateExcursionsHero,
  PrivateExcursionsFilter,
  PrivateExcursionsGrid,
} from "../components";
import type { PrivateExcursionFilterValues } from "../components/PrivateExcursionsFilter";
import { useClientInfinitePrivateExcursionsQuery } from "@/features/privateExcursions/useClientPrivateExcursions";
import { useExcursionCategoriesQuery } from "@/features/groupExcursions/useClientGroupExcursions";
import { mapBackendPrivateExcursionToCard } from "../utils/privateExcursionAdapter";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface PrivateExcursionsSectionProps {
  locale?: string;
}

export function PrivateExcursionsSection({
  locale = "en",
}: PrivateExcursionsSectionProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions.grid;
  const router = useRouter();
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const urlCategoryParam =
    searchParams.get("category") || searchParams.get("categoryId") || "";

  // 1. Fetch real categories from GET /api/excursion-categories
  const { data: categories = [] } = useExcursionCategoriesQuery(locale);

  // 2. Resolve URL parameter to a valid backend category UUID
  const matchedCategoryId = useMemo(() => {
    if (!urlCategoryParam) return "all";

    // Direct match against category UUID
    const directMatch = categories.find(
      (c) => c.id.toLowerCase() === urlCategoryParam.toLowerCase()
    );
    if (directMatch) return directMatch.id;

    // Fallback: match by slug or localized name
    const nameMatch = categories.find((c) => {
      const nameLower = c.name?.toLowerCase() || "";
      const slugLower = c.slug?.toLowerCase() || "";
      const paramLower = urlCategoryParam.toLowerCase();
      return (
        nameLower === paramLower ||
        slugLower === paramLower ||
        nameLower.includes(paramLower) ||
        paramLower.includes(nameLower)
      );
    });
    if (nameMatch) return nameMatch.id;

    return urlCategoryParam;
  }, [urlCategoryParam, categories]);

  const [filterValues, setFilterValues] = useState<PrivateExcursionFilterValues>({
    search: "",
    category: matchedCategoryId || "all",
    duration: "all",
  });

  // Sync internal filter values when URL search param or categories change
  useEffect(() => {
    if (matchedCategoryId && matchedCategoryId !== "all") {
      setFilterValues((prev) => (prev.category === matchedCategoryId ? prev : { ...prev, category: matchedCategoryId }));
    } else if (!urlCategoryParam) {
      setFilterValues((prev) => (prev.category === "all" ? prev : { ...prev, category: "all" }));
    }
  }, [matchedCategoryId, urlCategoryParam]);

  // 3. Determine server-side categoryId
  const selectedCategoryId =
    filterValues.category && filterValues.category !== "all"
      ? filterValues.category
      : undefined;

  // Memoize query params to prevent TanStack infinite re-render cycles
  const queryParams = useMemo(
    () => ({
      categoryId: selectedCategoryId,
      pageSize: 9,
    }),
    [selectedCategoryId]
  );

  // 4. Fetch live private excursions using TanStack useInfiniteQuery
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useClientInfinitePrivateExcursionsQuery(queryParams, locale);

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
    [categories]
  );

  // 5. Flatten all infinite pages into single array of cards
  const allLoadedExcursions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      (page.items || []).map((item) =>
        mapBackendPrivateExcursionToCard(item, categories, t.defaultBadge || "Private Tour")
      )
    );
  }, [data, categories, t.defaultBadge]);

  // 6. Apply real-time client filters for search and duration
  const displayedExcursions = useMemo(() => {
    let items = allLoadedExcursions;

    // Filter by search query
    if (filterValues.search.trim() !== "") {
      const q = filterValues.search.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.shortDescription.toLowerCase().includes(q) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Filter by duration
    if (filterValues.duration && filterValues.duration !== "all") {
      if (filterValues.duration === "under-6") {
        items = items.filter((item) => item.durationHours < 6);
      } else if (filterValues.duration === "6-12") {
        items = items.filter(
          (item) => item.durationHours >= 6 && item.durationHours <= 12
        );
      } else if (filterValues.duration === "12-18") {
        items = items.filter(
          (item) => item.durationHours >= 12 && item.durationHours <= 18
        );
      } else if (filterValues.duration === "18-plus") {
        items = items.filter((item) => item.durationHours >= 18);
      }
    }

    return items;
  }, [allLoadedExcursions, filterValues]);

  // 7. Setup IntersectionObserver on sentinel element for endless scrolling
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [first] = entries;
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = useCallback(
    (newFilters: PrivateExcursionFilterValues) => {
      setFilterValues((prev) => {
        if (
          prev.search === newFilters.search &&
          prev.category === newFilters.category &&
          prev.duration === newFilters.duration
        ) {
          return prev;
        }
        return newFilters;
      });

      // Synchronize URL query parameter ONLY if the category parameter actually changed
      const currentCategoryInUrl =
        searchParams.get("category") || searchParams.get("categoryId") || "";
      const targetCategoryInUrl =
        newFilters.category && newFilters.category !== "all"
          ? newFilters.category
          : "";

      if (currentCategoryInUrl !== targetCategoryInUrl) {
        const params = new URLSearchParams(searchParams.toString());
        if (targetCategoryInUrl) {
          params.set("category", targetCategoryInUrl);
        } else {
          params.delete("category");
          params.delete("categoryId");
        }

        const newQuery = params.toString() ? `?${params.toString()}` : "";
        router.replace(`/${locale}/private-excursions${newQuery}`, {
          scroll: false,
        });
      }
    },
    [searchParams, router, locale]
  );

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] text-[#0E4A68] font-poppins">
      {/* 1. Hero Banner with animated traveling arrow and 5 hexagons */}
      <PrivateExcursionsHero locale={locale} />

      {/* 2. Main Content: Filter, Cards Grid, and Endless Scroll */}
      <div className="w-full">
        {/* Filter Section */}
        <PrivateExcursionsFilter
          categories={categoryOptions}
          selectedCategory={filterValues.category}
          onFilterChange={handleFilterChange}
          disabled={isLoading}
          locale={locale}
        />

        {/* Error State */}
        {!isLoading && isError && (
          <div className="w-full max-w-xl mx-auto my-8 p-8 sm:p-10 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm">
            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#0E4A68]">
              {t.errorTitle || "Unable to Load Private Excursions"}
            </h3>
            <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 mb-6 max-w-md mx-auto">
              {t.errorDesc || "We encountered a temporary connection issue reaching the excursions server. Please try again or check back shortly."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center bg-[#DE7423] hover:bg-[#c46116] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-2.5 px-8 rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer"
            >
              {t.tryAgain || "Try Again"}
            </button>
          </div>
        )}

        {/* Excursions Grid */}
        <PrivateExcursionsGrid
          excursions={displayedExcursions}
          isLoading={isLoading}
          locale={locale}
        />

        {/* Bottom Endless Scroll Sentinel & Loading Indicator */}
        <div
          ref={sentinelRef}
          className="w-full py-8 flex flex-col items-center justify-center"
        >
          {isFetchingNextPage && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-9 h-9 rounded-full border-3 border-[#0E4A68] border-t-transparent animate-spin" />
              <span className="font-poppins text-xs sm:text-sm font-medium text-[#0E4A68] tracking-wide">
                {t.loadingMore || "Loading more private experiences..."}
              </span>
            </div>
          )}

          {/* End of Catalog Indicator */}
          {!isLoading && !hasNextPage && displayedExcursions.length > 0 && (
            <div className="pt-8 pb-4 text-center">
              <span className="font-poppins text-xs sm:text-sm text-[#888888] bg-white px-4 py-1.5 rounded-full border border-[#888888]/30">
                {t.endOfCatalog || "You have reached the end of the private excursions catalog"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivateExcursionsSection;
