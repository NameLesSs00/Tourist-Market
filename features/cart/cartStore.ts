import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type { CartItem, CartStoreState } from "@/models/cart";

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantityToAdd = 1) => {
        if (quantityToAdd <= 0) return;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            updated[existingIndex] = {
              ...currentItem,
              quantity: currentItem.quantity + quantityToAdd,
            };
            return { items: updated };
          }

          return {
            items: [...state.items, { ...item, quantity: quantityToAdd }],
          };
        });

        const label = item.title ? `"${item.title}"` : "Item";
        toast.success(`Added ${label} to your cart.`);
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: newQuantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalCount: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce(
          (sum, item) => sum + (item.price || 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: "tourist_market_cart",
    }
  )
);

