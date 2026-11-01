"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { SITE_SERVICES_CONFIG } from "../config/siteServicesConfig";

interface TouristServicesSectionProps {
  locale?: string;
}

export function TouristServicesSection({ locale = "en" }: TouristServicesSectionProps) {
  const serviceId = SITE_SERVICES_CONFIG.touristServices.id;

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Derive cards from real API data
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "tourist"))
    : [];

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-8">
      <ServiceHero
        imageSrc="/Services/Touristservices/hero.png"
        altText="Tourist Services in Hurghada"
      />
      <ServiceGrid
        title="TOURIST SERVICES"
        subtitle="Discover our comprehensive range of tourist services tailored for your perfect Egyptian experience."
        cards={cards}
        locale={locale}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default TouristServicesSection;
