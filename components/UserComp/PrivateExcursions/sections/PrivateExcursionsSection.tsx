"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  PrivateExcursionsHero,
  PrivateExcursionsFilter,
  PrivateExcursionsGrid,
} from "../components";
import { getPrivateExcursions } from "../data/privateExcursionsService";
import { PrivateExcursion, PrivateExcursionFilterParams } from "../types";

interface PrivateExcursionsSectionProps {
  locale?: string;
  initialExcursions?: PrivateExcursion[];
}

export function PrivateExcursionsSection({
  locale = "en",
  initialExcursions,
}: PrivateExcursionsSectionProps) {
  const [excursions, setExcursions] = useState<PrivateExcursion[]>(
    initialExcursions || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(!initialExcursions);
  const [isPending, startTransition] = useTransition();

  // Load initial excursions if not supplied
  useEffect(() => {
    if (!initialExcursions) {
      let isMounted = true;
      getPrivateExcursions().then((data) => {
        if (isMounted) {
          setExcursions(data);
          setIsLoading(false);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [initialExcursions]);

  const handleFilterChange = (params: PrivateExcursionFilterParams) => {
    startTransition(async () => {
      setIsLoading(true);
      const filtered = await getPrivateExcursions(params);
      setExcursions(filtered);
      setIsLoading(false);
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] text-[#0E4A68]">
      {/* 1. Hero Banner with animated traveling arrow and 5 hexagons */}
      <PrivateExcursionsHero />

      {/* 2. Filter Form */}
      <PrivateExcursionsFilter onFilterChange={handleFilterChange} />

      {/* 3. Excursions Grid (3 columns, 12 cards) */}
      <PrivateExcursionsGrid
        excursions={excursions}
        isLoading={isLoading || isPending}
        locale={locale}
      />
    </div>
  );
}

export default PrivateExcursionsSection;
