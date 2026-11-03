"use client";

import React from "react";
import { motion } from "framer-motion";
import { TransferTripType } from "@/models/transferBooking";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferSummaryCardProps {
  vehicleType?: string | null;
  totalPrice: number;
  basePrice?: number;
  discountAmount?: number;
  discountPercentage?: number;
  additionalHours?: number;
  additionalHourRate?: number;
  tripType: TransferTripType;
  hasRouteSelected: boolean;
  isMatchError?: boolean;
  matchErrorMessage?: string | null;
  isSubmitting?: boolean;
  onSubmit: () => void;
  locale?: string;
  currencySymbol?: string;
}

export function TransferSummaryCard({
  vehicleType,
  totalPrice,
  basePrice = 0,
  discountAmount = 0,
  discountPercentage = 15,
  additionalHours = 0,
  additionalHourRate = 10,
  tripType,
  hasRouteSelected,
  isMatchError = false,
  matchErrorMessage,
  isSubmitting = false,
  onSubmit,
  locale = "en",
  currencySymbol = "$",
}: TransferSummaryCardProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.summary;
  const vehicleT = dict.transfer.vehicle;
  const confirmT = dict.transfer.confirmation;

  const isRoundTrip = tripType === TransferTripType.RoundTrip;
  const formattedPrice = isMatchError
    ? t.unavailable
    : hasRouteSelected
    ? `${currencySymbol}${totalPrice.toFixed(2)}`
    : `${currencySymbol}0.00`;
  const extraHoursPrice = additionalHours * additionalHourRate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-6 font-poppins"
    >
      {/* Booking Summary Box */}
      <div className="bg-[#0E4A68] rounded-[12.57px] border-[0.52px] border-[#888888] p-5 sm:p-6 text-white shadow-sm space-y-3.5">
        <h2 className="text-base sm:text-lg font-bold text-white">
          {t.title}
        </h2>

        {/* Vehicle Type Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-200">{t.vehicleType}</span>
          <span className="font-bold text-white">
            {isMatchError
              ? t.unavailable
              : hasRouteSelected
              ? (vehicleType || "Matched Vehicle")
              : t.pendingRoute}
          </span>
        </div>

        {/* Route Base Fare */}
        {hasRouteSelected && !isMatchError && typeof basePrice === "number" && basePrice > 0 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-200">
            <span>{t.baseFare}</span>
            <span>{currencySymbol}{basePrice.toFixed(2)}</span>
          </div>
        )}

        {/* Round Trip Discount */}
        {hasRouteSelected && !isMatchError && isRoundTrip && discountAmount > 0 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-300">
            <span>{t.discount} ({discountPercentage}%):</span>
            <span>-{currencySymbol}{discountAmount.toFixed(2)}</span>
          </div>
        )}

        {/* Additional Hours Line Item */}
        {!isMatchError && additionalHours > 0 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-amber-200">
            <span>{t.extraWaiting} ({additionalHours} {confirmT.hours} @ {currencySymbol}{additionalHourRate}{vehicleT.perHour}):</span>
            <span>+{currencySymbol}{extraHoursPrice.toFixed(2)}</span>
          </div>
        )}

        {/* Total Price Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-white/20">
          <span className="text-white font-semibold">{t.totalFare}</span>
          <span
            className={`font-bold text-lg sm:text-xl ${
              isMatchError ? "text-rose-300 text-sm sm:text-base font-semibold" : "text-[#F0C060]"
            }`}
          >
            {formattedPrice}
          </span>
        </div>

        {/* Dynamic Offer Banner */}
        <div className="bg-[#12647C] rounded-[6.29px] p-3 text-center text-xs sm:text-sm font-medium text-white shadow-xs">
          {isMatchError
            ? matchErrorMessage || t.noRoutePrice
            : isRoundTrip
            ? t.discountBanner.replace("{discount}", String(discountPercentage))
            : t.saveBanner.replace("{discount}", String(discountPercentage))}
        </div>
      </div>

      {/* Submit Booking Button */}
      <div className="flex justify-center">
        <motion.button
          type="button"
          whileHover={{ scale: isSubmitting || !hasRouteSelected || isMatchError ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting || !hasRouteSelected || isMatchError ? 1 : 0.98 }}
          onClick={onSubmit}
          disabled={isSubmitting || !hasRouteSelected || isMatchError}
          className="w-full sm:w-auto bg-[#0E4A68] hover:bg-[#0c405b] text-[#FFFFFF] font-semibold text-sm sm:text-base px-8 sm:px-14 py-3 rounded-[8.38px] shadow-[0px_2.1px_8.38px_0px_#00000033] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>{t.submitting}</span>
            </>
          ) : isMatchError ? (
            <span>{vehicleT.routeUnavailable}</span>
          ) : !hasRouteSelected ? (
            <span>{t.selectPrompt}</span>
          ) : (
            <span>{t.submit}</span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TransferSummaryCard;
