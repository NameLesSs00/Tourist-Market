"use client";

import React, { useMemo, useState } from "react";
import {
  FiClock,
  FiMapPin,
  FiNavigation,
  FiPercent,
  FiPlus,
} from "react-icons/fi";
import { toast } from "sonner";
import { ConfirmDialog, DataTable, type DataTableColumn } from "@/components/adminComp/Shared";
import {
  useCreateTransferVehiclePriceMutation,
  useDeleteTransferVehiclePriceMutation,
  useTransferVehiclePricesQuery,
  useUpdateTransferVehiclePriceMutation,
} from "@/features/transferVehiclePrices/useTransferVehiclePriceAdmin";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import { useVehicleTypeTransfersQuery } from "@/features/vehicleTypeTransfers/useVehicleTypeTransferAdmin";
import type {
  CreateTransferVehiclePriceRequest,
  TransferVehiclePriceItem,
} from "@/models/transferVehiclePrice";
import { TransferVehiclePriceFormPanel } from "./TransferVehiclePriceFormPanel";
import { getVehicleTypeIcon } from "./vehicleIconHelper";

const PAGE_SIZE = 10;

export function TransferVehiclePriceList() {
  const [page, setPage] = useState(1);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("");
  const [selectedFrom, setSelectedFrom] = useState<string>("");
  const [selectedTo, setSelectedTo] = useState<string>("");
  const [formTarget, setFormTarget] = useState<TransferVehiclePriceItem | null | undefined>(
    undefined
  );
  const [deleteTarget, setDeleteTarget] = useState<TransferVehiclePriceItem | null>(null);

  const { data: vehiclePricesData, isLoading } = useTransferVehiclePricesQuery({
    VehicleTypeTransferId: selectedVehicleType || undefined,
    PageSize: 100,
  });

  const fromLocationsQuery = useTransferFromLocationsQuery({ pageSize: 100, lang: "en" });
  const toLocationsQuery = useTransferToLocationsQuery({ pageSize: 100, lang: "en" });
  const vehicleTypesQuery = useVehicleTypeTransfersQuery({ pageSize: 100 });

  const fromLocations = fromLocationsQuery.data?.data?.items ?? [];
  const toLocations = toLocationsQuery.data?.data?.items ?? [];
  const vehicleTypes = vehicleTypesQuery.data?.items ?? [];

  const createMutation = useCreateTransferVehiclePriceMutation();
  const updateMutation = useUpdateTransferVehiclePriceMutation();
  const deleteMutation = useDeleteTransferVehiclePriceMutation();

  const allItems = vehiclePricesData?.items || [];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (selectedFrom && item.fromId !== selectedFrom) return false;
      if (selectedTo && item.toId !== selectedTo) return false;
      return true;
    });
  }, [allItems, selectedFrom, selectedTo]);

  const totalCount = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const handleFormSubmit = async (req: CreateTransferVehiclePriceRequest) => {
    try {
      if (formTarget) {
        await updateMutation.mutateAsync({
          id: formTarget.id,
          body: req,
        });
        toast.success("Route price updated successfully.");
      } else {
        await createMutation.mutateAsync(req);
        toast.success("Route price created successfully.");
      }
      setFormTarget(undefined);
    } catch {
      // Handled by mutation onError
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Route price deleted successfully.");
      setDeleteTarget(null);
    } catch {
      // Handled by mutation onError
    }
  };

  const columns: DataTableColumn<TransferVehiclePriceItem>[] = [
    {
      key: "route",
      header: "Route (From → To)",
      className: "w-[40%]",
      render: (row) => {
        const fromName =
          row.fromLocation ||
          fromLocations.find((l) => l.id === row.fromId)?.name ||
          "Departure Point";
        const toName =
          row.toLocation ||
          toLocations.find((l) => l.id === row.toId)?.name ||
          "Destination Point";

        return (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-[#083952]">
              <FiMapPin className="h-3 w-3 text-[#0E4A68] shrink-0" />
              <span>{fromName}</span>
            </span>
            <span className="hidden sm:inline text-[#94A3B8]">→</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#64748B]">
              <FiNavigation className="h-3 w-3 text-[#206F97] shrink-0" />
              <span>{toName}</span>
            </span>
          </div>
        );
      },
    },
    {
      key: "vehicle",
      header: "Vehicle Type",
      className: "w-[20%]",
      render: (row) => {
        const VehicleIcon = getVehicleTypeIcon(row.vehicleTypeName);
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0E4A6820] bg-[#0E4A6810] px-2.5 py-1 text-xs font-semibold text-[#0E4A68]">
            <VehicleIcon className="h-3 w-3" />
            <span>{row.vehicleTypeName || "Vehicle"}</span>
          </span>
        );
      },
    },
    {
      key: "price",
      header: "Base Price",
      className: "w-[15%]",
      render: (row) => (
        <span className="font-bold text-[#083952]">
          ${row.priceUsd} <span className="text-[10px] text-[#64748B] font-normal">USD</span>
        </span>
      ),
    },
    {
      key: "additionalHours",
      header: "Extra Hour",
      className: "w-[12%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2 py-0.5 text-xs font-medium text-[#334155]">
          <FiClock className="h-3 w-3 text-[#64748B]" />
          <span>${row.additionalHours}/hr</span>
        </span>
      ),
    },
    {
      key: "discount",
      header: "Discount",
      className: "w-[13%]",
      render: (row) => (
        <span className="inline-flex items-center gap-0.5 rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2 py-0.5 text-xs font-bold text-[#047857]">
          <FiPercent className="h-3 w-3" />
          <span>{row.discountPercentage}%</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#083952]">Route Prices</h2>
          <p className="text-xs text-[#64748B]">
            Configure fixed transfer fares connecting departure points, destinations, and vehicle categories.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTarget(null)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] transition cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          <span>Add Route Price</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
        <select
          value={selectedVehicleType}
          onChange={(e) => {
            setSelectedVehicleType(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6826]"
        >
          <option value="">All Vehicle Types</option>
          {vehicleTypes.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <select
          value={selectedFrom}
          onChange={(e) => {
            setSelectedFrom(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6826]"
        >
          <option value="">All Departure Points</option>
          {fromLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <select
          value={selectedTo}
          onChange={(e) => {
            setSelectedTo(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#0E4A68] focus:ring-2 focus:ring-[#0E4A6826]"
        >
          <option value="">All Destinations</option>
          {toLocations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <DataTable<TransferVehiclePriceItem>
        columns={columns}
        rows={paginatedItems}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No route prices configured"
        emptyDescription="Click 'Add Route Price' to connect locations with vehicle pricing."
        onEdit={(row) => setFormTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
        pagination={{
          pageNumber: currentPage,
          pageSize: PAGE_SIZE,
          totalPages,
          totalCount,
          hasPreviousPage: currentPage > 1,
          hasNextPage: currentPage < totalPages,
          onPageChange: setPage,
        }}
      />

      <TransferVehiclePriceFormPanel
        open={formTarget !== undefined}
        onClose={() => setFormTarget(undefined)}
        onSubmit={handleFormSubmit}
        initialData={formTarget}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Route Price"
        description={`Are you sure you want to delete this route price? This action cannot be undone.`}
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete"}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
