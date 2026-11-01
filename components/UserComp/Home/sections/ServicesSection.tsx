"use client";

import React, { useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ServiceCard } from "../components/ServiceCard";
import { getServicesData, ServiceItem } from "@/shared/utils/servicesData";
import { getDictionary } from "@/shared/utils/getDictionary";

interface ServicesSectionProps {
  locale?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Services({ locale = "en" }: ServicesSectionProps) {
  const dict = getDictionary(locale);
  const t = dict.services;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const services = getServicesData(locale);

  const [isDragging, setIsDragging] = useState(false);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 305;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    startScrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDownRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
      scrollContainerRef.current.scrollLeft = startScrollLeftRef.current - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
      hasMovedRef.current = false;
    }, 50);
  };

  return (
    <section
      id="services"
      className="w-full bg-[#FFF4E5] py-14 sm:py-16 lg:py-20 relative overflow-hidden"
      aria-label={t.titlePrefix + " " + t.titleAccent}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#003D5B]">
            {t.titlePrefix} <span className="text-[#D48C28]">{t.titleAccent}</span>
          </h2>
          <p className="font-poppins text-sm sm:text-base text-[#646464] mt-2 font-normal">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Big Rounded Container for Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="services-carousel-panel relative pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-12"
        >
          {/* Left Circular Arrow Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleScroll("left")}
            aria-label={t.prev}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#003D5B] shadow-[0px_2px_15px_0px_#00000033] transition-colors z-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28]"
            style={{
              boxShadow: "0px 2px 15px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </motion.button>

          {/* Right Circular Arrow Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleScroll("right")}
            aria-label={t.next}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 bg-[#F7F7F7] rounded-full flex items-center justify-center text-[#003D5B] shadow-[0px_2px_15px_0px_#00000033] transition-colors z-30 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D48C28]"
            style={{
              boxShadow: "0px 2px 15px 0px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </motion.button>

          {/* Cards Carousel Container: Smooth mouse-drag to scroll and native touch swipe */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClickCapture={(e) => {
              if (hasMovedRef.current) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={`relative z-10 w-full overflow-x-auto no-scrollbar pb-2 -mx-1 px-1 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab scroll-smooth"
            }`}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="flex gap-4 sm:gap-5 xl:gap-6 items-start"
            >
              {services.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  className="w-[260px] sm:w-[275px] xl:w-[290px] flex-shrink-0"
                >
                  <ServiceCard item={item} exploreText={t.explore} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
export { Services as ServicesSection };
export type { ServiceItem };
