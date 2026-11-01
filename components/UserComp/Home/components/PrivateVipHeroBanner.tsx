"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary } from "@/shared/utils/getDictionary";

interface PrivateVipHeroBannerProps {
  locale?: string;
}

export function PrivateVipHeroBanner({ locale = "en" }: PrivateVipHeroBannerProps) {
  const dict = getDictionary(locale);
  const vip = dict.privateExcursions.vipBanner;

  const desktopBannerRef = React.useRef<HTMLDivElement>(null);
  const [screenLeftOffset, setScreenLeftOffset] = React.useState<number | null>(null);

  React.useEffect(() => {
    const updateOffset = () => {
      if (desktopBannerRef.current) {
        const rect = desktopBannerRef.current.getBoundingClientRect();
        setScreenLeftOffset(rect.left);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const targetMargin =
    typeof window !== "undefined"
      ? window.innerWidth >= 1536
        ? 28
        : window.innerWidth >= 1280
        ? 22
        : 16
      : 22;

  return (
    <>
      {/* 1. MOBILE & TABLET VIEW (< lg) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="block lg:hidden relative w-full max-w-[345px] sm:max-w-[560px] mx-auto h-[175px] sm:h-[245px] select-none"
      >
        <div className="absolute inset-y-0 left-0 right-[40px] sm:right-[60px] bg-[#0E4A68] rounded-l-[14px] sm:rounded-l-[20px] z-0" />

        <div className="absolute inset-y-0 right-0 w-[120px] sm:w-[170px] h-full pointer-events-none z-0">
          <Image
            src="/homepage/privateSection/bgshpae.png"
            alt={vip.alt.background}
            fill
            sizes="(max-width: 640px) 120px, 170px"
            priority
            className="object-fill object-right"
          />
        </div>

        <div
          className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 text-white font-poppins font-semibold text-[13px] sm:text-[16px] tracking-[0.08em] select-none pointer-events-none whitespace-nowrap z-20"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {vip.categories}
        </div>

        <div className="absolute left-[26px] sm:left-[45px] top-1/2 -translate-y-1/2 w-[145px] sm:w-[220px] h-[155px] sm:h-[220px] flex items-center z-10 pointer-events-none">
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/homepage/privateSection/Polygon 1 (2).png"
              alt={vip.alt.frame}
              fill
              sizes="(max-width: 640px) 145px, 220px"
              priority
              className="object-contain"
            />
          </div>

          <div className="relative z-10 flex flex-col items-start text-left pl-3 sm:pl-5 w-[130px] sm:w-[190px] max-w-full pointer-events-auto">
            <div className="relative w-[44px] sm:w-[65px] h-[23px] sm:h-[34px] mb-1 sm:mb-2 ml-1 sm:ml-2">
              <Image
                src="/homepage/privateSection/ship.svg"
                alt={vip.alt.shipIcon}
                fill
                sizes="(max-width: 640px) 44px, 65px"
                className="object-contain object-left"
              />
            </div>

            <h3 className="font-poppins font-medium text-[10px] sm:text-[13px] leading-[13px] sm:leading-[18px] text-white whitespace-nowrap">
              {vip.badge}
            </h3>
            <p className="font-poppins font-medium text-[10px] sm:text-[13px] leading-[13px] sm:leading-[18px] text-white whitespace-nowrap mt-0.5">
              {vip.privacy}
            </p>

            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.04 }}>
              <Link
                href={`/${locale}/private-excursions`}
                className="mt-2 sm:mt-3 inline-flex items-center justify-center bg-[#D48C28] hover:bg-[#b8761f] text-white font-poppins font-medium text-[8.5px] sm:text-[11px] h-[23px] sm:h-[30px] px-2.5 sm:px-4 rounded-[8px] sm:rounded-[10px] transition-colors shadow-sm whitespace-nowrap cursor-pointer max-w-full"
              >
                {vip.button}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute right-[4px] sm:right-[16px] top-[14px] sm:top-[16px] w-[86px] sm:w-[125px] h-[88px] sm:h-[128px] z-20 pointer-events-none drop-shadow-md">
          <Image
            src="/homepage/privateSection/yaht.png"
            alt={vip.alt.yacht}
            fill
            sizes="(max-width: 640px) 86px, 125px"
            className="object-contain"
            priority
          />
        </div>

        <div className="absolute right-[44px] sm:right-[68px] bottom-[12px] sm:bottom-[18px] w-[66px] sm:w-[96px] h-[66px] sm:h-[96px] z-20 pointer-events-none drop-shadow-md">
          <Image
            src="/homepage/privateSection/ElH.png"
            alt={vip.alt.helicopter}
            fill
            sizes="(max-width: 640px) 66px, 96px"
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* 2. LAPTOP & DESKTOP VIEW (>= lg) */}
      <motion.div
        ref={desktopBannerRef}
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex relative w-full h-[510px] xl:h-[570px] 2xl:h-[660px] items-center overflow-visible select-none"
      >
        <div className="absolute inset-y-0 right-full w-screen bg-[#0E4A68] pointer-events-none z-0" />

        <div className="absolute inset-y-0 left-0 w-[430px] xl:w-[500px] 2xl:w-[600px] h-full pointer-events-none select-none z-0">
          <Image
            src="/homepage/privateSection/bgshpae.png"
            alt={vip.alt.background}
            fill
            sizes="(max-width: 1280px) 430px, (max-width: 1536px) 500px, 600px"
            priority
            className="object-fill object-left"
          />
        </div>

        <div
          className="absolute top-1/2 -translate-y-1/2 text-white font-poppins font-semibold text-[26px] xl:text-[32px] 2xl:text-[38px] tracking-[0.1em] select-none pointer-events-none whitespace-nowrap z-20"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            left:
              screenLeftOffset !== null
                ? `-${Math.max(0, screenLeftOffset - targetMargin)}px`
                : "calc(-1 * max(40px, (100vw - 1650px) / 2 + 56px) + 22px)",
          }}
        >
          {vip.categories}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="absolute left-[45px] xl:left-[70px] 2xl:left-[115px] top-[46%] -translate-y-1/2 w-[260px] xl:w-[325px] 2xl:w-[410px] h-[360px] xl:h-[445px] 2xl:h-[540px] flex items-center z-10 pointer-events-auto"
        >
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image
              src="/homepage/privateSection/Polygon 1 (2).png"
              alt={vip.alt.frame}
              fill
              sizes="(max-width: 1280px) 260px, (max-width: 1536px) 325px, 410px"
              priority
              className="object-contain"
            />
          </div>

          <div className="relative z-10 flex flex-col items-start text-left pl-5 xl:pl-7 2xl:pl-10 w-[210px] xl:w-[260px] 2xl:w-[320px] max-w-full pointer-events-auto">
            <div className="relative w-[70px] xl:w-[85px] 2xl:w-[115px] h-[36px] xl:h-[46px] 2xl:h-[60px] mb-2 xl:mb-2.5 2xl:mb-3 ml-2.5 xl:ml-4 2xl:ml-6">
              <Image
                src="/homepage/privateSection/ship.svg"
                alt={vip.alt.shipIcon}
                fill
                sizes="(max-width: 1280px) 70px, (max-width: 1536px) 85px, 115px"
                className="object-contain object-left"
              />
            </div>

            <h3 className="font-poppins font-medium text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[20px] xl:leading-[24px] 2xl:leading-[28px] text-white whitespace-nowrap">
              {vip.badge}
            </h3>
            <p className="font-poppins font-medium text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[20px] xl:leading-[24px] 2xl:leading-[28px] text-white whitespace-nowrap mt-1">
              {vip.privacy}
            </p>

            <motion.div
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <Link
                href={`/${locale}/private-excursions`}
                className="mt-3 xl:mt-4 2xl:mt-5 inline-flex items-center justify-center bg-[#D48C28] hover:bg-[#b8761f] text-white font-poppins font-medium text-[10.5px] xl:text-[12.5px] 2xl:text-[14px] h-[30px] xl:h-[35px] 2xl:h-[40px] px-3.5 xl:px-5 2xl:px-6 rounded-[10px] xl:rounded-[12px] 2xl:rounded-[14px] transition-colors shadow-md whitespace-nowrap cursor-pointer max-w-full"
              >
                {vip.button}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-[260px] xl:left-[345px] 2xl:left-[430px] top-[1%] xl:top-[1.5%] 2xl:top-[1%] w-[170px] xl:w-[225px] 2xl:w-[285px] h-[175px] xl:h-[230px] 2xl:h-[290px] z-20 pointer-events-none drop-shadow-xl"
        >
          <Image
            src="/homepage/privateSection/yaht.png"
            alt={vip.alt.yacht}
            fill
            sizes="(max-width: 1280px) 170px, (max-width: 1536px) 225px, 285px"
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="absolute left-[235px] xl:left-[315px] 2xl:left-[395px] top-[52%] xl:top-[51.5%] 2xl:top-[51%] w-[135px] xl:w-[175px] 2xl:w-[225px] h-[135px] xl:h-[175px] 2xl:h-[225px] z-20 pointer-events-none drop-shadow-xl"
        >
          <Image
            src="/homepage/privateSection/ElH.png"
            alt={vip.alt.helicopter}
            fill
            sizes="(max-width: 1280px) 135px, (max-width: 1536px) 175px, 225px"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default PrivateVipHeroBanner;
