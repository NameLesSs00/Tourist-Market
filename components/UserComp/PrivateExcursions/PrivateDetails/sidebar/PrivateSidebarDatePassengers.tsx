"use client";

import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface PrivateSidebarDatePassengersProps {
  tomorrowStr: string;
  bookingDate: string;
  setBookingDate: (date: string) => void;
  dateError?: string;
  adults: number;
  setAdults: (fn: (prev: number) => number) => void;
  children: number;
  setChildren: (fn: (prev: number) => number) => void;
  infants: number;
  setInfants: (fn: (prev: number) => number) => void;
  isVehicleLoading: boolean;
  matchedVehicle?: {
    vehicleName: string;
    from: number;
    to: number;
    price: number;
    currency: string;
  } | null;
  locale?: string;
}

export function PrivateSidebarDatePassengers({
  tomorrowStr,
  bookingDate,
  setBookingDate,
  dateError,
  adults,
  setAdults,
  children,
  setChildren,
  infants,
  setInfants,
  isVehicleLoading,
  matchedVehicle,
  locale = "en",
}: PrivateSidebarDatePassengersProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions.details.sidebar;

  return (
    <div className="space-y-5">
      {/* Booking Date */}
      <div>
        <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
          {t.bookingDate || "Booking Date"}
        </label>
        <div className="relative">
          <input
            id="private-booking-date-input"
            type="date"
            min={tomorrowStr}
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#083952] focus:outline-none bg-white cursor-pointer transition-colors ${
              dateError
                ? "border-red-500 focus:border-red-500"
                : "border-[#BBBBBB] focus:border-[#DE7423]"
            }`}
          />
        </div>
        {dateError && (
          <p className="mt-1 text-xs text-red-500 font-medium leading-snug">
            {dateError}
          </p>
        )}
      </div>

      {/* Passenger Steppers */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Adult */}
        <div
          className="flex flex-col items-center p-2.5 rounded-lg bg-white"
          style={{ border: "0.8px solid #CCCCCC" }}
        >
          <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                fill="#DE7423"
              />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#0E4A68]">
            {t.adult || "Adult"}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiMinus size={12} />
            </button>
            <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => setAdults((prev) => prev + 1)}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiPlus size={12} />
            </button>
          </div>
        </div>

        {/* Child */}
        <div
          className="flex flex-col items-center p-2.5 rounded-lg bg-white"
          style={{ border: "0.8px solid #CCCCCC" }}
        >
          <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
            <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
              <path
                d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                fill="#DE7423"
              />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#0E4A68]">
            {t.child || "Child"}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiMinus size={12} />
            </button>
            <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
              {children}
            </span>
            <button
              type="button"
              onClick={() => setChildren((prev) => prev + 1)}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiPlus size={12} />
            </button>
          </div>
        </div>

        {/* Infant */}
        <div
          className="flex flex-col items-center p-2.5 rounded-lg bg-white"
          style={{ border: "0.8px solid #CCCCCC" }}
        >
          <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
            <svg width="10" height="13" viewBox="0 0 14 18" fill="none">
              <path
                d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                fill="#DE7423"
              />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-[#0E4A68]">
            {t.infant || "Infant"}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiMinus size={12} />
            </button>
            <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
              {infants}
            </span>
            <button
              type="button"
              onClick={() => setInfants((prev) => prev + 1)}
              className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
            >
              <FiPlus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Row */}
      <div>
        <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
          {t.vehicleType || "Vehicle Type"}
        </label>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-lg bg-white min-h-[52px]"
          style={{ border: "0.8px solid #BBBBBB" }}
        >
          {isVehicleLoading ? (
            <div className="flex items-center gap-2 text-[13px] text-gray-400">
              <div className="w-4 h-4 border-2 border-[#DE7423] border-t-transparent rounded-full animate-spin" />
              <span>{t.checkingVehicle || "Checking availability..."}</span>
            </div>
          ) : matchedVehicle ? (
            <>
              <div className="flex items-center gap-2">
                <svg
                  className="w-8 h-6 text-[#0E4A68] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 17h8M5 11l2-5h10l2 5M3 13v6h2v-2h14v2h2v-6l-2-2H5l-2 2z"
                  />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
                <div>
                  <span className="text-[14px] font-semibold text-[#0E4A68] block">
                    {matchedVehicle.vehicleName}
                  </span>
                  <span className="text-[12px] text-gray-500">
                    {matchedVehicle.from}-{matchedVehicle.to} {t.passengers || "Passengers"}
                  </span>
                </div>
              </div>
              <span className="text-[16px] font-bold text-[#DE7423]">
                {matchedVehicle.price} {matchedVehicle.currency}
              </span>
            </>
          ) : (
            <span className="text-[13px] text-gray-400 italic">
              {t.noVehicle || "No vehicle available for this passenger count"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrivateSidebarDatePassengers;

