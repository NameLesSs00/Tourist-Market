"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  useSiteServiceIdByTitle,
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";

interface CarRentalSectionProps {
  locale?: string;
}

export function CarRentalSection({ locale = "en" }: CarRentalSectionProps) {
  const serviceId = useSiteServiceIdByTitle("car", locale);

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Only derive cards from real API data — never fall back to dummy content
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "car-rental"))
    : [];

  // Still loading the parent service id (first network call)
  const isWaiting = !serviceId || isLoading;

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
        isLoading={isWaiting}
        isError={isError}
      />
    </div>
  );
}

export default CarRentalSection;
