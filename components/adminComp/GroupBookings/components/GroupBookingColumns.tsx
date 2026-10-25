"use client";

import React from "react";
import { FiCheckCircle, FiEye, FiHome, FiPhone, FiUsers } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import {
  GROUP_BOOKING_STATUS_LABELS,
  GROUP_PAYMENT_METHOD_LABELS,
  type GroupBookingItem,
  GroupBookingStatus,
} from "@/models/groupBooking";

interface BuildGroupBookingColumnsOptions {
  onViewDetails: (item: GroupBookingItem) => void;
  onUpdateStatus: (item: GroupBookingItem) => void;
}

export function buildGroupBookingColumns({
  onViewDetails,
  onUpdateStatus,
}: BuildGroupBookingColumnsOptions): DataTableColumn<GroupBookingItem>[] {
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
      key: "excursions",
      header: "Booked Excursion",
      render: (item) => {
        const lineItem = item.items[0];
        const extraCount = item.items.length - 1;
        const totalGuests = item.items.reduce(
          (acc, cur) => acc + cur.adultsCount + cur.childrenCount + cur.infantsCount,
          0
        );

        return (
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#083952]">
                {lineItem?.excursionTitle || "Group Excursion"}
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
            <div className="flex items-center gap-1 text-[11px] text-[#0E4A68] font-medium">
              <FiUsers className="h-3 w-3" />
              <span>{totalGuests} total {totalGuests === 1 ? "guest" : "guests"}</span>
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
            {GROUP_PAYMENT_METHOD_LABELS[item.paymentMethod] || "Cash on Arrival"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const statusConfig: Record<GroupBookingStatus, { label: string; className: string }> = {
          [GroupBookingStatus.Pending]: {
            label: "Pending",
            className: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
          },
          [GroupBookingStatus.Confirmed]: {
            label: "Confirmed",
            className: "border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7]",
          },
          [GroupBookingStatus.Completed]: {
            label: "Completed",
            className: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
          },
          [GroupBookingStatus.Cancelled]: {
            label: "Cancelled",
            className: "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
          },
        };

        const current = statusConfig[item.bookingStatus] || {
          label: GROUP_BOOKING_STATUS_LABELS[item.bookingStatus] || "Unknown",
          className: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
        };

        return (
          <button
            type="button"
            onClick={() => onUpdateStatus(item)}
            title="Click to update status"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold cursor-pointer transition hover:opacity-80 shadow-2xs ${current.className}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            <span>{current.label}</span>
          </button>
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
            title="View Booking Details"
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#F8FAFC] transition cursor-pointer shadow-2xs"
          >
            <FiEye className="h-3.5 w-3.5" />
            <span>View</span>
          </button>
          <button
            type="button"
            onClick={() => onUpdateStatus(item)}
            title="Update Booking Status"
            className="flex items-center gap-1 rounded-lg border border-[#0E4A6833] bg-[#0E4A680C] px-2 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6818] transition cursor-pointer"
          >
            <FiCheckCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];
}
