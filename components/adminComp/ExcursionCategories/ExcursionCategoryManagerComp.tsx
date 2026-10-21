"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FiCompass,
  FiFilter,
  FiFolder,
  FiHash,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { ExcursionCategoryFormPanel } from "./ExcursionCategoryFormPanel";
import {
  fillMissingCategoryLanguages,
  useCreateExcursionCategoryMutation,
  useDeleteExcursionCategoryMutation,
  useExcursionCategoriesQuery,
  useUpdateExcursionCategoryMutation,
} from "@/features/excursionCategories/useExcursionCategoryAdmin";
import { LANG_FLAGS } from "@/models/faq";
import type {
  ExcursionCategoryCreateRequest,
  ExcursionCategoryItem,
  ExcursionCategoryUpdateRequest,
} from "@/models/excursionCategory";

const PAGE_SIZE = 10;

type StatusFilter = "all" | "active" | "suspended";

export function ExcursionCategoryManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Query: always displays English in the main management table
  const listQuery = useExcursionCategoriesQuery({
    search: search.trim() || undefined,
    lang: "en",
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  // Mutations
  const createMutation = useCreateExcursionCategoryMutation();
  const updateMutation = useUpdateExcursionCategoryMutation();
  const deleteMutation = useDeleteExcursionCategoryMutation();

  // Slide panel state: undefined = closed; null = create; object = edit
  const [formTarget, setFormTarget] = useState<
    ExcursionCategoryItem | null | undefined
  >(undefined);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] =
    useState<ExcursionCategoryItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const pagedData = listQuery.data;
  const rawItems = pagedData?.items ?? [];

  // Filter items by active/suspended status if selected
  const displayedItems = useMemo(() => {
    if (statusFilter === "all") return rawItems;
    if (statusFilter === "active") {
      return rawItems.filter((cat) => cat.isActive !== false);
    }
    return rawItems.filter((cat) => cat.isActive === false);
  }, [rawItems, statusFilter]);

  const totalCount = pagedData?.totalCount ?? displayedItems.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (body: ExcursionCategoryCreateRequest) => {
    const sanitizedBody: ExcursionCategoryCreateRequest = {
      ...body,
      name: fillMissingCategoryLanguages(body.name),
    };

    createMutation.mutate(sanitizedBody, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = ({
    id,
    body,
  }: {
    id: string;
    body: ExcursionCategoryUpdateRequest;
  }) => {
    const sanitizedBody: ExcursionCategoryUpdateRequest = {
      ...body,
      name: fillMissingCategoryLanguages(body.name),
    };

    updateMutation.mutate(
      { id, body: sanitizedBody },
      {
        onSuccess: () => {
          setFormTarget(undefined);
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return "—";
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  // Full-width columns configuration
  const columns: DataTableColumn<ExcursionCategoryItem>[] = [
    {
      key: "name",
      header: (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
            <Image
              src={LANG_FLAGS.en}
              alt="English"
              fill
              className="object-cover"
              sizes="16px"
            />
          </span>
          <span>Category Name</span>
        </span>
      ),
      className: "w-[40%]",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E4A6812] text-[#0E4A68]">
            <FiCompass className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#083952]">
              {row.name || "Untitled Category"}
            </p>
            {row.slug && (
              <span className="inline-block truncate font-mono text-[11px] text-[#64748B]">
                /{row.slug}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "displayOrder",
      header: "Display Order",
      className: "w-[15%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono font-semibold text-[#0E4A68]">
          <FiHash className="h-3 w-3 text-[#94A3B8]" />
          <span>{row.displayOrder ?? 0}</span>
        </span>
      ),
    },
    {
      key: "noOfItems",
      header: "Excursions",
      className: "w-[15%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-medium text-[#334155]">
          <FiFolder className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>{row.noOfItems ?? 0} tours</span>
        </span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      className: "w-[15%]",
      render: (row) => {
        const active = row.isActive !== false;
        return active ? (
          <span className="inline-flex items-center rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-xs font-medium text-[#059669]">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-medium text-[#B45309]">
            Suspended
          </span>
        );
      },
    },
    {
      key: "createdAt",
      header: "Created Date",
      className: "w-[15%]",
      render: (row) => (
        <span className="text-xs text-[#64748B]">
          {formatDate(row.createdAt)}
        </span>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Excursion Categories"
          description="Organize experiences, tours, and activities by category with multilingual support."
          actionLabel="Add Category"
          onAction={() => {}}
        />
        <div className="h-64 w-full animate-pulse rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Excursion Categories"
        description="Organize experiences, tours, and activities by category with multilingual support."
        actionLabel="Add Category"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search categories by name..."
          />

          {/* Status filter dropdown */}
          <div className="relative inline-flex items-center">
            <FiFilter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94A3B8]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              aria-label="Filter by status"
              className="h-10 rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-8 text-xs font-medium text-[#334155] shadow-2xs transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active only</option>
              <option value="suspended">Suspended only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          categories
          <span className="text-[#CBD5E1]">·</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-2.5 py-0.5 text-xs font-medium text-[#0E4A68] shadow-2xs">
            <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
              <Image
                src={LANG_FLAGS.en}
                alt="English"
                fill
                className="object-cover"
                sizes="16px"
              />
            </span>
            Showing English
          </span>
        </div>
      </div>

      {/* Full-Width Data Table */}
      <DataTable
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim()
            ? `No categories match "${search}"`
            : "No excursion categories yet"
        }
        emptyDescription={
          search.trim()
            ? "Try clearing your search query or adjusting your filters."
            : "Create your first excursion category to start grouping experiences."
        }
        showRowNumber={true}
        onEdit={(row) => setFormTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
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

      {/* Slide Panel for Create & Edit */}
      {formTarget !== undefined && (
        <ExcursionCategoryFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          category={formTarget ?? null}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Excursion Category"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to delete “
              <span className="font-semibold">{deleteTarget.name}</span>”? Any
              excursions assigned to this category may lose their grouping.
            </>
          ) : (
            "Are you sure you want to delete this category?"
          )
        }
        confirmLabel="Delete Category"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default ExcursionCategoryManagerComp;
