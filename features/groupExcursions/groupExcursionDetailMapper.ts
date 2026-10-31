import type { GroupExcursionFullDetail } from "@/clientApi/groupExcursionDetailsApi";
import type {
  ExcursionFaqItem,
  KeyValuePair,
} from "@/models/excursionDetails";
import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";
import type {
  GroupExcursionDetail,
  GroupExcursionFaq,
  ItineraryItem,
  TourInfoItem,
} from "@/components/UserComp/GroupExcursions/types";

/** Fixed locale formatting avoids SSR/client hydration mismatches on dates. */
const REVIEW_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const VARIATION_SELECTORS = /[\uFE0E\uFE0F\u200D]/g;
const LEADING_SEPARATORS = /^[\s\-\u2013\u2014\u2022\u00B7:]+/;
const WHITESPACE_RUN = /\s+/g;

/**
 * Time markers inside fullProgram are bolded but localized per language:
 * "**04:00 AM**" (en), "**04:00 Uhr**" (de), "**04h00**" (fr), "**04:00**" (ru).
 * Matching any bold segment that contains a clock token keeps the parser
 * locale-agnostic instead of hardcoding the AM/PM suffix.
 */
const BOLD_TIME_MARKER = /\*\*([^*]*\d{1,2}[:h]\d{2}[^*]*)\*\*/i;

type LiteralField = "duration" | "groupSize" | "pickupLocation" | "bestSeason";

/**
 * The backend translates the details `literally` keys, so English labels cannot
 * be matched for other locales (de "Gruppengröße", fr "Taille du groupe",
 * ru "Размер группы"). Every locale returns the entries in the same semantic
 * order, so each field carries its known aliases plus its canonical position
 * as a fallback for locales that are not listed here.
 */
const LITERAL_FIELDS: Record<LiteralField, { index: number; aliases: string[] }> =
  {
    duration: {
      index: 2,
      aliases: ["duration", "dauer", "durée", "продолжительность"],
    },
    groupSize: {
      index: 3,
      aliases: ["group size", "gruppengröße", "taille du groupe", "размер группы"],
    },
    pickupLocation: {
      index: 5,
      aliases: [
        "pickup location",
        "abholort",
        "lieu de prise en charge",
        "место встречи",
      ],
    },
    bestSeason: {
      index: 6,
      aliases: ["best season", "beste saison", "meilleure saison", "лучший сезон"],
    },
  };

/** Drops the emoji variation selectors the backend leaves inside text. */
function sanitizeText(text: string): string {
  if (!text) return "";
  return text.replace(VARIATION_SELECTORS, "");
}

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(WHITESPACE_RUN, " ").trim();
}

/** Sanitizes then strips leading emoji/pictographs and separator characters. */
function cleanLeadingJunk(text: string): string {
  return sanitizeText(text)
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(LEADING_SEPARATORS, "")
    .trim();
}

/**
 * Maps the aggregated API payload (excursion + details + reviews)
 * into the GroupExcursionDetail view model consumed by GroupDetails components.
 */
