"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FiCheck,
  FiPackage,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiTruck,
  FiShoppingBag,
  FiHome,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { ProductBookingItem } from "@/models/productBooking";

interface CartThankYouSectionProps {
  locale?: string;
}

export function CartThankYouSection({ locale = "en" }: CartThankYouSectionProps) {
  const searchParams = useSearchParams();
  const queryRef = searchParams.get("ref") || "";
  const queryFee = searchParams.get("fee");
  const queryArea = searchParams.get("area") || "";

  const [booking, setBooking] = useState<ProductBookingItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = sessionStorage.getItem("last_product_booking");
        if (raw) {
          const parsed = JSON.parse(raw);
          setBooking(parsed);
        }
      } catch {
        // Fallback to query param
      }
    }
  }, []);

  const bookingReference = booking?.bookingReference || queryRef || "PENDING";
  const customerName = booking?.customerName || "";
  const hotelDisplay = booking?.hotelName
    ? `${booking.hotelName}${booking.roomNo ? ` (Room ${booking.roomNo})` : ""}`
    : "";
  const areaDisplay = booking?.deliveryArea || queryArea || "";
  const dateDisplay = booking?.deliveryDate
    ? new Date(booking.deliveryDate).toLocaleDateString(locale, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const timeDisplay = booking?.deliveryTime || "";

  const deliveryFee =
    booking?.deliveryFeeUsd !== undefined && booking?.deliveryFeeUsd !== null
      ? Number(booking.deliveryFeeUsd)
      : queryFee !== null && queryFee !== undefined && queryFee !== ""
      ? Number(queryFee)
      : null;

  const finalPrice = booking?.finalPriceUsd ?? null;
  const subtotal =
    booking?.subtotalUsd ??
    (finalPrice !== null && deliveryFee !== null
      ? finalPrice - deliveryFee
      : null);
  const items = booking?.items || [];

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-10 sm:py-16 font-poppins">
      <div className="mx-auto w-full max-w-[900px] px-4 sm:px-6 lg:px-8">
        {/* Main Confirmation Card */}
        <div
          style={{
            border: "0.5px solid #888888",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
          }}
          className="p-6 sm:p-10 shadow-sm"
        >
          {/* Header with Success Checkmark */}
          <div className="text-center pb-8 border-b border-[#E5E5E5]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#16A34A]/10 text-[#16A34A] mx-auto flex items-center justify-center mb-4">
              <FiCheck size={36} />
            </div>

            <h1 className="text-[26px] sm:text-[34px] font-bold text-[#083952] tracking-tight leading-tight">
              Thank You for Your Booking!
            </h1>
            <p className="text-[14px] sm:text-[16px] text-[#64748B] mt-2 max-w-xl mx-auto">
              We have received your order and our team is preparing it for delivery to your hotel.
            </p>
          </div>

          {/* Reference & Financial Breakdown Banner */}
          <div className="my-6 p-4 sm:p-6 rounded-[10px] bg-[#FFF8ED] border border-[#DE7423]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#DE7423]/20 pb-4">
              <div>
                <span className="text-xs text-[#646464] font-medium uppercase tracking-wider block">
                  Booking Reference
                </span>
                <span className="text-lg sm:text-2xl font-bold text-[#0E4A68] tracking-wide">
                  {bookingReference}
                </span>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#16A34A]/15 text-[#16A34A]">
                    Confirmed
                  </span>
                  {finalPrice !== null && (
                    <span className="text-lg sm:text-2xl font-bold text-[#0E4A68]">
                      ${Number(finalPrice).toFixed(2)} USD
                    </span>
                  )}
                </div>
                {deliveryFee !== null && (
                  <span className="text-xs text-[#64748B] mt-0.5">
                    Includes ${Number(deliveryFee).toFixed(2)} delivery
                  </span>
                )}
              </div>
            </div>

            {/* Structured Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs sm:text-sm text-[#0E4A68]">
              {customerName && (
                <div className="flex items-center gap-2.5">
                  <FiUser className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Guest:</strong> {customerName}
                  </span>
                </div>
              )}

              {hotelDisplay && (
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Hotel:</strong> {hotelDisplay}
                  </span>
                </div>
              )}

              {areaDisplay && (
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Area:</strong> {areaDisplay}
                  </span>
                </div>
              )}

              {deliveryFee !== null && (
                <div className="flex items-center gap-2.5">
                  <FiTruck className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Delivery Price:</strong>{" "}
                    <span className="font-bold text-[#0E4A68]">
                      ${Number(deliveryFee).toFixed(2)} USD
                    </span>
                  </span>
                </div>
              )}

              {(dateDisplay || timeDisplay) && (
                <div className="flex items-center gap-2.5">
                  <FiCalendar className="text-[#DE7423] shrink-0" size={16} />
                  <span>
                    <strong className="font-semibold">Delivery Time:</strong>{" "}
                    {dateDisplay} {timeDisplay ? `at ${timeDisplay}` : ""}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <FiPackage className="text-[#DE7423] shrink-0" size={16} />
                <span>
                  <strong className="font-semibold">Payment:</strong> Cash on Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Ordered Line Items (if present in session) */}
          {items.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[16px] font-semibold text-[#0E4A68] mb-3">
                Ordered Products
              </h3>
              <div className="rounded-[8px] border border-[#CBD5E1] divide-y divide-[#CBD5E1] overflow-hidden">
                {items.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 flex items-center justify-between text-xs sm:text-sm bg-white"
                  >
                    <div>
                      <div className="font-semibold text-[#083952]">
                        {line.productTitle || line.productName || `Product #${line.productId}`}
                      </div>
                      <div className="text-[#64748B] text-xs mt-0.5">
                        Qty: {line.quantity} × ${Number(line.unitPriceUsd || 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="font-bold text-[#0E4A68]">
                      ${Number(line.lineTotalUsd || 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Breakdown Summary Box */}
          <div className="mb-6 p-4 sm:p-5 rounded-[10px] bg-[#F8FAFC] border border-[#CBD5E1] space-y-2.5">
            <h4 className="text-[14px] font-bold text-[#083952] mb-1">
              Order Pricing Summary
            </h4>

            {subtotal !== null && (
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#475569]">
                <span>Products Subtotal</span>
                <span className="font-medium text-[#083952]">
                  ${Number(subtotal).toFixed(2)} USD
                </span>
              </div>
            )}

            {deliveryFee !== null && (
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#475569]">
                <span className="flex items-center gap-1.5">
                  <FiTruck size={15} className="text-[#DE7423]" />
                  <span>
                    Delivery Shipping {areaDisplay ? `(${areaDisplay})` : ""}
                  </span>
                </span>
                <span className="font-medium text-[#0E4A68]">
                  ${Number(deliveryFee).toFixed(2)} USD
                </span>
              </div>
            )}

            {finalPrice !== null && (
              <div className="border-t border-[#CBD5E1] pt-2.5 flex items-center justify-between text-sm sm:text-base font-bold text-[#0E4A68]">
                <span>Total Due on Delivery</span>
                <span className="text-lg text-[#16A34A]">
                  ${Number(finalPrice).toFixed(2)} USD
                </span>
              </div>
            )}
          </div>

          {/* WhatsApp Support Notice */}
          <div className="p-4 sm:p-5 rounded-[10px] bg-[#25D366]/10 border border-[#25D366]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <FaWhatsapp size={22} />
              </div>
              <div>
                <h4 className="font-bold text-[15px] text-[#083952]">
                  Need Assistance or Delivery Updates?
                </h4>
                <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                  Our customer service team is available 24/7 on WhatsApp to assist with your order.
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/201036234030?text=${encodeURIComponent(
                `Hello, I would like to inquire about my booking reference ${bookingReference}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <FaWhatsapp size={16} />
              <span>Contact on WhatsApp</span>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#E5E5E5]">
            <Link
              href={`/${locale}/hotel-deliveries`}
              style={{ backgroundColor: "#0E4A68" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[6px] text-white text-sm font-semibold shadow-sm hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer text-center"
            >
              <FiShoppingBag size={16} />
              <span>Continue Shopping</span>
            </Link>

            <Link
              href={`/${locale}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[6px] border border-[#0E4A68] text-[#0E4A68] hover:bg-[#0E4A68]/5 text-sm font-semibold transition-colors cursor-pointer text-center"
            >
              <FiHome size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartThankYouSection;
