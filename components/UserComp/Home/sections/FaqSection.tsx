"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getDictionary } from "@/shared/utils/getDictionary";
import { useClientFaqsQuery } from "@/features/faq/useClientFaqs";
import {
  FaqHeader,
  FaqAccordionItem,
  FaqAnswerPanel,
  FaqHelpCard,
  FaqSkeleton,
} from "../components";

interface FaqSectionProps {
  locale?: string;
}

// Static circle arc offsets for homepage matching FAQDesktop.png:
const HOMEPAGE_STAGGER = [
  "xl:ml-0",
  "xl:ml-14 2xl:ml-16",
  "xl:ml-24 2xl:ml-28",
  "xl:ml-14 2xl:ml-16",
  "xl:ml-0",
];

export function FaqSection({ locale = "en" }: FaqSectionProps) {
  const dict = getDictionary(locale);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Fetch strictly 5 questions for the homepage to minimize payload size
  const { items, isLoading, isError, refetch } = useClientFaqsQuery(
    { pageSize: 5 },
    locale
  );

  const displayItems = useMemo(() => items.slice(0, 5), [items]);

  // Keep active selected item valid
  useEffect(() => {
    if (displayItems.length > 0 && !selectedId) {
      setSelectedId(displayItems[0].id || displayItems[0].question);
    }
  }, [displayItems, selectedId]);

  const activeItem = useMemo(() => {
    if (!selectedId) return displayItems[0] ?? null;
    return (
      displayItems.find(
        (item) => (item.id || item.question) === selectedId
      ) ?? (displayItems[0] ?? null)
    );
  }, [displayItems, selectedId]);

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF2DF] font-poppins py-14 lg:py-20">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FaqHeader dict={dict} />

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
        {!isLoading && !isError && displayItems.length === 0 && (
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

        {/* 4. Live Data State */}
        {!isLoading && !isError && displayItems.length > 0 && (
          <>
            {/* Desktop View (>= 1280px): Clean 3-Column Static Crescent Arc Layout */}
            <div className="mt-8 hidden xl:flex xl:items-start xl:justify-between xl:gap-3 2xl:gap-6">
              {/* Left Column: Help Card - Sticky Pinned */}
              <div className="w-[350px] 2xl:w-[380px] shrink-0 sticky top-28 self-start">
                <FaqHelpCard dict={dict} currentLocale={locale} />
              </div>

              {/* Center Column: Questions in Static Crescent Arc */}
              <div className="flex-1 max-w-[490px] 2xl:max-w-[530px] xl:-ml-6 2xl:-ml-8 space-y-4 overflow-visible">
                {displayItems.map((item, index) => {
                  const isCurrentActive =
                    (item.id || item.question) ===
                    (activeItem?.id || activeItem?.question);

                  return (
                    <FaqAccordionItem
                      key={item.id || item.question || index}
                      item={item}
                      isOpen={isCurrentActive}
                      onToggle={() =>
                        setSelectedId(item.id || item.question)
                      }
                      className={HOMEPAGE_STAGGER[index] ?? ""}
                      isDesktop
                    />
                  );
                })}

                {/* View All FAQs Link (No question count) */}
                <div className="pt-3 flex justify-center">
                  <Link
                    href={`/${locale}/faq`}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#0E4A6840] bg-[#FFF8EF] px-5 py-2.5 font-poppins text-xs font-semibold text-[#0E4A68] shadow-2xs hover:bg-[#0E4A68] hover:text-white transition-all cursor-pointer"
                  >
                    <span>View All FAQs</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
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
                {displayItems.map((item, index) => {
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

              {/* View All FAQs Link on Mobile (No question count) */}
              <div className="mt-6 flex justify-center">
                <Link
                  href={`/${locale}/faq`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#0E4A6840] bg-[#FFF8EF] px-5 py-2.5 font-poppins text-xs font-semibold text-[#0E4A68] shadow-2xs hover:bg-[#0E4A68] hover:text-white transition-all cursor-pointer"
                >
                  <span>View All FAQs</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

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

export default FaqSection;
