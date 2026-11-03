"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCar, FaVanShuttle, FaBus, FaClock, FaCircleExclamation } from "react-icons/fa6";
import { TransferTripType } from "@/models/transferBooking";
import { getDictionary } from "@/shared/utils/getDictionary";

interface TransferVehicleCardProps {
  vehicleType?: string | null;
  adults: number;
  childrenCount: number;
  fromName: string;
  toName: string;
  tripType: TransferTripType;
  price: number;
  basePrice?: number;
  discount?: number;
  hourlyRate?: number;
  hasRouteSelected: boolean;
  isMatchError?: boolean;
  matchErrorMessage?: string | null;
  isLoading?: boolean;
  locale?: string;
  currencySymbol?: string;
}

function renderVehicleIcon(totalPax: number) {
  if (totalPax <= 4) {
    return <FaCar className="w-5 h-5 text-[#0E4A68]" />;
  }
  if (totalPax <= 9) {
    return <FaVanShuttle className="w-5 h-5 text-[#0E4A68]" />;
  }
  return <FaBus className="w-5 h-5 text-[#0E4A68]" />;
}

export function TransferVehicleCard({
  vehicleType,
  adults,
  childrenCount,
  fromName,
  toName,
  tripType,
  price,
  basePrice,
  discount,
  hourlyRate = 10,
  hasRouteSelected,
  isMatchError = false,
  matchErrorMessage,
  isLoading = false,
  locale = "en",
  currencySymbol = "$",
}: TransferVehicleCardProps) {
  const dict = getDictionary(locale);
  const t = dict.transfer.vehicle;
  const formT = dict.transfer.form;
  const totalPax = adults + childrenCount;
  const isRoundTrip = tripType === TransferTripType.RoundTrip;

  // Unselected State
  if (!hasRouteSelected) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="awaiting"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-[#EBF5FA] rounded-[8.74px] border border-[#0E4A68]/30 p-5 space-y-2 font-poppins text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#0E4A68]/20 shadow-xs">
                <FaCar className="w-5 h-5 text-[#0E4A68]/60" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-[#0E4A68]">
                  {t.assignment}
                </div>
                <div className="text-xs text-[#0E4A68]/70">
                  {t.awaitingRoute}
                </div>
              </div>
            </div>
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-[#0E4A68] border border-[#0E4A68]/20 shrink-0">
              {t.awaitingBadge}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Error State: No route price found
  if (hasRouteSelected && isMatchError && matchErrorMessage) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-rose-50/90 rounded-[8.74px] border border-rose-300 p-4 sm:p-5 space-y-2 font-poppins"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 border border-rose-300 text-rose-600 shadow-xs mt-0.5">
              <FaCircleExclamation className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-bold text-rose-800">
                {t.routeUnavailable}
              </div>
              <div className="text-xs text-rose-700 leading-relaxed font-medium">
                {matchErrorMessage}
              </div>
              <div className="text-[11px] text-rose-600/80 pt-1">
                {t.alternativeHelp}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  const formattedPrice = `${currencySymbol}${price.toFixed(2)}`;
  const displayBasePrice = basePrice ?? (isRoundTrip ? Math.round(price * 1.15) : price);
  const displayDiscount = discount ?? (isRoundTrip ? Math.max(0, displayBasePrice - price) : 0);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="matched"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#EBF5FA] rounded-[8.74px] border border-[#0E4A68] shadow-[0px_4px_16px_rgba(14,74,104,0.18)] p-4 sm:p-5 space-y-4 font-poppins"
      >
        {/* Top Row: Vehicle name, auto-assigned description & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#0E4A68]/20"
            >
              {renderVehicleIcon(totalPax)}
            </motion.div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#0E4A68]">
                {vehicleType || t.calculatingVehicle}
              </span>
              <span className="text-xs text-[#0E4A68]/80">
                {t.matchedFor} {adults} {adults === 1 ? t.adult : t.adults}
                {childrenCount > 0 ? ` · ${childrenCount} ${childrenCount === 1 ? t.child : t.children}` : ""}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-[#0E4A68]/80">
              {t.farePrefix} {isRoundTrip ? formT.roundTrip : formT.oneWay}
            </div>
            <div className="text-2xl font-bold text-[#0E4A68]">
              {isLoading ? (
                <span className="inline-block animate-pulse text-base font-medium">{t.calculating}</span>
              ) : (
                formattedPrice
              )}
            </div>
          </div>
        </div>

        {/* Middle: Additional Hour Rate related to the matched car */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-white/80 rounded-[6px] p-2.5 border border-[#0E4A68]/15">
          <div className="flex items-center gap-1.5 text-[#0E4A68] font-medium">
            <FaClock className="w-3.5 h-3.5 text-[#0E4A68]" />
            <span>{t.additionalHour}</span>
            <span className="font-bold">{currencySymbol}{hourlyRate.toFixed(2)} {t.perHour}</span>
          </div>
          <div className="text-[11px] text-[#0E4A68]/70">
            {t.rateSpecific} {vehicleType || "matched vehicle"}
          </div>
        </div>

        {/* Bottom Info: Route & People count, plus round-trip breakdown */}
        <div className="text-xs space-y-1.5 pt-2 border-t border-[#00000015]">
          <div className="font-semibold text-[#0E4A68]">
            {t.route} {fromName} → {toName}
          </div>
          <div className="text-[#0E4A68]/80">
            {t.totalPassengers} {totalPax} {totalPax === 1 ? t.passenger : t.passengers}
          </div>
          {isRoundTrip && (
            <div className="space-y-0.5 pt-1">
              <div className="text-[#0E4A68]/80">
                {t.standardFare} {currencySymbol}{displayBasePrice.toFixed(2)}
              </div>
              {displayDiscount > 0 && (
                <div className="text-[#0E4A68] font-semibold">
                  {t.discountApplied} -{currencySymbol}{displayDiscount.toFixed(2)}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TransferVehicleCard;
