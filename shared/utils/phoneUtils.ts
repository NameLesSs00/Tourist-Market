export interface CountryPhoneOption {
  id: string;
  name: string;
  phoneCode: string;
}

export const FALLBACK_COUNTRIES: CountryPhoneOption[] = [
  { id: "142b2b3b-2235-4001-9376-f059c3f8290f", name: "Egypt", phoneCode: "+20" },
  { id: "242b2b3b-2235-4001-9376-f059c3f8290f", name: "Germany", phoneCode: "+49" },
  { id: "342b2b3b-2235-4001-9376-f059c3f8290f", name: "Russia", phoneCode: "+7" },
  { id: "442b2b3b-2235-4001-9376-f059c3f8290f", name: "United Kingdom", phoneCode: "+44" },
  { id: "542b2b3b-2235-4001-9376-f059c3f8290f", name: "France", phoneCode: "+33" },
  { id: "642b2b3b-2235-4001-9376-f059c3f8290f", name: "Italy", phoneCode: "+39" },
  { id: "742b2b3b-2235-4001-9376-f059c3f8290f", name: "Poland", phoneCode: "+48" },
  { id: "842b2b3b-2235-4001-9376-f059c3f8290f", name: "Ukraine", phoneCode: "+380" },
  { id: "942b2b3b-2235-4001-9376-f059c3f8290f", name: "Saudi Arabia", phoneCode: "+966" },
  { id: "a42b2b3b-2235-4001-9376-f059c3f8290f", name: "United Arab Emirates", phoneCode: "+971" },
  { id: "b42b2b3b-2235-4001-9376-f059c3f8290f", name: "Czech Republic", phoneCode: "+420" },
  { id: "c42b2b3b-2235-4001-9376-f059c3f8290f", name: "Netherlands", phoneCode: "+31" },
  { id: "d42b2b3b-2235-4001-9376-f059c3f8290f", name: "Switzerland", phoneCode: "+41" },
  { id: "e42b2b3b-2235-4001-9376-f059c3f8290f", name: "United States", phoneCode: "+1" },
];

/**
 * Sanitizes phone input: preserves optional leading '+', strips any non-digit character.
 */
export function sanitizePhoneNumber(raw: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/\D/g, "");
  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly;
}

/**
 * Validates international phone numbers based on ITU-T E.164:
 * Must have between 7 and 15 digits (excluding the optional leading '+').
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const sanitized = sanitizePhoneNumber(phone);
  const digits = sanitized.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Validates email addresses using standard RFC 5322 compatible pattern.
 */
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
  if (!email) return false;
  return EMAIL_PATTERN.test(email.trim());
}

