"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { extractErrorMessage } from "@/features/auth/useAuth";
import {
  usePrivateExcursionDetailsQuery,
  useRelatedPrivateExcursionsQuery,
} from "@/features/privateExcursions/usePrivateExcursionDetails";
import { mapPrivateExcursionFullDetail } from "@/features/privateExcursions/privateExcursionDetailMapper";
import { isBookingDateValid } from "@/shared/utils/dateAvailability";
import { PrivateDetailsHero } from "./PrivateDetailsHero";
import { PrivateDetailsGallery } from "./PrivateDetailsGallery";
import { PrivateDetailsTabs } from "./PrivateDetailsTabs";
import { PrivateDetailsAttractions } from "./PrivateDetailsAttractions";
import { PrivateDetailsExtraServices } from "./PrivateDetailsExtraServices";
import { PrivateDetailsIncludes } from "./PrivateDetailsIncludes";
import { PrivateDetailsBookingSidebar } from "./PrivateDetailsBookingSidebar";
import { PrivateDetailsReviews } from "./PrivateDetailsReviews";
import { PrivateDetailsRelated } from "./PrivateDetailsRelated";
import { PrivateBookingForm } from "./PrivateBookingForm";

interface PrivateDetailsSectionProps {
  excursionId?: string;
  slug?: string;
  locale?: string;
}

