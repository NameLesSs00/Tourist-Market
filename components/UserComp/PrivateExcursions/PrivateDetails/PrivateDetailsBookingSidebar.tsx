"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiCalendar,
  FiClock,
  FiHeadphones,
  FiChevronRight,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegramPlane, FaViber } from "react-icons/fa";
import { toast } from "sonner";
import { PrivateAttraction, PrivateExtraService } from "../types";
import { useVehicleTransferPrivateMatch } from "@/features/privateExcursions/useVehicleTransferPrivateMatch";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import {
  getTomorrowDateString,
  isBookingDateValid,
} from "@/shared/utils/dateAvailability";

interface PrivateDetailsBookingSidebarProps {
  excursionId?: string;
  selectedAttractions: PrivateAttraction[];
  selectedExtraServices: PrivateExtraService[];
  duration?: string;
  maxParticipants?: string;
  bookingDate?: string;
  onBookingDateChange?: (date: string) => void;
  adults?: number;
  onAdultsChange?: (adults: number) => void;
  children?: number;
  onChildrenChange?: (children: number) => void;
  infants?: number;
  onInfantsChange?: (infants: number) => void;
  onBookNow?: () => void;
  currency?: string;
  locale?: string;
  availabilityDays?: ExcursionAvailabilityDay[];
  availability?: string;
  /** When false the Book Now button is disabled */
  canBook?: boolean;
}

