"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ServiceCardItem } from "../types";
import { ServiceCard } from "./ServiceCard";
import { ContentHeading } from "@/components/UserComp/Shared/ContentHeading";

interface ServiceGridProps {
  title: string;
  subtitle: string;
  cards: ServiceCardItem[];
  locale?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorText?: string;
  emptyText?: string;
  viewDetailsText?: string;
  whatsappText?: string;
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function SkeletonCard() {
  return (
    <div
      className="flex flex-col justify-between h-full overflow-hidden animate-pulse"
      style={{
        backgroundColor: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "8px",
        boxShadow: "0px 2px 20px 2px #00000033",
      }}
    >
      <div className="w-full aspect-[400/230] bg-slate-200 shrink-0" />
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-3/4 bg-slate-200 rounded" />
          <div className="h-3.5 w-full bg-slate-100 rounded mt-2" />
          <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-3 mt-auto">
          <div className="h-9 bg-slate-200 rounded" />
          <div className="h-9 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ServiceGrid({
  title,
  subtitle,
  cards,
  locale = "en",
  isLoading = false,
  isError = false,
  errorText = "Failed to load services. Please try again later.",
  emptyText = "No services available at the moment. Please check back later.",
  viewDetailsText,
  whatsappText,
}: ServiceGridProps) {
  return (
    <section className="w-full max-w-[1320px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-10 md:py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 md:mb-12"
      >
        <ContentHeading
          className="font-poppins font-bold text-xl sm:text-2xl md:text-[32px] tracking-tight uppercase leading-tight"
          style={{ color: "#0E4A68" }}
        >
          {title}
        </ContentHeading>
        <p
          className="font-poppins font-normal text-xs sm:text-sm md:text-base mt-2 sm:mt-2.5 leading-relaxed px-2"
          style={{ color: "#646464" }}
        >
          {subtitle}
        </p>
      </motion.div>

      {/* Error state */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 sm:py-16 font-poppins"
        >
          <p className="text-red-500 text-xs sm:text-sm font-medium">
            {errorText}
          </p>
        </motion.div>
      )}

      {/* Loading skeleton */}
      {!isError && isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="h-full flex flex-col">
              <SkeletonCard />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isError && !isLoading && cards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 sm:py-16 font-poppins"
        >
          <p className="text-[#0E4A68] text-xs sm:text-sm font-medium opacity-60">
            {emptyText}
          </p>
        </motion.div>
      )}

      {/* Cards grid with stagger animation and unified stretch height */}
      {!isError && !isLoading && cards.length > 0 && (
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardItemVariants}
              className="h-full flex flex-col"
            >
              <ServiceCard
                item={card}
                locale={locale}
                viewDetailsText={viewDetailsText}
                whatsappText={whatsappText}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ServiceGrid;
