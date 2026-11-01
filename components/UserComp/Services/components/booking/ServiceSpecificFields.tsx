"use client";

import React from "react";
import { ServiceType } from "../../types";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";
import { CarRentalFields } from "./CarRentalFields";
import { TouristServiceFields } from "./TouristServiceFields";
import { VipAirportFields } from "./VipAirportFields";

interface ServiceSpecificFieldsProps {
  serviceType: ServiceType;
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  todayStr: string;
  nowDateTimeStr: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export function ServiceSpecificFields({
  serviceType,
  formData,
  fieldErrors,
  todayStr,
  nowDateTimeStr,
  onChange,
}: ServiceSpecificFieldsProps) {
  return (
    <>
      {serviceType === "car-rental" && (
        <CarRentalFields
          formData={formData}
          fieldErrors={fieldErrors}
          todayStr={todayStr}
          onChange={onChange}
        />
      )}

      {serviceType === "tourist" && (
        <TouristServiceFields
          formData={formData}
          fieldErrors={fieldErrors}
          todayStr={todayStr}
          onChange={onChange}
        />
      )}

      {serviceType === "vip-airport" && (
        <VipAirportFields
          formData={formData}
          fieldErrors={fieldErrors}
          nowDateTimeStr={nowDateTimeStr}
          onChange={onChange}
        />
      )}

      {/* ─── Notes / Inquiry Details ─── */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {serviceType === "real-estate" ? (
            <>
              Inquiry and Property Details <span className="text-red-500">*</span>
            </>
          ) : (
            <>
              Special Requests or Notes <span className="text-gray-400 font-normal">(optional)</span>
            </>
          )}
        </label>
        <textarea
          rows={3}
          name="note"
          required={serviceType === "real-estate"}
          value={formData.note}
          onChange={onChange}
          placeholder={
            serviceType === "real-estate"
              ? "Describe the property you are interested in (e.g. budget, number of rooms, purchase or rent timeline)..."
              : "Any special requests or instructions..."
          }
          className={`${getFieldInputClass(Boolean(fieldErrors.note))} resize-none`}
        />
        {fieldErrors.note && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.note}
          </span>
        )}
      </div>
    </>
  );
}

export default ServiceSpecificFields;
