"use client";

import React from "react";
import { useClientTransferReviewsQuery } from "@/features/transferReviews";
import {
  TransferReviewsRatingOverview,
  TransferReviewsShareOpinion,
  TransferReviewsCommentsList,
} from "./reviews";

interface TransferReviewsProps {
  locale?: string;
}

export function TransferReviews({ locale = "en" }: TransferReviewsProps) {
  const { data: reviewsData, isLoading } = useClientTransferReviewsQuery({
    pageSize: 50,
    language: locale,
  });

  const items = reviewsData?.items ?? [];
  const totalCount = reviewsData?.totalCount ?? items.length;

  return (
    <section className="w-full font-poppins pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: Rating Overview Card + Share Opinion Card (Total height ~774px on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:h-[774px] justify-between">
          <TransferReviewsRatingOverview items={items} totalCount={totalCount} />
          <TransferReviewsShareOpinion />
        </div>

        {/* RIGHT COLUMN: Reviews & Comments (Fixed height ~774px with desktop smooth scroll) */}
        <TransferReviewsCommentsList items={items} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default TransferReviews;
