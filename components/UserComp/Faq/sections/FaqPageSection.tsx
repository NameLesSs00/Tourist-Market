"use client";

import React from "react";
import { FaqHero } from "../components";
import { FaqCatalogSection } from "./FaqCatalogSection";

interface FaqPageSectionProps {
  locale?: string;
}

export function FaqPageSection({ locale = "en" }: FaqPageSectionProps) {
  return (
    <div className="w-full bg-[#FFF2DF]">
      {/* 1. FAQ Hero Banner */}
      <FaqHero locale={locale} />

      {/* 2. Full FAQ Catalog Component with Scroll & Search Enabled */}
      <FaqCatalogSection locale={locale} showSearch />
    </div>
  );
}

export default FaqPageSection;