export function mapGroupExcursionFullDetail(
  full: GroupExcursionFullDetail
): GroupExcursionDetail {
  const { excursion, details, reviews, reviewStats, availabilityDays } = full;

  // All backend images are sourced directly from the admin excursion payload (imageList and primaryImageUrl)
  const rawGallery = (excursion.imageList || [])
    .map((img) => img.imageUrl)
    .filter((url): url is string => Boolean(url));

  const allImages = [
    ...(excursion.primaryImageUrl ? [excursion.primaryImageUrl] : []),
    ...rawGallery,
  ];
  // Deduplicate URLs while preserving order
  const gallery = Array.from(new Set(allImages));

  // The hero background image uses heroImageUrl if set, or falls back to primaryImageUrl or the first gallery image
  const heroImage =
    excursion.heroImageUrl ||
    excursion.primaryImageUrl ||
    gallery[0] ||
    "";

  const durationHours = excursion.durationHours || 0;

  // Prefer the reliable numeric duration; the `literally` "Duration" entry is a
  // free-text label (often a generic "Full Day") and only used when no hours
  // are set on the excursion.
  const durationLabel =
    durationHours > 0
      ? `${durationHours} hour${durationHours === 1 ? "" : "s"}`
      : findLiteralValue(details?.literally, "duration") || "Full Day";

  return {
    // Basic Info
    id: excursion.id,
    slug: excursion.slug,
    title: sanitizeText(excursion.title),
    subtitle: sanitizeText(excursion.subtitle),
    shortDescription: sanitizeText(excursion.shortDescription),
    description: sanitizeText(excursion.shortDescription),
    badge: sanitizeText(excursion.excursionType),
    category: excursion.category?.categoryTitle || excursion.categoryTitle || "General",

    // Duration & Pricing
    duration: durationLabel,
    durationHours,
    rating: reviewStats.averageRating,
    adultPrice: excursion.price?.adultPrice ?? 0,
    childPrice: excursion.price?.childPrice ?? 0,
    infantPrice: excursion.price?.infantPrice ?? 0,
    currency: excursion.price?.currencyCode || "USD",

    // Images (already absolutized by the clientApi layer)
    imageUrl: excursion.primaryImageUrl || gallery[0] || "",
    heroImage,
    gallery,

    // Details from excursion-details endpoint
    aboutTitle: "About This Experience",
    aboutParagraphs: fullProgramToParagraphs(excursion.fullProgram),
    highlights: sanitizeList(details?.highlights),
    whatToBring: sanitizeList(details?.whatToBring),
    cancellationPolicy: sanitizeList(details?.cancellationPolicy),
    faqs: mapFaqs(excursion.faqs),
    tourInfo: mapTourInfo(details?.literally),
    priceIncludes: sanitizeList(details?.includes),
    priceExcludes: {
      roundTripTransfer: [],
      entranceTickets: [],
      other: sanitizeList(details?.excludes),
    },

    // Itinerary parsed from fullProgram text
    itinerary: parseItinerary(excursion.fullProgram),

    // Additional Info
    availability:
      formatWeeklyAvailability(availabilityDays) ||
      findLiteralValue(details?.literally, "bestSeason") ||
      "Year-round",
    pickup:
      findLiteralValue(details?.literally, "pickupLocation") || "Hotel pickup available",
    maxParticipants:
      typeof excursion.maxParticipants === "number" && excursion.maxParticipants > 0
        ? excursion.maxParticipants
        : parseMaxParticipants(details?.literally, 0),
    dateType: "Multiple Departures",

    // Reviews
    totalReviews: reviewStats.totalReviews,
    ratingDistribution: reviewStats.ratingDistribution,
    comments: reviews.map((review) => ({
      id: review.id,
      author: sanitizeText(review.customerName),
      date: formatReviewDate(review.createdAt),
      content: sanitizeText(review.comment),
      rating: review.rating,
      likes: review.helpfulCount,
    })),
  };
}

/** Sanitizes a list of backend strings, dropping entries left empty. */
function sanitizeList(values: string[] | undefined): string[] {
  return (values || [])
    .map((value) => sanitizeText(value).trim())
    .filter(Boolean);
}

/**
 * Maps the excursion `faqs` array into the view model, ordered by
 * `displayOrder` and dropping entries missing a question or answer.
 */
function mapFaqs(faqs: ExcursionFaqItem[] | undefined): GroupExcursionFaq[] {
  return (faqs || [])
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((faq) => ({
      question: sanitizeText(faq.question).trim(),
      answer: sanitizeText(faq.answer).trim(),
    }))
    .filter((faq) => faq.question && faq.answer);
}

/**
 * Maps the details `literally` key/value array into the "Good to Know" list,
 * dropping entries whose key or value is empty after sanitizing.
 */
