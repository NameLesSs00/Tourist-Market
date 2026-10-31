"use client";

import React from "react";
import Link from "next/link";
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import type { CartDeliveryFormData } from "../types";

interface DeliveryInfoCardProps {
  formData: CartDeliveryFormData;
  onChange: (field: keyof CartDeliveryFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

export function DeliveryInfoCard({
  formData,
  onChange,
  onSubmit,
  isSubmitting = false,
}: DeliveryInfoCardProps) {
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
        Delivery Information
      </h3>

      {/* Form Fields Grid */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-5">
        {/* Row 1: Hotel Name & Room Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Hotel Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Hotel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.hotelName}
              onChange={(e) => onChange("hotelName", e.target.value)}
              placeholder="Enter Hotel Name"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>

          {/* Room Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Room Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.roomNumber}
              onChange={(e) => onChange("roomNumber", e.target.value)}
              placeholder="Enter Room Number"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Hotel Area & Delivery Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Hotel Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Hotel Area <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={formData.hotelArea}
                onChange={(e) => onChange("hotelArea", e.target.value)}
                className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
              >
                <option value="">Select Country</option>
                <option value="Hurghada">Hurghada</option>
                <option value="El Gouna">El Gouna</option>
                <option value="Makadi Bay">Makadi Bay</option>
                <option value="Sahl Hasheesh">Sahl Hasheesh</option>
                <option value="Soma Bay">Soma Bay</option>
                <option value="Safaga">Safaga</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Delivery Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-medium text-[#0E4A68]">
              Delivery Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => onChange("deliveryDate", e.target.value)}
                className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 3: Delivery Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#0E4A68]">
            Delivery Time <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              value={formData.deliveryTime}
              onChange={(e) => onChange("deliveryTime", e.target.value)}
              className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
            >
              <option value="">Select Contact Method</option>
              <option value="Morning (09:00 - 13:00)">Morning (09:00 - 13:00)</option>
              <option value="Afternoon (13:00 - 17:00)">Afternoon (13:00 - 17:00)</option>
              <option value="Evening (17:00 - 21:00)">Evening (17:00 - 21:00)</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Row 4: Notes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[14px] font-medium text-[#0E4A68]">Notes</label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder=""
            className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white placeholder:text-[#00000066] focus:outline-none focus:border-[#0E4A68] transition-colors resize-none"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center gap-2.5 mt-1">
          <input
            type="checkbox"
            id="terms-checkbox"
            required
            checked={formData.agreedToTerms}
            onChange={(e) => onChange("agreedToTerms", e.target.checked)}
            className="w-4 h-4 rounded-[3px] border border-[#888888] accent-[#0E4A68] cursor-pointer shrink-0"
          />
          <label
            htmlFor="terms-checkbox"
            className="text-[13px] sm:text-[14px] text-[#444444] cursor-pointer select-none"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-[#146188] underline hover:text-[#0E4A68] font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[#146188] underline hover:text-[#0E4A68] font-medium"
            >
              Privacy Police
            </Link>{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#0E4A68",
              border: "0.25px solid #000000",
              borderRadius: "5px",
            }}
            className="w-full py-3 text-white font-poppins text-[15px] font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeliveryInfoCard;

