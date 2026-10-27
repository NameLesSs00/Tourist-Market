"use client";

import React, { useState } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiHome,
  FiLoader,
} from "react-icons/fi";
import { toast } from "sonner";
import { GroupExcursionDetail } from "../types";
import { useCreateGroupBookingMutation } from "@/features/groupBookings/useCreateGroupBooking";
import { useBookingPriceCalculator } from "@/features/excursionPricing/useBookingPriceCalculator";
import { BookingPriceBreakdownCard } from "@/components/UserComp/Shared/BookingPriceBreakdownCard";
import {
  CreateGroupBookingResponse,
  GroupPaymentMethod,
} from "@/models/groupBooking";
import {
  BookingConfirmationCard,
  BookingContactFields,
  BookingGuestsSelector,
  BookingPaymentSelector,
} from "./booking";

interface GroupBookingFormProps {
  detail: GroupExcursionDetail;
  onBack: () => void;
  initialDate?: string;
  initialAdults?: number;
  initialChildren?: number;
  initialInfants?: number;
}

export function GroupBookingForm({
  detail,
  onBack,
  initialDate = "",
  initialAdults = 1,
  initialChildren = 0,
  initialInfants = 0,
}: GroupBookingFormProps) {
  const tomorrowStr = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

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
    GroupPaymentMethod.CashOnArrival
  );
  const [notes, setNotes] = useState<string>("");

  const [confirmedBooking, setConfirmedBooking] =
    useState<CreateGroupBookingResponse | null>(null);

  // Live Price Preview from POST /api/excursions/{id}/group-price-preview
  // Fires only when inputs (adults, children, infants, currency) change
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
    setPhone(val);
    if (sameAsPhone) {
      setWhatsApp(val);
    }
  };

  const handleSameAsPhoneToggle = (checked: boolean) => {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsApp(phone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a trip date.");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your contact phone number.");
      return;
    }
    const finalWhatsApp = sameAsPhone ? phone.trim() : whatsApp.trim();
    if (!finalWhatsApp) {
      toast.error("Please enter your WhatsApp number.");
      return;
    }
    if (!hotelName.trim()) {
      toast.error("Please enter your hotel name for pickup.");
      return;
    }
    if (!roomNumber.trim()) {
      toast.error("Please enter your hotel room number.");
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
          toast.success(res.message || "Group booking created successfully.");
        },
      }
    );
  };

  // SUCCESS CONFIRMATION VIEW
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
      />
    );
  }

  // ACTIVE BOOKING FORM VIEW
  return (
    <div className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-4 sm:p-7 shadow-sm font-poppins">
      {/* Header: Back Button + Excursion Title Strip */}
      <div className="pb-4 border-b border-[#E5E5E5]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:underline mb-3 cursor-pointer"
        >
          <FiArrowLeft size={16} />
          <span>Back to Excursion Details</span>
        </button>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0E4A68] tracking-tight">
              Book: {detail.title}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-[#646464]">
              {detail.badge && (
                <span className="bg-[#FFF8ED] text-[#0E4A68] font-semibold px-2 py-0.5 rounded-full border border-[#0E4A68]/20">
                  {detail.badge}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FiClock size={12} />
                {detail.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* 1. Date & Guests Steppers */}
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
        />

        {/* Live Price Breakdown Card from POST /api/excursions/{id}/group-price-preview */}
        <div className="pt-2">
          <BookingPriceBreakdownCard
            groupResult={groupResult}
            isLoading={isCalculating}
          />
        </div>

        {/* 2. Customer Contact */}
        <BookingContactFields
          customerName={customerName}
          onCustomerNameChange={setCustomerName}
          phone={phone}
          onPhoneChange={handlePhoneChange}
          whatsApp={whatsApp}
          onWhatsAppChange={setWhatsApp}
          sameAsPhone={sameAsPhone}
          onSameAsPhoneToggle={handleSameAsPhoneToggle}
        />

        {/* 3. Hotel Pickup Location */}
        <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
          <h3 className="text-sm sm:text-base font-bold text-[#0E4A68] flex items-center gap-2">
            <FiHome className="text-[#DE7423]" />
            <span>3. Hotel Pickup Location</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#083952] mb-1">
                Hotel / Resort Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Sunrise Holidays Resort Hurghada"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#083952] mb-1">
                Room Number *
              </label>
              <input
                type="text"
                placeholder="e.g. 412"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423]"
              />
            </div>
          </div>
        </div>

        {/* 4. Payment Method */}
        <BookingPaymentSelector
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />

        {/* 5. Special Notes */}
        <div className="space-y-2 pt-4 border-t border-[#E5E5E5]">
          <label className="block text-xs font-semibold text-[#083952]">
            Special Requests or Notes (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Vegetarian meal for 1 person, child stroller needed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#BBBBBB] text-base sm:text-sm text-[#083952] focus:outline-none focus:border-[#DE7423] resize-none"
          />
        </div>

        {/* Submit Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-[10px] bg-[#0E4A68] hover:bg-[#09354b] active:scale-[0.99] text-white font-poppins font-bold text-base transition shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              border: "0.25px solid #000000",
            }}
          >
            {isPending ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                <span>Processing Booking...</span>
              </>
            ) : (
              <span>Confirm & Book Group Excursion</span>
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={isPending}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl border border-[#BBBBBB] text-[#0E4A68] font-semibold text-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupBookingForm;
