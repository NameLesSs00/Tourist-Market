"use client";

import React from "react";
import { FiCalendar, FiMinus, FiPlus, FiTag } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface BookingDateGuestsSelectorProps {
  date: string;
  onDateChange: (val: string) => void;
  tomorrowStr: string;
  dateError?: string;
  adults: number;
  onAdultsChange: (fn: (prev: number) => number) => void;
  children: number;
  onChildrenChange: (fn: (prev: number) => number) => void;
  infants: number;
  onInfantsChange: (fn: (prev: number) => number) => void;
  selectedAttractionNames: string[];
  maxAttractions: number;
  selectedServiceNames: string[];
  locale?: string;
}

export function BookingDateGuestsSelector({
  date,
  onDateChange,
  tomorrowStr,
  dateError,
  adults,
  onAdultsChange,
  children,
  onChildrenChange,
  infants,
  onInfantsChange,
  selectedAttractionNames,
  maxAttractions,
  selectedServiceNames,
  locale = "en",
}: BookingDateGuestsSelectorProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.bookingForm;
  const tGrid = dict.privateExcursions.grid;

  return (
    <div className="space-y-6">
      {/* 1. Date & Guests Selection */}
      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
          <FiCalendar className="text-[#DE7423]" />
          <span>{t.bookingDate || "1. Select Date & Guests"}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Excursion Date */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              {t.bookingDate || "Excursion Date"} *
            </label>
            <input
              type="date"
              required
              min={tomorrowStr}
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-[#0E4A68] focus:outline-none bg-white cursor-pointer transition-colors ${
                dateError
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#BBBBBB] focus:border-[#DE7423]"
              }`}
            />
            {dateError && (
              <p className="mt-1 text-xs text-red-500 font-medium leading-snug">
                {dateError}
              </p>
            )}
          </div>

          {/* Adults */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              {t.adults || tGrid.adult || "Adults"} *
            </label>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
              <button
                type="button"
                onClick={() => onAdultsChange((prev) => Math.max(1, prev - 1))}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiMinus size={12} />
              </button>
              <span className="text-sm font-bold text-[#0E4A68]">{adults}</span>
              <button
                type="button"
                onClick={() => onAdultsChange((prev) => prev + 1)}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiPlus size={12} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              {t.children || tGrid.child || "Children"}
            </label>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
              <button
                type="button"
                onClick={() => onChildrenChange((prev) => Math.max(0, prev - 1))}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiMinus size={12} />
              </button>
              <span className="text-sm font-bold text-[#0E4A68]">{children}</span>
              <button
                type="button"
                onClick={() => onChildrenChange((prev) => prev + 1)}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiPlus size={12} />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              {t.infants || tGrid.infant || "Infants"}
            </label>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
              <button
                type="button"
                onClick={() => onInfantsChange((prev) => Math.max(0, prev - 1))}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiMinus size={12} />
              </button>
              <span className="text-sm font-bold text-[#0E4A68]">{infants}</span>
              <button
                type="button"
                onClick={() => onInfantsChange((prev) => prev + 1)}
                className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
              >
                <FiPlus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Attractions & Extra Services Summary Pills */}
      <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/25 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-[#0E4A68] flex items-center gap-1.5">
            <FiTag className="text-[#DE7423]" />
            <span>
              {t.attractionsLabel || "Selected Attractions"} ({selectedAttractionNames.length} / {maxAttractions})
            </span>
          </span>
          <span className="text-[11px] text-[#646464]">
            {t.summary || "Included in your itinerary"}
          </span>
        </div>

        {selectedAttractionNames.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {selectedAttractionNames.map((name, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#DE7423]/40 text-xs font-medium text-[#0E4A68]"
              >
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#888888] italic">
            {t.noAttractionsSelected || `No attractions selected. You can go back to pick up to ${maxAttractions} attractions.`}
          </p>
        )}

        {selectedServiceNames.length > 0 && (
          <div className="pt-2 border-t border-[#DE7423]/15">
            <span className="text-xs font-bold text-[#0E4A68] block mb-1.5">
              {t.extraServicesLabel || "Extra Services"} ({selectedServiceNames.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedServiceNames.map((name, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#0E4A68]/30 text-xs font-medium text-[#0E4A68]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDateGuestsSelector;

