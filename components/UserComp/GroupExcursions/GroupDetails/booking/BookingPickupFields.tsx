"use client";

import React from "react";
import { FiHome } from "react-icons/fi";
import { getDictionary } from "@/shared/utils/getDictionary";

interface BookingPickupFieldsProps {
  hotelName: string;
  onHotelNameChange: (val: string) => void;
  roomNumber: string;
  onRoomNumberChange: (val: string) => void;
  locale?: string;
}

export function BookingPickupFields({
  hotelName,
  onHotelNameChange,
  roomNumber,
  onRoomNumberChange,
  locale = "en",
}: BookingPickupFieldsProps) {
  const dict = getDictionary(locale);
  const t = dict.groupExcursions.details.bookingForm;

  return (
    <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
      <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
        <FiHome className="text-[#DE7423]" />
        <span>{t.pickupTitle}</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            {t.hotelName}
          </label>
          <input
            type="text"
            placeholder={t.hotelPlaceholder}
            value={hotelName}
            onChange={(e) => onHotelNameChange(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#083952] mb-1">
            {t.roomNumber}
          </label>
          <input
            type="text"
            placeholder={t.roomPlaceholder}
            value={roomNumber}
            onChange={(e) => onRoomNumberChange(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
          />
        </div>
      </div>
    </div>
  );
}

export default BookingPickupFields;