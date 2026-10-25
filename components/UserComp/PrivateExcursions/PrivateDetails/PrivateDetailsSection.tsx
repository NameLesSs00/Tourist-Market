"use client";

import React, { useState } from "react";
import {
  dummyPrivateExcursionDetail,
  dummyRelatedPrivateExcursions,
} from "../data/dummyPrivateDetails";
import { PrivateDetailsHero } from "./PrivateDetailsHero";
import { PrivateDetailsGallery } from "./PrivateDetailsGallery";
import { PrivateDetailsTabs } from "./PrivateDetailsTabs";
import { PrivateDetailsAttractions } from "./PrivateDetailsAttractions";
import { PrivateDetailsExtraServices } from "./PrivateDetailsExtraServices";
import { PrivateDetailsIncludes } from "./PrivateDetailsIncludes";
import { PrivateDetailsBookingSidebar } from "./PrivateDetailsBookingSidebar";
import { PrivateDetailsReviews } from "./PrivateDetailsReviews";
import { PrivateDetailsRelated } from "./PrivateDetailsRelated";

interface PrivateDetailsSectionProps {
  slug?: string;
  locale?: string;
}

export function PrivateDetailsSection({
  slug,
  locale = "en",
}: PrivateDetailsSectionProps) {
  // Use dummy detail data ready for backend API connection
  const detail = dummyPrivateExcursionDetail;
  const currentTitle = slug ? detail.title : detail.title;

  // Selected attractions (default to first 2 to match Figma mockup)
  const [selectedAttractionIds, setSelectedAttractionIds] = useState<string[]>([
    detail.attractions[0]?.id || "",
    detail.attractions[1]?.id || "",
  ]);

  // Selected extra services (default to first 1 to match Figma mockup)
  const [selectedExtraServiceIds, setSelectedExtraServiceIds] = useState<string[]>([
    detail.extraServices[0]?.id || "",
  ]);

  const handleToggleAttraction = (id: string) => {
    setSelectedAttractionIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= (detail.maxAttractions || 5)) {
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

  const selectedAttractions = detail.attractions.filter((att) =>
    selectedAttractionIds.includes(att.id)
  );

  const selectedExtraServices = detail.extraServices.filter((ext) =>
    selectedExtraServiceIds.includes(ext.id)
  );

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] text-[#083952] font-poppins pb-16">
      {/* ─── 1. HERO SECTION ─── */}
      <PrivateDetailsHero
        title={currentTitle}
        subtitle={detail.subtitle}
        duration={detail.duration}
        pickup="From Your Hotel"
        locale={locale}
      />

      {/* ─── 2. MAIN 2-COLUMN SECTION (Gallery + Tabs + Attractions + Extras + Includes vs Booking Sidebar) ─── */}
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14 xl:px-16 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ─── LEFT COLUMN (col-span-8) ─── */}
          <div className="lg:col-span-8 flex flex-col gap-8 sm:gap-10">
            {/* Gallery */}
            <PrivateDetailsGallery
              images={detail.gallery}
              badge={detail.badge}
              title={detail.title}
            />

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
          </div>

          {/* ─── RIGHT COLUMN: STICKY BOOKING SIDEBAR (col-span-4) ─── */}
          <div className="lg:col-span-4">
            <PrivateDetailsBookingSidebar
              selectedAttractions={selectedAttractions}
              selectedExtraServices={selectedExtraServices}
              vehicles={detail.vehicles}
              duration={detail.duration}
              maxParticipants="35 Person"
            />
          </div>
        </div>

        {/* ─── 3. REVIEWS & COMMENTS SECTION ─── */}
        <div className="mt-14 sm:mt-20">
          <PrivateDetailsReviews
            totalReviews={detail.totalReviews}
            averageRating={detail.rating}
            distribution={detail.ratingDistribution}
            comments={detail.comments}
          />
        </div>

        {/* ─── 4. EXPLORE RELATED TRIPS CAROUSEL ─── */}
        <div className="mt-14 sm:mt-16">
          <PrivateDetailsRelated
            excursions={dummyRelatedPrivateExcursions}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
