"use client";

import React from "react";
import { FiUsers } from "react-icons/fi";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";

interface VipAirportFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  nowDateTimeStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VipAirportFields({
  formData,
  fieldErrors,
  nowDateTimeStr,
  onChange,
}: VipAirportFieldsProps) {
  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Flight Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="flightNumber"
          required
          value={formData.flightNumber}
          onChange={onChange}
          placeholder="e.g. MS703"
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
          Flight Departure Date and Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="departureDateTime"
          min={nowDateTimeStr}
          required
          value={formData.departureDateTime}
          onChange={onChange}
          className={getFieldInputClass(Boolean(fieldErrors.departureDateTime))}
        />
        {fieldErrors.departureDateTime && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.departureDateTime}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Number of Passengers <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            max="50"
            name="noOfPersons"
            required
            value={formData.noOfPersons}
            onChange={onChange}
            placeholder="e.g. 2"
            className={getFieldInputClass(Boolean(fieldErrors.noOfPersons))}
          />
          <FiUsers className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.noOfPersons && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.noOfPersons}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Destination / Terminal <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="destinationTo"
          required
          value={formData.destinationTo}
          onChange={onChange}
          placeholder="e.g. Hurghada Airport Terminal 1"
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

