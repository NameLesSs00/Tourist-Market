"use client";

import React, { useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiLoader,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiTag,
  FiUser,
} from "react-icons/fi";
import { toast } from "sonner";
import type { PrivateExcursionDetail } from "../types";
import { useCreatePrivateBookingMutation } from "@/features/privateBookings/useCreatePrivateBooking";
import { useBookingPriceCalculator } from "@/features/excursionPricing/useBookingPriceCalculator";
import { BookingPriceBreakdownCard } from "@/components/UserComp/Shared/BookingPriceBreakdownCard";
import {
  CreatePrivateBookingResponse,
  PrivatePaymentMethod,
} from "@/models/privateBooking";
import {
  BookingConfirmationCard,
  BookingContactFields,
  BookingPaymentSelector,
} from "./booking";
import {
  getTomorrowDateString,
  isBookingDateValid,
} from "@/shared/utils/dateAvailability";

interface PrivateBookingFormProps {
  detail: PrivateExcursionDetail;
  onBack: () => void;
  initialDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialInfants?: number;
  selectedAttractionIds: string[];
  selectedExtraServiceIds: string[];
}

export function PrivateBookingForm({
  detail,
  onBack,
  initialDate = "",
  initialAdults = 1,
  initialChildren = 0,
  initialInfants = 0,
  selectedAttractionIds = [],
  selectedExtraServiceIds = [],
}: PrivateBookingFormProps) {
  const tomorrowStr = getTomorrowDateString();

  const [date, setDate] = useState<string>(initialDate || tomorrowStr);
  const [adults, setAdults] = useState<number>(Math.max(1, initialAdults));
  const [children, setChildren] = useState<number>(initialChildren);
  const [infants, setInfants] = useState<number>(initialInfants);

  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [whatsApp, setWhatsApp] = useState<string>("");
  const [sameAsPhone, setSameAsPhone] = useState<boolean>(true);
  const [hotelName, setHotelName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<number>(
    PrivatePaymentMethod.CashOnArrival
  );
  const [notes, setNotes] = useState<string>("");

  const [confirmedBooking, setConfirmedBooking] =
    useState<CreatePrivateBookingResponse | null>(null);

  // Live Price Preview from POST /api/excursions/{id}/private-price-preview
  const { privateResult, isLoading: isCalculating } = useBookingPriceCalculator({
    excursionId: detail.id,
    isPrivate: true,
    adults,
    children,
    infants,
    selectedAttractionIds,
    selectedServiceIds: selectedExtraServiceIds,
    currency: detail.currency || "USD",
  });

  const { mutate: submitBooking, isPending } = useCreatePrivateBookingMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateValidation = isBookingDateValid(date, detail.availabilityDays);
    if (!dateValidation.isValid) {
      toast.error(dateValidation.error || "Please select a valid booking date.");
      return;
    }

    if (adults < 1) {
      toast.error("At least 1 adult is required.");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    const effectiveWhatsApp = sameAsPhone ? phone.trim() : whatsApp.trim();
    if (!effectiveWhatsApp) {
      toast.error("Please enter a valid WhatsApp number.");
      return;
    }

    if (!hotelName.trim()) {
      toast.error("Please enter your hotel or resort name for pickup.");
      return;
    }

    const excursionDateIso = new Date(date).toISOString();

    submitBooking(
      {
        customerName: customerName.trim(),
        phone: phone.trim(),
        whatsApp: effectiveWhatsApp,
        hotelName: hotelName.trim(),
        roomNumber: roomNumber.trim(),
        paymentMethod,
        notes: notes.trim() || undefined,
        excursions: [
          {
            excursionId: detail.id,
            excursionDate: excursionDateIso,
            adultsCount: adults,
            childrenCount: children,
            infantsCount: infants,
            attractionIds: selectedAttractionIds,
            serviceIds: selectedExtraServiceIds,
          },
        ],
      },
      {
        onSuccess: (res) => {
          setConfirmedBooking(res);
          toast.success("Private tour booked successfully!");
        },
      }
    );
  };

  if (confirmedBooking) {
    return (
      <BookingConfirmationCard
        confirmedBooking={confirmedBooking}
        detail={detail}
        date={date}
        customerName={customerName}
        hotelName={hotelName}
        roomNumber={roomNumber}
        adults={adults}
        children={children}
        infants={infants}
        selectedAttractionsCount={selectedAttractionIds.length}
        selectedServicesCount={selectedExtraServiceIds.length}
        paymentMethod={paymentMethod}
        contactNumber={sameAsPhone ? phone : whatsApp}
        onBack={onBack}
      />
    );
  }

  const dateValidation = isBookingDateValid(date, detail.availabilityDays);
  const dateError = date ? dateValidation.error : undefined;

  const selectedAttractionNames = detail.attractions
    .filter((a) => selectedAttractionIds.includes(a.id))
    .map((a) => a.title);

  const selectedServiceNames = detail.extraServices
    .filter((s) => selectedExtraServiceIds.includes(s.id))
    .map((s) => s.title);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-5 sm:p-7 shadow-sm font-poppins">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:text-[#DE7423] transition-colors mb-5 cursor-pointer"
      >
        <FiArrowLeft size={16} />
        <span>Back to Excursion Details</span>
      </button>

      {/* Header Info */}
      <div className="pb-5 border-b border-[#E5E5E5] space-y-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0E4A68] tracking-tight">
          Book: {detail.title}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#444444]">
          <span className="px-2.5 py-1 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] font-semibold">
            {detail.badge}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <FiClock className="text-[#DE7423]" />
            <span>{detail.duration}</span>
          </span>
          <span className="flex items-center gap-1 font-medium">
            <FiMapPin className="text-[#DE7423]" />
            <span>Hotel Pickup Included</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* 1. Date & Guests Selection */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
            <FiCalendar className="text-[#DE7423]" />
            <span>1. Select Date & Guests</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Excursion Date */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Excursion Date *
              </label>
              <input
                type="date"
                required
                min={tomorrowStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm text-[#0E4A68] focus:outline-none bg-white cursor-pointer transition-colors ${
                  dateError
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#BBBBBB] focus:border-[#DE7423]"
                }`}
              />
              {dateError && (
                <p className="mt-1 text-xs text-red-500 font-medium leading-snug">
                  {dateError}
                </p>
              )}
            </div>

            {/* Adults */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Adults *
              </label>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-sm font-bold text-[#0E4A68]">{adults}</span>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => prev + 1)}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Children */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Children
              </label>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
                <button
                  type="button"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-sm font-bold text-[#0E4A68]">{children}</span>
                <button
                  type="button"
                  onClick={() => setChildren((prev) => prev + 1)}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div>
              <label className="block text-xs font-semibold text-[#0E4A68] mb-1">
                Infants
              </label>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#BBBBBB] bg-white">
                <button
                  type="button"
                  onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiMinus size={12} />
                </button>
                <span className="text-sm font-bold text-[#0E4A68]">{infants}</span>
                <button
                  type="button"
                  onClick={() => setInfants((prev) => prev + 1)}
                  className="w-7 h-7 rounded border border-[#888888] flex items-center justify-center text-[#444444] hover:border-[#DE7423] transition cursor-pointer"
                >
                  <FiPlus size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Attractions & Extra Services Summary Pills */}
        <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#0E4A68] flex items-center gap-1.5">
              <FiTag className="text-[#DE7423]" />
              <span>Selected Attractions ({selectedAttractionIds.length} / {detail.maxAttractions} Max)</span>
            </span>
            <span className="text-[11px] text-[#646464]">
              Included in your itinerary
            </span>
          </div>

          {selectedAttractionNames.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {selectedAttractionNames.map((name, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#DE7423]/40 text-xs font-medium text-[#0E4A68]"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#888888] italic">
              No attractions selected. You can go back to pick up to {detail.maxAttractions} attractions.
            </p>
          )}

          {selectedServiceNames.length > 0 && (
            <div className="pt-2 border-t border-[#DE7423]/15">
              <span className="text-xs font-bold text-[#0E4A68] block mb-1.5">
                Extra Services ({selectedServiceNames.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedServiceNames.map((name, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#0E4A68]/30 text-xs font-medium text-[#0E4A68]"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Pricing Breakdown Card */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#0E4A68]">
            Price Breakdown Preview
          </label>
          <BookingPriceBreakdownCard
            privateResult={privateResult}
            isLoading={isCalculating}
          />
        </div>

        {/* 2 & 3. Traveler & Pickup Information */}
        <BookingContactFields
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          phone={phone}
          onPhoneChange={setPhone}
          whatsApp={whatsApp}
          onWhatsAppChange={setWhatsApp}
          sameAsPhone={sameAsPhone}
          onSameAsPhoneChange={setSameAsPhone}
          hotelName={hotelName}
          onHotelNameChange={setHotelName}
          roomNumber={roomNumber}
          onRoomNumberChange={setRoomNumber}
          notes={notes}
          onNotesChange={setNotes}
        />

        {/* 4. Payment Method */}
        <BookingPaymentSelector
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#646464]">
            Free cancellation up to 24 hours prior to departure.
          </div>

          <button
            type="submit"
            disabled={isPending || !dateValidation.isValid}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#DE7423] hover:bg-[#C9641B] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isPending ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                <span>Processing Private Booking...</span>
              </>
            ) : (
              <span>Confirm & Book Private Tour</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

