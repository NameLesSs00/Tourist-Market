"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface HotelProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}

interface HotelDeliveriesCardProps {
  product: HotelProduct;
  locale?: string;
  onAddToCart?: (product: HotelProduct) => void;
}

export function HotelDeliveriesCard({
  product,
  locale = "en",
  onAddToCart,
}: HotelDeliveriesCardProps) {
  return (
    <div className="flex flex-col font-poppins select-none group">
      {/* ─── Image Box (imgs dev) ─── */}
      <div
        className="relative w-full aspect-square rounded-[5px] flex items-center justify-center p-4 overflow-hidden transition-shadow duration-200 group-hover:shadow-md"
        style={{
          background: "#FFFFF2",
          border: "0.5px solid #888888",
        }}
      >
        <div className="relative w-[82%] h-[82%] transition-transform duration-300 group-hover:scale-105">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ─── Card Info ─── */}
      <div className="mt-2.5 sm:mt-3 flex flex-col gap-0.5 sm:gap-1">
        {/* Title & View Icon */}
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-[12px] sm:text-[14px] lg:text-[15px] font-semibold text-[#444444] lg:text-[#0E4A68] tracking-wide uppercase truncate">
            {product.title}
          </h3>
          <Link
            href={`/${locale}/hotel-deliveries/${product.id}`}
            aria-label={`View ${product.title}`}
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
            {product.price}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${product.title} to cart`}
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
