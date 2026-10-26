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

interface PrivateDetailsTabsProps {
  title?: string;
  paragraphs?: string[];
  itinerary?: ItineraryItem[];
  highlights?: string[];
  whatToBring?: string[];
  cancellationPolicy?: string;
}

type TabKey = "description" | "itinerary" | "highlights" | "whatToBring" | "cancellation";

export function PrivateDetailsTabs({
  title = "Beyond the Beaches: Uncovering the Secret Soul of Hurghada in 3 Hours",
  paragraphs = [
    "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures.",
    "Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life.",
    "The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture.",
    "A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler.",
  ],
  itinerary = [],
  highlights = [],
  whatToBring = [],
  cancellationPolicy = "Free cancellation up to 24 hours before the excursion start time.",
}: PrivateDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <FiInfo size={18} /> },
    { key: "itinerary", label: "Itinerary", icon: <FiMapPin size={18} /> },
    { key: "highlights", label: "Highlights", icon: <FiStar size={18} /> },
    { key: "whatToBring", label: "What to Bring", icon: <FiBriefcase size={18} /> },
    { key: "cancellation", label: "Cancellation Policy", icon: <FiSlash size={18} /> },
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
                {/* Active Underline */}
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
              Tour Itinerary Schedule
            </h2>
            <div className="relative pl-6 border-l-2 border-[#DE7423]/40 space-y-6 ml-3">
              {itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#DE7423] border-2 border-white shadow-sm" />
                  <span className="text-[13px] font-bold text-[#DE7423] uppercase tracking-wider block">
                    {item.time}
                  </span>
                  <h3 className="text-[17px] font-bold text-[#000000] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#444444] mt-1 leading-relaxed">
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
              Trip Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/20"
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
              What to Bring
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
              Cancellation & Refund Policy
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