export function PrivateDetailsBookingSidebar({
  excursionId,
  selectedAttractions = [],
  selectedExtraServices = [],
  duration = "20 Hours",
  maxParticipants = "35 Person",
  bookingDate: controlledBookingDate,
  onBookingDateChange,
  adults: controlledAdults,
  onAdultsChange,
  children: controlledChildren,
  onChildrenChange,
  infants: controlledInfants,
  onInfantsChange,
  onBookNow,
  currency = "USD",
  locale = "en",
  availabilityDays = [],
  availability,
  canBook = false,
}: PrivateDetailsBookingSidebarProps) {
  const [internalDate, setInternalDate] = useState<string>("");
  const [internalAdults, setInternalAdults] = useState<number>(1);
  const [internalChildren, setInternalChildren] = useState<number>(0);
  const [internalInfants, setInternalInfants] = useState<number>(0);

  const bookingDate =
    controlledBookingDate !== undefined ? controlledBookingDate : internalDate;
  const setBookingDate = onBookingDateChange ?? setInternalDate;

  const adults =
    controlledAdults !== undefined ? controlledAdults : internalAdults;
  const setAdults = onAdultsChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(adults) : val;
        onAdultsChange(next);
      }
    : setInternalAdults;

  const children =
    controlledChildren !== undefined ? controlledChildren : internalChildren;
  const setChildren = onChildrenChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(children) : val;
        onChildrenChange(next);
      }
    : setInternalChildren;

  const infants =
    controlledInfants !== undefined ? controlledInfants : internalInfants;
  const setInfants = onInfantsChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(infants) : val;
        onInfantsChange(next);
      }
    : setInternalInfants;

  const totalPassengers = adults + children + infants;

  // Live vehicle match from backend
  const {
    data: matchedVehicle,
    isLoading: isVehicleLoading,
  } = useVehicleTransferPrivateMatch(
    excursionId,
    totalPassengers,
    locale,
    currency
  );

  // Price calculations (client-side for attractions/services)
  const attractionsTotal = selectedAttractions.reduce(
    (acc, att) =>
      acc +
      att.adultPrice * adults +
      att.childPrice * children +
      att.infantPrice * infants,
    0
  );

  const extrasTotal = selectedExtraServices.reduce(
    (acc, ext) =>
      acc +
      ext.adultPrice * adults +
      ext.childPrice * children +
      ext.infantPrice * infants,
    0
  );

  const vehiclePrice = matchedVehicle?.price ?? 0;
  const totalPrice = vehiclePrice + attractionsTotal + extrasTotal;

  const tomorrowStr = getTomorrowDateString();
  const dateValidation = isBookingDateValid(bookingDate, availabilityDays);
  const dateError = bookingDate ? dateValidation.error : undefined;

  const isDateValid = dateValidation.isValid;
  const hasAttractions = selectedAttractions.length > 0;
  const isReadyToBook = isDateValid && hasAttractions;

  const handleScrollToAttractions = () => {
    const el = document.getElementById("private-attractions-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToDate = () => {
    const el = document.getElementById("private-booking-date-input");
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleBookClick = () => {
    if (isReadyToBook) {
      onBookNow?.();
      return;
    }

    if (!bookingDate) {
      toast.error("Please select an excursion date to proceed.");
      handleScrollToDate();
      return;
    }

    if (dateError) {
      toast.error(dateError);
      handleScrollToDate();
      return;
    }

    if (!hasAttractions) {
      toast.error("Please select at least 1 attraction to include in your tour.");
      handleScrollToAttractions();
      return;
    }
  };

  const buttonLabel = isReadyToBook
    ? "Book Now"
    : !bookingDate || dateError
    ? "Select Date to Book"
    : "Select Attraction to Book";

  return (
    <aside className="w-full flex flex-col gap-6 font-poppins lg:sticky lg:top-24 lg:self-start">
      {/* BOOKING CARD */}
      <div
        className="w-full bg-white overflow-hidden"
        style={{
          border: "0.5px solid #888888",
          borderRadius: "10px",
          boxShadow: "0px 2px 14px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Header */}
        <div className="bg-[#DE7423] px-5 py-3.5 flex items-center gap-3 text-white">
          <div className="relative w-5 h-5 shrink-0">
            <Image
              src="/PrivateExcursions/Privatedetails/Vector (3).svg"
              alt="Calendar"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
          <h2 className="text-[17px] sm:text-[18px] font-bold tracking-wide">
            Book This Excursion
          </h2>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-5">
          {/* Booking Date */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              Booking Date
            </label>
            <div className="relative">
              <input
                id="private-booking-date-input"
                type="date"
                min={tomorrowStr}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border text-[14px] text-[#083952] focus:outline-none bg-white cursor-pointer transition-colors ${
                  dateError
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#BBBBBB] focus:border-[#DE7423]"
                }`}
              />
            </div>
            {dateError && (
              <p className="mt-1 text-xs text-red-500 font-medium leading-snug">
                {dateError}
              </p>
            )}
          </div>

          {/* Passenger Steppers */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Adult */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Adult
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Child */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="12" height="15" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Child
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={() => setChildren((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Infant */}
            <div
              className="flex flex-col items-center p-2.5 rounded-lg bg-white"
              style={{ border: "0.8px solid #CCCCCC" }}
            >
              <div className="w-5 h-5 mb-1 flex items-center justify-center text-[#DE7423]">
                <svg width="10" height="13" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C8.65685 0 10 1.34315 10 3C10 4.65685 8.65685 6 7 6C5.34315 6 4 4.65685 4 3C4 1.34315 5.34315 0 7 0ZM7 8C10.866 8 14 9.567 14 12V18H0V12C0 9.567 3.13401 8 7 8Z"
                    fill="#DE7423"
                  />
                </svg>
              </div>
              <span className="text-[13px] font-semibold text-[#0E4A68]">
                Infant
              </span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-[14px] font-bold text-[#083952] min-w-[16px] text-center">
                  {infants}
                </span>
                <button
                  type="button"
                  onClick={() => setInfants((prev) => prev + 1)}
                  className="w-6 h-6 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition-colors"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Row - live from backend */}
          <div>
            <label className="block text-[14px] font-semibold text-[#083952] mb-1.5">
              Vehicle Type
            </label>
            <div
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-white min-h-[52px]"
              style={{ border: "0.8px solid #BBBBBB" }}
            >
              {isVehicleLoading ? (
                <div className="flex items-center gap-2 text-[13px] text-gray-400">
                  <div className="w-4 h-4 border-2 border-[#DE7423] border-t-transparent rounded-full animate-spin" />
                  <span>Checking availability...</span>
                </div>
              ) : matchedVehicle ? (
                <>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-8 h-6 text-[#0E4A68] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 17h8M5 11l2-5h10l2 5M3 13v6h2v-2h14v2h2v-6l-2-2H5l-2 2z"
                      />
                      <circle cx="7.5" cy="14.5" r="1.5" />
                      <circle cx="16.5" cy="14.5" r="1.5" />
                    </svg>
                    <div>
                      <span className="text-[14px] font-semibold text-[#0E4A68] block">
                        {matchedVehicle.vehicleName}
                      </span>
                      <span className="text-[12px] text-gray-500">
                        {matchedVehicle.from}-{matchedVehicle.to} Passengers
                      </span>
                    </div>
                  </div>
                  <span className="text-[16px] font-bold text-[#DE7423]">
                    {matchedVehicle.price} {matchedVehicle.currency}
                  </span>
                </>
              ) : (
                <span className="text-[13px] text-gray-400 italic">
                  No vehicle available for this passenger count
                </span>
              )}
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="space-y-3 pt-1">
            <h3 className="text-[14px] font-bold text-[#083952]">
              Price Summary
            </h3>

            {/* Attractions Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <svg
                  className="w-4 h-4 text-[#DE7423]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <span>Attractions :</span>
              </div>
              {selectedAttractions.length === 0 ? (
                <p className="text-[12px] text-gray-500 italic pl-5">
                  No attractions selected
                </p>
              ) : (
                <div className="pl-5 space-y-1">
                  {selectedAttractions.map((att) => {
                    const sub =
                      att.adultPrice * adults +
                      att.childPrice * children +
                      att.infantPrice * infants;
                    return (
                      <div
                        key={att.id}
                        className="flex items-center justify-between text-[12px] text-[#444444]"
                      >
                        <span className="truncate pr-2 font-medium">
                          {att.title}
                        </span>
                        <span className="shrink-0 font-bold text-[#DE7423]">
                          {sub} $
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Attractions Total :</span>
                <span>{attractionsTotal} $</span>
              </div>
            </div>

            {/* Extra Services Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <svg
                  className="w-4 h-4 text-[#DE7423]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span>Extra Services :</span>
              </div>
              {selectedExtraServices.length === 0 ? (
                <p className="text-[12px] text-gray-500 italic pl-5">
                  No extra services selected
                </p>
              ) : (
                <div className="pl-5 space-y-1">
                  {selectedExtraServices.map((ext) => {
                    const sub =
                      ext.adultPrice * adults +
                      ext.childPrice * children +
                      ext.infantPrice * infants;
                    return (
                      <div
                        key={ext.id}
                        className="flex items-center justify-between text-[12px] text-[#444444]"
                      >
                        <span className="truncate pr-2 font-medium">
                          {ext.title}
                        </span>
                        <span className="shrink-0 font-bold text-[#DE7423]">
                          {sub} $
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Extras Total :</span>
                <span>{extrasTotal} $</span>
              </div>
            </div>

            {/* Vehicle Breakdown Box */}
            <div
              className="p-3 rounded-lg bg-white space-y-2"
              style={{ border: "0.6px solid #DE7423" }}
            >
              <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0E4A68]">
                <svg
                  className="w-4 h-4 text-[#DE7423]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 17h8M5 11l2-5h10l2 5M3 13v6h2v-2h14v2h2v-6l-2-2H5l-2 2z"
                  />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
                <span>Vehicle :</span>
              </div>
              {isVehicleLoading ? (
                <div className="pl-5 flex items-center gap-2 text-[12px] text-gray-400">
                  <div className="w-3 h-3 border-2 border-[#DE7423] border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : matchedVehicle ? (
                <div className="pl-5 flex items-center justify-between text-[12px] text-[#444444]">
                  <span>
                    {matchedVehicle.vehicleName} ({matchedVehicle.from}-{matchedVehicle.to} pax)
                  </span>
                  <span className="font-bold text-[#DE7423]">
                    {matchedVehicle.price} {matchedVehicle.currency}
                  </span>
                </div>
              ) : (
                <p className="pl-5 text-[12px] text-gray-400 italic">
                  No vehicle matched
                </p>
              )}
              <div className="border-t border-gray-100 pt-1.5 flex items-center justify-between text-[13px] font-bold text-[#DE7423]">
                <span>Vehicle Total :</span>
                <span>{vehiclePrice} {matchedVehicle?.currency ?? "$"}</span>
              </div>
            </div>

            {/* Total Price Row */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#083952]">
                Total Price:
              </span>
              <span className="text-[26px] sm:text-[28px] font-extrabold text-[#DE7423]">
                {totalPrice} {matchedVehicle?.currency ?? "$"}
              </span>
            </div>
          </div>

          {/* 3 Circular Badges Row */}
          <div className="pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            {/* Max Participants */}
            <div className="flex flex-col items-center">
              <div className="relative w-10 h-10 mb-1">
                <Image
                  src="/PrivateExcursions/Privatedetails/Frame 585.svg"
                  alt="Participants"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#666666]">
                {maxParticipants}
              </span>
            </div>

            {/* Date Type */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
                <FiCalendar size={18} />
              </div>
              <span className="text-[12px] font-semibold text-[#666666] truncate max-w-full">
                {availability || "Flexible"}
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#DE7423] flex items-center justify-center text-white mb-1">
                <FiClock size={18} />
              </div>
              <span className="text-[12px] font-semibold text-[#666666]">
                {duration}
              </span>
            </div>
          </div>

          {/* Booking Requirements Checklist Card */}
          <div className="p-3.5 rounded-lg bg-[#FFF8ED] border border-[#DE7423]/30 space-y-2.5">
            <div className="flex items-center justify-between text-[13px] font-bold text-[#0E4A68]">
              <span>Required to Book</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isReadyToBook
                    ? "bg-green-100 text-green-700"
                    : "bg-[#DE7423]/15 text-[#DE7423]"
                }`}
              >
                {isReadyToBook ? "Ready" : "Steps Missing"}
              </span>
            </div>

            <div className="space-y-2 text-[12px]">
              {/* Step 1: Date */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {isDateValid ? (
                    <svg
                      className="w-4 h-4 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#DE7423] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  <span
                    className={
                      isDateValid
                        ? "text-green-700 font-medium truncate"
                        : "text-[#083952] font-medium truncate"
                    }
                  >
                    {isDateValid
                      ? `Date: ${bookingDate}`
                      : dateError
                      ? dateError
                      : "Select an excursion date"}
                  </span>
                </div>
                {!isDateValid && (
                  <button
                    type="button"
                    onClick={handleScrollToDate}
                    className="text-[11px] font-semibold text-[#155F98] hover:underline shrink-0 cursor-pointer"
                  >
                    {dateError ? "Fix" : "Pick"}
                  </button>
                )}
              </div>

              {/* Step 2: Attractions */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {hasAttractions ? (
                    <svg
                      className="w-4 h-4 text-green-600 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-[#DE7423] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  <span
                    className={
                      hasAttractions
                        ? "text-green-700 font-medium truncate"
                        : "text-[#083952] font-medium truncate"
                    }
                  >
                    {hasAttractions
                      ? `${selectedAttractions.length} attraction${
                          selectedAttractions.length > 1 ? "s" : ""
                        } selected`
                      : "Select at least 1 attraction"}
                  </span>
                </div>
                {!hasAttractions && (
                  <button
                    type="button"
                    onClick={handleScrollToAttractions}
                    className="text-[11px] font-semibold text-[#155F98] hover:underline shrink-0 cursor-pointer"
                  >
                    Choose
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            type="button"
            onClick={handleBookClick}
            className="w-full py-3.5 px-4 text-center font-bold text-[16px] text-white transition-all bg-[#DE7423] hover:bg-[#C9641B] active:scale-[0.99] shadow cursor-pointer rounded-[10px]"
            style={{
              border: "0.25px solid rgba(136, 136, 136, 0.8)",
            }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      {/* NEED HELP CARD */}
      <div
        className="w-full bg-white p-5 rounded-xl space-y-4"
        style={{
          border: "0.8px solid #BBBBBB",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#124885]">
              <FiHeadphones size={20} />
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#124885] leading-snug">
                Need Help ?
              </h4>
              <p className="text-[12px] font-medium text-[#083043]">
                Contact us for Help
              </p>
            </div>
          </div>
          <FiChevronRight size={20} className="text-gray-400" />
        </div>

        {/* 3 Buttons: WhatsApp, Telegram, Viber */}
        <div className="space-y-2.5">
          <a
            href="https://wa.me/201012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 text-white font-semibold text-[14px] hover:opacity-95 transition-opacity"
            style={{ backgroundColor: "#17DB55" }}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://t.me/egypttouristmarket"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 text-white font-semibold text-[14px] hover:opacity-95 transition-opacity"
            style={{ backgroundColor: "#0E4A68" }}
          >
            <FaTelegramPlane size={18} />
            <span>Telegram</span>
          </a>

          <a
            href="viber://chat?number=201012345678"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2.5 font-semibold text-[14px] text-[#333333] hover:bg-gray-200 transition-colors"
            style={{ backgroundColor: "#F4F4F4" }}
          >
            <FaViber size={18} className="text-[#7360F2]" />
            <span>Viber</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
