"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";

interface ProductDetailsBookingCardProps {
  itemTitle?: string;
  category?: string;
  available?: number;
  unitPrice?: number;
  unitName?: string;
}

export function ProductDetailsBookingCard({
  itemTitle = "ANANAS-PINEAPPLES",
  category = "FRESH FRUITS",
  available = 199,
  unitPrice = 5,
  unitName = "PIECE",
}: ProductDetailsBookingCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => (prev < available ? prev + 1 : prev));
  };

  const total = (quantity * unitPrice).toFixed(2);

  return (
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
          Add to Cart
        </span>
      </div>

      {/* ─── Card Body ─── */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 text-[#0E4A68]">
        {/* Info Rows */}
        <div className="flex flex-col gap-3 text-[14px] sm:text-[15px]">
          {/* ITEM */}
          <div className="flex items-center justify-between">
            <span className="font-bold tracking-wider">ITEM</span>
            <span className="font-bold">{itemTitle}</span>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between">
            <span className="font-bold">Category :</span>
            <span className="font-bold">{category}</span>
          </div>

          {/* Available */}
          <div className="flex items-center justify-between">
            <span className="font-bold">Available :</span>
            <span className="font-bold">
              {available} {unitName}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="font-bold">Price :</span>
            <span className="font-bold">
              {unitPrice} $ / {unitName}
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
              <span className="text-[13px] text-[#646464] ml-1">Piece</span>
            </div>

            {/* Total */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#646464]">Total :</span>
              <span className="text-[18px] font-extrabold text-[#0E4A68]">
                {total} $
              </span>
            </div>
          </div>
        </div>

        {/* ─── Action Buttons ─── */}
        <div className="flex flex-col gap-2.5 mt-3">
          {/* Buy Now Button */}
          <button
            type="button"
            className="w-full py-2.5 text-center text-white font-semibold text-[15px] hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
            style={{
              background: "#0E4A68",
              color: "#FFFFFF",
              border: "0.25px solid #000000",
              borderRadius: "10px",
            }}
          >
            Buy Now
          </button>

          {/* Add to Cart Button */}
          <button
            type="button"
            className="w-full py-2.5 flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-[#0E4A68]/5 active:scale-[0.99] transition-all cursor-pointer"
            style={{
              background: "#FFFFFF",
              color: "#0E4A68",
              border: "1px solid #0E4A68",
              borderRadius: "10px",
            }}
          >
            <FiShoppingCart size={17} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsBookingCard;
