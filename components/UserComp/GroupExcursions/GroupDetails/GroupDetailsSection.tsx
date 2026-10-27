"use client";

import React, { useMemo, useState } from "react";
import { extractErrorMessage } from "@/features/auth/useAuth";
import {
  useGroupExcursionDetailsQuery,
  useRelatedGroupExcursionsQuery,
} from "@/features/groupExcursions/useGroupExcursionDetails";
import { mapGroupExcursionFullDetail } from "@/features/groupExcursions/groupExcursionDetailMapper";
import { GroupDetailsHero } from "./GroupDetailsHero";
import { GroupDetailsGallery } from "./GroupDetailsGallery";
import { GroupDetailsTabs } from "./GroupDetailsTabs";
import { GroupDetailsIncludes } from "./GroupDetailsIncludes";
import { GroupDetailsReviews } from "./GroupDetailsReviews";
import { GroupDetailsBookingSidebar } from "./GroupDetailsBookingSidebar";
import { GroupDetailsRelated } from "./GroupDetailsRelated";
import { GroupBookingForm } from "./GroupBookingForm";

interface GroupDetailsSectionProps {
  excursionId: string;
  locale?: string;
}

export function GroupDetailsSection({
  excursionId,
  locale = "en",
}: GroupDetailsSectionProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { data, isLoading, isError, error } = useGroupExcursionDetailsQuery(
    excursionId,
    locale
  );
  const { data: relatedTrips = [] } = useRelatedGroupExcursionsQuery(
    excursionId,
    locale
  );

  const detail = useMemo(
    () => (data ? mapGroupExcursionFullDetail(data) : null),
    [data]
  );

  if (isLoading) {
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

  if (isError || !detail) {
    const message = isError
      ? extractErrorMessage(error) || "Failed to load excursion details"
      : "Excursion not found";

    return (
      <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-poppins text-lg font-semibold text-[#0E4A68]">
            {message}
          </p>
          <a
            href={`/${locale}/group-excursions`}
            className="px-6 py-2 bg-[#0E4A68] text-white rounded-lg hover:bg-[#083952] transition"
          >
            Back to Excursions
          </a>
        </div>
      </div>
    );
  }

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF8ED] font-poppins text-[#0E4A68]">
      {/* 1. Hero Section (Hidden when booking form is open) */}
      {!isBookingOpen && <GroupDetailsHero detail={detail} locale={locale} />}

      {/* 2. Main Content Two-Column Body */}
      <div
        className={`w-full px-3.5 sm:px-6 lg:px-10 xl:px-16 ${
          isBookingOpen
            ? "pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16"
            : "pt-6 sm:pt-10 lg:pt-12"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Main Content (Left Column - 8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 lg:space-y-10">
            {isBookingOpen ? (
              <GroupBookingForm
                detail={detail}
                onBack={handleCloseBooking}
              />
            ) : (
              <>
                {/* Gallery */}
                <GroupDetailsGallery
                  gallery={detail.gallery}
                  badge={detail.badge}
                />

                {/* Mobile / Tablet Booking Card (accessible directly below gallery on screens < lg) */}
                <div className="block lg:hidden">
                  <GroupDetailsBookingSidebar
                    detail={detail}
                    onBookNow={handleOpenBooking}
                  />
                </div>

                {/* Information Tabs (Description / Itinerary / Highlights / What to Bring / Cancellation Policy) */}
                <GroupDetailsTabs detail={detail} />

                {/* Price Includes & Excludes */}
                <GroupDetailsIncludes detail={detail} />
              </>
            )}
          </div>

          {/* Sidebar (Right Column - 4 cols on desktop, hidden on screens < lg) */}
          <div className="hidden lg:block lg:col-span-4 lg:self-stretch">
            <GroupDetailsBookingSidebar
              detail={detail}
              onBookNow={handleOpenBooking}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <GroupDetailsReviews detail={detail} />
        </div>

        {/* 3. Explore Related Trips Section */}
        {relatedTrips.length > 0 && (
          <GroupDetailsRelated relatedTrips={relatedTrips} locale={locale} />
        )}
      </div>
    </div>
  );
}

export default GroupDetailsSection;
