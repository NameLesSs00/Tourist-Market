"use client";

import React, { useEffect, useState } from "react";
import { FiGrid, FiShield } from "react-icons/fi";
import useAuthStore from "@/features/auth/authStore";
import { useMeQuery } from "@/features/auth/useAuth";

export function AdminDashboardComp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storedUser = useAuthStore((s) => s.user);
  const { data: profile } = useMeQuery();
  const user = profile || storedUser;

  const name =
    mounted && (user?.firstName || user?.userName)
      ? user.firstName || user.userName
      : "Administrator";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E4A68] via-[#0B3D57] to-[#062A3D] p-8 text-[#FFFFFF] shadow-lg sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D48C2833] blur-3xl" />
        <div className="relative max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF1A] px-3 py-1 text-xs font-medium text-[#F4DAB6]">
            <FiShield className="h-3.5 w-3.5" /> Admin Overview
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Welcome back, {name}!
          </h1>
          <p className="text-sm text-[#FFFFFFCC] sm:text-base">
            Signed in as{" "}
            <strong className="font-semibold text-[#FFFFFF]">
              {user?.email}
            </strong>
            . Use the sidebar navigation to manage website content, services,
            excursions, products, and system settings.
          </p>
        </div>
      </section>

      {/* Clean Dashboard Placeholder */}
      <section className="flex flex-col items-center justify-center rounded-3xl border border-[#0E4A6815] bg-white p-12 text-center shadow-2xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0E4A680C] text-[#0E4A68]">
          <FiGrid className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-[#083952]">
          Dashboard Overview
        </h2>
        <p className="mt-1 max-w-md text-xs text-[#64748B]">
          Dashboard statistics and charts will appear here. Choose any section
          from the sidebar navigation on the left to start managing records.
        </p>
      </section>
    </div>
  );
}

export default AdminDashboardComp;
