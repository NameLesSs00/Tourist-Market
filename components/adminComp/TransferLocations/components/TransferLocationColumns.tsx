import React from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import type { DataTableColumn } from "@/components/adminComp/Shared";
import { LANG_FLAGS } from "@/models/localization";
import type { TransferLocationItem } from "@/models/transferLocation";

export function createTransferLocationColumns(): DataTableColumn<TransferLocationItem>[] {
  return [
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
          <span>Location Name</span>
        </span>
      ),
      className: "w-full",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E4A680C] text-[#0E4A68]">
            <FiMapPin className="h-4 w-4" />
          </div>
          <p className="font-semibold text-xs text-[#083952]">
            {item.name || "Untitled Location"}
          </p>
        </div>
      ),
    },
  ];
}
