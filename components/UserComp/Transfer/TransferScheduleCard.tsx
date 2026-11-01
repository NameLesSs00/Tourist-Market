"use client";

import React, { useMemo } from "react";
import { FaClock, FaMinus, FaPlus } from "react-icons/fa6";
import { TransferTripType } from "@/models/transferBooking";

interface TransferScheduleCardProps {
  tripType: TransferTripType;
  tripDate: string;
  tripTime: string;
  returnDate?: string;
  returnTime?: string;
  additionalHours: number;
  additionalHourRate: number;
  vehicleName?: string;
  onTripDateChange: (date: string) => void;
  onTripTimeChange: (time: string) => void;
  onReturnDateChange?: (date: string) => void;
  onReturnTimeChange?: (time: string) => void;
  onAdditionalHoursChange: (hours: number) => void;
}

export function TransferScheduleCard({
  tripType,
  tripDate,
  tripTime,
  returnDate = "",
  returnTime = "",
  additionalHours = 0,
  additionalHourRate = 10,
  vehicleName,
  onTripDateChange,
  onTripTimeChange,
  onReturnDateChange,
  onReturnTimeChange,
  onAdditionalHoursChange,
}: TransferScheduleCardProps) {
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);
  const isRoundTrip = tripType === TransferTripType.RoundTrip;

  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 md:p-6 space-y-5 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
          Trip Schedule
        </h2>
        {isRoundTrip && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF5FA] text-[#0E4A68] border border-[#0E4A68]/30 self-start sm:self-auto">
            Round-Trip Outbound & Return
          </span>
        )}
      </div>

      {/* Outbound Trip Schedule */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider">
          {isRoundTrip ? "Outbound Pickup Schedule" : "Pickup Schedule"}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Trip Date *
            </label>
            <input
              type="date"
              min={todayStr}
              value={tripDate}
              onChange={(e) => onTripDateChange(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Trip Time *
            </label>
            <input
              type="time"
              value={tripTime}
              onChange={(e) => onTripTimeChange(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Return Trip Schedule (if Round-Trip) */}
      {isRoundTrip && (
        <div className="pt-4 border-t border-[#00000015] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider">
            Return Pickup Schedule
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Return Date *
              </label>
              <input
                type="date"
                min={tripDate || todayStr}
                value={returnDate}
                onChange={(e) => onReturnDateChange?.(e.target.value)}
                className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Return Time *
              </label>
              <input
                type="time"
                value={returnTime}
                onChange={(e) => onReturnTimeChange?.(e.target.value)}
                className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Additional Waiting Hours (Related to Car) */}
      <div className="pt-4 border-t border-[#00000015] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <FaClock className="w-4 h-4 text-[#0E4A68]" />
            <span className="text-xs sm:text-sm font-bold text-[#0E4A68]">
              Additional Waiting Hours (Optional)
            </span>
          </div>
          <span className="text-xs font-semibold text-[#0E4A68]/80 bg-[#EBF5FA] px-2.5 py-0.5 rounded-full border border-[#0E4A68]/20 self-start sm:self-auto">
            ${additionalHourRate.toFixed(2)}/hr {vehicleName ? `(${vehicleName})` : ""}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-[#00000030] rounded-[6px] overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => onAdditionalHoursChange(Math.max(0, additionalHours - 1))}
              disabled={additionalHours <= 0}
              className="w-10 h-10 flex items-center justify-center text-[#0E4A68] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Decrease additional hours"
            >
              <FaMinus className="w-3 h-3" />
            </button>
            <span className="w-12 text-center text-sm font-bold text-[#0E4A68]">
              {additionalHours}
            </span>
            <button
              type="button"
              onClick={() => onAdditionalHoursChange(Math.min(10, additionalHours + 1))}
              disabled={additionalHours >= 10}
              className="w-10 h-10 flex items-center justify-center text-[#0E4A68] hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              aria-label="Increase additional hours"
            >
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-xs text-[#0E4A68]/70">
            {additionalHours === 0
              ? "No extra waiting hours selected"
              : `+${additionalHours} hour${additionalHours > 1 ? "s" : ""} (+$${(additionalHours * additionalHourRate).toFixed(2)})`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransferScheduleCard;
