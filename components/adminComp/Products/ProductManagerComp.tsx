"use client";

import React, { useMemo, useState } from "react";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
} from "@/components/adminComp/Shared";
import type { ProductListItem, ProductUpsertRequest } from "@/models/product";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useDeletedProductsQuery,
  useProductsQuery,
  useRestoreProductMutation,
  useUpdateProductMutation,
} from "@/features/products/useProductAdmin";
import { useProductSubcategoriesQuery } from "@/features/productSubcategories/useProductSubcategories";
import { createProductColumns } from "./components";
import { ProductFormPanel } from "./ProductFormPanel";

const PAGE_SIZE = 10;

export function ProductManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<"all" | "deleted">("all");
  const [formTarget, setFormTarget] = useState<
    ProductListItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<ProductListItem | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<ProductListItem | null>(null);

  const isDeletedTab = statusFilter === "deleted";

  const subcategoriesQuery = useProductSubcategoriesQuery({ pageSize: 100 });
  const subcategories = subcategoriesQuery.data?.items ?? [];

  const subCategoryMap = useMemo(() => {
    const map = new Map<number, string>();
    subcategories.forEach((sub) => map.set(sub.id, sub.name));
    return map;
  }, [subcategories]);

  const activeQuery = useProductsQuery(
    {
      subCategoryId: subCategoryFilter || undefined,
      search: search.trim() || undefined,
      pageNumber: page,
      pageSize: PAGE_SIZE,
    },
    { enabled: !isDeletedTab }
  );

  const deletedQuery = useDeletedProductsQuery(
    {
      subCategoryId: subCategoryFilter || undefined,
      search: search.trim() || undefined,
      pageNumber: page,
      pageSize: PAGE_SIZE,
    },
    { enabled: isDeletedTab }
  );

  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();
  const restoreMutation = useRestoreProductMutation();

  const currentQuery = isDeletedTab ? deletedQuery : activeQuery;
  const pagedData = currentQuery.data?.data;
  const products = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? 0;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const columns = useMemo(
    () =>
      createProductColumns({
        subCategoryMap,
        isDeletedView: isDeletedTab,
        onRestore: (item) => setRestoreTarget(item),
        isRestoring: restoreMutation.isPending,
      }),
    [subCategoryMap, isDeletedTab, restoreMutation.isPending]
  );

  const handleCreate = (data: {
    body: ProductUpsertRequest;
    newImages?: File[];
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleUpdate = (data: {
    id: number;
    body: ProductUpsertRequest;
    newImages?: File[];
    deletedImageIds?: number[];
  }) => {
    updateMutation.mutate(data, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const handleRestoreConfirm = () => {
    if (!restoreTarget) return;
    restoreMutation.mutate(restoreTarget.id, {
      onSuccess: () => setRestoreTarget(null),
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage product listings, pricing, subcategory assignment, and photo galleries."
        actionLabel={isDeletedTab ? undefined : "Add Product"}
        onAction={isDeletedTab ? undefined : () => setFormTarget(null)}
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-[#0E4A6815] bg-white p-4 shadow-2xs">
        <SearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search products by title or subtitle..."
        />

        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={subCategoryFilter}
            onChange={(e) => {
              setSubCategoryFilter(Number(e.target.value) || 0);
              setPage(1);
            }}
            className="rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs font-medium text-[#083952] transition-colors focus:border-[#0E4A68] focus:outline-none"
          >
            <option value={0}>All Subcategories</option>
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Status Filter Tabs */}
          <div className="inline-flex rounded-xl bg-[#F1F5F9] p-1 text-xs font-semibold text-[#64748B]">
            {(["all", "deleted"] as const).map((filterKey) => (
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
                {filterKey === "deleted" ? "Deleted" : "All"}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#64748B] whitespace-nowrap">
            <strong className="text-[#083952]">{totalCount}</strong> products
          </span>
        </div>
      </div>

      {/* Full-Width Data Table */}
      <DataTable<ProductListItem>
        columns={columns}
        rows={products}
        getRowKey={(row) => String(row.id)}
        isLoading={currentQuery.isLoading}
        isFetching={currentQuery.isFetching}
        emptyTitle={
          isDeletedTab
            ? "No deleted products"
            : search.trim() || subCategoryFilter
            ? "No products match current filters"
            : "No products found"
        }
        emptyDescription={
          isDeletedTab
            ? "There are no deleted products in the trash."
            : search.trim() || subCategoryFilter
            ? "Try adjusting search or selecting a different subcategory."
            : "Create a product or adjust your filters."
        }
        showRowNumber={true}
        onEdit={isDeletedTab ? undefined : (row) => setFormTarget(row)}
        onDelete={isDeletedTab ? undefined : (row) => setDeleteTarget(row)}
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
        <ProductFormPanel
          open={formTarget !== undefined}
          product={formTarget ?? undefined}
          onClose={() => setFormTarget(undefined)}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Restore Confirmation */}
      <ConfirmDialog
        open={Boolean(restoreTarget)}
        title="Restore Product"
        description={`Restore "${restoreTarget?.title}"? The product will be moved back to the main list as inactive and can be re-activated from there.`}
        confirmLabel="Restore Product"
        isLoading={restoreMutation.isPending}
        onConfirm={handleRestoreConfirm}
        onCancel={() => setRestoreTarget(null)}
      />
    </div>
  );
}
