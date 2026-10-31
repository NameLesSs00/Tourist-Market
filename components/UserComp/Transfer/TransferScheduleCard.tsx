"use client";

import React from "react";

interface TransferScheduleCardProps {
  tripDate: string;
  tripTime: string;
  onTripDateChange: (date: string) => void;
  onTripTimeChange: (time: string) => void;
}

export function TransferScheduleCard({
  tripDate,
  tripTime,
  onTripDateChange,
  onTripTimeChange,
}: TransferScheduleCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-5 md:p-6 space-y-4 font-poppins">
      <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
        Trip Schedule
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trip Date */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Trip Date *
          </label>
          <div className="relative">
            <input
              type="date"
              value={tripDate}
              onChange={(e) => onTripDateChange(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
            />
          </div>
        </div>

        {/* Trip Time */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Trip Time *
          </label>
          <div className="relative">
            <input
              type="time"
              value={tripTime}
              onChange={(e) => onTripTimeChange(e.target.value)}
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferScheduleCard;
