import type { ExcursionAvailabilityDay } from "@/models/excursionAvailability";

/**
 * Returns tomorrow's date formatted as YYYY-MM-DD in the user's local timezone.
 */
export function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD date string into a local Date object.
 */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.trim().split("-").map(Number);
  if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return null;
  const [year, month, day] = parts;
  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates that a booking date:
 * 1. Is not empty and has a valid date format.
 * 2. Is strictly in the future (cannot be today or in the past).
 * 3. Falls on an available day of the week if weekly availability is configured.
 */
export function isBookingDateValid(
  dateStr: string,
  availabilityDays?: ExcursionAvailabilityDay[]
): DateValidationResult {
  if (!dateStr || !dateStr.trim()) {
    return { isValid: false, error: "Please select a booking date." };
  }

  const pickedDate = parseLocalDate(dateStr);
  if (!pickedDate) {
    return { isValid: false, error: "Please enter a valid date." };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (pickedDate <= today) {
    return {
      isValid: false,
      error: "Booking date cannot be today or in the past.",
    };
  }

  const activeDays = (availabilityDays || []).filter((d) => d.isAvailable);

  // If the backend has configured weekly availability, enforce matching day-of-week
  if (activeDays.length > 0) {
    const dayOfWeek = pickedDate.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const isMatched = activeDays.some((d) => d.dayNo === dayOfWeek);

    if (!isMatched) {
      const allowedNames = activeDays.map((d) => d.dayName).join(", ");
      const pickedDayName = pickedDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      return {
        isValid: false,
        error: `Excursion is not available on ${pickedDayName}. Available days: ${allowedNames}.`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Formats weekly availability days into a human-friendly string.
 */
export function formatWeeklyAvailability(
  days: ExcursionAvailabilityDay[] | undefined
): string {
  if (!days || days.length === 0) return "Flexible";

  const ordered = days.slice().sort((a, b) => a.dayNo - b.dayNo);
  const available = ordered.filter((day) => day.isAvailable);
  if (available.length === 0) return "Not Available";
  if (available.length === 7) return "Daily";

  if (available.length === 6) {
    const missing = ordered.find((day) => !day.isAvailable);
    return missing ? `Daily except ${missing.dayName}` : "Daily";
  }

  const nameByNo = new Map(available.map((day) => [day.dayNo, day.dayName]));
  const runs: number[][] = [];
  const visited = new Set<number>();

  available.forEach((day) => {
    if (visited.has(day.dayNo)) return;
    const run: number[] = [];
    let cursor = day.dayNo;
    while (nameByNo.has(cursor) && !visited.has(cursor)) {
      visited.add(cursor);
      run.push(cursor);
      cursor = (cursor + 1) % 7;
    }
    runs.push(run.sort((a, b) => a - b));
  });

  if (runs.length === 1) {
    const [first, last] = [runs[0][0], runs[0][runs[0].length - 1]];
    if (runs[0].length === 1) return nameByNo.get(first) || "";
    return `${nameByNo.get(first)} - ${nameByNo.get(last)}`;
  }

  return available.map((day) => day.dayName).join(", ");
}

