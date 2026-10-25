"use client";

import React, { useState } from "react";
import { FaCheck, FaLink } from "react-icons/fa";
import { toast } from "sonner";

interface BlogDetailShareProps {
  title?: string;
}

export function BlogDetailShare({ title: _title }: BlogDetailShareProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 py-2 sm:py-3">
      <span className="font-['Poppins'] text-xs sm:text-sm md:text-base font-semibold text-[#0A3951] tracking-wide">
        SHARE :
      </span>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        title={copied ? "Link Copied" : "Copy Article Link"}
        aria-label="Copy link"
        className={`h-10 w-10 sm:h-9 sm:w-9 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
          copied
            ? "border-emerald-500 bg-emerald-50 text-emerald-600 scale-105"
            : "border-slate-300 bg-white/80 text-[#0A3951] hover:border-[#0A3951] hover:bg-white active:scale-95"
        }`}
      >
        {copied ? (
          <FaCheck className="h-3.5 w-3.5" />
        ) : (
          <FaLink className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

export default BlogDetailShare;
