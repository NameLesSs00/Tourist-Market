"use client";

import React from "react";
import { ServiceDetailItem } from "../types";
import {
  ServiceImageGallery,
  ServiceSpecificationsGrid,
  ServicePricingTiers,
  ServiceAlertBanner,
  ServiceNotesAccordion,
} from "./detail";

interface ServiceDetailCardProps {
  detail: ServiceDetailItem;
}

export function ServiceDetailCard({ detail }: ServiceDetailCardProps) {
  const {
    title,
    imageUrl,
    galleryImages,
    modelYear,
    transmission,
    airConditioning,
    tagline,
    detailedDescription,
    description,
    availableLanguages,
    costServices,
    specifications,
    inclusions,
    optionsTiers,
    alert,
    notes,
    priceFormatted,
    billingPeriod,
    bookingButtonText,
  } = detail;

  const handleScrollToBooking = () => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const displayText = detailedDescription || description;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "8px",
        boxShadow: "0px 2px 20px 2px #00000033",
      }}
      className="w-full max-w-[960px] mx-auto overflow-hidden font-poppins"
    >
      {/* 1. Header Image & Gallery */}
      <ServiceImageGallery
        mainImage={imageUrl}
        galleryImages={galleryImages}
        title={title}
      />

      {/* 2. Content Body */}
      <div className="p-4 sm:p-7 md:p-10 flex flex-col gap-6 sm:gap-7 w-full min-w-0">
        {/* Title with Blue Accent Underline */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-[#0E4A68] tracking-tight">
            {title}
          </h1>
          <div className="w-14 sm:w-16 h-1 bg-[#0E4A68] mt-2 rounded-full" />
        </div>

        {/* Important Notice Banner */}
        <ServiceAlertBanner alert={alert} />

        {/* Tagline / Subtitle & Detailed Description */}
        <div className="flex flex-col gap-3 text-[#0E4A68]">
          {tagline && (
            <h2 className="text-sm sm:text-base md:text-lg font-bold leading-snug">
              {tagline}
            </h2>
          )}
          {displayText && (
            <p className="text-xs sm:text-sm leading-relaxed text-[#0E4A68]/90 font-normal">
              {displayText}
            </p>
          )}
        </div>

        {/* Available Languages (for tourist guide / translator) */}
        {availableLanguages && availableLanguages.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#0E4A68]">
              Available Languages:
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#0E4A68]/10 text-[#0E4A68] text-xs font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Specifications & Inclusions Grid */}
        <ServiceSpecificationsGrid
          specifications={specifications}
          inclusions={inclusions}
          modelYear={modelYear}
          transmission={transmission}
          airConditioning={airConditioning}
        />

        {/* Pricing Packages & Options Matrix */}
        <ServicePricingTiers
          optionsTiers={optionsTiers}
          costServices={costServices}
        />

        {/* Terms & Operational Notes */}
        <ServiceNotesAccordion notes={notes} />

        {/* 3. Bottom Price Banner */}
        <div
          style={{
            backgroundColor: "#134B68",
            borderRadius: "8px",
          }}
          className="w-full py-5 sm:py-6 px-4 sm:px-10 flex flex-col items-center justify-center text-center text-white gap-1.5 sm:gap-2 shadow-md mt-2"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {priceFormatted}
          </div>
          <div className="text-xs sm:text-sm font-medium text-white/90">
            {billingPeriod}
          </div>
          <button
            type="button"
            onClick={handleScrollToBooking}
            className="mt-2.5 sm:mt-3 inline-flex items-center gap-2 bg-white text-[#134B68] font-semibold text-xs sm:text-sm py-2 px-5 sm:px-6 rounded-[5px] shadow-sm transition-all duration-200 hover:bg-slate-100 active:scale-[0.98] cursor-pointer"
          >
            {bookingButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailCard;
