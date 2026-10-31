"use client";

import React, { useState } from "react";
import { GroupExcursionDetail } from "../types";
import { NeedHelpCard } from "@/components/UserComp/Shared/NeedHelpCard";

interface GroupDetailsBookingSidebarProps {
  detail: GroupExcursionDetail;
  onBookNow?: () => void;
}

export function GroupDetailsBookingSidebar({
  detail,
  onBookNow,
}: GroupDetailsBookingSidebarProps) {
  const {
    adultPrice,
    childPrice,
    infantPrice,
    availability,
    maxParticipants,
    dateType,
    duration,
  } = detail;

  const [adultCount] = useState(1);
  const [childCount] = useState(0);
  const [infantCount] = useState(0);

  const totalPrice =
    adultCount * adultPrice + childCount * childPrice + infantCount * infantPrice;

  const pricingTiers = [
    {
      id: "adult",
      title: "Adult",
      sub: null,
      price: adultPrice,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E4A68] mx-auto mb-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      id: "child",
      title: "Child",
      sub: "(5 - 11.99)",
      price: childPrice,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E4A68] mx-auto mb-1 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2 0-6 1-6 3v2h12v-2c0-2-4-3-6-3z" />
        </svg>
      ),
    },
    {
      id: "infant",
      title: "Infant",
      sub: "(0 - 4.99)",
      price: infantPrice,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E4A68] mx-auto mb-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
  ].filter((tier) => tier.price > 0);

  const gridColsClass =
    pricingTiers.length === 1
      ? "grid-cols-1"
      : pricingTiers.length === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <aside className="w-full space-y-4 sm:space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* 1. Booking Card */}
      <div className="w-full bg-[#FFFFFF] rounded-[10px] border-[0.5px] border-[#888888] overflow-hidden shadow-sm">
        {/* Header bar */}
        <div className="bg-[#0E4A68] text-white px-3.5 sm:px-4 py-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="font-poppins text-sm sm:text-base font-bold">
            Book This Excursion
          </span>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-5">
          {/* Participant Pricing Boxes */}
          {pricingTiers.length > 0 && (
            <div className={`grid ${gridColsClass} gap-2 sm:gap-2.5`}>
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="border border-[#E5E5E5] rounded-[8px] p-2 sm:p-2.5 text-center flex flex-col justify-between items-center bg-[#FDFDFD] min-w-0"
                >
                  {tier.icon}
                  <div className="font-poppins text-[10px] sm:text-xs font-semibold text-[#0E4A68] truncate w-full">
                    {tier.title}
                    {tier.sub && (
                      <span className="block text-[8px] sm:text-[9px] text-[#646464] font-normal leading-tight">
                        {tier.sub}
                      </span>
                    )}
                  </div>
                  <div className="font-poppins text-xs sm:text-sm md:text-base font-bold text-[#0E4A68] mt-0.5 truncate">
                    ${tier.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Availability line */}
          <div className="my-3.5 sm:my-4 pt-3 border-t border-[#BBBBBB]/50 flex items-center gap-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0E4A68] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className="min-w-0">
              <div className="font-poppins text-[10px] sm:text-[11px] text-[#646464]">Available</div>
              <div className="font-poppins text-xs sm:text-sm font-bold text-[#0E4A68] truncate">
                {availability}
              </div>
            </div>
          </div>

          {/* 3 Stats line */}
          <div className="my-3.5 sm:my-4 pt-3 border-t border-[#BBBBBB]/50 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            {/* Max Participants */}
            <div className="flex flex-col items-center min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="font-poppins text-[9px] sm:text-[10px] text-[#646464] leading-tight truncate w-full">Max Guests</div>
              <div className="font-poppins text-[11px] sm:text-xs font-bold text-[#0E4A68] mt-0.5 truncate w-full">
                {maxParticipants && maxParticipants > 0
                  ? `${maxParticipants} ${maxParticipants === 1 ? "Person" : "Persons"}`
                  : "Flexible"}
              </div>
            </div>

            {/* Date Type */}
            <div className="flex flex-col items-center min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="font-poppins text-[9px] sm:text-[10px] text-[#646464] leading-tight truncate w-full">Date Type</div>
              <div className="font-poppins text-[11px] sm:text-xs font-bold text-[#0E4A68] mt-0.5 truncate w-full">
                {dateType}
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0E4A68] text-white flex items-center justify-center mb-1 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="font-poppins text-[9px] sm:text-[10px] text-[#646464] leading-tight truncate w-full">Duration</div>
              <div className="font-poppins text-[11px] sm:text-xs font-bold text-[#0E4A68] mt-0.5 truncate w-full">
                {duration}
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            type="button"
            onClick={onBookNow}
            className="w-full mt-3 sm:mt-4 py-3 bg-[#0E4A68] hover:bg-[#09354b] active:scale-[0.99] text-[#FFFFFF] font-poppins text-sm sm:text-base font-bold rounded-[10px] transition-all cursor-pointer shadow-sm"
            style={{
              border: "0.25px solid #000000",
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* 2. Need Help Section Card */}
      <NeedHelpCard />
    </aside>
  );
}

export default GroupDetailsBookingSidebar;
