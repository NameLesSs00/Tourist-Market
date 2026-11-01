"use client";

import React from "react";
import { TransferHero } from "./TransferHero";
import { TransferBookingForm } from "./TransferBookingForm";
import { TransferVehicleCard } from "./TransferVehicleCard";
import { TransferDiscountBanner } from "./TransferDiscountBanner";
import { TransferScheduleCard } from "./TransferScheduleCard";
import { TransferCustomerCard } from "./TransferCustomerCard";
import { TransferNotesCard } from "./TransferNotesCard";
import { TransferSummaryCard } from "./TransferSummaryCard";
import { TransferBookingConfirmationCard } from "./TransferBookingConfirmationCard";
import { TransferContactUs } from "./TransferContactUs";
import { TransferReviews } from "./TransferReviews";
import { useTransferBookingForm } from "./useTransferBookingForm";
import { TransferTripType } from "@/models/transferBooking";

interface TransferSectionProps {
  locale?: string;
}

export function TransferSection({ locale = "en" }: TransferSectionProps) {
  const form = useTransferBookingForm(locale);

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20 md:pb-28 lg:pb-32 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-[1200px] mx-auto mb-6 sm:mb-8 md:mb-10">
        <TransferHero />
      </div>

      <div className="w-full max-w-[1200px] mx-auto space-y-5 sm:space-y-6 md:space-y-8">
        {form.confirmedBooking ? (
          <TransferBookingConfirmationCard
            booking={form.confirmedBooking}
            onBookAnother={form.handleReset}
          />
        ) : (
          <>
            <TransferBookingForm
              fromLocations={form.fromLocations}
              toLocations={form.toLocations}
              selectedFromId={form.fromLocationId}
              selectedToId={form.toLocationId}
              adults={form.adults}
              childrenCount={form.childrenCount}
              tripType={form.tripType}
              isLoadingLocations={form.isLoadingLocations}
              onFromChange={form.setFromLocationId}
              onToChange={form.setToLocationId}
              onAdultsChange={form.setAdults}
              onChildrenChange={form.setChildrenCount}
              onTripTypeChange={form.setTripType}
            />

            <TransferVehicleCard
              vehicleType={form.currentVehicleType}
              adults={form.adults}
              childrenCount={form.childrenCount}
              fromName={form.fromName}
              toName={form.toName}
              tripType={form.tripType}
              price={form.currentPrice}
              basePrice={form.basePrice}
              discount={form.discountAmount}
              hourlyRate={form.additionalHourRate}
              hasRouteSelected={form.hasRouteSelected}
              isMatchError={form.isMatchError}
              matchErrorMessage={form.matchErrorMessage}
              isLoading={form.isCalculatingPrice}
            />

            <TransferDiscountBanner
              tripType={form.tripType}
              discountPercentage={form.discountPercentage}
              additionalHourRate={form.additionalHourRate}
              vehicleName={form.currentVehicleType || undefined}
              onSelectRoundTrip={() => form.setTripType(TransferTripType.RoundTrip)}
            />

            <TransferScheduleCard
              tripType={form.tripType}
              tripDate={form.tripDate}
              tripTime={form.tripTime}
              returnDate={form.returnDate}
              returnTime={form.returnTime}
              additionalHours={form.additionalHours}
              additionalHourRate={form.additionalHourRate}
              vehicleName={form.currentVehicleType || undefined}
              onTripDateChange={form.setTripDate}
              onTripTimeChange={form.setTripTime}
              onReturnDateChange={form.setReturnDate}
              onReturnTimeChange={form.setReturnTime}
              onAdditionalHoursChange={form.setAdditionalHours}
            />

            <TransferCustomerCard
              customerName={form.customerName}
              countryId={form.countryId}
              email={form.email}
              communicationMethod={form.communicationMethod}
              phoneNumber={form.phoneNumber}
              luggageCount={form.luggageCount}
              countries={form.countries}
              isLoadingCountries={form.isLoadingCountries}
              onCustomerNameChange={form.setCustomerName}
              onCountryIdChange={form.handleCountryChange}
              onEmailChange={form.setEmail}
              onCommunicationMethodChange={form.setCommunicationMethod}
              onPhoneNumberChange={form.setPhoneNumber}
              onLuggageCountChange={form.setLuggageCount}
            />

            <TransferNotesCard
              notes={form.notes}
              onNotesChange={form.setNotes}
            />

            <TransferSummaryCard
              vehicleType={form.currentVehicleType}
              totalPrice={form.currentPrice}
              basePrice={form.basePrice}
              discountAmount={form.discountAmount}
              discountPercentage={form.discountPercentage}
              additionalHours={form.additionalHours}
              additionalHourRate={form.additionalHourRate}
              tripType={form.tripType}
              hasRouteSelected={form.hasRouteSelected}
              isMatchError={form.isMatchError}
              matchErrorMessage={form.matchErrorMessage}
              isSubmitting={form.isSubmitting}
              onSubmit={form.handleSubmitBooking}
            />
          </>
        )}

        <TransferContactUs />
        <TransferReviews locale={locale} />
      </div>
    </div>
  );
}

export default TransferSection;
