"use client";

import React, { useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  ExcursionFaqsPanel,
  ExcursionImagesPanel,
  PageHeader,
  SearchInput,
} from "@/components/adminComp/Shared";
import { useExcursionCategoriesQuery } from "@/features/excursionCategories/useExcursionCategoryAdmin";
import {
  useCreateGroupExcursionMutation,
  useDeleteGroupExcursionMutation,
  useGroupExcursionsQuery,
  useUpdateGroupExcursionMutation,
} from "@/features/groupExcursions/useGroupExcursionAdmin";
import type { GroupExcursionListItem } from "@/models/groupExcursion";
import { ExcursionDetailsPanel, PrivateExcursionAvailabilityPanel } from "@/components/adminComp/PrivateExcursions/components";
import { buildGroupExcursionColumns } from "./components";
import { GroupExcursionFormPanel } from "./GroupExcursionFormPanel";

const PAGE_SIZE = 10;

export function GroupExcursionManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const listQuery = useGroupExcursionsQuery({
    page,
    pageSize: PAGE_SIZE,
    categoryId: categoryFilter || undefined,
  });

  const categoriesQuery = useExcursionCategoriesQuery({ pageSize: 100 });
  const categoryList = categoriesQuery.data?.items ?? [];

  const createMutation = useCreateGroupExcursionMutation();
  const updateMutation = useUpdateGroupExcursionMutation();
  const deleteMutation = useDeleteGroupExcursionMutation();

  const [formTarget, setFormTarget] = useState<GroupExcursionListItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<GroupExcursionListItem | null>(null);
  const [detailsTarget, setDetailsTarget] = useState<{ id: string; title: string } | null>(null);
  const [photosTarget, setPhotosTarget] = useState<GroupExcursionListItem | null>(null);
  const [availabilityTarget, setAvailabilityTarget] = useState<GroupExcursionListItem | null>(null);
  const [faqsTarget, setFaqsTarget] = useState<GroupExcursionListItem | null>(null);

  const rawItems = listQuery.data?.items ?? [];

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

  const totalCount = listQuery.data?.totalCount ?? displayedItems.length;
  const totalPages = Math.max(1, listQuery.data?.totalPages ?? 1);

  const columns = useMemo(
    () =>
      buildGroupExcursionColumns({
        onManageDetails: (item) => setDetailsTarget({ id: item.id, title: item.title }),
        onManagePhotos: (item) => setPhotosTarget(item),
        onManageAvailability: (item) => setAvailabilityTarget(item),
        onManageFaqs: (item) => setFaqsTarget(item),
      }),
    [setDetailsTarget, setPhotosTarget, setAvailabilityTarget, setFaqsTarget]
  );

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <PageHeader
        title="Group Excursions"
        description="Create and manage scheduled group tours, per-person rates (adult, child, infant), photos, hero banners, and detailed itineraries."
        actionLabel="New Group Excursion"
        onAction={() => setFormTarget(null)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={(val) => { setSearch(val); setPage(1); }}
            placeholder="Search group tours by title, type, or slug..."
          />
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-3.5 py-2.5 text-xs text-[#0F172A] outline-none transition focus:border-[#0E4A68]"
          >
            <option value="">All Excursion Categories</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="text-xs font-medium text-[#64748B]">
          Total: <span className="font-semibold text-[#083952]">{totalCount}</span> group tours
        </div>
      </div>

      <DataTable<GroupExcursionListItem>
        columns={columns}
        rows={displayedItems}
        getRowKey={(item) => item.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={search.trim() ? `No excursions match "${search}"` : "No group excursions found"}
        emptyDescription="Create your first group tour with per-person pricing and rich itineraries."
        onEdit={(item) => setFormTarget(item)}
        onDelete={(item) => setDeleteTarget(item)}
        pagination={{
          pageNumber: page,
          pageSize: PAGE_SIZE,
          totalPages,
          totalCount,
          hasPreviousPage: page > 1,
          hasNextPage: page < totalPages,
          onPageChange: (newPage) => setPage(newPage),
        }}
      />

      <GroupExcursionFormPanel
        open={formTarget !== undefined}
        onClose={() => setFormTarget(undefined)}
        excursion={formTarget}
        onSubmitCreate={(data) => {
          createMutation.mutate(data, {
            onSuccess: (res) => {
              setFormTarget(undefined);
              const createdId = res?.id || (res as any)?.data?.id;
              if (createdId) {
                setDetailsTarget({ id: createdId, title: data.title.en || "New Excursion" });
              }
            },
          });
        }}
        onSubmitUpdate={(data) => {
          updateMutation.mutate(data, { onSuccess: () => setFormTarget(undefined) });
        }}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ExcursionDetailsPanel open={Boolean(detailsTarget)} excursion={detailsTarget} onClose={() => setDetailsTarget(null)} />
      <PrivateExcursionAvailabilityPanel open={Boolean(availabilityTarget)} excursion={availabilityTarget} onClose={() => setAvailabilityTarget(null)} />
      <ExcursionImagesPanel open={Boolean(photosTarget)} excursion={photosTarget} onClose={() => setPhotosTarget(null)} />
      <ExcursionFaqsPanel open={Boolean(faqsTarget)} excursion={faqsTarget} onClose={() => setFaqsTarget(null)} />
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Group Excursion"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Excursion"
        isLoading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default GroupExcursionManagerComp;
