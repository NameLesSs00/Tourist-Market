"use client";

import React, { useEffect, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  ADMIN_ROLES,
  type AdminCreateRequest,
  type AdminRole,
  type AdminUpdateRequest,
  type AdminUserItem,
} from "@/models/admin";

interface AdminFormPanelProps {
  open: boolean;
  onClose: () => void;
  admin?: AdminUserItem | null;
  onSubmitCreate: (data: AdminCreateRequest) => void;
  onSubmitUpdate: (data: { id: string; body: AdminUpdateRequest }) => void;
  isSubmitting: boolean;
}

export function AdminFormPanel({
  open,
  onClose,
  admin,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: AdminFormPanelProps) {
  const isEdit = Boolean(admin);

  // Form states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AdminRole>("Admin");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or populate on open/change
  useEffect(() => {
    if (admin) {
      setUserName(admin.userName || "");
      setEmail(admin.email || "");
      setFirstName(admin.firstName || "");
      setLastName(admin.lastName || "");
      setPassword("");
      setShowPassword(false);
      setSelectedRole(
        admin.roles?.includes("SuperAdmin") ? "SuperAdmin" : "Admin"
      );
      setIsActive(admin.isActive ?? true);
      setErrors({});
    } else {
      setUserName("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setShowPassword(false);
      setSelectedRole("Admin");
      setIsActive(true);
      setErrors({});
    }
  }, [admin, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!userName.trim()) {
      newErrors.userName = "Username is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!isEdit && !password.trim()) {
      newErrors.password = "Password is required for new administrators.";
    } else if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    if (isEdit && admin) {
      const updateBody: AdminUpdateRequest = {
        userName: userName.trim(),
        email: email.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        isActive,
        roles: [selectedRole],
      };
      if (password.trim()) {
        updateBody.password = password.trim();
      }
      onSubmitUpdate({ id: admin.id, body: updateBody });
    } else {
      const createBody: AdminCreateRequest = {
        userName: userName.trim(),
        email: email.trim(),
        password: password.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        roles: [selectedRole],
      };
      onSubmitCreate(createBody);
    }
  };

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Administrator" : "Add New Administrator"}
      subtitle={
        isEdit
          ? `Update account details and role for @${admin?.userName}.`
          : "Create an administrator account with role-based access."
      }
      icon={<FiShield className="h-5 w-5" />}
      widthClassName="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="admin-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Administrator"}
          </button>
        </>
      }
    >
      <form
        id="admin-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Username */}
        <div className="space-y-1.5">
          <label
            htmlFor="admin-username"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]"
          >
            <FiUser className="h-3.5 w-3.5 text-[#64748B]" />
            <span>Username</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id="admin-username"
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (errors.userName) setErrors((prev) => ({ ...prev, userName: "" }));
            }}
            placeholder="e.g. johndoe"
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
              errors.userName ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.userName && (
            <p className="text-[11px] font-medium text-[#DC2626]">
              {errors.userName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="admin-email"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#083952]"
          >
            <FiMail className="h-3.5 w-3.5 text-[#64748B]" />
            <span>Email Address</span>
            <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="e.g. admin@touristmarket.com"
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
              errors.email ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-[#DC2626]">
              {errors.email}
            </p>
          )}
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-firstname"
              className="block text-xs font-semibold text-[#083952]"
            >
              First Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="admin-firstname"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName)
                  setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
              placeholder="e.g. John"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                errors.firstName ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
              }`}
            />
            {errors.firstName && (
              <p className="text-[11px] font-medium text-[#DC2626]">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-lastname"
              className="block text-xs font-semibold text-[#083952]"
            >
              Last Name <span className="text-[#DC2626]">*</span>
            </label>
            <input
              id="admin-lastname"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName)
                  setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
              placeholder="e.g. Doe"
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                errors.lastName ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
              }`}
            />
            {errors.lastName && (
              <p className="text-[11px] font-medium text-[#DC2626]">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="admin-password"
            className="flex items-center justify-between text-xs font-semibold text-[#083952]"
          >
            <span className="flex items-center gap-1.5">
              <FiLock className="h-3.5 w-3.5 text-[#64748B]" />
              <span>Password</span>
              {!isEdit && <span className="text-[#DC2626]">*</span>}
            </span>
            {isEdit && (
              <span className="text-[11px] font-normal text-[#94A3B8]">
                Leave empty to retain current password
              </span>
            )}
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              placeholder={
                isEdit
                  ? "Enter new password (optional)"
                  : "Enter a strong password"
              }
              className={`w-full rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                errors.password ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0E4A68] cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <FiEyeOff className="h-4 w-4" />
              ) : (
                <FiEye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] font-medium text-[#DC2626]">
              {errors.password}
            </p>
          )}
        </div>

        {/* Role Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#083952]">
            System Role <span className="text-[#DC2626]">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {ADMIN_ROLES.map((role) => {
              const selected = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                    selected
                      ? "border-[#0E4A68] bg-[#0E4A680A] shadow-2xs"
                      : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-semibold text-[#083952]">
                      {role}
                    </span>
                    <span
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        selected
                          ? "border-[#0E4A68] bg-[#0E4A68]"
                          : "border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">
                    {role === "SuperAdmin"
                      ? "Unrestricted access across all settings and administrators."
                      : "Standard administrative privileges for managing content."}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Status (Only in Edit mode) */}
        {isEdit && (
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#083952]">
                  Account Status
                </p>
                <p className="text-xs text-[#64748B]">
                  {isActive
                    ? "Active: Administrator is permitted to sign in."
                    : "Suspended: Administrator cannot access the portal."}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isActive ? "bg-[#0E4A68]" : "bg-[#CBD5E1]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </form>
    </SlidePanel>
  );
}

export default AdminFormPanel;
