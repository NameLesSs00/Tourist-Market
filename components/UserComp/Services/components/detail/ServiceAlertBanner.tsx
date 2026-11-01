"use client";

import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface ServiceAlertBannerProps {
  alert?: string;
}

export function ServiceAlertBanner({ alert }: ServiceAlertBannerProps) {
  if (!alert || !alert.trim()) return null;

  return (
    <div className="p-3.5 sm:p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
      <FiAlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="flex-1 leading-relaxed font-medium">
        <strong className="font-bold">Important Notice:</strong> {alert}
      </div>
    </div>
  );
}

export default ServiceAlertBanner;

