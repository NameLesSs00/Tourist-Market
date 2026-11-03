"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCar, FaCalendarDays, FaLocationDot, FaUser } from "react-icons/fa6";
import { TransferTripType } from "@/models/transferBooking";
import type { ConfirmedTransferBooking } from "./transferBookingValidation";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferBookingConfirmationCardProps {
  booking: ConfirmedTransferBooking;
  onBookAnother: () => void;
  locale?: string;
}

export function TransferBookingConfirmationCard({
  booking,
  onBookAnother,
  locale = "en",
}: TransferBookingConfirmationCardProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.confirmation;
  const vehicleT = dict.transfer.vehicle;

  const isRoundTrip = booking.tripType === TransferTripType.RoundTrip;
  const totalPax = booking.adults + booking.childrenCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-[8.38px] border border-[#0E4A68]/30 shadow-[0px_4px_20px_rgba(14,74,104,0.15)] p-5 sm:p-6 md:p-8 font-poppins space-y-6"
    >
      {/* Success Header */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-[#00000015]">
        <motion.div
          initial={{ scale: 0, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.1 }}
          className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-inner"
        >
          <FaCheck className="w-6 h-6" />
        </motion.div>
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#0E4A68]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#0E4A68]/80 max-w-md mx-auto">
            {booking.message || t.defaultMessage}
          </p>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
        {/* Route Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaLocationDot className="w-3.5 h-3.5 text-[#0E4A68]" /> {t.routeInfo}
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">{t.pickup} </span>
              <span className="font-bold">{booking.fromName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">{t.destination} </span>
              <span className="font-bold">{booking.toName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">{t.type} </span>
              <span className="font-medium">{isRoundTrip ? t.roundTrip : t.oneWay}</span>
            </div>
          </div>
        </div>

        {/* Vehicle & Passenger Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaCar className="w-3.5 h-3.5 text-[#0E4A68]" /> {t.vehiclePax}
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">{t.vehicle} </span>
              <span className="font-bold">{booking.vehicleName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">{t.passengers} </span>
              <span className="font-medium">
                {totalPax} {t.total} ({booking.adults} {booking.adults === 1 ? vehicleT.adult : vehicleT.adults}
                {booking.childrenCount > 0 ? `, ${booking.childrenCount} ${booking.childrenCount === 1 ? vehicleT.child : vehicleT.children}` : ""})
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaCalendarDays className="w-3.5 h-3.5 text-[#0E4A68]" /> {t.schedule}
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">{t.outbound} </span>
              <span className="font-medium">{booking.tripDate} {t.at} {booking.tripTime}</span>
            </div>
            {isRoundTrip && booking.returnDate && (
              <div>
                <span className="font-semibold text-gray-500">{t.return} </span>
                <span className="font-medium">{booking.returnDate} {t.at} {booking.returnTime}</span>
              </div>
            )}
            {booking.additionalHours ? (
              <div>
                <span className="font-semibold text-gray-500">{t.extraWaiting} </span>
                <span className="font-medium text-amber-700">
                  {booking.additionalHours} {t.hours}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Passenger Contact */}
        <div className="p-4 rounded-[6.29px] bg-[#F7FAFC] border border-[#E2E8F0] space-y-2">
          <div className="text-xs font-bold text-[#0E4A68] uppercase tracking-wider flex items-center gap-1.5">
            <FaUser className="w-3.5 h-3.5 text-[#0E4A68]" /> {t.contactDetails}
          </div>
          <div className="space-y-1 text-[#0E4A68]">
            <div>
              <span className="font-semibold text-gray-500">{t.name} </span>
              <span className="font-bold">{booking.customerName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">{t.phone} </span>
              <span className="font-medium">{booking.phoneNumber}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">{t.email} </span>
              <span className="font-medium">{booking.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information Box */}
      <div className="p-4 rounded-[6.29px] bg-[#EBF5FA] border border-[#0E4A68]/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-[#0E4A68] uppercase">
            {t.totalFare}
          </div>
          <div className="text-xs text-[#0E4A68]/80">
            {booking.paymentMessage || t.paymentNote}
          </div>
        </div>
        <div className="text-2xl font-bold text-[#0E4A68]">
          {booking.currencySymbol || "$"}{typeof booking.totalPrice === "number" ? booking.totalPrice.toFixed(2) : "0.00"}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBookAnother}
          className="w-full sm:w-auto px-8 py-3 rounded-[6.29px] bg-[#0E4A68] text-white text-sm font-semibold hover:bg-[#0A354A] transition cursor-pointer text-center shadow-md"
        >
          {t.bookAnother}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TransferBookingConfirmationCard;
