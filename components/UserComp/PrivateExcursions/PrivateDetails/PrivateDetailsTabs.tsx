"use client";

import React, { useState } from "react";
import {
  FiInfo,
  FiMapPin,
  FiStar,
  FiBriefcase,
  FiSlash,
  FiCheckCircle,
} from "react-icons/fi";
import { ItineraryItem } from "../types";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateDetailsTabsProps {
  title?: string;
  paragraphs?: string[];
  itinerary?: ItineraryItem[];
  highlights?: string[];
  whatToBring?: string[];
  cancellationPolicy?: string;
  locale?: string;
}

type TabKey = "description" | "itinerary" | "highlights" | "whatToBring" | "cancellation";

export function PrivateDetailsTabs({
  title = "Private Excursion Details",
  paragraphs = [],
  itinerary = [],
  highlights = [],
  whatToBring = [],
  cancellationPolicy = "Free cancellation up to 24 hours before the excursion start time.",
  locale = "en",
}: PrivateDetailsTabsProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.tabs;

  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: t.description || "Description", icon: <FiInfo size={18} /> },
    { key: "itinerary", label: t.itinerary || "Itinerary", icon: <FiMapPin size={18} /> },
    { key: "highlights", label: t.highlights || "Highlights", icon: <FiStar size={18} /> },
    { key: "whatToBring", label: t.whatToBring || "What to Bring", icon: <FiBriefcase size={18} /> },
    { key: "cancellation", label: t.cancellation || "Cancellation Policy", icon: <FiSlash size={18} /> },
  ];

  return (
    <div
      className="w-full bg-white rounded-2xl p-6 sm:p-8 font-poppins"
      style={{
        border: "0.8px solid #BBBBBB",
        boxShadow: "0px 2px 12px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* ─── TABS HEADER (Horizontally scrollable on responsive) ─── */}
      <div className="border-b border-[#E5E5E5] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 sm:gap-8 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2.5 pb-4 text-[15px] sm:text-[17px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#DE7423]"
                    : "text-[#000000] hover:text-[#DE7423]"
                }`}
              >
                <span className={isActive ? "text-[#DE7423]" : "text-[#000000]"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#DE7423] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className="pt-8">
        {/* TAB 1: DESCRIPTION */}
        {activeTab === "description" && (
          <div className="space-y-6">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-[#000000] leading-[1.25] tracking-tight">
              {title}
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#000000] leading-[1.75]">
              {paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#000000]">
              {t.itinerary || "Itinerary"}
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-[#DE7423]">
              {itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#DE7423] border-2 border-white ring-2 ring-[#DE7423]/20" />
                  <div className="text-xs sm:text-sm font-bold text-[#DE7423] uppercase tracking-wider mb-1">
                    {item.time}
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] font-bold text-[#000000] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#444444] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HIGHLIGHTS */}
        {activeTab === "highlights" && (
          <div className="space-y-6">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#000000]">
              {t.highlights || "Highlights"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/20"
                >
                  <FiCheckCircle
                    size={20}
                    className="text-[#DE7423] shrink-0 mt-0.5"
                  />
                  <span className="text-[15px] text-[#000000] font-medium leading-snug">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: WHAT TO BRING */}
        {activeTab === "whatToBring" && (
          <div className="space-y-6">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#000000]">
              {t.whatToBring || "What to Bring"}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {whatToBring.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#F9F9F9] border border-[#EEEEEE] text-[15px] text-[#000000]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#DE7423] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 5: CANCELLATION POLICY */}
        {activeTab === "cancellation" && (
          <div className="space-y-4">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#000000]">
              {t.cancellation || "Cancellation Policy"}
            </h2>
            <div className="p-5 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/30 text-[15px] text-[#000000] leading-relaxed">
              <p>{cancellationPolicy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrivateDetailsTabs;
