"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { useAllProductCategoriesQuery } from "@/features/productCategories/useProductCategoryAdmin";
import { useProductSubcategoryAllLanguagesQuery } from "@/features/productSubcategories/useProductSubcategories";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type { ProductCategoryItem } from "@/models/productCategory";
import type {
  ProductSubcategoryItem,
  ProductSubcategoryUpsertRequest,
} from "@/models/productSubcategory";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import {
  ProductSubcategoryCategoryPicker,
  ProductSubcategoryImageUploader,
  ProductSubcategoryLocalizedFields,
} from "./components";

interface ProductSubcategoryFormPanelProps {
  open: boolean;
  onClose: () => void;
  subcategory?: ProductSubcategoryItem | null;
  categories?: ProductCategoryItem[];
  defaultCategoryId?: number;
  onSubmitCreate: (data: {
    body: ProductSubcategoryUpsertRequest;
    imageFile?: File | null;
  }) => void;
  onSubmitUpdate: (data: {
    id: number;
    body: ProductSubcategoryUpsertRequest;
    imageFile?: File | null;
    removeImage?: boolean;
  }) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function ProductSubcategoryFormPanel({
  open,
  onClose,
  subcategory,
  categories: categoriesProp,
  defaultCategoryId,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: ProductSubcategoryFormPanelProps) {
  const isEdit = Boolean(subcategory);

  // In edit mode, query all 4 translations in parallel
  const detailQuery = useProductSubcategoryAllLanguagesQuery(
    isEdit && open ? subcategory?.id ?? null : null
  );

  // Directly fetch product categories to ensure dropdown is never empty
  const allCategoriesQuery = useAllProductCategoriesQuery();
  const effectiveCategories: ProductCategoryItem[] =
    categoriesProp && categoriesProp.length > 0
      ? categoriesProp
      : ((allCategoriesQuery.data as ProductCategoryItem[]) ?? []);

  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cover image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState<boolean>(false);

  useEffect(() => {
    if (isEdit && subcategory) {
      if (detailQuery.data) {
        setName(detailQuery.data.name || emptyLocalized());
        setDisplayOrder(detailQuery.data.displayOrder ?? 0);
        setCategoryId(detailQuery.data.categoryId || subcategory.categoryId || 0);
      } else {
        setName({
          en: subcategory.name || "",
          ru: "",
          de: "",
          fr: "",
        });
        setDisplayOrder(subcategory.displayOrder ?? 0);
        setCategoryId(subcategory.categoryId || 0);
      }
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
      setErrors({});
    } else if (!isEdit) {
      setName(emptyLocalized());
      setDisplayOrder(0);
      setCategoryId(defaultCategoryId && defaultCategoryId > 0 ? defaultCategoryId : 0);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
      setErrors({});
    }
  }, [subcategory, isEdit, detailQuery.data, open, defaultCategoryId]);

  // Clean up object preview URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleNameChange = (lang: LangCode, value: string) => {
    setName((prev) => ({ ...prev, [lang]: value }));
    if (errors[`name.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`name.${lang}`];
        return next;
      });
    }
  };

  const handleCategoryChange = (newCatId: number) => {
    setCategoryId(newCatId);
    if (errors.categoryId) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.categoryId;
        return next;
      });
    }
  };

  const handleImageSelect = (file: File) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setRemoveImage(false);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClearImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (isEdit && subcategory?.imageUrl) {
      setRemoveImage(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.en?.trim()) {
      newErrors["name.en"] = "English subcategory name is required.";
    }

    if (!categoryId || categoryId <= 0) {
      newErrors.categoryId = "Please select a parent product category.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required fields.");
      return;
    }

    const body: ProductSubcategoryUpsertRequest = {
      name,
      displayOrder: Number(displayOrder) || 0,
      categoryId: Number(categoryId),
    };

    if (isEdit && subcategory) {
      onSubmitUpdate({
        id: subcategory.id,
        body,
        imageFile,
        removeImage: removeImage && !imageFile,
      });
    } else {
      onSubmitCreate({
        body,
        imageFile,
      });
    }
  };

  const existingImageUrl =
    !removeImage && subcategory?.imageUrl
      ? getBackendImageUrl(subcategory.imageUrl)
      : null;
  const currentImageUrl = imagePreview || existingImageUrl;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Product Subcategory" : "Add Product Subcategory"}
      subtitle={
        isEdit
          ? "Update localized names, parent product category, and cover image."
          : "Create a new product subcategory organized under a parent category."
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] shadow-2xs hover:bg-[#F8FAFC] disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-subcategory-form"
            disabled={isSubmitting || (isEdit && detailQuery.isLoading)}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-[#093247] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Subcategory"}
          </button>
        </>
      }
    >
      {/* Loading banner for multi-language edit */}
      {isEdit && detailQuery.isLoading && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-[#0E4A6820] bg-[#0E4A680A] p-3 text-xs text-[#0E4A68]">
          <FiLoader className="h-4 w-4 animate-spin" />
          <span>Loading all language translations from server...</span>
        </div>
      )}

      <form
        id="product-subcategory-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Cover Image Subcomponent */}
        <ProductSubcategoryImageUploader
          currentImageUrl={currentImageUrl}
          imageFile={imageFile}
          onFileSelect={handleImageSelect}
          onRemove={handleClearImage}
        />

        {/* Localized Names Subcomponent */}
        <ProductSubcategoryLocalizedFields
          name={name}
          errors={errors}
          onNameChange={handleNameChange}
        />

        {/* Parent Category & Display Order Subcomponent */}
        <ProductSubcategoryCategoryPicker
          categoryId={categoryId}
          categories={effectiveCategories}
          displayOrder={displayOrder}
          isLoading={allCategoriesQuery.isLoading || allCategoriesQuery.isFetching}
          errors={errors}
          onCategoryChange={handleCategoryChange}
          onDisplayOrderChange={setDisplayOrder}
          onRefresh={() => allCategoriesQuery.refetch()}
        />
      </form>
    </SlidePanel>
  );
}

export default ProductSubcategoryFormPanel;
