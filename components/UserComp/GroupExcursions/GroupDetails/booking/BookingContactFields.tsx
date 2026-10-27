"use client";

import React from "react";
import { FiPhone, FiUser } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

interface BookingContactFieldsProps {
  customerName: string;
  onCustomerNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  whatsApp: string;
  onWhatsAppChange: (val: string) => void;
  sameAsPhone: boolean;
  onSameAsPhoneToggle: (val: boolean) => void;
}

export function BookingContactFields({
  customerName,
  onCustomerNameChange,
  phone,
  onPhoneChange,
  whatsApp,
  onWhatsAppChange,
  sameAsPhone,
  onSameAsPhoneToggle,
}: BookingContactFieldsProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiUser className="text-[#DE7423]" />
        <span>2. Lead Traveler Information</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            Phone Number (with Country Code) *
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="tel"
              placeholder="+20 123 456 7890"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              required
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-[#083952]">
              WhatsApp Number *
            </label>
            <label className="flex items-center gap-1.5 text-xs text-[#0E4A68] cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsPhone}
                onChange={(e) => onSameAsPhoneToggle(e.target.checked)}
                className="rounded border-[#BBBBBB] accent-[#0E4A68]"
              />
              <span>Same as phone number</span>
            </label>
          </div>

          {!sameAsPhone && (
            <div className="relative">
              <FaWhatsapp className="absolute left-3 top-3 text-[#16A34A]" size={16} />
              <input
                type="tel"
                placeholder="+20 123 456 7890"
                value={whatsApp}
                onChange={(e) => onWhatsAppChange(e.target.value)}
                required
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
