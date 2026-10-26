"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CoverageExpansionProps {
  locale?: string;
  mapEmbedUrl?: string;
  locationName?: string;
  googleMapsUrl?: string;
}

export function CoverageExpansion({
  locale = "en",
  mapEmbedUrl,
  locationName = "El Kawther, Hurghada, Egypt",
  googleMapsUrl = "https://maps.google.com/?q=El+Kawther,+Hurghada,+Egypt",
}: CoverageExpansionProps) {
  const isRTL = locale === "ar";

  const defaultEmbedUrl = isRTL
    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56965.132896590214!2d33.77884218731175!3d27.20037136017845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287e029199d79%3A0x6a053c8477ffdfc3!2sEl%20Kawther%2C%20Hurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sar!2seg!4v1710000000000!5m2!1sar!2seg"
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56965.132896590214!2d33.77884218731175!3d27.20037136017845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145287e029199d79%3A0x6a053c8477ffdfc3!2sEl%20Kawther%2C%20Hurghada%2C%20Red%20Sea%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FFF4E5]"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Coverage & Expansion Card matching Map.png */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex justify-center lg:justify-start"
          >
            <div
              style={{
                backgroundColor: "#FFFEF5",
                border: "0.5px solid #888888CC",
                borderRadius: "20px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
              }}
              className="w-full max-w-[680px] p-8 sm:p-10 lg:p-12"
            >
              {/* Header Title matching Map.png */}
              <h2 className="font-['Poppins'] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0C3B53] tracking-tight">
                Coverage & Expansion
              </h2>

              {/* Horizontal Divider Line (~75% width matching Map.png) */}
              <div
                style={{ borderTop: "0.8px solid #8A8A8A" }}
                className="w-3/4 my-6 sm:my-8"
              />

              {/* Timeline Items with cirline.svg */}
              <div className="relative flex gap-5 sm:gap-6 items-start pt-2">
                {/* Timeline Vector Graphic */}
                <div className="shrink-0 w-4 pt-1 flex justify-center select-none pointer-events-none">
                  <Image
                    src="/about/cirline.svg"
                    alt=""
                    width={16}
                    height={272}
                    className="w-4 h-auto object-contain"
                  />
                </div>

                {/* Locations Text matching Map.png exactly */}
                <div className="flex flex-col gap-10 sm:gap-14 pt-0">
                  {/* Current Locations */}
                  <div>
                    <h3 className="font-['Poppins'] text-lg sm:text-[21px] font-bold text-[#0E4A68]">
                      Current Locations
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-[15px] sm:text-base text-[#0E4A68] leading-relaxed max-w-[480px]">
                      Hurghada, Sahl Hasheesh, El Gouna, Makadi Bay, Soma Bay, and Safaga
                    </p>
                  </div>

                  {/* Coming Soon */}
                  <div>
                    <h3 className="font-['Poppins'] text-lg sm:text-[21px] font-bold text-[#0E4A68]">
                      Coming Soon
                    </h3>
                    <p className="mt-2 font-['Poppins'] text-[15px] sm:text-base text-[#0E4A68] leading-relaxed max-w-[480px]">
                      Marsa Alam, Sharm El Sheikh, and Luxor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Circular Interactive Map iframe linked to client location */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div
              style={{
                border: "8px solid #FFFFFF",
                boxShadow: "0px 2px 35px 2px rgba(0, 0, 0, 0.25)",
                transform: "translateZ(0)",
              }}
              className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] xl:w-[460px] xl:h-[460px] rounded-full overflow-hidden bg-[#E5E3DF] group"
            >
              <iframe
                title={`Tourist Market Location - ${locationName}`}
                src={mapEmbedUrl || defaultEmbedUrl}
                className="w-full h-full border-0 scale-105 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Direct interactive link to the client's location */}
              <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Tourist Market location in Google Maps"
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white text-[#0E4A68] hover:text-[#D48C28] text-xs font-['Poppins'] font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#D48C28] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>{isRTL ? "موقعنا على الخريطة" : "El Kawther, Hurghada"}</span>
                  <svg
                    className="w-3 h-3 text-[#888888] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CoverageExpansion;
