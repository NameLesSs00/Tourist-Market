import React from "react";
import { FiArrowRight, FiCheckCircle, FiCornerUpRight, FiMapPin, FiXCircle } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import type { TransferRoutePriceItem } from "@/models/transferRoutePrice";
import { VehicleTypeBadge } from "./VehicleTypeBadge";

export function createTransferRoutePriceColumns(): DataTableColumn<TransferRoutePriceItem>[] {
  return [
    {
      key: "route",
      header: "Route Path",
      className: "min-w-[240px]",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <FiCornerUpRight className="h-3.5 w-3.5" />
            </span>
            <span>{row.fromLocationName || "Unknown Pickup"}</span>
          </div>

          <FiArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />

          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-50 text-rose-700">
              <FiMapPin className="h-3.5 w-3.5" />
            </span>
            <span>{row.toLocationName || "Unknown Destination"}</span>
          </div>
        </div>
      ),
    },
    {
      key: "vehicleType",
      header: "Vehicle Category",
      className: "min-w-[150px]",
      render: (row) => (
        <VehicleTypeBadge vehicleType={row.vehicleType} showHint={true} />
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "min-w-[120px]",
      render: (row) => {
        const symbol = row.displayCurrencySymbol || "$";
        const formatted = Number(row.displayPrice ?? row.priceUsd ?? 0).toFixed(2);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#0E4A68]">
              {symbol}
              {formatted}
            </span>
            {row.displayCurrency && row.displayCurrency !== "USD" && (
              <span className="text-[11px] text-slate-500 font-medium">
                ${Number(row.priceUsd).toFixed(2)} USD
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "isActive",
      header: "Status",
      className: "w-28",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
            row.isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {row.isActive ? (
            <>
              <FiCheckCircle className="h-3 w-3 text-emerald-600" />
              <span>Active</span>
            </>
          ) : (
            <>
              <FiXCircle className="h-3 w-3 text-slate-400" />
              <span>Inactive</span>
            </>
          )}
        </span>
      ),
    },
  ];
}
