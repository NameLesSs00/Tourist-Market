"use client";

import React, { useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
} from "@/components/adminComp/Shared";
import type {
  VehiclePrivateItem,
  VehiclePrivateUpsertRequest,
} from "@/models/vehiclePrivate";
import {
  useCreateVehiclePrivateMutation,
  useDeleteVehiclePrivateMutation,
  useUpdateVehiclePrivateMutation,
  useVehiclePrivatesQuery,
} from "@/features/vehiclePrivate/useVehiclePrivateAdmin";
import { createVehiclePrivateColumns } from "./components";
import { VehiclePrivateFormPanel } from "./VehiclePrivateFormPanel";

const PAGE_SIZE = 10;

export function VehiclePrivateManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>(undefined);
  const [formTarget, setFormTarget] = useState<VehiclePrivateItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<VehiclePrivateItem | null>(null);

  const queryParams = useMemo(
    () => ({
      pageNumber: page,
      pageSize: PAGE_SIZE,
      isActive: activeFilter,
      lang: "en",
    }),
    [page, activeFilter]
  );

  const listQuery = useVehiclePrivatesQuery(queryParams);
  const items = listQuery.data?.data?.items ?? [];
  const totalCount = listQuery.data?.data?.totalCount ?? 0;
  const totalPages = listQuery.data?.data?.totalPages ?? 1;

  const displayedItems = useMemo(() => {
    if (!search.trim()) return items;
    const term = search.toLowerCase().trim();
    return items.filter((i) => i.name?.toLowerCase().includes(term));
  }, [items, search]);

  const createMutation = useCreateVehiclePrivateMutation();
  const updateMutation = useUpdateVehiclePrivateMutation();
  const deleteMutation = useDeleteVehiclePrivateMutation();

  const columns = useMemo(() => createVehiclePrivateColumns(), []);

  const handleCreate = (body: VehiclePrivateUpsertRequest) => {
    createMutation.mutate(body, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleUpdate = (id: string, body: VehiclePrivateUpsertRequest) => {
    updateMutation.mutate({ id, body }, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vehicle Private"
        description="Manage vehicles available for private excursions and services."
        actionLabel="Add Vehicle Private"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search vehicles by name..."
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={
              activeFilter === true
                ? "true"
                : activeFilter === false
                ? "false"
                : ""
            }
            onChange={(e) => {
              setActiveFilter(
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : undefined
              );
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0E4A68] cursor-pointer shadow-2xs"
          >
            <option value="">All Statuses</option>
            <option value="true">Active Only</option>
            <option value="false">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Vehicles Table */}
      <DataTable<VehiclePrivateItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle="No vehicles found"
        emptyDescription={
          search.trim()
            ? `No vehicles match "${search}".`
            : "Click 'Add Vehicle Private' to configure your first vehicle."
        }
        showRowNumber={true}
        onEdit={(item) => setFormTarget(item)}
        onDelete={(item) => setDeleteTarget(item)}
        pagination={{
          pageNumber: page,
          pageSize: PAGE_SIZE,
          totalPages,
          totalCount,
          hasPreviousPage: page > 1,
          hasNextPage: page < totalPages,
          onPageChange: setPage,
        }}
      />

      {/* Slide Drawer for Create/Edit */}
      {formTarget !== undefined && (
        <VehiclePrivateFormPanel
          open={formTarget !== undefined}
          vehicle={formTarget ?? undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Vehicle Private"
        description={`Are you sure you want to delete vehicle "${deleteTarget?.name}"? Private tours or services using this vehicle may be affected.`}
        confirmLabel="Delete Vehicle"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
