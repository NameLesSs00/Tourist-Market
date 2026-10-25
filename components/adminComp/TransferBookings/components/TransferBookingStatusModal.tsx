"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import {
  TRANSFER_BOOKING_STATUS_LABELS,
  TransferBookingItem,
  TransferBookingStatus,
} from "@/models/transferBooking";

interface TransferBookingStatusModalProps {
  open: boolean;
  booking: TransferBookingItem | null;
  onClose: () => void;
  onConfirm: (bookingId: string, status: TransferBookingStatus) => void;
  isLoading: boolean;
}

const STATUS_OPTIONS: Array<{
  status: TransferBookingStatus;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [
  {
    status: TransferBookingStatus.Pending,
    label: "Pending",
    description: "Booking is awaiting confirmation or driver assignment.",
    icon: FiClock,
    color: "text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-50",
  },
  {
    status: TransferBookingStatus.Confirmed,
    label: "Confirmed",
    description: "Trip schedule and vehicle have been confirmed.",
    icon: FiCheckCircle,
    color: "text-emerald-600 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50",
  },
  {
    status: TransferBookingStatus.Completed,
    label: "Completed",
    description: "Passenger transfer has concluded successfully.",
    icon: FiCheckCircle,
    color: "text-sky-600 border-sky-200 bg-sky-50/50 hover:bg-sky-50",
  },
  {
    status: TransferBookingStatus.Cancelled,
    label: "Cancelled",
    description: "The transfer request was aborted or cancelled.",
    icon: FiXCircle,
    color: "text-rose-600 border-rose-200 bg-rose-50/50 hover:bg-rose-50",
  },
];

export function TransferBookingStatusModal({
  open,
  booking,
  onClose,
  onConfirm,
  isLoading,
}: TransferBookingStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<TransferBookingStatus | null>(null);

  React.useEffect(() => {
    if (booking) {
      setSelectedStatus(booking.status);
    }
  }, [booking, open]);

  if (!open || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus === null || selectedStatus === booking.status) {
      onClose();
      return;
    }
    onConfirm(booking.id, selectedStatus);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <motion.div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
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
        >
          <div>
            <h3 className="text-base font-bold text-slate-800">Update Booking Status</h3>
            <p className="text-xs text-slate-500 mt-1">
              Change the operating status for passenger{" "}
              <strong className="text-slate-700">{booking.customerName}</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              {STATUS_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isCurrent = booking.status === opt.status;
                const isSelected = selectedStatus === opt.status;

                return (
                  <button
                    key={opt.status}
                    type="button"
                    onClick={() => setSelectedStatus(opt.status)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition cursor-pointer ${
                      isSelected
                        ? "border-[#0E4A68] bg-[#0E4A680A] ring-1 ring-[#0E4A68]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <Icon className={`h-4 w-4 ${opt.color.split(" ")[0]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">{opt.label}</span>
                        {isCurrent && (
                          <span className="rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] font-medium text-slate-600">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedStatus === TransferBookingStatus.Cancelled && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
                <FiAlertTriangle className="h-4 w-4 shrink-0" />
                <span>Marking as cancelled will terminate this transfer order.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || selectedStatus === booking.status}
                className="rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#083952] cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Save Status"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
