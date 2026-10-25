"use client";

import React, { useState } from "react";
import { GroupExcursion } from "../types";
import { GroupExcursionCard } from "../components/GroupExcursionCard";

interface GroupDetailsRelatedProps {
  relatedTrips: GroupExcursion[];
  locale?: string;
}

export function GroupDetailsRelated({
  relatedTrips,
  locale = "en",
}: GroupDetailsRelatedProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Take first 3 or paginate across groups of 3
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(relatedTrips.length / pageSize));

  const displayedTrips = relatedTrips.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full pt-12 sm:pt-16 pb-16 sm:pb-24">
      {/* Title */}
      <div className="mb-8">
        <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-[#0E4A68] tracking-tight uppercase">
          EXPLORE RELATED TRIPS
        </h2>
      </div>

      {/* Grid with Left/Right Arrows */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous related trips"
          className="hidden xl:flex absolute -left-11 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#BBBBBB] shadow-md items-center justify-center text-[#0E4A68] hover:bg-[#F4F1D5] transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 3 Related Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {(displayedTrips.length > 0 ? displayedTrips : relatedTrips.slice(0, 3)).map(
            (trip) => (
              <GroupExcursionCard
                key={trip.id}
                excursion={trip}
                locale={locale}
              />
            )
          )}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next related trips"
          className="hidden xl:flex absolute -right-11 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#BBBBBB] shadow-md items-center justify-center text-[#0E4A68] hover:bg-[#F4F1D5] transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentPage(idx)}
            aria-label={`Go to page ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentPage
                ? "bg-[#0E4A68] scale-125"
                : "bg-[#BBBBBB] hover:bg-[#888888]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default GroupDetailsRelated;
