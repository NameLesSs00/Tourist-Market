"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";
import type { CartContactFormData } from "../types";
import type { CountryItem } from "@/models/country";
import { getDictionary } from "@/shared/utils/getDictionary";

const FALLBACK_COUNTRIES: { id: string; name: string; phoneCode: string }[] = [
  { id: "142b2b3b-2235-4001-9376-f059c3f8290f", name: "Egypt", phoneCode: "+20" },
  { id: "242b2b3b-2235-4001-9376-f059c3f8290f", name: "Germany", phoneCode: "+49" },
  { id: "342b2b3b-2235-4001-9376-f059c3f8290f", name: "Russia", phoneCode: "+7" },
  { id: "442b2b3b-2235-4001-9376-f059c3f8290f", name: "United Kingdom", phoneCode: "+44" },
  { id: "542b2b3b-2235-4001-9376-f059c3f8290f", name: "France", phoneCode: "+33" },
  { id: "642b2b3b-2235-4001-9376-f059c3f8290f", name: "Italy", phoneCode: "+39" },
  { id: "742b2b3b-2235-4001-9376-f059c3f8290f", name: "Poland", phoneCode: "+48" },
  { id: "842b2b3b-2235-4001-9376-f059c3f8290f", name: "Ukraine", phoneCode: "+380" },
];

function sanitizePhoneNumber(raw: string): string {
  // Allow leading '+' if present, followed strictly by digits 0-9
  const hasLeadingPlus = raw.startsWith("+");
  const digitsOnly = raw.replace(/\D/g, "");
  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly;
}

interface ContactInfoCardProps {
  formData: CartContactFormData;
  onChange: (field: keyof CartContactFormData, value: string) => void;
  countries?: CountryItem[];
  isCountriesLoading?: boolean;
  locale?: string;
}

export function ContactInfoCard({
  formData,
  onChange,
  countries,
  isCountriesLoading = false,
  locale = "en",
}: ContactInfoCardProps) {
  const t = getDictionary(locale).cartPage.contact;
  const activeCountries =
    countries && countries.length > 0 ? countries : FALLBACK_COUNTRIES;

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryId = e.target.value;
    const found = activeCountries.find((c) => c.id === selectedCountryId);

    if (found) {
      onChange("country", found.name);
      onChange("countryId", found.id);

      // Auto-prefill phone prefix if phone is blank or currently just a code
      if (!formData.phoneNumber || /^\+\d{1,4}$/.test(formData.phoneNumber.trim())) {
        const cleanPrefix = found.phoneCode ? sanitizePhoneNumber(found.phoneCode) : "";
        onChange("phoneNumber", cleanPrefix);
      }
    } else {
      onChange("country", "");
      onChange("countryId", "");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhoneNumber(e.target.value);
    onChange("phoneNumber", sanitized);
  };

  // Find currently selected ID
  const selectedId =
    formData.countryId ||
    activeCountries.find((c) => c.name.toLowerCase() === formData.country.toLowerCase())
      ?.id ||
    "";

  return (
    <div
      style={{
        boxShadow: "0px 1px 8px 1px #00000033",
        border: "0.5px solid #888888",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
      }}
      className="w-full p-4 sm:p-6 md:p-8 font-poppins"
    >
      {/* Title */}
      <h3 className="text-[22px] font-semibold text-[#0E4A68] mb-6">
        {t.title}
      </h3>

      {/* Form Fields Grid */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              {t.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Country & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              {t.country} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={selectedId}
                onChange={handleCountrySelect}
                className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
              >
                <option value="">
                  {isCountriesLoading ? t.loadingCountries : t.selectCountry}
                </option>
                {activeCountries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.phoneCode ? `(${c.phoneCode})` : ""}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="+201234567890"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Preferred Communication Method */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#0E4A68]">
            {t.commMethod} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={formData.communicationMethod}
              onChange={(e) => onChange("communicationMethod", e.target.value)}
              className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone">{t.phoneCall}</option>
              <option value="Email">{t.emailMethod}</option>
              <option value="Viber">Viber</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfoCard;
