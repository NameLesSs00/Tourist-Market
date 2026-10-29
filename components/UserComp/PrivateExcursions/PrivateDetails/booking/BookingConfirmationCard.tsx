"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { PrivateExcursionDetail } from "../../types";
import {
  CreatePrivateBookingResponse,
  PRIVATE_PAYMENT_METHOD_LABELS,
} from "@/models/privateBooking";

interface BookingConfirmationCardProps {
  confirmedBooking: CreatePrivateBookingResponse;
  detail: PrivateExcursionDetail;
  date: string;
  customerName: string;
  hotelName: string;
  roomNumber: string;
  adults: number;
  children: number;
  infants: number;
  selectedAttractionsCount: number;
  selectedServicesCount: number;
  paymentMethod: number;
  contactNumber: string;
  onBack: () => void;
}

export function BookingConfirmationCard({
  confirmedBooking,
  detail,
  date,
  customerName,
  hotelName,
  roomNumber,
  adults,
  children,
  infants,
  selectedAttractionsCount,
  selectedServicesCount,
  paymentMethod,
  contactNumber,
  onBack,
}: BookingConfirmationCardProps) {
  const paymentLabel =
    PRIVATE_PAYMENT_METHOD_LABELS[paymentMethod] || "Cash on Arrival";

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-5 sm:p-8 shadow-sm font-poppins">
      {/* Header */}
      <div className="text-center pb-6 border-b border-[#E5E5E5]">
        <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] mx-auto flex items-center justify-center mb-3">
          <FiCheck size={32} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E4A68] tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="mt-1 text-sm text-[#444444]">
          Thank you for choosing our private tour service. We have received your booking request.
        </p>
      </div>

      {/* Reference & Summary Box */}
      <div className="my-6 p-4 sm:p-5 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/30 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#DE7423]/20 pb-3">
          <div>
            <div className="text-xs text-[#646464] font-medium">Booking Reference</div>
            <div className="text-lg sm:text-xl font-extrabold text-[#0E4A68] tracking-wider">
              {confirmedBooking.bookingReference}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-[#646464] font-medium">Total Price</div>
            <div className="text-lg sm:text-xl font-extrabold text-[#DE7423]">
              {confirmedBooking.totalPrice} {confirmedBooking.currency}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#444444] pt-1">
          <div>
            <span className="font-semibold text-[#0E4A68]">Excursion:</span> {detail.title}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Date:</span> {date}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Lead Traveler:</span> {customerName}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Contact:</span> {contactNumber}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Hotel / Pickup:</span> {hotelName}
            {roomNumber ? ` (Room ${roomNumber})` : ""}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Passengers:</span> {adults} Adult{adults > 1 ? "s" : ""}
            {children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
            {infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : ""}
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Attractions:</span> {selectedAttractionsCount} Selected
          </div>
          <div>
            <span className="font-semibold text-[#0E4A68]">Extra Services:</span> {selectedServicesCount} Selected
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold text-[#0E4A68]">Payment Method:</span> {paymentLabel}
          </div>
        </div>
      </div>

      {/* WhatsApp Notice Box */}
      <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 mb-6">
        <FaWhatsapp className="text-[#16A34A] text-xl shrink-0 mt-0.5" />
        <div className="text-xs text-[#204E31] leading-relaxed">
          <p className="font-semibold">Need fast confirmation or have questions?</p>
          <p className="mt-0.5">
            Our team has sent a copy to your WhatsApp. You can also message our operations desk directly with your booking reference <strong className="underline">{confirmedBooking.bookingReference}</strong> for immediate assistance.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-[#BBBBBB] text-xs sm:text-sm font-semibold text-[#0E4A68] hover:bg-gray-50 transition cursor-pointer"
        >
          Back to Excursion Details
        </button>
        <a
          href={`https://wa.me/201012345678?text=Hello,%20I%20have%20booked%20${encodeURIComponent(
            detail.title
          )}%20(Ref:%20${encodeURIComponent(confirmedBooking.bookingReference)})`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#16A34A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#15803D] transition shadow-xs"
        >
          <FaWhatsapp size={16} />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

