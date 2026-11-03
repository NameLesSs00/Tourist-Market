"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { ServiceCardItem } from "../types";
import { SERVICE_FALLBACK_IMAGE } from "@/features/siteServiceItems/usePublicServiceItems";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ServiceCardProps {
  item: ServiceCardItem;
  locale?: string;
  viewDetailsText?: string;
  whatsappText?: string;
}

export function ServiceCard({
  item,
  locale = "en",
  viewDetailsText,
  whatsappText,
}: ServiceCardProps) {
  const { slug, title, description, imageUrl, badge, serviceType } = item;
  const dict = getDictionary(locale);
  const t = serviceType === "real-estate" ? dict.realEstate : dict.touristServices;

  const resolvedViewDetails = viewDetailsText || t?.viewDetails || "View Details";
  const resolvedWhatsapp = whatsappText || t?.whatsapp || "WhatsApp";
  const resolvedGreeting = t?.whatsappGreeting || "Hello, I am interested in";
  const resolvedAria = t?.ariaViewDetails || "View details for";

  const detailHref = `/${locale}/services/${serviceType}/${slug}`;
  const whatsappUrl = `https://wa.me/201289494715?text=${encodeURIComponent(
    `${resolvedGreeting} ${title}`
  )}`;

  const [imgSrc, setImgSrc] = useState<string>(
    imageUrl || SERVICE_FALLBACK_IMAGE
  );

  useEffect(() => {
    setImgSrc(imageUrl || SERVICE_FALLBACK_IMAGE);
  }, [imageUrl]);

  const isFallback = !imgSrc || imgSrc === SERVICE_FALLBACK_IMAGE;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        backgroundColor: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "8px",
        boxShadow: "0px 2px 20px 2px #00000033",
      }}
      className="group relative flex flex-col justify-between h-full overflow-hidden transition-shadow duration-300 hover:shadow-[0px_8px_30px_rgba(0,0,0,0.22)] cursor-pointer select-none"
    >
      {/* Full-Card Clickable Link Overlay */}
      <Link
        href={detailHref}
        aria-label={`${resolvedAria} ${title}`}
        className="absolute inset-0 z-0"
      />

      {/* 1. Card Top Image with Consistent Aspect Ratio */}
      <div className="relative w-full aspect-[400/230] shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center pointer-events-none">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          onError={() => {
            if (imgSrc !== SERVICE_FALLBACK_IMAGE) {
              setImgSrc(SERVICE_FALLBACK_IMAGE);
            }
          }}
          className={`transition-transform duration-500 ease-out group-hover:scale-106 ${
            isFallback ? "object-contain p-6 opacity-60" : "object-cover object-center"
          }`}
        />

        {/* Real Estate "For Rent" badge */}
        {badge && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
            <span
              style={{
                backgroundColor: "#134B68",
                borderRadius: "12px",
              }}
              className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 font-poppins text-[11px] sm:text-xs font-medium text-white shadow-sm"
            >
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content Body with Guaranteed Equal Spacing */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between font-poppins pointer-events-none">
        <div className="flex flex-col gap-2">
          {/* Title Container: Fixed min-height so 1-line and 2-line titles reserve the exact same space */}
          <div className="min-h-[44px] sm:min-h-[48px] md:min-h-[50px] flex items-start">
            <h3 className="text-[15px] sm:text-base md:text-[17px] font-bold text-[#0E4A68] tracking-tight leading-snug line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Description Container: Fixed min-height so short and long text stay balanced */}
          <div className="min-h-[54px] sm:min-h-[60px] flex items-start">
            <p className="text-xs sm:text-[13px] font-normal text-[#0E4A68]/85 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* 3. Action Buttons Row: Pinned to bottom uniformly across all cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-auto pt-3 pointer-events-auto">
          {/* Primary View Details Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full">
            <Link
              href={detailHref}
              style={{
                backgroundColor: "#165F84",
                border: "0.31px solid #000000",
                borderRadius: "5px",
                boxShadow: "0px 2px 20px 2px #00000040",
              }}
              className="relative z-10 flex items-center justify-center py-2 px-1.5 sm:px-3 text-white font-semibold text-[11.5px] sm:text-xs md:text-[13px] whitespace-nowrap transition-colors duration-200 hover:brightness-110 text-center w-full"
            >
              {resolvedViewDetails}
            </Link>
          </motion.div>

          {/* WhatsApp Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="w-full">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#17DB55",
                borderRadius: "5px",
              }}
              className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 sm:px-3 text-white font-semibold text-[11.5px] sm:text-xs md:text-[13px] whitespace-nowrap transition-colors duration-200 hover:brightness-105 text-center w-full"
            >
              <FaWhatsapp className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{resolvedWhatsapp}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
