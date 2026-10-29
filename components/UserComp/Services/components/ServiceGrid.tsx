import React from "react";
import { ServiceCardItem } from "../types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  title: string;
  subtitle: string;
  cards: ServiceCardItem[];
  locale?: string;
  isLoading?: boolean;
  isError?: boolean;
}

function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden animate-pulse"
      style={{
        backgroundColor: "#FFFFFF",
        border: "0.5px solid #888888",
        borderRadius: "8px",
        boxShadow: "0px 2px 20px 2px #00000033",
      }}
    >
      <div className="w-full aspect-[400/230] bg-slate-200" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-100 rounded" />
        <div className="h-3 w-4/5 bg-slate-100 rounded" />
        <div className="grid grid-cols-2 gap-3 mt-2">
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
}: ServiceGridProps) {
  return (
    <section className="w-full max-w-[1320px] mx-auto px-4 py-8 sm:py-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h1
          className="font-poppins font-bold text-2xl sm:text-3xl md:text-[34px] tracking-tight uppercase leading-tight"
          style={{ color: "#0E4A68" }}
        >
          {title}
        </h1>
        <p
          className="font-poppins font-normal text-sm sm:text-base mt-2.5 leading-relaxed"
          style={{ color: "#646464" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Error state */}
      {isError && (
        <div className="text-center py-16 font-poppins">
          <p className="text-red-500 text-sm font-medium">
            Failed to load services. Please try again later.
          </p>
        </div>
      )}

      {/* Loading skeleton */}
      {!isError && isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* Empty state — only shown after load completes with zero results */}
      {!isError && !isLoading && cards.length === 0 && (
        <div className="text-center py-16 font-poppins">
          <p className="text-[#0E4A68] text-sm font-medium opacity-60">
            No services available at the moment. Please check back later.
          </p>
        </div>
      )}

      {/* Cards grid */}
      {!isError && !isLoading && cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {cards.map((card) => (
            <ServiceCard key={card.id} item={card} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ServiceGrid;
