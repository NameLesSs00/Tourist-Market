"use client";

import React, { useState } from "react";
import {
  FiCheck,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiSlash,
  FiUser,
} from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { BookingStatus, type ProductBookingItem } from "@/models/productBooking";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface ProductBookingDetailPanelProps {
  open: boolean;
  onClose: () => void;
  booking: ProductBookingItem | null;
  onStatusChange: (bookingId: string, status: BookingStatus) => Promise<void>;
  onCancelBooking: (booking: ProductBookingItem) => void;
  isActionLoading?: boolean;
}

export function ProductBookingDetailPanel({
  open,
  onClose,
  booking,
  onStatusChange,
  onCancelBooking,
  isActionLoading,
}: ProductBookingDetailPanelProps) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  if (!booking) return null;

  const handleUpdateStatus = async (status: BookingStatus) => {
    setUpdatingStatus(true);
    try {
      await onStatusChange(booking.bookingId, status);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const curr = booking.currency || "USD";
  const dateFormatted = booking.bookingDate
    ? new Date(booking.bookingDate).toLocaleString()
    : "—";

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Product Booking Details"
      subtitle={`Reference #${booking.bookingReference}`}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-4 text-sm">
        {/* Header summary */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Booking Reference</span>
            <p className="font-bold text-[#0E4A68] text-base">{booking.bookingReference}</p>
            <span className="text-[11px] text-gray-400">{dateFormatted}</span>
          </div>
          <BookingStatusBadge status={booking.status} statusName={booking.statusName} />
        </div>

        {/* Customer Information */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiUser className="h-3.5 w-3.5 text-[#0E4A68]" /> Customer Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Name:</span> <span className="font-medium text-gray-800">{booking.customerName || "—"}</span>
            </div>
            <div>
              <span className="text-gray-400">Phone:</span>{" "}
              <a href={`tel:${booking.phoneNumber}`} className="text-[#0E4A68] hover:underline font-medium">
                {booking.phoneNumber || "—"}
              </a>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-400">Email:</span>{" "}
              <a href={`mailto:${booking.email}`} className="text-[#0E4A68] hover:underline font-medium">
                {booking.email || "—"}
              </a>
            </div>
          </div>
        </div>

        {/* Delivery / Hotel */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiMapPin className="h-3.5 w-3.5 text-[#0E4A68]" /> Delivery & Location
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-400">Hotel:</span> <span className="font-medium text-gray-800">{booking.hotelName || "—"}</span>
            </div>
            <div>
              <span className="text-gray-400">Address:</span> <span className="font-medium text-gray-800">{booking.address || "—"}</span>
            </div>
            {booking.notes && (
              <div className="sm:col-span-2 rounded-lg bg-amber-50/70 p-2 border border-amber-100 text-xs">
                <span className="font-semibold text-amber-800">Notes:</span> {booking.notes}
              </div>
            )}
          </div>
        </div>

        {/* Ordered Items Breakdown */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiPackage className="h-3.5 w-3.5 text-[#0E4A68]" /> Ordered Items ({booking.items?.length ?? 0})
          </h4>
          <div className="divide-y divide-gray-100">
            {(booking.items ?? []).map((item) => (
              <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-gray-800">{item.productTitle || item.productName}</p>
                  <p className="text-gray-400">Qty: {item.quantity} × ${item.unitPriceUsd}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${item.lineTotalUsd}</p>
                  {item.discountAmountUsd > 0 && <span className="text-[10px] text-emerald-600">-${item.discountAmountUsd} off</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-2 space-y-1 text-xs">
            <div className="flex justify-between text-gray-500"><span>Subtotal:</span><span>${booking.subtotalUsd}</span></div>
            {booking.discountAmountUsd > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium"><span>Discount:</span><span>-${booking.discountAmountUsd}</span></div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#0E4A68] pt-1">
              <span>Total Price:</span><span>{curr} {booking.displayFinalPrice ?? booking.finalPriceUsd}</span>
            </div>
          </div>
        </div>

        {/* Status Actions */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Booking Status Actions</h4>
          <div className="flex flex-wrap items-center gap-2">
            {booking.status === BookingStatus.Pending && (
              <button
                type="button"
                disabled={updatingStatus || isActionLoading}
                onClick={() => handleUpdateStatus(BookingStatus.Confirmed)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-sky-700 disabled:opacity-50 cursor-pointer"
              >
                <FiCheckCircle className="h-4 w-4" /> <span>Confirm Booking</span>
              </button>
            )}

            {booking.status === BookingStatus.Confirmed && (
              <button
                type="button"
                disabled={updatingStatus || isActionLoading}
                onClick={() => handleUpdateStatus(BookingStatus.Completed)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50 cursor-pointer"
              >
                <FiCheck className="h-4 w-4" /> <span>Mark as Completed</span>
              </button>
            )}

            {booking.status !== BookingStatus.Cancelled && (
              <button
                type="button"
                disabled={updatingStatus || isActionLoading}
                onClick={() => onCancelBooking(booking)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-50 cursor-pointer"
              >
                <FiSlash className="h-4 w-4" /> <span>Cancel Booking</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </SlidePanel>
  );
}

export default ProductBookingDetailPanel;
