"use client";

import React from "react";
import { FiCalendar, FiUsers } from "react-icons/fi";

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
  maxParticipants?: number;
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
  maxParticipants,
}: BookingGuestsSelectorProps) {
  const totalGuests = adults + children + infants;
  const isCapped = typeof maxParticipants === "number" && maxParticipants > 0;
  const canAddMore = !isCapped || totalGuests < maxParticipants;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
          <FiCalendar className="text-[#DE7423]" />
          <span>1. Select Date & Guests</span>
        </h3>
        {isCapped ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E4A68] bg-[#0E4A680C] px-2.5 py-1 rounded-md">
            <FiUsers className="text-[#0E4A68]" />
            <span>Max {maxParticipants} guests ({totalGuests}/{maxParticipants})</span>
          </span>
        ) : null}
      </div>

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
              onClick={() => {
                if (canAddMore) onAdultsChange(adults + 1);
              }}
              disabled={!canAddMore}
              className={`w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] transition ${
                !canAddMore
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#E2E8F0] cursor-pointer"
              }`}
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
                onClick={() => {
                  if (canAddMore) onChildrenChange(children + 1);
                }}
                disabled={!canAddMore}
                className={`w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] transition ${
                  !canAddMore
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#E2E8F0] cursor-pointer"
                }`}
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
                onClick={() => {
                  if (canAddMore) onInfantsChange(infants + 1);
                }}
                disabled={!canAddMore}
                className={`w-10 h-10 rounded-lg border border-[#BBBBBB] bg-[#F8FAFC] text-base font-bold text-[#0E4A68] transition ${
                  !canAddMore
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[#E2E8F0] cursor-pointer"
                }`}
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
