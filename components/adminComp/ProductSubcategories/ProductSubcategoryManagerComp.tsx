"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { ProductSubcategoryFormPanel } from "./ProductSubcategoryFormPanel";
import {
  useCreateProductSubcategoryMutation,
  useDeleteProductSubcategoryMutation,
  useProductSubcategoriesQuery,
  useUpdateProductSubcategoryMutation,
} from "@/features/productSubcategories/useProductSubcategories";
import { useAllProductCategoriesQuery } from "@/features/productCategories/useProductCategoryAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type { ProductCategoryItem } from "@/models/productCategory";
import type {
  ProductSubcategoryItem,
  ProductSubcategoryUpsertRequest,
} from "@/models/productSubcategory";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

const PAGE_SIZE = 10;

export function ProductSubcategoryManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | undefined>(undefined);

  // Fetch parent product categories for dropdown filter and name resolution
  const categoriesQuery = useAllProductCategoriesQuery();
  const rawCategories = categoriesQuery.data as any;
  const categories: ProductCategoryItem[] = useMemo(() => {
    if (Array.isArray(rawCategories)) return rawCategories;
    if (Array.isArray(rawCategories?.items)) return rawCategories.items;
    if (Array.isArray(rawCategories?.data?.items)) return rawCategories.data.items;
    return [];
  }, [rawCategories]);

  // Map category ID to human-readable Category Name
  const categoryMap = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach((cat: ProductCategoryItem) => {
      map.set(cat.id, cat.name);
    });
    return map;
  }, [categories]);

  // Query product subcategories with search and optional categoryId
  const listQuery = useProductSubcategoriesQuery({
    search: search.trim() || undefined,
    categoryId: categoryFilter,
    language: "en",
    lang: "en",
    pageNumber: page,
    pageSize: PAGE_SIZE,
  });

  const createMutation = useCreateProductSubcategoryMutation();
  const updateMutation = useUpdateProductSubcategoryMutation();
  const deleteMutation = useDeleteProductSubcategoryMutation();

  const [formTarget, setFormTarget] = useState<
    ProductSubcategoryItem | null | undefined
  >(undefined);
  const [deleteTarget, setDeleteTarget] =
    useState<ProductSubcategoryItem | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const pagedData = listQuery.data;
  const rawItems = pagedData?.items ?? [];
  const totalCount = pagedData?.totalCount ?? 0;
  const totalPages = Math.max(1, pagedData?.totalPages ?? 1);

  const handleCreateSubmit = (data: {
    body: ProductSubcategoryUpsertRequest;
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
    body: ProductSubcategoryUpsertRequest;
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
      onSuccess: () => {
        setDeleteTarget(null);
      },
    });
  };

  const columns: DataTableColumn<ProductSubcategoryItem>[] = [
    {
      key: "photo",
      header: "Photo",
      className: "w-20",
      render: (item) => {
        const fullUrl = getBackendImageUrl(item.imageUrl);
        return (
          <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-[#E2E8F0] bg-slate-100 shrink-0">
            {fullUrl ? (
              <Image
                src={fullUrl}
                alt={item.name}
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
      key: "name",
      header: "Subcategory Name",
      render: (item) => (
        <div className="min-w-[180px] max-w-sm">
          <span className="font-semibold text-[#083952]">{item.name}</span>
        </div>
      ),
    },
    {
      key: "category",
      header: "Parent Product Category",
      render: (item) => {
        const catName = categoryMap.get(item.categoryId);
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0E4A6820] bg-[#0E4A680A] px-2.5 py-1 text-xs font-semibold text-[#0E4A68]">
            <FiLayers className="h-3 w-3 text-[#0E4A68]" />
            <span>{catName || `Category #${item.categoryId}`}</span>
          </span>
        );
      },
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
      key: "items",
      header: "Products",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
          <FiShoppingBag className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>{item.noOfItems ?? 0} items</span>
        </span>
      ),
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
          title="Product Subcategories"
          description="Manage marketplace product subcategories organized under parent product categories."
          actionLabel="Add Product Subcategory"
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
        title="Product Subcategories"
        description="Manage marketplace product subcategories organized under parent product categories."
        actionLabel="Add Product Subcategory"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Text search */}
          <div className="w-full sm:w-72">
            <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="Search product subcategories..."
            />
          </div>

          {/* Parent Product Category Filter Dropdown */}
          <div className="w-full sm:w-64">
            <select
              value={categoryFilter ?? ""}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : undefined;
                setCategoryFilter(val);
                setPage(1);
              }}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-[#083952] shadow-2xs focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
            >
              <option value="">All Product Categories</option>
              {categories.map((cat: ProductCategoryItem) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count summary & language badge */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="font-semibold text-[#334155]">{totalCount}</span>{" "}
          subcategories
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
        rows={rawItems}
        getRowKey={(row) => String(row.id)}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search.trim() || categoryFilter
            ? "No product subcategories match your filters"
            : "No product subcategories found"
        }
        emptyDescription={
          search.trim() || categoryFilter
            ? "Try selecting another category or clearing your search input."
            : "Click 'Add Product Subcategory' to configure your first subcategory."
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

      {/* Slide Panel for Create & Edit */}
      {formTarget !== undefined && (
        <ProductSubcategoryFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          subcategory={formTarget}
          categories={categories}
          defaultCategoryId={categoryFilter}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Product Subcategory"
        description={
          deleteTarget ? (
            <>
              Are you sure you want to permanently delete &ldquo;
              <span className="font-semibold">{deleteTarget.name}</span>&rdquo;?
              Any products assigned to this subcategory will need to be reassigned.
            </>
          ) : (
            "Are you sure you want to delete this product subcategory?"
          )
        }
        confirmLabel="Delete Subcategory"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default ProductSubcategoryManagerComp;
