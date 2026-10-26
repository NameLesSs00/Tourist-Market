"use client";

import React, { useState, useEffect, useTransition } from "react";
import { GroupExcursionDetail } from "../types";
import { getGroupExcursionBySlug } from "../data/groupExcursionsService";
import { DUMMY_GROUP_EXCURSIONS } from "../data/dummyGroupExcursions";
import { GroupDetailsHero } from "./GroupDetailsHero";
import { GroupDetailsGallery } from "./GroupDetailsGallery";
import { GroupDetailsTabs } from "./GroupDetailsTabs";
import { GroupDetailsIncludes } from "./GroupDetailsIncludes";
import { GroupDetailsReviews } from "./GroupDetailsReviews";
import { GroupDetailsBookingSidebar } from "./GroupDetailsBookingSidebar";
import { GroupDetailsRelated } from "./GroupDetailsRelated";

interface GroupDetailsSectionProps {
  slug?: string;
  locale?: string;
}

export function GroupDetailsSection({
  slug = "one-day-trip-to-cairo-full-program-1",
  locale = "en",
}: GroupDetailsSectionProps) {
  const [detail, setDetail] = useState<GroupExcursionDetail | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isCancelled = false;

    startTransition(async () => {
      const result = await getGroupExcursionBySlug(slug);
      if (!isCancelled && result) {
        setDetail(result);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (!detail && isPending) {
    return (
      <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#0E4A68] border-t-transparent animate-spin" />
          <p className="font-poppins text-base font-semibold text-[#0E4A68]">
            Loading Excursion Details...
          </p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins text-[#0E4A68]">
      {/* 1. Hero Section */}
      <GroupDetailsHero detail={detail} locale={locale} />

      {/* 2. Main Content Two-Column Body */}
      <div className="mx-auto w-full max-w-[1340px] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Content (Left Column - 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery */}
            <GroupDetailsGallery
              gallery={detail.gallery}
              badge={detail.badge}
            />

            {/* Information Tabs (Description / Itinerary / Highlights / What to Bring / Cancellation Policy) */}
            <GroupDetailsTabs detail={detail} />

            {/* Price Includes & Excludes */}
            <GroupDetailsIncludes detail={detail} />
          </div>

          {/* Sidebar (Right Column - 4 cols on desktop) */}
          <div className="lg:col-span-4">
            <GroupDetailsBookingSidebar detail={detail} />
          </div>
        </div>

        {/* Reviews Section: Reviews (491px) + Share your opinion (491px) & Reviews and comments (858px) */}
        <div className="mt-10 sm:mt-12">
          <GroupDetailsReviews detail={detail} />
        </div>

        {/* 3. Explore Related Trips Section */}
        <GroupDetailsRelated
          relatedTrips={DUMMY_GROUP_EXCURSIONS}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default GroupDetailsSection;
