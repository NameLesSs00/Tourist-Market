"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { CartItem } from "@/models/cart";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const DEFAULT_PRODUCT_IMAGE = "/GroupExcursions/HeroLogo.webp";

function MiniCartThumbnail({ image, title }: { image?: string; title: string }) {
  const resolved = image ? getBackendImageUrl(image) || image : DEFAULT_PRODUCT_IMAGE;
  const [src, setSrc] = useState<string>(resolved);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const nextUrl = image ? getBackendImageUrl(image) || image : DEFAULT_PRODUCT_IMAGE;
    setSrc(nextUrl);
    setHasError(false);
  }, [image]);

  return (
    <Image
      src={src}
      alt={title}
      fill
      className={`object-contain p-0.5 transition-opacity ${hasError ? "opacity-60" : ""}`}
      sizes="48px"
      unoptimized={typeof src === "string" && src.startsWith("http")}
      onError={() => {
        if (src !== DEFAULT_PRODUCT_IMAGE) {
          setSrc(DEFAULT_PRODUCT_IMAGE);
          setHasError(true);
        }
      }}
    />
  );
}

interface OrderSummaryCardProps {
  items: CartItem[];
  subtotal: number;
  onRemoveItem: (productId: number) => void;
  shipping?: number;
}

export function OrderSummaryCard({
  items,
  subtotal,
  onRemoveItem,
  shipping = 0,
}: OrderSummaryCardProps) {
  const isEmpty = items.length === 0;
  const total = subtotal + shipping;

  return (
    <div
      style={{
        border: "0.5px solid #888888",
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
      }}
      className="w-full font-poppins overflow-hidden shadow-xs"
    >
      {/* ─── Header ─── */}
      <div
        style={{
          backgroundColor: "#0E4A68",
        }}
        className="py-3 px-5 text-white text-[17px] font-bold tracking-wide select-none"
      >
        Order Summary
      </div>

      {/* ─── Body ─── */}
      {isEmpty ? (
        <div className="py-14 text-center">
          <p className="text-[16px] font-medium text-[#083952]">
            No Items Here
          </p>
        </div>
      ) : (
        /* Mini Product Cards List */
        <div className="p-4 flex flex-col gap-3 max-h-[380px] overflow-y-auto">
          {items.map((item) => {
            const lineTotal = (item.price || 0) * item.quantity;

            return (
              <div
                key={item.productId}
                style={{
                  border: "0.6px solid #888888",
                  borderRadius: "6px",
                  backgroundColor: "#FFFFFF",
                }}
                className="p-2.5 flex items-center justify-between gap-3 hover:border-[#146188] transition-colors"
              >
                {/* Product Thumbnail */}
                <div
                  style={{
                    backgroundColor: "#FFFFF2",
                    border: "0.5px solid #888888/40",
                    borderRadius: "4px",
                  }}
                  className="relative w-12 h-12 shrink-0 p-0.5 flex items-center justify-center overflow-hidden"
                >
                  <MiniCartThumbnail image={item.image} title={item.title} />
                </div>

                {/* Product Details (Title + Quantity × Price) */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h5 className="font-poppins text-[13px] font-semibold text-[#146188] uppercase truncate leading-tight">
                    {item.title}
                  </h5>
                  <p className="font-poppins text-[13px] text-[#646464] font-normal mt-0.5">
                    {item.quantity}×{(item.price || 0).toFixed(0)} $
                  </p>
                </div>

                {/* Remove Cross & Line Total */}
                <div className="flex flex-col items-end justify-between h-12 py-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.productId)}
                    aria-label={`Remove ${item.title}`}
                    className="text-gray-400 hover:text-red-500 text-xs transition-colors cursor-pointer leading-none p-0.5"
                  >
                    ✕
                  </button>
                  <span className="font-poppins text-[14px] font-semibold text-[#0E4A68] leading-none">
                    {lineTotal.toFixed(0)} $
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

{/* ─── Footer: Subtotal & Total ─── */}
<div className="p-4 sm:p-5 flex flex-col gap-3 bg-white">

  {/* Subtotal */}
  <div className="border-t border-[#888888]/30 pt-3 flex items-center justify-between text-[15px]">
    <span className="font-medium text-[#0E4A68]">Subtotal :</span>
    <span className="font-medium text-[#0E4A68]">
      ${subtotal.toFixed(2)}
    </span>
  </div>

  {/* Shipping */}
  <div className="flex items-center justify-between text-[15px]">
    <span className="font-medium text-[#0E4A68]">Shipping :</span>
    <span className="font-medium text-[#0E4A68]">
      ${shipping.toFixed(2)}
    </span>
  </div>

  {/* Total */}
  <div className="border-t border-[#888888]/30 pt-3 flex items-center justify-between text-[16px]">
    <span className="font-bold text-[#0E4A68]">Total :</span>
    <span className="font-bold text-[#0E4A68]">
      ${total.toFixed(2)}
    </span>
  </div>

</div>
    </div>
  );
}

export default OrderSummaryCard;
