"use client";

import React, { useRef } from "react";
import Image from "next/image";

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
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  // Compute today in YYYY-MM-DD once — prevents user picking past dates (API rejects them with 400)
  const todayStr = new Date().toISOString().split("T")[0];

  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.focus();
      try {
        if ("showPicker" in HTMLInputElement.prototype) {
          dateInputRef.current.showPicker();
        }
      } catch {
        // Fallback to standard focus
      }
    }
  };

  const handleTimeContainerClick = () => {
    if (timeInputRef.current) {
      timeInputRef.current.focus();
      try {
        if ("showPicker" in HTMLInputElement.prototype) {
          timeInputRef.current.showPicker();
        }
      } catch {
        // Fallback to standard focus
      }
    }
  };

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
          <div
            onClick={handleDateContainerClick}
            className="relative cursor-pointer"
          >
            <input
              ref={dateInputRef}
              type={tripDate ? "date" : "text"}
              value={tripDate}
              min={todayStr}
              onFocus={(e) => {
                e.currentTarget.type = "date";
              }}
              onBlur={(e) => {
                if (!e.currentTarget.value) {
                  e.currentTarget.type = "text";
                }
              }}
              onChange={(e) => onTripDateChange(e.target.value)}
              placeholder="mm/dd/yyyy"
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <Image
                src="/transfer/Vector (2).svg"
                alt="Trip Date"
                width={18}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Trip Time */}
        <div>
          <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
            Trip Time *
          </label>
          <div
            onClick={handleTimeContainerClick}
            className="relative cursor-pointer"
          >
            <input
              ref={timeInputRef}
              type={tripTime ? "time" : "text"}
              value={tripTime}
              onFocus={(e) => {
                e.currentTarget.type = "time";
              }}
              onBlur={(e) => {
                if (!e.currentTarget.value) {
                  e.currentTarget.type = "text";
                }
              }}
              onChange={(e) => onTripTimeChange(e.target.value)}
              placeholder="--:-- --"
              className="w-full h-11 px-3 py-2 text-sm text-[#0E4A68] font-medium bg-[#FFFFFF] border-[0.42px] border-[#00000066] rounded-[5.24px] focus:outline-none focus:ring-1 focus:ring-[#0E4A68] transition placeholder:text-[#00000066] placeholder:font-normal cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferScheduleCard;
