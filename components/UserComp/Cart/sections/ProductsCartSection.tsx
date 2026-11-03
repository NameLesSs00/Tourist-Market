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
import { isValidEmail, isValidPhoneNumber } from "@/shared/utils/phoneUtils";
import { getDictionary } from "@/shared/utils/getDictionary";
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
  const dict = getDictionary(locale);
  const tPage = dict.cartPage.page;
  const tToasts = dict.cartPage.toasts;
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
      toast.error(tToasts.emptyCartProceed);
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
      toast.error(tToasts.emptyCart);
      return;
    }

    if (!deliveryData.agreedToTerms) {
      toast.error(tToasts.agreeTerms);
      return;
    }

    if (!contactData.name.trim() || contactData.name.trim().length < 2) {
      toast.error(tToasts.nameRequired);
      return;
    }

    if (!contactData.phoneNumber.trim()) {
      toast.error(tToasts.phoneRequired);
      return;
    }

    if (!isValidPhoneNumber(contactData.phoneNumber)) {
      toast.error(tToasts.phoneInvalid);
      return;
    }

    if (contactData.email && !isValidEmail(contactData.email)) {
      toast.error(tToasts.emailInvalid);
      return;
    }

    if (!deliveryData.hotelName.trim() || !deliveryData.roomNumber.trim()) {
      toast.error(tToasts.hotelRoomRequired);
      return;
    }

    if (!deliveryData.hotelArea && !deliveryData.deliveryProductId) {
      toast.error(tToasts.areaRequired);
      return;
    }

    if (!deliveryData.deliveryDate) {
      toast.error(tToasts.dateRequired);
      return;
    }

    if (!deliveryData.deliveryTime) {
      toast.error(tToasts.timeRequired);
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

      toast.success(tToasts.orderSuccess);

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
        extractErrorMessage(err, tToasts.orderError)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmpty = !isHydrated || items.length === 0;

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-10 md:py-12 font-poppins">
      <div className="mx-auto w-full max-w-[1360px] px-3.5 sm:px-6 lg:px-8">
        {/* ─── Page Title & Flow Step Badges ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 mb-6 sm:mb-8">
          <div>
            <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#083952] tracking-tight">
              {tPage.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              {currentStep === "cart"
                ? tPage.subtitleCart
                : tPage.subtitleCheckout}
            </p>
          </div>

          {!isEmpty && (
            <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1 bg-white rounded-full border border-[#888888]/40 shadow-2xs self-start sm:self-auto flex-wrap">
              <button
                type="button"
                onClick={() => setCurrentStep("cart")}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  currentStep === "cart"
                    ? "bg-[#0E4A68] text-white"
                    : "text-[#64748B] hover:text-[#0E4A68]"
                }`}
              >
                <FiShoppingBag size={13} />
                <span>{tPage.stepCart}</span>
              </button>
              <span className="text-[#888888] text-xs">/</span>
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  currentStep === "checkout"
                    ? "bg-[#0E4A68] text-white"
                    : "text-[#64748B] hover:text-[#0E4A68]"
                }`}
              >
                <FiTruck size={13} />
                <span>{tPage.stepDelivery}</span>
              </button>
            </div>
          )}
        </div>

        {/* ─── Main Two-Column Layout (Desktop First) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* ─── Left Column (Table OR Checkout Forms) ─── */}
          <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6 md:gap-8">
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
                {/* Desktop Table Header (hidden on mobile) */}
                <div
                  style={{
                    backgroundColor: "#0E4A68",
                    borderBottom: "1px solid #888888",
                  }}
                  className="hidden md:grid grid-cols-12 py-3.5 px-6 text-white text-[14px] font-semibold tracking-wider uppercase select-none items-center"
                >
                  <div className="col-span-5 text-left">{tPage.headers.product}</div>
                  <div className="col-span-2 text-center">{tPage.headers.price}</div>
                  <div className="col-span-2 text-center">{tPage.headers.quantity}</div>
                  <div className="col-span-2 text-center">{tPage.headers.total}</div>
                  <div className="col-span-1 text-center">{tPage.headers.action}</div>
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
                  locale={locale}
                />

                {/* Unified Cart Action Bar */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 p-3.5 sm:p-4 bg-white rounded-[8px] border border-[#888888]/40 shadow-xs">
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="w-full sm:w-auto text-center py-2 text-xs sm:text-[13px] text-gray-500 hover:text-red-600 transition-colors cursor-pointer font-medium"
                  >
                    {tPage.clearEntireCart}
                  </button>
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    style={{ backgroundColor: "#0E4A68" }}
                    className="w-full sm:w-auto px-7 py-3 text-white text-sm font-semibold rounded-[5px] shadow-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer text-center"
                  >
                    {tPage.proceedToCheckout}
                  </button>
                </div>
              </>
            ) : (
              /* Step 2: Checkout Guest & Delivery Forms */
              <>
                {/* Back to Cart Bar */}
                <div className="flex items-center justify-between bg-white px-4 sm:px-5 py-3.5 rounded-[8px] border border-[#888888]/40 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="inline-flex items-center gap-2 text-[#0E4A68] hover:text-[#146188] font-medium text-sm transition-colors cursor-pointer"
                  >
                    <FiArrowLeft size={16} />
                    <span>{tPage.backToCart}</span>
                  </button>
                  <span className="text-xs text-[#64748B] font-medium">
                    {tPage.stepOf}
                  </span>
                </div>

                {/* 1. Contact Information Card */}
                <ContactInfoCard
                  formData={contactData}
                  onChange={handleContactChange}
                  countries={countriesData}
                  isCountriesLoading={isCountriesLoading}
                  locale={locale}
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
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCartSection;
