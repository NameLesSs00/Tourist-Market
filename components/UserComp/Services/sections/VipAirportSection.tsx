"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  useSiteServiceIdByTitle,
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";

interface VipAirportSectionProps {
  locale?: string;
}

export function VipAirportSection({ locale = "en" }: VipAirportSectionProps) {
  const serviceId = useSiteServiceIdByTitle("vip", locale);

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Only derive cards from real API data — never fall back to dummy content
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "vip-airport"))
    : [];

  // Still loading the parent service id (first network call)
  const isWaiting = !serviceId || isLoading;

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
        isLoading={isWaiting}
        isError={isError}
      />
    </div>
  );
}

export default VipAirportSection;
