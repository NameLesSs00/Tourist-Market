import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "@/clientApi/productCategoryApi";
import { getProductSubcategories } from "@/clientApi/productSubcategoryApi";
import type { ProductCategoryItem } from "@/models/productCategory";
import type { ProductSubcategoryItem } from "@/models/productSubcategory";

export const CLIENT_CATEGORIES_KEY = ["client", "product-categories"] as const;
export const CLIENT_SUBCATEGORIES_KEY = ["client", "product-subcategories"] as const;

export interface CategoryWithSubcategories {
  id: number;
  name: string;
  imageUrl?: string | null;
  displayOrder: number;
  noOfItems: number;
  subcategories: ProductSubcategoryItem[];
}

/**
 * Fetches all product categories for client visitors.
 */
export function useClientProductCategoriesQuery(locale: string = "en") {
  return useQuery<ProductCategoryItem[]>({
    queryKey: [...CLIENT_CATEGORIES_KEY, "all", locale],
    queryFn: async () => {
      const res = await getProductCategories({
        pageNumber: 1,
        pageSize: 100,
        lang: locale,
        language: locale,
      });
      const raw: any = res;
      if (Array.isArray(raw?.data?.items)) return raw.data.items;
      if (Array.isArray(raw?.items)) return raw.items;
      if (Array.isArray(raw?.data)) return raw.data;
      if (Array.isArray(raw)) return raw;
      return [];
    },
    staleTime: 60 * 1000,
  });
}

/**
 * Fetches all product subcategories for client visitors.
 */
export function useClientProductSubcategoriesQuery(
  categoryId?: number,
  locale: string = "en"
) {
  return useQuery<ProductSubcategoryItem[]>({
    queryKey: [...CLIENT_SUBCATEGORIES_KEY, "all", categoryId, locale],
    queryFn: async () => {
      const res = await getProductSubcategories({
        categoryId: categoryId && categoryId > 0 ? categoryId : undefined,
        pageNumber: 1,
        pageSize: 100,
        lang: locale,
        language: locale,
      });
      const raw: any = res;
      if (Array.isArray(raw?.data?.items)) return raw.data.items;
      if (Array.isArray(raw?.items)) return raw.items;
      if (Array.isArray(raw?.data)) return raw.data;
      if (Array.isArray(raw)) return raw;
      return [];
    },
    staleTime: 60 * 1000,
  });
}
