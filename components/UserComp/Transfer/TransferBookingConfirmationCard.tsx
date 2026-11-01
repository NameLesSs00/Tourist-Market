"use client";

import React from "react";
import { FaCheck, FaCar, FaCalendarDays, FaLocationDot, FaUser } from "react-icons/fa6";
import { TransferTripType } from "@/models/transferBooking";
import type { ConfirmedTransferBooking } from "./transferBookingValidation";

interface TransferBookingConfirmationCardProps {
  booking: ConfirmedTransferBooking;
  onBookAnother: () => void;
}

export function TransferBookingConfirmationCard({
  booking,
  onBookAnother,
}: TransferBookingConfirmationCardProps) {
  const isRoundTrip = booking.tripType === TransferTripType.RoundTrip;
  const totalPax = booking.adults + booking.childrenCount;

  return (
    <div className="bg-white rounded-[8.38px] border border-[#0E4A68]/30 shadow-[0px_4px_20px_rgba(14,74,104,0.15)] p-5 sm:p-6 md:p-8 font-poppins space-y-6">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-[#00000015]">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-inner">
          <FaCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#0E4A68]">
            Transfer Booking Submitted!
          </h2>
          <p className="text-xs sm:text-sm text-[#0E4A68]/80 max-w-md mx-auto">
            {booking.message || "Your transfer reservation has been received successfully."}
          </p>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {/* Route Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaLocationDot className="w-3.5 h-3.5 text-[#0E4A68]" /> Route Information
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">Pickup: </span>
              <span className="font-bold">{booking.fromName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Destination: </span>
              <span className="font-bold">{booking.toName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Type: </span>
              <span className="font-medium">{isRoundTrip ? "Round-Trip" : "One-Way"}</span>
            </div>
          </div>
        </div>

        {/* Vehicle & Passenger Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaCar className="w-3.5 h-3.5 text-[#0E4A68]" /> Vehicle & Passengers
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">Vehicle: </span>
              <span className="font-bold">{booking.vehicleName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Passengers: </span>
              <span className="font-medium">
                {totalPax} total ({booking.adults} adults{booking.childrenCount > 0 ? `, ${booking.childrenCount} children` : ""})
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaCalendarDays className="w-3.5 h-3.5 text-[#0E4A68]" /> Schedule
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">Outbound: </span>
              <span className="font-medium">{booking.tripDate} at {booking.tripTime}</span>
            </div>
            {isRoundTrip && booking.returnDate && (
              <div>
                <span className="font-semibold text-gray-500">Return: </span>
                <span className="font-medium">{booking.returnDate} at {booking.returnTime}</span>
              </div>
            )}
            {booking.additionalHours ? (
              <div>
                <span className="font-semibold text-gray-500">Extra Waiting: </span>
                <span className="font-medium text-amber-700">
                  {booking.additionalHours} hour{booking.additionalHours > 1 ? "s" : ""}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Passenger Contact */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaUser className="w-3.5 h-3.5 text-[#0E4A68]" /> Contact Details
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">Lead Passenger: </span>
              <span className="font-bold">{booking.customerName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Phone: </span>
              <span className="font-medium">{booking.phoneNumber}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Email: </span>
              <span className="font-medium">{booking.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information Box */}
      <div className="p-4 rounded-[6.29px] bg-[#EBF5FA] border border-[#0E4A68]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-[#0E4A68] uppercase">
            Total Fare
          </div>
          <div className="text-xs text-[#0E4A68]/80">
            {booking.paymentMessage || "Payment upon arrival / contact coordinator."}
          </div>
        </div>
        <div className="text-2xl font-bold text-[#0E4A68]">
          ${typeof booking.totalPrice === "number" ? booking.totalPrice.toFixed(2) : "0.00"}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={onBookAnother}
          className="w-full sm:w-auto px-8 py-3 rounded-[6.29px] bg-[#0E4A68] text-white text-sm font-semibold hover:bg-[#0A354A] transition cursor-pointer text-center shadow-md"
        >
          Book Another Transfer
        </button>
      </div>
    </div>
  );
}

export default TransferBookingConfirmationCard;
