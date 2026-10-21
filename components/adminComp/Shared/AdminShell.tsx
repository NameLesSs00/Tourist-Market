"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { toast } from "sonner";
import useAuthStore from "@/features/auth/authStore";
import { useMeQuery } from "@/features/auth/useAuth";
import { AdminSidebar } from "./AdminSidebar";
import { ChangePasswordPanel } from "./ChangePasswordPanel";

/**
 * Admin chrome: fixed sidebar on desktop, slide-in drawer on mobile.
 * Also owns the session guard (1h local expiry) and logout.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, expiresAt, logout, isTokenValid } = useAuthStore();
  const { data: profile } = useMeQuery();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [minutesRemaining, setMinutesRemaining] = useState(60);

  const endSession = useCallback(
    (reason: "logout" | "expired") => {
      logout();
      queryClient.clear();
      if (reason === "logout") toast.success("You have been logged out.");
      else toast.warning("Your session expired. Please sign in again.");
      router.replace("/admin/login");
    },
    [logout, queryClient, router]
  );

  // Redirect immediately if there is no valid token.
  useEffect(() => {
    if (!isTokenValid()) router.replace("/admin/login");
  }, [isTokenValid, router]);

  // Session countdown; auto-logout when it reaches zero.
  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const diff = expiresAt - Date.now();
      setMinutesRemaining(Math.max(0, Math.floor(diff / 60000)));
      if (diff <= 0) endSession("expired");
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [expiresAt, endSession]);

  const sidebarProps = {
    user: profile || user,
    minutesRemaining,
    onLogout: () => endSession("logout"),
    onChangePassword: () => {
      setIsDrawerOpen(false);
      setIsPasswordOpen(true);
    },
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F1F5F9] font-poppins">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        <AdminSidebar {...sidebarProps} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-[#0F172A80]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.aside
              className="relative h-full w-72 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <AdminSidebar
                {...sidebarProps}
                showCloseButton
                onNavigate={() => setIsDrawerOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        {/* Mobile-only menu trigger (no header on desktop) */}
        <div className="sticky top-0 z-20 flex items-center px-4 pt-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-2.5 text-[#0E4A68] shadow-sm cursor-pointer"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <ChangePasswordPanel open={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} />
    </div>
  );
}

export default AdminShell;
