"use client";

import React from "react";

interface ProductDetailsSkeletonProps {
  locale?: string;
}

export function ProductDetailsSkeleton({ locale = "en" }: ProductDetailsSkeletonProps) {
  const isRTL = locale === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 font-poppins"
      style={{ background: "#FFF8ED" }}
      aria-busy="true"
      aria-label="Loading product details..."
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 flex flex-col gap-10 sm:gap-12 animate-pulse">
        {/* Top Grid: Gallery & Description (Left) + Sticky Booking Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Gallery Placeholder */}
            <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-6 flex flex-col gap-4 shadow-xs">
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-200/80 rounded-xl" />
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`thumb-skel-${i}`}
                    className="aspect-square bg-slate-200/70 rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Description & Keys Box Placeholder */}
            <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col gap-4 shadow-xs">
              <div className="h-7 w-2/3 bg-slate-200 rounded-md" />
              <div className="h-4 w-1/3 bg-slate-200/70 rounded-md" />
              <div className="space-y-2.5 pt-2">
                <div className="h-4 w-full bg-slate-200/60 rounded" />
                <div className="h-4 w-5/6 bg-slate-200/60 rounded" />
                <div className="h-4 w-4/6 bg-slate-200/60 rounded" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={`spec-skel-${idx}`}
                    className="h-14 bg-slate-100 rounded-lg p-2 flex flex-col justify-between"
                  >
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                    <div className="h-4 w-2/3 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Booking Card Placeholder */}
            <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col gap-5 shadow-xs">
              <div className="h-5 w-1/3 bg-slate-200/70 rounded-full" />
              <div className="h-7 w-3/4 bg-slate-200 rounded-md" />
              <div className="h-9 w-1/2 bg-slate-200 rounded-md" />
              <div className="h-12 w-full bg-slate-100 rounded-lg" />
              <div className="h-12 w-full bg-slate-200 rounded-lg" />
            </div>

            {/* Need Help Placeholder */}
            <div className="w-full h-32 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-center gap-3">
              <div className="h-5 w-1/2 bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-100 rounded" />
            </div>
          </div>
        </div>

        {/* Middle Section: Reviews Placeholder */}
        <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col gap-6 shadow-xs">
          <div className="h-6 w-48 bg-slate-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-36 bg-slate-100 rounded-xl" />
            <div className="h-36 bg-slate-100 rounded-xl" />
          </div>
        </div>

        {/* Bottom Section: Related Products Placeholder */}
        <div className="w-full flex flex-col gap-6">
          <div className="h-6 w-40 bg-slate-200 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`rel-skel-${i}`}
                className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-3 shadow-xs"
              >
                <div className="aspect-square w-full bg-slate-200 rounded-lg" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;

