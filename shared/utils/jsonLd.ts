// ---------------------------------------------------------------------------
// JSON-LD builders - the only place that knows the schema.org vocabulary.
//
// Three rules hold throughout:
//
//   1. A property is emitted only when there is a real value for it. Google treats
//      an invented price, rating or date as a structured-data spam signal, so every
//      optional field here is conditional and no builder ever fills a placeholder.
//   2. One stable @id graph per page: `#webpage`, `#organization`, `#website`,
//      `#breadcrumb`, `#mainentity`, derived from that page's canonical URL. Nodes
//      point at each other by reference instead of repeating themselves, which is
//      what lets the parser see the site as one entity graph.
//   3. Everything is a plain object, never a <script> tag: rendering belongs to
//      components/UserComp/Shared/JsonLd.tsx, so these stay testable and pure.
// ---------------------------------------------------------------------------

import {
  AREA_SERVED,
  BRAND,
  CONTACT,
  SITE_ORIGIN,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "./siteConfig";

export type JsonLdObject = Record<string, unknown>;

const CONTEXT = "https://schema.org";

/** A paged list of one review type, already narrowed to published rows. */
export interface RatingSummary {
  /** mean of the published ratings that were read */
  ratingValue: number;
  /** how many published reviews the backend reports in total */
  reviewCount: number;
}

export interface Crumb {
  name: string;
  /**
   * Path inside the locale, "/" for the home page. Omitted for the crumb that *is*
   * the current page, which a BreadcrumbList must not link to itself.
   */
  path?: string;
}

/** An offer as the catalogue knows it: a price in one currency. */
export interface OfferInput {
  price: number | string | null | undefined;
  currency?: string;
  /** who sells it; defaults to this organisation */
  sellerId?: string;
}

/** `https://site/en/page#webpage` - one node of the page's @id graph. */
export function nodeId(canonical: string, suffix: string): string {
  return `${canonical}#${suffix}`;
}

function money(value: number | string): number | null {
  const parsed = typeof value === "string" ? Number(value.replace(/[^\d.-]/g, "")) : value;
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * ISO date of the last day of next year: the honest horizon for a published price
 * that has no expiry of its own in the backend.
 */
function priceValidUntil(): string {
  const year = new Date().getUTCFullYear() + 1;
  return `${year}-12-31`;
}

/** Non-empty strings only, so a missing translation cannot emit `"name": ""`. */
function text(value: string | null | undefined): string | undefined {
  const trimmed = (value ?? "").trim();
  return trimmed || undefined;
}

/**
 * The link a main entity points back to its document with. The WebPage already
 * declares `mainEntity`; this closes the loop, which is what lets a parser attach
 * the offer, the rating and the images to the indexed URL rather than to an
 * orphaned entity - and Google lists it as required on a Product.
 */
function pageRef(canonical: string): JsonLdObject {
  return { "@type": "WebPage", "@id": nodeId(canonical, "webpage") };
}

function areaServed() {
  return AREA_SERVED.map((name) => ({ "@type": "Place", name }));
}

// ---------------------------------------------------------------------------
// Site-wide nodes
// ---------------------------------------------------------------------------

/**
 * The single Organization node of the site. Its @id is site-absolute (not
 * page-scoped) because every page references the same entity.
 */
export function organization(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: BRAND,
    url: `${SITE_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_ORIGIN}/#logo`,
      url: `${SITE_ORIGIN}/icon.svg`,
      inLanguage: "en",
    },
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hurghada",
      addressRegion: "Red Sea",
      addressCountry: "EG",
    },
    areaServed: areaServed(),
    sameAs: [...SOCIAL_PROFILES],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT.whatsapp,
        availableLanguage: ["en", "fr", "de", "ru"],
        areaServed: areaServed(),
      },
    ],
  };
}

/** The WebSite node of one locale, so inLanguage matches the served document. */
export function webSite(locale: string): JsonLdObject {
  const canonical = absoluteUrl(locale, "/");
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": nodeId(canonical, "website"),
    url: canonical,
    name: BRAND,
    inLanguage: locale,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    // no SearchAction: there is no site-wide search results page to point at, and
    // claiming one is a rich-result violation
  };
}

