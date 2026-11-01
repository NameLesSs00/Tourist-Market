"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiArrowLeft, FiShoppingBag, FiTruck } from "react-icons/fi";
import { useCart } from "@/features/cart/useCart";
import { useCheckoutStore } from "@/features/cart/checkoutStore";
import { useCountriesQuery } from "@/features/countries/useCountryAdmin";
import { useActiveDeliveryProductsQuery } from "@/features/deliveryProducts/useDeliveryProducts";
import { createProductBooking } from "@/clientApi/productBookingApi";
import type { CreateProductBookingRequest } from "@/models/productBooking";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import {
  ProductsCartTable,
  OrderSummaryCard,
  ContactInfoCard,
  DeliveryInfoCard,
  EmptyCartState,
} from "../components";
import type { CartContactFormData, CartDeliveryFormData } from "../types";

interface ProductsCartSectionProps {
  locale?: string;
}

export function ProductsCartSection({
  locale = "en",
}: ProductsCartSectionProps) {
  const router = useRouter();
  const {
    isHydrated,
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  // Persistent checkout store: saves draft to browser localStorage
  const currentStep = useCheckoutStore((s) => s.currentStep);
  const setCurrentStep = useCheckoutStore((s) => s.setCurrentStep);
  const contactData = useCheckoutStore((s) => s.contactData);
  const deliveryData = useCheckoutStore((s) => s.deliveryData);
  const setContactField = useCheckoutStore((s) => s.setContactField);
  const setDeliveryField = useCheckoutStore((s) => s.setDeliveryField);
  const resetCheckoutDraft = useCheckoutStore((s) => s.resetCheckoutDraft);

  // Fetch active countries for contact selector & phone prefix
  const { data: countriesData, isLoading: isCountriesLoading } =
    useCountriesQuery(locale);

  // Fetch active delivery areas for delivery picker and live shipping pricing
  const { data: areasData, isLoading: isAreasLoading } =
    useActiveDeliveryProductsQuery(locale);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactChange = (
    field: keyof CartContactFormData,
    value: string
  ) => {
    setContactField(field, value);
  };

  const handleDeliveryChange = (
    field: keyof CartDeliveryFormData,
    value: string | boolean | number
  ) => {
    setDeliveryField(field, value);
  };

  const handleClearCart = () => {
    clearCart();
    resetCheckoutDraft();
  };

  // Compute live shipping fee based on selected hotel area or delivery product id
  const shippingFee = useMemo(() => {
    if (!deliveryData.hotelArea && !deliveryData.deliveryProductId) return 0;
    const areas = areasData?.items || [];
    const matched = areas.find((a) => {
      if (
        deliveryData.deliveryProductId &&
        a.id === deliveryData.deliveryProductId
      ) {
        return true;
      }
      return (
        deliveryData.hotelArea &&
        a.area.toLowerCase() === deliveryData.hotelArea.toLowerCase()
      );
    });
    if (matched) return Number(matched.priceUsd || 0);
    return 0;
  }, [deliveryData.hotelArea, deliveryData.deliveryProductId, areasData?.items]);

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items before proceeding.");
      return;
    }
    setCurrentStep("checkout");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!deliveryData.agreedToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    if (!contactData.name.trim() || !contactData.phoneNumber.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    if (!deliveryData.hotelName.trim() || !deliveryData.roomNumber.trim()) {
      toast.error("Please fill in your hotel name and room number.");
      return;
    }

    if (!deliveryData.hotelArea && !deliveryData.deliveryProductId) {
      toast.error("Please select a delivery area.");
      return;
    }

    if (!deliveryData.deliveryDate) {
      toast.error("Please pick a delivery date.");
      return;
    }

    if (!deliveryData.deliveryTime) {
      toast.error("Please pick a delivery time.");
      return;
    }

    setIsSubmitting(true);

    try {
      const areas = areasData?.items || [];
      const matchedArea = areas.find((a) => {
        if (
          deliveryData.deliveryProductId &&
          a.id === deliveryData.deliveryProductId
        ) {
          return true;
        }
        return (
          deliveryData.hotelArea &&
          a.area.toLowerCase() === deliveryData.hotelArea.toLowerCase()
        );
      });

      // Format ISO delivery date (e.g. "2026-11-05T12:00:00.000Z")
      let formattedDate: string | undefined = undefined;
      if (deliveryData.deliveryDate) {
        try {
          const d = new Date(deliveryData.deliveryDate);
          formattedDate = !isNaN(d.getTime()) ? d.toISOString() : undefined;
        } catch {
          // fallback
        }
      }

      // Format delivery time for ASP.NET TimeSpan deserializer (e.g. "14:30")
      let formattedTime = "12:00";
      if (deliveryData.deliveryTime) {
        const match = deliveryData.deliveryTime.match(/(\d{1,2}):(\d{2})/);
        if (match) {
          formattedTime = `${match[1].padStart(2, "0")}:${match[2]}`;
        }
      }

      const payload: CreateProductBookingRequest = {
        customerName: contactData.name.trim(),
        phoneNumber: contactData.phoneNumber.trim(),
        email: contactData.email.trim(),
        countryId: contactData.countryId || undefined,
        hotelName: deliveryData.hotelName.trim(),
        roomNo: deliveryData.roomNumber.trim(),
        deliveryProductId: matchedArea ? matchedArea.id : undefined,
        deliveryDate: formattedDate,
        deliveryTime: formattedTime,
        communicationMethod: contactData.communicationMethod || "WhatsApp",
        notes: deliveryData.notes?.trim() || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      };

      const result = await createProductBooking(payload);

      toast.success(
        "Thank you! Your order has been placed successfully. We will contact you shortly."
      );

      const confirmedData = {
        ...result,
        deliveryFeeUsd:
          result?.deliveryFeeUsd !== undefined && result?.deliveryFeeUsd !== null
            ? result.deliveryFeeUsd
            : shippingFee,
        deliveryArea: result?.deliveryArea || deliveryData.hotelArea,
        hotelName: result?.hotelName || deliveryData.hotelName,
        roomNo: result?.roomNo || deliveryData.roomNumber,
        customerName: result?.customerName || contactData.name,
        deliveryDate: result?.deliveryDate || deliveryData.deliveryDate,
        deliveryTime: result?.deliveryTime || deliveryData.deliveryTime,
        subtotalUsd: result?.subtotalUsd ?? subtotal,
        finalPriceUsd:
          result?.finalPriceUsd ?? subtotal + Number(shippingFee || 0),
        items:
          result?.items && result.items.length > 0
            ? result.items
            : items.map((i) => ({
                productId: i.productId,
                productTitle: i.title,
                productName: i.title,
                quantity: i.quantity,
                unitPriceUsd: i.price,
                lineTotalUsd: (i.price || 0) * i.quantity,
              })),
      };

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "last_product_booking",
            JSON.stringify(confirmedData)
          );
        } catch {
          // fallback
        }
      }

      clearCart();
      resetCheckoutDraft();

      const queryParams = new URLSearchParams();
      if (result?.bookingReference) {
        queryParams.set("ref", result.bookingReference);
      }
      if (shippingFee > 0) {
        queryParams.set("fee", shippingFee.toString());
      }
      if (deliveryData.hotelArea) {
        queryParams.set("area", deliveryData.hotelArea);
      }

      const queryString = queryParams.toString()
        ? `?${queryParams.toString()}`
        : "";
      router.push(`/${locale}/cart/thank-you${queryString}`);
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "There was an issue submitting your order. Please check your details and try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmpty = !isHydrated || items.length === 0;

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-8 sm:py-12 font-poppins">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ─── Page Title & Flow Step Badges ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="text-[28px] sm:text-[34px] md:text-[36px] font-semibold text-[#083952] tracking-tight">
              Products Cart
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              {currentStep === "cart"
                ? "Review items in your cart and proceed to checkout."
                : "Fill in guest details and delivery schedule to complete your booking."}
            </p>
          </div>

          {!isEmpty && (
            <div className="inline-flex items-center gap-2 p-1 bg-white rounded-full border border-[#888888]/40 shadow-2xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentStep("cart")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentStep === "cart"
                    ? "bg-[#0E4A68] text-white"
                    : "text-[#64748B] hover:text-[#0E4A68]"
                }`}
              >
                <FiShoppingBag size={13} />
                <span>1. Cart Items</span>
              </button>
              <span className="text-[#888888] text-xs">/</span>
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  currentStep === "checkout"
                    ? "bg-[#0E4A68] text-white"
                    : "text-[#64748B] hover:text-[#0E4A68]"
                }`}
              >
                <FiTruck size={13} />
                <span>2. Delivery Details</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── Main Two-Column Layout (Desktop First) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── Left Column (Table OR Checkout Forms) ─── */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8">
            {isEmpty ? (
              /* Empty Cart State */
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

                {/* Empty State Box */}
                <EmptyCartState locale={locale} />
              </div>
            ) : currentStep === "cart" ? (
              /* Step 1: Cart Items Table */
              <>
                <ProductsCartTable
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onClearCart={handleClearCart}
                />

                {/* Cart Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-white rounded-[8px] border border-[#888888]/40 shadow-xs">
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-xs sm:text-[13px] text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear Entire Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    style={{ backgroundColor: "#0E4A68" }}
                    className="w-full sm:w-auto px-7 py-3 text-white text-sm font-semibold rounded-[5px] shadow-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer text-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
              /* Step 2: Checkout Guest & Delivery Forms */
              <>
                {/* Back to Cart Bar */}
                <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-[8px] border border-[#888888]/40 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="inline-flex items-center gap-2 text-[#0E4A68] hover:text-[#146188] font-medium text-sm transition-colors cursor-pointer"
                  >
                    <FiArrowLeft size={16} />
                    <span>Back to Cart</span>
                  </button>
                  <span className="text-xs text-[#64748B] font-medium">
                    Step 2 of 2: Guest Details & Delivery
                  </span>
                </div>

                {/* 1. Contact Information Card */}
                <ContactInfoCard
                  formData={contactData}
                  onChange={handleContactChange}
                  countries={countriesData}
                  isCountriesLoading={isCountriesLoading}
                />

                {/* 2. Delivery Information Card */}
                <DeliveryInfoCard
                  formData={deliveryData}
                  onChange={handleDeliveryChange}
                  onSubmit={handleSubmitOrder}
                  isSubmitting={isSubmitting}
                  deliveryAreas={areasData?.items}
                  areasLoading={isAreasLoading}
                  locale={locale}
                />
              </>
            )}
          </div>

          {/* ─── Right Column (Order Summary Card) ─── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <OrderSummaryCard
              items={items}
              subtotal={subtotal}
              shipping={shippingFee}
              selectedAreaName={deliveryData.hotelArea}
              currentStep={currentStep}
              onProceedToCheckout={handleProceedToCheckout}
              isSubmitting={isSubmitting}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCartSection;
