"use client";

import React from "react";
import { FaBus, FaCar } from "react-icons/fa6";
import { FiArrowRight, FiCalendar, FiClock, FiFileText, FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  formatTransferVehicleType, TRANSFER_COMMUNICATION_LABELS, TRANSFER_TRIP_TYPE_LABELS,
  TransferBookingItem, TransferBookingStatus,
} from "@/models/transferBooking";
import { TransferBookingStatusBadge } from "./TransferBookingStatusBadge";

interface TransferBookingDetailPanelProps {
  open: boolean;
  onClose: () => void;
  booking: TransferBookingItem | null;
  locationMap: Map<string, string>;
  countryMap: Map<string, string>;
  onEditStatus: (booking: TransferBookingItem) => void;
  onQuickStatusChange: (id: string, status: TransferBookingStatus) => void;
  isUpdatingStatus: boolean;
}

export function TransferBookingDetailPanel({
  open, onClose, booking, locationMap, countryMap, onEditStatus, onQuickStatusChange, isUpdatingStatus,
}: TransferBookingDetailPanelProps) {
  if (!booking) return null;

  const fromName = locationMap.get(booking.fromLocationId) || "Origin Pickup Point";
  const toName = locationMap.get(booking.toLocationId) || "Destination Dropoff Point";
  const countryName = countryMap.get(booking.countryId) || "International Guest";
  const totalPax = (booking.adults || 0) + (booking.children || 0);

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title="Transfer Booking Details"
      subtitle={`Booking for ${booking.customerName || "Customer"}`}
      widthClassName="max-w-2xl"
    >
      <div className="flex flex-col gap-5 p-6 pb-12">
        {/* Status & Pricing Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TransferBookingStatusBadge status={booking.status} />
              <button
                type="button"
                onClick={() => onEditStatus(booking)}
                className="text-xs font-semibold text-[#0E4A68] hover:underline cursor-pointer"
              >
                Change Status
              </button>
            </div>
            <p className="text-[11px] text-slate-500">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-[#0E4A68]">${Number(booking.totalPrice ?? 0).toFixed(2)}</span>
            <span className="text-[11px] text-slate-500 block">Total Price (USD)</span>
          </div>
        </div>

        {/* Route & Schedule Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Route & Timing</h4>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span>{fromName}</span>
            <FiArrowRight className="h-4 w-4 text-[#0E4A68] shrink-0" />
            <span className="text-[#0E4A68]">{toName}</span>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-100 sm:grid-cols-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Date: <strong>{booking.tripDate || "TBD"}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiClock className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Time: <strong>{booking.tripTime || "Anytime"}</strong></span>
            </div>
            <div>
              <span>Trip: <strong>{TRANSFER_TRIP_TYPE_LABELS[booking.tripType] || "One-Way"}</strong></span>
            </div>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Customer Information</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div>
              <p className="text-slate-400 text-[11px]">Passenger Name</p>
              <p className="font-semibold text-slate-800 text-sm">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Nationality / Country</p>
              <p className="font-medium text-slate-800 flex items-center gap-1.5">
                <FiGlobe className="h-3.5 w-3.5 text-slate-400" />
                {countryName}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Email Address</p>
              <a href={`mailto:${booking.email}`} className="font-medium text-[#0E4A68] hover:underline flex items-center gap-1.5">
                <FiMail className="h-3.5 w-3.5" />
                {booking.email}
              </a>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Phone & Contact Method</p>
              <p className="font-medium text-slate-800 flex items-center gap-1.5">
                <FiPhone className="h-3.5 w-3.5 text-slate-400" />
                {booking.phoneNumber}
                <span className="rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] text-slate-600 font-normal">
                  {TRANSFER_COMMUNICATION_LABELS[booking.communicationMethod] || "Phone"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle & Party Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Vehicle & Passenger Group</h4>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0E4A680C] text-[#0E4A68]">
              {totalPax > 9 ? <FaBus className="h-5 w-5" /> : <FaCar className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{formatTransferVehicleType(booking.vehicleType)}</p>
              <p className="text-xs text-slate-500">
                {booking.adults} Adults · {booking.children} Children · {booking.luggageCount} Luggage Pieces
              </p>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        {booking.notes && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <FiFileText className="h-3.5 w-3.5 text-[#0E4A68]" />
              <span>Special Instructions / Notes</span>
            </div>
            <p className="text-xs text-slate-700 bg-slate-50 rounded-xl p-3 leading-relaxed whitespace-pre-wrap">
              {booking.notes}
            </p>
          </div>
        )}

        {/* Quick Status Action Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-700">Quick Status Transitions</p>
          <div className="flex flex-wrap items-center gap-2">
            {booking.status !== TransferBookingStatus.Confirmed && (
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => onQuickStatusChange(booking.id, TransferBookingStatus.Confirmed)}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition cursor-pointer disabled:opacity-50"
              >
                Mark as Confirmed
              </button>
            )}
            {booking.status !== TransferBookingStatus.Completed && (
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => onQuickStatusChange(booking.id, TransferBookingStatus.Completed)}
                className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition cursor-pointer disabled:opacity-50"
              >
                Mark as Completed
              </button>
            )}
            {booking.status !== TransferBookingStatus.Cancelled && (
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => onQuickStatusChange(booking.id, TransferBookingStatus.Cancelled)}
                className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition cursor-pointer disabled:opacity-50"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </SlidePanel>
  );
}
