"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  PrivateExcursionsHero,
  PrivateExcursionsFilter,
  PrivateExcursionsGrid,
} from "../components";
import type { PrivateExcursionFilterValues } from "../components/PrivateExcursionsFilter";
import { useClientInfinitePrivateExcursionsQuery } from "@/features/privateExcursions/useClientPrivateExcursions";
import { useExcursionCategoriesQuery } from "@/features/groupExcursions/useClientGroupExcursions";
import { mapBackendPrivateExcursionToCard } from "../utils/privateExcursionAdapter";

interface PrivateExcursionsSectionProps {
  locale?: string;
}

export function PrivateExcursionsSection({
  locale = "en",
}: PrivateExcursionsSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [filterValues, setFilterValues] = useState<PrivateExcursionFilterValues>({
    search: "",
    category: "all",
    duration: "all",
  });

  // 1. Determine server-side categoryId
  const selectedCategoryId =
    filterValues.category && filterValues.category !== "all"
      ? filterValues.category
      : undefined;

  // 2. Fetch live private excursions using TanStack useInfiniteQuery
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useClientInfinitePrivateExcursionsQuery(
    {
      categoryId: selectedCategoryId,
      pageSize: 9,
    },
    locale
  );

  // 3. Fetch real categories from GET /api/excursion-categories
  const { data: categories = [] } = useExcursionCategoriesQuery(locale);

  const categoryOptions = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      })),
    [categories]
  );

  // 4. Flatten all infinite pages into single array of cards
  const allLoadedExcursions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      (page.items || []).map(mapBackendPrivateExcursionToCard)
    );
  }, [data]);

  // 5. Apply real-time client filters for search and duration
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

  // 6. Setup IntersectionObserver on sentinel element for endless scrolling
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

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
      observer.unobserve(sentinel);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (newFilters: PrivateExcursionFilterValues) => {
    setFilterValues(newFilters);
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] text-[#0E4A68] font-poppins">
      {/* 1. Hero Banner with animated traveling arrow and 5 hexagons */}
      <PrivateExcursionsHero />

      {/* 2. Main Content: Filter, Cards Grid, and Endless Scroll */}
      <div className="w-full">
        {/* Filter Section */}
        <PrivateExcursionsFilter
          categories={categoryOptions}
          onFilterChange={handleFilterChange}
          disabled={isLoading}
        />

        {/* Error State */}
        {!isLoading && isError && (
          <div className="w-full max-w-xl mx-auto my-8 p-8 sm:p-10 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm">
            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#0E4A68]">
              Unable to Load Private Excursions
            </h3>
            <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 mb-6 max-w-md mx-auto">
              We encountered a temporary connection issue reaching the excursions server. Please try again or check back shortly.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center bg-[#DE7423] hover:bg-[#c46116] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-2.5 px-8 rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer"
            >
              Try Again
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
                Loading more private experiences...
              </span>
            </div>
          )}

          {/* End of Catalog Indicator */}
          {!isLoading && !hasNextPage && displayedExcursions.length > 0 && (
            <div className="pt-8 pb-4 text-center">
              <span className="font-poppins text-xs sm:text-sm text-[#888888] bg-white px-4 py-1.5 rounded-full border border-[#888888]/30">
                You have reached the end of the private excursions catalog
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivateExcursionsSection;
