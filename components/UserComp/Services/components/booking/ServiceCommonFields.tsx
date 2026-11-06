"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";

interface ServiceCommonFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  locale?: string;
}

export function ServiceCommonFields({
  formData,
  fieldErrors,
  onChange,
  onPhoneChange,
  locale = "en",
}: ServiceCommonFieldsProps) {
  const dict = useClientDictionary();
  const t = dict.serviceDetail;

  return (
    <>
      {/* 1. Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.fullNameLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={onChange}
          placeholder={t.fullNamePlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.name))}
        />
        {fieldErrors.name && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.name}
          </span>
        )}
      </div>

      {/* 2. Country */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.countryLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="country"
          required
          value={formData.country}
          onChange={onChange}
          placeholder={t.countryPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.country))}
        />
        {fieldErrors.country && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.country}
          </span>
        )}
      </div>

      {/* 3. Hotel Location */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.hotelLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="hotel"
          required
          value={formData.hotel}
          onChange={onChange}
          placeholder={t.hotelPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.hotel))}
        />
        {fieldErrors.hotel && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.hotel}
          </span>
        )}
      </div>

      {/* 4. Room Number */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.roomNumberLabel} <span className="text-gray-400 font-normal">{t.optionalLabel}</span>
        </label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={onChange}
          placeholder={t.roomNumberPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.roomNumber))}
        />
      </div>

      {/* 5. Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.phoneLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={onPhoneChange}
          placeholder={t.phonePlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.phoneNumber))}
        />
        {fieldErrors.phoneNumber && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.phoneNumber}
          </span>
        )}
      </div>

      {/* 6. Email Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.emailLabel} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="emailAddress"
          required
          value={formData.emailAddress}
          onChange={onChange}
          placeholder={t.emailPlaceholder}
          className={getFieldInputClass(Boolean(fieldErrors.emailAddress))}
        />
        {fieldErrors.emailAddress && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.emailAddress}
          </span>
        )}
      </div>

      {/* 7. Communication Channel */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          {t.preferredChannelLabel} <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="communicationMethod"
            required
            value={formData.communicationMethod}
            onChange={onChange}
            className={`appearance-none ${getFieldInputClass(
              Boolean(fieldErrors.communicationMethod)
            )} cursor-pointer pr-10`}
          >
            <option value="whatsapp">{t.channelWhatsapp}</option>
            <option value="viber">{t.channelViber}</option>
            <option value="phone">{t.channelPhone}</option>
            <option value="email">{t.channelEmail}</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        {fieldErrors.communicationMethod && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.communicationMethod}
          </span>
        )}
      </div>
    </>
  );
}

export default ServiceCommonFields;
