"use client";

import React from "react";
import { FaBus, FaCar } from "react-icons/fa6";
import { FiArrowRight, FiCalendar, FiClock, FiEdit2, FiEye, FiMail, FiMessageSquare, FiPhone, FiUsers } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import {
  formatTransferVehicleType,
  TRANSFER_COMMUNICATION_LABELS,
  TRANSFER_TRIP_TYPE_LABELS,
  TransferBookingItem,
  TransferCommunicationMethod,
} from "@/models/transferBooking";
import { TransferBookingStatusBadge } from "./TransferBookingStatusBadge";

interface BuildColumnsOptions {
  locationMap: Map<string, string>;
  onViewDetails: (item: TransferBookingItem) => void;
  onEditStatus: (item: TransferBookingItem) => void;
}

export function buildTransferBookingColumns({
  locationMap,
  onViewDetails,
  onEditStatus,
}: BuildColumnsOptions): DataTableColumn<TransferBookingItem>[] {
  return [
    {
      key: "customer",
      header: "Customer",
      render: (item) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-xs text-[#083952]">{item.customerName || "Guest"}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <FiMail className="h-3 w-3 text-slate-400" />
            <span className="truncate max-w-[140px]">{item.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            {item.communicationMethod === TransferCommunicationMethod.WhatsApp ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <FiMessageSquare className="h-3 w-3" /> {item.phoneNumber}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-slate-600">
                <FiPhone className="h-3 w-3 text-slate-400" /> {item.phoneNumber}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "route",
      header: "Transfer Route",
      render: (item) => {
        const fromName = locationMap.get(item.fromLocationId) || "Pickup Point";
        const toName = locationMap.get(item.toLocationId) || "Dropoff Point";
        return (
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <span className="truncate max-w-[110px]">{fromName}</span>
              <FiArrowRight className="h-3 w-3 text-[#0E4A68] shrink-0" />
              <span className="truncate max-w-[110px] text-[#0E4A68]">{toName}</span>
            </div>
            <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.2 text-[10px] font-medium text-slate-600">
              {TRANSFER_TRIP_TYPE_LABELS[item.tripType] || "One-Way"}
            </span>
          </div>
        );
      },
    },
    {
      key: "schedule",
      header: "Trip Schedule",
      render: (item) => (
        <div className="space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <FiCalendar className="h-3 w-3 text-[#0E4A68]" />
            <span>{item.tripDate || "TBD"}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <FiClock className="h-3 w-3 text-slate-400" />
            <span>{item.tripTime || "Anytime"}</span>
          </div>
        </div>
      ),
    },
    {
      key: "passengers",
      header: "Vehicle & Party",
      render: (item) => {
        const totalPax = (item.adults || 0) + (item.children || 0);
        const isBus = totalPax > 9;
        return (
          <div className="space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              {isBus ? <FaBus className="h-3 w-3 text-[#0E4A68]" /> : <FaCar className="h-3 w-3 text-[#0E4A68]" />}
              <span>{formatTransferVehicleType(item.vehicleType)}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <FiUsers className="h-3 w-3 text-slate-400" />
                {item.adults} Ad{item.children > 0 ? `, ${item.children} Ch` : ""}
              </span>
              <span>·</span>
              <span>{item.luggageCount} bags</span>
            </div>
          </div>
        );
      },
    },
    {
      key: "price",
      header: "Price",
      render: (item) => (
        <div className="text-xs">
          <span className="font-bold text-[#0E4A68]">${Number(item.totalPrice ?? 0).toFixed(2)}</span>
          <span className="text-[10px] text-slate-400 block font-medium">USD</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <TransferBookingStatusBadge status={item.status} />
          <button
            type="button"
            onClick={() => onEditStatus(item)}
            title="Update Status"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-[#0E4A68] transition cursor-pointer"
          >
            <FiEdit2 className="h-3 w-3" />
          </button>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-12 text-right",
      render: (item) => (
        <button
          type="button"
          onClick={() => onViewDetails(item)}
          title="View Details"
          className="rounded-xl border border-slate-200 p-1.5 text-slate-500 hover:border-[#0E4A68] hover:bg-[#0E4A680C] hover:text-[#0E4A68] transition cursor-pointer"
        >
          <FiEye className="h-3.5 w-3.5" />
        </button>
      ),
    },
  ];
}
