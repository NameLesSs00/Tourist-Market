/**
 * Defensive text guards for excursion fields served by the backend.
 *
 * Some seeded records duplicate the same marketing copy across
 * `excursionType`, `subtitle`, and `shortDescription`, and the backend
 * hard-truncates `shortDescription` at 200 characters (often mid-word).
 * These helpers keep ribbons short, drop duplicated paragraphs, and make
 * truncated sentences read intentionally instead of cutting off mid-word.
 */

const RIBBON_MAX_LENGTH = 40;
const MIN_UNIQUE_TAIL_LENGTH = 20;
const SENTENCE_ENDINGS = /[.!?…]\s*$/;
const PUNCTUATION = /[.!?…]/;
const WHITESPACE_RUN = /\s+/g;

/** Ribbon pills need a short category label, not a full sentence. */
export function isRibbonLabel(text: string | undefined | null): boolean {
  const trimmed = (text || "").trim();
  if (!trimmed) return false;
  if (trimmed.length > RIBBON_MAX_LENGTH) return false;
  return !PUNCTUATION.test(trimmed);
}

/**
 * Returns the part of `shortDescription` that goes beyond `subtitle`, so the
 * hero never renders the same sentence twice. Returns "" when the texts are
 * duplicates or the remaining tail is too short to be meaningful.
 */
export function stripDuplicatePrefix(
  subtitle: string,
  shortDescription: string
): string {
  const norm = (value: string) => (value || "").replace(WHITESPACE_RUN, " ").trim();
  const sub = norm(subtitle);
  const desc = norm(shortDescription);

  if (!desc) return "";
  if (!sub) return desc;
  if (desc.toLowerCase() === sub.toLowerCase()) return "";

  if (desc.toLowerCase().startsWith(sub.toLowerCase())) {
    const tail = desc.slice(sub.length).replace(/^[\s,.;:!\u2013\u2014-]+/, "").trim();
    return tail.length >= MIN_UNIQUE_TAIL_LENGTH ? tail : "";
  }
  return desc;
}

/**
 * When text stops mid-word (the 200-char backend cap), drop the dangling
 * partial word and append an ellipsis so the copy reads as intentionally
 * shortened. Text that already ends with sentence punctuation is untouched.
 */
export function trimDanglingTail(text: string): string {
  const trimmed = (text || "").trim();
  if (!trimmed) return "";
  if (SENTENCE_ENDINGS.test(trimmed)) return trimmed;

  const lastSpace = trimmed.lastIndexOf(" ");
  if (lastSpace <= 0) return trimmed;
  return `${trimmed.slice(0, lastSpace)}…`;
}
