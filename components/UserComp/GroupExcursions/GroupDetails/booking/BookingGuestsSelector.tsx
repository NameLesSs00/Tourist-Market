"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";

interface BookingGuestsSelectorProps {
  date: string;
  onDateChange: (val: string) => void;
  minDate: string;
  adults: number;
  onAdultsChange: (val: number) => void;
  adultPrice: number;
  children: number;
  onChildrenChange: (val: number) => void;
  childPrice: number;
  infants: number;
  onInfantsChange: (val: number) => void;
  infantPrice: number;
}

export function BookingGuestsSelector({
  date,
  onDateChange,
  minDate,
  adults,
  onAdultsChange,
  adultPrice,
  children,
  onChildrenChange,
  childPrice,
  infants,
  onInfantsChange,
  infantPrice,
}: BookingGuestsSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiCalendar className="text-[#DE7423]" />
        <span>1. Select Date & Guests</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Trip Date */}
        <div>
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            Excursion Date *
          </label>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
          />
        </div>

        {/* Adults Stepper */}
        <div>
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            Adults (${adultPrice.toFixed(2)}/person) *
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
            >
              -
            </button>
            <span className="flex-1 text-center font-bold text-sm text-[#0E4A68]">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Children Stepper */}
        {childPrice > 0 && (
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              Children 5-11.99 (${childPrice.toFixed(2)}/child)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChildrenChange(Math.max(0, children - 1))}
                className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center font-bold text-sm text-[#0E4A68]">
                {children}
              </span>
              <button
                type="button"
                onClick={() => onChildrenChange(children + 1)}
                className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Infants Stepper */}
        {infantPrice > 0 && (
          <div>
            <label className="block text-xs font-semibold text-[#083952] mb-1">
              Infants 0-4.99 (${infantPrice.toFixed(2)}/infant)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onInfantsChange(Math.max(0, infants - 1))}
                className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center font-bold text-sm text-[#0E4A68]">
                {infants}
              </span>
              <button
                type="button"
                onClick={() => onInfantsChange(infants + 1)}
                className="w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] hover:bg-[#E2E8F0] cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
