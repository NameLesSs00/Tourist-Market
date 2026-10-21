"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FiBookOpen,
  FiImage,
  FiLoader,
  FiTrash2,
  FiUploadCloud,
} from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  LANG_FLAGS,
  LANG_LABELS,
  LANGS,
  type LangCode,
  type LocalizedText,
} from "@/models/faq";
import type { BlogItem, BlogUpsertRequest } from "@/models/blog";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";

interface BlogFormPanelProps {
  open: boolean;
  onClose: () => void;
  blog?: BlogItem | null;
  onSubmitCreate: (data: {
    body: BlogUpsertRequest;
    imageFile?: File | null;
  }) => void;
  onSubmitUpdate: (data: {
    id: string;
    body: BlogUpsertRequest;
    imageFile?: File | null;
    removeImage?: boolean;
  }) => void;
  isSubmitting?: boolean;
}

function emptyLocalized(): LocalizedText {
  return { en: "", ru: "", de: "", fr: "" };
}

export function BlogFormPanel({
  open,
  onClose,
  blog,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting = false,
}: BlogFormPanelProps) {
  const isEdit = Boolean(blog);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [title, setTitle] = useState<LocalizedText>(emptyLocalized());
  const [description, setDescription] = useState<LocalizedText>(
    emptyLocalized()
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setSelectedFile(null);
    setFilePreview(null);
    setRemoveExistingImage(false);

    if (blog) {
      setTitle({
        en: blog.title ?? "",
        ru: blog.title ?? "",
        de: blog.title ?? "",
        fr: blog.title ?? "",
      });
      setDescription({
        en: blog.description ?? "",
        ru: blog.description ?? "",
        de: blog.description ?? "",
        fr: blog.description ?? "",
      });
    } else {
      setTitle(emptyLocalized());
      setDescription(emptyLocalized());
    }
  }, [open, blog]);

  // Handle local image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
    setRemoveExistingImage(false);
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.en?.trim()) {
      newErrors["title.en"] = "English Title is required.";
    }
    if (!description.en?.trim()) {
      newErrors["description.en"] = "English Description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in the required English fields.");
      return;
    }

    const body: BlogUpsertRequest = {
      title,
      description,
    };

    if (isEdit && blog) {
      onSubmitUpdate({
        id: blog.id,
        body,
        imageFile: selectedFile,
        removeImage: removeExistingImage && !selectedFile,
      });
    } else {
      onSubmitCreate({
        body,
        imageFile: selectedFile,
      });
    }
  };

  // Determine current image to preview
  const currentImageUrl = removeExistingImage
    ? null
    : filePreview || getBackendImageUrl(blog?.imageUrl) || null;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Blog" : "Create New Blog"}
      subtitle={
        isEdit
          ? "Update blog details, cover image, and localized content."
          : "Add a new blog post. English is required; other languages are optional."
      }
      icon={<FiBookOpen className="h-5 w-5" />}
      widthClassName="max-w-2xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-form"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#093247] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Blog"}
          </button>
        </>
      }
    >
      <form
        id="blog-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        {/* Cover Image Uploader */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#083952]">
            Blog Cover Image (Optional)
          </label>

          {currentImageUrl ? (
            <div className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="relative aspect-video w-full bg-slate-100">
                <Image
                  src={currentImageUrl}
                  alt="Blog Cover Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  unoptimized
                />
              </div>

              {/* Actions bar over image */}
              <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-white p-3">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <FiImage className="h-4 w-4 text-[#0E4A68]" />
                  <span>
                    {selectedFile
                      ? selectedFile.name
                      : "Current cover image attached"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A6814] cursor-pointer"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedFile) {
                        handleClearSelectedFile();
                      } else {
                        setRemoveExistingImage(true);
                      }
                    }}
                    className="rounded-lg p-2 text-[#94A3B8] hover:bg-[#FEF2F2] hover:text-[#DC2626] cursor-pointer"
                    title="Remove image"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-8 text-center transition-colors hover:border-[#0E4A68] hover:bg-[#F1F5F9] cursor-pointer"
            >
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E4A6814] text-[#0E4A68]">
                <FiUploadCloud className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold text-[#083952]">
                Click or drag & drop to upload cover image
              </p>
              <p className="mt-1 text-[11px] text-[#94A3B8]">
                PNG, JPG, or WEBP up to 5MB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Localized Titles */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#083952]">
            Blog Title
          </label>
          <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            {LANGS.map((lang) => {
              const isEn = lang === "en";
              const err = errors[`title.${lang}`];
              return (
                <div key={lang} className="space-y-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#334155]">
                    <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                      <Image
                        src={LANG_FLAGS[lang]}
                        alt={LANG_LABELS[lang]}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </span>
                    <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] uppercase font-semibold text-white">
                      {lang}
                    </span>
                    <span>{LANG_LABELS[lang]}</span>
                    {isEn ? (
                      <span className="text-[#DC2626]">*</span>
                    ) : (
                      <span className="text-[11px] text-[#94A3B8] font-normal">
                        (optional)
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={title[lang] ?? ""}
                    onChange={(e) => {
                      setTitle((prev) => ({
                        ...prev,
                        [lang]: e.target.value,
                      }));
                      if (err) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next[`title.${lang}`];
                          return next;
                        });
                      }
                    }}
                    placeholder={`Blog title in ${LANG_LABELS[lang]}...`}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                      err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                    }`}
                  />
                  {err && (
                    <p className="text-[11px] font-medium text-[#DC2626]">
                      {err}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Localized Descriptions */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#083952]">
            Blog Overview / Description
          </label>
          <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            {LANGS.map((lang) => {
              const isEn = lang === "en";
              const err = errors[`description.${lang}`];
              return (
                <div key={lang} className="space-y-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#334155]">
                    <span className="relative flex h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                      <Image
                        src={LANG_FLAGS[lang]}
                        alt={LANG_LABELS[lang]}
                        fill
                        className="object-cover"
                        sizes="20px"
                      />
                    </span>
                    <span className="rounded-md bg-[#0E4A68] px-1.5 py-0.5 text-[10px] uppercase font-semibold text-white">
                      {lang}
                    </span>
                    <span>{LANG_LABELS[lang]}</span>
                    {isEn ? (
                      <span className="text-[#DC2626]">*</span>
                    ) : (
                      <span className="text-[11px] text-[#94A3B8] font-normal">
                        (optional)
                      </span>
                    )}
                  </label>
                  <textarea
                    rows={3}
                    value={description[lang] ?? ""}
                    onChange={(e) => {
                      setDescription((prev) => ({
                        ...prev,
                        [lang]: e.target.value,
                      }));
                      if (err) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next[`description.${lang}`];
                          return next;
                        });
                      }
                    }}
                    placeholder={`Short description or excerpt in ${LANG_LABELS[lang]}...`}
                    className={`w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#0E4A68] focus:outline-none focus:ring-2 focus:ring-[#0E4A6826] ${
                      err ? "border-[#FCA5A5]" : "border-[#E2E8F0]"
                    }`}
                  />
                  {err && (
                    <p className="text-[11px] font-medium text-[#DC2626]">
                      {err}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </SlidePanel>
  );
}

export default BlogFormPanel;
