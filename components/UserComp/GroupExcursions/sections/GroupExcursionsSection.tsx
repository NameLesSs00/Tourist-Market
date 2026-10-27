"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  GroupExcursionsHero,
  GroupExcursionsFilter,
  GroupExcursionsGrid,
  GroupExcursionFilterValues,
} from "../components";
import {
  useClientInfiniteGroupExcursionsQuery,
  useExcursionCategoriesQuery,
} from "@/features/groupExcursions/useClientGroupExcursions";
import { mapBackendGroupExcursionToCard } from "../utils/groupExcursionAdapter";

interface GroupExcursionsSectionProps {
  locale?: string;
}

export function GroupExcursionsSection({
  locale = "en",
}: GroupExcursionsSectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const [filterValues, setFilterValues] = useState<GroupExcursionFilterValues>({
    search: "",
    category: "all",
    price: "all",
    duration: "all",
  });

  // 1. Determine server-side categoryId
  const selectedCategoryId =
    filterValues.category && filterValues.category !== "all"
      ? filterValues.category
      : undefined;

  // 2. Fetch live group excursions using TanStack useInfiniteQuery
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useClientInfiniteGroupExcursionsQuery(
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
      (page.items || []).map(mapBackendGroupExcursionToCard)
    );
  }, [data]);

  // 5. Apply real-time client filters for search, price, and duration
  const displayedExcursions = useMemo(() => {
    let items = allLoadedExcursions;

    // Filter by search query
    if (filterValues.search.trim() !== "") {
      const q = filterValues.search.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Filter by price range
    if (filterValues.price && filterValues.price !== "all") {
      if (filterValues.price === "0-50") {
        items = items.filter((item) => item.adultPrice <= 50);
      } else if (filterValues.price === "50-100") {
        items = items.filter(
          (item) => item.adultPrice > 50 && item.adultPrice <= 100
        );
      } else if (filterValues.price === "100+") {
        items = items.filter((item) => item.adultPrice > 100);
      }
    }

    // Filter by duration range
    if (filterValues.duration && filterValues.duration !== "all") {
      if (filterValues.duration === "under-12") {
        items = items.filter((item) => item.durationHours < 12);
      } else if (filterValues.duration === "12-18") {
        items = items.filter(
          (item) => item.durationHours >= 12 && item.durationHours <= 18
        );
      } else if (filterValues.duration === "18+") {
        items = items.filter((item) => item.durationHours > 18);
      }
    }

    return items;
  }, [allLoadedExcursions, filterValues]);

  // 6. Setup IntersectionObserver for endless scrolling
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
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

  // Handle filter changes instantly from child filter component
  const handleFilterChange = (newFilters: GroupExcursionFilterValues) => {
    setFilterValues(newFilters);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F1D5] font-poppins">
      {/* 1. Hero Section */}
      <GroupExcursionsHero locale={locale} />

      {/* 2. Main Content: Filter, Cards Grid, and Endless Scroll */}
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        {/* Filter Section */}
        <div className="mb-10 sm:mb-12">
          <GroupExcursionsFilter
            categories={categoryOptions}
            onFilterChange={handleFilterChange}
            disabled={isLoading}
          />
        </div>

        {/* Error State */}
        {!isLoading && isError && (
          <div className="w-full max-w-xl mx-auto my-8 p-8 sm:p-10 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm">
            <h3 className="font-poppins text-xl sm:text-2xl font-semibold text-[#0E4A68]">
              Unable to Load Excursions
            </h3>
            <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 mb-6 max-w-md mx-auto">
              We encountered a temporary connection issue reaching the excursions server. Please try again or check back shortly.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center bg-[#165F84] hover:bg-[#0E4A68] active:scale-95 text-white font-poppins font-semibold text-sm sm:text-base py-2.5 px-8 rounded-[12px] shadow-sm transition-all duration-200 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Excursions Cards Grid */}
        <GroupExcursionsGrid
          excursions={displayedExcursions}
          isLoading={isLoading}
          locale={locale}
        />

        {/* Bottom Endless Scroll Sentinel & Loading Indicator */}
        <div ref={sentinelRef} className="w-full py-8 flex flex-col items-center justify-center">
          {isFetchingNextPage && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-9 h-9 rounded-full border-3 border-[#0E4A68] border-t-transparent animate-spin" />
              <span className="font-poppins text-xs sm:text-sm font-medium text-[#0E4A68] tracking-wide">
                Loading more adventures...
              </span>
            </div>
          )}

          {/* End of Catalog Indicator */}
          {!isLoading && !hasNextPage && displayedExcursions.length > 0 && (
            <div className="pt-8 pb-4 text-center">
              <span className="font-poppins text-xs sm:text-sm text-[#888888] bg-[#F4F1D5] px-4 py-1.5 rounded-full border border-[#888888]/30">
                You have reached the end of the excursions catalog
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupExcursionsSection;
