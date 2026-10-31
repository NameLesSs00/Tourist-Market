"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ProductDetailsGallery } from "./ProductDetailsGallery";
import { ProductDetailsBookingCard } from "./ProductDetailsBookingCard";
import { ProductDetailsNeedHelp } from "./ProductDetailsNeedHelp";
import { ProductDetailsDescription } from "./ProductDetailsDescription";
import { ProductDetailsReviews } from "./ProductDetailsReviews";
import { ProductDetailsRelated } from "./ProductDetailsRelated";
import { FloatingCartButton } from "../components/FloatingCartButton";
import {
  useClientProductDetailQuery,
  useClientProductSubcategoryQuery,
} from "@/features/products/useClientProducts";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface ProductDetailsSectionProps {
  slug?: string;
  locale?: string;
}

export function ProductDetailsSection({
  slug = "1",
  locale = "en",
}: ProductDetailsSectionProps) {
  const isRTL = locale === "ar";

  // Parse numeric product ID from slug parameter (e.g. "3" or "ananas-1")
  const numericId = useMemo(() => {
    if (!slug) return 1;
    const direct = Number(slug);
    if (!isNaN(direct) && direct > 0) return direct;
    const parts = slug.split("-");
    const last = Number(parts[parts.length - 1]);
    if (!isNaN(last) && last > 0) return last;
    return 1;
  }, [slug]);

  const { data: product, isLoading: isProductLoading } =
    useClientProductDetailQuery(numericId, locale);

  const { data: subcategory } = useClientProductSubcategoryQuery(
    product?.subCategoryId,
    locale
  );

  const galleryImages = useMemo(() => {
    if (product?.images && product.images.length > 0) {
      const urls = product.images
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((img) => getBackendImageUrl(img.imageUrl))
        .filter((url): url is string => Boolean(url));
      return urls.length > 0 ? urls : undefined;
    }
    return undefined;
  }, [product?.images]);

  // Product not found state after loading finishes
  if (!isProductLoading && !product) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 font-poppins text-center"
        style={{ background: "#FFF8ED" }}
      >
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#888888]/30 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-[#0E4A68]">
            Product Not Found
          </h2>
          <p className="text-sm text-[#64748B]">
            The product you are looking for does not exist or may have been removed.
          </p>
          <Link
            href={`/${locale}/hotel-deliveries`}
            className="inline-block mt-4 px-6 py-2.5 bg-[#0E4A68] text-white rounded-lg font-semibold hover:bg-[#0A3850] transition-colors"
          >
            Back to Hotel Deliveries
          </Link>
        </div>
      </div>
    );
  }

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
            <ProductDetailsGallery images={galleryImages} />

            {/* Product Description & Dynamic Specifications */}
            <ProductDetailsDescription
              title={product?.title}
              subtitle={product?.subTitle}
              keys={product?.keys}
            />
          </div>

          {/* Right Column (lg: 4 cols): Sticky Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
            {/* Booking Card */}
            <ProductDetailsBookingCard
              productId={numericId}
              itemTitle={product?.title}
              category={subcategory?.name || "Hotel Delivery"}
              unitPrice={product?.price}
              unitName={product?.priceFor}
<<<<<<< Updated upstream
=======
              imageUrl={galleryImages?.[0]}
>>>>>>> Stashed changes
              locale={locale}
            />

            {/* Need Help Card */}
            <ProductDetailsNeedHelp />
          </div>
        </div>

        {/* ─── Middle Section: Reviews & Comments ─── */}
        <ProductDetailsReviews productId={numericId} locale={locale} />

        {/* ─── Bottom Section: Related Products ─── */}
        <ProductDetailsRelated
          currentProductId={numericId}
          subCategoryId={product?.subCategoryId}
          locale={locale}
        />
      </div>

      {/* ─── Floating Cart Button ─── */}
<<<<<<< Updated upstream
      <FloatingCartButton />
=======
      <FloatingCartButton locale={locale} />
>>>>>>> Stashed changes
    </div>
  );
}

export default ProductDetailsSection;
