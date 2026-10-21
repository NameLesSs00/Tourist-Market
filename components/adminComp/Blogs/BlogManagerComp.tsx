"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  FiBookOpen,
  FiEdit2,
  FiImage,
  FiLayers,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { toast } from "sonner";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { BlogFormPanel } from "./BlogFormPanel";
import { BlogSectionManagerPanel } from "./BlogSectionManagerPanel";
import {
  useAdminBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "@/features/blogs/useBlogAdmin";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANG_FLAGS } from "@/models/faq";
import { getBackendImageUrl } from "@/shared/utils/imageUrl";
import type { BlogItem, BlogUpsertRequest } from "@/models/blog";

const PAGE_SIZE = 10;

export function BlogManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Slide panel states
  const [blogFormTarget, setBlogFormTarget] =
    useState<BlogItem | null | undefined>(undefined);
  // undefined: closed; null: creating; object: editing

  const [sectionsTargetBlog, setSectionsTargetBlog] = useState<BlogItem | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<BlogItem | null>(null);

  // Queries & Mutations
  const listQuery = useAdminBlogsQuery({
    pageNumber: page,
    pageSize: PAGE_SIZE,
    search,
  });

  const createBlogMutation = useCreateBlogMutation();
  const updateBlogMutation = useUpdateBlogMutation();
  const deleteBlogMutation = useDeleteBlogMutation();

  const pageData = listQuery.data;
  const rows = pageData?.items ?? [];

  useEffect(() => {
    if (listQuery.isError) {
      toast.error(extractErrorMessage(listQuery.error));
    }
  }, [listQuery.isError, listQuery.error]);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleCreateSubmit = (data: {
    body: BlogUpsertRequest;
    imageFile?: File | null;
  }) => {
    createBlogMutation.mutate(data, {
      onSuccess: () => setBlogFormTarget(undefined),
    });
  };

  const handleUpdateSubmit = (data: {
    id: string;
    body: BlogUpsertRequest;
    imageFile?: File | null;
    removeImage?: boolean;
  }) => {
    updateBlogMutation.mutate(data, {
      onSuccess: () => setBlogFormTarget(undefined),
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteBlogMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Full-width columns configuration
  const columns: DataTableColumn<BlogItem>[] = [
    {
      key: "image",
      header: "Cover",
      className: "w-20",
      render: (row) => {
        const coverUrl = getBackendImageUrl(row.imageUrl);
        return coverUrl ? (
          <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-[#E2E8F0] bg-slate-100 shadow-2xs">
            <Image
              src={coverUrl}
              alt={row.title || "Blog cover"}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[#94A3B8]">
            <FiImage className="h-5 w-5" />
          </div>
        );
      },
    },
    {
      key: "title",
      header: (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
            <Image
              src={LANG_FLAGS.en}
              alt="English"
              fill
              className="object-cover"
              sizes="16px"
            />
          </span>
          <span>Blog Title</span>
        </span>
      ),
      className: "w-[30%]",
      render: (row) => (
        <div className="space-y-1">
          <p className="font-semibold text-[#083952] line-clamp-2">
            {row.title || "Untitled Blog"}
          </p>
        </div>
      ),
    },
    {
      key: "description",
      header: (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
            <Image
              src={LANG_FLAGS.en}
              alt="English"
              fill
              className="object-cover"
              sizes="16px"
            />
          </span>
          <span>Description</span>
        </span>
      ),
      className: "w-[40%]",
      render: (row) => (
        <p className="text-xs text-[#64748B] line-clamp-2">
          {row.description || "—"}
        </p>
      ),
    },
    {
      key: "sections",
      header: "Sections",
      headerClassName: "w-32 text-center",
      className: "text-center",
      render: (row) => {
        const count = row.sections?.length ?? 0;
        return (
          <button
            type="button"
            onClick={() => setSectionsTargetBlog(row)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0E4A6826] bg-[#0E4A680A] px-2.5 py-1 text-xs font-semibold text-[#0E4A68] hover:bg-[#0E4A681A] transition-colors cursor-pointer"
            title="Click to view & manage sections"
          >
            <FiLayers className="h-3.5 w-3.5 text-[#0E4A68]" />
            <span>
              {count} {count === 1 ? "section" : "sections"}
            </span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Blogs & Articles"
        description="Publish engaging travel stories, guides, and cultural articles."
        actionLabel="Add Blog"
        onAction={() => setBlogFormTarget(null)}
      />

      {/* Toolbar & Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search blogs by title or description..."
        />

        {pageData && (
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#334155]">
              {pageData.totalCount}
            </span>{" "}
            total
            <span className="text-[#CBD5E1]">·</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-2.5 py-0.5 text-xs font-medium text-[#0E4A68] shadow-2xs">
              <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
                <Image
                  src={LANG_FLAGS.en}
                  alt="English"
                  fill
                  className="object-cover"
                  sizes="16px"
                />
              </span>
              Showing English
            </span>
          </div>
        )}
      </div>

      {/* Full-Width Data Table */}
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search ? "No blogs match your search" : "No blogs published yet"
        }
        emptyDescription={
          search
            ? "Try another keyword or clear the search."
            : "Click “Add Blog” to create your first article."
        }
        onEdit={(row) => setBlogFormTarget(row)}
        onDelete={(row) => setDeleteTarget(row)}
        pagination={
          pageData
            ? {
                pageNumber: pageData.pageNumber,
                pageSize: pageData.pageSize,
                totalPages: pageData.totalPages,
                totalCount: pageData.totalCount,
                hasPreviousPage: pageData.hasPreviousPage,
                hasNextPage: pageData.hasNextPage,
                onPageChange: setPage,
              }
            : undefined
        }
      />

      {/* Create / Edit Blog Slide Panel */}
      {blogFormTarget !== undefined && (
        <BlogFormPanel
          open={blogFormTarget !== undefined}
          onClose={() => setBlogFormTarget(undefined)}
          blog={blogFormTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={
            createBlogMutation.isPending || updateBlogMutation.isPending
          }
        />
      )}

      {/* Section Manager Slide Panel */}
      {sectionsTargetBlog && (
        <BlogSectionManagerPanel
          open={Boolean(sectionsTargetBlog)}
          onClose={() => setSectionsTargetBlog(null)}
          blog={sectionsTargetBlog}
        />
      )}

      {/* Delete Blog Confirmation Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this blog?"
        description={
          deleteTarget?.title ? (
            <>
              “<span className="font-semibold">{deleteTarget.title}</span>” and
              all its chapters and power points will be permanently deleted.
            </>
          ) : (
            "This blog and all its sections will be permanently deleted."
          )
        }
        isLoading={deleteBlogMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default BlogManagerComp;
