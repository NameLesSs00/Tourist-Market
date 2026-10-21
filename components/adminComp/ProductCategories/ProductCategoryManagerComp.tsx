"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  FiHash,
  FiImage,
  FiLayers,
  FiShoppingBag,
} from "react-icons/fi";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { ProductCategoryFormPanel } from "./ProductCategoryFormPanel";
import {
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useProductCategoriesQuery,
  useUpdateProductCategoryMutation,
} from "@/features/productCategories/useProductCategoryAdmin";
import { LANG_FLAGS } from "@/models/faq";
import type {
  ProductCategoryItem,
  ProductCategoryUpsertRequest,
} from "@/models/productCategory";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const PAGE_SIZE = 10;

export function ProductCategoryManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Query: always displays English in the main management table
  const listQuery = useProductCategoriesQuery({
    search: search.trim() || undefined,
    lang: "en",
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  // Mutations
  const createMutation = useCreateProductCategoryMutation();
  const updateMutation = useUpdateProductCategoryMutation();
  const deleteMutation = useDeleteProductCategoryMutation();

  // Slide panel state: undefined = closed; null = create; object = edit
  const [formTarget, setFormTarget] = useState<
    ProductCategoryItem | null | undefined
  >(undefined);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] =
    useState<ProductCategoryItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const pagedData = listQuery.data;
  const items = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? items.length;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (data: {
    body: ProductCategoryUpsertRequest;
    imageFile?: File | null;
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setFormTarget(undefined);
      },
    });
  };

  const handleUpdateSubmit = (data: {
    id: number;
    body: ProductCategoryUpsertRequest;
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

  // Full-width columns configuration
  const columns: DataTableColumn<ProductCategoryItem>[] = [
    {
      key: "imageUrl",
      header: "Cover Image",
      className: "w-[120px]",
      render: (row) => {
        const fullUrl = getBackendImageUrl(row.imageUrl);
        return (
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
            {fullUrl ? (
              <Image
                src={fullUrl}
                alt={row.name || "Category Image"}
                fill
                className="object-cover"
                sizes="48px"
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
      className: "w-[50%]",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-semibold text-[#083952]">
            {row.name || "Untitled Category"}
          </p>
        </div>
      ),
    },
    {
      key: "displayOrder",
      header: "Display Order",
      className: "w-[20%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-mono font-semibold text-[#0E4A68]">
          <FiHash className="h-3 w-3 text-[#94A3B8]" />
          <span>{row.displayOrder ?? 0}</span>
        </span>
      ),
    },
    {
      key: "noOfItems",
      header: "Products",
      className: "w-[20%]",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-1 text-xs font-medium text-[#334155]">
          <FiShoppingBag className="h-3.5 w-3.5 text-[#94A3B8]" />
          <span>{row.noOfItems ?? 0} items</span>
        </span>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Product Categories"
          description="Manage marketplace product categories, cover images, display order, and multilingual names."
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
        title="Product Categories"
        description="Manage marketplace product categories, cover images, display order, and multilingual names."
        actionLabel="Add Category"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search product categories by name..."
        />

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
        rows={items}
        getRowKey={(row) => String(row.id)}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim()
            ? `No categories match "${search}"`
            : "No product categories yet"
        }
        emptyDescription={
          search.trim()
            ? "Try another search term or clear the search input."
            : "Click “Add Category” to create your first store product category."
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
        <ProductCategoryFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          category={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Product Category"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to delete “
              <span className="font-semibold">{deleteTarget.name}</span>”? Any
              products assigned to this category may lose their classification.
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

export default ProductCategoryManagerComp;
