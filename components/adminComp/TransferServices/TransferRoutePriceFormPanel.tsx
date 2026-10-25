"use client";

import React, { useEffect, useState } from "react";
import { FiAlertCircle, FiDollarSign } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  VEHICLE_TYPE_CONFIGS,
  VEHICLE_TYPE_LIST,
  VehicleType,
  type TransferRoutePriceItem,
  type TransferRoutePriceUpsertRequest,
} from "@/models/transferRoutePrice";
import type { TransferLocationItem } from "@/models/transferLocation";
import { TransferRoutePriceCapacityGuide } from "./components";

interface TransferRoutePriceFormPanelProps {
  open: boolean;
  item?: TransferRoutePriceItem | null;
  fromLocations: TransferLocationItem[];
  toLocations: TransferLocationItem[];
  onClose: () => void;
  onSubmitCreate: (body: TransferRoutePriceUpsertRequest) => void;
  onSubmitUpdate: (id: string, body: TransferRoutePriceUpsertRequest) => void;
  isSubmitting?: boolean;
}

export function TransferRoutePriceFormPanel({
  open, item, fromLocations, toLocations, onClose, onSubmitCreate, onSubmitUpdate, isSubmitting = false,
}: TransferRoutePriceFormPanelProps) {
  const isEdit = Boolean(item);
  const [fromLocationId, setFromLocationId] = useState("");
  const [toLocationId, setToLocationId] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType>(VehicleType.Car);
  const [priceUsd, setPriceUsd] = useState<string>("25");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFromLocationId(item ? item.fromLocationId || "" : fromLocations[0]?.id || "");
    setToLocationId(item ? item.toLocationId || "" : toLocations[0]?.id || "");
    setVehicleType(
      item
        ? Number(item.vehicleType) === 0
          ? VehicleType.Car
          : (item.vehicleType as VehicleType) || VehicleType.Car
        : VehicleType.Car
    );
    setPriceUsd(item ? String(item.priceUsd ?? 0) : "25");
    setIsActive(item ? Boolean(item.isActive) : true);
    setError(null);
  }, [item, open, fromLocations, toLocations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fromLocationId) return setError("Please select a pickup (from) location.");
    if (!toLocationId) return setError("Please select a destination (to) location.");
    if (fromLocationId === toLocationId) return setError("Pickup and destination locations cannot be the same.");
    const priceNum = parseFloat(priceUsd);
    if (isNaN(priceNum) || priceNum < 0) return setError("Please enter a valid price in USD.");
    const payload: TransferRoutePriceUpsertRequest = {
      fromLocationId, toLocationId, vehicleType, priceUsd: priceNum, isActive,
    };
    if (isEdit && item) onSubmitUpdate(item.id, payload);
    else onSubmitCreate(payload);
  };

  const selectedConfig =
    VEHICLE_TYPE_CONFIGS[vehicleType] ?? VEHICLE_TYPE_CONFIGS[VehicleType.Car];

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Route Price" : "Add Route Price"}
      subtitle={isEdit ? "Update pricing and vehicle settings for this route." : "Define pricing for transfers between two locations."}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            <FiAlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <TransferRoutePriceCapacityGuide />

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Pickup Location (From) *</label>
          <select
            value={fromLocationId}
            onChange={(e) => setFromLocationId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
            required
          >
            <option value="" disabled>Select pickup location...</option>
            {fromLocations.map((loc) => (<option key={loc.id} value={loc.id}>{loc.name}</option>))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Destination Location (To) *</label>
          <select
            value={toLocationId}
            onChange={(e) => setToLocationId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
            required
          >
            <option value="" disabled>Select destination location...</option>
            {toLocations.map((loc) => (<option key={loc.id} value={loc.id}>{loc.name}</option>))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Vehicle Category (Capacity) *</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(Number(e.target.value) as VehicleType)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
            required
          >
            {VEHICLE_TYPE_LIST.map((v) => (
              <option key={v.value} value={v.value}>{v.label} ({v.passengerRange})</option>
            ))}
          </select>
          {selectedConfig && (
            <p className="mt-1 text-[11px] text-[#0E4A68] font-medium pl-1">
              ✓ Applies to bookings with {selectedConfig.passengerRange} ({selectedConfig.capacityHint})
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">Price (USD) *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiDollarSign className="h-3.5 w-3.5" />
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={priceUsd}
              onChange={(e) => setPriceUsd(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#0E4A68] focus:bg-white"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3">
          <div>
            <p className="text-xs font-semibold text-slate-800">Active Route Price</p>
            <p className="text-[11px] text-slate-500">When inactive, clients cannot book this price.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isActive}
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
              isActive ? "bg-[#0E4A68]" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#083952] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : isEdit ? "Update Route Price" : "Create Route Price"}
          </button>
        </div>
      </form>
    </SlidePanel>
  );
}
