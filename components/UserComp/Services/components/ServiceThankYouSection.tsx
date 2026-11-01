"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiCheck,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiHome,
  FiFileText,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useServiceBookingStore } from "@/features/servicesBookings/serviceBookingStore";

interface ServiceThankYouSectionProps {
  locale?: string;
}

export function ServiceThankYouSection({ locale = "en" }: ServiceThankYouSectionProps) {
  const lastBooking = useServiceBookingStore((s) => s.lastBooking);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const booking = isHydrated ? lastBooking : null;

  const customerName = booking?.name || "";
  const serviceTitle = booking?.subServiceTitle || "Selected Service";
  const hotelDisplay = booking?.hotel
    ? `${booking.hotel}${booking.roomNo ? ` (Room ${booking.roomNo})` : ""}`
    : "";
  const country = booking?.country || "";
  const phone = booking?.phoneNumber || "";
  const commMethod = booking?.communicationMethod || "WhatsApp";

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-10 sm:py-16 font-poppins">
      <div className="mx-auto w-full max-w-[850px] px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-10 shadow-sm"
        >
          {/* Header */}
          <div className="text-center pb-8 border-b border-[#E5E5E5]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#16A34A]/10 text-[#16A34A] mx-auto flex items-center justify-center mb-4">
              <FiCheck size={36} />
            </div>

            <h1 className="text-[24px] sm:text-[32px] font-bold text-[#083952] tracking-tight leading-tight">
              Thank You for Your Booking!
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#64748B] mt-2 max-w-lg mx-auto">
              We have received your reservation request. Our team will contact you shortly to confirm all details.
            </p>
          </div>

          {/* Reservation Status Banner */}
          <div className="my-6 p-4 sm:p-6 rounded-[10px] bg-[#FFF8ED] border border-[#DE7423]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#DE7423]/20 pb-4">
              <div>
                <span className="text-xs text-[#646464] font-medium uppercase tracking-wider block">
                  Reservation Status
                </span>
                <span className="text-base sm:text-xl font-bold text-[#0E4A68] tracking-wide">
                  Request Confirmed
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#16A34A]/15 text-[#16A34A]">
                  Received
                </span>
              </div>
            </div>

            {/* Service & Customer Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs sm:text-sm text-[#0E4A68]">
              <div className="flex items-center gap-2.5">
                <FiFileText className="text-[#DE7423] shrink-0" size={16} />
                <span>
                  <strong className="font-semibold">Service:</strong> {serviceTitle}
                </span>
              </div>

              {customerName && (
                <div className="flex items-center gap-2.5">
                  <FiUser className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Guest:</strong> {customerName}
                    {country ? ` (${country})` : ""}
                  </span>
                </div>
              )}

              {hotelDisplay && (
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Location:</strong> {hotelDisplay}
                  </span>
                </div>
              )}

              {phone && (
                <div className="flex items-center gap-2.5">
                  <FiPhone className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Contact:</strong> {phone} (Via {commMethod})
                  </span>
                </div>
              )}

              {booking?.date && (
                <div className="flex items-center gap-2.5">
                  <FiCalendar className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Date:</strong> {booking.date}
                    {booking.numberOfDays ? ` (${booking.numberOfDays} days)` : ""}
                  </span>
                </div>
              )}

              {booking?.flightNumber && (
                <div className="flex items-center gap-2.5">
                  <FiFileText className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Flight:</strong> {booking.flightNumber}{" "}
                    {booking.noOfPersons ? `(${booking.noOfPersons} persons)` : ""}
                  </span>
                </div>
              )}

              {booking?.destinationTo && (
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Destination:</strong> {booking.destinationTo}
                  </span>
                </div>
              )}

              {booking?.guideLanguage && (
                <div className="flex items-center gap-2.5">
                  <FiFileText className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Guide Language:</strong> {booking.guideLanguage}
                  </span>
                </div>
              )}
            </div>

            {booking?.note && (
              <div className="mt-4 pt-3 border-t border-[#DE7423]/20 text-xs text-[#083952]">
                <strong className="font-semibold">Note:</strong> {booking.note}
              </div>
            )}
          </div>

          {/* WhatsApp Support Notice */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#25D366]/10 border border-[#25D366]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <FaWhatsapp size={22} />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#083952]">
                  Need Immediate Assistance?
                </h4>
                <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                  Our customer care team is available on WhatsApp to assist with your reservation.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/201289494715?text=${encodeURIComponent(
                customerName
                  ? `Hello, I would like to inquire about my reservation for ${serviceTitle} (${customerName})`
                  : `Hello, I would like to inquire about my reservation for ${serviceTitle}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <FaWhatsapp size={16} />
              <span>Contact on WhatsApp</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E5E5E5]">
            <Link
              href={`/${locale}`}
              style={{ backgroundColor: "#0E4A68" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[6px] text-white text-sm font-semibold shadow-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer text-center"
            >
              <FiHome size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceThankYouSection;
