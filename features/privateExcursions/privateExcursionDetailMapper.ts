import type { PrivateExcursionFullDetail } from "@/clientApi/privateExcursionDetailsApi";
import type { KeyValuePair } from "@/models/excursionDetails";
import { formatWeeklyAvailability } from "@/shared/utils/dateAvailability";
import type {
  PrivateExcursionDetail,
  ItineraryItem,
  PrivateAttraction,
  PrivateExtraService,
  VehicleOption,
} from "@/components/UserComp/PrivateExcursions/types";
import { PRIVATE_EXCURSION_FALLBACK_IMAGE } from "@/components/UserComp/PrivateExcursions/utils/privateExcursionAdapter";

const REVIEW_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const VARIATION_SELECTORS = /[\uFE0E\uFE0F\u200D]/g;
const LEADING_SEPARATORS = /^[\s\-\u2013\u2014\u2022\u00B7:]+/;
const WHITESPACE_RUN = /\s+/g;
const BOLD_TIME_MARKER = /\*\*([^*]*\d{1,2}[:h]\d{2}[^*]*)\*\*/i;

function sanitizeText(text?: string | null): string {
  if (!text) return "";
  return text.replace(VARIATION_SELECTORS, "").trim();
}

function cleanLeadingJunk(text: string): string {
  return sanitizeText(text)
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(LEADING_SEPARATORS, "")
    .trim();
}

function sanitizeList(values?: string[]): string[] {
  return (values || [])
    .map((v) => cleanLeadingJunk(v))
    .filter(Boolean);
}

function fullProgramToParagraphs(fullProgram?: string): string[] {
  if (!fullProgram) return [];
  return sanitizeText(fullProgram)
    .replace(/\*\*/g, "")
    .split(/\n+/)
    .map((line) => cleanLeadingJunk(line).replace(WHITESPACE_RUN, " ").trim())
    .filter(Boolean);
}

function parseItinerary(fullProgram?: string): ItineraryItem[] {
  if (!fullProgram) return [];

  const lines = sanitizeText(fullProgram).split("\n").filter((l) => l.trim());
  const items: ItineraryItem[] = [];
  let currentItem: ItineraryItem | null = null;

  lines.forEach((line) => {
    const timeMatch = line.match(BOLD_TIME_MARKER);
    if (timeMatch) {
      if (currentItem) {
        items.push(currentItem);
      }
      currentItem = {
        time: timeMatch[1].replace(WHITESPACE_RUN, " ").trim(),
        title: cleanLeadingJunk(line.replace(timeMatch[0], "")),
        description: "",
      };
    } else if (currentItem) {
      const cleaned = cleanLeadingJunk(line.replace(/\*\*/g, ""));
      if (cleaned) {
        currentItem.description += (currentItem.description ? "\n" : "") + cleaned;
      }
    }
  });

  if (currentItem) {
    items.push(currentItem);
  }

  return items;
}

function formatReviewDate(createdAt: string): string {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? "" : REVIEW_DATE_FORMAT.format(date);
}

const DEFAULT_VEHICLES: VehicleOption[] = [
  { id: "car", name: "Car", capacityText: "1-3 Passengers", price: 250 },
  { id: "microbus", name: "Microbus", capacityText: "4-9 Passengers", price: 320 },
  { id: "minibus", name: "Minibus", capacityText: "10-16 Passengers", price: 450 },
  { id: "bus", name: "Bus", capacityText: "17-35 Passengers", price: 650 },
];

