"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/features/cart/useCart";

interface ProductDetailsBookingCardProps {
  productId?: number;
  itemTitle?: string;
  category?: string;
  available?: number;
  unitPrice?: number;
  unitName?: string;
  locale?: string;
}

export function ProductDetailsBookingCard({
  productId = 1,
  itemTitle = "Product",
  category = "Hotel Delivery",
  available = 99,
  unitPrice = 0,
  unitName = "Piece",
  locale = "en",
}: ProductDetailsBookingCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < available ? prev + 1 : prev));
  };

  const handleAddToCart = () => {
    addItem(
      {
        productId,
        title: itemTitle,
        price: unitPrice,
        unitName: displayUnit,
      },
      quantity
    );
  };

  const total = (quantity * unitPrice).toFixed(2);
  const displayUnit = unitName?.trim() || "Piece";

  return (
    <>
      <div
        className="w-full font-poppins select-none overflow-hidden transition-all shadow-sm"
        style={{
          background: "#FFFFFF",
          border: "0.5px solid #888888",
          borderRadius: "10px",
        }}
      >
        {/* ─── Top Header Banner ─── */}
        <div className="bg-[#0E4A68] text-white px-5 py-3 flex items-center gap-2.5">
          <FiShoppingCart size={18} className="text-white" />
          <span className="font-semibold text-[15px] tracking-wide">
            Order for Delivery
          </span>
        </div>

        {/* ─── Card Body ─── */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 text-[#0E4A68]">
          {/* Info Rows */}
          <div className="flex flex-col gap-3 text-[14px] sm:text-[15px]">
            {/* ITEM */}
            <div className="flex items-center justify-between">
              <span className="font-bold tracking-wider">ITEM</span>
              <span className="font-bold truncate max-w-[200px]" title={itemTitle}>
                {itemTitle}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between">
              <span className="font-bold">Category :</span>
              <span className="font-bold truncate max-w-[200px]">{category}</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="font-bold">Price :</span>
              <span className="font-bold">
                ${Number(unitPrice || 0).toFixed(2)} / {displayUnit}
              </span>
            </div>
          </div>

          {/* ─── Quality & Delivery Badges ─── */}
          <div className="grid grid-cols-2 gap-4 my-2 pt-2 border-t border-[#BBBBBB]/30">
            {/* Quality */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[12px] text-[#646464] mb-1.5 font-medium">
                Quality
              </span>
              <div className="relative w-10 h-10 mb-1">
                <Image
                  src="/Hoteldeliveries/product-details/Frame 585.svg"
                  alt="Quality guaranteed"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#0E4A68]">Fresh</span>
            </div>

            {/* Delivery */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[12px] text-[#646464] mb-1.5 font-medium">
                Delivery
              </span>
              <div className="relative w-10 h-10 mb-1">
                <Image
                  src="/Hoteldeliveries/product-details/Frame 585 (1).svg"
                  alt="Fast delivery"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#0E4A68]">
                Fast Delivery
              </span>
            </div>
          </div>

          {/* ─── Quantity Selector & Total ─── */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#BBBBBB]/30">
            <span className="text-[14px] font-bold text-[#0E4A68]">Quantity</span>

            <div className="flex items-center justify-between mt-1">
              {/* Stepper */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 rounded-full bg-[#0E4A68] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <FiMinus size={13} />
                </button>
                <span className="w-8 text-center font-bold text-[15px] text-[#0E4A68]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                  className="w-7 h-7 rounded-full bg-[#0E4A68] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  <FiPlus size={13} />
                </button>
                <span className="text-[13px] text-[#646464] ml-1">
                  {displayUnit}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-[#646464]">Total :</span>
                <span className="text-[18px] font-extrabold text-[#0E4A68]">
                  ${total}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Action Buttons ─── */}
          <div className="flex flex-col gap-2.5 mt-3">
            {/* Buy Now Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2.5 text-center text-white font-semibold text-[15px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
              style={{
                background: "#0E4A68",
                color: "#FFFFFF",
                border: "0.25px solid #000000",
                borderRadius: "10px",
              }}
            >
              Order Now
            </button>

            {/* Add to Cart / Delivery Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2.5 flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-[#0E4A68]/5 active:scale-[0.99] transition-all cursor-pointer"
              style={{
                background: "#FFFFFF",
                color: "#0E4A68",
                border: "1px solid #0E4A68",
                borderRadius: "10px",
              }}
            >
              <FiShoppingCart size={17} />
              <span>Book Delivery</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsBookingCard;
