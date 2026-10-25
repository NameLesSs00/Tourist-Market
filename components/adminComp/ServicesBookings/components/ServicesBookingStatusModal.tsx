"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import {
  ServicesBookingStatus,
  SERVICES_BOOKING_STATUS_LABELS,
  type ServicesBookingItem,
} from "@/models/servicesBooking";

interface ServicesBookingStatusModalProps {
  open: boolean;
  booking: ServicesBookingItem | null;
  targetStatus: ServicesBookingStatus | null;
  onClose: () => void;
  onConfirm: (bookingId: string, status: ServicesBookingStatus, reason?: string) => Promise<void>;
  isLoading: boolean;
}

export function ServicesBookingStatusModal({
  open,
  booking,
  targetStatus,
  onClose,
  onConfirm,
  isLoading,
}: ServicesBookingStatusModalProps) {
  const [reason, setReason] = useState("");

  if (!open || !booking || targetStatus === null) return null;

  const isCancel = targetStatus === ServicesBookingStatus.Cancelled;
  const targetLabel = SERVICES_BOOKING_STATUS_LABELS[targetStatus];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(booking.id, targetStatus, reason.trim() || undefined);
    setReason("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-[#0F172A80] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex items-start gap-3.5">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${isCancel ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-[#0E4A68]"}`}>
              <FiAlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {isCancel ? "Cancel Booking" : `Change Status to ${targetLabel}`}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Customer: {booking.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">
              {isCancel
                ? `Are you sure you want to cancel the booking for "${booking.name}" (${booking.subServiceTitle})? This action will mark the booking as cancelled.`
                : `Are you sure you want to change the status of the booking for "${booking.name}" to ${targetLabel}?`}
            </p>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Reason / Note {isCancel ? "(recommended)" : "(optional)"}
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Customer requested cancellation via WhatsApp"
                className="w-full rounded-xl border border-gray-200 p-3 text-xs text-gray-800 transition focus:border-[#0E4A68] focus:outline-none focus:ring-1 focus:ring-[#0E4A68]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-xs transition disabled:opacity-50 ${
                  isCancel
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-[#0E4A68] hover:bg-[#0A374E]"
                }`}
              >
                {isLoading ? "Updating..." : isCancel ? "Confirm Cancellation" : "Update Status"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ServicesBookingStatusModal;
