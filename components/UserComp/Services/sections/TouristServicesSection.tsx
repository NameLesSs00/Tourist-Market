"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  useSiteServiceIdByTitle,
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";

interface TouristServicesSectionProps {
  locale?: string;
}

export function TouristServicesSection({ locale = "en" }: TouristServicesSectionProps) {
  const serviceId = useSiteServiceIdByTitle("tourist", locale);

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Only derive cards from real API data — never fall back to dummy content
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "tourist"))
    : [];

  // Still loading the parent service id (first network call)
  const isWaiting = !serviceId || isLoading;

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
        isLoading={isWaiting}
        isError={isError}
      />
    </div>
  );
}

export default TouristServicesSection;
