import { API_BASE_URL } from "@/clientApi/apiConfig";

/**
 * Root origin for the backend server where uploads and static assets are hosted.
 * Statically defaults to "https://touristtt.runasp.net" unless configured via environment.
 */
export const BACKEND_ORIGIN: string =
  process.env.NEXT_PUBLIC_BACKEND_ORIGIN ||
  API_BASE_URL.replace(/\/api\/?$/, "");

/**
 * Formats backend-relative image paths into full absolute URLs.
 * Example:
 *   "/uploads/blogs/9e7f052b55514e3f9d079d37150dc29b.webp"
 *   -> "https://touristtt.runasp.net/uploads/blogs/9e7f052b55514e3f9d079d37150dc29b.webp"
 *
 * Preserves existing full URLs (http/https), blob previews (blob:), and data URIs (data:).
 */
export function getBackendImageUrl(path?: string | null): string | null {
  if (!path) return null;

  const trimmed = path.trim();
  if (!trimmed) return null;

  // Already a complete URL or browser preview scheme
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  // Prepend leading slash if not present
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return `${BACKEND_ORIGIN}${cleanPath}`;
}
