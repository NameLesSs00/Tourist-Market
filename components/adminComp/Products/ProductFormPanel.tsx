"use client";

import React from "react";
import { FiLoader } from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared";
import { type LangCode } from "@/models/localization";
import type {
  ProductListItem,
  ProductUpsertRequest,
} from "@/models/product";
import {
  ProductGalleryManager,
  ProductKeysManager,
  ProductLocalizedFields,
  ProductSpecsPricing,
} from "./components";
import { useProductForm } from "./useProductForm";

interface ProductFormPanelProps {
  open: boolean;
  product?: ProductListItem;
  onClose: () => void;
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
  isSubmitting: boolean;
}

export function ProductFormPanel({
  open,
  product,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: ProductFormPanelProps) {
  const {
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
    isReordering,
    handleSubmit,
  } = useProductForm({
    open,
    product,
    onSubmitCreate,
    onSubmitUpdate,
  });

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Product" : "Create New Product"}
      subtitle={
        isEdit
          ? "Update product details, pricing, specifications, and photo gallery."
          : "Add a new product with multilingual details, specifications, and photos."
      }
      widthClassName="max-w-2xl"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting || isReordering}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting || isReordering}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#0A344A] disabled:opacity-60 cursor-pointer transition-colors"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            <span>{isEdit ? "Save Changes" : "Create Product"}</span>
          </button>
        </div>
      }
    >
      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        {/* 1. TOP: Image Gallery Manager */}
        <ProductGalleryManager
          existingImages={existingImages}
          newPreviews={newPreviews}
          onAddFiles={handleAddFiles}
          onRemoveExisting={handleRemoveExisting}
          onRemoveNew={handleRemoveNew}
          onReorderExisting={handleReorderExisting}
          onSetHero={handleSetHero}
          isReordering={isReordering}
        />

        {/* 2. MIDDLE: Subcategory Selector and Price */}
        <ProductSpecsPricing
          subCategoryId={subCategoryId}
          onSubCategoryChange={(id) => {
            setSubCategoryId(id);
            if (errors.subCategoryId)
              setErrors((prev) => ({ ...prev, subCategoryId: "" }));
          }}
          price={price}
          onPriceChange={(val) => {
            setPrice(val);
            if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
          }}
          errors={errors}
        />

        {/* 3. Localized Fields (Title, Subtitle, Price Unit) */}
        <ProductLocalizedFields
          title={title}
          subtitle={subtitle}
          priceFor={priceFor}
          errors={errors}
          onTitleChange={(lang: LangCode, val: string) => {
            setTitle((prev) => ({ ...prev, [lang]: val }));
            if (errors[`title.${lang}`])
              setErrors((prev) => ({ ...prev, [`title.${lang}`]: "" }));
          }}
          onSubtitleChange={(lang: LangCode, val: string) => {
            setSubtitle((prev) => ({ ...prev, [lang]: val }));
            if (errors[`subtitle.${lang}`])
              setErrors((prev) => ({ ...prev, [`subtitle.${lang}`]: "" }));
          }}
          onPriceForChange={(lang: LangCode, val: string) => {
            setPriceFor((prev) => ({ ...prev, [lang]: val }));
            if (errors[`priceFor.${lang}`])
              setErrors((prev) => ({ ...prev, [`priceFor.${lang}`]: "" }));
          }}
        />

        {/* 4. BOTTOM: Dynamic Specifications Manager (Keys: Title & Description) */}
        <ProductKeysManager
          keys={keys}
          onAddKey={handleAddKey}
          onRemoveKey={handleRemoveKey}
          onUpdateTitle={handleUpdateKeyTitle}
          onUpdateDescription={handleUpdateKeyDescription}
        />
      </form>
    </SlidePanel>
  );
}

export default ProductFormPanel;
