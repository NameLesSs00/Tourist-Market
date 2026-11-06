"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { HotelDeliveriesCard, type HotelProduct } from "./HotelDeliveriesCard";
import { useClientProductsQuery } from "@/features/products/useClientProducts";
import { useCart } from "@/features/cart/useCart";
import type { ProductListItem } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

const PAGE_SIZE = 12;

type SortKey = "popular" | "priceAsc" | "priceDesc" | "newest";

const SORT_KEYS: SortKey[] = ["popular", "priceAsc", "priceDesc", "newest"];

// Scroll anchor for the results column: keeps the viewport at a stable position when the
// content above it changes height (page change, filter, sort).
const PRODUCTS_ANCHOR_ID = "hotel-deliveries-products";

function scrollToProducts() {
  if (typeof window === "undefined") return;
  const el = document.getElementById(PRODUCTS_ANCHOR_ID);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

interface HotelDeliveriesProductsProps {
  locale?: string;
  activeSubcategoryId?: number | null;
  onToggleFilter?: () => void;
}

export function HotelDeliveriesProducts({
  locale = "en",
  activeSubcategoryId = null,
  onToggleFilter,
}: HotelDeliveriesProductsProps) {
  const dict = useClientDictionary();
  const t = dict.hotelDeliveriesPage.products;
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  // first render must not trigger the anchoring scroll
  const didMountRef = useRef(true);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when subcategory or sort changes, and re-anchor the viewport only when the user
  // has already scrolled down past the top of the results
  useEffect(() => {
    setCurrentPage(1);
    if (didMountRef.current) {
      didMountRef.current = false;
      return;
    }
    const el = document.getElementById(PRODUCTS_ANCHOR_ID);
    if (el && el.getBoundingClientRect().top < 0) scrollToProducts();
  }, [activeSubcategoryId, sortKey]);

  // Query real products from backend API
  const { data, isLoading, isFetching, isPlaceholderData } = useClientProductsQuery({
    search: debouncedSearch.trim() || undefined,
    subCategoryId:
      activeSubcategoryId && activeSubcategoryId > 0
        ? activeSubcategoryId
        : undefined,
    sortBy: sortKey === "popular" ? undefined : sortKey,
    language: locale,
    pageNumber: currentPage,
    pageSize: PAGE_SIZE,
  });

  const products = data?.items || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  // Fixed-height status row: text only, so it can never move the grid when it updates
  const rangeFrom = (currentPage - 1) * PAGE_SIZE + 1;
  const rangeTo = Math.min(currentPage * PAGE_SIZE, totalCount);
  const showingRangeText = t.showingRange
    .replace("{from}", String(rangeFrom))
    .replace("{to}", String(rangeTo))
    .replace("{total}", String(totalCount));
  const pageIndicatorText = t.pageIndicator
    .replace("{current}", String(currentPage))
    .replace("{total}", String(totalPages));

  const goToPage = (page: number) => {
    if (isFetching) return;
    const target = Math.min(Math.max(page, 1), totalPages);
    if (target === currentPage) return;
    setCurrentPage(target);
    scrollToProducts();
  };

  // Apply sorting client-side as well to guarantee immediate & consistent ordering
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sortKey === "priceAsc") {
      return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }
    if (sortKey === "priceDesc") {
      return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    if (sortKey === "newest") {
      return list.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));
    }
    return list;
  }, [products, sortKey]);

  // Generate pagination buttons
  const paginationRange = useMemo(() => {
    const delta = 1;
    const range: number[] = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      range.unshift(-1);
    }
    if (currentPage + delta < totalPages - 1) {
      range.push(-2);
    }
    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }
    return range;
  }, [currentPage, totalPages]);

  return (
    <div
      id={PRODUCTS_ANCHOR_ID}
      className="flex-1 flex flex-col scroll-mt-24 font-poppins select-none w-full"
    >
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
              placeholder={t.searchPlaceholder}
              className="w-[110px] xs:w-[130px] sm:w-[220px] md:w-[260px] pl-1 sm:pl-3.5 pr-6 sm:pr-9 py-1 sm:py-1.5 text-[11px] sm:text-[13px] tracking-wide placeholder:text-[#888888] placeholder:tracking-wider outline-none text-[#555555] bg-transparent border-b border-[#CCCCCC] sm:border sm:border-[rgba(0,0,0,0.3)] rounded-none sm:rounded-[5px] focus:border-[#0E4A68]"
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

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={onToggleFilter}
            aria-label={t.ariaFilter}
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
            <span>{t.filter}</span>
          </button>
        </div>

        {/* Right on mobile: Sort by | Left on desktop: Sort by */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative order-2 lg:order-1 shrink-0">
          <span className="text-[12px] sm:text-[14px] text-[#555555] font-normal shrink-0">
            {t.sortBy}
          </span>

          <div ref={sortRef} className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex items-center justify-center sm:justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-[14px] text-[#555555] cursor-pointer min-w-[70px] sm:min-w-[140px] bg-white border border-[#888888] sm:border-[0.5px] rounded-[4px] sm:rounded-[5px] hover:border-[#0E4A68] transition-colors"
            >
              <span>{t.sortOptions[sortKey]}</span>
              <FiChevronDown
                size={14}
                className={`text-[#888888] transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 sm:left-0 top-full mt-1 w-36 sm:w-44 bg-white border border-[#888888]/40 rounded-[5px] shadow-lg z-30 py-1">
                {SORT_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSortKey(key);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] sm:text-[13px] transition-colors cursor-pointer ${
                      sortKey === key
                        ? "bg-[#FFF9F0] text-[#0E4A68] font-semibold"
                        : "text-[#555555] hover:bg-[#FFF9F0] hover:text-[#0E4A68]"
                    }`}
                  >
                    {t.sortOptions[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Results Status Row: fixed height, so updating it never moves the grid ─── */}
      <div
        aria-live="polite"
        className="h-5 mb-4 flex items-center justify-between gap-3 text-[11px] sm:text-[12px] text-[#64748B]"
      >
        <span className="min-w-0 truncate">
          {totalCount > 0 ? showingRangeText : "\u00A0"}
        </span>
        <span className="shrink-0">
          {totalCount > 0 ? pageIndicatorText : "\u00A0"}
        </span>
      </div>

      {/* ─── Content Area: height floor keeps the pagination pinned to the bottom on short pages ─── */}
      <div className="flex-1 min-h-[52vh] lg:min-h-[58vh]">
        {/* ─── Loading Skeletons ─── */}
        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={`prod-skel-${i}`} className="flex flex-col gap-2">
                <div className="aspect-square w-full rounded-[5px] bg-[#0E4A68]/10 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-[#0E4A68]/10 animate-pulse mt-1" />
                <div className="h-4 w-1/2 rounded bg-[#0E4A68]/10 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* ─── Empty State ─── */}
        {!isLoading && products.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#CBD5E1] p-12 text-center mt-6 bg-white/50">
            <p className="text-sm font-semibold text-[#0E4A68] mb-1">
              {t.emptyTitle}
            </p>
            <p className="text-xs text-[#64748B]">
              {debouncedSearch
                ? t.emptySearch.replace("{term}", debouncedSearch)
                : t.emptyCategory}
            </p>
          </div>
        )}

        {/* ─── Product Grid: 2 columns on mobile/tablet, 3 columns on desktop ─── */}
        {!isLoading && sortedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            aria-busy={isFetching}
            className={`grid grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 transition-opacity duration-300 ${
              isFetching && isPlaceholderData ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {sortedProducts.map((prod) => (
              <div key={`prod-${prod.id}`} className="h-full">
                <HotelDeliveriesCard
                  product={prod}
                  locale={locale}
                  onAddToCart={(item) => {
                    const isListItem = "subCategoryId" in item;
                    const p = item as ProductListItem;
                    let price = 0;
                    let unitName = "";
                    let image = "";

                    if (isListItem) {
                      price = Number(p.price || 0);
                      unitName = p.priceFor || "";
                      if (p.images && p.images.length > 0) {
                        const heroImg = p.images
                          .slice()
                          .sort((a, b) => a.displayOrder - b.displayOrder)[0];
                        image =
                          getBackendImageUrl(heroImg?.imageUrl) ||
                          heroImg?.imageUrl ||
                          "";
                      }
                    } else {
                      price =
                        parseFloat(
                          String((item as HotelProduct).price || "0").replace(
                            /[^0-9.]/g,
                            ""
                          )
                        ) || 0;
                      const raw = (item as HotelProduct).image || "";
                      image = getBackendImageUrl(raw) || raw;
                    }

                    addItem(
                      {
                        productId: Number(item.id),
                        title:
                          item.title ||
                          dict.hotelDeliveriesPage.details.productFallback,
                        price,
                        unitName,
                        image,
                        subCategoryId: isListItem ? p.subCategoryId : undefined,
                      },
                      1
                    );
                  }}
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading is announced through a live region that takes no layout space */}
        {isFetching && isPlaceholderData && (
          <span role="status" className="sr-only">
            {t.loadingProducts}
          </span>
        )}
      </div>

      {/* ─── Pagination: permanently mounted in a reserved slot so it never appears or disappears ─── */}
      {totalPages > 1 && !isLoading ? (
        <nav
          aria-label={t.ariaPagination}
          className="mt-auto pt-10 mb-8 flex items-center justify-center gap-2 sm:gap-3 min-h-[44px] sm:min-h-[48px]"
        >
          {/* Previous page arrow button */}
          <button
            type="button"
            disabled={currentPage <= 1 || isFetching}
            onClick={() => goToPage(currentPage - 1)}
            aria-label={t.ariaPreviousPage}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#888888] flex items-center justify-center text-[#555555] hover:border-[#0E4A68] hover:text-[#0E4A68] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <FiChevronLeft size={16} className="sm:hidden" />
            <FiChevronLeft size={18} className="hidden sm:block" />
          </button>

          {/* Numbered Page Buttons */}
          {paginationRange.map((pageItem, idx) => {
            if (pageItem < 0) {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-xs text-[#888888]"
                >
                  …
                </span>
              );
            }
            const isActive = currentPage === pageItem;
            return (
              <button
                key={`page-${pageItem}`}
                type="button"
                aria-current={isActive ? "page" : undefined}
                disabled={isFetching}
                onClick={() => goToPage(pageItem)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0E4A68] text-white shadow-sm"
                    : "border border-[#888888] text-[#555555] hover:border-[#0E4A68] hover:text-[#0E4A68] disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
              >
                {pageItem}
              </button>
            );
          })}

          {/* Next page arrow button */}
          <button
            type="button"
            disabled={currentPage >= totalPages || isFetching}
            onClick={() => goToPage(currentPage + 1)}
            aria-label={t.ariaNextPage}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#888888] flex items-center justify-center text-[#555555] hover:border-[#0E4A68] hover:text-[#0E4A68] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <FiChevronRight size={16} className="sm:hidden" />
            <FiChevronRight size={18} className="hidden sm:block" />
          </button>
        </nav>
      ) : (
        // same box height, no focusable controls: keeps the column length constant
        <div
          aria-hidden="true"
          className="mt-auto pt-10 mb-8 min-h-[44px] sm:min-h-[48px]"
        />
      )}
    </div>
  );
}

export default HotelDeliveriesProducts;
