"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { SITE_SERVICES_CONFIG } from "../config/siteServicesConfig";

interface RealEstateSectionProps {
  locale?: string;
}

export function RealEstateSection({ locale = "en" }: RealEstateSectionProps) {
  const serviceId = SITE_SERVICES_CONFIG.realEstate.id;

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Derive cards directly from API data
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "real-estate"))
    : [];

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-8">
      <ServiceHero
        imageSrc="/Services/RealEstate/hero.png"
        altText="Red Sea Real Estate"
      />
      <ServiceGrid
        title="RED SEA REAL ESTATE"
        subtitle="Do you dream of owning a piece of Red Sea paradise? We are here to guide you every step of the way."
        cards={cards}
        locale={locale}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default RealEstateSection;
