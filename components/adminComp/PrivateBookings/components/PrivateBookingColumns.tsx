"use client";

import React from "react";
import { FaCar } from "react-icons/fa6";
import { FiCheckCircle, FiEye, FiHome, FiPhone, FiUsers } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import {
  PRIVATE_BOOKING_STATUS_LABELS,
  PRIVATE_PAYMENT_METHOD_LABELS,
  type PrivateBookingItem,
  PrivateBookingStatus,
} from "@/models/privateBooking";

interface BuildPrivateBookingColumnsOptions {
  onViewDetails: (item: PrivateBookingItem) => void;
  onUpdateStatus: (item: PrivateBookingItem) => void;
}

export function buildPrivateBookingColumns({
  onViewDetails,
  onUpdateStatus,
}: BuildPrivateBookingColumnsOptions): DataTableColumn<PrivateBookingItem>[] {
  return [
    {
      key: "booking",
      header: "Booking & Customer",
      render: (item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#083952]">
              {item.bookingReference}
            </span>
          </div>
          <p className="font-semibold text-[#083952] text-sm">{item.customerName}</p>
          <div className="flex items-center gap-3 text-xs text-[#64748B]">
            {item.customerPhone && (
              <a
                href={`tel:${item.customerPhone}`}
                className="flex items-center gap-1 hover:text-[#0E4A68] transition"
                title="Call Customer"
              >
                <FiPhone className="h-3 w-3" />
                <span>{item.customerPhone}</span>
              </a>
            )}
            {item.customerWhatsApp && item.customerWhatsApp !== item.customerPhone && (
              <span className="text-[11px] text-[#94A3B8]">
                WA: {item.customerWhatsApp}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "hotel",
      header: "Hotel & Room",
      render: (item) => (
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-medium text-[#1E293B]">
            <FiHome className="h-3.5 w-3.5 text-[#0E4A68] shrink-0" />
            <span className="line-clamp-1">{item.hotelName || "Hotel not specified"}</span>
          </div>
          {item.roomNumber && (
            <span className="inline-block rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
              Room {item.roomNumber}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "excursion",
      header: "Private Tour & Vehicle",
      render: (item) => {
        const lineItem = item.items[0];
        const extraCount = item.items.length - 1;
        const totalGuests = item.items.reduce(
          (acc, cur) => acc + (cur.totalPassengers || (cur.adultsCount + cur.childrenCount + cur.infantsCount)),
          0
        );

        return (
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#083952]">
                {lineItem?.excursionTitle || "Private Excursion"}
              </span>
              {extraCount > 0 && (
                <span className="rounded-full bg-[#0E4A680C] px-1.5 py-0.2 text-[10px] font-bold text-[#0E4A68]">
                  +{extraCount} more
                </span>
              )}
            </div>
            {lineItem?.excursionDate && (
              <p className="text-[11px] text-[#64748B]">
                {new Date(lineItem.excursionDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
            <div className="flex items-center gap-2 text-[11px]">
              {lineItem?.vehicleName && (
                <span className="inline-flex items-center gap-1 rounded bg-[#0E4A680C] px-1.5 py-0.5 font-semibold text-[#0E4A68]">
                  <FaCar className="h-2.5 w-2.5" />
                  {lineItem.vehicleName}
                </span>
              )}
              <span className="flex items-center gap-1 text-[#64748B]">
                <FiUsers className="h-2.5 w-2.5" />
                {totalGuests} guest{totalGuests === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "financials",
      header: "Amount & Payment",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-bold text-[#083952]">
            ${item.totalAmountUsd.toLocaleString()}{" "}
            <span className="text-[11px] font-normal text-[#64748B]">{item.currencyCode || "USD"}</span>
          </div>
          <span className="inline-block rounded-md bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 text-[10px] font-medium text-[#64748B]">
            {PRIVATE_PAYMENT_METHOD_LABELS[item.paymentMethod] || "Cash on Arrival"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const statusConfig: Record<PrivateBookingStatus, { label: string; className: string }> = {
          [PrivateBookingStatus.Pending]: {
            label: "Pending",
            className: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
          },
          [PrivateBookingStatus.Confirmed]: {
            label: "Confirmed",
            className: "border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7]",
          },
          [PrivateBookingStatus.Completed]: {
            label: "Completed",
            className: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
          },
          [PrivateBookingStatus.Cancelled]: {
            label: "Cancelled",
            className: "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
          },
        };
        const current = statusConfig[item.bookingStatus] || {
          label: PRIVATE_BOOKING_STATUS_LABELS[item.bookingStatus] || "Unknown",
          className: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
        };

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${current.className}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span>{current.label}</span>
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            title="View Full Booking Breakdown & Add-ons"
            className="flex items-center gap-1 rounded-lg border border-[#0E4A6833] bg-[#0E4A680C] px-2.5 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] transition cursor-pointer shadow-2xs"
          >
            <FiEye className="h-3 w-3" />
            <span>Details</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateStatus(item)}
            title="Update Booking Status"
            className="flex items-center gap-1 rounded-lg border border-[#D48C2833] bg-[#D48C280C] px-2.5 py-1 text-xs font-semibold text-[#D48C28] hover:bg-[#D48C2818] transition cursor-pointer shadow-2xs"
          >
            <FiCheckCircle className="h-3 w-3" />
            <span>Status</span>
          </button>
        </div>
      ),
    },
  ];
}

export default buildPrivateBookingColumns;