export function mapPrivateExcursionFullDetail(
  full: PrivateExcursionFullDetail
): PrivateExcursionDetail {
  const { excursion, details, attractions, services, reviews, reviewStats, availabilityDays } = full;

  const rawGallery = (excursion.imageList || [])
    .map((img) => img.imageUrl)
    .filter((url): url is string => Boolean(url));

  const allImages = [
    ...(excursion.primaryImageUrl ? [excursion.primaryImageUrl] : []),
    ...rawGallery,
  ];
  const gallery = Array.from(new Set(allImages));
  if (gallery.length === 0) {
    gallery.push(PRIVATE_EXCURSION_FALLBACK_IMAGE);
  }

  const durationHours = excursion.durationHours || 6;
  const durationLabel = `${durationHours} hours`;

  const prices = excursion.prices || [];
  const primaryPrice = prices[0];
  const adultPrice = (excursion as any).price?.adultPrice ?? primaryPrice?.adultPrice ?? 0;
  const childPrice = (excursion as any).price?.childPrice ?? primaryPrice?.childPrice ?? 0;
  const infantPrice = (excursion as any).price?.infantPrice ?? primaryPrice?.infantPrice ?? 0;
  const currency =
    (excursion as any).price?.currencyCode || primaryPrice?.currencyCode || "USD";

  const mappedAttractions: PrivateAttraction[] = (attractions || []).map((att) => ({
    id: att.id,
    title: sanitizeText(att.title),
    description: sanitizeText(att.description),
    images:
      att.images && att.images.length > 0
        ? att.images
        : [PRIVATE_EXCURSION_FALLBACK_IMAGE],
    adultPrice: att.adultPrice ?? 0,
    childPrice: att.childPrice ?? 0,
    infantPrice: att.infantPrice ?? 0,
  }));

  const mappedServices: PrivateExtraService[] = (services || []).map((srv) => ({
    id: srv.id,
    title: sanitizeText(srv.title),
    description: sanitizeText(srv.description),
    images:
      srv.images && srv.images.length > 0
        ? srv.images
        : [PRIVATE_EXCURSION_FALLBACK_IMAGE],
    adultPrice: srv.adultPrice ?? 0,
    childPrice: srv.childPrice ?? 0,
    infantPrice: srv.infantPrice ?? 0,
  }));

  const badge =
    sanitizeText(excursion.category?.categoryTitle) ||
    sanitizeText(excursion.categoryTitle) ||
    sanitizeText(excursion.excursionType) ||
    "Private Tour";

  return {
    id: excursion.id,
    slug: excursion.slug || excursion.id,
    title: sanitizeText(excursion.title),
    subtitle: sanitizeText(excursion.subtitle),
    shortDescription: sanitizeText(excursion.shortDescription),
    excursionType: sanitizeText(excursion.excursionType) || badge,
    duration: durationLabel,
    durationHours,
    stars: reviewStats.totalReviews > 0 ? (excursion.stars || String(reviewStats.averageRating)) : "0",
    rating: reviewStats.totalReviews > 0 ? reviewStats.averageRating : 0,
    category: badge,
    categorySlug: excursion.category?.slug || excursion.categorySlug || "private",
    badge,
    imageUrl: excursion.primaryImageUrl || gallery[0] || PRIVATE_EXCURSION_FALLBACK_IMAGE,
    isFeatured: Boolean(excursion.isFeatured),
    prices,
    adultPrice,
    childPrice,
    infantPrice,
    currency,

    gallery,
    aboutTitle: "About This Experience",
    aboutParagraphs: fullProgramToParagraphs(excursion.fullProgram),
    itinerary: parseItinerary(excursion.fullProgram),
    highlights: sanitizeList(details?.highlights),
    whatToBring: sanitizeList(details?.whatToBring),
    cancellationPolicy:
      (details?.cancellationPolicy && details.cancellationPolicy.length > 0)
        ? details.cancellationPolicy.join("\n")
        : "Free cancellation up to 24 hours before the excursion start time.",
    priceIncludes: sanitizeList(details?.includes),
    priceExcludes: sanitizeList(details?.excludes),

    totalReviews: reviewStats.totalReviews,
    ratingDistribution: reviewStats.ratingDistribution,
    comments: reviews.map((rev) => ({
      id: rev.id,
      author: sanitizeText(rev.customerName),
      date: formatReviewDate(rev.createdAt),
      content: sanitizeText(rev.comment),
      rating: rev.rating,
      likes: rev.helpfulCount,
    })),

    maxAttractions: excursion.maxAttractions || 4,
    attractions: mappedAttractions,
    extraServices: mappedServices,
    vehicles: DEFAULT_VEHICLES,
    availabilityDays: availabilityDays || [],
    availability: formatWeeklyAvailability(availabilityDays),
  };
}

