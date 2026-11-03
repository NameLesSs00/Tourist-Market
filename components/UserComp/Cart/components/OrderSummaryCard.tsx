"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import type { CartItem } from "@/models/cart";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { useCurrencyStore } from "@/features/currencies/currencyStore";

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
  selectedAreaName?: string;
  currentStep?: "cart" | "checkout";
  onProceedToCheckout?: () => void;
  isSubmitting?: boolean;
}

export function OrderSummaryCard({
  items,
  subtotal,
  onRemoveItem,
  shipping,
  selectedAreaName,
  currentStep = "cart",
  onProceedToCheckout,
  isSubmitting = false,
}: OrderSummaryCardProps) {
  const formatPrice = useCurrencyStore((s) => s.formatPrice);
  const isEmpty = items.length === 0;
  const hasShipping = Boolean(selectedAreaName && typeof shipping === "number");
  const shippingAmount = hasShipping ? (shipping as number) : 0;
  const total = subtotal + shippingAmount;

  return (
    <div
      style={{
        border: "0.5px solid #888888",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
      }}
      className="w-full font-poppins overflow-hidden shadow-xs"
    >
      {/* ─── Header ─── */}
      <div
        style={{
          backgroundColor: "#0E4A68",
        }}
        className="py-3 px-4 sm:px-5 text-white text-[16px] sm:text-[17px] font-bold tracking-wide select-none"
      >
        Order Summary
      </div>

      {/* ─── Body ─── */}
      {isEmpty ? (
        <div className="py-12 sm:py-14 text-center">
          <p className="text-[15px] sm:text-[16px] font-medium text-[#083952]">
            No Items Here
          </p>
        </div>
      ) : (
        /* Mini Product Cards List:
           On Step 1 ("cart"), items are already visible right above the summary, so hide repeated item list on mobile (hidden lg:flex).
           On Step 2 ("checkout"), show the mini product list so the guest can review their items while filling forms.
        */
        <div
          className={`p-3.5 sm:p-4 ${
            currentStep === "cart" ? "hidden lg:flex" : "flex"
          } flex-col gap-2.5 sm:gap-3 max-h-[380px] overflow-y-auto`}
        >
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
                className="p-2 sm:p-2.5 flex items-center justify-between gap-2.5 sm:gap-3 hover:border-[#146188] transition-colors"
              >
                {/* Product Thumbnail */}
                <div
                  style={{
                    backgroundColor: "#FFFFF2",
                    border: "0.5px solid #888888/40",
                    borderRadius: "4px",
                  }}
                  className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 p-0.5 flex items-center justify-center overflow-hidden"
                >
                  <MiniCartThumbnail image={item.image} title={item.title} />
                </div>

                {/* Product Details (Title + Quantity × Price) */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h5 className="font-poppins text-[12.5px] sm:text-[13px] font-semibold text-[#146188] uppercase truncate leading-tight">
                    {item.title}
                  </h5>
                  <p className="font-poppins text-[12px] sm:text-[13px] text-[#646464] font-normal mt-0.5">
                    {item.quantity}×{formatPrice(item.price || 0)}
                  </p>
                </div>

                {/* Remove Cross & Line Total */}
                <div className="flex flex-col items-end justify-between h-11 sm:h-12 py-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.productId)}
                    aria-label={`Remove ${item.title}`}
                    className="text-gray-400 hover:text-red-500 text-xs transition-colors cursor-pointer leading-none p-0.5"
                  >
                    <FiX size={13} />
                  </button>
                  <span className="font-poppins text-[13.5px] sm:text-[14px] font-semibold text-[#0E4A68] leading-none">
                    {formatPrice(lineTotal)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Footer: Subtotal & Total ─── */}
      <div className="p-3.5 sm:p-5 flex flex-col gap-3 bg-white">
        {/* Subtotal */}
        <div className="border-t border-[#888888]/30 pt-3 flex items-center justify-between text-[14.5px] sm:text-[15px]">
          <span className="font-medium text-[#0E4A68]">Subtotal :</span>
          <span className="font-medium text-[#0E4A68]">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between text-[14.5px] sm:text-[15px]">
          <span className="font-medium text-[#0E4A68]">Shipping :</span>
          {hasShipping ? (
            <span className="font-medium text-[#0E4A68]">
              {formatPrice(shippingAmount)}
            </span>
          ) : (
            <span className="font-normal text-[#64748B] text-xs sm:text-[13px]">
              Select area to calculate
            </span>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-[#888888]/30 pt-3 flex items-center justify-between text-[15.5px] sm:text-[16px]">
          <span className="font-bold text-[#0E4A68]">Total :</span>
          <span className="font-bold text-[#0E4A68]">
            {formatPrice(total)}
          </span>
        </div>

        {/* Proceed to Checkout CTA (Shown on Cart Review Step) */}
        {currentStep === "cart" && !isEmpty && onProceedToCheckout && (
          <button
            type="button"
            onClick={onProceedToCheckout}
            style={{
              backgroundColor: "#0E4A68",
              borderRadius: "5px",
            }}
            className="w-full mt-2 py-3 text-white font-poppins text-[14.5px] sm:text-[15px] font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.99] cursor-pointer"
          >
            Proceed to Checkout
          </button>
        )}

        {/* Place Order CTA (Shown on Checkout Step) */}
        {currentStep === "checkout" && !isEmpty && (
          <button
            type="submit"
            form="delivery-checkout-form"
            disabled={isSubmitting}
            style={{
              backgroundColor: "#0E4A68",
              borderRadius: "5px",
            }}
            className="w-full mt-2 py-3 text-white font-poppins text-[14.5px] sm:text-[15px] font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderSummaryCard;
