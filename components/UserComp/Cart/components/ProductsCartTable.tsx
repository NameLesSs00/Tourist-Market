"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import type { CartItem } from "@/models/cart";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { useCurrencyFormat } from "@/features/currencies/useFormattedPrice";
import { getDictionary } from "@/shared/utils/getDictionary";

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
  onClearCart?: () => void;
  locale?: string;
}

export function ProductsCartTable({
  items,
  onUpdateQuantity,
  onRemoveItem,
  locale = "en",
}: ProductsCartTableProps) {
  const formatPrice = useCurrencyFormat();
  const dict = getDictionary(locale);
  const t = dict.cartPage.table;
  const tHeaders = dict.cartPage.page.headers;

  return (
    <div className="w-full font-poppins flex flex-col gap-4">
      {/* Desktop & Tablet View (md and up) */}
      <div className="hidden md:block w-full rounded-lg border border-[#888888] bg-white overflow-hidden shadow-2xs">
        <div className="grid grid-cols-12 py-3 px-6 bg-[#0E4A68] text-white font-poppins text-xs font-bold tracking-wider">
          <div className="col-span-5 text-left">{tHeaders.product}</div>
          <div className="col-span-2 text-center">{tHeaders.price}</div>
          <div className="col-span-2 text-center">{tHeaders.quantity}</div>
          <div className="col-span-2 text-center">{tHeaders.total}</div>
          <div className="col-span-1 text-center">{tHeaders.action}</div>
        </div>

        <div className="divide-y divide-[#888888]/40">
          {items.map((item) => {
            const lineTotal = (item.price || 0) * item.quantity;

            return (
              <div
                key={item.productId}
                className="grid grid-cols-12 py-4 px-6 items-center bg-white hover:bg-slate-50/50 transition-colors border-t border-[#888888]"
              >
                {/* 1. PRODUCT */}
                <div className="col-span-5 flex items-center gap-4 text-left">
                  <div className="relative w-[76px] h-[76px] shrink-0 p-1 flex items-center justify-center overflow-hidden rounded border border-[#888888] bg-[#FFFFF2]">
                    <CartItemThumbnail image={item.image} title={item.title} />
                  </div>
                  <h4 className="font-poppins text-[15px] font-medium text-[#146188] uppercase leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                {/* 2. PRICE */}
                <div className="col-span-2 text-center font-poppins text-[16px] font-semibold text-[#0E4A68]">
                  {formatPrice(item.price || 0)}
                </div>

                {/* 3. QUANTITY */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 p-1.5 rounded border border-[#888888] bg-white">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                      style={{ border: "1.6px solid #0E4A68", borderRadius: "50%" }}
                      aria-label={t.ariaDecrease}
                      className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                    >
                      <FiMinus size={11} className="stroke-[3]" />
                    </button>
                    <span className="min-w-[26px] text-center font-poppins text-[15px] font-semibold text-[#0E4A68]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                      style={{ border: "1.6px solid #0E4A68", borderRadius: "50%" }}
                      aria-label={t.ariaIncrease}
                      className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                    >
                      <FiPlus size={11} className="stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* 4. TOTAL */}
                <div className="col-span-2 text-center font-poppins text-[16px] font-semibold text-[#0E4A68]">
                  {formatPrice(lineTotal)}
                </div>

                {/* 5. ACTION */}
                <div className="col-span-1 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.productId)}
                    aria-label={t.ariaRemove.replace("{title}", item.title)}
                    className="transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Image src="/remove.svg" alt={t.removeAlt} width={30} height={30} className="w-[30px] h-[30px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Cards View (below md) */}
      <div className="flex md:hidden flex-col gap-3 w-full">
        {items.map((item) => {
          const lineTotal = (item.price || 0) * item.quantity;

          return (
            <div
              key={item.productId}
              className="p-3.5 flex flex-col gap-3 rounded-xl border border-[#888888] bg-white shadow-2xs"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-[70px] h-[70px] shrink-0 p-1 flex items-center justify-center overflow-hidden rounded-md border border-[#888888] bg-[#FFFFF2]">
                  <CartItemThumbnail image={item.image} title={item.title} />
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-poppins text-[14.5px] font-semibold text-[#146188] uppercase leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="mt-1 text-xs text-[#64748B] font-medium">
                    {t.priceLabel} <span className="font-semibold text-[#0E4A68]">{formatPrice(item.price || 0)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveItem(item.productId)}
                  aria-label={t.ariaRemove.replace("{title}", item.title)}
                  className="shrink-0 p-1 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Image src="/remove.svg" alt={t.removeAlt} width={26} height={26} className="w-[26px] h-[26px]" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-[#888888] bg-white">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                    style={{ border: "1.6px solid #0E4A68", borderRadius: "50%" }}
                    aria-label={t.ariaDecrease}
                    className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                  >
                    <FiMinus size={11} className="stroke-[3]" />
                  </button>
                  <span className="min-w-[24px] text-center font-poppins text-[14px] font-semibold text-[#0E4A68]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    style={{ border: "1.6px solid #0E4A68", borderRadius: "50%" }}
                    aria-label={t.ariaIncrease}
                    className="w-6 h-6 flex items-center justify-center text-[#0E4A68] hover:bg-[#0E4A68]/10 active:scale-95 transition-all cursor-pointer bg-white"
                  >
                    <FiPlus size={11} className="stroke-[3]" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#64748B] block font-medium">{t.totalLabel}</span>
                  <span className="font-poppins text-[15.5px] font-bold text-[#0E4A68]">
                    {formatPrice(lineTotal)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsCartTable;
