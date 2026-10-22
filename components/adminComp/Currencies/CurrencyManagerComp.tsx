"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiDollarSign,
  FiFilter,
  FiHash,
  FiTrendingUp,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { CurrencyFormPanel } from "./CurrencyFormPanel";
import {
  useCreateCurrencyMutation,
  useCurrenciesQuery,
  useDeleteCurrencyMutation,
  useUpdateCurrencyMutation,
} from "@/features/currencies/useCurrencyAdmin";
import type {
  CurrencyItem,
  CurrencyUpsertRequest,
} from "@/models/currency";

const PAGE_SIZE = 10;

type StatusFilter = "all" | "active" | "inactive";

export function CurrencyManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const queryParams = useMemo(() => {
    const p: Record<string, any> = {
      pageNumber: page,
      pageSize: PAGE_SIZE,
    };
    if (statusFilter === "active") p.isActive = true;
    if (statusFilter === "inactive") p.isActive = false;
    return p;
  }, [page, statusFilter]);

  const listQuery = useCurrenciesQuery(queryParams);

  // Mutations
  const createMutation = useCreateCurrencyMutation();
  const updateMutation = useUpdateCurrencyMutation();
  const deleteMutation = useDeleteCurrencyMutation();

  // Slide panel state: undefined = closed; null = create; object = edit
  const [formTarget, setFormTarget] = useState<
    CurrencyItem | null | undefined
  >(undefined);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CurrencyItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const pagedData = listQuery.data;
  const rawItems = pagedData?.items ?? [];

  // Filter client-side by search query (currency code or name)
  const displayedItems = useMemo(() => {
    if (!search.trim()) return rawItems;
    const q = search.trim().toLowerCase();
    return rawItems.filter(
      (c) =>
        c.code?.toLowerCase().includes(q) ||
        c.name?.toLowerCase().includes(q) ||
        c.symbol?.toLowerCase().includes(q)
    );
  }, [rawItems, search]);

  const totalCount = pagedData?.totalCount ?? displayedItems.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (body: CurrencyUpsertRequest) => {
    createMutation.mutate(body, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = ({
    id,
    body,
  }: {
    id: number;
    body: CurrencyUpsertRequest;
  }) => {
    updateMutation.mutate(
      { id, body },
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
  const columns: DataTableColumn<CurrencyItem>[] = [
    {
      key: "currency",
      header: "Currency",
      className: "w-[35%]",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E4A6812] text-xs font-mono font-bold text-[#0E4A68]">
            {row.code || <FiDollarSign className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#083952]">
              {row.name || "Untitled Currency"}
            </p>
            <span className="font-mono text-[11px] text-[#64748B]">
              ISO: {row.code}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "symbol",
      header: "Symbol",
      className: "w-[15%]",
      render: (row) => (
        <span className="inline-flex items-center justify-center rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono font-bold text-[#0E4A68]">
          {row.symbol || "—"}
        </span>
      ),
    },
    {
      key: "exchangeRate",
      header: "Exchange Rate",
      className: "w-[20%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono font-semibold text-[#334155]">
          <FiTrendingUp className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>{Number(row.exchangeRate).toFixed(4)}</span>
        </span>
      ),
    },
    {
      key: "status",
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
            Inactive
          </span>
        );
      },
    },
    {
      key: "updatedAt",
      header: "Last Updated",
      className: "w-[15%]",
      render: (row) => (
        <span className="text-xs text-[#64748B]">
          {formatDate(row.updatedAt)}
        </span>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Currencies & Exchange Rates"
          description="Manage platform supported currencies, conversion exchange rates, and active states."
          actionLabel="Add Currency"
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
        title="Currencies & Exchange Rates"
        description="Manage platform supported currencies, conversion exchange rates, and active states."
        actionLabel="Add Currency"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search currencies by code, name, or symbol..."
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
              <option value="inactive">Inactive only</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          currencies configured
        </div>
      </div>

      {/* Full-Width Data Table */}
      <DataTable
        columns={columns}
        rows={displayedItems}
        getRowKey={(row) => String(row.id)}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim()
            ? `No currencies match "${search}"`
            : "No currencies configured yet"
        }
        emptyDescription={
          search.trim()
            ? "Try another search keyword or clear the search input."
            : "Click “Add Currency” to define your first supported currency."
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
        <CurrencyFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          currency={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Currency"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to delete “
              <span className="font-semibold">{deleteTarget.code}</span> -{" "}
              {deleteTarget.name}”? Any transactions or price listings linked
              to this currency may be affected.
            </>
          ) : (
            "Are you sure you want to delete this currency?"
          )
        }
        confirmLabel="Delete Currency"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default CurrencyManagerComp;
