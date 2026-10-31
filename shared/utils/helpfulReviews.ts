const COOKIE_NAME = "helpful_reviews";
const SUBMITTED_COOKIE_NAME = "submitted_reviews";
const PRODUCT_HELPFUL_COOKIE_NAME = "helpful_product_reviews";
const PRODUCT_SUBMITTED_COOKIE_NAME = "submitted_product_reviews";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Reads the list of review ids this browser has already marked helpful. */
export function readHelpfulReviewIds(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return [];
  return decodeURIComponent(match[1])
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** True when this browser already marked the given review helpful. */
export function isReviewMarkedHelpful(reviewId: string): boolean {
  return readHelpfulReviewIds().includes(reviewId);
}

/** Persists a review id as helpful in a first-party cookie (once per browser). */
export function markReviewHelpfulInCookie(reviewId: string): void {
  if (typeof document === "undefined") return;
  const ids = readHelpfulReviewIds();
  if (!ids.includes(reviewId)) ids.push(reviewId);
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    ids.join(",")
  )};path=/;max-age=${ONE_YEAR_SECONDS};SameSite=Lax`;
}

function readSubmittedExcursionIds(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SUBMITTED_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return [];
  return decodeURIComponent(match[1])
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** True when this browser already submitted a review for the excursion. */
export function hasSubmittedReview(excursionId: string): boolean {
  if (!excursionId) return false;
  return readSubmittedExcursionIds().includes(excursionId);
}

/** Records that a review was submitted for the excursion (once per browser). */
export function markReviewSubmitted(excursionId: string): void {
  if (typeof document === "undefined" || !excursionId) return;
  const ids = readSubmittedExcursionIds();
  if (!ids.includes(excursionId)) ids.push(excursionId);
  document.cookie = `${SUBMITTED_COOKIE_NAME}=${encodeURIComponent(
    ids.join(",")
  )};path=/;max-age=${ONE_YEAR_SECONDS};SameSite=Lax`;
}

// ---------------------------------------------------------------------------
// Product Reviews Cookie Helpers
// ---------------------------------------------------------------------------

/** Reads the list of product review ids this browser has already marked helpful. */
export function readHelpfulProductReviewIds(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${PRODUCT_HELPFUL_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return [];
  return decodeURIComponent(match[1])
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** True when this browser already marked the given product review helpful. */
export function isProductReviewMarkedHelpful(reviewId: string | number): boolean {
  const key = String(reviewId).trim();
  if (!key) return false;
  return readHelpfulProductReviewIds().includes(key);
}

/** Persists a product review id as helpful in a first-party cookie (once per browser). */
export function markProductReviewHelpfulInCookie(reviewId: string | number): void {
  if (typeof document === "undefined") return;
  const key = String(reviewId).trim();
  if (!key) return;
  const ids = readHelpfulProductReviewIds();
  if (!ids.includes(key)) ids.push(key);
  document.cookie = `${PRODUCT_HELPFUL_COOKIE_NAME}=${encodeURIComponent(
    ids.join(",")
  )};path=/;max-age=${ONE_YEAR_SECONDS};SameSite=Lax`;
}

function readSubmittedProductIds(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${PRODUCT_SUBMITTED_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return [];
  return decodeURIComponent(match[1])
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** True when this browser already submitted a review for the product. */
export function hasSubmittedProductReview(productId: string | number): boolean {
  const key = String(productId).trim();
  if (!key) return false;
  return readSubmittedProductIds().includes(key);
}

/** Records that a review was submitted for the product (once per browser). */
export function markProductReviewSubmitted(productId: string | number): void {
  if (typeof document === "undefined") return;
  const key = String(productId).trim();
  if (!key) return;
  const ids = readSubmittedProductIds();
  if (!ids.includes(key)) ids.push(key);
  document.cookie = `${PRODUCT_SUBMITTED_COOKIE_NAME}=${encodeURIComponent(
    ids.join(",")
  )};path=/;max-age=${ONE_YEAR_SECONDS};SameSite=Lax`;
}
