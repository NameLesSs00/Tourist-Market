"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginHero } from "./AdminLoginHero";
import { AdminLoginForm } from "./AdminLoginForm";
import useAuthStore from "@/features/auth/authStore";

export function AdminLoginPageComp() {
  const router = useRouter();
  const isTokenValid = useAuthStore((state) => state.isTokenValid);

  useEffect(() => {
    // If user already has a valid token, redirect to dashboard directly
    if (isTokenValid()) {
      router.replace("/admin/dashboard");
    }
  }, [isTokenValid, router]);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC]">
      <AdminLoginHero />
      <AdminLoginForm />
    </div>
  );
}

export default AdminLoginPageComp;
