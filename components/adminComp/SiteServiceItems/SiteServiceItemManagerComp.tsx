"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEyeOff,
  FiImage,
  FiLayers,
  FiList,
  FiSliders,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { LANG_FLAGS } from "@/models/localization";
import type { SiteServiceItem } from "@/models/siteService";
import type {
  SiteServiceSubItem,
  SiteServiceSubItemUpsertRequest,
} from "@/models/siteServiceItem";
import {
  useCreateSiteServiceSubItemMutation,
  useDeleteSiteServiceSubItemMutation,
  useSiteServiceSubItemsQuery,
  useUpdateSiteServiceSubItemMutation,
} from "@/features/siteServiceItems/useSiteServiceItems";
import { useSiteServicesQuery } from "@/features/siteServices/useSiteServices";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { SiteServiceItemFormPanel } from "./SiteServiceItemFormPanel";

const PAGE_SIZE = 10;

export function SiteServiceItemManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [formTarget, setFormTarget] = useState<
    SiteServiceSubItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<SiteServiceSubItem | null>(
    null
  );

  // Fetch parent site services for filter and name resolution
  const siteServicesQuery = useSiteServicesQuery({ pageSize: 100 });
  const siteServices: SiteServiceItem[] =
    siteServicesQuery.data?.items ?? [];

  const serviceMap = useMemo(() => {
    const map = new Map<string, string>();
    siteServices.forEach((svc) => {
      map.set(svc.id, svc.title);
    });
    return map;
  }, [siteServices]);

  // Query site service items
  const listQuery = useSiteServiceSubItemsQuery({
    serviceId: serviceFilter || undefined,
    search: search.trim() || undefined,
    lang: "en",
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateSiteServiceSubItemMutation();
  const updateMutation = useUpdateSiteServiceSubItemMutation();
  const deleteMutation = useDeleteSiteServiceSubItemMutation();

  const pagedData = listQuery.data;
  const items = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? items.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (data: {
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = (data: {
    id: string;
    body: SiteServiceSubItemUpsertRequest;
    newGalleryFiles?: File[];
    deletedImageIds?: string[];
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

  const columns: DataTableColumn<SiteServiceSubItem>[] = [
    {
      key: "photo",
      header: "Photo",
      className: "w-20",
      render: (item) => {
        const coverImg = item.images?.[0]?.imageUrl;
        const fullUrl = getBackendImageUrl(coverImg);
        return (
          <div className="relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
            {fullUrl ? (
              <Image
                src={fullUrl}
                alt={item.title || "Item Cover"}
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
          <span>Item Title</span>
        </span>
      ),
      className: "min-w-[180px]",
      render: (item) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-[#083952]">{item.title}</p>
          {item.subtitle && (
            <p className="text-[11px] text-[#64748B] line-clamp-1">
              {item.subtitle}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "parentService",
      header: "Parent Site Service",
      className: "min-w-[180px]",
      render: (item) => {
        const parentName = serviceMap.get(item.serviceId);
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0E4A6820] bg-[#0E4A680A] px-2.5 py-1 text-xs font-semibold text-[#0E4A68]">
            <FiLayers className="h-3 w-3 text-[#0E4A68]" />
            <span>{parentName || "Unknown Service"}</span>
          </span>
        );
      },
    },
    {
      key: "price",
      header: "Base Price",
      className: "w-28",
      render: (item) => (
        <span className="inline-flex items-center gap-1 font-semibold text-[#083952]">
          <FiDollarSign className="h-3.5 w-3.5 text-[#D48C28]" />
          <span>{item.basePriceUSD?.toFixed(2) ?? "0.00"}</span>
        </span>
      ),
    },
    {
      key: "options",
      header: "Options",
      className: "w-28",
      render: (item) => {
        const count = item.options?.length ?? 0;
        return (
          <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
            <FiSliders className="h-3 w-3 text-[#94A3B8]" />
            <span>{count} variation{count !== 1 ? "s" : ""}</span>
          </span>
        );
      },
    },
    {
      key: "features",
      header: "Features",
      className: "w-28",
      render: (item) => {
        const count = item.features?.length ?? 0;
        return (
          <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
            <FiList className="h-3 w-3 text-[#94A3B8]" />
            <span>{count} perk{count !== 1 ? "s" : ""}</span>
          </span>
        );
      },
    },
    {
      key: "isActive",
      header: "Status",
      className: "w-28",
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            item.isActive
              ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
              : "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]"
          }`}
        >
          {item.isActive ? (
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
      render: (item) => {
        const dateStr = item.createdAt
          ? new Date(item.createdAt).toLocaleDateString(undefined, {
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
        title="Site Service Items"
        description="Manage service options, vehicles, rentals, packages, perks, and gallery photos."
        actionLabel="Add Item"
        onAction={() => setFormTarget(null)}
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
        </div>

        <div className="text-xs text-[#64748B]">
          Total Items:{" "}
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
          search.trim() || serviceFilter
            ? "No items match current filters"
            : "No site service items yet"
        }
        emptyDescription={
          search.trim() || serviceFilter
            ? "Try adjusting search or selecting a different parent service."
            : "Click “Add Item” to create your first site service item."
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
    </div>
  );
}
