"use client";

import React, { useMemo, useState } from "react";
import { FiDollarSign, FiMapPin, FiTruck } from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { DeliveryProductFormPanel } from "./DeliveryProductFormPanel";
import {
  useDeliveryProductAdmin,
  useDeliveryProductsQuery,
} from "@/features/deliveryProducts/useDeliveryProducts";
import type { DeliveryProductItem } from "@/models/deliveryProduct";

const PAGE_SIZE = 10;

export function DeliveryProductsManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const queryParams = useMemo(() => {
    return {
      isActive:
        statusFilter === "active"
          ? true
          : statusFilter === "inactive"
          ? false
          : undefined,
      language: "en",
      pageNumber: page,
      pageSize: PAGE_SIZE,
    };
  }, [statusFilter, page]);

  const { data, isLoading, isFetching } = useDeliveryProductsQuery(queryParams);

  const { createMutation, updateMutation, deleteMutation } =
    useDeliveryProductAdmin();

  // Slide panel state: undefined = closed, null = create new, item = edit
  const [formTarget, setFormTarget] = useState<DeliveryProductItem | null | undefined>(
    undefined
  );

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<DeliveryProductItem | null>(null);

  // Client-side search filtering if backend search query isn't supported on this endpoint
  const filteredItems = useMemo(() => {
    const items = data?.items || [];
    if (!search.trim()) return items;
    const term = search.toLowerCase();
    return items.filter((item) => item.area.toLowerCase().includes(term));
  }, [data?.items, search]);

  const columns: DataTableColumn<DeliveryProductItem>[] = [
    {
      key: "area",
      header: "Delivery Area",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E4A68]/10 text-[#0E4A68]">
            <FiMapPin className="h-4 w-4" />
          </div>
          <div>
            <span className="font-semibold text-[#0F172A] text-sm">{row.area}</span>
          </div>
        </div>
      ),
    },
    {
      key: "priceUsd",
      header: "Delivery Fee",
      render: (row) => (
        <div className="inline-flex items-center gap-1 font-semibold text-[#0E4A68] text-sm">
          <span>${Number(row.priceUsd || 0).toFixed(2)}</span>
          <span className="text-xs text-[#64748B] font-normal">USD</span>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            row.isActive
              ? "bg-[#DCFCE7] text-[#166534]"
              : "bg-[#F1F5F9] text-[#64748B]"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => (
        <span className="text-xs text-[#64748B]">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 font-poppins">
      {/* ─── Header ─── */}
      <PageHeader
        title="Delivery Pricing"
        description="Define hotel delivery coverage zones and their applicable shipping charges."
        actionLabel="Add Delivery Area"
        onAction={() => setFormTarget(null)}
      />

      {/* ─── Filter Bar ─── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Filter areas by name..."
        />

        {/* Status Filter Tabs */}
        <div className="inline-flex rounded-xl bg-[#F1F5F9] p-1 text-xs font-semibold text-[#64748B]">
          {(["all", "active", "inactive"] as const).map((filterKey) => (
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
              {filterKey}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Data Table ─── */}
      <DataTable
        columns={columns}
        rows={filteredItems}
        getRowKey={(row) => String(row.id)}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No delivery areas found"
        emptyDescription="Create your first delivery area to start charging shipping fees."
        onEdit={(row) => setFormTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
        pagination={
          data
            ? {
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalPages: data.totalPages,
                totalCount: data.totalCount,
                hasPreviousPage: data.hasPreviousPage,
                hasNextPage: data.hasNextPage,
                onPageChange: (newPage) => setPage(newPage),
              }
            : undefined
        }
      />

      {/* ─── Slide Panel Form (Create / Edit) ─── */}
      <DeliveryProductFormPanel
        open={formTarget !== undefined}
        onClose={() => setFormTarget(undefined)}
        item={formTarget}
        onSubmitCreate={(payload) => {
          createMutation.mutate(payload, {
            onSuccess: () => setFormTarget(undefined),
          });
        }}
        onSubmitUpdate={({ id, data: updateData }) => {
          updateMutation.mutate(
            { id, data: updateData },
            {
              onSuccess: () => setFormTarget(undefined),
            }
          );
        }}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* ─── Delete Confirmation Modal ─── */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Delivery Area"
        description={
          deleteTarget ? (
            <span>
              Are you sure you want to remove <strong>{deleteTarget.area}</strong> ($
              {Number(deleteTarget.priceUsd || 0).toFixed(2)})? This action cannot be
              undone.
            </span>
          ) : undefined
        }
        confirmLabel="Delete Area"
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

export default DeliveryProductsManagerComp;

