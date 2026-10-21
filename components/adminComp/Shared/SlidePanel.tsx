"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Tailwind max-width class for the panel. */
  widthClassName?: string;
}

/** Right-hand slide-in panel used for every create / edit flow in the admin. */
export function SlidePanel({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  widthClassName = "max-w-2xl",
}: SlidePanelProps) {
  // Close on Escape and lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex justify-end">
          <motion.div
            key="overlay"
            className="absolute inset-0 bg-[#0F172A80] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative flex h-full w-full ${widthClassName} flex-col bg-[#FFFFFF] shadow-2xl`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] px-6 py-5">
              <div className="flex items-start gap-3">
                {icon && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0E4A681A] text-[#0E4A68]">
                    {icon}
                  </div>
                )}
                <div>
                  <h2 className="font-poppins text-lg font-semibold text-[#083952]">{title}</h2>
                  {subtitle && <p className="mt-0.5 text-sm text-[#64748B]">{subtitle}</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-lg p-2 text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#334155] cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            {footer && (
              <footer className="flex items-center justify-end gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
                {footer}
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SlidePanel;
