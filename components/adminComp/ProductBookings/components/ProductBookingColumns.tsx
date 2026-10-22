"use client";

import React from "react";
import { FiEye, FiPackage, FiSlash } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared/DataTable";
import { BookingStatus, type ProductBookingItem } from "@/models/productBooking";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BuildColumnsOptions {
  onViewDetails: (booking: ProductBookingItem) => void;
  onCancelBooking: (booking: ProductBookingItem) => void;
  isActionLoadingId?: string | null;
}

export function buildProductBookingColumns({
  onViewDetails,
  onCancelBooking,
  isActionLoadingId,
}: BuildColumnsOptions): DataTableColumn<ProductBookingItem>[] {
  return [
    {
      key: "reference",
      header: "Booking Ref & Date",
      render: (row) => {
        const dateStr = row.bookingDate
          ? new Date(row.bookingDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—";

        return (
          <div className="flex flex-col">
            <span className="font-semibold text-[#0E4A68] tracking-tight">
              {row.bookingReference || "—"}
            </span>
            <span className="text-xs text-gray-400">{dateStr}</span>
          </div>
        );
      },
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.customerName || "—"}</span>
          <span className="text-xs text-gray-500">{row.phoneNumber || "—"}</span>
          <span className="text-xs text-gray-400">{row.email || "—"}</span>
        </div>
      ),
    },
    {
      key: "delivery",
      header: "Delivery Location",
      render: (row) => (
        <div className="flex flex-col max-w-[200px]">
          <span className="font-medium text-gray-800 truncate" title={row.hotelName}>
            {row.hotelName || "—"}
          </span>
          <span className="text-xs text-gray-500 truncate" title={row.address}>
            {row.address || "—"}
          </span>
        </div>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (row) => {
        const totalQty = row.items?.reduce((acc, it) => acc + (it.quantity || 0), 0) ?? 0;
        const distinctCount = row.items?.length ?? 0;
        const firstItemName = row.items?.[0]?.productTitle || row.items?.[0]?.productName;

        return (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <FiPackage className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-800">
                {distinctCount} {distinctCount === 1 ? "item" : "items"} ({totalQty} pcs)
              </span>
              {firstItemName && (
                <span className="text-[11px] text-gray-400 max-w-[150px] truncate" title={firstItemName}>
                  {firstItemName}
                </span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: "totalPrice",
      header: "Total Price",
      render: (row) => {
        const amount = row.displayFinalPrice ?? row.finalPriceUsd ?? 0;
        const curr = row.currency || "USD";
        return (
          <div className="flex flex-col">
            <span className="font-bold text-[#0E4A68]">
              {curr} {Number(amount).toFixed(2)}
            </span>
            {row.discountAmountUsd > 0 && (
              <span className="text-[11px] text-emerald-600">
                Saved ${row.discountAmountUsd}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <BookingStatusBadge status={row.status} statusName={row.statusName} />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (row) => {
        const isCancelled = row.status === BookingStatus.Cancelled;
        const isLoading = isActionLoadingId === row.bookingId;

        return (
          <div className="flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => onViewDetails(row)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-[#0E4A68] cursor-pointer"
              title="View full booking details"
            >
              <FiEye className="h-3.5 w-3.5" />
              <span>Details</span>
            </button>

            {!isCancelled && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => onCancelBooking(row)}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 disabled:opacity-50 cursor-pointer"
                title="Cancel booking"
              >
                <FiSlash className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>
        );
      },
    },
  ];
}
