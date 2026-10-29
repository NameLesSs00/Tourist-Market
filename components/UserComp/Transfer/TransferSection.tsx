"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  TransferCommunicationMethod,
  TransferTripType,
  formatTransferVehicleType,
} from "@/models/transferBooking";
import type { TransferLocationItem } from "@/models/transferLocation";
import {
  useCreateTransferBooking,
  useTransferCountries,
  useTransferFromLocations,
  useTransferPreview,
  useTransferToLocations,
} from "@/features/transferBookings/useClientTransferBooking";
import { TransferHero } from "./TransferHero";
import { TransferBookingForm } from "./TransferBookingForm";
import { TransferVehicleCard } from "./TransferVehicleCard";
import { TransferDiscountBanner } from "./TransferDiscountBanner";
import { TransferScheduleCard } from "./TransferScheduleCard";
import { TransferCustomerCard } from "./TransferCustomerCard";
import { TransferNotesCard } from "./TransferNotesCard";
import { TransferSummaryCard } from "./TransferSummaryCard";
import { TransferContactUs } from "./TransferContactUs";
import { TransferReviews } from "./TransferReviews";

interface TransferSectionProps {
  locale?: string;
}

export function TransferSection({ locale = "en" }: TransferSectionProps) {
  // ─── 1. FETCH REMOTE DATA ───
  const { data: fromLocations = [], isLoading: isLoadingFrom } =
    useTransferFromLocations(locale);
  const { data: toLocations = [], isLoading: isLoadingTo } =
    useTransferToLocations(locale);
  const { data: countries = [], isLoading: isLoadingCountries } =
    useTransferCountries(locale);

  // ─── 2. FORM STATE ───
  const [fromLocationId, setFromLocationId] = useState<string>("");
  const [toLocationId, setToLocationId] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [tripType, setTripType] = useState<TransferTripType>(
    TransferTripType.OneWay
  );

  const [tripDate, setTripDate] = useState<string>("");
  const [tripTime, setTripTime] = useState<string>("");

  const [customerName, setCustomerName] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [communicationMethod, setCommunicationMethod] =
    useState<TransferCommunicationMethod>(TransferCommunicationMethod.WhatsApp);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [luggageCount, setLuggageCount] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  // Initialize sensible defaults when locations arrive
  useEffect(() => {
    if (!fromLocationId && fromLocations.length > 0) {
      // Prefer Makadi if present, otherwise first
      const defaultFrom =
        fromLocations.find((l: TransferLocationItem) =>
          l.name.toLowerCase().includes("makadi")
        ) || fromLocations[0];
      setFromLocationId(defaultFrom.id);
    }
  }, [fromLocations, fromLocationId]);

  useEffect(() => {
    if (!toLocationId && toLocations.length > 0) {
      // Prefer Senzo Mall or second item if present
      const defaultTo =
        toLocations.find((l: TransferLocationItem) =>
          l.name.toLowerCase().includes("senzo")
        ) || toLocations[0];
      setToLocationId(defaultTo.id);
    }
  }, [toLocations, toLocationId]);

  useEffect(() => {
    if (!countryId && countries.length > 0) {
      setCountryId(countries[0].id);
    }
  }, [countries, countryId]);

  // Selected Location Names for card display
  const fromName =
    fromLocations.find((l: TransferLocationItem) => l.id === fromLocationId)?.name ||
    "Makadi Dolphin World";
  const toName =
    toLocations.find((l: TransferLocationItem) => l.id === toLocationId)?.name ||
    "Hurghada Senzo Mall";

  // ─── 3. PREVIEW CALCULATION (API) ───
  const { data: previewData, isFetching: isCalculatingPrice } =
    useTransferPreview({
      fromLocationId,
      toLocationId,
      adults,
      children: childrenCount,
      tripType,
    });

  // Calculate fallbacks matching reference screenshot if preview endpoint is pending/offline
  const isRoundTrip = tripType === TransferTripType.RoundTrip;
  const defaultFallbackPrice = isRoundTrip ? 28 : 25;
  const currentPrice =
    typeof previewData?.totalPrice === "number" && previewData.totalPrice > 0
      ? previewData.totalPrice
      : defaultFallbackPrice;

  const currentVehicleType = previewData?.vehicleType
    ? formatTransferVehicleType(previewData.vehicleType)
    : "Car";

  // ─── 4. SUBMIT BOOKING MUTATION ───
  const createBookingMutation = useCreateTransferBooking({
    onSuccess: () => {
      // Reset sensitive fields
      setCustomerName("");
      setEmail("");
      setPhoneNumber("");
      setNotes("");
    },
  });

  const handleSubmitBooking = async () => {
    // Client-side validations
    if (!fromLocationId) {
      toast.error("Please select a pickup location (From).");
      return;
    }
    if (!toLocationId) {
      toast.error("Please select a dropoff location (To).");
      return;
    }
    if (!tripDate) {
      toast.error("Please select a trip date.");
      return;
    }
    if (!tripTime) {
      toast.error("Please select a trip time.");
      return;
    }
    if (!customerName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!countryId) {
      toast.error("Please select your country.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }
    if (!phoneNumber.trim()) {
      toast.error("Please provide your phone number.");
      return;
    }

    const payload = {
      fromLocationId,
      toLocationId,
      adults,
      children: childrenCount,
      tripType,
      tripDate,
      tripTime: tripTime.length === 5 ? `${tripTime}:00` : tripTime,
      customerName: customerName.trim(),
      countryId,
      email: email.trim(),
      communicationMethod,
      phoneNumber: phoneNumber.trim(),
      luggageCount,
      notes: notes.trim() || undefined,
    };

    createBookingMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 font-poppins">
      {/* ─── 1. HERO (Wide container) ─── */}
      <div className="max-w-[1200px] mx-auto mb-8 md:mb-10">
        <TransferHero />
      </div>

      {/* ─── 2. CARDS CONTAINER (Centered 1028px) ─── */}
      <div className="w-full max-w-[1028.66px] mx-auto space-y-6 md:space-y-8">
        {/* Booking Form */}
        <TransferBookingForm
          fromLocations={fromLocations}
          toLocations={toLocations}
          selectedFromId={fromLocationId}
          selectedToId={toLocationId}
          adults={adults}
          childrenCount={childrenCount}
          tripType={tripType}
          isLoadingLocations={isLoadingFrom || isLoadingTo}
          onFromChange={setFromLocationId}
          onToChange={setToLocationId}
          onAdultsChange={setAdults}
          onChildrenChange={setChildrenCount}
          onTripTypeChange={setTripType}
        />

        {/* ─── 3. VEHICLE & PRICE CARD ─── */}
        <TransferVehicleCard
          vehicleType={currentVehicleType}
          adults={adults}
          childrenCount={childrenCount}
          fromName={fromName}
          toName={toName}
          tripType={tripType}
          price={currentPrice}
          basePrice={isRoundTrip ? 30 : 25}
          discount={isRoundTrip ? 2 : 0}
          isLoading={isCalculatingPrice}
        />

        {/* ─── 4. DISCOUNT BANNER / WAITING INFO ─── */}
        <TransferDiscountBanner
          tripType={tripType}
          onSelectRoundTrip={() => setTripType(TransferTripType.RoundTrip)}
        />

        {/* ─── 5. TRIP SCHEDULE ─── */}
        <TransferScheduleCard
          tripDate={tripDate}
          tripTime={tripTime}
          onTripDateChange={setTripDate}
          onTripTimeChange={setTripTime}
        />

        {/* ─── 6. CUSTOMER INFORMATION ─── */}
        <TransferCustomerCard
          customerName={customerName}
          countryId={countryId}
          email={email}
          communicationMethod={communicationMethod}
          phoneNumber={phoneNumber}
          luggageCount={luggageCount}
          countries={countries}
          isLoadingCountries={isLoadingCountries}
          onCustomerNameChange={setCustomerName}
          onCountryIdChange={setCountryId}
          onEmailChange={setEmail}
          onCommunicationMethodChange={setCommunicationMethod}
          onPhoneNumberChange={setPhoneNumber}
          onLuggageCountChange={setLuggageCount}
        />

        {/* ─── 7. NOTES & SPECIAL REQUESTS ─── */}
        <TransferNotesCard notes={notes} onNotesChange={setNotes} />

        {/* ─── 8. BOOKING SUMMARY & SUBMIT ─── */}
        <TransferSummaryCard
          vehicleType={currentVehicleType}
          totalPrice={currentPrice}
          tripType={tripType}
          isSubmitting={createBookingMutation.isPending}
          onSubmit={handleSubmitBooking}
        />

        {/* ─── 9. CONTACT US ─── */}
        <TransferContactUs />

        {/* ─── 10. REVIEWS & COMMENTS ─── */}
        <TransferReviews />
      </div>
    </div>
  );
}
