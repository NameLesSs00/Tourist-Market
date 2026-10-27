"use client";

import React, { useState } from "react";
import { GroupExcursionDetail } from "../types";

interface GroupDetailsTabsProps {
  detail: GroupExcursionDetail;
}

type TabType =
  | "description"
  | "highlights"
  | "whatToBring"
  | "cancellation"
  | "literally"
  | "faq";

export function GroupDetailsTabs({ detail }: GroupDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const {
    aboutTitle,
    aboutParagraphs,
    highlights,
    whatToBring,
    cancellationPolicy,
    faqs,
    tourInfo,
  } = detail;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "description",
      label: "Description",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      id: "highlights",
      label: "Highlights",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: "whatToBring",
      label: "What to Bring",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "cancellation",
      label: "Cancellation Policy",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        </svg>
      ),
    },
  ];

  if (tourInfo.length > 0) {
    // Literally sits right after the Description tab.
    tabs.splice(1, 0, {
      id: "literally",
      label: "Literally",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    });
  }

  if (faqs.length > 0) {
    tabs.push({
      id: "faq",
      label: "FAQ",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 1-1 2-2 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    });
  }

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-4 sm:p-6 lg:p-7">
      {/* Tabs header: horizontally scrollable swipe container with hidden scrollbar for smooth mobile navigation */}
      <div className="w-full border-b border-[#BBBBBB]/70 overflow-hidden">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-none flex-nowrap whitespace-nowrap pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 shrink-0 whitespace-nowrap pb-3 font-poppins text-xs sm:text-sm md:text-base font-semibold transition-all relative cursor-pointer select-none ${
                  isActive
                    ? "text-[#0E4A68]"
                    : "text-[#646464] hover:text-[#0E4A68]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0E4A68] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels Content */}
      <div className="pt-5 sm:pt-7">
        {activeTab === "description" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
              {aboutTitle}
            </h2>
            <div className="space-y-3.5 sm:space-y-4 font-poppins text-xs sm:text-sm md:text-base text-[#0E4A68] leading-relaxed break-words">
              {aboutParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === "highlights" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
              Excursion Highlights
            </h2>
            <ul className="space-y-3 font-poppins text-xs sm:text-sm md:text-base text-[#0E4A68]">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#8CC63F] mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="leading-relaxed break-words">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "whatToBring" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
              What to Bring on This Tour
            </h2>
            <ul className="space-y-3 font-poppins text-xs sm:text-sm md:text-base text-[#0E4A68]">
              {whatToBring.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#0E4A68] mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="leading-relaxed break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "cancellation" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
              Cancellation & Refund Policy
            </h2>
            <div className="space-y-3 font-poppins text-xs sm:text-sm md:text-base text-[#0E4A68] leading-relaxed break-words">
              {cancellationPolicy.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="text-[#0E4A68] font-bold mt-0.5">•</span>
                  <span className="break-words">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "literally" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-4 sm:mb-5">
              Literally
            </h2>
            <div className="space-y-5 sm:space-y-6">
              {tourInfo.map((info, index) => {
                const valueLines = info.value
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean);
                const isTitle = info.label.toLowerCase() === "title";
                return (
                  <div key={index} className="space-y-1.5">
                    <h3
                      className={`font-poppins font-bold text-[#0E4A68] break-words ${
                        isTitle
                          ? "text-lg sm:text-xl lg:text-2xl"
                          : "text-sm sm:text-base lg:text-lg"
                      }`}
                    >
                      {info.label}
                    </h3>
                    {valueLines.length > 1 ? (
                      <ul className="space-y-1.5 pl-5 list-disc marker:text-[#165F84]">
                        {valueLines.map((line, lineIndex) => (
                          <li
                            key={lineIndex}
                            className="font-poppins text-xs sm:text-sm md:text-base text-[#444444] leading-relaxed break-words"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-poppins text-xs sm:text-sm md:text-base text-[#444444] leading-relaxed break-words">
                        {info.value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div>
            <h2 className="font-poppins text-lg sm:text-xl lg:text-2xl font-bold text-[#0E4A68] tracking-tight mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2.5 sm:space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-[10px] sm:rounded-[12px] border border-[#0E4A68]/25 bg-[#FFF8EF] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 text-left cursor-pointer"
                    >
                      <span className="font-poppins text-xs sm:text-sm md:text-base font-semibold text-[#0E4A68] break-words">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 text-[#0E4A68] transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4">
                        <p className="font-poppins text-xs sm:text-sm text-[#444444] leading-relaxed break-words">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupDetailsTabs;
