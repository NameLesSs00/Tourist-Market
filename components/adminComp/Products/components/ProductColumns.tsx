import React from "react";
import Image from "next/image";
import { FiImage } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import type { ProductListItem } from "@/models/product";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface CreateProductColumnsOptions {
  subCategoryMap: Map<number, string>;
}

export function createProductColumns({
  subCategoryMap,
}: CreateProductColumnsOptions): DataTableColumn<ProductListItem>[] {
  return [
    {
      key: "thumbnail",
      header: "Photo",
      className: "w-[72px]",
      render: (item) => {
        const heroImg = item.images?.slice().sort((a, b) => a.displayOrder - b.displayOrder)[0];
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
          <p className="truncate font-semibold text-xs text-[#083952]">
            {item.title || "Untitled Product"}
          </p>
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
          {item.priceFor && (
            <span className="ml-1 text-[11px] text-[#64748B]">
              / {item.priceFor}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "gallery",
      header: "Gallery",
      className: "w-[12%]",
      render: (item) => (
        <span className="inline-flex items-center gap-1 text-xs text-[#64748B]">
          <FiImage className="h-3.5 w-3.5 text-[#0E4A68]" />
          <span>
            {item.images?.length || 0} photo
            {item.images?.length !== 1 ? "s" : ""}
          </span>
        </span>
      ),
    },
  ];
}
