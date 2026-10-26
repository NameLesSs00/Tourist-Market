"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  GroupExcursionsResponse,
  GroupExcursionFilterParams,
} from "../types";
import { getGroupExcursions } from "../data/groupExcursionsService";
import {
  GroupExcursionsHero,
  GroupExcursionsFilter,
  GroupExcursionsGrid,
} from "../components";

interface GroupExcursionsSectionProps {
  locale?: string;
}

export function GroupExcursionsSection({
  locale = "en",
}: GroupExcursionsSectionProps) {
  const [filterParams, setFilterParams] = useState<GroupExcursionFilterParams>({
    search: "",
    category: "All Categories",
    price: "All Prices",
    duration: "All Durations",
    page: 1,
    pageSize: 12,
  });

  const [data, setData] = useState<GroupExcursionsResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isCancelled = false;

    startTransition(async () => {
      const result = await getGroupExcursions(filterParams);
      if (!isCancelled) {
        setData(result);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [filterParams]);

  const handleFilterChange = (newFilters: {
    search: string;
    category: string;
    price: string;
    duration: string;
  }) => {
    setFilterParams((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F1D5] font-poppins">
      {/* 1. Hero Section */}
      <GroupExcursionsHero locale={locale} />

      {/* 2. Main Content: Filter and Cards Grid */}
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        {/* Filter Section */}
        <div className="mb-10 sm:mb-12">
          <GroupExcursionsFilter
            onFilterChange={handleFilterChange}
            disabled={isPending}
          />
        </div>

        {/* Excursions Cards Grid */}
        <GroupExcursionsGrid
          excursions={data?.items ?? []}
          isLoading={!data && isPending}
          locale={locale}
        />
      </div>           
    </div>
  );
}

export default GroupExcursionsSection;