export function PrivateDetailsSection({
  excursionId,
  slug,
  locale = "en",
}: PrivateDetailsSectionProps) {
  const identifier = excursionId || slug || "";

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const [selectedAttractionIds, setSelectedAttractionIds] = useState<string[]>([]);
  const [selectedExtraServiceIds, setSelectedExtraServiceIds] = useState<string[]>([]);

  const { data, isLoading, isError, error } = usePrivateExcursionDetailsQuery(
    identifier,
    locale
  );

  const detail = useMemo(
    () => (data ? mapPrivateExcursionFullDetail(data) : null),
    [data]
  );

  const { data: relatedExcursions = [] } = useRelatedPrivateExcursionsQuery(
    detail?.id || identifier,
    locale
  );



  const handleToggleAttraction = (id: string) => {
    setSelectedAttractionIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      const maxAllowed = detail?.maxAttractions || 4;
      if (prev.length >= maxAllowed) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleToggleExtraService = (id: string) => {
    setSelectedExtraServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#DE7423] border-t-transparent animate-spin" />
          <p className="font-poppins text-base font-semibold text-[#083952]">
            Loading Excursion Details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !detail) {
    const message = isError
      ? extractErrorMessage(error) || "Failed to load excursion details"
      : "Private excursion not found";

    return (
      <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <p className="font-poppins text-lg font-semibold text-[#083952]">
            {message}
          </p>
          <Link
            href={`/${locale}/private-excursions`}
            className="px-6 py-2.5 bg-[#DE7423] text-white rounded-lg hover:bg-[#C9641B] transition font-medium text-sm"
          >
            Back to Excursions
          </Link>
        </div>
      </div>
    );
  }

  const selectedAttractions = detail.attractions.filter((att) =>
    selectedAttractionIds.includes(att.id)
  );

  const selectedExtraServices = detail.extraServices.filter((ext) =>
    selectedExtraServiceIds.includes(ext.id)
  );

  const dateValidation = isBookingDateValid(bookingDate, detail.availabilityDays);
  const canBook = dateValidation.isValid && selectedAttractionIds.length > 0;

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] text-[#083952] font-poppins pb-16">
      {/* --- 1. HERO SECTION (Hidden when booking form is active) --- */}
      {!isBookingOpen && (
        <PrivateDetailsHero
          title={detail.title}
          subtitle={detail.subtitle}
          duration={detail.duration}
          pickup="From Your Hotel"
          heroImage={detail.imageUrl}
          locale={locale}
        />
      )}

      {/* --- 2. MAIN 2-COLUMN SECTION (Left Content vs Sticky Sidebar) --- */}
      <div
        className={`w-full px-3.5 sm:px-6 lg:px-10 xl:px-16 ${
          isBookingOpen
            ? "pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16"
            : "pt-6 sm:pt-10 lg:pt-12"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* --- LEFT COLUMN (col-span-8) --- */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 lg:space-y-10">
            {isBookingOpen ? (
              <PrivateBookingForm
                detail={detail}
                onBack={handleCloseBooking}
                initialDate={bookingDate}
                initialAdults={adults}
                initialChildren={children}
                initialInfants={infants}
                selectedAttractionIds={selectedAttractionIds}
                selectedExtraServiceIds={selectedExtraServiceIds}
              />
            ) : (
              <>
                {/* Gallery */}
                <PrivateDetailsGallery
                  images={detail.gallery}
                  badge={detail.badge}
                  title={detail.title}
                />

                {/* Mobile / Tablet Booking Sidebar (visible below gallery on screens < lg) */}
                <div className="block lg:hidden">
                  <PrivateDetailsBookingSidebar
                    excursionId={detail.id}
                    selectedAttractions={selectedAttractions}
                    selectedExtraServices={selectedExtraServices}
                    duration={detail.duration}
                    maxParticipants="35 Person"
                    bookingDate={bookingDate}
                    onBookingDateChange={setBookingDate}
                    adults={adults}
                    onAdultsChange={setAdults}
                    children={children}
                    onChildrenChange={setChildren}
                    infants={infants}
                    onInfantsChange={setInfants}
                    onBookNow={handleOpenBooking}
                    currency={detail.currency}
                    locale={locale}
                    availabilityDays={detail.availabilityDays}
                    availability={detail.availability}
                    canBook={canBook}
                  />
                </div>

                {/* About / Description Tabs */}
                <PrivateDetailsTabs
                  title={detail.aboutTitle}
                  paragraphs={detail.aboutParagraphs}
                  itinerary={detail.itinerary}
                  highlights={detail.highlights}
                  whatToBring={detail.whatToBring}
                  cancellationPolicy={detail.cancellationPolicy}
                />

                {/* Attractions Section */}
                <PrivateDetailsAttractions
                  attractions={detail.attractions}
                  maxAttractions={detail.maxAttractions}
                  selectedIds={selectedAttractionIds}
                  onToggleSelect={handleToggleAttraction}
                />

                {/* Extra Services Section */}
                <PrivateDetailsExtraServices
                  services={detail.extraServices}
                  selectedIds={selectedExtraServiceIds}
                  onToggleSelect={handleToggleExtraService}
                />

                {/* Price Includes & Excludes */}
                <PrivateDetailsIncludes
                  includes={detail.priceIncludes}
                  excludes={detail.priceExcludes}
                />
              </>
            )}
          </div>

          {/* --- RIGHT COLUMN: STICKY BOOKING SIDEBAR (col-span-4, desktop only) --- */}
          <div className="hidden lg:block lg:col-span-4 lg:self-stretch">
            <PrivateDetailsBookingSidebar
              excursionId={detail.id}
              selectedAttractions={selectedAttractions}
              selectedExtraServices={selectedExtraServices}
              duration={detail.duration}
              maxParticipants="35 Person"
              bookingDate={bookingDate}
              onBookingDateChange={setBookingDate}
              adults={adults}
              onAdultsChange={setAdults}
              children={children}
              onChildrenChange={setChildren}
              infants={infants}
              onInfantsChange={setInfants}
              onBookNow={handleOpenBooking}
              currency={detail.currency}
              locale={locale}
              availabilityDays={detail.availabilityDays}
              availability={detail.availability}
              canBook={canBook}
            />
          </div>
        </div>

        {/* --- 3. REVIEWS & COMMENTS SECTION --- */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <PrivateDetailsReviews
            detail={detail}
            totalReviews={detail.totalReviews}
            averageRating={detail.rating}
            distribution={detail.ratingDistribution}
            comments={detail.comments}
          />
        </div>

        {/* --- 4. EXPLORE RELATED TRIPS CAROUSEL --- */}
        {relatedExcursions.length > 0 && (
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <PrivateDetailsRelated
              excursions={relatedExcursions}
              locale={locale}
            />
          </div>
        )}
      </div>
    </div>
  );
}
