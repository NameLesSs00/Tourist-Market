"use client";

import React, { useState } from "react";
import { GroupExcursionDetail } from "../types";

interface GroupDetailsTabsProps {
  detail: GroupExcursionDetail;
}

type TabType = "description" | "itinerary" | "highlights" | "whatToBring" | "cancellation";

export function GroupDetailsTabs({ detail }: GroupDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const {
    aboutTitle,
    aboutParagraphs,
    itinerary,
    highlights,
    whatToBring,
    cancellationPolicy,
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
      id: "itinerary",
      label: "Itinerary",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
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

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-5 sm:p-6 lg:p-7">
      {/* Horizontal scrolling tabs header */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none border-b border-[#BBBBBB]/70">
        <div className="flex items-center gap-6 sm:gap-8 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3.5 font-poppins text-sm sm:text-base font-semibold transition-all relative cursor-pointer ${
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
      <div className="pt-6 sm:pt-7">
        {activeTab === "description" && (
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight mb-4">
              {aboutTitle}
            </h2>
            <div className="space-y-4 font-poppins text-sm sm:text-base text-[#0E4A68] leading-relaxed">
              {aboutParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight mb-5">
              Tour Itinerary Schedule
            </h2>
            <div className="relative border-l-2 border-[#0E4A68]/30 ml-3 pl-6 space-y-6">
              {itinerary.map((item, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#0E4A68] ring-4 ring-[#FFF8ED]" />
                  <span className="font-poppins text-xs font-bold text-[#165F84] uppercase tracking-wide">
                    {item.time}
                  </span>
                  <h3 className="font-poppins text-base font-bold text-[#0E4A68] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-sm text-[#444444] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "highlights" && (
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight mb-4">
              Excursion Highlights
            </h2>
            <ul className="space-y-3 font-poppins text-sm sm:text-base text-[#0E4A68]">
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
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "whatToBring" && (
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight mb-4">
              What to Bring on This Tour
            </h2>
            <ul className="space-y-3 font-poppins text-sm sm:text-base text-[#0E4A68]">
              {whatToBring.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#0E4A68] mt-1 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "cancellation" && (
          <div>
            <h2 className="font-poppins text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight mb-4">
              Cancellation & Refund Policy
            </h2>
            <div className="space-y-3 font-poppins text-sm sm:text-base text-[#0E4A68] leading-relaxed">
              {cancellationPolicy.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#0E4A68] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupDetailsTabs;
