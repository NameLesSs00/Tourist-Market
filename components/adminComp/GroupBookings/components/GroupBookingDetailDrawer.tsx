"use client";

import React from "react";
import { FiCalendar, FiCheckCircle, FiHome, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  GROUP_BOOKING_STATUS_LABELS,
  GROUP_PAYMENT_METHOD_LABELS,
  type GroupBookingItem,
  GroupBookingStatus,
} from "@/models/groupBooking";

interface GroupBookingDetailDrawerProps {
  open: boolean;
  booking: GroupBookingItem | null;
  onClose: () => void;
  onOpenStatusModal: (booking: GroupBookingItem) => void;
}

export function GroupBookingDetailDrawer({
  open,
  booking,
  onClose,
  onOpenStatusModal,
}: GroupBookingDetailDrawerProps) {
  if (!booking) return null;

  const statusColors: Record<GroupBookingStatus, string> = {
    [GroupBookingStatus.Pending]: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
    [GroupBookingStatus.Confirmed]: "border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7]",
    [GroupBookingStatus.Completed]: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
    [GroupBookingStatus.Cancelled]: "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Group Booking Details"
      subtitle={`Reference: ${booking.bookingReference}`}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-6 pb-8">
        {/* Status & Quick Action Banner */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#64748B]">Current Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
                statusColors[booking.bookingStatus] || "border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B]"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>{GROUP_BOOKING_STATUS_LABELS[booking.bookingStatus]}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenStatusModal(booking)}
            className="flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-1.5 text-xs font-semibold text-[#FFFFFF] shadow-2xs hover:bg-[#0A374E] transition cursor-pointer"
          >
            <FiCheckCircle className="h-3.5 w-3.5" />
            <span>Update Status</span>
          </button>
        </div>

        {/* Customer Information Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
            <FiUser className="h-4 w-4 text-[#0E4A68]" />
            <h4 className="text-xs font-bold text-[#083952] uppercase tracking-wider">Customer Details</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-[#94A3B8] font-medium">Customer Name</p>
              <p className="font-semibold text-[#0F172A] mt-0.5">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-[#94A3B8] font-medium">Phone & WhatsApp</p>
              <p className="font-semibold text-[#0F172A] mt-0.5 flex items-center gap-1">
                <FiPhone className="h-3 w-3 text-[#0E4A68]" />
                <a href={`tel:${booking.customerPhone}`} className="hover:underline">{booking.customerPhone}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Hotel & Stay Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3">
            <FiHome className="h-4 w-4 text-[#0E4A68]" />
            <h4 className="text-xs font-bold text-[#083952] uppercase tracking-wider">Accommodation</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-[#94A3B8] font-medium">Hotel Name</p>
              <p className="font-semibold text-[#0F172A] mt-0.5">{booking.hotelName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-[#94A3B8] font-medium">Room Number</p>
              <p className="font-semibold text-[#0F172A] mt-0.5">{booking.roomNumber ? `Room ${booking.roomNumber}` : "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Booked Excursion Line Items */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <FiCalendar className="h-4 w-4 text-[#0E4A68]" />
              <h4 className="text-xs font-bold text-[#083952] uppercase tracking-wider">Booked Excursions</h4>
            </div>
            <span className="text-xs text-[#64748B] font-medium">{booking.items.length} excursions</span>
          </div>

          <div className="space-y-3">
            {booking.items.map((item, idx) => (
              <div key={item.id || idx} className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-[#083952] text-sm">{item.excursionTitle}</h5>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Date: {new Date(item.excursionDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#083952]">${item.itemTotal}</span>
                    <p className="text-[10px] text-[#94A3B8]">Line total</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#475569] pt-1 border-t border-[#E2E8F0]">
                  <FiUsers className="h-3.5 w-3.5 text-[#0E4A68]" />
                  <span>
                    {item.adultsCount} Adults
                    {item.childrenCount > 0 && `, ${item.childrenCount} Children`}
                    {item.infantsCount > 0 && `, ${item.infantsCount} Infants`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Notes */}
        {booking.notes && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xs space-y-1.5">
            <h4 className="text-xs font-bold text-[#083952] uppercase tracking-wider">Customer Special Notes</h4>
            <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              {booking.notes}
            </p>
          </div>
        )}

        {/* Financial Overview */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 flex items-center justify-between text-xs">
          <div>
            <p className="text-[#64748B]">Payment Method</p>
            <p className="font-semibold text-[#083952] text-sm mt-0.5">
              {GROUP_PAYMENT_METHOD_LABELS[booking.paymentMethod] || "Cash on Arrival"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#64748B]">Total Booking Amount</p>
            <p className="text-lg font-bold text-[#083952] mt-0.5">
              ${booking.totalAmountUsd.toLocaleString()} <span className="text-xs font-medium text-[#64748B]">{booking.currencyCode || "USD"}</span>
            </p>
          </div>
        </div>
      </div>
    </SlidePanel>
  );
}
