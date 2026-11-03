"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
  getPickerInputClass,
  triggerPicker,
} from "./bookingTypes";

interface TouristServiceFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  todayStr: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  locale?: string;
}

export function TouristServiceFields({
  formData,
  fieldErrors,
  todayStr,
  onChange,
  locale = "en",
}: TouristServiceFieldsProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;

  return (
    <>
      {/* Service Date */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.serviceDateLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="tourDate"
          min={todayStr}
          required
          value={formData.tourDate}
          onChange={onChange}
          onClick={triggerPicker}
          className={getPickerInputClass(Boolean(fieldErrors.tourDate))}
        />
        {fieldErrors.tourDate && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.tourDate}
          </span>
        )}
      </div>

      {/* Guide Language */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.guideLanguageLabel} <span className="text-red-500">*</span>
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
            <option value="english">{t.langEnglish}</option>
            <option value="german">{t.langGerman}</option>
            <option value="russian">{t.langRussian}</option>
            <option value="french">{t.langFrench}</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.guideLanguage && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.guideLanguage}
          </span>
        )}
      </div>

      {/* Time From */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.timeFromLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          name="timeFrom"
          required
          value={formData.timeFrom}
          onChange={onChange}
          onClick={triggerPicker}
          className={getPickerInputClass(Boolean(fieldErrors.timeFrom))}
        />
        {fieldErrors.timeFrom && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.timeFrom}
          </span>
        )}
      </div>

      {/* Time To */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.timeToLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          name="timeTo"
          required
          value={formData.timeTo}
          onChange={onChange}
          onClick={triggerPicker}
          className={getPickerInputClass(Boolean(fieldErrors.timeTo))}
        />
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
