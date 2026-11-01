import { getDictionary, type Dictionary } from "@/shared/utils/getDictionary";

export interface PrivateCategoryConfigItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  categoryId: string;
}

const BASE_PRIVATE_CATEGORIES = [
  {
    id: "historical" as const,
    imageSrc: "/homepage/privateSection/PrivateHistoricalTrips.png",
    categoryId: "d33ff829-e326-4f0e-9260-efa7ec7b2660",
  },
  {
    id: "sea" as const,
    imageSrc: "/homepage/privateSection/PrivateSeaTrips.png",
    categoryId: "f20ce9bc-504f-4f93-950f-44fce0da6c75",
  },
  {
    id: "safari" as const,
    imageSrc: "/homepage/privateSection/PrivateSuperSafariTrips.png",
    categoryId: "7b6e5e95-9a3b-4ca1-a69c-a9cfb9eabf5d",
  },
  {
    id: "city" as const,
    imageSrc: "/homepage/privateSection/PrivateCityTrips.png",
    categoryId: "6824efb2-41da-4897-b7ec-ed0c977afbf7",
  },
  {
    id: "fun" as const,
    imageSrc: "/homepage/privateSection/PrivateFunTrips.png",
    categoryId: "df9e19be-fc0e-4e2d-816b-cbb0b8f33e3b",
  },
];

export function getLocalizedPrivateCategories(locale: string = "en"): PrivateCategoryConfigItem[] {
  const dict = getDictionary(locale);
  const catDict = dict.privateExcursions.categories;

  return BASE_PRIVATE_CATEGORIES.map((cat) => ({
    id: cat.id,
    imageSrc: cat.imageSrc,
    categoryId: cat.categoryId,
    title: catDict[cat.id]?.title ?? "",
    description: catDict[cat.id]?.description ?? "",
  }));
}

export const PRIVATE_HOMEPAGE_CATEGORIES: PrivateCategoryConfigItem[] =
  getLocalizedPrivateCategories("en");

export const getTopPrivateCategories = (locale: string = "en") =>
  getLocalizedPrivateCategories(locale).slice(0, 3);

export const getBottomPrivateCategories = (locale: string = "en") =>
  getLocalizedPrivateCategories(locale).slice(3, 5);

