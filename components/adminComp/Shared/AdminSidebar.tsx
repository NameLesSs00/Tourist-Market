"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiKey, FiLogOut, FiX } from "react-icons/fi";
import { isSuperAdmin } from "@/models/admin";
import type { AdminUser } from "@/models/auth";
import { AdminNavSection } from "./AdminNavSection";
import { NAV_CATEGORIES, STANDALONE_NAV_ITEMS } from "./adminNavConfig";

interface AdminSidebarProps {
  user: AdminUser | null;
  minutesRemaining: number;
  onLogout: () => void;
  onChangePassword: () => void;
  onNavigate?: () => void;
  showCloseButton?: boolean;
}

export function AdminSidebar({
  user,
  minutesRemaining,
  onLogout,
  onChangePassword,
  onNavigate,
  showCloseButton = false,
}: AdminSidebarProps) {
  const pathname = usePathname() || "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName =
    mounted && user?.firstName
      ? `${user.firstName} ${user.lastName ?? ""}`.trim()
      : mounted && user?.userName
      ? user.userName
      : "Admin";

  const isSuper = mounted && isSuperAdmin(user);
  const visibleCategories = NAV_CATEGORIES.filter(
    (cat) => !cat.superAdminOnly || isSuper
  );

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0A2637] via-[#092231] to-[#071B27] text-[#FFFFFF]">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#FFFFFF14] px-5">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/shared/LogoFooter.svg"
            alt="Egypt Tourist Market"
            width={140}
            height={44}
            priority
            className="h-8 w-auto object-contain"
          />
          <span className="rounded-md bg-[#FFFFFF14] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D48C28]">
            Admin
          </span>
        </Link>
        {showCloseButton && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-[#FFFFFFB3] hover:bg-[#FFFFFF1A] hover:text-[#FFFFFF] cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 [scrollbar-width:thin] [scrollbar-color:#FFFFFF20_transparent]"
        suppressHydrationWarning
      >
        {/* Standalone Items (Dashboard) */}
        <div className="space-y-1">
          {STANDALONE_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                  active
                    ? "bg-[#FFFFFF18] text-[#FFFFFF]"
                    : "text-[#FFFFFFCC] hover:bg-[#FFFFFF0D] hover:text-[#FFFFFF]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                      active ? "text-[#D48C28]" : "text-[#FFFFFF99] group-hover:text-[#FFFFFF]"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {active && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#D48C28]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Categorized Dropdowns */}
        <div className="space-y-1.5 pt-2 border-t border-[#FFFFFF14]">
          <p className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-[#FFFFFF70]">
            Modules & Management
          </p>
          <div className="space-y-1">
            {visibleCategories.map((category) => (
              <AdminNavSection
                key={category.id}
                category={category}
                pathname={pathname}
                isSuper={isSuper}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom: User Card & Actions */}
      <div className="shrink-0 border-t border-[#FFFFFF14] p-4 space-y-3 bg-[#06172280]">
        <div className="flex items-center gap-3 rounded-xl bg-[#FFFFFF0D] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D48C28] text-sm font-bold uppercase text-white shadow-inner">
            {displayName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{displayName}</p>
            <p className="truncate text-xs text-[#FFFFFF99]" suppressHydrationWarning>
              {user?.roles?.[0] || "Admin"} ·{" "}
              {minutesRemaining >= 60
                ? `~${Math.floor(minutesRemaining / 60)}h ${minutesRemaining % 60 > 0 ? `${minutesRemaining % 60}m ` : ""}left`
                : `~${minutesRemaining}m left`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onChangePassword}
            title="Change password"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#FFFFFF0D] hover:bg-[#FFFFFF18] px-3 py-2 text-xs font-semibold text-[#FFFFFFE6] hover:text-white transition-colors cursor-pointer"
          >
            <FiKey className="h-4 w-4 text-[#FFFFFFB3]" />
            <span>Password</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#F8717140] bg-[#F871711A] hover:bg-[#F8717130] px-3 py-2 text-xs font-semibold text-[#FECACA] hover:text-white transition-colors cursor-pointer"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
