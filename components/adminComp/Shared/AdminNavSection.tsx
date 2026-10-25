"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import type { NavCategory } from "./adminNavConfig";

interface AdminNavSectionProps {
  category: NavCategory;
  pathname: string;
  isSuper: boolean;
  onNavigate?: () => void;
}

export function AdminNavSection({
  category,
  pathname,
  isSuper,
  onNavigate,
}: AdminNavSectionProps) {
  // Filter children based on permissions
  const visibleChildren = category.children.filter(
    (item) => !item.superAdminOnly || isSuper
  );

  if (visibleChildren.length === 0) return null;

  const hasActiveChild = visibleChildren.some((child) => {
    if (child.href === "/admin/dashboard/transfer-services" && pathname.startsWith("/admin/dashboard/transfer-locations")) {
      return true;
    }
    return pathname.startsWith(child.href);
  });

  const [isOpen, setIsOpen] = useState(hasActiveChild);

  // Auto-expand when navigating into a child of this category
  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  const CategoryIcon = category.icon;

  return (
    <div className="space-y-1">
      {/* Category Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
          hasActiveChild
            ? "text-[#FFFFFF] bg-[#FFFFFF14]"
            : "text-[#FFFFFFCC] hover:bg-[#FFFFFF0D] hover:text-[#FFFFFF]"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <CategoryIcon className={`h-[18px] w-[18px] shrink-0 ${hasActiveChild ? "text-[#D48C28]" : "text-[#FFFFFF99]"}`} />
          <span className="truncate">{category.label}</span>
          {!isOpen && hasActiveChild && (
            <span className="h-2 w-2 rounded-full bg-[#D48C28] ring-2 ring-[#0E4A68]" />
          )}
        </div>
        <FiChevronDown
          className={`h-4 w-4 text-[#FFFFFF99] transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-[#D48C28]" : ""
          }`}
        />
      </button>

      {/* Dropdown Items List */}
      {isOpen && (
        <ul className="ml-4 space-y-1 border-l-2 border-[#FFFFFF22] pl-2.5 pt-1 animate-in fade-in duration-150">
          {visibleChildren.map((item) => {
            const isChildActive =
              item.href === "/admin/dashboard/transfer-services" && pathname.startsWith("/admin/dashboard/transfer-locations")
                ? true
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const ChildIcon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isChildActive ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isChildActive
                      ? "bg-[#FFFFFF] text-[#0E4A68] shadow-sm font-bold"
                      : "text-[#FFFFFFB3] hover:bg-[#FFFFFF14] hover:text-[#FFFFFF]"
                  }`}
                >
                  {isChildActive && (
                    <span className="absolute -left-[11px] top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-r-full bg-[#D48C28]" />
                  )}
                  {ChildIcon && (
                    <ChildIcon
                      className={`h-4 w-4 shrink-0 ${
                        isChildActive ? "text-[#D48C28]" : "text-[#FFFFFF80] group-hover:text-[#FFFFFF]"
                      }`}
                    />
                  )}
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default AdminNavSection;
