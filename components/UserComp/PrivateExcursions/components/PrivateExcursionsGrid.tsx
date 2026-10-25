"use client";

import React from "react";
import { PrivateExcursion } from "../types";
import { PrivateExcursionCard } from "./PrivateExcursionCard";

interface PrivateExcursionsGridProps {
  excursions: PrivateExcursion[];
  isLoading?: boolean;
  locale?: string;
}

export function PrivateExcursionsGrid({
  excursions,
  isLoading = false,
  locale = "en",
}: PrivateExcursionsGridProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-full rounded-[12px] bg-white border border-[#E5E5E5] p-4 flex flex-col gap-4 animate-pulse"
            >
              <div className="w-full h-[220px] bg-slate-200 rounded-[8px]" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-10 bg-slate-200 rounded w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (excursions.length === 0) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-[16px] bg-white border border-[#E0E0E0] shadow-sm">
          <svg
            className="w-12 h-12 text-[#DE7423] mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <h3 className="font-poppins text-lg font-bold text-[#0E4A68] mb-2">
            No Private Excursions Found
          </h3>
          <p className="font-poppins text-xs sm:text-sm text-[#646464]">
            Try adjusting your search criteria or resetting filters to see available tours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
      {/* 3 Columns Grid matching reference screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {excursions.map((excursion) => (
          <PrivateExcursionCard
            key={excursion.id}
            excursion={excursion}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}

export default PrivateExcursionsGrid;
