"use client";

import React from "react";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
  getPickerInputClass,
  triggerPicker,
} from "./bookingTypes";

interface CarRentalFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  todayStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locale?: string;
}

export function CarRentalFields({
  formData,
  fieldErrors,
  todayStr,
  onChange,
  locale = "en",
}: CarRentalFieldsProps) {
  const dict = useClientDictionary();
  const t = dict.serviceDetail;

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.pickupDateLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="rentalDate"
          min={todayStr}
          required
          value={formData.rentalDate}
          onChange={onChange}
          onClick={triggerPicker}
          className={getPickerInputClass(Boolean(fieldErrors.rentalDate))}
        />
        {fieldErrors.rentalDate && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.rentalDate}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.rentalDurationLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="1"
          max="365"
          name="numberOfDays"
          required
          value={formData.numberOfDays}
          onChange={onChange}
          placeholder={t.rentalDurationPlaceholder}
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
