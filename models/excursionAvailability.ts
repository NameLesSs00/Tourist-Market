import type { ApiResponse } from "./auth";

export interface ExcursionAvailabilityDay {
  id: string;
  dayNo: number;
  dayName: string;
  isAvailable: boolean;
}

export interface ExcursionAvailabilityData {
  excursionId: string;
  days: ExcursionAvailabilityDay[];
}

export interface UpdateDayAvailabilityItem {
  dayNo: number;
  isAvailable: boolean;
}

export interface UpdateWeeklyAvailabilityRequest {
  days: UpdateDayAvailabilityItem[];
}

export type ExcursionAvailabilityResult = ApiResponse<ExcursionAvailabilityData>;
export type ExcursionAvailabilityDayResult = ApiResponse<ExcursionAvailabilityDay>;

export interface WeekDayDefinition {
  dayNo: number;
  name: string;
  short: string;
}

export const WEEK_DAYS: readonly WeekDayDefinition[] = [
  { dayNo: 0, name: "Sunday", short: "Sun" },
  { dayNo: 1, name: "Monday", short: "Mon" },
  { dayNo: 2, name: "Tuesday", short: "Tue" },
  { dayNo: 3, name: "Wednesday", short: "Wed" },
  { dayNo: 4, name: "Thursday", short: "Thu" },
  { dayNo: 5, name: "Friday", short: "Fri" },
  { dayNo: 6, name: "Saturday", short: "Sat" },
] as const;
