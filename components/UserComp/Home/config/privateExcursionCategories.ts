export interface PrivateCategoryConfigItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  categoryId: string;
}

export const PRIVATE_HOMEPAGE_CATEGORIES: PrivateCategoryConfigItem[] = [
  {
    id: "historical",
    title: "Private Historical Trips",
    description:
      "Explore ancient landmarks, iconic monuments, and fascinating stories from the past.",
    imageSrc: "/homepage/privateSection/PrivateHistoricalTrips.png",
    categoryId: "d33ff829-e326-4f0e-9260-efa7ec7b2660",
  },
  {
    id: "sea",
    title: "Private Sea Trips",
    description:
      "Discover crystal-clear waters, vibrant marine life, and breathtaking coastal scenery.",
    imageSrc: "/homepage/privateSection/PrivateSeaTrips.png",
    categoryId: "f20ce9bc-504f-4f93-950f-44fce0da6c75",
  },
  {
    id: "safari",
    title: "Private Super Safari Trips",
    description:
      "Enjoy thrilling off-road rides, exciting desert activities, and unforgettable safari experiences.",
    imageSrc: "/homepage/privateSection/PrivateSuperSafariTrips.png",
    categoryId: "7b6e5e95-9a3b-4ca1-a69c-a9cfb9eabf5d",
  },
  {
    id: "city",
    title: "Private City Trips",
    description:
      "Discover famous attractions, charming streets, and local culture at your own pace.",
    imageSrc: "/homepage/privateSection/PrivateCityTrips.png",
    categoryId: "6824efb2-41da-4897-b7ec-ed0c977afbf7",
  },
  {
    id: "fun",
    title: "Private Fun Trips",
    description:
      "Explore golden dunes, stunning desert landscapes, and the peaceful beauty of nature.",
    imageSrc: "/homepage/privateSection/PrivateFunTrips.png",
    categoryId: "df9e19be-fc0e-4e2d-816b-cbb0b8f33e3b",
  },
];

export const getTopPrivateCategories = () =>
  PRIVATE_HOMEPAGE_CATEGORIES.slice(0, 3);

export const getBottomPrivateCategories = () =>
  PRIVATE_HOMEPAGE_CATEGORIES.slice(3, 5);

