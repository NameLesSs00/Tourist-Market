"use client";

import React from "react";
import {
  TRANSFER_BOOKING_STATUS_LABELS,
  TRANSFER_BOOKING_STATUS_STYLES,
  TransferBookingStatus,
} from "@/models/transferBooking";

interface TransferBookingStatusBadgeProps {
  status: TransferBookingStatus;
  className?: string;
}

export function TransferBookingStatusBadge({
  status,
  className = "",
}: TransferBookingStatusBadgeProps) {
  const label = TRANSFER_BOOKING_STATUS_LABELS[status] || "Unknown";
  const styles = TRANSFER_BOOKING_STATUS_STYLES[status] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      <span>{label}</span>
    </span>
  );
}
