"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FiClock, FiPercent, FiPlus, FiUsers } from "react-icons/fi";
import { toast } from "sonner";
import { ConfirmDialog, DataTable, type DataTableColumn } from "@/components/adminComp/Shared";
import {
  useCreateVehicleTypeTransferMutation,
  useDeleteVehicleTypeTransferMutation,
  useUpdateVehicleTypeTransferMutation,
  useVehicleTypeTransfersQuery,
} from "@/features/vehicleTypeTransfers/useVehicleTypeTransferAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type {
  CreateVehicleTypeTransferRequest,
  VehicleTypeTransferItem,
} from "@/models/vehicleTypeTransfer";
import { VehicleTypeFormPanel } from "./VehicleTypeFormPanel";
import { getVehicleTypeIcon } from "./vehicleIconHelper";

const PAGE_SIZE = 10;

export function VehicleTypeList() {
  const [page, setPage] = useState(1);
  const [formTarget, setFormTarget] = useState<VehicleTypeTransferItem | null | undefined>(
    undefined
  );
  const [deleteTarget, setDeleteTarget] = useState<VehicleTypeTransferItem | null>(null);

  const { data, isLoading } = useVehicleTypeTransfersQuery({
    pageSize: 100,
  });

  const createMutation = useCreateVehicleTypeTransferMutation();
  const updateMutation = useUpdateVehicleTypeTransferMutation();
  const deleteMutation = useDeleteVehicleTypeTransferMutation();

  const allItems = data?.items || [];
  const totalCount = allItems.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return allItems.slice(start, start + PAGE_SIZE);
  }, [allItems, currentPage]);

  const handleFormSubmit = async (req: CreateVehicleTypeTransferRequest) => {
    try {
      if (formTarget) {
        await updateMutation.mutateAsync({
          id: formTarget.id,
          body: req,
        });
        toast.success(`Vehicle type "${req.name.en}" updated successfully.`);
      } else {
        await createMutation.mutateAsync(req);
        toast.success(`Vehicle type "${req.name.en}" created successfully.`);
      }
      setFormTarget(undefined);
    } catch {
      // Errors handled by mutation onError
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success(`Vehicle type "${deleteTarget.name}" deleted successfully.`);
      setDeleteTarget(null);
    } catch {
      // Errors handled by mutation onError
    }
  };

  const columns: DataTableColumn<VehicleTypeTransferItem>[] = [
    {
      key: "name",
      header: (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
            <Image src={LANG_FLAGS.en} alt="English" fill className="object-cover" sizes="16px" />
          </span>
          <span>Vehicle Name</span>
        </span>
      ),
      className: "w-[35%]",
      render: (row) => {
        const VehicleIcon = getVehicleTypeIcon(row.name, row.toPerson);
        return (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E4A6814] text-[#0E4A68]">
              <VehicleIcon className="h-4 w-4" />
            </div>
            <span className="font-semibold text-[#083952]">
              {row.name || "Unnamed Vehicle"}
            </span>
          </div>
        );
      },
    },
    {
      key: "capacity",
      header: "Capacity Range",
      className: "w-[25%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-2.5 py-1 text-xs font-semibold text-[#1D4ED8]">
          <FiUsers className="h-3 w-3" />
          <span>{row.fromPerson} – {row.toPerson} Pax</span>
        </span>
      ),
    },
    {
      key: "additionalHours",
      header: "Hourly Rate",
      className: "w-[20%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-semibold text-[#334155]">
          <FiClock className="h-3 w-3 text-[#64748B]" />
          <span>${row.additionalHours} / hr</span>
        </span>
      ),
    },
    {
      key: "discountPercentage",
      header: "Discount",
      className: "w-[20%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-1 text-xs font-bold text-[#047857]">
          <FiPercent className="h-3 w-3" />
          <span>{row.discountPercentage}% off</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#083952]">Vehicle Types</h2>
          <p className="text-xs text-[#64748B]">
            Configure vehicle categories, passenger limits, additional hourly rates, and discounts.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTarget(null)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#083952] transition cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          <span>Add Vehicle Type</span>
        </button>
      </div>

      <DataTable<VehicleTypeTransferItem>
        columns={columns}
        rows={paginatedItems}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="No vehicle types configured"
        emptyDescription="Click 'Add Vehicle Type' to set up your first transfer vehicle category."
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

      <VehicleTypeFormPanel
        open={formTarget !== undefined}
        onClose={() => setFormTarget(undefined)}
        onSubmit={handleFormSubmit}
        initialData={formTarget}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Vehicle Type"
        description={`Are you sure you want to delete vehicle type "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={deleteMutation.isPending ? "Deleting..." : "Delete"}
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
