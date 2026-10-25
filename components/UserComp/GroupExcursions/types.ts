export type GroupExcursionCategory =
  | "All Categories"
  | "Historical"
  | "FUN Trips"
  | "Adventure"
  | "Sea Trips";

export type GroupExcursionPriceRange =
  | "All Prices"
  | "0-50"
  | "50-100"
  | "100+";

export type GroupExcursionDurationRange =
  | "All Durations"
  | "under-12"
  | "12-18"
  | "18+";

export interface GroupExcursion {
  id: string;
  slug: string;
  title: string;
  description: string;
  badge: string;
  category: string;
  duration: string;
  durationHours: number;
  rating: number;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  currency: string;
  imageUrl: string;
}

export interface GroupExcursionFilterParams {
  search?: string;
  category?: string;
  price?: string;
  duration?: string;
  page?: number;
  pageSize?: number;
}

export interface GroupExcursionPaginationMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GroupExcursionsResponse {
  items: GroupExcursion[];
  meta: GroupExcursionPaginationMeta;
}

export interface ReviewComment {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
  likes: number;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface PriceExcludeGroup {
  category: string;
  details: string[];
}

export interface GroupExcursionDetail extends GroupExcursion {
  subtitle: string;
  heroImage: string;
  availability: string;
  pickup: string;
  gallery: string[];
  maxParticipants: number;
  dateType: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  itinerary: ItineraryItem[];
  highlights: string[];
  whatToBring: string[];
  cancellationPolicy: string[];
  priceIncludes: string[];
  priceExcludes: {
    roundTripTransfer: string[];
    entranceTickets: string[];
    other: string[];
  };
  totalReviews: number;
  ratingDistribution: { star: number; count: number; percentage: number }[];
  comments: ReviewComment[];
}

