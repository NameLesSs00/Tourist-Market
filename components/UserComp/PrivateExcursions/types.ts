import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";

export interface PrivateExcursionPriceItem {
  currencyCode: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface PrivateExcursion {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  excursionType: string;
  duration: string;
  durationHours: number;
  stars: string;
  rating: number;
  category: "Historical" | "FUN Trips" | "Marine & Boat" | "Desert Safari" | string;
  categorySlug: string;
  badge?: string;
  imageUrl: string;
  isFeatured?: boolean;
  prices: PrivateExcursionPriceItem[];
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
}

export interface PrivateExcursionFilterParams {
  searchQuery?: string;
  category?: string;
  duration?: string;
}

export interface CategoryOption {
  label: string;
  value: string;
}

export interface DurationOption {
  label: string;
  value: string;
  minHours?: number;
  maxHours?: number;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
  likes: number;
}

export interface RatingDistribution {
  star: number;
  percentage: number;
  count: number;
}

export interface PrivateAttraction {
  id: string;
  title: string;
  description: string;
  images: string[];
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface PrivateExtraService {
  id: string;
  title: string;
  description: string;
  images: string[];
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
}

export interface VehicleOption {
  id: string;
  name: string;
  capacityText: string;
  price: number;
}

export interface PrivateExcursionDetail extends PrivateExcursion {
  gallery: string[];
  aboutTitle: string;
  aboutParagraphs: string[];
  itinerary: ItineraryItem[];
  highlights: string[];
  whatToBring: string[];
  cancellationPolicy: string;
  priceIncludes: string[];
  priceExcludes: string[];
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
  comments: ReviewComment[];
  maxAttractions: number;
  attractions: PrivateAttraction[];
  extraServices: PrivateExtraService[];
  vehicles: VehicleOption[];
  availabilityDays?: ExcursionAvailabilityDay[];
  availability?: string;
}

