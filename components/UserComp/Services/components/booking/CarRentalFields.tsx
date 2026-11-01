"use client";

import React from "react";
import { FiCalendar } from "react-icons/fi";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";

interface CarRentalFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  todayStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CarRentalFields({
  formData,
  fieldErrors,
  todayStr,
  onChange,
}: CarRentalFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Pick-up Date <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="date"
            name="rentalDate"
            min={todayStr}
            required
            value={formData.rentalDate}
            onChange={onChange}
            className={getFieldInputClass(Boolean(fieldErrors.rentalDate))}
          />
          <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.rentalDate && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.rentalDate}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Rental Duration (Days) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="1"
          max="365"
          name="numberOfDays"
          required
          value={formData.numberOfDays}
          onChange={onChange}
          placeholder="e.g. 3"
          className={getFieldInputClass(Boolean(fieldErrors.numberOfDays))}
        />
        {fieldErrors.numberOfDays && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.numberOfDays}
          </span>
        )}
      </div>
    </>
  );
}

export default CarRentalFields;

