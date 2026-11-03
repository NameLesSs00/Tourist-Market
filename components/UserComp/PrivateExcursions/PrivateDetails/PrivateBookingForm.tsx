"use client";

import React, { useState } from "react";
import { FiArrowLeft, FiClock, FiLoader, FiMapPin } from "react-icons/fi";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { PrivateExcursionDetail } from "../types";
import { useCreatePrivateBookingMutation } from "@/features/privateBookings/useCreatePrivateBooking";
import { useBookingPriceCalculator } from "@/features/excursionPricing/useBookingPriceCalculator";
import { BookingPriceBreakdownCard } from "@/components/UserComp/Shared/BookingPriceBreakdownCard";
import { CreatePrivateBookingResponse, PrivatePaymentMethod } from "@/models/privateBooking";
import {
  BookingConfirmationCard,
  BookingContactFields,
  BookingPaymentSelector,
  BookingDateGuestsSelector,
} from "./booking";
import { isValidPhoneNumber } from "@/shared/utils/phoneUtils";
import { getTomorrowDateString, isBookingDateValid } from "@/shared/utils/dateAvailability";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateBookingFormProps {
  detail: PrivateExcursionDetail;
  onBack: () => void;
  initialDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialInfants?: number;
  selectedAttractionIds: string[];
  selectedExtraServiceIds: string[];
  locale?: string;
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
  locale = "en",
}: PrivateBookingFormProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.bookingForm;
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
  const [paymentMethod, setPaymentMethod] = useState<number>(PrivatePaymentMethod.CashOnArrival);
  const [notes, setNotes] = useState<string>("");

  const [confirmedBooking, setConfirmedBooking] = useState<CreatePrivateBookingResponse | null>(null);

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
      toast.error(dateValidation.error || (t.valSelectDate || "Please select a valid booking date."));
      return;
    }
    if (adults < 1) { toast.error(t.valMinAdult || "At least 1 adult is required."); return; }
    if (!customerName.trim() || customerName.trim().length < 2) {
      toast.error(t.valFullName || "Please enter your full name (at least 2 characters).");
      return;
    }
    if (!phone.trim()) { toast.error(t.valPhone || "Please enter your phone number."); return; }
    if (!isValidPhoneNumber(phone)) {
      toast.error(t.valPhoneDigits || "Please enter a valid phone number (7 to 15 digits).");
      return;
    }

    const effectiveWhatsApp = sameAsPhone ? phone.trim() : whatsApp.trim();
    if (!effectiveWhatsApp) { toast.error(t.valWhatsApp || "Please enter your WhatsApp number."); return; }
    if (!isValidPhoneNumber(effectiveWhatsApp)) {
      toast.error(t.valWhatsAppDigits || "Please enter a valid WhatsApp number (7 to 15 digits).");
      return;
    }
    if (!hotelName.trim() || hotelName.trim().length < 2) {
      toast.error(t.valHotel || "Please enter your hotel or resort name for pickup (at least 2 characters).");
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
          toast.success(t.valSuccess || "Private tour booked successfully!");
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
        locale={locale}
      />
    );
  }

  const dateValidation = isBookingDateValid(date, detail.availabilityDays);
  const dateError = date ? dateValidation.error : undefined;
  const selectedAttractionNames = detail.attractions.filter((a) => selectedAttractionIds.includes(a.id)).map((a) => a.title);
  const selectedServiceNames = detail.extraServices.filter((s) => selectedExtraServiceIds.includes(s.id)).map((s) => s.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-5 sm:p-7 shadow-sm font-poppins"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:text-[#DE7423] transition-colors mb-5 cursor-pointer"
      >
        <FiArrowLeft size={16} />
        <span>{t.backToDetails || "Back to Excursion Details"}</span>
      </button>

      <div className="pb-5 border-b border-[#E5E5E5] space-y-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0E4A68] tracking-tight">
          {detail.title}
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
            <span>{dict.privateExcursions.details.defaultPickup || "Hotel Pickup Included"}</span>
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <BookingDateGuestsSelector
          date={date}
          onDateChange={setDate}
          tomorrowStr={tomorrowStr}
          dateError={dateError}
          adults={adults}
          onAdultsChange={setAdults}
          children={children}
          onChildrenChange={setChildren}
          infants={infants}
          onInfantsChange={setInfants}
          selectedAttractionNames={selectedAttractionNames}
          maxAttractions={detail.maxAttractions}
          selectedServiceNames={selectedServiceNames}
          locale={locale}
        />

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#0E4A68]">
            {t.summary || "Price Breakdown Preview"}
          </label>
          <BookingPriceBreakdownCard
            privateResult={privateResult}
            isLoading={isCalculating}
            locale={locale}
          />
        </div>

        <BookingContactFields
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          phone={phone}
          onPhoneChange={(val) => {
            setPhone(val);
            if (sameAsPhone) setWhatsApp(val);
          }}
          whatsApp={whatsApp}
          onWhatsAppChange={setWhatsApp}
          sameAsPhone={sameAsPhone}
          onSameAsPhoneChange={(checked) => {
            setSameAsPhone(checked);
            if (checked) setWhatsApp(phone);
          }}
          hotelName={hotelName}
          onHotelNameChange={setHotelName}
          roomNumber={roomNumber}
          onRoomNumberChange={setRoomNumber}
          notes={notes}
          onNotesChange={setNotes}
          locale={locale}
        />

        <BookingPaymentSelector
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          locale={locale}
        />

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
                <span>{t.submitting || "Processing Private Booking..."}</span>
              </>
            ) : (
              <span>{t.confirmAndBook || "Confirm & Book Private Tour"}</span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default PrivateBookingForm;
