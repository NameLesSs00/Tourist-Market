"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  selectedCategory?: string;
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
  selectedCategory,
}: PrivateExcursionsFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(selectedCategory || "all");
  const [duration, setDuration] = useState("all");

  const onFilterChangeRef = useRef(onFilterChange);
  useEffect(() => {
    onFilterChangeRef.current = onFilterChange;
  });

  const isInitialMount = useRef(true);

  // Sync internal category state when selectedCategory prop changes from external source
  useEffect(() => {
    if (selectedCategory !== undefined && selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory, category]);

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
    onFilterChangeRef.current({
      search,
      category: newCat,
      duration,
    });
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    onFilterChangeRef.current({
      search,
      category,
      duration: newDuration,
    });
  };

  // Debounced search input (350ms): ONLY triggers when the user types in the search bar
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      onFilterChangeRef.current({
        search,
        category,
        duration,
      });
    }, 350);

    return () => clearTimeout(handler);
  }, [search, category, duration]);

  const handleApplyNow = () => {
    onFilterChangeRef.current({
      search,
      category,
      duration,
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setDuration("all");
    onFilterChangeRef.current({
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
                placeholder="Search excursions..."
                className="w-full bg-transparent text-sm text-[#0E4A68] placeholder:text-[#888888] focus:outline-none pr-2 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <div className="shrink-0 flex items-center justify-center text-[#888888]">
                <Image
                  src="/search.svg"
                  alt="Search"
                  width={18}
                  height={18}
                  className="opacity-70"
                />
              </div>
            </div>
          </div>

          {/* 2. Category Dropdown */}
          <div>
            <CustomDropdown
              label="Category"
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
              disabled={disabled}
            />
          </div>

          {/* 3. Duration Dropdown */}
          <div>
            <CustomDropdown
              label="Duration"
              options={DURATION_OPTIONS}
              value={duration}
              onChange={handleDurationChange}
              disabled={disabled}
            />
          </div>

          {/* 4. Action Buttons (Apply & Reset) */}
          <div className="flex items-center gap-2.5">
            {/* Apply Button */}
            <button
              type="button"
              disabled={disabled}
              onClick={handleApplyNow}
              className="flex-1 h-11 bg-[#DE7423] hover:bg-[#c46116] active:scale-[0.98] text-white font-poppins font-semibold text-sm rounded-[8px] transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Apply</span>
            </button>

            {/* Reset Button */}
            {isFiltered && (
              <button
                type="button"
                disabled={disabled}
                onClick={handleReset}
                title="Reset all filters"
                className="h-11 px-3.5 bg-gray-100 hover:bg-gray-200 text-[#0E4A68] rounded-[8px] text-xs font-semibold transition-colors cursor-pointer shrink-0 disabled:opacity-60"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateExcursionsFilter;
