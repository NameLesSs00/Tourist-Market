import React from "react";
import { FiInfo } from "react-icons/fi";
import { VEHICLE_TYPE_LIST } from "@/models/transferRoutePrice";

export function TransferRoutePriceCapacityGuide() {
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3 text-xs text-sky-950">
      <p className="font-semibold mb-1.5 flex items-center gap-1.5 text-[#0E4A68]">
        <FiInfo className="h-3.5 w-3.5 shrink-0" />
        <span>Passenger Capacity Rules</span>
      </p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-700">
        {VEHICLE_TYPE_LIST.map((v) => (
          <div key={v.value}>
            • <strong>{v.label}:</strong> {v.minPassengers} to {v.maxPassengers} Pax
          </div>
        ))}
      </div>
    </div>
  );
}
