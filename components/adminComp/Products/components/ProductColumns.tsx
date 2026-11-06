import React from "react";
import Image from "next/image";
import { FiImage, FiRotateCcw } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import type { ProductListItem } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface CreateProductColumnsOptions {
  subCategoryMap: Map<number, string>;
  isDeletedView?: boolean;
  onRestore?: (item: ProductListItem) => void;
  isRestoring?: boolean;
}

export function createProductColumns({
  subCategoryMap,
  isDeletedView = false,
  onRestore,
  isRestoring,
}: CreateProductColumnsOptions): DataTableColumn<ProductListItem>[] {
  const baseColumns: DataTableColumn<ProductListItem>[] = [
    {
      key: "thumbnail",
      header: "Photo",
      className: "w-[72px]",
      render: (item) => {
        const heroImg = item.images
          ?.slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)[0];
        const imgUrl = heroImg ? getBackendImageUrl(heroImg.imageUrl) : null;

        return (
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#CBD5E1] bg-slate-100">
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt={item.title || "Product"}
                fill
                className="object-cover"
                sizes="48px"
                unoptimized
              />
            ) : (
              <FiImage className="h-5 w-5 text-slate-400" />
            )}
          </div>
        );
      },
    },
    {
      key: "title",
      header: "Product & Summary",
      className: "w-[40%]",
      render: (item) => (
        <div className="min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-xs text-[#083952]">
              {item.title || "Untitled Product"}
            </p>
            {item.keys && item.keys.length > 0 && (
              <span className="shrink-0 rounded-md bg-[#0E4A6814] px-1.5 py-0.5 text-[10px] font-medium text-[#0E4A68]">
                {item.keys.length} {item.keys.length === 1 ? "spec" : "specs"}
              </span>
            )}
          </div>
          <p className="truncate text-[11px] text-[#64748B] mt-0.5">
            {item.subTitle || "No subtitle"}
          </p>
        </div>
      ),
    },
    {
      key: "subcategory",
      header: "Subcategory",
      className: "w-[20%]",
      render: (item) => (
        <span className="inline-flex items-center rounded-full bg-[#0E4A680C] px-2.5 py-0.5 text-xs font-medium text-[#0E4A68]">
          {subCategoryMap.get(item.subCategoryId) || `ID #${item.subCategoryId}`}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      className: "w-[18%]",
      render: (item) => (
        <div>
          <span className="text-xs font-semibold text-[#083952]">
            ${item.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-[#64748B] ml-1">
            /{item.priceFor || "unit"}
          </span>
        </div>
      ),
    },
  ];

  if (isDeletedView) {
    baseColumns.push({
      key: "deletedAt",
      header: "Deleted At",
      className: "w-[16%]",
      render: (item) => {
        const date = item.deletedAt
          ? new Date(item.deletedAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Unknown";
        return (
          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600 ring-1 ring-red-200">
            {date}
          </span>
        );
      },
    });

    baseColumns.push({
      key: "restore",
      header: "Restore",
      className: "w-[80px] text-center",
      render: (item) => (
        <button
          type="button"
          disabled={isRestoring}
          onClick={() => onRestore?.(item)}
          title="Restore product"
          className="inline-flex items-center justify-center rounded-lg border border-[#CBD5E1] bg-white p-1.5 text-[#0E4A68] transition-colors hover:bg-[#EFF6FF] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRotateCcw className="h-3.5 w-3.5" />
        </button>
      ),
    });
  } else {
    baseColumns.push({
      key: "photosCount",
      header: "Gallery",
      className: "w-[12%]",
      render: (item) => {
        const count = item.images?.length ?? 0;
        return (
          <span className="text-xs text-[#64748B]">
            {count} {count === 1 ? "photo" : "photos"}
          </span>
        );
      },
    });
  }

  return baseColumns;
}
