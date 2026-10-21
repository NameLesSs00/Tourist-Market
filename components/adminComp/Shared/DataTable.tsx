"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight, FiEdit2, FiInbox, FiTrash2 } from "react-icons/fi";

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  /** Custom cell renderer; defaults to `String(row[key])`. */
  render?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface DataTablePagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Used only as React key; never rendered. */
  getRowKey: (row: T) => string;
  isLoading?: boolean;
  isFetching?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  /** Show a 1-based row number column (based on pagination). */
  showRowNumber?: boolean;
  pagination?: DataTablePagination;
}

/** Generic admin table: loading skeleton, empty state, row actions, pagination. */
export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  isLoading = false,
  isFetching = false,
  emptyTitle = "No records yet",
  emptyDescription = "Create your first record to see it here.",
  onEdit,
  onDelete,
  showRowNumber = true,
  pagination,
}: DataTableProps<T>) {
  const hasActions = Boolean(onEdit || onDelete);
  const colCount = columns.length + (showRowNumber ? 1 : 0) + (hasActions ? 1 : 0);
  const offset = pagination ? (pagination.pageNumber - 1) * pagination.pageSize : 0;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-sm">
      {/* Top progress bar while refetching with previous data visible */}
      <div className="relative h-0.5 w-full overflow-hidden bg-transparent">
        {isFetching && !isLoading && (
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[tableProgress_1s_ease-in-out_infinite] bg-[#D48C28]" />
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              {showRowNumber && (
                <th className="w-14 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  #
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748B] ${
                    col.headerClassName ?? ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th className="w-28 px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="animate-pulse">
                  {Array.from({ length: colCount }).map((__, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 rounded bg-[#F1F5F9]" style={{ width: `${50 + ((i + j) % 4) * 12}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={colCount} className="px-5 py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F5F9] text-[#94A3B8]">
                      <FiInbox className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-[#334155]">{emptyTitle}</p>
                    <p className="mt-1 text-sm text-[#94A3B8]">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={getRowKey(row)} className="group transition-colors hover:bg-[#F8FAFC]">
                  {showRowNumber && (
                    <td className="px-5 py-4 align-top font-medium text-[#94A3B8]">{offset + index + 1}</td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-4 align-top text-[#334155] ${col.className ?? ""}`}>
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center justify-end gap-1.5">
                        {onEdit && (
                          <button
                            type="button"
                            onClick={() => onEdit(row)}
                            aria-label="Edit"
                            title="Edit"
                            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#0E4A681A] hover:text-[#0E4A68] cursor-pointer"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            onClick={() => onDelete(row)}
                            aria-label="Delete"
                            title="Delete"
                            className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626] cursor-pointer"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && !isLoading && pagination.totalCount > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#E2E8F0] px-5 py-3.5 sm:flex-row">
          <p className="text-xs text-[#64748B]">
            Showing <span className="font-semibold text-[#334155]">{offset + 1}</span>–
            <span className="font-semibold text-[#334155]">{offset + rows.length}</span> of{" "}
            <span className="font-semibold text-[#334155]">{pagination.totalCount}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage}
              onClick={() => pagination.onPageChange(pagination.pageNumber - 1)}
              className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <FiChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>
            <span className="px-2 text-xs font-medium text-[#475569]">
              {pagination.pageNumber} / {Math.max(1, pagination.totalPages)}
            </span>
            <button
              type="button"
              disabled={!pagination.hasNextPage}
              onClick={() => pagination.onPageChange(pagination.pageNumber + 1)}
              className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              Next <FiChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
