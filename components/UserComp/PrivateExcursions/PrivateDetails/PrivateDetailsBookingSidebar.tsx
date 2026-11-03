"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { NeedHelpCard } from "@/components/UserComp/Shared/NeedHelpCard";
import { toast } from "sonner";
import { PrivateAttraction, PrivateExtraService } from "../types";
import { useVehicleTransferPrivateMatch } from "@/features/privateExcursions/useVehicleTransferPrivateMatch";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import {
  getTomorrowDateString,
  isBookingDateValid,
} from "@/shared/utils/dateAvailability";
import { getDictionary } from "@/shared/utils/getDictionary";
import { useCurrencyStore } from "@/features/currencies/currencyStore";
import { PrivateSidebarDatePassengers } from "./sidebar/PrivateSidebarDatePassengers";
import { PrivateSidebarPriceBreakdown } from "./sidebar/PrivateSidebarPriceBreakdown";
import { PrivateSidebarChecklist } from "./sidebar/PrivateSidebarChecklist";

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
  canBook?: boolean;
}

export function PrivateDetailsBookingSidebar({
  excursionId,
  selectedAttractions = [],
  selectedExtraServices = [],
  duration,
  maxParticipants,
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
}: PrivateDetailsBookingSidebarProps) {
  const dict = getDictionary(locale);
  const t = dict.privateExcursions.details.sidebar;
  const selectedCurrency = useCurrencyStore((s) => s.selectedCurrency);

  const [internalDate, setInternalDate] = useState<string>("");
  const [internalAdults, setInternalAdults] = useState<number>(1);
  const [internalChildren, setInternalChildren] = useState<number>(0);
  const [internalInfants, setInternalInfants] = useState<number>(0);

  const bookingDate = controlledBookingDate !== undefined ? controlledBookingDate : internalDate;
  const setBookingDate = onBookingDateChange ?? setInternalDate;

  const adults = controlledAdults !== undefined ? controlledAdults : internalAdults;
  const setAdults = onAdultsChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(adults) : val;
        onAdultsChange(next);
      }
    : setInternalAdults;

  const children = controlledChildren !== undefined ? controlledChildren : internalChildren;
  const setChildren = onChildrenChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(children) : val;
        onChildrenChange(next);
      }
    : setInternalChildren;

  const infants = controlledInfants !== undefined ? controlledInfants : internalInfants;
  const setInfants = onInfantsChange
    ? (val: number | ((prev: number) => number)) => {
        const next = typeof val === "function" ? val(infants) : val;
        onInfantsChange(next);
      }
    : setInternalInfants;

  const totalPassengers = adults + children + infants;

  const { data: matchedVehicle, isLoading: isVehicleLoading } =
    useVehicleTransferPrivateMatch(
      excursionId,
      totalPassengers,
      locale,
      selectedCurrency.code
    );

  const attractionsTotal = selectedAttractions.reduce(
    (acc, att) => acc + att.adultPrice * adults + att.childPrice * children + att.infantPrice * infants,
    0
  );

  const extrasTotal = selectedExtraServices.reduce(
    (acc, ext) => acc + ext.adultPrice * adults + ext.childPrice * children + ext.infantPrice * infants,
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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
      toast.error(t.toastSelectDate || "Please select an excursion date to proceed.");
      handleScrollToDate();
      return;
    }
    if (dateError) {
      toast.error(dateError);
      handleScrollToDate();
      return;
    }
    if (!hasAttractions) {
      toast.error(t.toastSelectAttraction || "Please select at least 1 attraction to include in your tour.");
      handleScrollToAttractions();
      return;
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full flex flex-col gap-6 font-poppins lg:sticky lg:top-24 lg:self-start"
    >
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
            {t.bookThis || "Book This Excursion"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          <PrivateSidebarDatePassengers
            tomorrowStr={tomorrowStr}
            bookingDate={bookingDate}
            setBookingDate={setBookingDate}
            dateError={dateError}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            infants={infants}
            setInfants={setInfants}
            isVehicleLoading={isVehicleLoading}
            matchedVehicle={matchedVehicle}
            locale={locale}
          />

          <PrivateSidebarPriceBreakdown
            selectedAttractions={selectedAttractions}
            selectedExtraServices={selectedExtraServices}
            attractionsTotal={attractionsTotal}
            extrasTotal={extrasTotal}
            vehiclePrice={vehiclePrice}
            totalPrice={totalPrice}
            adults={adults}
            children={children}
            infants={infants}
            isVehicleLoading={isVehicleLoading}
            matchedVehicle={matchedVehicle}
            currency={matchedVehicle?.currency ?? selectedCurrency.symbol}
            locale={locale}
          />

          <PrivateSidebarChecklist
            maxParticipants={maxParticipants}
            availability={availability}
            duration={duration}
            isReadyToBook={isReadyToBook}
            isDateValid={isDateValid}
            bookingDate={bookingDate}
            dateError={dateError}
            hasAttractions={hasAttractions}
            attractionsCount={selectedAttractions.length}
            handleScrollToDate={handleScrollToDate}
            handleScrollToAttractions={handleScrollToAttractions}
            handleBookClick={handleBookClick}
            locale={locale}
          />
        </div>
      </div>

      <NeedHelpCard locale={locale} />
    </motion.aside>
  );
}

export default PrivateDetailsBookingSidebar;
