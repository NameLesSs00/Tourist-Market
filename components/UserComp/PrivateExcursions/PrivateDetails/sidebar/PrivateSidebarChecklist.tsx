"use client";

import React from "react";
import Image from "next/image";
import { FiCalendar, FiClock } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateSidebarChecklistProps {
  maxParticipants?: string;
  availability?: string;
  duration?: string;
  isReadyToBook: boolean;
  isDateValid: boolean;
  bookingDate: string;
  dateError?: string;
  hasAttractions: boolean;
  attractionsCount: number;
  handleScrollToDate: () => void;
  handleScrollToAttractions: () => void;
  handleBookClick: () => void;
  locale?: string;
}

export function PrivateSidebarChecklist({
  maxParticipants = "35 Person",
  availability,
  duration = "20 Hours",
  isReadyToBook,
  isDateValid,
  bookingDate,
  dateError,
  hasAttractions,
  attractionsCount,
  handleScrollToDate,
  handleScrollToAttractions,
  handleBookClick,
  locale = "en",
}: PrivateSidebarChecklistProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.sidebar;

  const buttonLabel = isReadyToBook
    ? t.bookNow || "Book Now"
    : !bookingDate || dateError
    ? t.selectDateToBook || "Select Date to Book"
    : t.selectAttractionToBook || "Select Attraction to Book";

  return (
    <div className="space-y-4">
      {/* 3 Circular Badges Row */}
      <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center">
          <div className="relative w-10 h-10 mb-1">
            <Image
              src="/PrivateExcursions/Privatedetails/Frame 585.svg"
              alt="Participants"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[12px] font-semibold text-[#666666]">
            {maxParticipants}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
            <FiCalendar size={18} />
          </div>
          <span className="text-[12px] font-semibold text-[#666666] truncate max-w-full">
            {availability || t.flexible || "Flexible"}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
            <FiClock size={18} />
          </div>
          <span className="text-[12px] font-semibold text-[#666666]">
            {duration}
          </span>
        </div>
      </div>

      {/* Booking Requirements Checklist Card */}
      <div className="p-3.5 rounded-lg bg-[#FFF8ED] border border-[#DE7423]/30 space-y-2.5">
        <div className="flex items-center justify-between text-[13px] font-bold text-[#0E4A68]">
          <span>{t.requiredToBook || "Required to Book"}</span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              isReadyToBook
                ? "bg-green-100 text-green-700"
                : "bg-[#DE7423]/15 text-[#DE7423]"
            }`}
          >
            {isReadyToBook ? t.ready || "Ready" : t.stepsMissing || "Steps Missing"}
          </span>
        </div>

        <div className="space-y-2 text-[12px]">
          {/* Step 1: Date */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {isDateValid ? (
                <svg
                  className="w-4 h-4 text-green-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-[#DE7423] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              <span
                className={
                  isDateValid
                    ? "text-green-700 font-medium truncate"
                    : "text-[#083952] font-medium truncate"
                }
              >
                {isDateValid
                  ? `${t.datePrefix || "Date"}: ${bookingDate}`
                  : dateError
                  ? dateError
                  : t.selectDate || "Select an excursion date"}
              </span>
            </div>
            {!isDateValid && (
              <button
                type="button"
                onClick={handleScrollToDate}
                className="text-[11px] font-semibold text-[#155F98] hover:underline shrink-0 cursor-pointer"
              >
                {dateError ? t.fix || "Fix" : t.pick || "Pick"}
              </button>
            )}
          </div>

          {/* Step 2: Attractions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {hasAttractions ? (
                <svg
                  className="w-4 h-4 text-green-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-[#DE7423] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              <span
                className={
                  hasAttractions
                    ? "text-green-700 font-medium truncate"
                    : "text-[#083952] font-medium truncate"
                }
              >
                {hasAttractions
                  ? `${attractionsCount} ${t.attractionsSelected || "attraction(s) selected"}`
                  : t.selectAttractionsPrompt || "Select at least 1 attraction"}
              </span>
            </div>
            {!hasAttractions && (
              <button
                type="button"
                onClick={handleScrollToAttractions}
                className="text-[11px] font-semibold text-[#155F98] hover:underline shrink-0 cursor-pointer"
              >
                {t.choose || "Choose"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        type="button"
        onClick={handleBookClick}
        className="w-full py-3.5 px-4 text-center font-bold text-[16px] text-white transition-all bg-[#DE7423] hover:bg-[#C9641B] active:scale-[0.99] shadow cursor-pointer rounded-[10px]"
        style={{
          border: "0.25px solid rgba(136, 136, 136, 0.8)",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default PrivateSidebarChecklist;

