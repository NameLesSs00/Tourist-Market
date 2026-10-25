import React from "react";
import { FiCheck, FiEye, FiSlash } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared/DataTable";
import {
  ServicesBookingStatus,
  ServicesBookingType,
  SERVICES_COMMUNICATION_METHOD_LABELS,
  SERVICES_GUIDE_LANGUAGE_LABELS,
  type ServicesBookingItem,
  type TouristServiceBookingItem,
  type CarRentalBookingItem,
  type VipHurghadaBookingItem,
} from "@/models/servicesBooking";
import { ServicesBookingStatusBadge } from "./ServicesBookingStatusBadge";

interface BuildColumnsOptions {
  activeTab: ServicesBookingType;
  onViewDetails: (booking: ServicesBookingItem) => void;
  onQuickStatusChange: (booking: ServicesBookingItem, newStatus: ServicesBookingStatus) => void;
  isActionLoadingId: string | null;
}

export function buildServicesBookingColumns({
  activeTab,
  onViewDetails,
  onQuickStatusChange,
  isActionLoadingId,
}: BuildColumnsOptions): DataTableColumn<ServicesBookingItem>[] {
  const columns: DataTableColumn<ServicesBookingItem>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-xs text-gray-500">{row.emailAddress}</span>
          <span className="text-xs text-gray-400">{row.country}</span>
        </div>
      ),
    },
    {
      key: "hotel",
      header: "Hotel / Room",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{row.hotel || "—"}</span>
          <span className="text-xs text-gray-500">Room: {row.roomNo || "—"}</span>
        </div>
      ),
    },
    {
      key: "service",
      header: "Service",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-[#0E4A68]">{row.subServiceTitle || "Service"}</span>
          <span className="text-[11px] text-gray-500">
            Via: {SERVICES_COMMUNICATION_METHOD_LABELS[row.communicationMethod] ?? "Email"}
          </span>
        </div>
      ),
    },
  ];

  // Specific column based on active tab
  if (activeTab === ServicesBookingType.TouristService) {
    columns.push({
      key: "touristDetails",
      header: "Tour Details",
      render: (row) => {
        const item = row as TouristServiceBookingItem;
        const dateStr = item.date ? new Date(item.date).toLocaleDateString() : "—";
        const lang = item.guideLanguage ? SERVICES_GUIDE_LANGUAGE_LABELS[item.guideLanguage] : "—";
        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium text-gray-800">{dateStr} ({item.timeFrom?.slice(0, 5)} - {item.timeTo?.slice(0, 5)})</span>
            <span className="text-gray-500">Language: {lang}</span>
          </div>
        );
      },
    });
  } else if (activeTab === ServicesBookingType.CarRental) {
    columns.push({
      key: "carRentalDetails",
      header: "Rental Details",
      render: (row) => {
        const item = row as CarRentalBookingItem;
        const dateStr = item.date ? new Date(item.date).toLocaleDateString() : "—";
        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium text-gray-800">Start: {dateStr}</span>
            <span className="text-gray-500">Duration: {item.numberOfDays} days</span>
          </div>
        );
      },
    });
  } else if (activeTab === ServicesBookingType.VipHurghada) {
    columns.push({
      key: "vipDetails",
      header: "Transfer Details",
      render: (row) => {
        const item = row as VipHurghadaBookingItem;
        const timeStr = item.departureTime ? new Date(item.departureTime).toLocaleString() : "—";
        return (
          <div className="flex flex-col text-xs">
            <span className="font-medium text-gray-800">Flight: {item.flightNumber || "—"} ({item.noOfPersons} pax)</span>
            <span className="text-gray-500">Time: {timeStr}</span>
            <span className="text-gray-400">To: {item.destinationTo || "—"}</span>
          </div>
        );
      },
    });
  }

  // Common Status, Created, Actions
  columns.push(
    {
      key: "status",
      header: "Status",
      render: (row) => <ServicesBookingStatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      header: "Booked On",
      render: (row) => (
        <span className="text-xs text-gray-500">
          {new Date(row.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      headerClassName: "text-right",
      render: (row) => {
        const isLoading = isActionLoadingId === row.id;

        return (
          <div className="flex items-center justify-end gap-1.5">
            {/* Quick Confirm button if Pending */}
            {row.status === ServicesBookingStatus.Pending && (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => onQuickStatusChange(row, ServicesBookingStatus.Confirmed)}
                title="Quick Confirm"
                className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 transition disabled:opacity-50"
              >
                <FiCheck className="h-3 w-3" />
                <span>Confirm</span>
              </button>
            )}

            {/* Quick Cancel button if not already cancelled or completed */}
            {row.status !== ServicesBookingStatus.Cancelled &&
              row.status !== ServicesBookingStatus.Completed && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => onQuickStatusChange(row, ServicesBookingStatus.Cancelled)}
                  title="Cancel Booking"
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition disabled:opacity-50"
                >
                  <FiSlash className="h-4 w-4" />
                </button>
              )}

            {/* View Details Drawer */}
            <button
              type="button"
              onClick={() => onViewDetails(row)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 transition"
            >
              <FiEye className="h-3.5 w-3.5 text-gray-500" />
              <span>Details</span>
            </button>
          </div>
        );
      },
    }
  );

  return columns;
}

export default buildServicesBookingColumns;