/** The WebPage node of one page, referenced by its main entity. */
export function webPage(options: {
  locale: string;
  path: string;
  name: string;
  description?: string;
  image?: string;
  /** @id of the node this page is mostly *about*, when the page has one */
  mainEntityId?: string;
}): JsonLdObject {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const image = text(options.image);
  const mainEntityId = text(options.mainEntityId);
  return {
    "@context": CONTEXT,
    "@type": "WebPage",
    "@id": nodeId(canonical, "webpage"),
    url: canonical,
    name: options.name,
    inLanguage: options.locale,
    isPartOf: { "@id": nodeId(absoluteUrl(options.locale, "/"), "website") },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

/**
 * BreadcrumbList of one page. `path` is locale-relative, so the same trail works
 * for every locale; the home crumb is the root of the list.
 *
 * Google rejects a BreadcrumbList whose last item still points at a page: the
 * caller passes the current page as the final crumb without an `item`, which this
 * builder honours through the optional `path` (a crumb with no path is a leaf).
 */
export function breadcrumbs(trail: Crumb[], locale: string): JsonLdObject {
  const canonical = absoluteUrl(locale, "/");
  const listItems = trail
    .filter((crumb) => text(crumb.name))
    .map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name.trim(),
      ...(crumb.path ? { item: absoluteUrl(locale, crumb.path) } : {}),
    }));
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    "@id": nodeId(canonical, "breadcrumb"),
    itemListElement: listItems,
  };
}

/**
 * The nodes every indexed page emits, in one call: its WebPage, its BreadcrumbList
 * and whatever main entity the page has. `entities` are the already-built nodes that
 * reference `#webpage`, so a page cannot forget one half of the graph.
 */
export function pageGraph(options: {
  locale: string;
  path: string;
  name: string;
  description?: string;
  image?: string;
  trail: Crumb[];
  entities: Array<JsonLdObject | null>;
}): JsonLdObject[] {
  const entities = options.entities.filter((node): node is JsonLdObject => node !== null);
  // The WebPage points at whatever content node describes the page itself, so the
  // two halves of the graph reference each other instead of standing alone.
  const mainEntity = entities.find((node) =>
    String(node["@id"] ?? "").endsWith("#mainentity")
  );
  const nodes: JsonLdObject[] = [
    webPage({
      locale: options.locale,
      path: options.path,
      name: options.name,
      description: options.description,
      image: options.image,
      ...(mainEntity ? { mainEntityId: String(mainEntity["@id"]) } : {}),
    }),
  ];
  // the home page is the root of every trail, so a trail of one crumb would
  // describe a path nobody can be lost on - and an empty list is a warning
  if (options.trail.length > 1) nodes.push(breadcrumbs(options.trail, options.locale));
  return [...nodes, ...entities];
}

// ---------------------------------------------------------------------------
// Reusable sub-nodes
// ---------------------------------------------------------------------------

export function offer(input: OfferInput & { url: string }): JsonLdObject | null {
  const price = input.price === null || input.price === undefined ? null : money(input.price);
  if (price === null) return null;
  return {
    "@type": "Offer",
    url: input.url,
    price,
    priceCurrency: (input.currency ?? "USD").toUpperCase(),
    priceValidUntil: priceValidUntil(),
    availability: "https://schema.org/InStock",
    ...(input.sellerId
      ? { seller: { "@id": input.sellerId } }
      : { seller: { "@id": `${SITE_ORIGIN}/#organization` } }),
  };
}

/**
 * Emitted only when at least one published review exists *and* the mean of those
 * ratings is a real number: a catalogue row with no review, or one whose backend
 * average came back as 0, gets no rating markup at all rather than a false 0.
 */
export function aggregateRating(summary: RatingSummary | null): JsonLdObject | null {
  if (!summary || !(summary.reviewCount > 0)) return null;
  if (!Number.isFinite(summary.ratingValue) || !(summary.ratingValue > 0)) return null;
  return {
    "@type": "AggregateRating",
    ratingValue: Math.round(summary.ratingValue * 10) / 10,
    reviewCount: Math.round(summary.reviewCount),
    bestRating: 5,
    worstRating: 1,
  };
}

/** FAQPage from any list that carries a question and an answer. */
export function faqPage(options: {
  locale: string;
  path: string;
  name: string;
  faqs: Array<{ question?: string | null; answer?: string | null }>;
}): JsonLdObject | null {
  const mainEntity = options.faqs
    .map((faq) => {
      const question = text(faq.question);
      const answer = text(faq.answer);
      if (!question || !answer) return null;
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      };
    })
    .filter(Boolean);
  if (mainEntity.length === 0) return null;
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    "@id": nodeId(absoluteUrl(options.locale, options.path), "faq"),
    name: options.name,
    inLanguage: options.locale,
    mainEntity,
  };
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

/**
 * A service catalogue section: the page plus the ordered list of the items it
 * publishes. `parts` are already-resolved items (id, title, absolute URL).
 */
export function collectionPage(options: {
  locale: string;
  path: string;
  name: string;
  description?: string;
  image?: string;
  parts: Array<{ name: string; url: string }>;
}): JsonLdObject {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const image = text(options.image);
  const hasPart = options.parts
    .filter((part) => text(part.name) && text(part.url))
    .map((part, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: part.name.trim(),
      url: part.url,
      item: { "@type": "Thing", name: part.name.trim(), url: part.url },
    }));
  return {
    "@context": CONTEXT,
    "@type": "CollectionPage",
    "@id": nodeId(canonical, "webpage"),
    url: canonical,
    name: options.name,
    inLanguage: options.locale,
    isPartOf: { "@id": nodeId(absoluteUrl(options.locale, "/"), "website") },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(hasPart.length ? { mainEntity: { "@type": "ItemList", itemListElement: hasPart } } : {}),
  };
}

