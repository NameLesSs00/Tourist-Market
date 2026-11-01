"use client";

import React, { useEffect, useState } from "react";
import { FiCornerUpRight, FiDollarSign, FiMapPin } from "react-icons/fi";
import { FaCar } from "react-icons/fa6";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import { useVehicleTypeTransfersQuery } from "@/features/vehicleTypeTransfers/useVehicleTypeTransferAdmin";
import type {
  CreateTransferVehiclePriceRequest,
  TransferVehiclePriceItem,
} from "@/models/transferVehiclePrice";

interface TransferVehiclePriceFormPanelProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTransferVehiclePriceRequest) => Promise<void>;
  initialData?: TransferVehiclePriceItem | null;
  isSubmitting?: boolean;
}

export function TransferVehiclePriceFormPanel({
  open,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: TransferVehiclePriceFormPanelProps) {
  const isEdit = Boolean(initialData);

  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [vehicleTypeTransferId, setVehicleTypeTransferId] = useState("");
  const [priceUsd, setPriceUsd] = useState<number>(30);

  const fromLocationsQuery = useTransferFromLocationsQuery({ pageSize: 100, lang: "en" });
  const toLocationsQuery = useTransferToLocationsQuery({ pageSize: 100, lang: "en" });
  const vehicleTypesQuery = useVehicleTypeTransfersQuery({ pageSize: 100 });

  const fromLocations = fromLocationsQuery.data?.data?.items ?? [];
  const toLocations = toLocationsQuery.data?.data?.items ?? [];
  const vehicleTypes = vehicleTypesQuery.data?.items ?? [];

  useEffect(() => {
    if (initialData && open) {
      setFromId(initialData.fromId || "");
      setToId(initialData.toId || "");
      setVehicleTypeTransferId(initialData.vehicleTypeTransferId || "");
      setPriceUsd(initialData.priceUsd ?? 30);
    } else if (!initialData && open) {
      setFromId("");
      setToId("");
      setVehicleTypeTransferId("");
      setPriceUsd(30);
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromId) {
      toast.error("Please select a departure location.");
      return;
    }
    if (!toId) {
      toast.error("Please select a destination location.");
      return;
    }
    if (fromId === toId) {
      toast.error("Departure and destination locations must be different.");
      return;
    }
    if (!vehicleTypeTransferId) {
      toast.error("Please select a vehicle type.");
      return;
    }
    if (Number(priceUsd) <= 0) {
      toast.error("Base price in USD must be greater than 0.");
      return;
    }

    await onSubmit({
      fromId,
      toId,
      vehicleTypeTransferId,
      priceUsd: Number(priceUsd),
    });
  };

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-xs font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] transition disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="route-price-form"
        disabled={isSubmitting}
        className="rounded-xl bg-[#0E4A68] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : isEdit ? "Update Route Price" : "Create Route Price"}
      </button>
    </div>
  );

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Route Price" : "Add Route Price"}
      subtitle="Connect departure and destination locations with a vehicle type and base fare."
      icon={<FiDollarSign className="h-5 w-5 text-[#0E4A68]" />}
      footer={footer}
      widthClassName="max-w-xl"
    >
      <form id="route-price-form" onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Departure Location */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiCornerUpRight className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Departure Location (From)</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            required
          >
            <option value="">Select departure location</option>
            {fromLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Location */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiMapPin className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Destination Location (To)</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            required
          >
            <option value="">Select destination location</option>
            {toLocations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FaCar className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Vehicle Type</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={vehicleTypeTransferId}
            onChange={(e) => setVehicleTypeTransferId(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            required
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.fromPerson}–{v.toPerson} Pax)
              </option>
            ))}
          </select>
        </div>

        {/* Base Price in USD */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]">
            <FiDollarSign className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>Base Route Price (USD $)</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            min="1"
            value={priceUsd}
            onChange={(e) => setPriceUsd(Number(e.target.value))}
            placeholder="e.g. 35"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826]"
            required
          />
        </div>
      </form>
    </SlidePanel>
  );
}
