import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartContactFormData, CartDeliveryFormData } from "@/components/UserComp/Cart/types";

export const INITIAL_CONTACT_DATA: CartContactFormData = {
  name: "",
  email: "",
  country: "",
  countryId: "",
  phoneNumber: "",
  communicationMethod: "WhatsApp",
};

export const INITIAL_DELIVERY_DATA: CartDeliveryFormData = {
  hotelName: "",
  roomNumber: "",
  hotelArea: "",
  deliveryProductId: undefined,
  deliveryDate: "",
  deliveryTime: "",
  notes: "",
  agreedToTerms: false,
};

export interface CheckoutStoreState {
  currentStep: "cart" | "checkout";
  contactData: CartContactFormData;
  deliveryData: CartDeliveryFormData;
  setCurrentStep: (step: "cart" | "checkout") => void;
  setContactField: (field: keyof CartContactFormData, value: string) => void;
  setDeliveryField: (
    field: keyof CartDeliveryFormData,
    value: string | boolean | number
  ) => void;
  resetCheckoutDraft: () => void;
}

export const useCheckoutStore = create<CheckoutStoreState>()(
  persist(
    (set) => ({
      currentStep: "cart",
      contactData: INITIAL_CONTACT_DATA,
      deliveryData: INITIAL_DELIVERY_DATA,

      setCurrentStep: (currentStep) => set({ currentStep }),

      setContactField: (field, value) =>
        set((state) => ({
          contactData: { ...state.contactData, [field]: value },
        })),

      setDeliveryField: (field, value) =>
        set((state) => ({
          deliveryData: { ...state.deliveryData, [field]: value },
        })),

      resetCheckoutDraft: () =>
        set({
          currentStep: "cart",
          contactData: INITIAL_CONTACT_DATA,
          deliveryData: INITIAL_DELIVERY_DATA,
        }),
    }),
    {
      name: "tourist_market_checkout_draft",
    }
  )
);

