"use client";

import React, { useState } from "react";
import { FiArrowLeft, FiClock, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { GroupExcursionDetail } from "../types";
import { useCreateGroupBookingMutation } from "@/features/groupBookings/useCreateGroupBooking";
import { useBookingPriceCalculator } from "@/features/excursionPricing/useBookingPriceCalculator";
import { BookingPriceBreakdownCard } from "@/components/UserComp/Shared/BookingPriceBreakdownCard";
import { CreateGroupBookingResponse, GroupPaymentMethod } from "@/models/groupBooking";
import {
  BookingConfirmationCard,
  BookingContactFields,
  BookingGuestsSelector,
  BookingPaymentSelector,
  BookingPickupFields,
} from "./booking";
import { isValidPhoneNumber, sanitizePhoneNumber } from "@/shared/utils/phoneUtils";
import { getDictionary } from "@/shared/utils/getDictionary";
import { formatGroupDuration } from "../utils/groupDetailLocalization";

interface GroupBookingFormProps {
  detail: GroupExcursionDetail;
  onBack: () => void;
  locale?: string;
  initialDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialInfants?: number;
}

export function GroupBookingForm({
  detail,
  onBack,
  locale = "en",
  initialDate = "",
  initialAdults = 1,
  initialChildren = 0,
  initialInfants = 0,
}: GroupBookingFormProps) {
  const dict = getDictionary(locale);
  const t = dict.groupExcursions.details.bookingForm;
  const heroT = dict.groupExcursions.details.hero;

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
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
  const [paymentMethod, setPaymentMethod] = useState<number>(GroupPaymentMethod.CashOnArrival);
  const [notes, setNotes] = useState<string>("");
  const [confirmedBooking, setConfirmedBooking] = useState<CreateGroupBookingResponse | null>(null);

  const { groupResult, isLoading: isCalculating } = useBookingPriceCalculator({
    excursionId: detail.id,
    isPrivate: false,
    adults,
    children,
    infants,
    currency: detail.currency || "USD",
  });

  const { mutate: submitBooking, isPending } = useCreateGroupBookingMutation();

  const handlePhoneChange = (val: string) => {
    const sanitized = sanitizePhoneNumber(val);
    setPhone(sanitized);
    if (sameAsPhone) setWhatsApp(sanitized);
  };

  const handleSameAsPhoneToggle = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) setWhatsApp(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalWhatsApp = sameAsPhone ? phone.trim() : whatsApp.trim();

    if (!customerName.trim() || customerName.trim().length < 2) {
      toast.error(t.valName);
      return;
    }
    if (!phone.trim() || !isValidPhoneNumber(phone)) {
      toast.error(t.valPhone);
      return;
    }
    if (!finalWhatsApp || !isValidPhoneNumber(finalWhatsApp)) {
      toast.error(t.valWhatsApp);
      return;
    }
    if (!hotelName.trim() || hotelName.trim().length < 2) {
      toast.error(t.valHotel);
      return;
    }
    if (!roomNumber.trim()) {
      toast.error(t.valRoom);
      return;
    }

    const totalGuests = adults + children + infants;
    if (detail.maxParticipants && detail.maxParticipants > 0 && totalGuests > detail.maxParticipants) {
      toast.error(`${t.valMaxGuests} (${detail.maxParticipants}).`);
      return;
    }

    const isoDate = new Date(`${date}T08:00:00.000Z`).toISOString();
    submitBooking(
      {
        customerName: customerName.trim(),
        phone: phone.trim(),
        whatsApp: finalWhatsApp,
        hotelName: hotelName.trim(),
        roomNumber: roomNumber.trim(),
        paymentMethod,
        notes: notes.trim() || undefined,
        excursions: [
          {
            excursionId: detail.id,
            excursionDate: isoDate,
            adultsCount: adults,
            childrenCount: children,
            infantsCount: infants,
          },
        ],
      },
      {
        onSuccess: (res) => {
          setConfirmedBooking(res);
          toast.success(t.successToast);
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || err?.message || t.errorToast);
        },
      }
    );
  };

  const formattedDuration = formatGroupDuration(
    detail.durationHours,
    detail.duration,
    locale,
    heroT
  );

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
        paymentMethod={paymentMethod}
        contactNumber={sameAsPhone ? phone : whatsApp}
        onBack={onBack}
        locale={locale}
      />
    );
  }

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-4 sm:p-7 shadow-sm font-poppins">
      <div className="pb-4 border-b border-[#E5E5E5]">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:underline mb-3 cursor-pointer"
        >
          <FiArrowLeft size={16} />
          <span>{t.back}</span>
        </motion.button>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight">
              {t.bookPrefix} {detail.title}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#646464]">
              {detail.badge && (
                <span className="bg-[#FFF8ED] text-[#0E4A68] font-semibold px-2 py-0.5 rounded-full border border-[#0E4A68]/20">
                  {detail.badge}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FiClock size={12} />
                {formattedDuration}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <BookingGuestsSelector
          date={date}
          onDateChange={setDate}
          minDate={tomorrowStr}
          adults={adults}
          onAdultsChange={setAdults}
          adultPrice={detail.adultPrice}
          children={children}
          onChildrenChange={setChildren}
          childPrice={detail.childPrice}
          infants={infants}
          onInfantsChange={setInfants}
          infantPrice={detail.infantPrice}
          maxParticipants={detail.maxParticipants}
          locale={locale}
        />

        <div className="pt-2">
          <BookingPriceBreakdownCard groupResult={groupResult} isLoading={isCalculating} locale={locale} />
        </div>

        <BookingContactFields
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          phone={phone}
          onPhoneChange={handlePhoneChange}
          whatsApp={whatsApp}
          onWhatsAppChange={setWhatsApp}
          sameAsPhone={sameAsPhone}
          onSameAsPhoneToggle={handleSameAsPhoneToggle}
          locale={locale}
        />

        <BookingPickupFields
          hotelName={hotelName}
          onHotelNameChange={setHotelName}
          roomNumber={roomNumber}
          onRoomNumberChange={setRoomNumber}
          locale={locale}
        />

        <BookingPaymentSelector paymentMethod={paymentMethod} onPaymentMethodChange={setPaymentMethod} locale={locale} />

        <div className="space-y-2 pt-4 border-t border-[#E5E5E5]">
          <label className="block text-xs font-semibold text-[#083952]">{t.notesTitle}</label>
          <textarea
            rows={2}
            placeholder={t.notesPlaceholder}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
          />
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-[10px] bg-[#0E4A68] hover:bg-[#09354b] text-white font-poppins font-bold text-base transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-black/25"
          >
            {isPending ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                <span>{t.submitting}</span>
              </>
            ) : (
              <span>{t.submit}</span>
            )}
          </motion.button>

          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl border border-[#BBBBBB] text-[#0E4A68] font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupBookingForm;
