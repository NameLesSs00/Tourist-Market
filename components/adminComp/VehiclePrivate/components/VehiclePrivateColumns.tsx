import React from "react";
import Image from "next/image";
import { FaCar } from "react-icons/fa6";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import { LANG_FLAGS } from "@/models/localization";
import type { VehiclePrivateItem } from "@/models/vehiclePrivate";

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

export function createVehiclePrivateColumns(): DataTableColumn<VehiclePrivateItem>[] {
  return [
    {
      key: "name",
      header: (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
            <Image
              src={LANG_FLAGS.en}
              alt="English"
              fill
              className="object-cover"
              sizes="16px"
            />
          </span>
          <span>Vehicle Name</span>
        </span>
      ),
      className: "w-full min-w-[200px]",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E4A680C] text-[#0E4A68]">
            <FaCar className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-xs text-[#083952]">
              {item.name || "Untitled Vehicle"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      className: "w-28",
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
            item.isActive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {item.isActive ? (
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
    {
      key: "createdAt",
      header: "Created",
      className: "w-36 text-xs text-slate-500",
      render: (item) => formatDate(item.createdAt),
    },
  ];
}
