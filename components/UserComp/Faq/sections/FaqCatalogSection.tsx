"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";
import { useClientFaqsQuery } from "@/features/faq/useClientFaqs";
import {
  FaqAccordionItem,
  FaqAnswerPanel,
  FaqHelpCard,
  FaqSkeleton,
} from "@/components/UserComp/Home/components";

interface FaqCatalogSectionProps {
  locale?: string;
  showSearch?: boolean;
}

export function FaqCatalogSection({
  locale = "en",
  showSearch = true,
}: FaqCatalogSectionProps) {
  const dict = getDictionary(locale);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Fetch full FAQ catalog for the dedicated FAQ page
  const { items, isLoading, isError, refetch } = useClientFaqsQuery(
    { pageSize: 50 },
    locale
  );

  // Client-side real-time keyword filtering
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  // Keep active selected item valid
  useEffect(() => {
    if (filteredItems.length > 0 && !selectedId) {
      setSelectedId(filteredItems[0].id || filteredItems[0].question);
    }
  }, [filteredItems, selectedId]);

  const activeItem = useMemo(() => {
    if (!selectedId) return filteredItems[0] ?? null;
    return (
      filteredItems.find(
        (item) => (item.id || item.question) === selectedId
      ) ?? (filteredItems[0] ?? null)
    );
  }, [filteredItems, selectedId]);

  // Handle native scroll and update dynamic crescent contour
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const targetTop = e.currentTarget.scrollTop;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setScrollTop(targetTop);
    });
  };

  // Dynamic crescent arc offset matching FAQDesktop.png:
  // Card 0: 0px, Card 1: 65px, Card 2 (Apex): 92px, Card 3: 65px, Card 4: 0px
  const getCurveOffset = (index: number) => {
    const ITEM_HEIGHT = 102;
    const APEX_CENTER = 248; // Position of Card 2 center
    const HALF_SPAN = 204;   // Distance to Card 0 / Card 4 center

    const itemCenterY = index * ITEM_HEIGHT + 44;
    const relativeY = itemCenterY - scrollTop;
    const distFromCenter = Math.abs(relativeY - APEX_CENTER);

    if (distFromCenter >= HALF_SPAN) return 0;

    const normalized = distFromCenter / HALF_SPAN; // 0 at apex, 1 at edge
    const curveFactor = Math.max(0, 1 - Math.pow(normalized, 1.8));
    return Math.round(curveFactor * 92);
  };

  const scrollByAmount = (amount: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: amount, behavior: "smooth" });
  };

  const hasManyItems = filteredItems.length > 5;
  const isSearchActive = showSearch && searchQuery.trim().length > 0;
  const mobileDisplayItems = mobileExpanded || isSearchActive
    ? filteredItems
    : filteredItems.slice(0, 5);

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF2DF] font-poppins py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Real-time Search & Filter Input */}
        {showSearch && !isError && (
          <div className="mt-2 mb-8 max-w-md mx-auto">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[#0E4A6880] pointer-events-none">
                <FiSearch className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                disabled={isLoading}
                className="w-full h-11 pl-11 pr-16 rounded-full border border-[#0E4A6833] bg-[#FFF8EF] font-poppins text-sm text-[#0E4A68] placeholder:text-[#0E4A6860] focus:outline-none focus:border-[#D48C28] focus:ring-2 focus:ring-[#D48C2826] transition-all shadow-2xs disabled:opacity-60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 text-[#0E4A6880] hover:text-[#0E4A68] text-xs font-semibold p-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery && !isLoading && (
              <p className="text-center font-poppins text-xs text-[#0E4A6899] mt-2">
                Showing {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
              </p>
            )}
          </div>
        )}

        {/* 1. Loading State */}
        {isLoading && <FaqSkeleton />}

        {/* 2. Error State */}
        {!isLoading && isError && (
          <div className="mt-12 mx-auto max-w-xl rounded-2xl border border-[#0E4A6840] bg-[#FFF8EF] p-8 text-center shadow-xs">
            <h3 className="font-poppins text-lg font-semibold text-[#0E4A68]">
              Unable to load frequently asked questions
            </h3>
            <p className="mt-2 text-sm text-[#0E4A6899]">
              Something went wrong while fetching FAQs from the server.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#0E4A68] px-6 py-2.5 font-poppins text-sm font-medium text-white shadow-sm transition hover:bg-[#083952] active:scale-95 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* 3. Empty Catalog State */}
        {!isLoading && !isError && items.length === 0 && (
          <div className="mt-12 mx-auto max-w-xl rounded-2xl border border-[#0E4A6833] bg-[#FFF8EF] p-8 text-center shadow-xs">
            <h3 className="font-poppins text-lg font-semibold text-[#0E4A68]">
              No Questions Available
            </h3>
            <p className="mt-2 text-sm text-[#0E4A6899]">
              Frequently asked questions are currently being updated. If you
              have any inquiries, feel free to contact us directly.
            </p>
            <div className="mt-5 flex justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-xl bg-[#0E4A68] px-6 py-2.5 font-poppins text-sm font-medium text-white shadow-sm transition hover:bg-[#083952] active:scale-95 cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}

        {/* 3.1 No Search Results Match */}
        {!isLoading && !isError && items.length > 0 && filteredItems.length === 0 && (
          <div className="mt-10 mx-auto max-w-md rounded-2xl border border-[#0E4A6826] bg-[#FFF8EF] p-8 text-center shadow-xs">
            <p className="font-poppins text-base font-semibold text-[#0E4A68]">
              No questions found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#0E4A68] px-5 py-2 font-poppins text-xs font-medium text-white shadow-sm transition hover:bg-[#083952] active:scale-95 cursor-pointer"
            >
              Show All Questions
            </button>
          </div>
        )}

        {/* 4. Live Data State */}
        {!isLoading && !isError && filteredItems.length > 0 && (
          <>
            {/* Desktop View (>= 1280px): 3 Columns with Scrollable Crescent Viewport */}
            <div className="mt-8 hidden xl:flex xl:items-start xl:justify-between xl:gap-3 2xl:gap-6">
              {/* Left Column: Help Card - Sticky Pinned */}
              <div className="w-[350px] 2xl:w-[380px] shrink-0 sticky top-28 self-start">
                <FaqHelpCard dict={dict} currentLocale={locale} />
              </div>

              {/* Center Column: Scrollable Viewport with Dynamic Contour & All Questions */}
              <div className="w-[520px] 2xl:w-[560px] shrink-0 xl:-ml-4 2xl:-ml-6 flex flex-col">
                {/* Crescent Header: Title + Quick Scroll Chevrons (no total count) */}
                {hasManyItems && (
                  <div className="flex items-center justify-between pb-3 px-3 text-xs text-[#0E4A6899] select-none">
                    <span className="font-medium text-[#0E4A68]">
                      Frequently Asked Questions
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => scrollByAmount(-102)}
                        aria-label="Scroll up"
                        className="h-7 w-7 rounded-full border border-[#0E4A6833] bg-[#FFF8EF] flex items-center justify-center transition-all hover:bg-[#0E4A68] hover:text-white text-[#0E4A68] shadow-2xs cursor-pointer active:scale-95"
                      >
                        <FiChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollByAmount(102)}
                        aria-label="Scroll down"
                        className="h-7 w-7 rounded-full border border-[#0E4A6833] bg-[#FFF8EF] flex items-center justify-center transition-all hover:bg-[#0E4A68] hover:text-white text-[#0E4A68] shadow-2xs cursor-pointer active:scale-95"
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Native Scrollable Viewport with Dynamic Circle Contour */}
                <div
                  ref={containerRef}
                  onScroll={handleScroll}
                  className="faq-scrollbar overflow-y-auto overflow-x-hidden max-h-[524px] pl-10 pr-2 py-1 space-y-3.5 select-none scroll-smooth snap-y snap-mandatory"
                >
                  {filteredItems.map((item, index) => {
                    const isCurrentActive =
                      (item.id || item.question) ===
                      (activeItem?.id || activeItem?.question);

                    const offset = getCurveOffset(index);

                    return (
                      <div
                        key={item.id || item.question || index}
                        style={{
                          transform: `translateX(${offset}px)`,
                          transition: "transform 0.15s ease-out",
                        }}
                        className="w-[370px] 2xl:w-[400px] snap-start will-change-transform"
                      >
                        <FaqAccordionItem
                          item={item}
                          isOpen={isCurrentActive}
                          onToggle={() =>
                            setSelectedId(item.id || item.question)
                          }
                          isDesktop
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Solution Callout Box - Sticky Pinned */}
              <div className="flex-1 max-w-[420px] 2xl:max-w-[450px] sticky top-28 self-start">
                <FaqAnswerPanel item={activeItem ?? undefined} />
              </div>
            </div>

            {/* Tablet & Mobile View (< 1280px): Clean Vertical Accordion Stack */}
            <div className="mt-8 xl:hidden">
              <div className="mx-auto max-w-2xl space-y-3.5">
                {mobileDisplayItems.map((item, index) => {
                  const isCurrentActive =
                    (item.id || item.question) ===
                    (activeItem?.id || activeItem?.question);

                  return (
                    <FaqAccordionItem
                      key={item.id || item.question || index}
                      item={item}
                      isOpen={isCurrentActive}
                      onToggle={() => {
                        setSelectedId((prev) =>
                          prev === (item.id || item.question)
                            ? null
                            : item.id || item.question
                        );
                      }}
                      isDesktop={false}
                    />
                  );
                })}
              </div>

              {/* Show More / Show Less Toggle (no total count numbers) */}
              {!isSearchActive && filteredItems.length > 5 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => !prev)}
                    className="inline-flex items-center justify-center rounded-xl border border-[#0E4A6840] bg-[#FFF8EF] px-5 py-2.5 font-poppins text-xs font-semibold text-[#0E4A68] shadow-2xs hover:bg-[#0E4A68] hover:text-white transition-colors cursor-pointer"
                  >
                    {mobileExpanded ? "Show Less" : "View All FAQs"}
                  </button>
                </div>
              )}

              {/* Centered Help Card below questions */}
              <div className="mt-8 flex justify-center">
                <FaqHelpCard dict={dict} currentLocale={locale} isMobile />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FaqCatalogSection;
