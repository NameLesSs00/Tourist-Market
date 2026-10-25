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
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0E4A68] to-[#062A3D] text-[#FFFFFF]">
      {/* Brand */}
      <div className="flex items-center justify-between px-6 pb-5 pt-6 border-b border-[#FFFFFF14]">
        <Link href="/admin/dashboard" onClick={onNavigate} className="flex items-center">
          <Image
            src="/shared/LogoFooter.svg"
            alt="Egypt Tourist Market"
            width={180}
            height={56}
            priority
            className="h-11 w-auto object-contain"
          />
        </Link>
        {showCloseButton && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close menu"
            className="rounded-lg p-2 text-[#FFFFFFB3] hover:bg-[#FFFFFF1A] hover:text-[#FFFFFF] cursor-pointer"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-4" suppressHydrationWarning>
        {/* Standalone Items */}
        <div className="space-y-1">
          {STANDALONE_NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#FFFFFF] text-[#0E4A68] shadow-md font-bold"
                    : "text-[#FFFFFFE6] hover:bg-[#FFFFFF14] hover:text-[#FFFFFF]"
                }`}
              >
                {active && (
                  <span className="absolute -left-4 top-1/2 h-7 w-1.5 -translate-y-1/2 rounded-r-full bg-[#D48C28]" />
                )}
                <Icon className={`h-5 w-5 shrink-0 ${active ? "text-[#D48C28]" : "text-[#FFFFFFB3]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Categorized Dropdowns */}
        <div className="space-y-2 pt-2 border-t border-[#FFFFFF14]">
          <p className="px-3.5 pt-1 text-xs font-semibold uppercase tracking-wider text-[#FFFFFF80]">
            Modules & Management
          </p>
          <div className="space-y-1.5">
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

      {/* Bottom: account + logout */}
      <div className="space-y-3 border-t border-[#FFFFFF1A] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#FFFFFF0F] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D48C28] text-sm font-bold uppercase shadow-inner">
            {displayName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-[#FFFFFF99]" suppressHydrationWarning>
              {user?.roles?.[0] || "Admin"} ·{" "}
              {minutesRemaining >= 60
                ? `~${Math.floor(minutesRemaining / 60)}h ${minutesRemaining % 60 > 0 ? `${minutesRemaining % 60}m ` : ""}left`
                : `~${minutesRemaining}m left`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChangePassword}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#FFFFFFCC] transition-colors hover:bg-[#FFFFFF14] hover:text-[#FFFFFF] cursor-pointer"
        >
          <FiKey className="h-4 w-4 text-[#FFFFFF99]" />
          <span>Change Password</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-[#F8717140] bg-[#F871711A] px-3.5 py-2.5 text-sm font-semibold text-[#FECACA] transition-colors hover:bg-[#F8717133] hover:text-[#FFFFFF] cursor-pointer"
        >
          <FiLogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>

        <div className="pt-1 text-center text-[10px] text-[#FFFFFF66]">
          <span>© 2026 Egypt Tourist Market. All rights reserved.</span>
          <br />
          <span>
            Powered by{" "}
            <a
              href="https://tech-gear.net/en"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#D48C28] hover:underline transition-colors"
            >
              Tech Gear Solutions
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
