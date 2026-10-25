"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiClock, FiStar } from "react-icons/fi";
import { PrivateExcursion } from "../types";

interface PrivateDetailsRelatedProps {
  excursions: PrivateExcursion[];
  locale?: string;
}

export function PrivateDetailsRelated({
  excursions = [],
  locale = "en",
}: PrivateDetailsRelatedProps) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!excursions || excursions.length === 0) return null;

  return (
    <section className="w-full font-poppins pt-6 pb-12">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-[26px] sm:text-[32px] font-bold text-[#083952] tracking-tight">
          EXPLORE RELATED TRIPS
        </h2>
      </div>

      {/* Cards Row with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          aria-label="Previous related excursions"
          className="hidden md:flex absolute -left-13 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-[#083952] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <FiChevronLeft size={22} />
        </button>

        {/* Excursions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {excursions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
              style={{
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
                border: "0.8px solid #EFEFEF",
              }}
            >
              <div>
                {/* Image & Badge */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-semibold text-[#083952] shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 pb-2">
                  {/* Duration & Star rating */}
                  <div className="flex items-center justify-between text-[13px] sm:text-[14px] text-[#083952] mb-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      <FiClock size={16} className="text-[#083952]" />
                      <span>{item.duration}</span>
                    </div>

                    <div className="flex items-center gap-1 font-bold">
                      <span>{item.stars || item.rating.toFixed(1)}</span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <FiStar
                            key={s}
                            size={14}
                            className="text-[#88C43F] fill-[#88C43F]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-[#083952] leading-snug line-clamp-2 uppercase min-h-[48px]">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-[13px] sm:text-[14px] text-[#555555] leading-relaxed line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-5 sm:p-6 pt-2">
                {/* Price Breakdown Row */}
                <div className="py-3 border-t border-gray-100 flex items-center justify-between text-[12px] sm:text-[13px] text-[#083952] font-semibold">
                  <span>Adult: {item.adultPrice.toFixed(2)} $</span>
                  <span className="text-gray-300">|</span>
                  <span>Child: {item.childPrice.toFixed(2)} $</span>
                  <span className="text-gray-300">|</span>
                  <span>Infant: {item.infantPrice.toFixed(2)} $</span>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/${locale}/PrivateExcursions/${item.slug}`}
                  className="mt-2 w-full py-3 rounded-xl bg-[#DE7423] text-white font-bold text-[15px] flex items-center justify-center hover:bg-[#C9641B] transition-colors shadow-sm active:scale-[0.99]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          aria-label="Next related excursions"
          className="hidden md:flex absolute -right-13 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-[#083952] hover:bg-gray-50 transition-all"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <span className="w-2.5 h-2.5 rounded-full bg-[#083952]" />
        <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </div>
    </section>
  );
}
