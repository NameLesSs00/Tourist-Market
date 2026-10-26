"use client";

import React from "react";
import { ProductDetailsGallery } from "./ProductDetailsGallery";
import { ProductDetailsBookingCard } from "./ProductDetailsBookingCard";
import { ProductDetailsNeedHelp } from "./ProductDetailsNeedHelp";
import { ProductDetailsDescription } from "./ProductDetailsDescription";
import { ProductDetailsReviews } from "./ProductDetailsReviews";
import { ProductDetailsRelated } from "./ProductDetailsRelated";

interface ProductDetailsSectionProps {
  slug?: string;
  locale?: string;
}

export function ProductDetailsSection({
  slug = "ananas-1",
  locale = "en",
}: ProductDetailsSectionProps) {
  const isRTL = locale === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-24 font-poppins"
      style={{ background: "#FFF8ED" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 flex flex-col gap-10 sm:gap-12">
        {/* ─── Top Section: Gallery & Description (Left) + Booking & Need Help (Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (lg: 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Gallery */}
            <ProductDetailsGallery />

            {/* Product Description */}
            <ProductDetailsDescription />
          </div>

          {/* Right Column (lg: 4 cols): Sticky Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Booking Card */}
            <ProductDetailsBookingCard />

            {/* Need Help Card */}
            <ProductDetailsNeedHelp />
          </div>
        </div>

        {/* ─── Middle Section: Reviews & Comments ─── */}
        <ProductDetailsReviews productId={slug} />

        {/* ─── Bottom Section: Related Products ─── */}
        <ProductDetailsRelated locale={locale} />
      </div>
    </div>
  );
}

export default ProductDetailsSection;
