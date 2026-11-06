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

interface VipAirportFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  nowDateTimeStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locale?: string;
}

export function VipAirportFields({
  formData,
  fieldErrors,
  nowDateTimeStr,
  onChange,
  locale = "en",
}: VipAirportFieldsProps) {
  const dict = useClientDictionary();
  const t = dict.serviceDetail;

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.flightNumberLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="flightNumber"
          required
          value={formData.flightNumber}
          onChange={onChange}
          placeholder={t.flightNumberPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.flightNumber))}
        />
        {fieldErrors.flightNumber && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.flightNumber}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.departureDateTimeLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="departureDateTime"
          min={nowDateTimeStr}
          required
          value={formData.departureDateTime}
          onChange={onChange}
          onClick={triggerPicker}
          className={getPickerInputClass(Boolean(fieldErrors.departureDateTime))}
        />
        {fieldErrors.departureDateTime && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.departureDateTime}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.passengersLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="1"
          max="50"
          name="noOfPersons"
          required
          value={formData.noOfPersons}
          onChange={onChange}
          placeholder={t.passengersPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.noOfPersons))}
        />
        {fieldErrors.noOfPersons && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.noOfPersons}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.destinationTerminalLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="destinationTo"
          required
          value={formData.destinationTo}
          onChange={onChange}
          placeholder={t.destinationTerminalPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.destinationTo))}
        />
        {fieldErrors.destinationTo && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.destinationTo}
          </span>
        )}
      </div>
    </>
  );
}

export default VipAirportFields;
