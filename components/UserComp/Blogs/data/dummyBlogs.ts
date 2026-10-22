import { BlogPost, BlogCategory } from "../types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "All",
  "Destination",
  "Travel Tips",
  "Live Style",
  "Adventure",
];

export const DUMMY_BLOGS: BlogPost[] = [
  // Page 1 (12 cards matching the screenshot exactly)
  {
    id: "blog-1",
    slug: "beyond-the-journey-pyramids",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/876e999c4be969c4ed7d37e43aaf9a2d8d80fddd.png",
    category: "Destination",
    readTime: "5 min read",
    publishedAt: "2026-10-12",
  },
  {
    id: "blog-2",
    slug: "small-details-big-difference-camper",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/ee57797f1a6a207b7d8ea104176bbd17d99ef391.png",
    category: "Live Style",
    readTime: "4 min read",
    publishedAt: "2026-10-10",
  },
  {
    id: "blog-3",
    slug: "beyond-the-journey-scuba-turtle",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg",
    category: "Adventure",
    readTime: "6 min read",
    publishedAt: "2026-10-08",
  },
  {
    id: "blog-4",
    slug: "small-details-big-difference-yacht",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-10-05",
  },
  {
    id: "blog-5",
    slug: "beyond-the-journey-dolphins",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/8410256545d057fcd2a311473860464d41f9e0b9.png",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-10-02",
  },
  {
    id: "blog-6",
    slug: "beyond-the-journey-grand-museum",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/7553a6c79970cada54592ac2e8b11ac186b4146c.png",
    category: "Destination",
    readTime: "7 min read",
    publishedAt: "2026-09-28",
  },
  {
    id: "blog-7",
    slug: "beyond-the-journey-pyramids-guide",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/876e999c4be969c4ed7d37e43aaf9a2d8d80fddd.png",
    category: "Destination",
    readTime: "5 min read",
    publishedAt: "2026-09-25",
  },
  {
    id: "blog-8",
    slug: "small-details-big-difference-sunset-camp",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/ee57797f1a6a207b7d8ea104176bbd17d99ef391.png",
    category: "Live Style",
    readTime: "4 min read",
    publishedAt: "2026-09-20",
  },
  {
    id: "blog-9",
    slug: "beyond-the-journey-coral-reefs",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg",
    category: "Adventure",
    readTime: "6 min read",
    publishedAt: "2026-09-18",
  },
  {
    id: "blog-10",
    slug: "small-details-big-difference-sea-trip",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-09-15",
  },
  {
    id: "blog-11",
    slug: "beyond-the-journey-marine-life",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/8410256545d057fcd2a311473860464d41f9e0b9.png",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-09-10",
  },
  {
    id: "blog-12",
    slug: "beyond-the-journey-ancient-treasures",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/7553a6c79970cada54592ac2e8b11ac186b4146c.png",
    category: "Destination",
    readTime: "7 min read",
    publishedAt: "2026-09-05",
  },

  // Additional items for page 2 and page 3 pagination
  {
    id: "blog-13",
    slug: "luxor-kings-valley-adventure",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/876e999c4be969c4ed7d37e43aaf9a2d8d80fddd.png",
    category: "Destination",
    readTime: "5 min read",
    publishedAt: "2026-08-30",
  },
  {
    id: "blog-14",
    slug: "packing-smart-for-red-sea",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-08-25",
  },
  {
    id: "blog-15",
    slug: "desert-safari-under-stars",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/ee57797f1a6a207b7d8ea104176bbd17d99ef391.png",
    category: "Live Style",
    readTime: "5 min read",
    publishedAt: "2026-08-20",
  },
  {
    id: "blog-16",
    slug: "deep-blue-scuba-wrecks",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg",
    category: "Adventure",
    readTime: "6 min read",
    publishedAt: "2026-08-15",
  },
  {
    id: "blog-17",
    slug: "dolphin-reef-hurghada",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/8410256545d057fcd2a311473860464d41f9e0b9.png",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-08-10",
  },
  {
    id: "blog-18",
    slug: "cairo-hidden-art-galleries",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/7553a6c79970cada54592ac2e8b11ac186b4146c.png",
    category: "Live Style",
    readTime: "6 min read",
    publishedAt: "2026-08-05",
  },
  {
    id: "blog-19",
    slug: "yacht-charter-guide",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-08-01",
  },
  {
    id: "blog-20",
    slug: "bedouin-culture-sinai",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/ee57797f1a6a207b7d8ea104176bbd17d99ef391.png",
    category: "Destination",
    readTime: "7 min read",
    publishedAt: "2026-07-28",
  },
  {
    id: "blog-21",
    slug: "snorkeling-el-gouna",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-07-22",
  },
  {
    id: "blog-22",
    slug: "aswan-felucca-sailing",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Live Style",
    readTime: "5 min read",
    publishedAt: "2026-07-18",
  },
  {
    id: "blog-23",
    slug: "safaga-coral-gardens",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/8410256545d057fcd2a311473860464d41f9e0b9.png",
    category: "Adventure",
    readTime: "4 min read",
    publishedAt: "2026-07-12",
  },
  {
    id: "blog-24",
    slug: "egyptian-museum-highlights",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/7553a6c79970cada54592ac2e8b11ac186b4146c.png",
    category: "Destination",
    readTime: "6 min read",
    publishedAt: "2026-07-05",
  },

  // Page 3 items
  {
    id: "blog-25",
    slug: "giza-at-sunrise",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/876e999c4be969c4ed7d37e43aaf9a2d8d80fddd.png",
    category: "Destination",
    readTime: "5 min read",
    publishedAt: "2026-06-30",
  },
  {
    id: "blog-26",
    slug: "siwa-oasis-peace",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/ee57797f1a6a207b7d8ea104176bbd17d99ef391.png",
    category: "Live Style",
    readTime: "6 min read",
    publishedAt: "2026-06-25",
  },
  {
    id: "blog-27",
    slug: "marsa-alam-sea-cows",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/65daec21883f275c2509a2dfaebfa61e20f7da79.jpg",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-06-20",
  },
  {
    id: "blog-28",
    slug: "alexandria-mediterranean-charm",
    title: "Small Details, Big Difference",
    excerpt:
      "Discover how reliable arrangements and well-planned services can turn a good holiday into a more comfortable and memorable one.",
    image: "/blogs/f66ca3d759a586c68eb7224bd8b561228d0040d1.png",
    category: "Travel Tips",
    readTime: "4 min read",
    publishedAt: "2026-06-15",
  },
  {
    id: "blog-29",
    slug: "red-sea-dolphin-house",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/8410256545d057fcd2a311473860464d41f9e0b9.png",
    category: "Adventure",
    readTime: "5 min read",
    publishedAt: "2026-06-10",
  },
  {
    id: "blog-30",
    slug: "karnak-sound-and-light",
    title: "Beyond the Journey",
    excerpt:
      "Explore unforgettable destinations, hidden gems, and unique experiences along the Red Sea coast.",
    image: "/blogs/7553a6c79970cada54592ac2e8b11ac186b4146c.png",
    category: "Destination",
    readTime: "6 min read",
    publishedAt: "2026-06-05",
  },
];
