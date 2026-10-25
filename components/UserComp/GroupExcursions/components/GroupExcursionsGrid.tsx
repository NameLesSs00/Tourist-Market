"use client";

import React from "react";
import { GroupExcursion } from "../types";
import { GroupExcursionCard } from "./GroupExcursionCard";

interface GroupExcursionsGridProps {
  excursions: GroupExcursion[];
  isLoading?: boolean;
  locale?: string;
}

export function GroupExcursionsGrid({
  excursions,
  isLoading = false,
  locale = "en",
}: GroupExcursionsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-[12px] border-[0.5px] border-[#888888] p-3 sm:p-3.5 space-y-3"
          >
            <div className="w-full aspect-[370/220] bg-slate-200 rounded-[10px]" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="space-y-1.5">
              <div className="h-3 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="h-10 bg-slate-200 rounded-[8px]" />
          </div>
        ))}
      </div>
    );
  }

  if (excursions.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-white rounded-[18px] border-[0.5px] border-[#888888] shadow-sm">
        <h3 className="font-poppins text-xl font-semibold text-[#0E4A68]">
          No excursions found
        </h3>
        <p className="font-poppins text-sm text-[#646464] mt-2">
          Try adjusting your search or filter options to discover more trips.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
      {excursions.map((excursion) => (
        <GroupExcursionCard
          key={excursion.id}
          excursion={excursion}
          locale={locale}
        />
      ))}
    </div>
  );
}

export default GroupExcursionsGrid;
