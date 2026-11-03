"use client";

import React from "react";
import { NeedHelpCard } from "@/components/UserComp/Shared/NeedHelpCard";

interface ProductDetailsNeedHelpProps {
  locale?: string;
}

export function ProductDetailsNeedHelp({ locale = "en" }: ProductDetailsNeedHelpProps) {
  return <NeedHelpCard locale={locale} />;
}

export default ProductDetailsNeedHelp;
