"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceHero, ServiceGrid } from "../components";
import {
  usePublicServiceSubItems,
  mapSubItemToCard,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { SITE_SERVICES_CONFIG } from "../config/siteServicesConfig";
import { useClientDictionary } from "@/shared/providers/ClientDictionaryContext";

interface VipAirportSectionProps {
  locale?: string;
}

export function VipAirportSection({ locale = "en" }: VipAirportSectionProps) {
  const serviceId = SITE_SERVICES_CONFIG.vipAirport.id;
  const dict = useClientDictionary();
  const t = dict.vipAirport;
  const billingLabels = {
    perHour: dict.serviceDetail.billingPerHour,
    perDay: dict.serviceDetail.billingPerDay,
  };

  const { data: subItems, isLoading, isError } = usePublicServiceSubItems(
    serviceId,
    locale
  );

  const cards = subItems
    ? subItems.map((item) => mapSubItemToCard(item, "vip-airport", billingLabels))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-8"
    >
      <ServiceHero
        imageSrc="/Services/Vip-airport/hero.png"
        altText={t.heroAlt}
      />
      <ServiceGrid
        title={t.title}
        subtitle={t.subtitle}
        cards={cards}
        locale={locale}
        isLoading={isLoading}
        isError={isError}
        errorText={t.errorLoading}
        emptyText={t.emptyState}
        viewDetailsText={t.viewDetails}
        whatsappText={t.whatsapp}
      />
    </motion.div>
  );
}

export default VipAirportSection;
