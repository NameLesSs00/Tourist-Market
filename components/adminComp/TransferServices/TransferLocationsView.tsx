"use client";

import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  SearchInput,
} from "@/components/adminComp/Shared";
import type {
  TransferLocationItem,
  TransferLocationType,
  TransferLocationUpsertRequest,
} from "@/models/transferLocation";
import {
  useCreateTransferFromLocationMutation,
  useCreateTransferToLocationMutation,
  useDeleteTransferFromLocationMutation,
  useDeleteTransferToLocationMutation,
  useTransferFromLocationsQuery,
  useTransferToLocationsQuery,
  useUpdateTransferFromLocationMutation,
  useUpdateTransferToLocationMutation,
} from "@/features/transferLocations/useTransferLocationAdmin";
import { createTransferLocationColumns } from "@/components/adminComp/TransferLocations/components";
import { TransferLocationFormPanel } from "@/components/adminComp/TransferLocations/TransferLocationFormPanel";

const PAGE_SIZE = 10;

interface TransferLocationsViewProps {
  locationType: TransferLocationType;
}

export function TransferLocationsView({ locationType }: TransferLocationsViewProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formTarget, setFormTarget] = useState<TransferLocationItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<TransferLocationItem | null>(null);

  const fromQuery = useTransferFromLocationsQuery({
    pageNumber: locationType === "from" ? page : 1,
    pageSize: PAGE_SIZE,
    lang: "en",
  });
  const toQuery = useTransferToLocationsQuery({
    pageNumber: locationType === "to" ? page : 1,
    pageSize: PAGE_SIZE,
    lang: "en",
  });

  const activeQuery = locationType === "from" ? fromQuery : toQuery;
  const items = activeQuery.data?.data?.items ?? [];
  const totalCount = activeQuery.data?.data?.totalCount ?? 0;
  const totalPages = activeQuery.data?.data?.totalPages ?? 1;

  const displayedItems = useMemo(() => {
    if (!search.trim()) return items;
    const term = search.toLowerCase().trim();
    return items.filter((i) => i.name?.toLowerCase().includes(term));
  }, [items, search]);

  const createFrom = useCreateTransferFromLocationMutation();
  const updateFrom = useUpdateTransferFromLocationMutation();
  const deleteFrom = useDeleteTransferFromLocationMutation();

  const createTo = useCreateTransferToLocationMutation();
  const updateTo = useUpdateTransferToLocationMutation();
  const deleteTo = useDeleteTransferToLocationMutation();

  const columns = useMemo(() => createTransferLocationColumns(), []);

  const handleCreate = (body: TransferLocationUpsertRequest) => {
    const mut = locationType === "from" ? createFrom : createTo;
    mut.mutate(body, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleUpdate = (id: string, body: TransferLocationUpsertRequest) => {
    const mut = locationType === "from" ? updateFrom : updateTo;
    mut.mutate({ id, body }, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const mut = locationType === "from" ? deleteFrom : deleteTo;
    mut.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  const isMutating =
    createFrom.isPending || updateFrom.isPending || createTo.isPending || updateTo.isPending;
  const isDeleting = deleteFrom.isPending || deleteTo.isPending;
  const isFrom = locationType === "from";

  return (
    <div className="space-y-4">
      {/* Search Toolbar & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder={isFrom ? "Search pickup locations..." : "Search destination locations..."}
          />
        </div>
        <button
          type="button"
          onClick={() => setFormTarget(null)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#0E4A68] px-4 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#083952] cursor-pointer"
        >
          <FiPlus className="h-4 w-4" />
          <span>{isFrom ? "Add Pickup Location" : "Add Destination Location"}</span>
        </button>
      </div>

      {/* Locations Table */}
      <DataTable<TransferLocationItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => row.id}
        isLoading={activeQuery.isLoading}
        isFetching={activeQuery.isFetching}
        emptyTitle={isFrom ? "No pickup locations found" : "No destination locations found"}
        emptyDescription={
          search.trim() ? `No locations match "${search}".` : "Add your first location to get started."
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

      {/* Slide Drawer for Location Form */}
      {formTarget !== undefined && (
        <TransferLocationFormPanel
          open={formTarget !== undefined}
          locationType={locationType}
          location={formTarget ?? undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={isMutating}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={isFrom ? "Delete Pickup Location" : "Delete Destination Location"}
        description={`Are you sure you want to delete "${deleteTarget?.name}"? Routes using this location may be affected.`}
        confirmLabel="Delete Location"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
