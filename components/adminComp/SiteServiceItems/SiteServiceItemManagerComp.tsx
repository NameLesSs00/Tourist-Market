"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
} from "@/components/adminComp/Shared";
import type { SiteServiceItem } from "@/models/siteService";
import type {
  SiteServiceSubItem,
  SiteServiceSubItemUpsertRequest,
} from "@/models/siteServiceItem";
import {
  useCreateSiteServiceSubItemMutation,
  useDeleteSiteServiceSubItemMutation,
  useDeletedSiteServiceSubItemsQuery,
  useRestoreSiteServiceSubItemMutation,
  useSiteServiceSubItemsQuery,
  useUpdateSiteServiceSubItemMutation,
} from "@/features/siteServiceItems/useSiteServiceItems";
import { useSiteServicesQuery } from "@/features/siteServices/useSiteServices";
import { SiteServiceItemFormPanel } from "./SiteServiceItemFormPanel";
import { createSiteServiceItemColumns } from "./components";

const PAGE_SIZE = 10;

export function SiteServiceItemManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "deleted">("all");
  const [formTarget, setFormTarget] = useState<SiteServiceSubItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<SiteServiceSubItem | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<SiteServiceSubItem | null>(null);

  const isDeletedTab = statusFilter === "deleted";

  const siteServicesQuery = useSiteServicesQuery({ pageSize: 100 });
  const siteServices: SiteServiceItem[] = siteServicesQuery.data?.items ?? [];

  const serviceMap = useMemo(() => {
    const map = new Map<string, string>();
    siteServices.forEach((svc) => {
      map.set(svc.id, svc.title);
    });
    return map;
  }, [siteServices]);

  const activeQuery = useSiteServiceSubItemsQuery(
    {
      serviceId: serviceFilter || undefined,
      search: search.trim() || undefined,
      isActive:
        statusFilter === "active"
          ? true
          : statusFilter === "inactive"
          ? false
          : undefined,
      lang: "en",
      pageNumber: page,
      pageSize: PAGE_SIZE,
    },
    { enabled: !isDeletedTab }
  );

  const deletedQuery = useDeletedSiteServiceSubItemsQuery(
    {
      serviceId: serviceFilter || undefined,
      search: search.trim() || undefined,
      pageNumber: page,
      pageSize: PAGE_SIZE,
    },
    { enabled: isDeletedTab }
  );

  const createMutation = useCreateSiteServiceSubItemMutation();
  const updateMutation = useUpdateSiteServiceSubItemMutation();
  const deleteMutation = useDeleteSiteServiceSubItemMutation();
  const restoreMutation = useRestoreSiteServiceSubItemMutation();

  const currentQuery = isDeletedTab ? deletedQuery : activeQuery;
  const pagedData = currentQuery.data;
  const items = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? items.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const columns = useMemo(
    () =>
      createSiteServiceItemColumns({
        serviceMap,
        isDeletedView: isDeletedTab,
        onRestore: (item) => setRestoreTarget(item),
        isRestoring: restoreMutation.isPending,
      }),
    [serviceMap, isDeletedTab, restoreMutation.isPending]
  );

  const handleCreateSubmit = (data: {
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleUpdateSubmit = (data: {
    id: string;
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
    deletedImageIds?: string[];
  }) => {
    updateMutation.mutate(data, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const handleRestoreConfirm = () => {
    if (!restoreTarget) return;
    restoreMutation.mutate(restoreTarget.id, {
      onSuccess: () => setRestoreTarget(null),
    });
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Service Items"
        description="Manage service options, vehicles, rentals, packages, perks, and gallery photos."
        actionLabel={isDeletedTab ? undefined : "Add Item"}
        onAction={isDeletedTab ? undefined : () => setFormTarget(null)}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:max-w-xs">
            <SearchInput
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              placeholder="Search items..."
            />
          </div>

          <div className="w-full sm:max-w-xs">
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            >
              <option value="">All Parent Site Services</option>
              {siteServices.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.title || "Untitled Service"}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div className="inline-flex rounded-xl bg-[#F1F5F9] p-1 text-xs font-semibold text-[#64748B]">
            {(["all", "active", "inactive", "deleted"] as const).map((filterKey) => (
              <button
                key={filterKey}
                type="button"
                onClick={() => {
                  setStatusFilter(filterKey);
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-1.5 capitalize transition-all cursor-pointer ${
                  statusFilter === filterKey
                    ? "bg-white text-[#0F172A] shadow-xs"
                    : "hover:text-[#0F172A]"
                }`}
              >
                {filterKey === "active"
                  ? "Published"
                  : filterKey === "inactive"
                  ? "Unpublished"
                  : filterKey === "deleted"
                  ? "Deleted"
                  : "All"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#64748B]">
          Total Items: <span className="font-semibold text-[#083952]">{totalCount}</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={items}
        getRowKey={(row) => row.id}
        isLoading={currentQuery.isLoading}
        isFetching={currentQuery.isFetching}
        emptyTitle={
          isDeletedTab
            ? "No deleted items"
            : search.trim() || serviceFilter || statusFilter !== "all"
            ? "No items match current filters"
            : "No site service items yet"
        }
        emptyDescription={
          isDeletedTab
            ? "There are no deleted site service items in the trash."
            : search.trim() || serviceFilter || statusFilter !== "all"
            ? "Try adjusting search or selecting a different status or parent service."
            : "Click Add Item to create your first site service item."
        }
        showRowNumber={true}
        onEdit={isDeletedTab ? undefined : (row) => setFormTarget(row)}
        onDelete={isDeletedTab ? undefined : (row) => setDeleteTarget(row)}
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

      {formTarget !== undefined && (
        <SiteServiceItemFormPanel
          open={true}
          item={formTarget ?? undefined}
          defaultServiceId={serviceFilter || undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Site Service Item"
        description={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All attached gallery images, options, and features will also be removed.`}
        confirmLabel="Delete Item"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={Boolean(restoreTarget)}
        title="Restore Site Service Item"
        description={`Restore "${restoreTarget?.title}"? The item will be moved back to inactive (unpublished) and can be re-activated from the main list.`}
        confirmLabel="Restore Item"
        isLoading={restoreMutation.isPending}
        onConfirm={handleRestoreConfirm}
        onCancel={() => setRestoreTarget(null)}
      />
    </div>
  );
}
