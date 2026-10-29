"use client";

import React from "react";
import Link from "next/link";
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
} from "@/features/siteServiceItems/usePublicServiceItems";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
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
  serviceType: ServiceDetailItem["serviceType"]
): ServiceDetailItem {
  // First gallery image
  const sortedImages = item.images && item.images.length > 0
    ? [...item.images].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    : [];
  const rawImage = sortedImages[0]?.imageUrl || item.images?.[0]?.imageUrl;
  const firstImage = getBackendImageUrl(rawImage) ?? "";

  // Notes: each non-empty line of the note field becomes a numbered note
  const notes: string[] = item.note
    ? item.note.split("\n").map((n) => n.trim()).filter(Boolean)
    : [];

  // Price display
  const price = item.price ?? item.basePriceUSD ?? 0;
  const priceFormatted = `$${price}`;

  // Feature values for car-style spec rows (model year, transmission, A/C)
  const allFeatureValues = item.features.flatMap((f) =>
    f.values.map((v) => v.name)
  );
  const modelYear =
    allFeatureValues.find((v) => /20\d\d/.test(v)) || undefined;
  const transmission =
    allFeatureValues.find((v) => /automatic|manual/i.test(v)) || undefined;
  const airConditioning =
    allFeatureValues.find((v) => /air.?con/i.test(v)) || undefined;

  // Option values displayed as "Cost Services" (e.g. price tiers)
  const costServices: string[] = item.options.flatMap((opt) =>
    opt.values.map((v) => (v.value ? `${v.key}: ${v.value}` : v.key))
  );

  const formTitle =
    serviceType === "car-rental"
      ? "Car Rental"
      : serviceType === "vip-airport"
      ? "VIP Services"
      : serviceType === "real-estate"
      ? "Real Estate"
      : "Tourist Services";

  return {
    id: item.id,
    slug: item.id,
    title: item.title,
    description: item.description,
    imageUrl: firstImage,
    serviceType,
    // Spec rows (car-rental / vip-airport)
    modelYear,
    transmission,
    airConditioning,
    // Tagline + body (tourist / real-estate)
    tagline: item.textTopImage || item.subtitle || undefined,
    detailedDescription: item.description,
    // Notes
    notes: notes.length > 0 ? notes : undefined,
    // Pricing
    priceFormatted,
    billingPeriod: serviceType === "tourist" ? "Per Hour" : "Per Day",
    bookingButtonText:
      serviceType === "car-rental" ? "Book This Car ↓" : "Book This Service ↓",
    // Form labels
    formTitle,
    formSubtitle: item.title,
    // Cost tiers from options
    costServices: costServices.length > 0 ? costServices : undefined,
  };
}

// ─── Back button ──────────────────────────────────────────────────────────────
function BackButton({ href }: { href: string }) {
  return (
    <div className="mb-6 max-w-[960px] mx-auto">
      <Link
        href={href}
        style={{
          backgroundColor: "#FFFFFF",
          border: "0.5px solid #888888",
          borderRadius: "5px",
        }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#0E4A68] hover:bg-slate-50 transition-colors shadow-sm"
      >
        <FiArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Link>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="w-full max-w-[960px] mx-auto animate-pulse">
      <div className="w-full aspect-[960/480] bg-slate-200 rounded-lg" />
      <div className="mt-8 space-y-4">
        <div className="h-8 w-1/2 bg-slate-200 rounded mx-auto" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-4/5 bg-slate-100 rounded" />
        <div className="h-4 w-3/5 bg-slate-100 rounded" />
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ServiceDetailSection({
  serviceType,
  slug,
  locale = "en",
}: ServiceDetailSectionProps) {
  const backHref = `/${locale}/services/${serviceType}`;
  const validId = isUUID(slug);

  const {
    data: subItem,
    isLoading,
    isError,
    fetchStatus,
  } = usePublicServiceSubItemById(slug, locale);

  // "idle" fetchStatus + disabled = slug was not a UUID → treat as not found
  const isNotFound =
    (!validId) ||
    (!isLoading && !subItem && fetchStatus === "idle") ||
    (!isLoading && isError);

  const detail: ServiceDetailItem | null = subItem
    ? mapSubItemToDetail(subItem, serviceType)
    : null;

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] py-6 sm:py-10 font-poppins text-[#0E4A68]">
      <div className="w-full max-w-[1320px] mx-auto px-4">
        <BackButton href={backHref} />

        {/* Loading */}
        {isLoading && <DetailSkeleton />}

        {/* Not found / invalid slug */}
        {!isLoading && isNotFound && (
          <div className="w-full max-w-[960px] mx-auto text-center py-20">
            <p className="text-[#0E4A68] text-base font-semibold opacity-60">
              Service not found.
            </p>
            <Link
              href={backHref}
              className="mt-4 inline-block text-sm text-[#134B68] underline"
            >
              Back to listing
            </Link>
          </div>
        )}

        {/* Loaded successfully */}
        {!isLoading && detail && (
          <>
            {/* 1. Service Details Card */}
            <ServiceDetailCard detail={detail} />

            {/* 2. Booking Form */}
            <ServiceBookingForm detail={detail} />

            {/* 3. Contact Us */}
            <ServiceContactUs />

            {/* 4. Reviews — pass real sub-item UUID */}
            <ServiceReviews subServiceId={subItem!.id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailSection;
