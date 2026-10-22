"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FiHash,
  FiImage,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { ExcursionServiceFormPanel } from "./ExcursionServiceFormPanel";
import {
  useCreateExcursionServiceMutation,
  useDeleteExcursionServiceMutation,
  useExcursionServicesQuery,
  useUpdateExcursionServiceMutation,
} from "@/features/excursionServices/useExcursionServices";
import { LANG_FLAGS } from "@/models/localization";
import type {
  ExcursionServiceItem,
  ExcursionServiceUpsertRequest,
} from "@/models/excursionService";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const PAGE_SIZE = 10;

export function ExcursionServiceManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const listQuery = useExcursionServicesQuery({
    lang: "en",
    currency: "USD",
    page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateExcursionServiceMutation();
  const updateMutation = useUpdateExcursionServiceMutation();
  const deleteMutation = useDeleteExcursionServiceMutation();

  const [formTarget, setFormTarget] = useState<
    ExcursionServiceItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<ExcursionServiceItem | null>(null);

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
    body: ExcursionServiceUpsertRequest;
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
    body: ExcursionServiceUpsertRequest;
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
      onSuccess: () => {
        setDeleteTarget(null);
      },
    });
  };

  const columns: DataTableColumn<ExcursionServiceItem>[] = [
    {
      key: "hero",
      header: "Photo",
      className: "w-20",
      render: (item) => {
        const heroUrl = getBackendImageUrl(item.heroImage);
        return (
          <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-[#E2E8F0] bg-slate-100 shrink-0">
            {heroUrl ? (
              <Image
                src={heroUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[#94A3B8]">
                <FiImage className="h-5 w-5" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "title",
      header: "Service Option",
      render: (item) => (
        <div className="min-w-[200px] max-w-sm">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[#083952]">{item.title}</span>
          </div>
          {item.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-[#64748B]">
              {item.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "pricing",
      header: "Base Price (USD)",
      render: (item) => (
        <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0E4A68]">
          <span className="rounded-md border border-[#0E4A6820] bg-[#0E4A680A] px-2.5 py-1">
            ${Number(item.basePriceUSD ?? item.basePrice ?? 0).toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      key: "order",
      header: "Order",
      render: (item) => (
        <span className="inline-flex items-center gap-1 rounded-md bg-[#F1F5F9] px-2 py-0.5 text-xs font-mono font-medium text-[#475569]">
          <FiHash className="h-3 w-3" />
          {item.displayOrder ?? 0}
        </span>
      ),
    },
    {
      key: "gallery",
      header: "Gallery",
      render: (item) => {
        const count = item.images?.length ?? item.imageUrls?.length ?? 0;
        return (
          <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
            <FiImage className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>{count} {count === 1 ? "photo" : "photos"}</span>
          </span>
        );
      },
    },
    {
      key: "languages",
      header: "Languages",
      render: () => (
        <div className="flex items-center gap-1">
          {(["en", "ru", "de", "fr"] as const).map((lang) => (
            <span
              key={lang}
              className="relative flex h-3.5 w-5 overflow-hidden rounded-xs border border-[#E2E8F0]"
              title={lang.toUpperCase()}
            >
              <Image
                src={LANG_FLAGS[lang]}
                alt={lang}
                fill
                className="object-cover"
                sizes="20px"
              />
            </span>
          ))}
        </div>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Excursion Services"
          description="Manage add-on options, rental equipment, upgrades, and experiences for excursions."
          actionLabel="Add Service Option"
          onAction={() => {}}
        />
        <div className="h-64 w-full animate-pulse rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Excursion Services"
        description="Manage add-on options, rental equipment, upgrades, and experiences for excursions."
        actionLabel="Add Service Option"
        onAction={() => setFormTarget(null)}
      />

      {/* Filter / Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-80">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search service options..."
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          service options
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

      {/* Full-width Data Table */}
      <DataTable
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim()
            ? `No service options match "${search}"`
            : "No excursion service options found"
        }
        emptyDescription={
          search.trim()
            ? "Try another keyword or clear the search input."
            : "Click 'Add Service Option' to configure your first upgrade or excursion add-on."
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
          onPageChange: (newPage) => setPage(newPage),
        }}
      />

      {/* Form Slide Panel Drawer */}
      {formTarget !== undefined && (
        <ExcursionServiceFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          serviceItem={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Service Option"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to permanently delete &ldquo;
              <span className="font-semibold">{deleteTarget.title}</span>&rdquo;?
              Any excursions referencing this service option will no longer display it.
            </>
          ) : (
            "Are you sure you want to delete this service option?"
          )
        }
        confirmLabel="Delete Option"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default ExcursionServiceManagerComp;
