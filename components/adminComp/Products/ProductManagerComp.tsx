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
  useProductsQuery,
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
  const [formTarget, setFormTarget] = useState<
    ProductListItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] = useState<ProductListItem | null>(null);

  const subcategoriesQuery = useProductSubcategoriesQuery({ pageSize: 100 });
  const subcategories = subcategoriesQuery.data?.items ?? [];

  const subCategoryMap = useMemo(() => {
    const map = new Map<number, string>();
    subcategories.forEach((sub) => map.set(sub.id, sub.name));
    return map;
  }, [subcategories]);

  const listQuery = useProductsQuery({
    subCategoryId: subCategoryFilter || undefined,
    search: search.trim() || undefined,
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();

  const products = listQuery.data?.data?.items ?? [];
  const totalCount = listQuery.data?.data?.totalCount ?? 0;
  const totalPages = listQuery.data?.data?.totalPages ?? 1;

  const columns = useMemo(
    () => createProductColumns({ subCategoryMap }),
    [subCategoryMap]
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage product listings, pricing, subcategory assignment, and photo galleries."
        actionLabel="Add Product"
        onAction={() => setFormTarget(null)}
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

        <div className="flex items-center gap-3">
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
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle="No products found"
        emptyDescription="Create a product or adjust your filters."
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
    </div>
  );
}
