"use client";

import React, { useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
} from "@/components/adminComp/Shared";
import { useExcursionCategoriesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";
import {
  useCreatePrivateExcursionMutation,
  useDeletePrivateExcursionMutation,
  usePrivateExcursionsQuery,
  useUpdatePrivateExcursionMutation,
} from "@/features/privateExcursions/usePrivateExcursionAdmin";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import {
  buildPrivateExcursionColumns,
  PrivateExcursionAvailabilityPanel,
} from "./components";
import { PrivateExcursionFormPanel } from "./PrivateExcursionFormPanel";

const PAGE_SIZE = 10;

export function PrivateExcursionManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const listQuery = usePrivateExcursionsQuery({
    page,
    pageSize: PAGE_SIZE,
    categoryId: categoryFilter || undefined,
  });

  const categoriesQuery = useExcursionCategoriesQuery({ pageSize: 100 });
  const categoryList = categoriesQuery.data?.items ?? [];

  const createMutation = useCreatePrivateExcursionMutation();
  const updateMutation = useUpdatePrivateExcursionMutation();
  const deleteMutation = useDeletePrivateExcursionMutation();

  const [formTarget, setFormTarget] = useState<PrivateExcursionListItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<PrivateExcursionListItem | null>(null);
  const [availabilityTarget, setAvailabilityTarget] = useState<PrivateExcursionListItem | null>(null);

  const rawItems = listQuery.data?.data?.items ?? [];

  const displayedItems = useMemo(() => {
    if (!search.trim()) return rawItems;
    const q = search.trim().toLowerCase();
    return rawItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.excursionType?.toLowerCase().includes(q) ||
        item.slug?.toLowerCase().includes(q)
    );
  }, [rawItems, search]);

  const totalCount = listQuery.data?.data?.totalCount ?? displayedItems.length;
  const totalPages = Math.max(1, listQuery.data?.data?.totalPages ?? 1);

  const columns = useMemo(
    () =>
      buildPrivateExcursionColumns({
        onManageAvailability: (item) => setAvailabilityTarget(item),
      }),
    []
  );

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <PageHeader
        title="Private Excursions"
        description="Create and manage exclusive tailor-made private tours, operating schedules, attractions and extra services."
        actionLabel="New Private Excursion"
        onAction={() => setFormTarget(null)}
      />

      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search by title, excursion type, or slug..."
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          >
            <option value="">All Excursion Categories</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs font-medium text-[#64748B]">
          Total: <span className="font-semibold text-[#083952]">{totalCount}</span> excursions
        </div>
      </div>

      <DataTable<PrivateExcursionListItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(item: PrivateExcursionListItem) => item.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={search.trim() ? `No excursions match "${search}"` : "No private excursions found"}
        emptyDescription="Try another keyword or create your first private excursion."
        onEdit={(item: PrivateExcursionListItem) => setFormTarget(item)}
        onDelete={(item: PrivateExcursionListItem) => setDeleteTarget(item)}
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

      <PrivateExcursionFormPanel
        open={formTarget !== undefined}
        onClose={() => setFormTarget(undefined)}
        excursion={formTarget}
        onSubmitCreate={(data) => {
          createMutation.mutate(data, {
            onSuccess: () => setFormTarget(undefined),
          });
        }}
        onSubmitUpdate={(data) => {
          updateMutation.mutate(data, {
            onSuccess: () => setFormTarget(undefined),
          });
        }}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <PrivateExcursionAvailabilityPanel
        open={Boolean(availabilityTarget)}
        excursion={availabilityTarget}
        onClose={() => setAvailabilityTarget(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Private Excursion"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Excursion"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default PrivateExcursionManagerComp;
