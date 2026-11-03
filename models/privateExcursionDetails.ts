import type { PrivateExcursionDetail } from "./privateExcursion";
import type { ExcursionDetailsDto } from "./excursionDetails";
import type { ExcursionAvailabilityDay } from "./excursionAvailability";
import type { ExcursionReviewItem } from "./excursionReview";

export interface PrivateAttractionItem {
  id: string;
  title: string;
  description: string;
  heroImage: string | null;
  displayOrder: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
  images: string[];
}

export interface PrivateServiceItem {
  id: string;
  title: string;
  description: string;
  heroImage: string | null;
  displayOrder: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
  images: string[];
}

export interface PrivateExcursionFullDetail {
  excursion: PrivateExcursionDetail;
  details: ExcursionDetailsDto | null;
  attractions: PrivateAttractionItem[];
  services: PrivateServiceItem[];
  reviews: ExcursionReviewItem[];
  availabilityDays: ExcursionAvailabilityDay[];
  reviewStats: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { star: number; count: number; percentage: number }[];
  };
}

