"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PrivateExcursionFilterParams, CategoryOption, DurationOption } from "../types";

interface PrivateExcursionsFilterProps {
  onFilterChange: (params: PrivateExcursionFilterParams) => void;
  initialParams?: PrivateExcursionFilterParams;
}

const CATEGORIES: CategoryOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Historical", value: "Historical" },
  { label: "FUN Trips", value: "FUN Trips" },
  { label: "Marine & Boat", value: "Marine & Boat" },
  { label: "Desert Safari", value: "Desert Safari" },
];

const DURATIONS: DurationOption[] = [
  { label: "All Durations", value: "all" },
  { label: "Under 6 hours", value: "under-6" },
  { label: "6 - 12 hours", value: "6-12" },
  { label: "12 - 18 hours", value: "12-18" },
  { label: "18+ hours", value: "18-plus" },
];

export function PrivateExcursionsFilter({
  onFilterChange,
  initialParams,
}: PrivateExcursionsFilterProps) {
  const [searchQuery, setSearchQuery] = useState(initialParams?.searchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialParams?.category || "all"
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialParams?.duration || "all"
  );

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setCategoryOpen(false);
      }
      if (
        durationRef.current &&
        !durationRef.current.contains(event.target as Node)
      ) {
        setDurationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyFilter = () => {
    onFilterChange({
      searchQuery,
      category: selectedCategory,
      duration: selectedDuration,
    });
  };

  const selectedCategoryLabel =
    CATEGORIES.find((c) => c.value === selectedCategory)?.label || "All Categories";
  const selectedDurationLabel =
    DURATIONS.find((d) => d.value === selectedDuration)?.label || "All Durations";

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-poppins text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#0E4A68] tracking-tight">
          Find Your <span className="text-[#DE7423]">Perfect Trip</span>
        </h2>
        <p className="mt-2 font-poppins text-xs sm:text-sm md:text-base text-[#646464]">
          Use the filters below to find the trip that suits you
        </p>
      </div>

      {/* Filter Card Form matching PromptsUi specifications */}
      <div
        className="w-full bg-[#FFFFFF] rounded-[18px] p-5 sm:p-6 lg:p-7 border-[0.5px] border-[#888888] shadow-[0px_2px_20px_2px_rgba(0,0,0,0.2)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-end">
          {/* 1. Search Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="private-search"
              className="font-poppins text-xs sm:text-sm font-semibold text-[#0E4A68]"
            >
              Search
            </label>
            <div className="relative w-full h-[46px] rounded-[8px] bg-[#FFFFFF] border-[0.5px] border-[#555555] px-3.5 flex items-center justify-between transition-colors focus-within:border-[#DE7423] focus-within:ring-1 focus-within:ring-[#DE7423]/30">
              <input
                id="private-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilter()}
                placeholder="Search in Excursions..."
                className="w-full bg-transparent font-poppins text-xs sm:text-sm text-[#0E4A68] placeholder-[#888888] focus:outline-none pr-2"
              />
              <div className="shrink-0 w-4 h-4 relative select-none pointer-events-none">
                <Image
                  src="/PrivateExcursions/Vector (9).svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* 2. Category Dropdown */}
          <div className="flex flex-col gap-1.5" ref={categoryRef}>
            <label className="font-poppins text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCategoryOpen((prev) => !prev);
                  setDurationOpen(false);
                }}
                className="w-full h-[46px] rounded-[8px] bg-[#FFFFFF] border-[0.5px] border-[#555555] px-3.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:border-[#DE7423]"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="shrink-0 w-4 h-4 relative select-none">
                    <Image
                      src="/PrivateExcursions/Vector (10).svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-poppins text-xs sm:text-sm text-[#0E4A68] font-medium truncate">
                    {selectedCategoryLabel}
                  </span>
                </div>
                <div
                  className={`shrink-0 w-3 h-2 relative transition-transform duration-200 ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/PrivateExcursions/Vector (11).svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {categoryOpen && (
                <div className="absolute top-[52px] left-0 w-full z-30 bg-white rounded-[10px] border border-[#BBBBBB] shadow-lg py-1 max-h-56 overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setCategoryOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 font-poppins text-xs sm:text-sm transition-colors cursor-pointer ${
                        selectedCategory === cat.value
                          ? "bg-[#DE7423]/10 text-[#DE7423] font-semibold"
                          : "text-[#0E4A68] hover:bg-[#F4F1D5]/60"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Duration Dropdown */}
          <div className="flex flex-col gap-1.5" ref={durationRef}>
            <label className="font-poppins text-xs sm:text-sm font-semibold text-[#0E4A68]">
              Duration
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setDurationOpen((prev) => !prev);
                  setCategoryOpen(false);
                }}
                className="w-full h-[46px] rounded-[8px] bg-[#FFFFFF] border-[0.5px] border-[#555555] px-3.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:border-[#DE7423]"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="shrink-0 w-4 h-4 relative select-none">
                    <Image
                      src="/PrivateExcursions/Vector (12).svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-poppins text-xs sm:text-sm text-[#0E4A68] font-medium truncate">
                    {selectedDurationLabel}
                  </span>
                </div>
                <div
                  className={`shrink-0 w-3 h-2 relative transition-transform duration-200 ${
                    durationOpen ? "rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/PrivateExcursions/Vector (11).svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {durationOpen && (
                <div className="absolute top-[52px] left-0 w-full z-30 bg-white rounded-[10px] border border-[#BBBBBB] shadow-lg py-1 max-h-56 overflow-y-auto">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.value}
                      type="button"
                      onClick={() => {
                        setSelectedDuration(dur.value);
                        setDurationOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 font-poppins text-xs sm:text-sm transition-colors cursor-pointer ${
                        selectedDuration === dur.value
                          ? "bg-[#DE7423]/10 text-[#DE7423] font-semibold"
                          : "text-[#0E4A68] hover:bg-[#F4F1D5]/60"
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Action Button */}
          <div className="flex flex-col gap-1.5">
            <span className="hidden lg:block font-poppins text-xs sm:text-sm font-semibold text-transparent select-none">
              Action
            </span>
            <button
              type="button"
              onClick={handleApplyFilter}
              style={{
                background: "#DE7423",
                boxShadow:
                  "0px 1px 10px 1px rgba(222, 116, 35, 0.7), 0px 4px 25px 0px rgba(0, 0, 0, 0.3)",
              }}
              className="w-full h-[46px] rounded-[8px] flex items-center justify-center gap-2 text-white font-poppins text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:scale-[0.99]"
            >
              <div className="shrink-0 w-4 h-4 relative select-none">
                <Image
                  src="/PrivateExcursions/Vector (13).svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateExcursionsFilter;
