/**
 * Standard backend-aligned image validation utilities.
 * Supported formats by ASP.NET backend validator:
 * .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp
 */

export const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".webp",
] as const;

export const ACCEPT_IMAGE_TYPES =
  "image/jpeg,image/png,image/webp,image/gif,image/bmp,image/tiff";

export function isAllowedImageFile(file: File): boolean {
  if (!file || !file.name) return false;
  const fileName = file.name.toLowerCase();
  return ALLOWED_IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
}

export function validateImageFile(
  file: File,
  maxSizeBytes: number = 5 * 1024 * 1024
): string | null {
  if (!file) return "No file selected.";

  const isMimeImage = file.type ? file.type.startsWith("image/") : false;
  const hasAllowedExt = isAllowedImageFile(file);

  if (!isMimeImage && !hasAllowedExt) {
    return `${file.name} is not an image file.`;
  }

  if (!hasAllowedExt) {
    return `${file.name}: Invalid image file format. Allowed formats: .jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp`;
  }

  if (file.size > maxSizeBytes) {
    const sizeMb = Math.round(maxSizeBytes / (1024 * 1024));
    return `${file.name} exceeds ${sizeMb}MB limit.`;
  }

  return null;
}

