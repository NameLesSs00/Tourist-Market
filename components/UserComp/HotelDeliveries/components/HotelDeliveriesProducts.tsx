"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HotelDeliveriesCard, HotelProduct } from "./HotelDeliveriesCard";

const SAMPLE_PRODUCTS: HotelProduct[] = [
  {
    id: "ananas-1",
    title: "ANANAS-PINEAPPLES",
    price: "5.00 $/PIECE",
    image: "/Hoteldeliveries/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
    category: "fruits-drinks",
  },
  {
    id: "cherimoya-1",
    title: "CHERIMOYA",
    price: "2.00 $/500 g",
    image: "/Hoteldeliveries/0fc7981686a3af0f6e17419f76c546a8e41aba2b.png",
    category: "fruits-drinks",
  },
  {
    id: "watermelon-1",
    title: "WATERMELON",
    price: "1.00 $/KG",
    image: "/Hoteldeliveries/9d33047fd1866b5be63bb5362e19a2927aa30b36.png",
    category: "fruits-drinks",
  },
  {
    id: "ananas-2",
    title: "ANANAS-PINEAPPLES",
    price: "5.00 $/PIECE",
    image: "/Hoteldeliveries/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
    category: "fruits-drinks",
  },
  {
    id: "cherimoya-2",
    title: "CHERIMOYA",
    price: "2.00 $/500 g",
    image: "/Hoteldeliveries/0fc7981686a3af0f6e17419f76c546a8e41aba2b.png",
    category: "fruits-drinks",
  },
  {
    id: "watermelon-2",
    title: "WATERMELON",
    price: "1.00 $/KG",
    image: "/Hoteldeliveries/9d33047fd1866b5be63bb5362e19a2927aa30b36.png",
    category: "fruits-drinks",
  },
  {
    id: "ananas-3",
    title: "ANANAS-PINEAPPLES",
    price: "5.00 $/PIECE",
    image: "/Hoteldeliveries/cea97bfaa2b16182bcbbfa00313df019dd4ecbb1.png",
    category: "fruits-drinks",
  },
  {
    id: "cherimoya-3",
    title: "CHERIMOYA",
    price: "2.00 $/500 g",
    image: "/Hoteldeliveries/0fc7981686a3af0f6e17419f76c546a8e41aba2b.png",
    category: "fruits-drinks",
  },
  {
    id: "watermelon-3",
    title: "WATERMELON",
    price: "1.00 $/KG",
    image: "/Hoteldeliveries/9d33047fd1866b5be63bb5362e19a2927aa30b36.png",
    category: "fruits-drinks",
  },
];

interface HotelDeliveriesProductsProps {
  locale?: string;
  selectedCategory?: string;
  onToggleFilter?: () => void;
}

export function HotelDeliveriesProducts({
  locale = "en",
  selectedCategory = "all",
  onToggleFilter,
}: HotelDeliveriesProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = SAMPLE_PRODUCTS.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "all" ||
      item.category === selectedCategory ||
      (selectedCategory.startsWith("fd-") && item.category === "fruits-drinks");
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 font-poppins select-none w-full">
      {/* ─── Top Control Bar: Search & Filter (left on mobile), Sort (right on mobile) ─── */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
        {/* Left on mobile: Search Input + Filter button | Right on desktop: Search Input */}
        <div className="flex items-center gap-2 sm:gap-3 order-1 lg:order-2">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH"
              className="w-[100px] xs:w-[125px] sm:w-[220px] md:w-[260px] pl-1 sm:pl-3.5 pr-6 sm:pr-9 py-1 sm:py-1.5 text-[11px] sm:text-[13px] tracking-wide placeholder:text-[#888888] placeholder:tracking-wider outline-none text-[#555555] bg-transparent border-b border-[#CCCCCC] sm:border sm:border-[rgba(0,0,0,0.3)] rounded-none sm:rounded-[5px]"
            />
            <span className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#888888]">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-[15px] sm:h-[15px]"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>

          {/* Mobile Filter Button (matches responsivedeliver.png) */}
          <button
            type="button"
            onClick={onToggleFilter}
            aria-label="Filter products"
            className="flex lg:hidden items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#0E4A68] text-white text-[11px] sm:text-[12px] font-semibold rounded-[4px] sm:rounded-[5px] hover:bg-[#0A3850] active:scale-95 transition-all cursor-pointer shadow-sm shrink-0"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-4.586a1 1 0 00-.293-.707L1.293 6.293A1 1 0 011 5.586V4z" />
            </svg>
            <span>Filter</span>
          </button>
        </div>

        {/* Right on mobile: Sort by | Left on desktop: Sort by */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative order-2 lg:order-1 shrink-0">
          <span className="text-[12px] sm:text-[14px] text-[#555555] font-normal shrink-0">
            Sort by :
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex items-center justify-center sm:justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-[14px] text-[#555555] cursor-pointer min-w-[70px] sm:min-w-[140px] bg-white border border-[#888888] sm:border-[0.5px] rounded-[4px] sm:rounded-[5px] hover:border-[#0E4A68] transition-colors"
            >
              <span>{sortBy}</span>
              <span className="text-[8px] sm:text-[10px] text-[#888888]">▼</span>
            </button>

            {isSortOpen && (
              <div className="absolute right-0 sm:left-0 top-full mt-1 w-36 sm:w-44 bg-white border border-[#888888]/40 rounded-[5px] shadow-lg z-30 py-1">
                {["Popular", "Price: Low to High", "Price: High to Low", "Newest"].map(
                  (opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortBy(opt);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-[12px] sm:text-[13px] text-[#555555] hover:bg-[#FFF9F0] hover:text-[#0E4A68] transition-colors cursor-pointer"
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Product Grid: 2 columns on mobile/tablet, 3 columns on desktop (matches responsivedeliver.png) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
        {filteredProducts.map((prod) => (
          <HotelDeliveriesCard
            key={prod.id}
            product={prod}
            locale={locale}
          />
        ))}
      </div>

      {/* ─── Pagination ─── */}
      <div className="flex items-center justify-center gap-3 mt-14 mb-8">
        {/* Page 1 (Active) */}
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer ${
            currentPage === 1
              ? "bg-[#0E4A68] text-white shadow-sm"
              : "border border-[#888888] text-[#555555] hover:border-[#0E4A68]"
          }`}
        >
          1
        </button>

        {/* Page 2 */}
        <button
          type="button"
          onClick={() => setCurrentPage(2)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer ${
            currentPage === 2
              ? "bg-[#0E4A68] text-white shadow-sm"
              : "border border-[#888888] text-[#555555] hover:border-[#0E4A68]"
          }`}
        >
          2
        </button>

        {/* Page 3 */}
        <button
          type="button"
          onClick={() => setCurrentPage(3)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer ${
            currentPage === 3
              ? "bg-[#0E4A68] text-white shadow-sm"
              : "border border-[#888888] text-[#555555] hover:border-[#0E4A68]"
          }`}
        >
          3
        </button>

        {/* Ellipsis button */}
        <div className="relative w-8 sm:w-10 h-7 sm:h-8 flex items-center justify-center">
          <Image
            src="/Hoteldeliveries/L-Move.svg"
            alt="More pages"
            width={38}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Next page arrow button */}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
          aria-label="Next page"
          className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer active:scale-95"
        >
          <Image
            src="/Hoteldeliveries/L-Move (1).svg"
            alt="Next page"
            width={32}
            height={32}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default HotelDeliveriesProducts;
