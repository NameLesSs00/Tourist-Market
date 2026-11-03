"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TransferTripType } from "@/models/transferBooking";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferDiscountBannerProps {
  tripType: TransferTripType;
  discountPercentage?: number;
  additionalHourRate?: number;
  vehicleName?: string;
  onSelectRoundTrip?: () => void;
  locale?: string;
  currencySymbol?: string;
}

export function TransferDiscountBanner({
  tripType,
  discountPercentage = 15,
  additionalHourRate = 10,
  vehicleName,
  onSelectRoundTrip,
  locale = "en",
  currencySymbol = "$",
}: TransferDiscountBannerProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.discount;
  const isRoundTrip = tripType === TransferTripType.RoundTrip;
  const displayDiscount = discountPercentage > 0 ? discountPercentage : 15;
  const displayExtraHour = additionalHourRate > 0 ? additionalHourRate : 10;

  if (isRoundTrip) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#FFFFFF] rounded-[8.38px] border-[0.52px] border-[#888888] shadow-[0px_1.05px_8.38px_1.05px_rgba(0,0,0,0.2)] p-4 sm:p-5 md:p-6 space-y-4 font-poppins"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-[#00000010]">
          <h2 className="text-base sm:text-lg font-bold text-[#0E4A68]">
            {t.waitingTitle}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
            {displayDiscount}% {t.discountActive}
          </span>
        </div>

        {/* Free waiting box */}
        <div className="relative overflow-hidden bg-[#D9F0FC] border-[0.42px] border-[#00000066] rounded-[5.24px] flex items-center min-h-[50px]">
          <div className="w-[8px] self-stretch bg-[#0E4A68] border-r-[0.42px] border-[#00000066] rounded-tl-[5px] rounded-bl-[5px] shrink-0" />
          <div className="py-2.5 px-3.5 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0E4A68]">
            <Image
              src="/transfer/basil_present-solid.svg"
              alt="Free waiting"
              width={22}
              height={22}
              className="object-contain shrink-0"
            />
            <span>{t.freeWaiting}</span>
          </div>
        </div>

        {/* Additional hour rate related to the car */}
        <div className="text-xs sm:text-sm font-semibold text-[#0E4A68] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0E4A68]" />
          <span>
            {t.additionalHour} <span className="font-bold text-[#0E4A68]">{currencySymbol}{displayExtraHour.toFixed(2)}/hour</span>
            {vehicleName ? ` (${t.specificTo} ${vehicleName})` : ""}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={onSelectRoundTrip}
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectRoundTrip?.();
        }
      }}
      className="bg-[#0E4A68] rounded-[8.74px] p-5 sm:p-6 text-center text-[#FFFFFF] font-semibold flex flex-col items-center justify-center gap-3 shadow-[0px_8.74px_21.84px_0px_#0000004D] cursor-pointer hover:bg-[#0c405b] transition font-poppins focus:outline-none focus:ring-2 focus:ring-[#0E4A68]"
    >
      <div className="flex items-center justify-center gap-2.5 flex-wrap">
        <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
          <Image
            src="/transfer/Vector (1).svg"
            alt="Discount"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
        <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-white">
          {t.saveCallout.replace("{discount}", String(displayDiscount))}
        </span>
      </div>
      <span className="text-xs text-white/80 underline decoration-white/50">
        {t.clickToSwitch}
      </span>
    </motion.div>
  );
}

export default TransferDiscountBanner;
