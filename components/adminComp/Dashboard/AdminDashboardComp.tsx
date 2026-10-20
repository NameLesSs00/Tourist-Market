"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiKey,
  FiUser,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";
import useAuthStore from "@/features/auth/authStore";
import {
  useMeQuery,
  useChangePasswordMutation,
  extractErrorMessage,
} from "@/features/auth/useAuth";

export function AdminDashboardComp() {
  const router = useRouter();
  const { user, expiresAt, logout, isTokenValid } = useAuthStore();
  const { data: profileUser, isLoading: isProfileLoading } = useMeQuery();

  // Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const changePasswordMutation = useChangePasswordMutation();

  // Guard: Redirect to /admin/login if token is missing or expired
  useEffect(() => {
    if (!isTokenValid()) {
      router.replace("/admin/login");
    }
  }, [isTokenValid, router]);

  // Remaining session calculation
  const [minutesRemaining, setMinutesRemaining] = useState<number>(60);
  useEffect(() => {
    const updateTime = () => {
      if (expiresAt) {
        const diffMs = expiresAt - Date.now();
        const mins = Math.max(0, Math.floor(diffMs / 60000));
        setMinutesRemaining(mins);
        if (diffMs <= 0) {
          logout();
          router.replace("/admin/login");
        }
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [expiresAt, logout, router]);

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setFormError("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setFormError("New password must be at least 6 characters long.");
      return;
    }

    changePasswordMutation.mutate(
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            setFormSuccess("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
              setIsChangePasswordOpen(false);
              setFormSuccess(null);
            }, 1800);
          } else {
            setFormError(res.message || "Failed to change password.");
          }
        },
        onError: (err) => {
          setFormError(extractErrorMessage(err));
        },
      }
    );
  };

  const activeUser = profileUser || user;

  return (
    <div className="min-h-screen w-full bg-[#F1F5F9] text-[#0F172A] flex flex-col font-['Poppins']">
      {/* 1. Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Portal Tag */}
          <div className="flex items-center gap-4">
            <Image
              src="/homepage/hero/HeroLogo.webp"
              alt="Egypt Tourist Market"
              width={160}
              height={50}
              priority
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:block h-6 w-[1px] bg-slate-300" />
            <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold text-[#0E4A68] bg-[#0E4A68]/10 px-2.5 py-1 rounded-md">
              Dashboard
            </span>
          </div>

          {/* User info & Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Session Indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <FiClock className="h-3.5 w-3.5 text-[#D48C28]" />
              <span>Session: ~{minutesRemaining}m left</span>
            </div>

            {/* Admin User Chip */}
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-[#0E4A68] text-white flex items-center justify-center font-semibold text-sm shadow-xs">
                {activeUser?.firstName?.charAt(0) ||
                  activeUser?.userName?.charAt(0) ||
                  "A"}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-[#083952] leading-none">
                  {activeUser?.firstName
                    ? `${activeUser.firstName} ${activeUser.lastName || ""}`
                    : activeUser?.userName || "Admin"}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeUser?.roles?.[0] || "SuperAdmin"}
                </div>
              </div>
            </div>

            {/* Change Password Button */}
            <button
              onClick={() => {
                setFormError(null);
                setFormSuccess(null);
                setIsChangePasswordOpen(true);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0E4A68] transition-colors cursor-pointer"
              title="Change Password"
            >
              <FiKey className="h-4 w-4" />
              <span className="hidden sm:inline">Password</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
              title="Logout"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E4A68] via-[#093247] to-[#041A28] p-8 text-white shadow-lg">
          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#D48C28] backdrop-blur-md">
              <FiShield className="h-3.5 w-3.5" />
              <span>Administrative Overview</span>
            </div>
            <h1 className="font-['Montserrat'] text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Welcome back,{" "}
              {activeUser?.firstName || activeUser?.userName || "Administrator"}!
            </h1>
            <p className="text-white/80 text-sm sm:text-base font-light">
              You are signed in as{" "}
              <strong className="font-semibold text-white">
                {activeUser?.email || "superadmin@touristmarket.com"}
              </strong>
              . Manage your tourism services, platform settings, and operations from this panel.
            </p>
          </div>

          {/* Decorative Background Texture Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
            <Image
              src="/homepage/hero/HeroLogo.webp"
              alt="Watermark"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* Status / Quick Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Account Info */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center">
                <FiUser className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">
                  Administrator Profile
                </h3>
                <p className="text-xs text-slate-500">Account status & role</p>
              </div>
            </div>
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Username:</span>
                <span className="font-medium text-slate-700">
                  {activeUser?.userName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span className="font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {activeUser?.roles?.[0] || "SuperAdmin"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Status:</span>
                <span className="font-medium text-emerald-600">
                  {activeUser?.isActive ? "Active" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Security & Session */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[#D48C28]/10 text-[#D48C28] flex items-center justify-center">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">
                  Security & Token
                </h3>
                <p className="text-xs text-slate-500">Session duration</p>
              </div>
            </div>
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Token Lifespan:</span>
                <span className="font-medium text-slate-700">
                  1 Hour (Enforced)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Remaining Time:</span>
                <span className="font-medium text-[#D48C28]">
                  ~{minutesRemaining} minutes
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Password Action:</span>
                <button
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="font-medium text-[#0E4A68] hover:underline cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: System Endpoints Linked */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FiCheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">
                  API Integration
                </h3>
                <p className="text-xs text-slate-500">Backend connection</p>
              </div>
            </div>
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Base URL:</span>
                <span className="font-medium text-slate-700 truncate max-w-[150px]">
                  touristtt.runasp.net
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auth Flow:</span>
                <span className="font-medium text-emerald-600">
                  Ready & Synced
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Services:</span>
                <span className="font-medium text-slate-700">Ready to link</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Change Password Modal */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-[#0E4A68]/10 text-[#0E4A68] flex items-center justify-center">
                  <FiKey className="h-5 w-5" />
                </div>
                <h3 className="font-['Montserrat'] text-lg font-bold text-[#083952]">
                  Change Password
                </h3>
              </div>
              <button
                onClick={() => setIsChangePasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Error / Success Feedback */}
            {formError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                <FiAlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                <span>{formError}</span>
              </div>
            )}
            {formSuccess && (
              <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                <FiCheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showCurrentPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
                    className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showNewPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-slate-200 py-2.5 px-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={changePasswordMutation.isPending}
                  className="rounded-xl bg-[#0E4A68] px-4 py-2 text-xs font-semibold text-white hover:bg-[#093247] transition-colors disabled:opacity-70 cursor-pointer"
                >
                  {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboardComp;
