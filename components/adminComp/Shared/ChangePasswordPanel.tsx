"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff, FiKey, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "./SlidePanel";
import { useChangePasswordMutation, extractErrorMessage } from "@/features/auth/useAuth";

interface ChangePasswordPanelProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] py-2.5 pl-3.5 pr-10 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6833]";

export function ChangePasswordPanel({ open, onClose }: ChangePasswordPanelProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const mutation = useChangePasswordMutation();

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShow({ current: false, next: false, confirm: false });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    mutation.mutate(
      { currentPassword, newPassword, confirmPassword },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || "Password changed successfully.");
            handleClose();
          } else {
            toast.error(res.message || "Failed to change password.");
          }
        },
        onError: (err) => toast.error(extractErrorMessage(err)),
      }
    );
  };

  const fields = [
    { key: "current" as const, label: "Current password", value: currentPassword, set: setCurrentPassword },
    { key: "next" as const, label: "New password", value: newPassword, set: setNewPassword },
    { key: "confirm" as const, label: "Confirm new password", value: confirmPassword, set: setConfirmPassword },
  ];

  return (
    <SlidePanel
      open={open}
      onClose={handleClose}
      title="Change Password"
      subtitle="Use at least 6 characters."
      icon={<FiKey className="h-5 w-5" />}
      widthClassName="max-w-md"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="change-password-form"
            disabled={mutation.isPending}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {mutation.isPending && <FiLoader className="h-4 w-4 animate-spin" />}
            {mutation.isPending ? "Updating..." : "Update Password"}
          </button>
        </>
      }
    >
      <form id="change-password-form" onSubmit={handleSubmit} className="space-y-5">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <label htmlFor={`pw-${f.key}`} className="block text-sm font-semibold text-[#083952]">
              {f.label}
            </label>
            <div className="relative">
              <input
                id={`pw-${f.key}`}
                type={show[f.key] ? "text" : "password"}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                autoComplete={f.key === "current" ? "current-password" : "new-password"}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, [f.key]: !s[f.key] }))}
                aria-label="Toggle password visibility"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8] hover:text-[#475569] cursor-pointer"
              >
                {show[f.key] ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ))}
      </form>
    </SlidePanel>
  );
}

export default ChangePasswordPanel;
