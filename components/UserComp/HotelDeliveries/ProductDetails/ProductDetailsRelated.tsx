"use client";

import React from "react";
import { HotelDeliveriesCard } from "../components/HotelDeliveriesCard";
import { useClientRelatedProductsQuery } from "@/features/products/useClientProducts";

interface ProductDetailsRelatedProps {
  currentProductId?: number;
  subCategoryId?: number;
  locale?: string;
}

export function ProductDetailsRelated({
  currentProductId,
  subCategoryId,
  locale = "en",
}: ProductDetailsRelatedProps) {
  const { data: relatedProducts, isLoading } = useClientRelatedProductsQuery(
    currentProductId,
    subCategoryId,
    locale
  );

  const products = relatedProducts || [];

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="w-full font-poppins select-none mt-12 sm:mt-16">
      {/* ─── Section Title ─── */}
      <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#0E4A68] tracking-tight mb-6 sm:mb-8">
        Related Products
      </h3>

      {/* ─── Skeleton Loading State ─── */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={`rel-skel-${idx}`} className="flex flex-col gap-2">
              <div className="aspect-square w-full rounded-[5px] bg-[#0E4A68]/10 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-[#0E4A68]/10 animate-pulse mt-1" />
              <div className="h-4 w-1/2 rounded bg-[#0E4A68]/10 animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* ─── 4 Columns Grid ─── */}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((prod) => (
            <HotelDeliveriesCard
              key={`related-${prod.id}`}
              product={prod}
              locale={locale}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductDetailsRelated;
