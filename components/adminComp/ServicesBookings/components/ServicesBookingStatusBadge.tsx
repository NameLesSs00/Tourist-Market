"use client";

import React from "react";
import { FiCheck, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import {
  ServicesBookingStatus,
  SERVICES_BOOKING_STATUS_LABELS,
} from "@/models/servicesBooking";

interface ServicesBookingStatusBadgeProps {
  status: ServicesBookingStatus | number;
}

export function ServicesBookingStatusBadge({ status }: ServicesBookingStatusBadgeProps) {
  const label =
    SERVICES_BOOKING_STATUS_LABELS[status as ServicesBookingStatus] || "Unknown";

  switch (status) {
    case ServicesBookingStatus.Pending:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
          <FiClock className="h-3.5 w-3.5" />
          {label}
        </span>
      );
    case ServicesBookingStatus.Confirmed:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700">
          <FiCheckCircle className="h-3.5 w-3.5" />
          {label}
        </span>
      );
    case ServicesBookingStatus.Completed:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          <FiCheck className="h-3.5 w-3.5" />
          {label}
        </span>
      );
    case ServicesBookingStatus.Cancelled:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
          <FiXCircle className="h-3.5 w-3.5" />
          {label}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {label}
        </span>
      );
  }
}

export default ServicesBookingStatusBadge;
