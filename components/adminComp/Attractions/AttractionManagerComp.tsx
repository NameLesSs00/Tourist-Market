"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FiDollarSign,
  FiHash,
  FiImage,
  FiMapPin,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { AttractionFormPanel } from "./AttractionFormPanel";
import {
  useAttractionsQuery,
  useCreateAttractionMutation,
  useDeleteAttractionMutation,
  useUpdateAttractionMutation,
} from "@/features/attractions/useAttractionAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type {
  AttractionItem,
  AttractionUpsertRequest,
} from "@/models/attraction";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const PAGE_SIZE = 10;

export function AttractionManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const listQuery = useAttractionsQuery({
    lang: "en",
    currency: "USD",
    page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateAttractionMutation();
  const updateMutation = useUpdateAttractionMutation();
  const deleteMutation = useDeleteAttractionMutation();

  const [formTarget, setFormTarget] = useState<
    AttractionItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<AttractionItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const pagedData = listQuery.data;
  const rawItems = pagedData?.items ?? [];

  // Filter client-side by search query
  const displayedItems = useMemo(() => {
    if (!search.trim()) return rawItems;
    const q = search.trim().toLowerCase();
    return rawItems.filter(
      (item) =>
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [rawItems, search]);

  const totalCount = pagedData?.totalCount ?? displayedItems.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (data: {
    body: AttractionUpsertRequest;
    heroFile?: File | null;
    galleryFiles?: File[];
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = (data: {
    id: string;
    body: AttractionUpsertRequest;
    heroFile?: File | null;
    removeHero?: boolean;
    newGalleryFiles?: File[];
    deletedGalleryImageIds?: string[];
  }) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Full-width columns configuration
  const columns: DataTableColumn<AttractionItem>[] = [
    {
      key: "heroImage",
      header: "Cover",
      className: "w-[80px]",
      render: (row) => {
        const fullUrl = getBackendImageUrl(row.heroImage);
        return (
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
            {fullUrl ? (
              <Image
                src={fullUrl}
                alt={row.title || "Attraction Cover"}
                fill
                className="object-cover"
                sizes="48px"
                unoptimized
              />
            ) : (
              <FiMapPin className="h-5 w-5 text-[#94A3B8]" />
            )}
          </div>
        );
      },
    },
    {
      key: "title",
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
          <span>Attraction & Details</span>
        </span>
      ),
      className: "w-[40%]",
      render: (row) => (
        <div className="min-w-0 pr-4">
          <p className="truncate font-semibold text-[#083952]">
            {row.title || "Untitled Attraction"}
          </p>
          {row.description && (
            <p className="line-clamp-1 text-xs text-[#64748B] mt-0.5">
              {row.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "displayOrder",
      header: "Order",
      className: "w-[12%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono font-semibold text-[#0E4A68]">
          <FiHash className="h-3 w-3 text-[#94A3B8]" />
          <span>{row.displayOrder ?? 0}</span>
        </span>
      ),
    },
    {
      key: "pricing",
      header: "Pricing (USD)",
      className: "w-[24%]",
      render: (row) => (
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="rounded-md border border-[#E2E8F0] bg-white px-2 py-0.5 font-medium text-[#0E4A68]">
            Adult: ${row.adultPriceUsd ?? 0}
          </span>
          <span className="rounded-md border border-[#E2E8F0] bg-white px-2 py-0.5 font-medium text-[#334155]">
            Child: ${row.childPriceUsd ?? 0}
          </span>
          <span className="rounded-md border border-[#E2E8F0] bg-white px-2 py-0.5 font-medium text-[#64748B]">
            Infant: ${row.infantPriceUsd ?? 0}
          </span>
        </div>
      ),
    },
    {
      key: "gallery",
      header: "Gallery",
      className: "w-[14%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-medium text-[#334155]">
          <FiImage className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>{row.images?.length ?? 0} photos</span>
        </span>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Attractions & Add-ons"
          description="Manage tour attractions, VIP lounge upgrades, and optional excursion enhancements."
          actionLabel="Add Attraction"
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
        title="Attractions & Add-ons"
        description="Manage tour attractions, VIP lounge upgrades, and optional excursion enhancements."
        actionLabel="Add Attraction"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search attractions by title or description..."
        />

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          attractions
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
            ? `No attractions match "${search}"`
            : "No attractions created yet"
        }
        emptyDescription={
          search.trim()
            ? "Try another keyword or clear the search input."
            : "Click “Add Attraction” to configure your first upgrade or excursion add-on."
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
        <AttractionFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          attraction={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Attraction"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to permanently delete “
              <span className="font-semibold">{deleteTarget.title}</span>”? Any
              excursions offering this add-on will no longer display it.
            </>
          ) : (
            "Are you sure you want to delete this attraction?"
          )
        }
        confirmLabel="Delete Attraction"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default AttractionManagerComp;
