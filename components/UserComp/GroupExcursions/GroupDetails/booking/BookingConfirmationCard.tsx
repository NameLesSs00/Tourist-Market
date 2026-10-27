"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { GroupExcursionDetail } from "../../types";
import {
  CreateGroupBookingResponse,
  GROUP_PAYMENT_METHOD_LABELS,
} from "@/models/groupBooking";

interface BookingConfirmationCardProps {
  confirmedBooking: CreateGroupBookingResponse;
  detail: GroupExcursionDetail;
  date: string;
  customerName: string;
  hotelName: string;
  roomNumber: string;
  adults: number;
  children: number;
  infants: number;
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
  paymentMethod,
  contactNumber,
  onBack,
}: BookingConfirmationCardProps) {
  const paymentLabel =
    GROUP_PAYMENT_METHOD_LABELS[paymentMethod] || "Cash on Arrival";

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
          Thank you for choosing our tour service. We have received your booking request.
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
            <div className="text-lg sm:text-xl font-extrabold text-[#16A34A]">
              ${confirmedBooking.totalPrice.toFixed(2)} {confirmedBooking.currency}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-[#0E4A68]">
          <div>
            <span className="font-semibold">Excursion:</span> {detail.title}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {date}
          </div>
          <div>
            <span className="font-semibold">Customer:</span> {customerName}
          </div>
          <div>
            <span className="font-semibold">Hotel:</span> {hotelName} (Room {roomNumber})
          </div>
          <div>
            <span className="font-semibold">Guests:</span> {adults} Adult{adults > 1 ? "s" : ""}
            {children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
            {infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : ""}
          </div>
          <div>
            <span className="font-semibold">Payment:</span> {paymentLabel}
          </div>
        </div>
      </div>

      {/* WhatsApp Notice */}
      <div className="p-4 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-start gap-3 text-xs sm:text-sm text-[#083952]">
        <FaWhatsapp className="text-[#16A34A] shrink-0 mt-0.5" size={20} />
        <div>
          <span className="font-bold">Next Step:</span> Our operations team will contact you on WhatsApp (
          <span className="font-semibold">{contactNumber}</span>) within a few hours to confirm your exact hotel lobby pickup time.
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-[#0E4A68] hover:bg-[#09354b] text-white font-bold text-sm sm:text-base transition cursor-pointer"
        >
          Back to Excursion Details
        </button>
      </div>
    </div>
  );
}
