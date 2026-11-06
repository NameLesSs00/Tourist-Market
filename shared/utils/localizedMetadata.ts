import type { Metadata } from "next";
import { getDictionary } from "./getDictionary";
import {
  BRAND,
  DESCRIPTION_MAX_LENGTH,
  IS_INDEXABLE,
  LOCALE_OG_LOCALE,
  SITE_ORIGIN,
  SUPPORTED_LOCALES,
  TITLE_MAX_LENGTH,
  TITLE_SUFFIX,
  X_DEFAULT_LOCALE,
  absoluteUrl,
  isLocale,
  localeLessUrl,
} from "./siteConfig";

// ---------------------------------------------------------------------------
// buildMetadata - the single metadata engine behind every public page.
//
// Pages pass their locale, their path inside that locale and (optionally)
// explicit title/description/image overrides. Everything else is generated
// centrally so a page cannot forget its canonical, its hreflang set or its
// Open Graph block:
//   title + brand suffix, description, canonical, hreflang (4 locales +
//   x-default), Open Graph with a localized locale code and absolute image,
//   Twitter card, robots directives, icon/manifest references.
// ---------------------------------------------------------------------------

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface BuildMetadataOptions {
  /** active route locale (en | fr | de | ru); unknown values fall back to en */
  locale: string;
  /**
   * Path inside the locale, e.g. "/services/tourist". "" or "/" is the locale
   * home page. Used to build the canonical and the hreflang alternates.
   */
  path?: string;
  /**
   * Dot-path to a dictionary node exposing `metadataTitle` /
   * `metadataDescription` (e.g. "touristServices", "hotelDeliveriesPage").
   */
  section?: string;
  /** Overrides the dictionary title (data-driven pages: item, product, blog). */
  title?: string;
  /** Overrides the dictionary description. */
  description?: string;
  /** Absolute (or site-relative) social image for this specific page. */
  ogImage?: string | OgImageInput;
  /** Defaults to "website"; "article" for blog posts. */
  ogType?: "website" | "article";
  /**
   * Canonical target when the page is a duplicate of another one (the orphan
   * /transfer route canonicalizes to /services/transfer).
   */
  canonicalPath?: string;
  /**
   * Query parameters that belong to the canonical URL, e.g. { page: 2 } for a
   * paginated archive. Page 1 must pass nothing so its canonical stays clean.
   */
  canonicalQuery?: Record<string, string | number> | null;
  /** Keep the page out of the index but let crawlers follow its links. */
  noindex?: boolean;
  keywords?: string[];
  /** og:article:published_time / modified_time when the source really has one. */
  publishedTime?: string;
  modifiedTime?: string;
}

/** Cuts text at the last word boundary that still fits the budget. */
export function limitText(text: string, max: number): string {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  const cut = value.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut.slice(0, max);
  // never leave a dangling punctuation mark at the end
  return base.replace(/[,;:.&-]+\s*$/, "");
}

/**
 * Server side half of the detail naming rule: resolves the locale dictionary and
 * applies the pattern. The formatter itself lives in
 * shared/utils/destinationTitle.ts, where the client tree can reach it without
 * pulling the language files in.
 */
export { formatDestinationTitle } from "./destinationTitle";
import { formatDestinationTitle } from "./destinationTitle";

export function withDestinationTitle(locale: string, title: string): string {
  return formatDestinationTitle(getDictionary(locale), title);
}

/** Page part budget so that "Part | Egypt Tourist Market" stays inside 60 chars. */
const TITLE_PART_MAX = TITLE_MAX_LENGTH - TITLE_SUFFIX.length;

function dictionaryNode(locale: string, section?: string): Record<string, unknown> | undefined {
  if (!section) return undefined;
  const dict = getDictionary(locale) as unknown as Record<string, unknown>;
  return section
    .split(".")
    .reduce<Record<string, unknown> | undefined>((node, key) => {
      const next = node?.[key];
      return next && typeof next === "object" && !Array.isArray(next)
        ? (next as Record<string, unknown>)
        : undefined;
    }, dict);
}

