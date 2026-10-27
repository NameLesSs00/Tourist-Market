"use client";

import React from "react";
import { GroupExcursionDetail } from "../types";

interface GroupDetailsIncludesProps {
  detail: GroupExcursionDetail;
}

export function GroupDetailsIncludes({ detail }: GroupDetailsIncludesProps) {
  const { priceIncludes, priceExcludes } = detail;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
      {/* 1. Price Includes Card */}
      <div className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-4 sm:p-6 flex flex-col justify-start">
        <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-[#BBBBBB]/60 mb-4 sm:mb-5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0E4A68] text-white shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-poppins text-base sm:text-lg lg:text-xl font-bold text-[#0E4A68]">
            Price Includes
          </h3>
        </div>

        <ul className="space-y-2.5 sm:space-y-3 font-poppins text-xs sm:text-sm text-[#000000] leading-relaxed">
          {priceIncludes.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="font-bold text-[#0E4A68] mt-0.5 shrink-0">•</span>
              <span className="break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Price Excludes Card */}
      <div className="w-full bg-[#FFFFFF] rounded-[12px] border-[0.8px] border-[#BBBBBB] p-4 sm:p-6 flex flex-col justify-start">
        <div className="flex items-center gap-2.5 pb-3 sm:pb-4 border-b border-[#BBBBBB]/60 mb-4 sm:mb-5">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E53E3E] text-white shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="font-poppins text-base sm:text-lg lg:text-xl font-bold text-[#0E4A68]">
            Price Excludes
          </h3>
        </div>

        <div className="space-y-3 sm:space-y-3.5 font-poppins text-xs sm:text-sm text-[#000000] leading-relaxed">
          {/* Round trip transfer */}
          <div>
            <div className="font-bold text-[#000000] flex items-center gap-2">
              <span className="shrink-0">•</span>
              <span className="break-words">Round trip transfer:</span>
            </div>
            <ul className="pl-5 space-y-1 mt-1 text-[#333333]">
              {priceExcludes.roundTripTransfer.map((subItem, sIdx) => (
                <li key={sIdx} className="list-disc list-inside break-words">
                  {subItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Entrance inside pyramids */}
          <div>
            <div className="font-bold text-[#000000] flex items-center gap-2">
              <span className="shrink-0">•</span>
              <span className="break-words">Entrance inside the Pyramids:</span>
            </div>
            <ul className="pl-5 space-y-1 mt-1 text-[#333333]">
              {priceExcludes.entranceTickets.map((ticket, tIdx) => (
                <li key={tIdx} className="list-disc list-inside break-words">
                  {ticket}
                </li>
              ))}
            </ul>
          </div>

          {/* Other excluded items */}
          {priceExcludes.other.map((item, oIdx) => (
            <div key={oIdx} className="flex items-start gap-2.5">
              <span className="font-bold text-[#0E4A68] mt-0.5 shrink-0">•</span>
              <span className="break-words">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsIncludes;