function mapTourInfo(literally: KeyValuePair[] | undefined): TourInfoItem[] {
  return (literally || [])
    .map((item) => ({
      label: sanitizeText(item.key).replace(WHITESPACE_RUN, " ").trim(),
      value: sanitizeText(item.value).trim(),
    }))
    .filter((item) => item.label && item.value);
}

/**
 * Turns the weekly availability days into a compact, human-friendly label.
 * Full schedules read as "All week", near-full ones as "All week except X",
 * a single contiguous block (week wrapping included) as "Sunday - Thursday",
 * and anything else as a comma-separated list of day names. Returns "" when
 * there is no usable data so the caller can fall back to other sources.
 */
function formatWeeklyAvailability(
  days: ExcursionAvailabilityDay[] | undefined
): string {
  if (!days || days.length === 0) return "";

  const ordered = days.slice().sort((a, b) => a.dayNo - b.dayNo);
  const available = ordered.filter((day) => day.isAvailable);
  if (available.length === 0) return "";

  if (available.length === 7) return "All week";

  if (available.length === 6) {
    const missing = ordered.find((day) => !day.isAvailable);
    return missing ? `All week except ${missing.dayName}` : "All week";
  }

  const nameByNo = new Map(available.map((day) => [day.dayNo, day.dayName]));

  // Walk the circular 7-day cycle collecting contiguous runs of available
  // days. A run stops at the first dayNo that is not available.
  const runs: number[][] = [];
  const visited = new Set<number>();
  available.forEach((day) => {
    if (visited.has(day.dayNo)) return;
    const run: number[] = [];
    let cursor = day.dayNo;
    while (nameByNo.has(cursor) && !visited.has(cursor)) {
      visited.add(cursor);
      run.push(cursor);
      cursor = (cursor + 1) % 7;
    }
    runs.push(run.sort((a, b) => a - b));
  });

  if (runs.length === 1) {
    const [first, last] = [runs[0][0], runs[0][runs[0].length - 1]];
    if (runs[0].length === 1) return nameByNo.get(first) || "";
    return `${nameByNo.get(first)} - ${nameByNo.get(last)}`;
  }

  return available.map((day) => day.dayName).join(", ");
}

function formatReviewDate(createdAt: string): string {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? "" : REVIEW_DATE_FORMAT.format(date);
}

/**
 * Turns the raw `fullProgram` text into readable Description-tab paragraphs:
 * strips the `**bold**` markers and emoji, then splits on line breaks so each
 * non-empty line becomes its own paragraph.
 */
function fullProgramToParagraphs(fullProgram: string): string[] {
  if (!fullProgram) return [];
  return sanitizeText(fullProgram)
    .replace(/\*\*/g, "")
    .split(/\n+/)
    .map((line) => cleanLeadingJunk(line).replace(WHITESPACE_RUN, " ").trim())
    .filter(Boolean);
}

/**
 * Parses fullProgram text into itinerary items. Each line opening with a bold
 * time marker starts a new item; the following plain or bulleted lines are
 * collected as that item's description.
 */
function parseItinerary(fullProgram: string): ItineraryItem[] {
  if (!fullProgram) return [];

  const lines = sanitizeText(fullProgram).split("\n").filter((line) => line.trim());
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

/** Reads a semantic field from the details `literally` key/value array. */
function findLiteralValue(
  literally: KeyValuePair[] | undefined,
  field: LiteralField
): string {
  if (!literally || literally.length === 0) return "";

  const { index, aliases } = LITERAL_FIELDS[field];
  const entry =
    literally.find((item) => aliases.includes(normalizeKey(item.key || ""))) ??
    literally[index];

  return sanitizeText(entry?.value || "").trim();
}

/**
 * Extracts the participant count from free text such as
 * "Maximum 45 passengers" / "Maximal 45 Passagiere" -> 45.
 */
function parseMaxParticipants(
  literally: KeyValuePair[] | undefined,
  fallback: number = 0
): number {
  const match = findLiteralValue(literally, "groupSize").match(/\d+/);
  return match ? parseInt(match[0], 10) : fallback;
}
