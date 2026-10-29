"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GroupExcursion } from "../types";
import { GROUP_EXCURSION_FALLBACK_IMAGE } from "../utils/groupExcursionAdapter";

interface GroupExcursionCardProps {
  excursion: GroupExcursion;
  locale?: string;
}

const STAR_D = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

export function GroupExcursionCard({
  excursion,
  locale = "en",
}: GroupExcursionCardProps) {
  const { id, title, description, badge, duration, rating, adultPrice, childPrice, infantPrice, currency, imageUrl } = excursion;
  const [imgSrc, setImgSrc] = React.useState(imageUrl);
  const [prevImageUrl, setPrevImageUrl] = React.useState(imageUrl);

  // Reset the fallback when a new image arrives. Done during render instead of
  // in an effect to avoid a cascading re-render.
  if (prevImageUrl !== imageUrl) {
    setPrevImageUrl(imageUrl);
    setImgSrc(imageUrl);
  }

  const priceItems = [
    adultPrice > 0 ? { label: "Adult", value: adultPrice } : null,
    childPrice > 0 ? { label: "Child", value: childPrice } : null,
    infantPrice > 0 ? { label: "Infant", value: infantPrice } : null,
  ].filter(Boolean) as { label: string; value: number }[];

  const hasAllPrices = priceItems.length >= 3;
  const displayCurrency = currency === "USD" ? "$" : (currency || "$");

  const renderStars = () => (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFull = rating >= starIndex;
        const isHalf = !isFull && rating >= starIndex - 0.5;
        return (
          <span key={starIndex} className="relative inline-block w-[16px] sm:w-[18px] md:w-[16px] lg:w-[22px] h-[16px] sm:h-[18px] md:h-[16px] lg:h-[22px]">
            <svg className="w-full h-full fill-[#8CC63F]/25 text-[#8CC63F]/25" viewBox="0 0 20 20">
              <path d={STAR_D} />
            </svg>
            {(isFull || isHalf) && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? "50%" : "100%" }}>
                <svg className="w-full h-full fill-[#8CC63F] text-[#8CC63F]" viewBox="0 0 20 20">
                  <path d={STAR_D} />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );

  const isFallback = !imgSrc || imgSrc === GROUP_EXCURSION_FALLBACK_IMAGE;
  const targetSlugOrId = excursion.slug || id;

  return (
    <Link
      href={`/${locale}/group-excursions/${targetSlugOrId}`}
      prefetch={false}
      className="group block h-full text-inherit no-underline select-none cursor-pointer"
    >
      <div
        className="bg-[#FFFFFF] text-[#0E4A68] rounded-[12px] overflow-hidden flex flex-col justify-between h-full min-h-[440px] sm:min-h-[490px] md:min-h-[440px] lg:min-h-[540px] transition-all duration-300 group-hover:-translate-y-1.5 cursor-pointer"
        style={{
          border: "0.5px solid #888888",
          boxShadow: "0px 2px 20px 2px #00000033",
        }}
      >
        {/* Card Image */}
        <div
          className={`relative w-full aspect-[16/10] lg:aspect-[390/248] overflow-hidden ${
            isFallback ? "bg-[#0E4A68]/5" : "bg-slate-100"
          }`}
        >
          <Image
            src={imgSrc || GROUP_EXCURSION_FALLBACK_IMAGE}
            alt={title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 420px"
            onError={() => {
              if (imgSrc !== GROUP_EXCURSION_FALLBACK_IMAGE) {
                setImgSrc(GROUP_EXCURSION_FALLBACK_IMAGE);
              }
            }}
            className={`transition-transform duration-500 group-hover:scale-105 ${
              isFallback
                ? "object-contain p-6 sm:p-8"
                : "object-cover object-center"
            }`}
          />
          {badge && (
            <div
              className="absolute top-2.5 sm:top-3.5 md:top-2.5 left-2.5 sm:left-3.5 md:left-2.5 text-[#0E4A68] font-poppins text-[10px] sm:text-xs md:text-[10px] font-semibold px-3 sm:px-4 md:px-3 py-1 sm:py-1.5 md:py-1 rounded-[30px]"
              style={{
                background: "#FFFFFFE5",
                boxShadow: "0px 2px 10px 3px #FFFFFF40",
              }}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Card Content with Responsive Padding */}
        <div className="p-3.5 sm:p-4.5 md:p-3.5 lg:p-5 flex flex-col justify-between flex-1">
          <div>
            {/* Duration & Rating Row */}
            <div className="flex flex-wrap items-center justify-between gap-x-1 gap-y-1.5">
              {/* Duration */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#0E4A68] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span
                  className="font-poppins font-semibold text-[14px] sm:text-[16px] md:text-[14px] lg:text-[19px] leading-[20px] sm:leading-[22px] md:leading-[20px] lg:leading-[26px] text-[#0E4A68] tracking-normal align-middle"
                >
                  {duration}
                </span>
              </div>

              {/* Rating & Stars */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="font-poppins font-bold text-[14px] sm:text-[16px] md:text-[14px] lg:text-[19px] leading-[20px] sm:leading-[22px] md:leading-[20px] lg:leading-[26px] text-[#0E4A68]">
                  {rating.toFixed(1)}
                </span>
                {renderStars()}
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-poppins font-bold text-[15px] sm:text-[17px] md:text-[15px] lg:text-[18px] text-[#0E4A68] mt-2 sm:mt-2.5 md:mt-2 uppercase tracking-[-0.03em] text-left leading-[20px] sm:leading-[24px] md:leading-[20px] lg:leading-[26px] line-clamp-2 min-h-[40px] sm:min-h-[48px] md:min-h-[40px] lg:min-h-[52px] flex items-center"
            >
              {title}
            </h3>

            {/* Description */}
            <p className="font-poppins text-[11px] sm:text-[12px] md:text-[11px] lg:text-[13px] text-[#0E4A68] font-normal leading-relaxed mt-1 sm:mt-1.5 md:mt-1 text-left line-clamp-2 sm:line-clamp-3 md:line-clamp-2">
              {description}
            </p>
          </div>

          <div>
            {/* Pricing Info Row */}
            {priceItems.length > 0 && (
              <div
                className={`w-full flex flex-wrap items-center gap-y-1 ${
                  hasAllPrices ? "justify-between" : "justify-start gap-2 sm:gap-2.5"
                } text-[#0E4A68] font-poppins font-medium text-[11.5px] sm:text-[13px] md:text-[11.5px] lg:text-[15px] leading-[18px] sm:leading-[22px] md:leading-[18px] lg:leading-[25px] tracking-normal align-middle my-2.5 sm:my-3.5 md:my-2.5 lg:my-4.5`}
              >
                {priceItems.map((item, idx) => (
                  <React.Fragment key={item.label}>
                    <span>
                      {item.label}: {item.value.toFixed(2)} {displayCurrency}
                    </span>
                    {idx < priceItems.length - 1 && (
                      <span className="text-[#0E4A68]/40 select-none">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* View Details Action Button */}
            <div
              className="w-full h-[42px] sm:h-[46px] md:h-[42px] lg:h-[50px] min-h-[42px] sm:min-h-[46px] md:min-h-[42px] lg:min-h-[50px] flex items-center justify-center bg-[#165F84] group-hover:bg-[#0E4A68] active:scale-[0.99] text-[#FFFFFF] font-poppins text-[13px] sm:text-[14px] md:text-[13px] lg:text-base font-semibold rounded-[12px] sm:rounded-[15px] md:rounded-[12px] transition-colors"
              style={{
                border: "0.31px solid #000000",
                boxShadow: "0px 2px 20px 2px rgba(0, 0, 0, 0.25)",
              }}
            >
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GroupExcursionCard;