/** One catalogued service (a site service sub-item). */
export function serviceEntity(options: {
  locale: string;
  path: string;
  name: string;
  description?: string;
  images: string[];
  price?: number | string | null;
  currency?: string;
  rating?: RatingSummary | null;
}): JsonLdObject {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const images = options.images.filter(Boolean);
  const offers = offer({ url: canonical, price: options.price, currency: options.currency });
  const rating = aggregateRating(options.rating ?? null);
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": nodeId(canonical, "mainentity"),
    url: canonical,
    mainEntityOfPage: pageRef(canonical),
    name: options.name,
    serviceType: options.name,
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    areaServed: areaServed(),
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    ...(offers ? { offers } : {}),
    ...(rating ? { aggregateRating: rating } : {}),
  };
}

/** A group or private excursion, described by its own detail payload. */
export function touristTrip(options: {
  locale: string;
  kind: "group" | "private";
  path: string;
  name: string;
  description?: string;
  images: string[];
  /** category title, when the row has one */
  touristType?: string;
  /** itinerary stops in display order, titles only */
  itinerary: Array<{ name: string; description?: string; image?: string }>;
  price?: number | string | null;
  currency?: string;
  rating?: RatingSummary | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }>;
  /** the meeting/pickup point the tour describes, when it has one */
  pickup?: string;
}): JsonLdObject[] {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const images = options.images.filter(Boolean);
  const touristType = text(options.touristType);
  const pickup = text(options.pickup);
  const offers = offer({ url: canonical, price: options.price, currency: options.currency });
  const rating = aggregateRating(options.rating ?? null);
  const itinerary = options.itinerary.filter((stop) => text(stop.name));

  const mainEntity: JsonLdObject = {
    "@context": CONTEXT,
    "@type": "TouristTrip",
    "@id": nodeId(canonical, "mainentity"),
    url: canonical,
    mainEntityOfPage: pageRef(canonical),
    name: options.name,
    touristType: touristType ?? (options.kind === "group" ? "Group excursion" : "Private excursion"),
    provider: { "@id": `${SITE_ORIGIN}/#organization` },
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    ...(pickup ? { location: { "@type": "Place", name: pickup } } : {}),
    ...(offers ? { offers } : {}),
    ...(rating ? { aggregateRating: rating } : {}),
    ...(itinerary.length
      ? {
          itinerary: {
            "@type": "ItemList",
            itemListElement: itinerary.map((stop, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: stop.name.trim(),
              ...(text(stop.description) ? { item: { "@type": "Place", description: stop.description?.trim() } } : {}),
            })),
          },
        }
      : {}),
  };

  const faq = options.faqs
    ? faqPage({ locale: options.locale, path: options.path, name: options.name, faqs: options.faqs })
    : null;
  return [mainEntity, ...(faq ? [faq] : [])];
}

/** A hotel-delivery product. */
export function productSchema(options: {
  locale: string;
  path: string;
  name: string;
  description?: string;
  images: string[];
  price?: number | string | null;
  currency?: string;
  category?: string;
  rating?: RatingSummary | null;
}): JsonLdObject {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const images = options.images.filter(Boolean);
  const category = text(options.category);
  const offers = offer({ url: canonical, price: options.price, currency: options.currency });
  const rating = aggregateRating(options.rating ?? null);
  return {
    "@context": CONTEXT,
    "@type": "Product",
    "@id": nodeId(canonical, "mainentity"),
    url: canonical,
    mainEntityOfPage: pageRef(canonical),
    name: options.name,
    brand: { "@type": "Brand", name: BRAND },
    ...(description ? { description } : {}),
    ...(images.length ? { image: images } : {}),
    ...(category ? { category } : {}),
    ...(offers ? { offers } : {}),
    ...(rating ? { aggregateRating: rating } : {}),
  };
}

/**
 * A blog post. `datePublished`/`dateModified` are optional on purpose: the backend
 * returns no date for a blog, and an invented one is worse than none.
 */
export function blogPosting(options: {
  locale: string;
  path: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdObject {
  const canonical = absoluteUrl(options.locale, options.path);
  const description = text(options.description);
  const image = text(options.image);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    "@id": nodeId(canonical, "mainentity"),
    url: canonical,
    headline: options.headline,
    inLanguage: options.locale,
    mainEntityOfPage: pageRef(canonical),
    author: { "@id": `${SITE_ORIGIN}/#organization` },
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(options.datePublished ? { datePublished: options.datePublished } : {}),
    ...(options.dateModified ? { dateModified: options.dateModified } : {}),
  };
}
