"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CustomDropdown, DropdownOption } from "./CustomDropdown";

export interface ExcursionCategoryOption {
  id: string;
  name: string;
}

export interface GroupExcursionFilterValues {
  search: string;
  category: string;
  price: string;
  duration: string;
}

interface GroupExcursionsFilterProps {
  categories?: ExcursionCategoryOption[];
  onFilterChange: (filters: GroupExcursionFilterValues) => void;
  disabled?: boolean;
}

const PRICE_OPTIONS: DropdownOption[] = [
  { value: "all", label: "All Prices" },
  { value: "0-50", label: "Under $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100+", label: "$100+" },
];

const DURATION_OPTIONS: DropdownOption[] = [
  { value: "all", label: "All Durations" },
  { value: "under-12", label: "Under 12 hours" },
  { value: "12-18", label: "12 - 18 hours" },
  { value: "18+", label: "18+ hours" },
];

export function GroupExcursionsFilter({
  categories = [],
  onFilterChange,
  disabled = false,
}: GroupExcursionsFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [duration, setDuration] = useState("all");

  // Construct Category dropdown options from backend categories
  const categoryOptions: DropdownOption[] = useMemo(() => {
    return [
      { value: "all", label: "All Categories" },
      ...categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    ];
  }, [categories]);

  // Notify parent immediately when Category changes
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    onFilterChange({
      search,
      category: newCat,
      price,
      duration,
    });
  };

  // Notify parent immediately when Price changes
  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
    onFilterChange({
      search,
      category,
      price: newPrice,
      duration,
    });
  };

  // Notify parent immediately when Duration changes
  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    onFilterChange({
      search,
      category,
      price,
      duration: newDuration,
    });
  };

  // Debounced search input (350ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({
        search,
        category,
        price,
        duration,
      });
    }, 350);

    return () => clearTimeout(handler);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search,
      category,
      price,
      duration,
    });
  };

  const isFilterActive =
    search.trim() !== "" ||
    category !== "all" ||
    price !== "all" ||
    duration !== "all";

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setPrice("all");
    setDuration("all");
    onFilterChange({
      search: "",
      category: "all",
      price: "all",
      duration: "all",
    });
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="font-poppins text-2xl sm:text-3xl md:text-[34px] font-bold text-[#0E4A68] tracking-tight">
          Find Your Perfect Trip
        </h2>
        <p className="font-poppins text-sm sm:text-base text-[#646464] mt-1.5 sm:mt-2">
          Use the filters below to find the trip that suits you
        </p>
      </div>

      {/* Filter Form Container */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full bg-[#FFFFFF] text-[#444444] rounded-[18px] border-[0.5px] border-[#888888] p-4 sm:p-5 lg:p-6 transition-all"
        style={{
          boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end">
          {/* 1. Search */}
          <div className="lg:col-span-3 flex flex-col">
            <label
              htmlFor="search-excursions"
              className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5"
            >
              Search
            </label>
            <div className="relative flex items-center">
              <input
                id="search-excursions"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search in Excursions..."
                disabled={disabled}
                className="w-full h-11 pl-3.5 pr-10 font-poppins text-sm text-[#444444] placeholder-[#888888] bg-white rounded-[8px] border-[0.5px] border-[#888888] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] focus:border-[#0E4A68] transition"
              />
              {search.trim() ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 text-[#888888] hover:text-[#0E4A68] cursor-pointer"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <div className="absolute right-3.5 pointer-events-none flex items-center justify-center">
                  <Image
                    src="/GroupExcursions/Vector (3).svg"
                    alt="Search icon"
                    width={15}
                    height={15}
                    className="opacity-70"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Category Custom Dropdown */}
          <div className="lg:col-span-3">
            <CustomDropdown
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              disabled={disabled}
              options={categoryOptions}
              icon={
                <Image
                  src="/GroupExcursions/Vector.svg"
                  alt="Category icon"
                  width={13}
                  height={15}
                />
              }
            />
          </div>

          {/* 3. Price Custom Dropdown */}
          <div className="lg:col-span-2">
            <CustomDropdown
              label="Price"
              value={price}
              onChange={handlePriceChange}
              disabled={disabled}
              options={PRICE_OPTIONS}
              icon={
                <Image
                  src="/GroupExcursions/Vector (1).svg"
                  alt="Price icon"
                  width={10}
                  height={14}
                />
              }
            />
          </div>

          {/* 4. Duration Custom Dropdown */}
          <div className="lg:col-span-2">
            <CustomDropdown
              label="Duration"
              value={duration}
              onChange={handleDurationChange}
              disabled={disabled}
              options={DURATION_OPTIONS}
              icon={
                <svg
                  className="w-4 h-4 text-[#888888]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
            />
          </div>

          {/* 5. Action / Reset Button */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5 hidden lg:block select-none">
              Action
            </span>
            {isFilterActive ? (
              <button
                type="button"
                onClick={handleResetFilters}
                disabled={disabled}
                className="w-full h-11 flex items-center justify-center gap-1.5 bg-[#FFF4E5] hover:bg-[#ffe7cc] active:scale-[0.98] text-[#D48C28] border border-[#D48C28] font-poppins text-sm font-semibold rounded-[8px] transition-all cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={disabled}
                className="w-full h-11 flex items-center justify-center gap-2 bg-[#0E4A68] hover:bg-[#09354b] active:scale-[0.98] text-white font-poppins text-sm font-medium rounded-[8px] border-[0.5px] border-[#555555] transition-all cursor-pointer"
                style={{
                  boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  src="/GroupExcursions/Vector (2).svg"
                  alt="Search icon"
                  width={14}
                  height={14}
                />
                <span>Search</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default GroupExcursionsFilter;
