"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiEdit2,
  FiInbox,
  FiLayers,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import { ConfirmDialog } from "@/components/adminComp/Shared/ConfirmDialog";
import { BlogSectionFormPanel } from "./BlogSectionFormPanel";
import {
  useBlogSectionsQuery,
  useCreateBlogSectionMutation,
  useDeleteBlogSectionMutation,
  useUpdateBlogSectionMutation,
} from "@/features/blogs/useBlogAdmin";
import { LANG_FLAGS } from "@/models/localization";
import type {
  BlogItem,
  BlogSectionCreateRequest,
  BlogSectionItem,
  BlogSectionUpdateRequest,
} from "@/models/blog";

interface BlogSectionManagerPanelProps {
  open: boolean;
  onClose: () => void;
  blog: BlogItem | null;
}

export function BlogSectionManagerPanel({
  open,
  onClose,
  blog,
}: BlogSectionManagerPanelProps) {
  const blogId = blog?.id ?? "";
  const { data: sections, isLoading } = useBlogSectionsQuery(
    open ? blogId : null
  );

  const createSectionMutation = useCreateBlogSectionMutation();
  const updateSectionMutation = useUpdateBlogSectionMutation();
  const deleteSectionMutation = useDeleteBlogSectionMutation();

  // Child editor state
  const [editingSection, setEditingSection] =
    useState<BlogSectionItem | null | undefined>(undefined);
  // undefined: editor closed; null: creating new section; object: editing existing section

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<BlogSectionItem | null>(null);

  const handleOpenCreate = () => setEditingSection(null);
  const handleOpenEdit = (sec: BlogSectionItem) => setEditingSection(sec);
  const handleCloseEditor = () => setEditingSection(undefined);

  const handleCreateSubmit = (data: BlogSectionCreateRequest) => {
    createSectionMutation.mutate(data, {
      onSuccess: handleCloseEditor,
    });
  };

  const handleUpdateSubmit = (data: BlogSectionUpdateRequest) => {
    if (!editingSection) return;
    updateSectionMutation.mutate(
      {
        id: editingSection.id,
        blogId,
        body: data,
      },
      {
        onSuccess: handleCloseEditor,
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteSectionMutation.mutate(
      { id: deleteTarget.id, blogId },
      {
        onSuccess: () => setDeleteTarget(null),
      }
    );
  };

  return (
    <>
      <SlidePanel
        open={open}
        onClose={onClose}
        title="Manage Blog Sections"
        subtitle={blog?.title ? `For: “${blog.title}”` : "Blog content chapters"}
        icon={<FiLayers className="h-5 w-5" />}
        widthClassName="max-w-2xl"
        footer={
          <div className="flex w-full items-center justify-between">
            <span className="text-xs text-[#64748B]">
              Total sections:{" "}
              <strong className="text-[#0E4A68]">
                {sections?.length ?? 0}
              </strong>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-2 text-sm font-semibold text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
            >
              Done
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          {/* Action Row */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                <Image
                  src={LANG_FLAGS.en}
                  alt="English"
                  fill
                  className="object-cover"
                  sizes="16px"
                />
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                Sections list (English view)
              </span>
            </div>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#D48C28] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#B9741A] active:scale-95 cursor-pointer"
            >
              <FiPlus className="h-4 w-4" />
              <span>Add Section</span>
            </button>
          </div>

          {/* Sections List */}
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2"
                >
                  <div className="h-4 w-1/3 rounded bg-[#E2E8F0]" />
                  <div className="h-3 w-2/3 rounded bg-[#E2E8F0]" />
                </div>
              ))}
            </div>
          ) : !sections || sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#94A3B8]">
                <FiInbox className="h-6 w-6" />
              </div>
              <p className="font-semibold text-[#334155]">No sections yet</p>
              <p className="mt-1 max-w-xs text-xs text-[#94A3B8]">
                Divide this blog into chapters or key topics with highlight
                power points.
              </p>
              <button
                type="button"
                onClick={handleOpenCreate}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-[#0E4A68] bg-white px-4 py-2 text-xs font-semibold text-[#0E4A68] transition-colors hover:bg-[#0E4A6814] cursor-pointer"
              >
                <FiPlus className="h-4 w-4" />
                <span>Create first section</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((sec, index) => {
                const pointsCount = Math.max(
                  sec.keys?.length ?? 0,
                  sec.values?.length ?? 0
                );

                return (
                  <div
                    key={sec.id}
                    className="group rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xs transition-all hover:border-[#CBD5E1] hover:shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0E4A6814] text-xs font-bold text-[#0E4A68]">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-[#083952]">
                            {sec.title || "Untitled Section"}
                          </h4>
                          {sec.shortDescription && (
                            <p className="text-xs text-[#64748B] line-clamp-1">
                              {sec.shortDescription}
                            </p>
                          )}
                          {sec.description && (
                            <p className="text-xs text-[#94A3B8] line-clamp-2">
                              {sec.description}
                            </p>
                          )}
                          {sec.keys && sec.keys.length > 0 && (
                            <div className="mt-2 space-y-1 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
                              {sec.keys.map((k, i) => (
                                <div key={i} className="flex items-baseline gap-2 text-xs">
                                  <span className="font-semibold text-[#083952] shrink-0">{k}:</span>
                                  <span className="text-[#64748B]">{sec.values?.[i] || "—"}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(sec)}
                          aria-label="Edit section"
                          title="Edit section"
                          className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#0E4A681A] hover:text-[#0E4A68] cursor-pointer"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(sec)}
                          aria-label="Delete section"
                          title="Delete section"
                          className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626] cursor-pointer"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SlidePanel>

      {/* Child Section Form Panel */}
      {editingSection !== undefined && (
        <BlogSectionFormPanel
          open={editingSection !== undefined}
          onClose={handleCloseEditor}
          blogId={blogId}
          section={editingSection}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={
            createSectionMutation.isPending || updateSectionMutation.isPending
          }
        />
      )}

      {/* Section Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this section?"
        description={
          deleteTarget?.title ? (
            <>
              “<span className="font-semibold">{deleteTarget.title}</span>” and
              its power points will be permanently removed.
            </>
          ) : (
            "This section and its power points will be permanently removed."
          )
        }
        isLoading={deleteSectionMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default BlogSectionManagerPanel;
