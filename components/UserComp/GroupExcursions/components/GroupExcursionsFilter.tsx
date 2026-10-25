"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GroupExcursionsFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    price: string;
    duration: string;
  }) => void;
  disabled?: boolean;
}

export function GroupExcursionsFilter({
  onFilterChange,
  disabled = false,
}: GroupExcursionsFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [price, setPrice] = useState("All Prices");
  const [duration, setDuration] = useState("All Durations");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search,
      category,
      price,
      duration,
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
        onSubmit={handleSubmit}
        className="w-full bg-[#FFFFFF] text-[#444444] rounded-[18px] border-[0.5px] border-[#888888] shadow-[0px_2px_20px_2px_rgba(0,0,0,0.2)] p-4 sm:p-5 lg:p-6 transition-all"
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
              <div className="absolute right-3.5 pointer-events-none flex items-center justify-center">
                <Image
                  src="/GroupExcursions/Vector (3).svg"
                  alt="Search icon"
                  width={15}
                  height={15}
                  className="opacity-70"
                />
              </div>
            </div>
          </div>

          {/* 2. Category */}
          <div className="lg:col-span-2 flex flex-col">
            <label
              htmlFor="category-select"
              className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5"
            >
              Category
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none flex items-center">
                <Image
                  src="/GroupExcursions/Vector.svg"
                  alt="Category icon"
                  width={13}
                  height={15}
                />
              </div>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={disabled}
                className="w-full h-11 pl-9 pr-8 appearance-none font-poppins text-sm text-[#444444] bg-white rounded-[8px] border-[0.5px] border-[#888888] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] focus:border-[#0E4A68] cursor-pointer transition"
              >
                <option value="All Categories">All Categories</option>
                <option value="Historical">Historical</option>
                <option value="FUN Trips">FUN Trips</option>
                <option value="Adventure">Adventure</option>
                <option value="Sea Trips">Sea Trips</option>
              </select>
              <div className="absolute right-3 pointer-events-none flex items-center">
                <svg
                  className="w-4 h-4 text-[#888888]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Price */}
          <div className="lg:col-span-2 flex flex-col">
            <label
              htmlFor="price-select"
              className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5"
            >
              Price
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none flex items-center">
                <Image
                  src="/GroupExcursions/Vector (1).svg"
                  alt="Price icon"
                  width={10}
                  height={14}
                />
              </div>
              <select
                id="price-select"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={disabled}
                className="w-full h-11 pl-8 pr-8 appearance-none font-poppins text-sm text-[#444444] bg-white rounded-[8px] border-[0.5px] border-[#888888] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] focus:border-[#0E4A68] cursor-pointer transition"
              >
                <option value="All Prices">All Prices</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100+">$100+</option>
              </select>
              <div className="absolute right-3 pointer-events-none flex items-center">
                <svg
                  className="w-4 h-4 text-[#888888]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Duration */}
          <div className="lg:col-span-3 flex flex-col">
            <label
              htmlFor="duration-select"
              className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5"
            >
              Duration
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none flex items-center text-[#888888]">
                <svg
                  className="w-4 h-4"
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
              </div>
              <select
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                disabled={disabled}
                className="w-full h-11 pl-9 pr-8 appearance-none font-poppins text-sm text-[#444444] bg-white rounded-[8px] border-[0.5px] border-[#888888] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] focus:border-[#0E4A68] cursor-pointer transition"
              >
                <option value="All Durations">All Durations</option>
                <option value="under-12">Under 12 hours</option>
                <option value="12-18">12 - 18 hours</option>
                <option value="18+">18+ hours</option>
              </select>
              <div className="absolute right-3 pointer-events-none flex items-center">
                <svg
                  className="w-4 h-4 text-[#888888]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 5. Action Button */}
          <div className="lg:col-span-2 flex flex-col">
            <span className="font-poppins text-xs sm:text-sm font-medium text-[#444444] mb-1.5 hidden lg:block">
              Action
            </span>
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default GroupExcursionsFilter;
