"use client";

import React from "react";
import { FiCalendar, FiChevronDown, FiClock } from "react-icons/fi";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";

interface TouristServiceFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  todayStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function TouristServiceFields({
  formData,
  fieldErrors,
  todayStr,
  onChange,
}: TouristServiceFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Service Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="tourDate"
            min={todayStr}
            required
            value={formData.tourDate}
            onChange={onChange}
            className={getFieldInputClass(Boolean(fieldErrors.tourDate))}
          />
          <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.tourDate && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.tourDate}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Guide Language <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="guideLanguage"
            required
            value={formData.guideLanguage}
            onChange={onChange}
            className={`appearance-none ${getFieldInputClass(
              Boolean(fieldErrors.guideLanguage)
            )} cursor-pointer pr-10`}
          >
            <option value="english">English</option>
            <option value="german">German</option>
            <option value="russian">Russian</option>
            <option value="french">French</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.guideLanguage && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.guideLanguage}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Time From <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="time"
            name="timeFrom"
            required
            value={formData.timeFrom}
            onChange={onChange}
            className={getFieldInputClass(Boolean(fieldErrors.timeFrom))}
          />
          <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.timeFrom && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.timeFrom}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Time To <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="time"
            name="timeTo"
            required
            value={formData.timeTo}
            onChange={onChange}
            className={getFieldInputClass(Boolean(fieldErrors.timeTo))}
          />
          <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.timeTo && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.timeTo}
          </span>
        )}
      </div>
    </>
  );
}

export default TouristServiceFields;

