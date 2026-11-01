"use client";

import React from "react";
import Link from "next/link";
import { FiChevronDown, FiCalendar, FiClock } from "react-icons/fi";
import type { CartDeliveryFormData } from "../types";
import type { DeliveryProductItem } from "@/models/deliveryProduct";

interface DeliveryInfoCardProps {
  formData: CartDeliveryFormData;
  onChange: (field: keyof CartDeliveryFormData, value: string | boolean | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  deliveryAreas?: DeliveryProductItem[];
  areasLoading?: boolean;
  locale?: string;
}

export function DeliveryInfoCard({
  formData,
  onChange,
  onSubmit,
  isSubmitting = false,
  deliveryAreas,
  areasLoading = false,
  locale = "en",
}: DeliveryInfoCardProps) {
  const availableAreas = deliveryAreas || [];

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaName = e.target.value;
    const matched = availableAreas.find((a) => a.area === selectedAreaName);
    onChange("hotelArea", selectedAreaName);
    if (matched && typeof matched.id === "number") {
      onChange("deliveryProductId", matched.id);
    } else {
      onChange("deliveryProductId", 0);
    }
  };

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
      <form
        id="delivery-checkout-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-4 sm:gap-5"
      >
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
                onChange={handleAreaChange}
                className="w-full px-4 py-2.5 appearance-none rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer"
              >
                <option value="">
                  {areasLoading
                    ? "Loading delivery areas..."
                    : availableAreas.length === 0
                    ? "No delivery areas available"
                    : "Select Hotel Area"}
                </option>
                {availableAreas.map((areaItem) => (
                  <option key={areaItem.id} value={areaItem.area}>
                    {areaItem.area} (+${Number(areaItem.priceUsd || 0).toFixed(2)})
                  </option>
                ))}
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
                onClick={(e) => {
                  try {
                    (e.currentTarget as HTMLInputElement).showPicker?.();
                  } catch {
                    // Fallback for browsers without showPicker support
                  }
                }}
                className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0"
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
            <input
              type="time"
              required
              value={formData.deliveryTime}
              onChange={(e) => onChange("deliveryTime", e.target.value)}
              onClick={(e) => {
                try {
                  (e.currentTarget as HTMLInputElement).showPicker?.();
                } catch {
                  // Fallback for browsers without showPicker support
                }
              }}
              placeholder="--:--"
              className="w-full px-4 py-2.5 rounded-[5px] border border-[#888888]/60 text-sm text-[#0E4A68] bg-white focus:outline-none focus:border-[#0E4A68] transition-colors cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0"
            />
            <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <p className="text-[12px] text-[#64748B]">
            Select any delivery time that suits you (e.g. 14:30)
          </p>
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
              href={`/${locale}/privacy`}
              className="text-[#146188] underline hover:text-[#0E4A68] font-medium"
            >
              Privacy Policy
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
