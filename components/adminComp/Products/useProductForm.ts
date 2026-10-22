"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { type LocalizedText } from "@/models/localization";
import type {
  ProductImage,
  ProductListItem,
  ProductUpsertRequest,
} from "@/models/product";
import {
  useProductAllLanguagesQuery,
  useReorderProductImagesMutation,
} from "@/features/products/useProductAdmin";

const emptyLocalized = (): LocalizedText => ({ en: "", ru: "", de: "", fr: "" });

interface UseProductFormParams {
  open: boolean;
  product?: ProductListItem;
  onSubmitCreate: (data: { body: ProductUpsertRequest; newImages?: File[] }) => void;
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

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && product) {
      const d = detailQuery.data;
      setTitle(d?.title || { en: product.title || "", ru: "", de: "", fr: "" });
      setSubtitle(d?.subtitle || { en: product.subTitle || "", ru: "", de: "", fr: "" });
      setPriceFor(d?.priceFor || { en: product.priceFor || "", ru: "", de: "", fr: "" });
      setPrice(d?.price ?? product.price ?? 0);
      setSubCategoryId(d?.subCategoryId ?? product.subCategoryId ?? 0);
      const raw = d?.images || product.images || [];
      setExistingImages([...raw].sort((a, b) => a.displayOrder - b.displayOrder));
    } else if (!isEdit) {
      setTitle(emptyLocalized());
      setSubtitle(emptyLocalized());
      setPriceFor(emptyLocalized());
      setPrice(0);
      setSubCategoryId(0);
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
    const updated = reordered.map((img, idx) => ({ ...img, displayOrder: idx + 1 }));
    setExistingImages(updated);

    if (isEdit && product?.id) {
      const images = updated.map((img) => ({ imageId: img.id, displayOrder: img.displayOrder }));
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
    if (!subtitle.en?.trim()) errs["subtitle.en"] = "English subtitle is required.";
    if (!priceFor.en?.trim()) errs["priceFor.en"] = "English price unit is required.";
    if (price <= 0) errs.price = "Price must be greater than 0.";
    if (!subCategoryId || subCategoryId <= 0) errs.subCategoryId = "Please select a subcategory.";

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body: ProductUpsertRequest = { title, subtitle, price, priceFor, subCategoryId };
    const newImages = newFiles.length > 0 ? newFiles : undefined;

    if (isEdit && product) {
      const deleted = deletedImageIds.length > 0 ? deletedImageIds : undefined;
      onSubmitUpdate({ id: product.id, body, newImages, deletedImageIds: deleted });
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
