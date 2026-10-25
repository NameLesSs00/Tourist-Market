"use client";

import React, { useEffect, useState } from "react";
import { FiCheck, FiLoader, FiX } from "react-icons/fi";
import { useUpdatePrivateBookingStatusMutation } from "@/features/privateBookings/usePrivateBookingAdmin";
import {
  type PrivateBookingItem,
  PrivateBookingStatus,
} from "@/models/privateBooking";

interface PrivateBookingStatusModalProps {
  open: boolean;
  booking: PrivateBookingItem | null;
  onClose: () => void;
}

const STATUS_OPTIONS: Array<{
  status: PrivateBookingStatus;
  title: string;
  description: string;
  badgeClass: string;
}> = [
  {
    status: PrivateBookingStatus.Pending,
    title: "Pending",
    description: "New reservation waiting for operational review or vehicle assignment.",
    badgeClass: "border-[#FDE68A] bg-[#FEF3C7] text-[#D97706]",
  },
  {
    status: PrivateBookingStatus.Confirmed,
    title: "Confirmed",
    description: "Private vehicle and driver locked; pickup schedule communicated.",
    badgeClass: "border-[#BAE6FD] bg-[#E0F2FE] text-[#0284C7]",
  },
  {
    status: PrivateBookingStatus.Completed,
    title: "Completed",
    description: "Excursion has taken place and private tour concluded successfully.",
    badgeClass: "border-[#BBF7D0] bg-[#DCFCE7] text-[#16A34A]",
  },
  {
    status: PrivateBookingStatus.Cancelled,
    title: "Cancelled",
    description: "Reservation cancelled upon customer request or weather advisories.",
    badgeClass: "border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]",
  },
];

export function PrivateBookingStatusModal({
  open,
  booking,
  onClose,
}: PrivateBookingStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<PrivateBookingStatus>(
    booking?.bookingStatus ?? PrivateBookingStatus.Pending
  );

  const mutation = useUpdatePrivateBookingStatusMutation();

  useEffect(() => {
    if (booking) {
      setSelectedStatus(booking.bookingStatus);
    }
  }, [booking]);

  if (!open || !booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { id: booking.id, status: selectedStatus },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
          <div>
            <h3 className="text-base font-bold text-[#083952]">Update Private Booking Status</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Ref: {booking.bookingReference}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {STATUS_OPTIONS.map((opt) => {
              const isSelected = selectedStatus === opt.status;
              return (
                <label
                  key={opt.status}
                  className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
                    isSelected
                      ? "border-[#0E4A68] bg-[#0E4A6808] ring-1 ring-[#0E4A68]"
                      : "border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <input
                    type="radio"
                    name="private-booking-status"
                    checked={isSelected}
                    onChange={() => setSelectedStatus(opt.status)}
                    className="mt-0.5 text-[#0E4A68] focus:ring-[#0E4A68]"
                  />
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#083952]">{opt.title}</span>
                      <span className={`rounded-full border px-2 py-0.2 text-[10px] font-bold ${opt.badgeClass}`}>
                        {opt.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">{opt.description}</p>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F9]">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="rounded-xl border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || selectedStatus === booking.bookingStatus}
              className="flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-4 py-2 text-xs font-semibold text-[#FFFFFF] shadow-sm hover:bg-[#0A374E] transition disabled:opacity-50 cursor-pointer"
            >
              {mutation.isPending ? (
                <FiLoader className="h-4 w-4 animate-spin" />
              ) : (
                <FiCheck className="h-4 w-4" />
              )}
              <span>Save Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PrivateBookingStatusModal;
