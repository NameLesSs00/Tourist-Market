"use client";

import React from "react";
import Image from "next/image";
import { ServiceDetailItem } from "../types";

interface ServiceDetailCardProps {
  detail: ServiceDetailItem;
}

export function ServiceDetailCard({ detail }: ServiceDetailCardProps) {
  const {
    title,
    imageUrl,
    modelYear,
    transmission,
    airConditioning,
    tagline,
    detailedDescription,
    availableLanguages,
    costServices,
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
      {/* 1. Header Image Flush With Top */}
      <div className="relative w-full aspect-[960/480] bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover object-center"
          />
        ) : null}
      </div>

      {/* 2. Content Body */}
      <div className="p-6 sm:p-10 flex flex-col gap-8">
        {/* Title with Blue Accent Underline */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#0E4A68] tracking-tight">
            {title}
          </h1>
          <div className="w-16 h-1 bg-[#0E4A68] mt-2 rounded-full" />
        </div>

        {/* Vehicle / Service Spec Meta (for car, real estate, airport) */}
        {modelYear && (
          <div className="flex flex-col gap-2.5 text-[#0E4A68] text-sm sm:text-base font-normal">
            <p>
              <span className="font-medium">Model year:</span> {modelYear}
            </p>
            <p>
              <span className="font-medium">Transmission:</span> {transmission}
            </p>
            <p>
              <span className="font-medium">Air conditioning:</span> {airConditioning}
            </p>
          </div>
        )}

        {/* Tourist Services (Translator) Description & Languages */}
        {tagline && (
          <div className="flex flex-col gap-4 text-[#0E4A68]">
            <h2 className="text-base sm:text-lg font-bold leading-snug">
              {tagline}
            </h2>
            {detailedDescription && (
              <p className="text-sm leading-relaxed text-[#0E4A68]/90 font-normal">
                {detailedDescription}
              </p>
            )}

            {availableLanguages && availableLanguages.length > 0 && (
              <div className="mt-3">
                <h3 className="text-base font-bold text-[#0E4A68] mb-2">
                  Available Languages:
                </h3>
                <ul className="flex flex-col gap-1 text-sm text-[#0E4A68]">
                  {availableLanguages.map((lang, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]" />
                      <span>{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {costServices && costServices.length > 0 && (
              <div className="mt-2">
                <h3 className="text-base font-bold text-[#0E4A68] mb-1.5">
                  Cost Services:
                </h3>
                <ul className="flex flex-col gap-1 text-sm text-[#0E4A68]">
                  {costServices.map((cost, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E4A68]" />
                      <span>{cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Numbered Notes Section */}
        {notes && notes.length > 0 && (
          <div className="flex flex-col gap-3 text-[#0E4A68]">
            <h3 className="text-lg sm:text-xl font-bold">Notes:</h3>
            <ol className="flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed font-normal">
              {notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="font-bold shrink-0">{index + 1})</span>
                  <span>{note}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 3. Bottom Price Banner */}
        <div
          style={{
            backgroundColor: "#134B68",
            borderRadius: "8px",
          }}
          className="w-full py-6 px-6 sm:px-10 flex flex-col items-center justify-center text-center text-white gap-2 shadow-md"
        >
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {priceFormatted}
          </div>
          <div className="text-xs sm:text-sm font-medium text-white/90">
            {billingPeriod}
          </div>
          <button
            type="button"
            onClick={handleScrollToBooking}
            className="mt-3 inline-flex items-center gap-2 bg-white text-[#134B68] font-semibold text-xs sm:text-sm py-2 px-6 rounded-[5px] shadow-sm transition-all duration-200 hover:bg-slate-100 active:scale-[0.98] cursor-pointer"
          >
            {bookingButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailCard;
