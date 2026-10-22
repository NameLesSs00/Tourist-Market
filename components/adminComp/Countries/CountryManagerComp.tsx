"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { FiEdit2, FiGlobe, FiHash, FiPhone, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { CountryFormPanel } from "./CountryFormPanel";
import {
  useCountriesQuery,
  useCreateCountryMutation,
  useDeleteCountryMutation,
  useUpdateCountryMutation,
} from "@/features/countries/useCountryAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type { CountryItem, CountryUpsertRequest } from "@/models/country";

const PAGE_SIZE = 10;

export function CountryManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Query: always displays English in the main management table
  const listQuery = useCountriesQuery("en");
  const countries = listQuery.data ?? [];

  // Mutations
  const createMutation = useCreateCountryMutation();
  const updateMutation = useUpdateCountryMutation();
  const deleteMutation = useDeleteCountryMutation();

  // Slide panel state: undefined = closed; null = create; object = edit
  const [formTarget, setFormTarget] = useState<CountryItem | null | undefined>(
    undefined
  );

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CountryItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  // Filter countries client-side by name, code, or phoneCode
  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.trim().toLowerCase();
    return countries.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.code?.toLowerCase().includes(q) ||
        c.phoneCode?.toLowerCase().includes(q)
    );
  }, [countries, search]);

  // Client-side pagination
  const totalCount = filteredCountries.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filteredCountries.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleCreateSubmit = (body: CountryUpsertRequest) => {
    createMutation.mutate(body, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleUpdateSubmit = ({
    id,
    body,
  }: {
    id: string;
    body: CountryUpsertRequest;
  }) => {
    updateMutation.mutate(
      { id, body },
      {
        onSuccess: () => setFormTarget(undefined),
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Full-width columns configuration
  const columns: DataTableColumn<CountryItem>[] = [
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
          <span>Country Name</span>
        </span>
      ),
      className: "w-[45%]",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E4A6814] text-xs font-bold text-[#0E4A68]">
            {row.code ? row.code.slice(0, 2).toUpperCase() : <FiGlobe className="h-4 w-4" />}
          </div>
          <span className="font-semibold text-[#083952]">
            {row.name || "Untitled Country"}
          </span>
        </div>
      ),
    },
    {
      key: "code",
      header: "Country Code",
      className: "w-[25%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono font-semibold text-[#0E4A68]">
          <FiHash className="h-3 w-3 text-[#94A3B8]" />
          <span>{row.code || "—"}</span>
        </span>
      ),
    },
    {
      key: "phoneCode",
      header: "Phone Calling Code",
      className: "w-[30%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-mono font-medium text-[#334155]">
          <FiPhone className="h-3 w-3 text-[#94A3B8]" />
          <span>{row.phoneCode || "—"}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Countries & Dialing Codes"
        description="Manage platform countries, ISO identifiers, and international phone calling prefixes."
        actionLabel="Add Country"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search countries by name, code, or dialing prefix..."
        />

        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          total
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
        rows={paginatedRows}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search ? "No countries match your search" : "No countries configured yet"
        }
        emptyDescription={
          search
            ? "Try another keyword or clear the search filter."
            : "Click “Add Country” to create your first country entry."
        }
        onEdit={(row) => setFormTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
        pagination={{
          pageNumber: currentPage,
          pageSize: PAGE_SIZE,
          totalPages,
          totalCount,
          hasPreviousPage: currentPage > 1,
          hasNextPage: currentPage < totalPages,
          onPageChange: setPage,
        }}
      />

      {/* Create / Edit Country Slide Panel */}
      {formTarget !== undefined && (
        <CountryFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          country={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={
            createMutation.isPending || updateMutation.isPending
          }
        />
      )}

      {/* Delete Country Confirmation Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this country?"
        description={
          deleteTarget ? (
            <>
              “<span className="font-semibold">{deleteTarget.name}</span>” (Code:{" "}
              <span className="font-mono">{deleteTarget.code}</span>) will be
              permanently deleted from all platform dropdowns.
            </>
          ) : (
            "This country will be permanently deleted."
          )
        }
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default CountryManagerComp;
