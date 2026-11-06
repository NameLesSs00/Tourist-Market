"use client";

import React from "react";
import Image from "next/image";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiEyeOff,
  FiImage,
  FiLayers,
  FiList,
  FiRotateCcw,
  FiSliders,
} from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import { LANG_FLAGS } from "@/models/localization";
import type { SiteServiceSubItem } from "@/models/siteServiceItem";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface CreateColumnsOptions {
  serviceMap: Map<string, string>;
  isDeletedView?: boolean;
  onRestore?: (item: SiteServiceSubItem) => void;
  isRestoring?: boolean;
}

export function createSiteServiceItemColumns({
  serviceMap,
  isDeletedView = false,
  onRestore,
  isRestoring = false,
}: CreateColumnsOptions): DataTableColumn<SiteServiceSubItem>[] {
  return [
    {
      key: "cover",
      header: "Cover",
      className: "w-20",
      render: (item) => {
        const coverImg = item.images?.[0]?.imageUrl;
        const fullUrl = getBackendImageUrl(coverImg);

        return (
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
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
    ...(isDeletedView
      ? [
          {
            key: "deletedAt",
            header: "Deleted At",
            className: "w-36",
            render: (item: SiteServiceSubItem) => {
              const dateStr = item.deletedAt
                ? new Date(item.deletedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Deleted";
              return (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FECACA] bg-[#FEF2F2] px-2.5 py-1 text-xs font-semibold text-[#DC2626]">
                  <FiAlertCircle className="h-3 w-3 shrink-0" />
                  <span>{dateStr}</span>
                </span>
              );
            },
          },
          {
            key: "restoreAction",
            header: "Restore",
            className: "w-28 text-center",
            render: (item: SiteServiceSubItem) => (
              <button
                type="button"
                onClick={() => onRestore?.(item)}
                disabled={isRestoring}
                title="Restore this service item"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold text-[#059669] hover:bg-[#D1FAE5] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs active:scale-95"
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
                <span>Restore</span>
              </button>
            ),
          },
        ]
      : [
          {
            key: "isActive",
            header: "Status",
            className: "w-28",
            render: (item: SiteServiceSubItem) => (
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
        ]),
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
          : "-";
        return (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#64748B]">
            <FiClock className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>{dateStr}</span>
          </span>
        );
      },
    },
  ];
}
