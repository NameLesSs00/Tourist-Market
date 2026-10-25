"use client";

import React, { useState } from "react";
import { FiCheck, FiCheckCircle, FiClock, FiFileText, FiMail, FiMapPin, FiMessageSquare, FiSlash, FiUser } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  ServicesBookingStatus,
  ServicesBookingType,
  SERVICES_BOOKING_TYPE_LABELS,
  SERVICES_COMMUNICATION_METHOD_LABELS,
  SERVICES_GUIDE_LANGUAGE_LABELS,
  type ServicesBookingItem,
  type TouristServiceBookingItem,
  type CarRentalBookingItem,
  type VipHurghadaBookingItem,
} from "@/models/servicesBooking";
import { ServicesBookingStatusBadge } from "./ServicesBookingStatusBadge";

interface ServicesBookingDetailPanelProps {
  open: boolean;
  onClose: () => void;
  booking: ServicesBookingItem | null;
  onStatusChange: (status: ServicesBookingStatus) => Promise<void> | void;
  onRequestCancel: (booking: ServicesBookingItem) => void;
  isActionLoading?: boolean;
}

export function ServicesBookingDetailPanel({
  open,
  onClose,
  booking,
  onStatusChange,
  onRequestCancel,
  isActionLoading,
}: ServicesBookingDetailPanelProps) {
  const [updatingStatus, setUpdatingStatus] = useState(false);
  if (!booking) return null;

  const handleUpdateStatus = async (status: ServicesBookingStatus) => {
    setUpdatingStatus(true);
    try {
      await onStatusChange(status);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const dateFormatted = booking.createdAt
    ? new Date(booking.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Service Booking Details"
      subtitle={SERVICES_BOOKING_TYPE_LABELS[booking.bookingType] || "Reservation"}
      widthClassName="max-w-2xl"
    >
      <div className="space-y-4 text-sm">
        {/* Header Summary Card */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5 border border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Customer Name</span>
            <p className="font-bold text-[#0E4A68] text-base">{booking.name}</p>
            <span className="text-[11px] text-gray-400">{dateFormatted}</span>
          </div>
          <ServicesBookingStatusBadge status={booking.status} />
        </div>

        {/* Customer Information */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiUser className="h-3.5 w-3.5 text-[#0E4A68]" /> Customer Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div><span className="text-gray-400">Name:</span> <span className="font-medium text-gray-800">{booking.name}</span></div>
            <div><span className="text-gray-400">Country:</span> <span className="font-medium text-gray-800">{booking.country || "—"}</span></div>
            <div>
              <span className="text-gray-400">Email:</span>{" "}
              <a href={`mailto:${booking.emailAddress}`} className="text-[#0E4A68] hover:underline font-medium">
                {booking.emailAddress}
              </a>
            </div>
            <div><span className="text-gray-400">Preferred Channel:</span> <span className="font-medium text-gray-800">{SERVICES_COMMUNICATION_METHOD_LABELS[booking.communicationMethod] ?? "Email"}</span></div>
          </div>
        </div>

        {/* Accommodation & Hotel Location */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiMapPin className="h-3.5 w-3.5 text-[#0E4A68]" /> Accommodation & Location
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div><span className="text-gray-400">Hotel:</span> <span className="font-medium text-gray-800">{booking.hotel || "—"}</span></div>
            <div><span className="text-gray-400">Room Number:</span> <span className="font-medium text-gray-800">{booking.roomNo || "—"}</span></div>
          </div>
        </div>

        {/* Service Specifications */}
        <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-2.5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <FiFileText className="h-3.5 w-3.5 text-[#0E4A68]" /> Service Specifications
          </h4>
          <div className="rounded-lg bg-gray-50 p-2.5 text-xs">
            <span className="text-gray-400 block mb-0.5">Booked Service</span>
            <span className="font-semibold text-gray-900 text-sm">{booking.subServiceTitle || "Selected Service"}</span>
          </div>

          {booking.bookingType === ServicesBookingType.TouristService && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div><span className="text-gray-400">Tour Date:</span> <span className="font-medium">{(booking as TouristServiceBookingItem).date ? new Date((booking as TouristServiceBookingItem).date).toLocaleDateString() : "—"}</span></div>
              <div><span className="text-gray-400">Guide Language:</span> <span className="font-medium">{SERVICES_GUIDE_LANGUAGE_LABELS[(booking as TouristServiceBookingItem).guideLanguage] ?? "English"}</span></div>
              <div className="sm:col-span-2"><span className="text-gray-400">Time Window:</span> <span className="font-medium">{(booking as TouristServiceBookingItem).timeFrom} – {(booking as TouristServiceBookingItem).timeTo}</span></div>
            </div>
          )}

          {booking.bookingType === ServicesBookingType.CarRental && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div><span className="text-gray-400">Rental Start:</span> <span className="font-medium">{(booking as CarRentalBookingItem).date ? new Date((booking as CarRentalBookingItem).date).toLocaleDateString() : "—"}</span></div>
              <div><span className="text-gray-400">Duration:</span> <span className="font-medium">{(booking as CarRentalBookingItem).numberOfDays} days</span></div>
            </div>
          )}

          {booking.bookingType === ServicesBookingType.VipHurghada && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div><span className="text-gray-400">Flight Number:</span> <span className="font-medium">{(booking as VipHurghadaBookingItem).flightNumber || "—"}</span></div>
              <div><span className="text-gray-400">Passengers:</span> <span className="font-medium">{(booking as VipHurghadaBookingItem).noOfPersons} pax</span></div>
              <div><span className="text-gray-400">Departure Time:</span> <span className="font-medium">{(booking as VipHurghadaBookingItem).departureTime ? new Date((booking as VipHurghadaBookingItem).departureTime).toLocaleString() : "—"}</span></div>
              <div><span className="text-gray-400">Destination:</span> <span className="font-medium">{(booking as VipHurghadaBookingItem).destinationTo || "—"}</span></div>
            </div>
          )}
        </div>

        {/* Customer Notes */}
        {booking.note && (
          <div className="rounded-xl border border-gray-100 bg-white p-3.5 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Customer Note</h4>
            <div className="rounded-lg bg-amber-50/70 p-2.5 border border-amber-100 text-xs text-amber-900">
              {booking.note}
            </div>
          </div>
        )}

        {/* Status Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-gray-100">
          {booking.status === ServicesBookingStatus.Pending && (
            <button
              type="button"
              disabled={updatingStatus || isActionLoading}
              onClick={() => handleUpdateStatus(ServicesBookingStatus.Confirmed)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#0A374E] disabled:opacity-50"
            >
              <FiCheck className="h-4 w-4" /> Confirm Booking
            </button>
          )}

          {booking.status === ServicesBookingStatus.Confirmed && (
            <button
              type="button"
              disabled={updatingStatus || isActionLoading}
              onClick={() => handleUpdateStatus(ServicesBookingStatus.Completed)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              <FiCheckCircle className="h-4 w-4" /> Mark as Completed
            </button>
          )}

          {booking.status !== ServicesBookingStatus.Cancelled && booking.status !== ServicesBookingStatus.Completed && (
            <button
              type="button"
              disabled={updatingStatus || isActionLoading}
              onClick={() => onRequestCancel(booking)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
            >
              <FiSlash className="h-4 w-4" /> Cancel Booking
            </button>
          )}
        </div>
      </div>
    </SlidePanel>
  );
}

export default ServicesBookingDetailPanel;
