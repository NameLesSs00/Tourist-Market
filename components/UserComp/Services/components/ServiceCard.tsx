"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { ServiceCardItem } from "../types";

interface ServiceCardProps {
  item: ServiceCardItem;
  locale?: string;
}

export function ServiceCard({ item, locale = "en" }: ServiceCardProps) {
  const { slug, title, description, imageUrl, badge, serviceType } = item;
  const detailHref = `/${locale}/services/${serviceType}/${slug}`;
  const whatsappUrl = `https://wa.me/201289494715?text=${encodeURIComponent(
    `Hello, I am interested in ${title}`
  )}`;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "8px",
        boxShadow: "0px 2px 20px 2px #00000033",
      }}
      className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_25px_2px_rgba(0,0,0,0.25)] cursor-pointer"
    >
      {/* Full-Card Clickable Link Overlay */}
      <Link
        href={detailHref}
        aria-label={`View details for ${title}`}
        className="absolute inset-0 z-0"
      />

      {/* 1. Card Top Image */}
      <div className="relative w-full aspect-[400/230] overflow-hidden bg-slate-100 pointer-events-none">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}

        {/* Real Estate "For Rent" badge */}
        {badge && (
          <div className="absolute top-3 right-3 z-10">
            <span
              style={{
                backgroundColor: "#134B68",
                borderRadius: "12px",
              }}
              className="inline-block px-3 py-1 font-poppins text-xs font-medium text-white shadow-sm"
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4 font-poppins pointer-events-none">
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="text-base sm:text-[17px] font-bold text-[#0E4A68] tracking-tight leading-snug">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-[13px] font-normal text-[#0E4A68] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* 3. Action Buttons Row: View Details & WhatsApp */}
        <div className="grid grid-cols-2 gap-3 pt-2 pointer-events-auto">
          {/* Primary View Details Button */}
          <Link
            href={detailHref}
            style={{
              backgroundColor: "#165F84",
              border: "0.31px solid #000000",
              borderRadius: "5px",
              boxShadow: "0px 2px 20px 2px #00000040",
            }}
            className="relative z-10 flex items-center justify-center py-2 px-3 text-white font-semibold text-xs sm:text-[13px] transition-all duration-200 hover:brightness-110 active:scale-[0.98] text-center"
          >
            View Details
          </Link>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#17DB55",
              borderRadius: "5px",
            }}
            className="relative z-10 flex items-center justify-center gap-1.5 py-2 px-3 text-white font-semibold text-xs sm:text-[13px] transition-all duration-200 hover:brightness-105 active:scale-[0.98] text-center"
          >
            <FaWhatsapp className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
