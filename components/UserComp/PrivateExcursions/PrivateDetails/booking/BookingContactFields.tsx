"use client";

import React from "react";
import { FiHome, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

interface BookingContactFieldsProps {
  customerName: string;
  onCustomerNameChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  whatsApp: string;
  onWhatsAppChange: (val: string) => void;
  sameAsPhone: boolean;
  onSameAsPhoneChange: (val: boolean) => void;
  hotelName: string;
  onHotelNameChange: (val: string) => void;
  roomNumber: string;
  onRoomNumberChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
}

export function BookingContactFields({
  customerName,
  onCustomerNameChange,
  phone,
  onPhoneChange,
  whatsApp,
  onWhatsAppChange,
  sameAsPhone,
  onSameAsPhoneChange,
  hotelName,
  onHotelNameChange,
  roomNumber,
  onRoomNumberChange,
  notes,
  onNotesChange,
}: BookingContactFieldsProps) {
  return (
    <div className="space-y-6 pt-4 border-t border-[#E5E5E5]">
      {/* 2. Lead Traveler Information */}
      <div className="space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
          <FiUser className="text-[#DE7423]" />
          <span>2. Lead Traveler Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#0E4A68]">
                WhatsApp Number *
              </label>
              <label className="flex items-center gap-1.5 text-[11px] text-[#444444] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={(e) => onSameAsPhoneChange(e.target.checked)}
                  className="rounded border-gray-300 text-[#DE7423] focus:ring-[#DE7423]"
                />
                <span>Same as phone</span>
              </label>
            </div>
            <div className="relative">
              <FaWhatsapp className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                required
                disabled={sameAsPhone}
                value={sameAsPhone ? phone : whatsApp}
                onChange={(e) => onWhatsAppChange(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white disabled:bg-gray-100 disabled:text-gray-500 cursor-not-allowed sm:cursor-text"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hotel Pickup Details */}
      <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
        <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
          <FiHome className="text-[#DE7423]" />
          <span>3. Hotel Pickup Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Hotel / Resort Name *
            </label>
            <input
              type="text"
              required
              value={hotelName}
              onChange={(e) => onHotelNameChange(e.target.value)}
              placeholder="e.g. Steigenberger ALDAU Beach Hotel"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
              Room Number
            </label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => onRoomNumberChange(e.target.value)}
              placeholder="e.g. 1402 (or leave empty if not checked in)"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Special Notes */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-semibold text-[#0E4A68] flex items-center gap-1.5">
          <FiMessageSquare className="text-[#DE7423]" />
          <span>Special Requests or Notes (Optional)</span>
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Flight details, dietary requirements, infant seat request, etc."
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm text-[#0E4A68] placeholder-gray-400 focus:outline-none focus:border-[#DE7423] bg-white resize-y"
        />
      </div>
    </div>
  );
}