/** One authored string of a dictionary node, or "" when the node lacks it. */
function dictionaryString(
  node: Record<string, unknown> | undefined,
  key: string
): string {
  const value = node?.[key];
  return typeof value === "string" ? value : "";
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return `${SITE_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`;
}

function withQuery(path: string, query?: Record<string, string | number> | null): string {
  if (!query || Object.keys(query).length === 0) return path;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) params.set(key, String(value));
  return `${path}?${params.toString()}`;
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const locale = isLocale(options.locale) ? options.locale : "en";
  const node = dictionaryNode(locale, options.section);

  const rawTitle = options.title ?? dictionaryString(node, "metadataTitle");
  const rawDescription =
    options.description ?? dictionaryString(node, "metadataDescription");

  // Some dictionary nodes carry a legacy page title that already ends with the
  // brand suffix (cartPage.meta.title, hotelDeliveriesPage.meta.listTitle). When
  // such a string is passed explicitly, it is used as-is instead of doubling the
  // brand at the end of <title>.
  const alreadyBranded = rawTitle.endsWith(TITLE_SUFFIX);
  const titlePart = rawTitle ? limitText(rawTitle, TITLE_PART_MAX) : "";
  const title = rawTitle
    ? alreadyBranded
      ? limitText(rawTitle, TITLE_MAX_LENGTH)
      : `${titlePart}${TITLE_SUFFIX}`
    : BRAND;
  const description = rawDescription ? limitText(rawDescription, DESCRIPTION_MAX_LENGTH) : undefined;

  const cleanPath = options.path ?? "/";
  const canonicalPage = withQuery(options.canonicalPath ?? cleanPath, options.canonicalQuery);
  const canonical = absoluteUrl(locale, canonicalPage);

  // Every locale variant of this exact page, plus the language-neutral path that
  // proxy.ts negotiates a locale from for the visitor (x-default).
  const languages: Record<string, string> = {};
  for (const candidate of SUPPORTED_LOCALES) {
    languages[candidate] = absoluteUrl(candidate, canonicalPage);
  }
  languages[X_DEFAULT_LOCALE] = localeLessUrl(canonicalPage);

  const ogImageValue = options.ogImage;
  const ogImage: OgImageInput | undefined =
    typeof ogImageValue === "string" ? { url: ogImageValue } : ogImageValue;

  const robots: Metadata["robots"] = !IS_INDEXABLE
    ? { index: false, follow: false }
    : options.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        };

  const ogLocale = LOCALE_OG_LOCALE[locale as keyof typeof LOCALE_OG_LOCALE];
  const alternateLocales = SUPPORTED_LOCALES.filter((l) => l !== locale).map(
    (l) => LOCALE_OG_LOCALE[l]
  );

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    type: options.ogType ?? "website",
    url: canonical,
    siteName: BRAND,
    title,
    ...(description ? { description } : {}),
    ...(ogLocale
      ? { locale: ogLocale, ...(alternateLocales.length ? { alternateLocale: alternateLocales } : {}) }
      : {}),
    ...(ogImage
      ? {
          images: [
            {
              url: toAbsoluteUrl(ogImage.url),
              ...(ogImage.width ? { width: ogImage.width } : {}),
              ...(ogImage.height ? { height: ogImage.height } : {}),
              alt: ogImage.alt ?? (alreadyBranded ? title : titlePart) ?? BRAND,
            },
          ],
        }
      : {}),
    // og:article:* only exists for the article type, and only when the source
    // data really carries a date - never invented.
    ...(options.ogType === "article"
      ? {
          ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
          ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
        }
      : {}),
  };

  return {
    // Composed absolutely on purpose: the app has two root layouts and every page
    // must produce a byte-identical <title> regardless of which one wraps it.
    title: { absolute: title },
    ...(description ? { description } : {}),
    ...(options.keywords?.length ? { keywords: options.keywords } : {}),
    alternates: {
      canonical,
      languages,
    },
    openGraph,
    twitter: {
      // always the large card: a page without an explicit ogImage still gets the
      // generated /[locale]/opengraph-image card, which is 1200x630
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      ...(ogImage ? { images: [toAbsoluteUrl(ogImage.url)] } : {}),
    },
    robots,
  };
}
