"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { useLoginMutation, extractErrorMessage } from "@/features/auth/useAuth";

export function AdminLoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedUser = userName.trim();
    if (!trimmedUser) {
      setValidationError("Please enter your username or email address.");
      return;
    }

    if (!password) {
      setValidationError("Please enter your password.");
      return;
    }

    loginMutation.mutate({
      userName: trimmedUser,
      password,
    });
  };

  const errorMessage =
    validationError ||
    (loginMutation.isError
      ? extractErrorMessage(loginMutation.error)
      : null);

  return (
    <div className="w-full lg:w-1/2 xl:w-5/12 min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#F8FAFC]">
      <div className="w-full max-w-md space-y-8">
        {/* Mobile Header with Logo (visible only on lg:hidden) */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-3 mb-6">
          <Image
            src="/homepage/hero/HeroLogo.webp"
            alt="Egypt Tourist Market"
            width={160}
            height={55}
            priority
            className="h-12 w-auto object-contain"
          />
          <span className="text-xs uppercase font-semibold tracking-wider text-[#D48C28] font-['Poppins']">
            Admin Management Portal
          </span>
        </div>

        {/* Form Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="font-['Montserrat'] text-3xl font-bold tracking-tight text-[#083952]">
            Welcome Back
          </h2>
          <p className="font-['Poppins'] text-sm text-[#64748B] font-normal">
            Please enter your administrative credentials to access your dashboard.
          </p>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-800 shadow-sm animate-in fade-in duration-200"
          >
            <FiAlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div className="font-['Poppins'] leading-snug">{errorMessage}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label
              htmlFor="userName"
              className="block font-['Poppins'] text-sm font-semibold text-[#083952]"
            >
              Username
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FiUser className="h-5 w-5" />
              </div>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 font-['Poppins'] text-sm text-[#083952] placeholder:text-slate-400 transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
            </div>
          </div>

          {/* Password Field with Eye Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-['Poppins'] text-sm font-semibold text-[#083952]"
              >
                Password
              </label>
            </div>
            <div className="relative rounded-xl shadow-xs">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <FiLock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 font-['Poppins'] text-sm text-[#083952] placeholder:text-slate-400 transition-colors focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0E4A68] py-3.5 px-4 font-['Poppins'] text-base font-semibold text-white shadow-md hover:bg-[#093247] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#0E4A68]/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loginMutation.isPending ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Security & Access Notice */}

      </div>
    </div>
  );
}

export default AdminLoginForm;
