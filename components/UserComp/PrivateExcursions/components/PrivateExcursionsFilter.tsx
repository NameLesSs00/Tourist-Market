"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CustomDropdown, DropdownOption } from "@/components/UserComp/GroupExcursions/components/CustomDropdown";

export interface PrivateExcursionFilterValues {
  search: string;
  category: string;
  duration: string;
}

export interface ExcursionCategoryOption {
  id: string;
  name: string;
}

interface PrivateExcursionsFilterProps {
  categories?: ExcursionCategoryOption[];
  onFilterChange: (filters: PrivateExcursionFilterValues) => void;
  disabled?: boolean;
}

const DURATION_OPTIONS: DropdownOption[] = [
  { value: "all", label: "All Durations" },
  { value: "under-6", label: "Under 6 hours" },
  { value: "6-12", label: "6 - 12 hours" },
  { value: "12-18", label: "12 - 18 hours" },
  { value: "18-plus", label: "18+ hours" },
];

export function PrivateExcursionsFilter({
  categories = [],
  onFilterChange,
  disabled = false,
}: PrivateExcursionsFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");

  // Construct Category options dynamically from backend
  const categoryOptions: DropdownOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Categories" },
      ...categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    ];
  }, [categories]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    onFilterChange({
      search,
      category: newCat,
      duration,
    });
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    onFilterChange({
      search,
      category,
      duration: newDuration,
    });
  };

  // Debounced search input (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({
        search,
        category,
        duration,
      });
    }, 350);

    return () => clearTimeout(handler);
  }, [search, category, duration, onFilterChange]);

  const handleApplyNow = () => {
    onFilterChange({
      search,
      category,
      duration,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setDuration("all");
    onFilterChange({
      search: "",
      category: "all",
      duration: "all",
    });
  };

  const isFiltered = search.trim() !== "" || category !== "all" || duration !== "all";

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

      {/* Filter Card Form */}
      <div className="w-full bg-[#FFFFFF] rounded-[18px] p-5 sm:p-6 lg:p-7 border-[0.5px] border-[#888888] shadow-[0px_2px_20px_2px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-end">
          {/* 1. Search Field */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="private-search"
              className="font-poppins text-xs sm:text-sm font-semibold text-[#0E4A68]"
            >
              Search
            </label>
            <div className="relative w-full h-11 rounded-[8px] bg-[#FFFFFF] border border-[#888888] px-3.5 flex items-center justify-between transition-colors focus-within:border-[#0E4A68] focus-within:ring-1 focus-within:ring-[#0E4A68]/30">
              <input
                id="private-search"
                type="text"
                disabled={disabled}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyNow()}
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
          <CustomDropdown
            label="Category"
            options={categoryOptions}
            value={category}
            onChange={handleCategoryChange}
            disabled={disabled}
            icon={
              <div className="w-4 h-4 relative select-none">
                <Image
                  src="/PrivateExcursions/Vector (10).svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            }
          />

          {/* 3. Duration Dropdown */}
          <CustomDropdown
            label="Duration"
            options={DURATION_OPTIONS}
            value={duration}
            onChange={handleDurationChange}
            disabled={disabled}
            icon={
              <svg
                className="w-4 h-4 text-[#0E4A68]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            }
          />

          {/* 4. Action Buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="hidden lg:block font-poppins text-xs sm:text-sm font-semibold text-transparent select-none">
              Action
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={disabled}
                onClick={handleApplyNow}
                style={{
                  background: "#DE7423",
                  boxShadow:
                    "0px 1px 10px 1px rgba(222, 116, 35, 0.7), 0px 4px 25px 0px rgba(0, 0, 0, 0.3)",
                }}
                className="flex-1 h-11 rounded-[8px] flex items-center justify-center gap-2 text-white font-poppins text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
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

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-11 px-3 rounded-[8px] border border-[#888888] text-[#0E4A68] hover:bg-gray-100 font-poppins text-xs font-semibold transition cursor-pointer"
                  title="Reset Filters"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateExcursionsFilter;
