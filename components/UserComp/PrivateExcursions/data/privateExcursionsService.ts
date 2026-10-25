import { DUMMY_PRIVATE_EXCURSIONS } from "./dummyPrivateExcursions";
import { PrivateExcursion, PrivateExcursionFilterParams } from "../types";

export async function getPrivateExcursions(
  params?: PrivateExcursionFilterParams
): Promise<PrivateExcursion[]> {
  // Simulate minimal network latency
  await new Promise((resolve) => setTimeout(resolve, 80));

  let results = [...DUMMY_PRIVATE_EXCURSIONS];

  if (!params) return results;

  const { searchQuery, category, duration } = params;

  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    results = results.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }

  if (category && category !== "All Categories" && category !== "all") {
    results = results.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (duration && duration !== "All Durations" && duration !== "all") {
    if (duration === "under-6") {
      results = results.filter((item) => item.durationHours < 6);
    } else if (duration === "6-12") {
      results = results.filter(
        (item) => item.durationHours >= 6 && item.durationHours <= 12
      );
    } else if (duration === "12-18") {
      results = results.filter(
        (item) => item.durationHours >= 12 && item.durationHours <= 18
      );
    } else if (duration === "18-plus") {
      results = results.filter((item) => item.durationHours >= 18);
    }
  }

  return results;
}

export async function getPrivateExcursionBySlug(
  slug: string
): Promise<PrivateExcursion | null> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  const found = DUMMY_PRIVATE_EXCURSIONS.find((item) => item.slug === slug);
  return found || DUMMY_PRIVATE_EXCURSIONS[0];
}
