"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { GroupExcursionDetail } from "../../types";
import {
  CreateGroupBookingResponse,
  GROUP_PAYMENT_METHOD_LABELS,
  GroupPaymentMethod,
} from "@/models/groupBooking";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";
import { useCurrencyStore } from "@/features/currencies/currencyStore";

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
  locale?: string;
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
  locale = "en",
}: BookingConfirmationCardProps) {
  const dict = useClientDictionary();
  const t = dict.groupExcursions.details.bookingForm;
  const formatPrice = useCurrencyStore((s) => s.formatPrice);
  const paymentLabel =
    paymentMethod === GroupPaymentMethod.CashOnArrival
      ? t.cashOnArrival
      : paymentMethod === GroupPaymentMethod.WhatsAppDirect
      ? t.whatsAppDirect
      : GROUP_PAYMENT_METHOD_LABELS[paymentMethod] || t.cashOnArrival;

  const guestSummary = [
    `${adults} ${dict.groupExcursions.details.sidebar.adult}`,
    children > 0 ? `${children} ${dict.groupExcursions.details.sidebar.child}` : "",
    infants > 0 ? `${infants} ${dict.groupExcursions.details.sidebar.infant}` : "",
  ].filter(Boolean).join(", ");

  const whatsappNoticeText = t.whatsappNotice.replace("{phone}", contactNumber);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[14px] border border-[#BBBBBB] p-5 sm:p-8 shadow-sm font-poppins">
      {/* Header */}
      <div className="text-center pb-6 border-b border-[#E5E5E5]">
        <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] mx-auto flex items-center justify-center mb-3">
          <FiCheck size={32} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E4A68] tracking-tight">
          {t.confirmedTitle}
        </h2>
        <p className="mt-1 text-sm text-[#444444]">
          {t.confirmedSubtitle}
        </p>
      </div>

      {/* Reference & Summary Box */}
      <div className="my-6 p-4 sm:p-5 rounded-xl bg-[#FFF8ED] border border-[#DE7423]/30 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#DE7423]/20 pb-3">
          <div>
            <div className="text-xs text-[#646464] font-medium">{t.bookingReference}</div>
            <div className="text-lg sm:text-xl font-extrabold text-[#0E4A68] tracking-wider">
              {confirmedBooking.bookingReference}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-[#646464] font-medium">{t.totalPrice}</div>
            <div className="text-lg sm:text-xl font-extrabold text-[#16A34A]">
              {formatPrice(confirmedBooking.totalPrice)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-[#0E4A68]">
          <div>
            <span className="font-semibold">{t.excursionLabel}</span> {detail.title}
          </div>
          <div>
            <span className="font-semibold">{t.dateLabelSummary}</span> {date}
          </div>
          <div>
            <span className="font-semibold">{t.customerLabel}</span> {customerName}
          </div>
          <div>
            <span className="font-semibold">{t.hotelLabel}</span> {hotelName} ({t.roomLabel} {roomNumber})
          </div>
          <div>
            <span className="font-semibold">{t.guestsLabel}</span> {guestSummary}
          </div>
          <div>
            <span className="font-semibold">{t.paymentLabel}</span> {paymentLabel}
          </div>
        </div>
      </div>

      {/* WhatsApp Notice */}
      <div className="p-4 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 flex items-start gap-3 text-xs sm:text-sm text-[#083952]">
        <FaWhatsapp className="text-[#16A34A] shrink-0 mt-0.5" size={20} />
        <div>
          <span className="font-bold">{t.nextStep}</span> {whatsappNoticeText}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-xl bg-[#0E4A68] hover:bg-[#09354b] text-white font-bold text-sm sm:text-base transition cursor-pointer"
        >
          {t.back}
        </button>
      </div>
    </div>
  );
}
