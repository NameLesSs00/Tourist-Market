export interface DetailHeroDict {
  upTo: string;
  person: string;
  people: string;
  fullDay: string;
  hours: string;
  hour: string;
  hoursGen?: string;
  allWeek: string;
  daily: string;
  flexible: string;
  hotelPickup?: string;
}

/**
 * Localizes duration based on durationHours and fallback text.
 * Example: 8 -> "8 hours" (en), "8 heures" (fr), "8 Stunden" (de), "8 часов" (ru).
 */
export function formatGroupDuration(
  durationHours: number,
  rawDuration: string,
  locale: string,
  dict: DetailHeroDict
): string {
  if (durationHours > 0) {
    if (locale === "ru") {
      const mod10 = durationHours % 10;
      const mod100 = durationHours % 100;
      let unit = dict.hours; // часов
      if (mod10 === 1 && mod100 !== 11) {
        unit = dict.hour; // час
      } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        unit = dict.hoursGen || "часа";
      }
      return `${durationHours} ${unit}`;
    }

    const unit = durationHours === 1 ? dict.hour : dict.hours;
    return `${durationHours} ${unit}`;
  }

  const normalized = (rawDuration || "").trim().toLowerCase();
  if (normalized.includes("full day")) {
    return dict.fullDay;
  }

  return rawDuration || dict.fullDay;
}

/**
 * Localizes common availability patterns (All week, Daily, Flexible, Year-round).
 */
export function formatGroupAvailability(
  availability: string,
  dict: DetailHeroDict
): string {
  const normalized = (availability || "").trim().toLowerCase();

  if (normalized === "all week" || normalized === "toute la semaine" || normalized === "ganze woche" || normalized === "всю неделю") {
    return dict.allWeek;
  }
  if (normalized === "daily" || normalized === "tous les jours" || normalized === "täglich" || normalized === "ежедневно") {
    return dict.daily;
  }
  if (normalized === "flexible" || normalized === "flexibel" || normalized === "year-round" || normalized === "гибкий график") {
    return dict.flexible;
  }

  return availability || dict.allWeek;
}

/**
 * Formats group size to match "Up to 45 People" / "Bis zu 45 Personen" / "До 45 человек".
 */
export function formatGroupMaxParticipants(
  maxParticipants: number | undefined,
  locale: string,
  dict: DetailHeroDict
): string {
  if (!maxParticipants || maxParticipants <= 0) {
    return dict.flexible;
  }

  if (locale === "ru") {
    const mod10 = maxParticipants % 10;
    const mod100 = maxParticipants % 100;
    const personWord = (mod10 === 1 && mod100 !== 11) ? dict.person : dict.people;
    return `${dict.upTo} ${maxParticipants} ${personWord}`;
  }

  const personWord = maxParticipants === 1 ? dict.person : dict.people;
  return `${dict.upTo} ${maxParticipants} ${personWord}`;
}

/**
 * Localizes pickup text.
 * Falls back to localized hotel pickup when string matches "hotel pickup available" or is empty.
 */
export function formatGroupPickup(
  pickup: string | undefined,
  dict: DetailHeroDict
): string {
  if (!pickup || !pickup.trim()) {
    return dict.hotelPickup || "Hotel pickup available";
  }
  const normalized = pickup.trim().toLowerCase();
  if (
    normalized === "hotel pickup available" ||
    normalized === "hotel pickup" ||
    normalized.includes("hotel pickup") ||
    normalized.includes("prise en charge") ||
    normalized.includes("hotelabholung") ||
    normalized.includes("трансфер")
  ) {
    return dict.hotelPickup || pickup;
  }
  return pickup;
}

