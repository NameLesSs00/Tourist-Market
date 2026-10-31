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
            : "text-[#FFFFFFD9] hover:bg-[#FFFFFF0D] hover:text-[#FFFFFF]"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <CategoryIcon
            className={`h-[18px] w-[18px] shrink-0 transition-colors ${
              hasActiveChild ? "text-[#D48C28]" : "text-[#FFFFFF99] group-hover:text-[#FFFFFF]"
            }`}
          />
          <span className="truncate">{category.label}</span>
          {!isOpen && hasActiveChild && (
            <span className="h-2 w-2 rounded-full bg-[#D48C28]" />
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
        <ul className="ml-4 pl-3 border-l-2 border-[#FFFFFF20] space-y-1 pt-1 animate-in fade-in duration-150">
          {visibleChildren.map((item) => {
            const isChildActive =
              item.href === "/admin/dashboard/transfer-services" &&
              pathname.startsWith("/admin/dashboard/transfer-locations")
                ? true
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const ChildIcon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isChildActive ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[13px] sm:text-sm transition-colors ${
                    isChildActive
                      ? "bg-[#FFFFFF1F] text-[#FFFFFF] font-bold shadow-xs"
                      : "text-[#FFFFFFB3] hover:bg-[#FFFFFF0D] hover:text-[#FFFFFF] font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {ChildIcon && (
                      <ChildIcon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isChildActive
                            ? "text-[#D48C28]"
                            : "text-[#FFFFFF80] group-hover:text-[#FFFFFFCC]"
                        }`}
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isChildActive && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#D48C28]" />
                  )}
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
