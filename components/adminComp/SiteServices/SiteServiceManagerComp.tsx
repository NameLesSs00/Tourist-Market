"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiCheckCircle,
  FiClock,
  FiEyeOff,
  FiImage,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { LANG_FLAGS } from "@/models/localization";
import type {
  SiteServiceItem,
  SiteServiceUpsertRequest,
} from "@/models/siteService";
import {
  useCreateSiteServiceMutation,
  useDeleteSiteServiceMutation,
  useSiteServicesQuery,
  useUpdateSiteServiceMutation,
} from "@/features/siteServices/useSiteServices";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { SiteServiceFormPanel } from "./SiteServiceFormPanel";

const PAGE_SIZE = 10;

export function SiteServiceManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formTarget, setFormTarget] = useState<SiteServiceItem | null | undefined>(
    undefined
  );
  const [deleteTarget, setDeleteTarget] = useState<SiteServiceItem | null>(null);

  const listQuery = useSiteServicesQuery({
    search: search.trim() || undefined,
    lang: "en",
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateSiteServiceMutation();
  const updateMutation = useUpdateSiteServiceMutation();
  const deleteMutation = useDeleteSiteServiceMutation();

  const pagedData = listQuery.data;
  const items = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? items.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (data: {
    body: SiteServiceUpsertRequest;
    imageFile?: File | null;
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = (data: {
    id: string;
    body: SiteServiceUpsertRequest;
    imageFile?: File | null;
    removeImage?: boolean;
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

  const columns: DataTableColumn<SiteServiceItem>[] = [
    {
      key: "imageUrl",
      header: "Cover",
      className: "w-20",
      render: (row) => {
        const fullUrl = getBackendImageUrl(row.imageUrl);
        return (
          <div className="relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
            {fullUrl ? (
              <Image
                src={fullUrl}
                alt={row.title || "Service Cover"}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized
              />
            ) : (
              <FiImage className="h-5 w-5 text-[#94A3B8]" />
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
          <span>Service Title</span>
        </span>
      ),
      className: "min-w-[200px]",
      render: (row) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-[#083952]">{row.title || "Untitled"}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "min-w-[260px] max-w-md",
      render: (row) => (
        <p className="line-clamp-2 text-xs text-[#64748B]">
          {row.description || "No description provided."}
        </p>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      className: "w-28",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
              : "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]"
          }`}
        >
          {row.isActive ? (
            <>
              <FiCheckCircle className="h-3 w-3" /> Active
            </>
          ) : (
            <>
              <FiEyeOff className="h-3 w-3" /> Inactive
            </>
          )}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      className: "w-32",
      render: (row) => {
        const dateStr = row.createdAt
          ? new Date(row.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—";
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
            <FiClock className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>{dateStr}</span>
          </span>
        );
      },
    },
  ];

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Services"
        description="Manage platform services, localized details, cover images, and catalog availability."
        actionLabel="Add Service"
        onAction={() => setFormTarget(null)}
      />

      <div className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search site services..."
          />
        </div>
        <div className="text-xs text-[#64748B]">
          Total Services:{" "}
          <span className="font-semibold text-[#083952]">{totalCount}</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={items}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim()
            ? `No services match "${search}"`
            : "No site services yet"
        }
        emptyDescription={
          search.trim()
            ? "Try another search term or clear the search input."
            : "Click “Add Service” to create your first site service."
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

      {formTarget !== undefined && (
        <SiteServiceFormPanel
          open={true}
          serviceItem={formTarget ?? undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Site Service"
        description={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Service"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
