"use client";

import React from "react";
import { ServiceHero, ServiceGrid } from "../components";
import {
  useSiteServiceIdByTitle,
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";

interface RealEstateSectionProps {
  locale?: string;
}

export function RealEstateSection({ locale = "en" }: RealEstateSectionProps) {
  const serviceId = useSiteServiceIdByTitle("real estate", locale);

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  // Only derive cards from real API data — never fall back to dummy content
  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "real-estate"))
    : [];

  // Still loading the parent service id (first network call)
  const isWaiting = !serviceId || isLoading;

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
        isLoading={isWaiting}
        isError={isError}
      />
    </div>
  );
}

export default RealEstateSection;
