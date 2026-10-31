"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type {
  ProductImage,
  ProductKeyUpsertItem,
  ProductListItem,
  ProductUpsertRequest,
} from "@/models/product";
import {
  useProductAllLanguagesQuery,
  useReorderProductImagesMutation,
} from "@/features/products/useProductAdmin";

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

/**
 * In-memory row structure for product keys in the admin form.
 * - title: LocalizedText (maps to key.name)
 * - description: LocalizedText (maps to key.values[0].value)
 */
export interface ProductFormKeyRow {
  id?: number;
  valueId?: number;
  title: LocalizedText;
  description: LocalizedText;
  displayOrder: number;
}

interface UseProductFormParams {
  open: boolean;
  product?: ProductListItem;
  onSubmitCreate: (data: {
    body: ProductUpsertRequest;
    newImages?: File[];
  }) => void;
  onSubmitUpdate: (data: {
    id: number;
    body: ProductUpsertRequest;
    newImages?: File[];
    deletedImageIds?: number[];
  }) => void;
}

export function useProductForm({
  open,
  product,
  onSubmitCreate,
  onSubmitUpdate,
}: UseProductFormParams) {
  const isEdit = Boolean(product);
  const detailQuery = useProductAllLanguagesQuery(product?.id);
  const reorderMutation = useReorderProductImagesMutation();

  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [subtitle, setSubtitle] = useState<LocalizedText>(emptyLocalized());
  const [priceFor, setPriceFor] = useState<LocalizedText>(emptyLocalized());
  const [price, setPrice] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(0);

  // Dynamic specifications: Title & Description
  const [keys, setKeys] = useState<ProductFormKeyRow[]>([]);

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && product) {
      const d = detailQuery.data;
      setTitle(
        d?.title || { en: product.title || "", ru: "", de: "", fr: "" }
      );
      setSubtitle(
        d?.subtitle || { en: product.subTitle || "", ru: "", de: "", fr: "" }
      );
      setPriceFor(
        d?.priceFor || { en: product.priceFor || "", ru: "", de: "", fr: "" }
      );
      setPrice(d?.price ?? product.price ?? 0);
      setSubCategoryId(d?.subCategoryId ?? product.subCategoryId ?? 0);

      // Hydrate keys
      if (d?.keys && d.keys.length > 0) {
        setKeys(
          d.keys.map((k, idx) => ({
            id: k.id && k.id > 0 ? k.id : undefined,
            valueId:
              k.values?.[0]?.id && k.values[0].id > 0
                ? k.values[0].id
                : undefined,
            title: k.name || emptyLocalized(),
            description: k.values?.[0]?.value || emptyLocalized(),
            displayOrder: k.displayOrder ?? idx + 1,
          }))
        );
      } else {
        setKeys([]);
      }

      const raw = d?.images || product.images || [];
      setExistingImages(
        [...raw].sort((a, b) => a.displayOrder - b.displayOrder)
      );
    } else if (!isEdit) {
      setTitle(emptyLocalized());
      setSubtitle(emptyLocalized());
      setPriceFor(emptyLocalized());
      setPrice(0);
      setSubCategoryId(0);
      setKeys([]);
      setExistingImages([]);
    }
    setDeletedImageIds([]);
    setNewFiles([]);
    setNewPreviews([]);
    setErrors({});
  }, [product, isEdit, detailQuery.data, open]);

  useEffect(() => {
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newPreviews]);

  const handleAddKey = () => {
    setKeys((prev) => [
      ...prev,
      {
        title: emptyLocalized(),
        description: emptyLocalized(),
        displayOrder: prev.length + 1,
      },
    ]);
  };

  const handleRemoveKey = (index: number) => {
    setKeys((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateKeyTitle = (
    index: number,
    lang: LangCode,
    value: string
  ) => {
    setKeys((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;
      updated[index] = {
        ...updated[index],
        title: {
          ...updated[index].title,
          [lang]: value,
        },
      };
      return updated;
    });
  };

  const handleUpdateKeyDescription = (
    index: number,
    lang: LangCode,
    value: string
  ) => {
    setKeys((prev) => {
      const updated = [...prev];
      if (!updated[index]) return prev;
      updated[index] = {
        ...updated[index],
        description: {
          ...updated[index].description,
          [lang]: value,
        },
      };
      return updated;
    });
  };

  const handleAddFiles = (files: File[]) => {
    const previews = files.map((f) => URL.createObjectURL(f));
    setNewFiles((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveExisting = (id: number) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const handleRemoveNew = (index: number) => {
    const previewToRevoke = newPreviews[index];
    if (previewToRevoke) URL.revokeObjectURL(previewToRevoke);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReorderExisting = (reordered: ProductImage[]) => {
    const updated = reordered.map((img, idx) => ({
      ...img,
      displayOrder: idx + 1,
    }));
    setExistingImages(updated);

    if (isEdit && product?.id) {
      const images = updated.map((img) => ({
        imageId: img.id,
        displayOrder: img.displayOrder,
      }));
      reorderMutation.mutate({ productId: product.id, images });
    }
  };

  const handleSetHero = (id: number) => {
    const target = existingImages.find((img) => img.id === id);
    if (!target) return;
    const others = existingImages.filter((img) => img.id !== id);
    handleReorderExisting([target, ...others]);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.en?.trim()) errs["title.en"] = "English title is required.";
    if (!subtitle.en?.trim())
      errs["subtitle.en"] = "English subtitle is required.";
    if (!priceFor.en?.trim())
      errs["priceFor.en"] = "English price unit is required.";
    if (price <= 0) errs.price = "Price must be greater than 0.";
    if (!subCategoryId || subCategoryId <= 0)
      errs.subCategoryId = "Please select a subcategory.";

    const langs: LangCode[] = ["en", "ru", "de", "fr"];
    for (const lang of langs) {
      if ((title[lang]?.length ?? 0) > 500) {
        errs[`title.${lang}`] = `${lang.toUpperCase()} title cannot exceed 500 characters.`;
      }
      if ((subtitle[lang]?.length ?? 0) > 500) {
        errs[`subtitle.${lang}`] = `${lang.toUpperCase()} subtitle cannot exceed 500 characters.`;
      }
      if ((priceFor[lang]?.length ?? 0) > 500) {
        errs[`priceFor.${lang}`] = `${lang.toUpperCase()} price unit cannot exceed 500 characters.`;
      }
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstErr = Object.values(errs)[0];
      toast.error(firstErr || "Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Filter out rows that have no title and no description
    const validKeys: ProductKeyUpsertItem[] = keys
      .filter((k) => k.title.en?.trim() || k.description.en?.trim())
      .map((k, idx) => ({
        id: k.id && k.id > 0 ? k.id : 0,
        name: k.title,
        displayOrder: idx + 1,
        values: [
          {
            id: k.valueId && k.valueId > 0 ? k.valueId : 0,
            value: k.description,
            displayOrder: 1,
          },
        ],
      }));

    const body: ProductUpsertRequest = {
      title,
      subtitle,
      price,
      priceFor,
      subCategoryId,
      keys: validKeys.length > 0 ? validKeys : undefined,
    };
    const newImages = newFiles.length > 0 ? newFiles : undefined;

    if (isEdit && product) {
      const deleted = deletedImageIds.length > 0 ? deletedImageIds : undefined;
      onSubmitUpdate({
        id: product.id,
        body,
        newImages,
        deletedImageIds: deleted,
      });
    } else {
      onSubmitCreate({ body, newImages });
    }
  };

  return {
    isEdit,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    priceFor,
    setPriceFor,
    price,
    setPrice,
    subCategoryId,
    setSubCategoryId,
    keys,
    handleAddKey,
    handleRemoveKey,
    handleUpdateKeyTitle,
    handleUpdateKeyDescription,
    existingImages,
    newPreviews,
    errors,
    setErrors,
    handleAddFiles,
    handleRemoveExisting,
    handleRemoveNew,
    handleReorderExisting,
    handleSetHero,
    isReordering: reorderMutation.isPending,
    handleSubmit,
  };
}
