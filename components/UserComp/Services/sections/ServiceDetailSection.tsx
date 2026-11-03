"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import {
  ServiceDetailCard,
  ServiceBookingForm,
  ServiceContactUs,
  ServiceReviews,
} from "../components";
import {
  usePublicServiceSubItemById,
  isUUID,
  SERVICE_FALLBACK_IMAGE,
} from "@/features/siteServiceItems/usePublicServiceItems";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import { getDictionary } from "@/shared/utils/getDictionary";
import type { ServiceDetailItem } from "../types";
import type { SiteServiceSubItem } from "@/models/siteServiceItem";

interface ServiceDetailSectionProps {
  serviceType: "vip-airport" | "real-estate" | "tourist" | "car-rental";
  slug: string;
  locale?: string;
}

/** Maps the API SiteServiceSubItem to the local ServiceDetailItem view model */
function mapSubItemToDetail(
  item: SiteServiceSubItem,
  serviceType: ServiceDetailItem["serviceType"],
  t: ReturnType<typeof getDictionary>["serviceDetail"]
): ServiceDetailItem {
  const sortedImages = item.images && item.images.length > 0
    ? [...item.images].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    : [];
  const rawImage = sortedImages[0]?.imageUrl || item.images?.[0]?.imageUrl;
  const firstImage = getBackendImageUrl(rawImage) || SERVICE_FALLBACK_IMAGE;
  const galleryImages = sortedImages
    .map((img) => getBackendImageUrl(img.imageUrl) ?? "")
    .filter(Boolean);

  const notes: string[] = item.note
    ? item.note.split("\n").map((n) => n.trim()).filter(Boolean)
    : [];

  const price = item.price ?? item.basePriceUSD ?? 0;
  const priceFormatted = `$${price}`;

  // Structured specifications from features
  const specifications = item.features.flatMap((f) =>
    f.values.map((v) => {
      const colonIdx = v.name.indexOf(":");
      if (colonIdx > 0) {
        return {
          label: v.name.substring(0, colonIdx).trim(),
          value: v.name.substring(colonIdx + 1).trim(),
        };
      }
      return { label: f.name || "Specification", value: v.name };
    })
  );

  // Inclusions extracted from feature groups
  const inclusions = item.features
    .filter((f) => /inclusion|included|perks/i.test(f.name))
    .flatMap((f) => f.values.map((v) => v.name));

  // Structured options and duration tiers
  const optionsTiers = item.options.map((opt) => ({
    name: opt.name || t.pricingTitle,
    tiers: opt.values.map((v) => ({ key: v.key, value: v.value })),
  }));

  const allFeatureValues = item.features.flatMap((f) =>
    f.values.map((v) => v.name)
  );
  const modelYear =
    allFeatureValues.find((v) => /20\d\d/.test(v)) || undefined;
  const transmission =
    allFeatureValues.find((v) => /automatic|manual/i.test(v)) || undefined;
  const airConditioning =
    allFeatureValues.find((v) => /air.?con/i.test(v)) || undefined;

  const costServices: string[] = item.options.flatMap((opt) =>
    opt.values.map((v) => (v.value ? `${v.key}: ${v.value}` : v.key))
  );

  const formTitle =
    serviceType === "car-rental"
      ? t.formTitleCarRental
      : serviceType === "vip-airport"
      ? t.formTitleVip
      : serviceType === "real-estate"
      ? t.formTitleRealEstate
      : t.formTitleTourist;

  return {
    id: item.id,
    slug: item.id,
    title: item.title,
    description: item.description,
    imageUrl: firstImage,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
    serviceType,
    modelYear,
    transmission,
    airConditioning,
    specifications: specifications.length > 0 ? specifications : undefined,
    inclusions: inclusions.length > 0 ? inclusions : undefined,
    optionsTiers: optionsTiers.length > 0 ? optionsTiers : undefined,
    alert: item.alert || undefined,
    tagline: item.textTopImage || item.subtitle || undefined,
    detailedDescription: item.description,
    notes: notes.length > 0 ? notes : undefined,
    priceFormatted,
    billingPeriod: serviceType === "tourist" ? t.billingPerHour : t.billingPerDay,
    bookingButtonText:
      serviceType === "car-rental"
        ? t.bookingButtonCarRental
        : serviceType === "real-estate"
        ? t.bookingButtonRealEstate
        : t.bookingButtonTourist,
    formTitle,
    formSubtitle: item.title,
    costServices: costServices.length > 0 ? costServices : undefined,
  };
}

function BackButton({ href, label }: { href: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mb-4 sm:mb-6 max-w-[960px] mx-auto"
    >
      <Link
        href={href}
        style={{
          backgroundColor: "#FFFFFF",
          border: "0.5px solid #888888",
          borderRadius: "5px",
        }}
        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>{label}</span>
      </Link>
    </motion.div>
  );
}

function DetailSkeleton() {
  return (
    <div className="w-full max-w-[960px] mx-auto animate-pulse">
      <div className="w-full aspect-[16/9] sm:aspect-[960/480] bg-slate-200 rounded-lg" />
      <div className="mt-6 sm:mt-8 space-y-4">
        <div className="h-7 sm:h-8 w-1/2 bg-slate-200 rounded mx-auto" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-4/5 bg-slate-100 rounded" />
        <div className="h-4 w-3/5 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

export function ServiceDetailSection({
  serviceType,
  slug,
  locale = "en",
}: ServiceDetailSectionProps) {
  const dict = getDictionary(locale);
  const t = dict.serviceDetail;
  const backHref = `/${locale}/services/${serviceType}`;
  const validId = isUUID(slug);

  const {
    data: subItem,
    isLoading,
    isError,
  } = usePublicServiceSubItemById(slug, locale);

  const detail: ServiceDetailItem | null = subItem
    ? mapSubItemToDetail(subItem, serviceType, t)
    : null;

  const isNotFound = !isLoading && (!subItem || !validId || isError);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen bg-[#FFF8ED] pt-4 sm:pt-8 md:pt-10 pb-16 sm:pb-24 md:pb-32 font-poppins text-[#0E4A68]"
    >
      <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-4 lg:px-6">
        <BackButton href={backHref} label={t.back} />

        {/* Loading */}
        {isLoading && <DetailSkeleton />}

        {/* Not found */}
        {isNotFound && (
          <div className="w-full max-w-[960px] mx-auto text-center py-16 sm:py-20">
            <p className="text-[#0E4A68] text-sm sm:text-base font-semibold opacity-60">
              {t.notFound}
            </p>
            <Link
              href={backHref}
              className="mt-4 inline-block text-xs sm:text-sm text-[#134B68] underline"
            >
              {t.backToListing}
            </Link>
          </div>
        )}

        {/* Loaded successfully */}
        {!isLoading && detail && (
          <div className="space-y-6 sm:space-y-8">
            {/* 1. Service Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ServiceDetailCard detail={detail} locale={locale} />
            </motion.div>

            {/* 2. Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ServiceBookingForm detail={detail} locale={locale} />
            </motion.div>

            {/* 3. Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ServiceContactUs locale={locale} />
            </motion.div>

            {/* 4. Reviews — pass real sub-item UUID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <ServiceReviews subServiceId={subItem!.id} locale={locale} />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ServiceDetailSection;
