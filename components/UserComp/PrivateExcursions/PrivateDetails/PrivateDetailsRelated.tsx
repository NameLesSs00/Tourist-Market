"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock, FiStar } from "react-icons/fi";
import type { PrivateExcursion } from "../types";
import { PRIVATE_EXCURSION_FALLBACK_IMAGE } from "../utils/privateExcursionAdapter";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface PrivateDetailsRelatedProps {
  excursions: PrivateExcursion[];
  locale?: string;
}

export function PrivateDetailsRelated({
  excursions = [],
  locale = "en",
}: PrivateDetailsRelatedProps) {
  const dict = useClientDictionary();
  const t = dict.privateExcursions.details.related;

  const displayExcursions = (excursions || []).slice(0, 3);

  if (displayExcursions.length === 0) return null;

  return (
    <section className="w-full font-poppins pt-6 pb-12">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-[26px] sm:text-[32px] font-bold text-[#083952] tracking-tight">
          {t.title || "EXPLORE RELATED TRIPS"}
        </h2>
      </motion.div>

      {/* Excursions Grid (3 Cards Max, centered 3rd card on 2-col semi-small screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 [&>*:last-child]:md:max-lg:col-span-2 [&>*:last-child]:md:max-lg:w-1/2 [&>*:last-child]:md:max-lg:mx-auto">
        {displayExcursions.map((item, idx) => {
          const targetUrl = `/${locale}/private-excursions/${item.slug || item.id}`;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <Link
                href={targetUrl}
                className="bg-white rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer block text-inherit no-underline select-none"
                style={{
                  boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.08)",
                  border: "0.8px solid #EFEFEF",
                }}
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={item.imageUrl || PRIVATE_EXCURSION_FALLBACK_IMAGE}
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
                    {/* Meta Row: Duration & Rating */}
                    <div className="flex items-center justify-between text-[13px] text-gray-500 mb-2.5 font-medium">
                      <div className="flex items-center gap-1.5 text-[#0E4A68]">
                        <FiClock size={15} />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <FiStar size={14} className="fill-amber-400" />
                        <span>{item.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#083952] group-hover:text-[#DE7423] transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-[13px] sm:text-[14px] text-gray-600 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-5 sm:p-6 pt-2">
                  {/* View Details Action Button */}
                  <div className="mt-2 w-full py-3 rounded-xl bg-[#DE7423] group-hover:bg-[#C9641B] text-white font-bold text-[15px] flex items-center justify-center transition-colors shadow-sm active:scale-[0.99]">
                    {t.viewDetails || "View Details"}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default PrivateDetailsRelated;
