const BACKEND_STATIC_BASE = "https://touristtt.runasp.net";
export const DEFAULT_BLOG_FALLBACK_IMAGE =
  "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg";

/**
 * Resolves a backend blog image path to a complete, valid URL with graceful fallback.
 */
export function getBlogImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || imageUrl.trim() === "") {
    return DEFAULT_BLOG_FALLBACK_IMAGE;
  }
  const clean = imageUrl.trim();
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }
  if (clean.startsWith("/")) {
    return `${BACKEND_STATIC_BASE}${clean}`;
  }
  return `${BACKEND_STATIC_BASE}/${clean}`;
}
