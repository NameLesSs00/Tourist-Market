"use client";

import React from "react";
import { FaCar } from "react-icons/fa6";
import { FiCalendar, FiCheckCircle, FiHome, FiMapPin, FiPackage, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  PRIVATE_BOOKING_STATUS_LABELS,
  PRIVATE_PAYMENT_METHOD_LABELS,
  type PrivateBookingItem,
  PrivateBookingStatus,
} from "@/models/privateBooking";

interface PrivateBookingDetailDrawerProps {
  open: boolean;
  booking: PrivateBookingItem | null;
  onClose: () => void;
  onOpenStatusModal: (booking: PrivateBookingItem) => void;
}

export function PrivateBookingDetailDrawer({
  open,
  booking,
  onClose,
  onOpenStatusModal,
}: PrivateBookingDetailDrawerProps) {
  if (!booking) return null;

  const statusColors: Record<PrivateBookingStatus, string> = {
    [PrivateBookingStatus.Pending]: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
    [PrivateBookingStatus.Confirmed]: "border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7]",
    [PrivateBookingStatus.Completed]: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
    [PrivateBookingStatus.Cancelled]: "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Private Booking Details"
      subtitle={`Reference: ${booking.bookingReference}`}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-5 pb-8 text-xs">
        {/* Status & Quick Action Banner */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#64748B]">Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-bold ${
                statusColors[booking.bookingStatus] || "border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>{PRIVATE_BOOKING_STATUS_LABELS[booking.bookingStatus]}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenStatusModal(booking)}
            className="flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-1.5 font-semibold text-[#FFFFFF] shadow-2xs hover:bg-[#0A374E] transition cursor-pointer"
          >
            <FiCheckCircle className="h-3.5 w-3.5" />
            <span>Update Status</span>
          </button>
        </div>

        {/* Customer Information Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-2 font-bold text-[#083952]">
            <FiUser className="h-4 w-4 text-[#0E4A68]" />
            <span>Customer & Hotel Accommodation</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#64748B]">Full Name:</span>
              <p className="font-semibold text-[#083952]">{booking.customerName}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Phone Number:</span>
              <p className="font-semibold text-[#083952]">{booking.customerPhone}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Hotel:</span>
              <p className="font-semibold text-[#083952]">{booking.hotelName || "Not specified"}</p>
            </div>
            <div>
              <span className="text-[#64748B]">Room Number:</span>
              <p className="font-semibold text-[#083952]">{booking.roomNumber ? `Room ${booking.roomNumber}` : "Not specified"}</p>
            </div>
          </div>
          {booking.notes && (
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 text-[11px] text-[#475569]">
              <span className="font-semibold text-[#083952]">Notes: </span>{booking.notes}
            </div>
          )}
        </div>

        {/* Booked Excursions List */}
        <div className="space-y-4">
          <h4 className="font-bold text-[#083952]">Booked Private Excursions ({booking.items.length})</h4>
          {booking.items.map((line) => (
            <div key={line.id} className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-2xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-2.5">
                <div>
                  <h5 className="font-bold text-[#083952] text-sm">{line.excursionTitle}</h5>
                  <div className="flex items-center gap-3 text-[11px] text-[#64748B] mt-0.5">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="h-3 w-3 text-[#0E4A68]" />
                      {new Date(line.excursionDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers className="h-3 w-3 text-[#0E4A68]" />
                      {line.adultsCount} Ad, {line.childrenCount} Ch, {line.infantsCount} Inf
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#0E4A6812] px-2.5 py-1 font-semibold text-[#0E4A68]">
                    <FaCar className="h-3 w-3" />
                    <span>{line.vehicleName} (${line.vehiclePrice})</span>
                  </span>
                </div>
              </div>

              {/* Selected Attractions */}
              {line.selectedAttractions && line.selectedAttractions.length > 0 && (
                <div className="space-y-1.5 rounded-xl bg-[#F8FAFC] p-2.5">
                  <div className="flex items-center justify-between font-semibold text-[#083952]">
                    <span className="flex items-center gap-1">
                      <FiMapPin className="h-3 w-3 text-[#D48C28]" />
                      Selected Attractions ({line.selectedAttractions.length})
                    </span>
                  </div>
                  {line.selectedAttractions.map((a, idx) => (
                    <div key={a.attractionId || idx} className="flex items-center justify-between text-[11px] text-[#475569]">
                      <span>{a.title}</span>
                      <span className="font-semibold text-[#083952]">${a.totalPrice}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Extra Services */}
              {line.selectedServices && line.selectedServices.length > 0 && (
                <div className="space-y-1.5 rounded-xl bg-[#F8FAFC] p-2.5">
                  <div className="flex items-center justify-between font-semibold text-[#083952]">
                    <span className="flex items-center gap-1">
                      <FiPackage className="h-3 w-3 text-[#0E4A68]" />
                      Extra Services ({line.selectedServices.length})
                    </span>
                    <span>${line.servicesTotal}</span>
                  </div>
                  {line.selectedServices.map((s, idx) => (
                    <div key={s.serviceId || idx} className="flex items-center justify-between text-[11px] text-[#475569]">
                      <span>{s.title}</span>
                      <span className="font-semibold text-[#083952]">${s.totalPrice}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-1 font-bold text-[#083952]">
                <span>Excursion Subtotal</span>
                <span>${line.itemTotal}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="rounded-2xl border border-[#16A34A33] bg-[#16A34A0C] p-4 space-y-2">
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Payment Method</span>
            <span className="font-semibold text-[#083952]">
              {PRIVATE_PAYMENT_METHOD_LABELS[booking.paymentMethod] || "Cash on Arrival"}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-[#16A34A22] pt-2 text-sm font-bold text-[#16A34A]">
            <span>Total Booking Amount</span>
            <span className="text-base font-extrabold">${booking.totalAmountUsd} {booking.currencyCode || "USD"}</span>
          </div>
        </div>
      </div>
    </SlidePanel>
  );
}

export default PrivateBookingDetailDrawer;
