export type BlogCategory =
  | "All"
  | "Destination"
  | "Travel Tips"
  | "Live Style"
  | "Adventure";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "All",
  "Destination",
  "Travel Tips",
  "Live Style",
  "Adventure",
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: Exclude<BlogCategory, "All">;
  publishedAt?: string;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface BlogFilterParams {
  category: BlogCategory;
  page: number;
  limit: number;
  search?: string;
}

export interface BlogPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogPaginationResponse {
  data: BlogPost[];
  meta: BlogPaginationMeta;
}
