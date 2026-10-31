"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

export interface HotelProduct {
  id: string | number;
  title: string;
  price: string;
  image: string;
  category?: string;
}

interface HotelDeliveriesCardProps {
  product: ProductListItem | HotelProduct;
  locale?: string;
  onAddToCart?: (product: ProductListItem | HotelProduct) => void;
}

const DEFAULT_PRODUCT_IMAGE = "/GroupExcursions/HeroLogo.webp";

export function HotelDeliveriesCard({
  product,
  locale = "en",
  onAddToCart,
}: HotelDeliveriesCardProps) {
  // Determine if product is ProductListItem or legacy HotelProduct
  const isListItem = "subCategoryId" in product;

  const id = product.id;
  const title = product.title || "Untitled Product";

  let priceFormatted: string;
  if (isListItem) {
    const p = product as ProductListItem;
    const unit = p.priceFor?.trim() ? ` / ${p.priceFor.trim()}` : "";
    priceFormatted = `$${Number(p.price || 0).toFixed(2)}${unit}`;
  } else {
    priceFormatted = (product as HotelProduct).price || "$0.00";
  }

  // Determine initial image url with default fallback
  let initialImageUrl: string = DEFAULT_PRODUCT_IMAGE;
  if (isListItem) {
    const p = product as ProductListItem;
    if (p.images && p.images.length > 0) {
      const heroImg = p.images
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder)[0];
      if (heroImg?.imageUrl && heroImg.imageUrl.trim()) {
        const resolved = getBackendImageUrl(heroImg.imageUrl.trim());
        if (resolved) {
          initialImageUrl = resolved;
        }
      }
    }
  } else {
    const legacyImg = (product as HotelProduct).image;
    if (legacyImg && legacyImg.trim()) {
      initialImageUrl = legacyImg.trim();
    }
  }

  const [imgSrc, setImgSrc] = useState<string>(initialImageUrl);
  const [prevImageUrl, setPrevImageUrl] = useState<string>(initialImageUrl);

  // Sync state if product changes
  if (prevImageUrl !== initialImageUrl) {
    setPrevImageUrl(initialImageUrl);
    setImgSrc(initialImageUrl);
  }

  const isFallback = !imgSrc || imgSrc === DEFAULT_PRODUCT_IMAGE;

  return (
    <div className="flex flex-col font-poppins select-none group">
      {/* ─── Image Box ─── */}
      <div
        className="relative w-full aspect-square rounded-[5px] flex items-center justify-center p-4 overflow-hidden transition-shadow duration-200 group-hover:shadow-md"
        style={{
          background: "#FFFFF2",
          border: "0.5px solid #888888",
        }}
      >
        <Link
          href={`/${locale}/hotel-deliveries/${id}`}
          className="relative w-[82%] h-[82%] transition-transform duration-300 group-hover:scale-105 block"
        >
          <Image
            src={imgSrc || DEFAULT_PRODUCT_IMAGE}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className={`object-contain transition-opacity duration-300 ${
              isFallback ? "opacity-70 p-3" : ""
            }`}
            unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
            onError={() => {
              if (imgSrc !== DEFAULT_PRODUCT_IMAGE) {
                setImgSrc(DEFAULT_PRODUCT_IMAGE);
              }
            }}
          />
        </Link>
      </div>

      {/* ─── Card Info ─── */}
      <div className="mt-2.5 sm:mt-3 flex flex-col gap-0.5 sm:gap-1">
        {/* Title & View Icon */}
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-[12px] sm:text-[14px] lg:text-[15px] font-semibold text-[#444444] lg:text-[#0E4A68] tracking-wide uppercase truncate">
            <Link
              href={`/${locale}/hotel-deliveries/${id}`}
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <Link
            href={`/${locale}/hotel-deliveries/${id}`}
            aria-label={`View ${title}`}
            className="p-0.5 sm:p-1 text-[#0E4A68] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
          >
            <Image
              src="/Hoteldeliveries/Group.svg"
              alt="View"
              width={18}
              height={13}
              className="object-contain w-4 h-3 sm:w-5 sm:h-3.5"
            />
          </Link>
        </div>

        {/* Price & Cart Icon */}
        <div className="flex items-center justify-between gap-1">
          <p className="text-[13px] sm:text-[15px] lg:text-[16px] font-bold text-[#0E4A68]">
            {priceFormatted}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${title} to cart`}
            className="p-0.5 sm:p-1 text-[#0E4A68] hover:opacity-80 transition-opacity cursor-pointer shrink-0 active:scale-95"
          >
            <Image
              src="/Hoteldeliveries/Vector.svg"
              alt="Add to cart"
              width={16}
              height={16}
              className="object-contain w-3.5 h-3.5 sm:w-4 sm:h-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelDeliveriesCard;
