"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { SITE_SERVICES_CONFIG } from "../config/siteServicesConfig";

interface CarRentalSectionProps {
  locale?: string;
}

export function CarRentalSection({ locale = "en" }: CarRentalSectionProps) {
  const serviceId = SITE_SERVICES_CONFIG.carRental.id;

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Derive cards directly from API data
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "car-rental"))
    : [];

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-8">
      <ServiceHero
        imageSrc="/Services/carServices/hero.jpg"
        altText="Car Rental Hurghada"
      />
      <ServiceGrid
        title="CAR RENTAL HURGHADA"
        subtitle="Explore Hurghada and beyond at your own pace with our wide selection of premium rental cars."
        cards={cards}
        locale={locale}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default CarRentalSection;
