"use client";

import React from "react";
import { motion } from "framer-motion";
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col gap-6 lg:h-[774px] justify-between"
        >
          <TransferReviewsRatingOverview items={items} totalCount={totalCount} locale={locale} />
          <TransferReviewsShareOpinion locale={locale} />
        </motion.div>

        {/* RIGHT COLUMN: Reviews & Comments (Fixed height ~774px with desktop smooth scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col h-[774px]"
        >
          <TransferReviewsCommentsList items={items} isLoading={isLoading} locale={locale} />
        </motion.div>
      </div>
    </section>
  );
}

export default TransferReviews;
