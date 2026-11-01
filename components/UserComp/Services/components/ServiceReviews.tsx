"use client";

import React, { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  useClientServiceReviewsQuery,
  useCreateClientServiceReviewMutation,
  useMarkClientServiceReviewHelpfulMutation,
} from "@/features/serviceReviews/useClientServiceReviews";
import {
  readHelpfulServiceReviewIds,
  markServiceReviewHelpfulInCookie,
  clearSubmittedServiceReviewsCookie,
} from "@/shared/utils/helpfulReviews";
import { extractErrorMessage } from "@/shared/utils/errorUtils";
import { isValidEmail, isValidPhoneNumber } from "@/shared/utils/phoneUtils";
import type { ServiceReviewItem } from "@/models/serviceReview";
import {
  ServiceReviewRatingSummary,
  ServiceReviewForm,
  ServiceReviewList,
  RatingDistributionItem,
} from "./reviews";

export interface ServiceReviewsProps {
  subServiceId: string;
}

export function ServiceReviews({ subServiceId }: ServiceReviewsProps) {
  const { data: reviewsData, isLoading, isError, error: queryError } =
    useClientServiceReviewsQuery(subServiceId);

  const { mutate: submitReview, isPending: isSubmitting } =
    useCreateClientServiceReviewMutation();

  const { mutate: markHelpful } = useMarkClientServiceReviewHelpfulMutation();

  const items: ServiceReviewItem[] = reviewsData?.items ?? [];
  const totalReviews = reviewsData?.totalCount ?? 0;

  // Form state
  const [userRating, setUserRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");

  // Helpful likes and mobile count tracking
  const [likeOverrides, setLikeOverrides] = useState<Record<string, number>>({});
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [visibleCountMobile, setVisibleCountMobile] = useState<number>(3);

  useEffect(() => {
    const map: Record<string, boolean> = {};
    readHelpfulServiceReviewIds().forEach((id) => {
      map[id] = true;
    });
    setLikedMap(map);

    // Clear legacy cookie that permanently locked the review form
    clearSubmittedServiceReviewsCookie();
  }, [subServiceId]);

  useEffect(() => {
    if (isError && queryError) {
      toast.error(
        extractErrorMessage(queryError, "Unable to load reviews for this service.")
      );
    }
  }, [isError, queryError]);

  const averageRating = useMemo(() => {
    if (items.length === 0) return 0;
    const sum = items.reduce((acc, r) => acc + (r.rate || 5), 0);
    return Math.round((sum / items.length) * 10) / 10;
  }, [items]);

  const distribution: RatingDistributionItem[] = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    items.forEach((r) => {
      const star = Math.min(Math.max(Math.round(r.rate || 5), 1), 5);
      counts[star]++;
    });

    const denom = totalReviews > 0 ? totalReviews : items.length;

    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percentage: denom > 0 ? Math.round((counts[star] / denom) * 100) : 0,
    }));
  }, [items, totalReviews]);

  const handleHelpful = (id: string) => {
    if (likedMap[id]) return;

    const target = items.find((r) => r.id === id);
    const currentLikes =
      likeOverrides[id] !== undefined
        ? likeOverrides[id]
        : target?.helpfulCount ?? 0;

    setLikedMap((prev) => ({ ...prev, [id]: true }));
    markServiceReviewHelpfulInCookie(id);
    setLikeOverrides((prev) => ({ ...prev, [id]: currentLikes + 1 }));

    markHelpful(id, {
      onSuccess: (response) => {
        const nextCount = response?.data;
        if (typeof nextCount === "number") {
          setLikeOverrides((prev) => ({ ...prev, [id]: nextCount }));
        }
      },
      onError: (err: unknown) => {
        setLikedMap((prev) => ({ ...prev, [id]: false }));
        setLikeOverrides((prev) => ({ ...prev, [id]: currentLikes }));
        toast.error(extractErrorMessage(err, "Unable to register helpful vote."));
      },
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subServiceId || alreadySubmitted) return;

    if (!userRating || userRating < 1) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!userName.trim() || userName.trim().length < 2) {
      toast.error("Please enter your name (at least 2 characters).");
      return;
    }
    if (!userEmail.trim() || !isValidEmail(userEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!userPhone.trim() || !isValidPhoneNumber(userPhone)) {
      toast.error(
        "Please enter a valid phone number (7 to 15 digits)."
      );
      return;
    }
    if (!userReview.trim() || userReview.trim().length < 5) {
      toast.error("Please write your review before submitting (at least 5 characters).");
      return;
    }

    submitReview(
      {
        subServiceId,
        fullName: userName.trim(),
        email: userEmail.trim(),
        phone: userPhone.trim(),
        rate: userRating,
        comment: userReview.trim(),
      },
      {
        onSuccess: () => {
          setAlreadySubmitted(true);
          setUserRating(0);
          setUserName("");
          setUserEmail("");
          setUserPhone("");
          setUserReview("");
          toast.success(
            "Thank you! Your review has been submitted for approval and will appear once reviewed."
          );
        },
        onError: (err: unknown) => {
          toast.error(
            extractErrorMessage(
              err,
              "We could not submit your review. Please try again."
            )
          );
        },
      }
    );
  };

  return (
    <section className="w-full font-poppins my-8 sm:my-12 md:my-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Rating Overview & Review Submission Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ServiceReviewRatingSummary
            averageRating={averageRating}
            totalReviews={totalReviews}
            distribution={distribution}
          />

          <ServiceReviewForm
            alreadySubmitted={alreadySubmitted}
            onResetSubmitted={() => setAlreadySubmitted(false)}
            userRating={userRating}
            userName={userName}
            userEmail={userEmail}
            userPhone={userPhone}
            userReview={userReview}
            isSubmitting={isSubmitting}
            onRatingChange={setUserRating}
            onNameChange={setUserName}
            onEmailChange={setUserEmail}
            onPhoneChange={setUserPhone}
            onReviewChange={setUserReview}
            onSubmit={handleSubmitReview}
          />
        </div>

        {/* Right Column: Reviews List */}
        <div className="lg:col-span-7">
          <ServiceReviewList
            items={items}
            totalReviews={totalReviews}
            isLoading={isLoading}
            likedMap={likedMap}
            likeOverrides={likeOverrides}
            visibleCountMobile={visibleCountMobile}
            onHelpful={handleHelpful}
            onLoadMoreMobile={() => setVisibleCountMobile((prev) => prev + 5)}
          />
        </div>
      </div>
    </section>
  );
}

export default ServiceReviews;
