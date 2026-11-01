"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { SITE_SERVICES_CONFIG } from "../config/siteServicesConfig";

interface VipAirportSectionProps {
  locale?: string;
}

export function VipAirportSection({ locale = "en" }: VipAirportSectionProps) {
  const serviceId = SITE_SERVICES_CONFIG.vipAirport.id;

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Derive cards from real API data
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "vip-airport"))
    : [];

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-8">
      <ServiceHero
        imageSrc="/Services/Vip-airport/hero.png"
        altText="VIP Hurghada Airport Services"
      />
      <ServiceGrid
        title="VIP HURGHADA AIRPORT SERVICES"
        subtitle="Elevate your Hurghada departure with our seamless, exclusive VIP services."
        cards={cards}
        locale={locale}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default VipAirportSection;
