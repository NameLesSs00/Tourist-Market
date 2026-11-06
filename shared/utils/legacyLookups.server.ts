// ---------------------------------------------------------------------------
// Legacy item URLs that can only be answered by asking the catalogue what it holds.
//
// Three families of the old PHP site addressed content by a slug that lives in the
// database rather than in a table this repo can commit:
//   /pages/service-details.php?slug=x  ->  resolved from the committed slug table
//   /blog/{slug}                       ->  matched against the slugged blog titles
//   /product/{slug}                    ->  matched against the slugged product names
//
// The two catalogue lookups page through the public list endpoints, index the
// slugged titles and keep the result in memory for five minutes: a 1200-URL legacy
// blog archive must not turn every crawler visit into ten API calls. A failing
// backend degrades to the family's list page rather than to a 404, so the crawler
// still finds a live page and the redirect table stays complete.
//
// Server-only (it reads the backend), imported by proxy.ts.
// ---------------------------------------------------------------------------

import { getPublicBlogs } from "@/clientApi/blogApi";
import { getProducts } from "@/clientApi/productApi";
import { SERVICE_ITEM_SECTIONS } from "@/shared/data/serviceItemSlugs";
import { cachedValue } from "./serverCache";
import { slugify } from "./slugify";
import { DEFAULT_LOCALE } from "./siteConfig";
import type { LegacyLookupFamily } from "./legacyRedirects";
import { legacyLookupFallback } from "./legacyRedirects";

const CACHE_TTL_MS = 5 * 60 * 1000;
const PAGE_SIZE = 100;
/** hard stop so a misbehaving hasNextPage flag cannot spin forever */
const MAX_PAGES = 25;

/** slug -> the id a legacy URL has to be redirected to, for one content family. */
type SlugIndex = Map<string, string>;

async function buildBlogIndex(): Promise<SlugIndex> {
  const index: SlugIndex = new Map();
  try {
    for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
      const res = await getPublicBlogs({ pageNumber, pageSize: PAGE_SIZE }, DEFAULT_LOCALE);
      const page = res.data;
      for (const blog of page?.items ?? []) {
        const slug = slugify(blog.title);
        if (slug && !index.has(slug)) index.set(slug, blog.id);
      }
      if (!page?.hasNextPage) break;
    }
  } catch {
    // partial index is still better than none; the fallback covers what is missing
  }
  return index;
}

async function buildProductIndex(): Promise<SlugIndex> {
  const index: SlugIndex = new Map();
  try {
    for (let pageNumber = 1; pageNumber <= MAX_PAGES; pageNumber++) {
      const res = await getProducts({ language: DEFAULT_LOCALE, pageNumber, pageSize: PAGE_SIZE });
      const page = res.data;
      for (const product of page?.items ?? []) {
        const slug = slugify(product.title);
        const id = String(product.id);
        // the old site published /product/guava; a "{name}-{id}" form is also
        // accepted because that is how this app's own product URLs once looked
        if (slug && !index.has(slug)) index.set(slug, id);
        if (slug) index.set(`${slug}-${id}`, id);
      }
      if (!page?.hasNextPage) break;
    }
  } catch {
    // as above
  }
  return index;
}

function lookup(index: SlugIndex, key: string): string | undefined {
  const clean = key.trim().toLowerCase();
  if (!clean) return undefined;
  return index.get(clean) ?? index.get(slugify(clean) ?? clean);
}

/**
 * `/pages/service-details.php?slug=x`: the seed table already knows which section
 * every legacy slug belongs to, so this needs no request at all.
 */
function serviceItemTarget(key: string): string | null {
  const section = SERVICE_ITEM_SECTIONS[key.trim().toLowerCase()];
  return section
    ? `/${DEFAULT_LOCALE}/services/${section}/${key.trim().toLowerCase()}`
    : null;
}

/**
 * The data-driven half of the legacy map: the path to 301 to for a legacy item URL.
 * Every slug that cannot be matched lands on its section's list page, which is a
 * live, indexable page - the old site had no equivalent of a 404 for these.
 */
export async function legacyLookupTarget(
  family: LegacyLookupFamily,
  key: string
): Promise<string> {
  if (family === "service") {
    return serviceItemTarget(key) ?? legacyLookupFallback("service");
  }
  if (family === "blog") {
    const index = await cachedValue("legacy:blogs", CACHE_TTL_MS, buildBlogIndex);
    const id = lookup(index, key);
    return id ? `/${DEFAULT_LOCALE}/Blogs/${id}` : legacyLookupFallback("blog");
  }
  const index = await cachedValue("legacy:products", CACHE_TTL_MS, buildProductIndex);
  const id = lookup(index, key);
  return id ? `/${DEFAULT_LOCALE}/hotel-deliveries/${id}` : legacyLookupFallback("product");
}
