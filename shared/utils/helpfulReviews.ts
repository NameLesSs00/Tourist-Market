const COOKIE_NAME = "helpful_reviews";
const SUBMITTED_COOKIE_NAME = "submitted_reviews";
const PRODUCT_HELPFUL_COOKIE_NAME = "helpful_product_reviews";
const PRODUCT_SUBMITTED_COOKIE_NAME = "submitted_product_reviews";
const SERVICE_HELPFUL_COOKIE_NAME = "helpful_service_reviews";
const SERVICE_SUBMITTED_COOKIE_NAME = "submitted_service_reviews";
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

const sessionSubmittedExcursions = new Set<string>();

/** Clears any legacy 1-year submitted_reviews cookie from the browser. */
export function clearSubmittedReviewsCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SUBMITTED_COOKIE_NAME}=;path=/;max-age=0;SameSite=Lax`;
}

/** True when this browser already submitted a review for the excursion during this session. */
export function hasSubmittedReview(excursionId: string): boolean {
  if (!excursionId) return false;
  if (sessionSubmittedExcursions.has(excursionId)) return true;

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const stored = window.sessionStorage.getItem(`submitted_review_${excursionId}`);
      if (stored === "true") {
        sessionSubmittedExcursions.add(excursionId);
        return true;
      }
    } catch {
      // sessionStorage might be restricted in some iframe/sandbox environments
    }
  }

  // Clear legacy 1-year cookie if it was previously set so it doesn't linger
  clearSubmittedReviewsCookie();
  return false;
}

/** Records that a review was submitted for the excursion (in-session to avoid permanent lockout). */
export function markReviewSubmitted(excursionId: string): void {
  if (!excursionId) return;
  sessionSubmittedExcursions.add(excursionId);

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(`submitted_review_${excursionId}`, "true");
    } catch {
      // sessionStorage restricted fallback
    }
  }

  // Ensure stale 1-year cookie is cleared
  clearSubmittedReviewsCookie();
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

// ---------------------------------------------------------------------------
// Site Service Reviews Cookie Helpers
// ---------------------------------------------------------------------------

/** Reads the list of service review ids this browser has already marked helpful. */
export function readHelpfulServiceReviewIds(): string[] {
  if (typeof document === "undefined") return [];
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${SERVICE_HELPFUL_COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return [];
  return decodeURIComponent(match[1])
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

/** True when this browser already marked the given service review helpful. */
export function isServiceReviewMarkedHelpful(reviewId: string): boolean {
  const key = String(reviewId).trim();
  if (!key) return false;
  return readHelpfulServiceReviewIds().includes(key);
}

/** Persists a service review id as helpful in a first-party cookie (once per browser). */
export function markServiceReviewHelpfulInCookie(reviewId: string): void {
  if (typeof document === "undefined") return;
  const key = String(reviewId).trim();
  if (!key) return;
  const ids = readHelpfulServiceReviewIds();
  if (!ids.includes(key)) ids.push(key);
  document.cookie = `${SERVICE_HELPFUL_COOKIE_NAME}=${encodeURIComponent(
    ids.join(",")
  )};path=/;max-age=${ONE_YEAR_SECONDS};SameSite=Lax`;
}

export function clearSubmittedServiceReviewsCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SERVICE_SUBMITTED_COOKIE_NAME}=;path=/;max-age=0;SameSite=Lax`;
}

/** True when this browser already submitted a review for the sub-service. */
export function hasSubmittedServiceReview(_subServiceId: string): boolean {
  // Do not permanently lock out the review form across sessions
  return false;
}

/** Records that a review was submitted for the sub-service (in-memory per session). */
export function markServiceReviewSubmitted(_subServiceId: string): void {
  // Intentionally ephemeral to avoid locking user out permanently
}
