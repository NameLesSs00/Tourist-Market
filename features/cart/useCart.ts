"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "./cartStore";

export function useCart() {
  const [isHydrated, setIsHydrated] = useState(false);

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalCount = useCartStore((state) => state.getTotalCount);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalCount = isHydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const subtotal = isHydrated
    ? items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
    : 0;

  return {
    isHydrated,
    items: isHydrated ? items : [],
    totalCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalCount,
    getSubtotal,
  };
}

