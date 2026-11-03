export interface PrivateDetailHeroDict {
  upTo?: string;
  person?: string;
  people?: string;
  hour?: string;
  hours?: string;
  hoursGen?: string;
  allWeek?: string;
  daily?: string;
  flexible?: string;
  hotelPickup?: string;
}

/**
 * Localizes duration based on durationHours and fallback text.
 * Example: 6 -> "6 hours" (en), "6 heures" (fr), "6 Stunden" (de), "6 часов" (ru).
 */
export function formatPrivateDuration(
  durationHours: number,
  rawDuration: string,
  locale: string = "en",
  dict?: PrivateDetailHeroDict
): string {
  const hUnit = dict?.hours || "hours";
  const hSingle = dict?.hour || "hour";

  if (durationHours > 0) {
    if (locale === "ru") {
      const mod10 = durationHours % 10;
      const mod100 = durationHours % 100;
      let unit = hUnit; // часов
      if (mod10 === 1 && mod100 !== 11) {
        unit = hSingle; // час
      } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        unit = dict?.hoursGen || "часа";
      }
      return `${durationHours} ${unit}`;
    }

    const unit = durationHours === 1 ? hSingle : hUnit;
    return `${durationHours} ${unit}`;
  }

  return rawDuration || `${6} ${hUnit}`;
}

/**
 * Localizes common availability patterns (All week, Daily, Flexible).
 */
export function formatPrivateAvailability(
  availability: string | undefined,
  dict?: PrivateDetailHeroDict
): string {
  const fallback = dict?.flexible || "Flexible";
  if (!availability) return fallback;

  const normalized = availability.trim().toLowerCase();

  if (
    normalized === "all week" ||
    normalized === "toute la semaine" ||
    normalized === "ganze woche" ||
    normalized === "всю неделю"
  ) {
    return dict?.allWeek || "All week";
  }
  if (
    normalized === "daily" ||
    normalized === "tous les jours" ||
    normalized === "täglich" ||
    normalized === "ежедневно"
  ) {
    return dict?.daily || "Daily";
  }
  if (
    normalized === "flexible" ||
    normalized === "flexibel" ||
    normalized === "year-round" ||
    normalized === "гибкий график"
  ) {
    return dict?.flexible || "Flexible";
  }

  return availability;
}

/**
 * Formats passenger capacity to match "Up to 35 People" / "Bis zu 35 Personen" / "До 35 человек".
 */
export function formatPrivateMaxParticipants(
  rawCapacity: number | string | undefined,
  locale: string = "en",
  dict?: PrivateDetailHeroDict
): string {
  const upTo = dict?.upTo || "Up to";
  const person = dict?.person || "Person";
  const people = dict?.people || "People";

  let num = 35;
  if (typeof rawCapacity === "number" && rawCapacity > 0) {
    num = rawCapacity;
  } else if (typeof rawCapacity === "string") {
    const match = rawCapacity.match(/\d+/);
    if (match) {
      const parsed = parseInt(match[0], 10);
      if (!Number.isNaN(parsed) && parsed > 0) num = parsed;
    }
  }

  const personWord = num === 1 ? person : people;
  return `${upTo} ${num} ${personWord}`;
}

/**
 * Formats review dates according to the user's locale.
 */
export function formatPrivateReviewDate(
  createdAt: string,
  locale: string = "en"
): string {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  const intlLocale =
    locale === "ru"
      ? "ru-RU"
      : locale === "de"
      ? "de-DE"
      : locale === "fr"
      ? "fr-FR"
      : "en-US";

  try {
    return new Intl.DateTimeFormat(intlLocale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }
}

