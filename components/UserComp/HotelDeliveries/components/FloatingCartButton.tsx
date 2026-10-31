"use client";

import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import { useCart } from "@/features/cart/useCart";

interface FloatingCartButtonProps {
  className?: string;
}

export function FloatingCartButton({ className = "" }: FloatingCartButtonProps) {
  const { isHydrated, totalCount, subtotal } = useCart();
  const [bounced, setBounced] = useState(false);

  // Trigger brief bounce animation whenever count increments
  useEffect(() => {
    if (totalCount > 0) {
      setBounced(true);
      const timer = setTimeout(() => setBounced(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  if (!isHydrated) return null;

  const handleClick = () => {
    if (totalCount === 0) {
      toast.info("Your cart is currently empty.");
      return;
    }
    toast.info(
      `Cart contains ${totalCount} item${totalCount > 1 ? "s" : ""} · Subtotal: $${subtotal.toFixed(2)}`
    );
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 select-none ${className}`}
      dir="ltr"
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Shopping cart with ${totalCount} items`}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D48C28] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#B8741D] hover:shadow-2xl active:scale-95 cursor-pointer ring-2 ring-white/90 ${
          bounced ? "scale-110" : "scale-100"
        }`}
      >
        {/* Shopping Cart Icon */}
        <FiShoppingCart className="h-6 w-6 text-white transition-transform group-hover:scale-110 drop-shadow-sm" />

        {/* Live Counter Badge */}
        {totalCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#0E4A68] px-1.5 text-xs font-bold text-white shadow-md ring-2 ring-white animate-in zoom-in-75 duration-200">
            {totalCount > 99 ? "99+" : totalCount}
          </span>
        )}
      </button>
    </div>
  );
}

export default FloatingCartButton;
