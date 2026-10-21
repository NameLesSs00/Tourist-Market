"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ContactHeroProps {
  locale?: string;
}

export function ContactHero({ locale = "en" }: ContactHeroProps) {
  const isRTL = locale === "ar";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative isolate w-full overflow-hidden bg-[#FFF3E4] pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16 min-h-[520px] lg:min-h-[580px] flex items-center"
    >
      {/* Background Resort Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/contact/Hero-pic.png"
          alt="Egyptian coastal resort"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Soft mobile gradient overlay for readability on small screens */}
        <div
          className={`absolute inset-0 lg:hidden ${
            isRTL
              ? "bg-gradient-to-l from-[#FFF3E4] via-[#FFF3E4]/85 to-transparent"
              : "bg-gradient-to-r from-[#FFF3E4] via-[#FFF3E4]/85 to-transparent"
          }`}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="relative w-full">
          {/* Top-Left: Headings & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-[540px]"
          >
            <h1 className="font-['Poppins'] text-[36px] sm:text-[46px] lg:text-[54px] font-bold leading-[1.12] tracking-tight text-[#0E4A68]">
              Let&apos;s Plan Your
              <br />
              Next <span className="text-[#D48C28]">Journey</span>
            </h1>

            <p className="mt-4 max-w-[480px] font-['Poppins'] text-base sm:text-[17px] leading-relaxed text-[#0E4A68]">
              Questions, ideas, or a special request? Our local team is here to
              help you explore Egypt with confidence.
            </p>
          </motion.div>

          {/* ============================================================ */}
          {/* DESKTOP COMPOSITION (lg and up) - 100% UNTOUCHED AS IT WAS */}
          {/* ============================================================ */}
          <div className="hidden lg:block relative mt-10 h-[310px] w-full max-w-[740px]">
            <div
              className={`relative h-full w-[680px] ${
                isRTL ? "origin-top-right" : ""
              }`}
            >
              {/* "We're just a Message away" Callout with curved swoosh underline */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className={`absolute bottom-4 z-20 max-w-[320px] select-none ${
                  isRTL ? "right-0" : "left-0"
                }`}
              >
                <p className="font-['Poppins'] text-[26px] font-semibold italic text-[#0E4A68] tracking-tight whitespace-nowrap">
                  We&apos;re just a Message away
                </p>
                <div className="mt-1.5 w-full max-w-[310px]">
                  <Image
                    src="/contact/Vector 2.svg"
                    alt=""
                    aria-hidden="true"
                    width={310}
                    height={16}
                    className="h-auto w-full"
                  />
                </div>
              </motion.div>

              {/* Airplane & Dotted Flight Trajectory (Frame 538.svg) - Plane place untouched */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className={`pointer-events-none absolute left-[150px] z-10 h-[130px] w-[285px] ${
                  isRTL ? "right-[100px]" : "left-[100px]"
                }`}
              >
                <Image
                  src="/contact/Frame 538.svg"
                  alt="Flight route animation"
                  fill
                  aria-hidden="true"
                  className="object-contain"
                />
              </motion.div>

              {/* Polaroid Photo 1: Sea / Coast */}
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: isRTL ? 7.76 : -7.76 }}
                animate={{ opacity: 1, y: 0, rotate: isRTL ? 7.76 : -7.76 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className={`absolute top-[40px] ml-[14px] z-10 h-[235px] w-[175px] rounded-[4px] bg-white select-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${
                  isRTL ? "right-[335px]" : "left-[335px]"
                }`}
                style={{
                  border: "6px solid #FFFFFF",
                  boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                  transform: isRTL ? "rotate(7.76deg)" : "rotate(-7.76deg)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/contact/f5b660d1aea3c1c98e9ac9857cafb27e089e3dde.png"
                    alt="Egyptian coast and pier"
                    fill
                    sizes="175px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Polaroid Photo 2: Temple Columns */}
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: isRTL ? -16.44 : 16.44 }}
                animate={{ opacity: 1, y: 0, rotate: isRTL ? -16.44 : 16.44 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className={`absolute top-[98px] z-20 h-[240px] ml-[55px] w-[170px] rounded-[4px] bg-white select-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${
                  isRTL ? "right-[455px]" : "left-[455px]"
                }`}
                style={{
                  border: "6px solid #FFFFFF",
                  boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                  transform: isRTL ? "rotate(-16.44deg)" : "rotate(16.44deg)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/contact/9482ba6745d394de567f97f9e75e05a2dc86f377.jpg"
                    alt="Ancient Egyptian temple columns"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* MOBILE & TABLET COMPOSITION (< lg) - FIXED WITH REF ROTATE */}
          {/* ============================================================ */}
          <div className="block lg:hidden relative mt-8 sm:mt-10 w-full max-w-[520px]">
            {/* "We're just a Message away" Callout */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className={`select-none ${isRTL ? "text-right" : "text-left"}`}
            >
              <p className="font-['Poppins'] text-[20px] sm:text-[24px] font-semibold italic text-[#0E4A68] tracking-tight">
                We&apos;re just a Message away
              </p>
              <div className="mt-1 w-full max-w-[250px] sm:max-w-[290px]">
                <Image
                  src="/contact/Vector 2.svg"
                  alt=""
                  aria-hidden="true"
                  width={290}
                  height={15}
                  className="h-auto w-full"
                />
              </div>
            </motion.div>

            {/* Visual Composition: Airplane Trajectory + Dual Polaroid Photos */}
            <div
              className={`relative mt-5 sm:mt-6 h-[225px] sm:h-[260px] w-full scale-[0.92] min-[380px]:scale-100 ${
                isRTL ? "origin-top-right" : "origin-top-left"
              }`}
            >
              {/* Airplane & Dotted Flight Trajectory */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                className={`pointer-events-none absolute -top-2 sm:-top-3 z-10 h-[95px] w-[205px] sm:h-[120px] sm:w-[260px] ${
                  isRTL
                    ? "right-[15px] sm:right-[25px]"
                    : "left-[15px] sm:left-[25px]"
                }`}
              >
                <Image
                  src="/contact/Frame 538.svg"
                  alt="Flight route animation"
                  fill
                  aria-hidden="true"
                  className="object-contain"
                />
              </motion.div>

              {/* Polaroid Photo 1: Sea / Coast with Reference Rotate (-7.76 deg) */}
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: isRTL ? 7.76 : -7.76 }}
                animate={{ opacity: 1, y: 0, rotate: isRTL ? 7.76 : -7.76 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className={`absolute top-[28px] sm:top-[32px] ml-18 z-10 h-[170px] w-[125px] sm:h-[210px] sm:w-[155px] rounded-[4px] bg-white select-none  hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${
                  isRTL
                    ? "right-[95px] sm:right-[130px]"
                    : "left-[95px] sm:left-[130px]"
                }`}
                style={{
                  border: "5px solid #FFFFFF",
                  boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                  transform: isRTL ? "rotate(7.76deg)" : "rotate(-7.76deg)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/contact/f5b660d1aea3c1c98e9ac9857cafb27e089e3dde.png"
                    alt="Egyptian coast and pier"
                    fill
                    sizes="(max-width: 640px) 125px, 155px"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Polaroid Photo 2: Temple Columns with Reference Rotate (16.44 deg) */}
              <motion.div
                initial={{ opacity: 0, y: 12, rotate: isRTL ? -16.44 : 16.44 }}
                animate={{ opacity: 1, y: 0, rotate: isRTL ? -16.44 : 16.44 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className={`absolute top-[48px] sm:top-[56px] ml-19 z-20 h-[175px] w-[120px] sm:h-[215px] sm:w-[150px] rounded-[4px] bg-white select-none hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${
                  isRTL
                    ? "right-[180px] sm:right-[240px]"
                    : "left-[180px] sm:left-[240px]"
                }`}
                style={{
                  border: "5px solid #FFFFFF",
                  boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.2)",
                  transform: isRTL ? "rotate(-16.44deg)" : "rotate(16.44deg)",
                }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src="/contact/9482ba6745d394de567f97f9e75e05a2dc86f377.jpg"
                    alt="Ancient Egyptian temple columns"
                    fill
                    sizes="(max-width: 640px) 120px, 150px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;