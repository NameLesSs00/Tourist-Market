"use client";

import React from "react";
import { FiChevronDown, FiPhone } from "react-icons/fi";
import type { CountryItem } from "@/models/country";
import {
  ServiceBookingFormData,
  ServiceFieldErrors,
  getFieldInputClass,
} from "./bookingTypes";

interface ServiceCommonFieldsProps {
  formData: ServiceBookingFormData;
  fieldErrors: ServiceFieldErrors;
  isCustomCountry: boolean;
  countriesList: (CountryItem | { id: string; name: string; phoneCode: string })[];
  isLoadingCountries: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ServiceCommonFields({
  formData,
  fieldErrors,
  isCustomCountry,
  countriesList,
  isLoadingCountries,
  onChange,
  onCountryChange,
  onPhoneChange,
}: ServiceCommonFieldsProps) {
  return (
    <>
      {/* 1. Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={onChange}
          placeholder="e.g. John Doe"
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
          Country <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            name="country"
            required
            value={isCustomCountry ? "__other__" : formData.country}
            onChange={onCountryChange}
            disabled={isLoadingCountries}
            className={`appearance-none ${getFieldInputClass(
              Boolean(fieldErrors.country)
            )} cursor-pointer pr-10`}
          >
            <option value="">
              {isLoadingCountries ? "Loading countries..." : "Select your country"}
            </option>
            {countriesList.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} {c.phoneCode ? `(${c.phoneCode})` : ""}
              </option>
            ))}
            <option value="__other__">Other (Enter manually)</option>
          </select>
          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {isCustomCountry && (
          <div className="mt-1.5">
            <input
              type="text"
              name="customCountry"
              value={formData.customCountry}
              onChange={onChange}
              placeholder="Enter your country name"
              className={getFieldInputClass(Boolean(fieldErrors.country))}
            />
          </div>
        )}

        {fieldErrors.country && (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.country}
          </span>
        )}
      </div>

      {/* 3. Hotel Location */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Hotel / Accommodation Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="hotel"
          required
          value={formData.hotel}
          onChange={onChange}
          placeholder="Hotel or Residence name"
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
          Room Number <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={onChange}
          placeholder="Room number if applicable"
          className={getFieldInputClass(Boolean(fieldErrors.roomNumber))}
        />
      </div>

      {/* 5. Phone Number */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Phone Number (with Country Code) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={onPhoneChange}
            placeholder="e.g. +20 123 456 7890"
            className={getFieldInputClass(Boolean(fieldErrors.phoneNumber))}
          />
          <FiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {fieldErrors.phoneNumber ? (
          <span className="text-[11px] sm:text-xs text-rose-500 font-medium">
            {fieldErrors.phoneNumber}
          </span>
        ) : (
          <span className="text-[10.5px] text-[#64748B]">
            Include international calling code (e.g. +20 for Egypt, +49 for Germany).
          </span>
        )}
      </div>

      {/* 6. Email Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-semibold text-[#0E4A68]">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="emailAddress"
          required
          value={formData.emailAddress}
          onChange={onChange}
          placeholder="your.email@example.com"
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
          Preferred Contact Channel <span className="text-red-500">*</span>
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
            <option value="whatsapp">WhatsApp</option>
            <option value="viber">Viber</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
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

