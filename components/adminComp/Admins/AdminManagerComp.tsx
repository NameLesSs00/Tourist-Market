"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FiEdit2,
  FiFilter,
  FiMail,
  FiPlus,
  FiShield,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { toast } from "sonner";
import {
  ConfirmDialog,
  DataTable,
  PageHeader,
  SearchInput,
  type DataTableColumn,
} from "@/components/adminComp/Shared";
import { AdminFormPanel } from "./AdminFormPanel";
import {
  useAdminUsersQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} from "@/features/admin/useAdminUsers";
import { useAuthStore } from "@/features/auth/authStore";
import { useMeQuery } from "@/features/auth/useAuth";
import {
  isSuperAdmin,
  type AdminCreateRequest,
  type AdminRole,
  type AdminUpdateRequest,
  type AdminUserItem,
} from "@/models/admin";

const PAGE_SIZE = 10;

export function AdminManagerComp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const storedUser = useAuthStore((s) => s.user);
  const { data: profile, isLoading: isProfileLoading } = useMeQuery();
  const currentUser = profile || storedUser;
  const isSuper = isSuperAdmin(currentUser);

  // Filter states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // "" | "active" | "inactive"

  // Active status boolean conversion
  const isActiveParam =
    selectedStatus === "active"
      ? true
      : selectedStatus === "inactive"
      ? false
      : undefined;

  // Query (SuperAdmin only, enabled after client mount)
  const listQuery = useAdminUsersQuery(
    {
      search: search || undefined,
      role: selectedRole || undefined,
      isActive: isActiveParam,
      pageNumber: page,
      pageSize: PAGE_SIZE,
    },
    { enabled: mounted && isSuper }
  );

  const pageData = listQuery.data;
  const rows = pageData?.items ?? [];

  // Mutations
  const createMutation = useCreateAdminMutation();
  const updateMutation = useUpdateAdminMutation();
  const deleteMutation = useDeleteAdminMutation();

  // Slide panel states
  // undefined: closed; null: create; object: edit
  const [formTarget, setFormTarget] = useState<
    AdminUserItem | null | undefined
  >(undefined);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<AdminUserItem | null>(null);

  // If a delete or filter change leaves the current page empty, step back
  useEffect(() => {
    if (pageData && pageData.items.length === 0 && page > 1) {
      setPage((p) => p - 1);
    }
  }, [pageData, page]);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handleCreateSubmit = (body: AdminCreateRequest) => {
    createMutation.mutate(body, {
      onSuccess: () => setFormTarget(undefined),
    });
  };

  const handleUpdateSubmit = ({
    id,
    body,
  }: {
    id: string;
    body: AdminUpdateRequest;
  }) => {
    updateMutation.mutate(
      { id, body },
      {
        onSuccess: () => setFormTarget(undefined),
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;

    if (currentUser?.id === deleteTarget.id) {
      toast.error("You cannot delete your own account while logged in.");
      setDeleteTarget(null);
      return;
    }

    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  // Full-width columns
  const columns: DataTableColumn<AdminUserItem>[] = [
    {
      key: "user",
      header: "Administrator",
      className: "w-[28%]",
      render: (row) => {
        const fullName =
          `${row.firstName || ""} ${row.lastName || ""}`.trim() || row.userName;
        const initial = (row.firstName || row.userName || "A")
          .charAt(0)
          .toUpperCase();
        const isSelf = currentUser?.id === row.id;

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0E4A6814] text-sm font-bold text-[#0E4A68]">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#083952] truncate">
                  {fullName}
                </span>
                {isSelf && (
                  <span className="rounded-md bg-[#D48C281A] px-1.5 py-0.5 text-[10px] font-semibold text-[#B9741A]">
                    You
                  </span>
                )}
              </div>
              <p className="text-xs text-[#64748B] truncate">@{row.userName}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "email",
      header: "Email",
      className: "w-[24%]",
      render: (row) => (
        <span className="text-xs text-[#475569]">{row.email || "—"}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      className: "w-[16%]",
      render: (row) => {
        const isSuper = row.roles?.includes("SuperAdmin");
        return (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
              isSuper
                ? "bg-[#0E4A68] text-white shadow-2xs"
                : "border border-[#CBD5E1] bg-[#F8FAFC] text-[#334155]"
            }`}
          >
            <FiShield className="h-3 w-3" />
            <span>{isSuper ? "SuperAdmin" : "Admin"}</span>
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      className: "w-[14%]",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            row.isActive
              ? "border border-[#0E4A6826] bg-[#0E4A680F] text-[#0E4A68]"
              : "border border-[#CBD5E1] bg-[#F1F5F9] text-[#64748B]"
          }`}
        >
          {row.isActive ? "Active" : "Suspended"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created Date",
      className: "w-[18%]",
      render: (row) => {
        if (!row.createdAt) return <span className="text-xs text-[#94A3B8]">—</span>;
        const formatted = new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return <span className="text-xs text-[#64748B]">{formatted}</span>;
      },
    },
  ];

  // SSR & Hydration guard: render matching container until mounted on client
  if (!mounted) {
    return (
      <div className="w-full space-y-6">
        <PageHeader
          title="Administrators"
          description="Manage system administrators, grant SuperAdmin roles, and monitor account access."
          actionLabel="Add Administrator"
          onAction={() => {}}
        />
        <div className="h-10 w-full max-w-sm rounded-xl bg-slate-200/60 animate-pulse" />
        <div className="h-96 w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs animate-pulse">
          <div className="space-y-4">
            <div className="h-9 w-full rounded-lg bg-slate-100" />
            <div className="h-9 w-full rounded-lg bg-slate-100" />
            <div className="h-9 w-full rounded-lg bg-slate-100" />
            <div className="h-9 w-full rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  // Non-SuperAdmin protection guard (evaluated on client once mounted)
  if (!isProfileLoading && !isSuper) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-[#E2E8F0] bg-white p-12 text-center shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#DC2626]">
          <FiShield className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-[#083952]">
          Access Restricted
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#64748B]">
          Only SuperAdmin accounts are authorized to view and manage administrators. As a standard Administrator, you can edit and manage FAQs, blogs, and other platform content.
        </p>
        <Link
          href="/admin/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#093247] transition-all cursor-pointer"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Administrators"
        description="Manage system administrators, grant SuperAdmin roles, and monitor account access."
        actionLabel="Add Administrator"
        onAction={() => setFormTarget(null)}
      />

      {/* Toolbar & Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search administrators by name, username, or email..."
        />

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0E4A68] shadow-2xs hover:border-[#CBD5E1] focus:border-[#0E4A68] focus:outline-none cursor-pointer"
          >
            <option value="">All Roles</option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold text-[#0E4A68] shadow-2xs hover:border-[#CBD5E1] focus:border-[#0E4A68] focus:outline-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Suspended Only</option>
          </select>

          {/* Count Badge */}
          {pageData && (
            <span className="text-xs text-[#64748B]">
              <strong className="text-[#334155]">{pageData.totalCount}</strong>{" "}
              total
            </span>
          )}
        </div>
      </div>

      {/* Full-Width Data Table */}
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={
          search || selectedRole || selectedStatus
            ? "No administrators match the filters"
            : "No administrators found"
        }
        emptyDescription={
          search || selectedRole || selectedStatus
            ? "Try resetting the search keyword or filter options."
            : "Click “Add Administrator” to invite a new admin."
        }
        onEdit={(row) => setFormTarget(row)}
        onDelete={(row) => {
          if (currentUser?.id === row.id) {
            toast.error("You cannot delete your own account while logged in.");
            return;
          }
          setDeleteTarget(row);
        }}
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

      {/* Create / Edit Admin Slide Panel */}
      {formTarget !== undefined && (
        <AdminFormPanel
          open={formTarget !== undefined}
          onClose={() => setFormTarget(undefined)}
          admin={formTarget}
          onSubmitCreate={handleCreateSubmit}
          onSubmitUpdate={handleUpdateSubmit}
          isSubmitting={
            createMutation.isPending || updateMutation.isPending
          }
        />
      )}

      {/* Delete Admin Confirmation Dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this administrator?"
        description={
          deleteTarget ? (
            <>
              “<span className="font-semibold">@{deleteTarget.userName}</span>”
              ({deleteTarget.email}) will be permanently removed from the system
              and will lose all portal access.
            </>
          ) : (
            "This administrator will be permanently deleted."
          )
        }
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default AdminManagerComp;
