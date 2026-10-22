"use client";

import React, { useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
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
import {
  createTransferLocationColumns,
  TransferLocationTabs,
} from "./components";
import { TransferLocationFormPanel } from "./TransferLocationFormPanel";

const PAGE_SIZE = 10;

export function TransferLocationManagerComp() {
  const [activeTab, setActiveTab] = useState<TransferLocationType>("from");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formTarget, setFormTarget] = useState<TransferLocationItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<TransferLocationItem | null>(null);

  const fromQuery = useTransferFromLocationsQuery({
    pageNumber: activeTab === "from" ? page : 1,
    pageSize: PAGE_SIZE,
    lang: "en",
  });
  const toQuery = useTransferToLocationsQuery({
    pageNumber: activeTab === "to" ? page : 1,
    pageSize: PAGE_SIZE,
    lang: "en",
  });

  const activeQuery = activeTab === "from" ? fromQuery : toQuery;
  const items = activeQuery.data?.data?.items ?? [];
  const fromCount = fromQuery.data?.data?.totalCount ?? 0;
  const toCount = toQuery.data?.data?.totalCount ?? 0;
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
    const mut = activeTab === "from" ? createFrom : createTo;
    mut.mutate(body, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleUpdate = (id: string, body: TransferLocationUpsertRequest) => {
    const mut = activeTab === "from" ? updateFrom : updateTo;
    mut.mutate({ id, body }, { onSuccess: () => setFormTarget(undefined) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const mut = activeTab === "from" ? deleteFrom : deleteTo;
    mut.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  const isMutating =
    createFrom.isPending || updateFrom.isPending || createTo.isPending || updateTo.isPending;
  const isDeleting = deleteFrom.isPending || deleteTo.isPending;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transfer Locations"
        description="Manage pickup (departure) and destination (drop-off) points for transfer routes."
        actionLabel={activeTab === "from" ? "Add Pickup Location" : "Add Destination Location"}
        onAction={() => setFormTarget(null)}
      />

      {/* Tabs & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TransferLocationTabs
          activeTab={activeTab}
          onTabChange={(t) => {
            setActiveTab(t);
            setPage(1);
            setSearch("");
          }}
          fromCount={fromCount}
          toCount={toCount}
        />
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search active locations..."
          />
        </div>
      </div>

      {/* Locations Table */}
      <DataTable<TransferLocationItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => row.id}
        isLoading={activeQuery.isLoading}
        isFetching={activeQuery.isFetching}
        emptyTitle={activeTab === "from" ? "No pickup locations found" : "No destination locations found"}
        emptyDescription={
          search.trim() ? `No locations match "${search}".` : "Click add to configure your first location."
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

      {/* Slide Drawer */}
      {formTarget !== undefined && (
        <TransferLocationFormPanel
          open={formTarget !== undefined}
          locationType={activeTab}
          location={formTarget ?? undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={isMutating}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={activeTab === "from" ? "Delete Pickup Location" : "Delete Destination Location"}
        description={`Are you sure you want to delete "${deleteTarget?.name}"? Routes using this location may be affected.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
