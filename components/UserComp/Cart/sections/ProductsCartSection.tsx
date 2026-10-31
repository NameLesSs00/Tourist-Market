"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/features/cart/useCart";
import { createProductBooking } from "@/clientApi/productBookingApi";
import type { CreateProductBookingRequest } from "@/models/productBooking";
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
  const {
    isHydrated,
    items,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contactData, setContactData] = useState<CartContactFormData>({
    name: "",
    email: "",
    country: "",
    phoneNumber: "",
    communicationMethod: "",
  });

  const [deliveryData, setDeliveryData] = useState<CartDeliveryFormData>({
    hotelName: "",
    roomNumber: "",
    hotelArea: "",
    deliveryDate: "",
    deliveryTime: "",
    notes: "",
    agreedToTerms: false,
  });

  const handleContactChange = (
    field: keyof CartContactFormData,
    value: string
  ) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryChange = (
    field: keyof CartDeliveryFormData,
    value: string | boolean
  ) => {
    setDeliveryData((prev) => ({ ...prev, [field]: value }));
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

    setIsSubmitting(true);

    try {
      const payload: CreateProductBookingRequest = {
        customerName: contactData.name,
        phoneNumber: contactData.phoneNumber,
        email: contactData.email,
        hotelName: deliveryData.hotelName,
        address: `Room ${deliveryData.roomNumber}, ${deliveryData.hotelArea}. Preferred contact: ${contactData.communicationMethod}. Delivery: ${deliveryData.deliveryDate} (${deliveryData.deliveryTime})`,
        notes: deliveryData.notes || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      };

      await createProductBooking(payload);

      toast.success(
        "Thank you! Your order has been placed successfully. We will contact you shortly."
      );
      clearCart();

      // Reset form
      setContactData({
        name: "",
        email: "",
        country: "",
        phoneNumber: "",
        communicationMethod: "",
      });
      setDeliveryData({
        hotelName: "",
        roomNumber: "",
        hotelArea: "",
        deliveryDate: "",
        deliveryTime: "",
        notes: "",
        agreedToTerms: false,
      });
    } catch {
      toast.error(
        "There was an issue submitting your order. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmpty = !isHydrated || items.length === 0;

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-8 sm:py-12 font-poppins">
      <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* ─── Page Title ─── */}
        <h1 className="text-[28px] sm:text-[34px] md:text-[36px] font-semibold text-[#083952] mb-6 sm:mb-8 tracking-tight">
          Products Cart
        </h1>

        {/* ─── Main Two-Column Layout (Desktop First) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ─── Left Column (Table & Checkout Forms) ─── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
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
                {/* Table Header Header */}
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
            ) : (
              /* Cart with Items */
              <>
                {/* 1. Products Table */}
                <ProductsCartTable
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                  onClearCart={clearCart}
                />

                {/* 2. Contact Information Card */}
                <ContactInfoCard
                  formData={contactData}
                  onChange={handleContactChange}
                />

                {/* 3. Delivery Information Card */}
                <DeliveryInfoCard
                  formData={deliveryData}
                  onChange={handleDeliveryChange}
                  onSubmit={handleSubmitOrder}
                  isSubmitting={isSubmitting}
                />
              </>
            )}
          </div>

          {/* ─── Right Column (Order Summary Card) ─── */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <OrderSummaryCard
              items={items}
              subtotal={subtotal}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCartSection;

