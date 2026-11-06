// ---------------------------------------------------------------------------
// slugify - the single URL-slugging rule used by service item URLs, the legacy
// 301 lookup and the sitemap. It must stay pure and deterministic: the same text
// always produces the same URL, on the server and in Node scripts alike.
// ---------------------------------------------------------------------------

const MAX_SLUG_LENGTH = 80;

/**
 * Turns display text into a lowercase, hyphen-separated URL segment.
 *
 * "Café du Lac" -> "cafe-du-lac", "Shark & Dolphin House" -> "shark-and-dolphin-house",
 * "Mercedes-Benz" -> "mercedes-benz".
 *
 * Returns null when nothing word-like is left, so callers can fall back to another
 * identifier instead of producing an empty URL segment.
 */
export function slugify(text: string | null | undefined): string | null {
  if (!text) return null;

  let value = String(text);

  // Decompose accented letters, then drop the now-orphaned combining marks, so
  // French and German words keep their base letters instead of turning into "?".
  value = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f\u0483-\u0487]/g, "")
    // a bare "&" reads better as a word than as a separator
    .replace(/&/g, "-and-")
    // apostrophes are punctuation inside a word, not a separator ("Oasis Halayib")
    .replace(/['’`]/g, "")
    .toLowerCase()
    // every remaining non-alphanumeric run (space, slash, colon, emoji) becomes a hyphen
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

  if (value.length > MAX_SLUG_LENGTH) {
    value = value.slice(0, MAX_SLUG_LENGTH).replace(/-+$/, "");
  }

  return value.length > 0 ? value : null;
}
