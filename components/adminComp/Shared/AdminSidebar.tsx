"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { FaCar } from "react-icons/fa6";
import { FiBookOpen, FiBriefcase, FiCalendar, FiClipboard, FiClock, FiCompass, FiDollarSign, FiGlobe, FiGrid, FiHelpCircle, FiKey, FiLayers, FiLogOut, FiMapPin, FiMessageSquare, FiNavigation, FiPackage, FiRepeat, FiShield, FiShoppingBag, FiSliders, FiStar, FiTag, FiUsers, FiX } from "react-icons/fi";
import type { AdminUser } from "@/models/auth";
import { isSuperAdmin } from "@/models/admin";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: IconType;
  superAdminOnly?: boolean;
}

/** One entry per backend controller. Add new controllers here. */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
  { label: "FAQs", href: "/admin/dashboard/faqs", icon: FiHelpCircle },
  { label: "Blogs", href: "/admin/dashboard/blogs", icon: FiBookOpen },
  { label: "Excursion Categories", href: "/admin/dashboard/excursion-categories", icon: FiCompass },
  { label: "Excursion Services", href: "/admin/dashboard/excursion-services", icon: FiPackage },
  { label: "Attractions", href: "/admin/dashboard/attractions", icon: FiMapPin },
  { label: "Private Excursions", href: "/admin/dashboard/private-excursions", icon: FiNavigation },
  { label: "Group Excursions", href: "/admin/dashboard/group-excursions", icon: FiUsers },
  { label: "Group Bookings", href: "/admin/dashboard/group-bookings", icon: FiCalendar },
  { label: "Vehicle Private", href: "/admin/dashboard/vehicle-private", icon: FaCar },
  { label: "Excursion Reviews", href: "/admin/dashboard/excursion-reviews", icon: FiStar },
  { label: "Product Categories", href: "/admin/dashboard/product-categories", icon: FiLayers },
  { label: "Product Subcategories", href: "/admin/dashboard/product-subcategories", icon: FiTag },
  { label: "Products", href: "/admin/dashboard/products", icon: FiShoppingBag },
  { label: "Product Reviews", href: "/admin/dashboard/product-reviews", icon: FiStar },
  { label: "Product Bookings", href: "/admin/dashboard/product-bookings", icon: FiClipboard },
  { label: "Site Services", href: "/admin/dashboard/site-services", icon: FiBriefcase },
  { label: "Site Service Items", href: "/admin/dashboard/site-service-items", icon: FiSliders },
  { label: "Services Bookings", href: "/admin/dashboard/services-bookings", icon: FiCalendar },
  { label: "Site Service Item Reviews", href: "/admin/dashboard/site-service-item-reviews", icon: FiMessageSquare },
  { label: "Transfer Services", href: "/admin/dashboard/transfer-services", icon: FiRepeat },
  { label: "Transfer Bookings", href: "/admin/dashboard/transfer-bookings", icon: FiClock },
  { label: "Countries", href: "/admin/dashboard/countries", icon: FiGlobe },
  { label: "Currencies", href: "/admin/dashboard/currencies", icon: FiDollarSign },
  { label: "Admins", href: "/admin/dashboard/admins", icon: FiShield, superAdminOnly: true },
];

interface AdminSidebarProps {
  user: AdminUser | null;
  minutesRemaining: number;
  onLogout: () => void;
  onChangePassword: () => void;
  /** Mobile only: close the drawer after navigating. */
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
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/admin/dashboard/transfer-services" && pathname.startsWith("/admin/dashboard/transfer-locations")) {
      return true;
    }
    return href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href);
  };

  const displayName =
    mounted && user?.firstName
      ? `${user.firstName} ${user.lastName ?? ""}`.trim()
      : mounted && user?.userName
      ? user.userName
      : "Admin";

  const isSuper = mounted && isSuperAdmin(user);
  const visibleNavItems = ADMIN_NAV_ITEMS.filter(
    (item) => !item.superAdminOnly || isSuper
  );

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#0E4A68] to-[#062A3D] text-[#FFFFFF]">
      {/* Brand */}
      <div className="flex items-center justify-between px-6 pb-6 pt-7">
        <Link href="/admin/dashboard" onClick={onNavigate} className="flex items-center">
          <Image
            src="/shared/LogoFooter.svg"
            alt="Egypt Tourist Market"
            width={160}
            height={52}
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
      <nav className="flex-1 overflow-y-auto px-4" suppressHydrationWarning>
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FFFFFF73]">
          Management
        </p>
        <ul className="space-y-1" suppressHydrationWarning>
          {visibleNavItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  suppressHydrationWarning
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    active
                      ? "bg-[#FFFFFF] text-[#0E4A68] shadow-md"
                      : "text-[#FFFFFFCC] hover:bg-[#FFFFFF14] hover:text-[#FFFFFF]"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#D48C28]" />
                  )}
                  <Icon className={`h-[18px] w-[18px] ${active ? "text-[#D48C28]" : ""}`} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: account + logout */}
      <div className="space-y-3 border-t border-[#FFFFFF1A] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#FFFFFF0F] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D48C28] text-sm font-semibold uppercase">
            {displayName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-[11px] text-[#FFFFFF99]" suppressHydrationWarning>
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
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#FFFFFFCC] transition-colors hover:bg-[#FFFFFF14] hover:text-[#FFFFFF] cursor-pointer"
        >
          <FiKey className="h-[18px] w-[18px]" />
          Change Password
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-[#F8717140] bg-[#F871711A] px-3 py-2.5 text-sm font-semibold text-[#FECACA] transition-colors hover:bg-[#F8717133] hover:text-[#FFFFFF] cursor-pointer"
        >
          <FiLogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
