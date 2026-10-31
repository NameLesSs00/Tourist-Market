"use client";

import React from "react";
import { FiChevronDown } from "react-icons/fi";
import type { CartContactFormData } from "../types";

interface ContactInfoCardProps {
  formData: CartContactFormData;
  onChange: (field: keyof CartContactFormData, value: string) => void;
}

export function ContactInfoCard({ formData, onChange }: ContactInfoCardProps) {
  return (
    <div
      style={{
        boxShadow: "0px 1px 8px 1px #00000033",
        border: "0.5px solid #888888",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
      }}
      className="w-full p-6 sm:p-8 font-poppins"
    >
      {/* Title */}
      <h3 className="text-[22px] font-semibold text-[#0E4A68] mb-6">
        Contact Information
      </h3>

      {/* Form Fields Grid */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Your Full Name"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Email <span className="text-red-500">*</span>
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
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={formData.country}
                onChange={(e) => onChange("country", e.target.value)}
                className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="Egypt">Egypt</option>
                <option value="Germany">Germany</option>
                <option value="Russia">Russia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Poland">Poland</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Other">Other</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Phone number (preferred WhatsApp number){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
              placeholder="+20 123 456 7890"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Preferred Communication Method */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#0E4A68]">
            Preferred Communication Method{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={formData.communicationMethod}
              onChange={(e) => onChange("communicationMethod", e.target.value)}
              className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
            >
              <option value="">Select Contact Method</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone">Phone Call</option>
              <option value="Email">Email</option>
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

