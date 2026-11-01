"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import type { CartItem } from "@/models/cart";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const DEFAULT_PRODUCT_IMAGE = "/GroupExcursions/HeroLogo.webp";

function CartItemThumbnail({ image, title }: { image?: string; title: string }) {
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
      className={`object-contain p-1 transition-opacity ${hasError ? "opacity-60" : ""}`}
      sizes="76px"
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

interface ProductsCartTableProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export function ProductsCartTable({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: ProductsCartTableProps) {
  return (
    <div className="w-full font-poppins flex flex-col gap-4">
      {/* ─── Table Container ─── */}
      <div
        style={{
          border: "1px solid #888888",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
        className="w-full"
      >
        {/* Table Header */}
        <div
          style={{
            backgroundColor: "#0E4A68",
            borderBottom: "1px solid #888888",
          }}
          className="grid grid-cols-12 py-3.5 px-6 text-white text-[14px] font-semibold tracking-wider uppercase select-none items-center"
        >
          <div className="col-span-5 text-left">PRODUCT</div>
          <div className="col-span-2 text-center">PRICE</div>
          <div className="col-span-2 text-center">QUANTITY</div>
          <div className="col-span-2 text-center">TOTAL</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>

        {/* Product Rows */}
        <div className="divide-y divide-[#888888]/40">
          {items.map((item) => {
            const lineTotal = (item.price || 0) * item.quantity;

            return (
              <div
                key={item.productId}
                style={{
                  borderTop: "0.6px solid #888888",
                }}
                className="grid grid-cols-12 py-4 px-6 items-center bg-white hover:bg-slate-50/50 transition-colors"
              >
                {/* 1. PRODUCT (Image + Title) */}
                <div className="col-span-5 flex items-center gap-4 text-left">
                  <div
                    style={{
                      border: "0.6px solid #888888",
                      borderRadius: "4px",
                      backgroundColor: "#FFFFF2",
                    }}
                    className="relative w-[76px] h-[76px] shrink-0 p-1 flex items-center justify-center overflow-hidden"
                  >
                    <CartItemThumbnail image={item.image} title={item.title} />
                  </div>
                  <h4 className="font-poppins text-[15px] font-medium text-[#146188] uppercase leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                {/* 2. PRICE */}
                <div className="col-span-2 text-center font-poppins text-[16px] font-semibold text-[#0E4A68]">
                  {(item.price || 0).toFixed(2)} $
                </div>

                {/* 3. QUANTITY CONTROLLER */}
                <div className="col-span-2 flex items-center justify-center">
                  <div
                    style={{
                      border: "0.3px solid #888888",
                      borderRadius: "3px",
                      backgroundColor: "#FFFFFF",
                    }}
                    className="inline-flex items-center gap-2 p-1.5"
                  >
                    {/* Minus Button */}
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.productId, item.quantity - 1)
                      }
                      style={{
                        border: "1.6px solid #0E4A68",
                        boxShadow: "0px 2px 5px 0px #00000033",
                        borderRadius: "50%",
                      }}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                    >
                      <FiMinus size={11} className="stroke-[3]" />
                    </button>

                    {/* Quantity Display */}
                    <span className="min-w-[26px] text-center font-poppins text-[15px] font-semibold text-[#0E4A68]">
                      {item.quantity}
                    </span>

                    {/* Plus Button */}
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.productId, item.quantity + 1)
                      }
                      style={{
                        border: "1.6px solid #0E4A68",
                        boxShadow: "0px 2px 5px 0px #00000033",
                        borderRadius: "50%",
                      }}
                      aria-label="Increase quantity"
                      className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                    >
                      <FiPlus size={11} className="stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* 4. TOTAL */}
                <div className="col-span-2 text-center font-poppins text-[16px] font-semibold text-[#0E4A68]">
                  {lineTotal.toFixed(2)} $
                </div>

                {/* 5. ACTION (Remove Icon) */}
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.productId)}
                    aria-label={`Remove ${item.title} from cart`}
                    className="transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Image
                      src="/remove.svg"
                      alt="Remove"
                      width={31}
                      height={31}
                      className="w-[30px] h-[30px]"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Clear Cart Button (Aligned Right Below Table) ─── */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClearCart}
          style={{
            backgroundColor: "#0E4A68",
            border: "0.25px solid #000000",
            borderRadius: "5px",
          }}
          className="px-6 py-2.5 text-white font-poppins text-[14px] font-medium shadow-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] cursor-pointer"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default ProductsCartTable;
