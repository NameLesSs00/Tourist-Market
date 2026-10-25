"use client";

import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ConfirmDialog, DataTable } from "@/components/adminComp/Shared";
import {
  getVehicleTypeLabel,
  type TransferRoutePriceItem,
  type TransferRoutePriceUpsertRequest,
} from "@/models/transferRoutePrice";
import {
  useCreateTransferRoutePriceMutation,
  useDeleteTransferRoutePriceMutation,
  useTransferRoutePricesQuery,
  useUpdateTransferRoutePriceMutation,
} from "@/features/transferRoutePrices/useTransferRoutePriceAdmin";
import {
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import {
  createTransferRoutePriceColumns,
  TransferRoutePriceFilters,
  type TransferRoutePriceFilterState,
} from "./components";
import { TransferRoutePriceFormPanel } from "./TransferRoutePriceFormPanel";

const PAGE_SIZE = 10;

export function TransferRoutePriceList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TransferRoutePriceFilterState>({});
  const [formTarget, setFormTarget] = useState<TransferRoutePriceItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<TransferRoutePriceItem | null>(null);

  const fromLocationsQuery = useTransferFromLocationsQuery({ pageSize: 100 });
  const toLocationsQuery = useTransferToLocationsQuery({ pageSize: 100 });
  const fromLocations = fromLocationsQuery.data?.data?.items ?? [];
  const toLocations = toLocationsQuery.data?.data?.items ?? [];

  const queryParams = useMemo(
    () => ({
      pageNumber: page,
      pageSize: PAGE_SIZE,
      fromLocationId: filters.fromLocationId,
      toLocationId: filters.toLocationId,
      vehicleType: filters.vehicleType,
      isActive: filters.isActive,
    }),
    [page, filters]
  );

  const routePricesQuery = useTransferRoutePricesQuery(queryParams);
  const items = routePricesQuery.data?.items ?? [];
  const totalCount = routePricesQuery.data?.totalCount ?? 0;
  const totalPages = routePricesQuery.data?.totalPages ?? 1;

  const createMutation = useCreateTransferRoutePriceMutation();
  const updateMutation = useUpdateTransferRoutePriceMutation();
  const deleteMutation = useDeleteTransferRoutePriceMutation();

  const columns = useMemo(() => createTransferRoutePriceColumns(), []);

  const handleCreate = (body: TransferRoutePriceUpsertRequest) => {
    createMutation.mutate(body, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleUpdate = (id: string, body: TransferRoutePriceUpsertRequest) => {
    updateMutation.mutate({ id, body }, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className="space-y-4">
      {/* Filters Toolbar & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <TransferRoutePriceFilters
          filters={filters}
          onChange={(f) => {
            setFilters(f);
            setPage(1);
          }}
          onReset={() => {
            setFilters({});
            setPage(1);
          }}
          fromLocations={fromLocations}
          toLocations={toLocations}
        />
        <button
          type="button"
          onClick={() => setFormTarget(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0E4A68] px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#083952] cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          <span>Add Route Price</span>
        </button>
      </div>

      {/* Route Prices Table */}
      <DataTable<TransferRoutePriceItem>
        columns={columns}
        rows={items}
        getRowKey={(row) => row.id}
        isLoading={routePricesQuery.isLoading}
        isFetching={routePricesQuery.isFetching}
        emptyTitle="No route prices found"
        emptyDescription="Configure your first route price to establish transfer rates between locations."
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

      {/* Slide Drawer for Create / Edit */}
      {formTarget !== undefined && (
        <TransferRoutePriceFormPanel
          open={formTarget !== undefined}
          item={formTarget ?? undefined}
          fromLocations={fromLocations}
          toLocations={toLocations}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Route Price"
        description={`Are you sure you want to delete the rate from "${deleteTarget?.fromLocationName || "Pickup"}" to "${deleteTarget?.toLocationName || "Destination"}" for ${deleteTarget ? getVehicleTypeLabel(deleteTarget.vehicleType) : "this vehicle"}? This action cannot be undone.`}
        confirmLabel="Delete Rate"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
