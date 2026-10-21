"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FiEdit3, FiPlusCircle } from "react-icons/fi";
import { toast } from "sonner";
import {
  ConfirmDialog,
  DataTable,
  EntityFormPanel,
  PageHeader,
  SearchInput,
  emptyLocalized,
  type DataTableColumn,
  type FieldDef,
  type FormValues,
} from "@/components/adminComp/Shared";
import {
  useAdminFaqsQuery,
  useCreateFaq,
  useDeleteFaq,
  useFaqAllLanguagesQuery,
  useUpdateFaq,
} from "@/features/faq/useFaqAdmin";
import { extractErrorMessage } from "@/features/auth/useAuth";
import { LANG_FLAGS, type AdminFaq, type FaqUpsertRequest, type LocalizedText } from "@/models/faq";

const PAGE_SIZE = 10;

const FAQ_FIELDS: FieldDef[] = [
  { name: "question", label: "Question", type: "localized", required: true, placeholder: "Type the question..." },
  { name: "answer", label: "Answer", type: "localized", multiline: true, required: true, placeholder: "Type the answer..." },
  { name: "displayOrder", label: "Display Order", type: "number", required: true, min: 0 },
];

/** Table shows English only; the `id` is never rendered. */
const FAQ_COLUMNS: DataTableColumn<AdminFaq>[] = [
  {
    key: "question",
    header: (
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
          <Image src={LANG_FLAGS.en} alt="English" fill className="object-cover" sizes="16px" />
        </span>
        <span>Question</span>
      </span>
    ),
    className: "w-[38%]",
    render: (row) => <p className="line-clamp-2 font-semibold text-[#083952]">{row.question}</p>,
  },
  {
    key: "answer",
    header: (
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-3 w-4 shrink-0 overflow-hidden rounded-xs border border-[#CBD5E1]">
          <Image src={LANG_FLAGS.en} alt="English" fill className="object-cover" sizes="16px" />
        </span>
        <span>Answer</span>
      </span>
    ),
    render: (row) => <p className="line-clamp-2 text-[#64748B]">{row.answer}</p>,
  },
  {
    key: "displayOrder",
    header: "Order",
    headerClassName: "w-24 text-center",
    className: "text-center",
    render: (row) => (
      <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-[#D48C281A] px-2 py-1 text-xs font-semibold text-[#B9741A]">
        {row.displayOrder}
      </span>
    ),
  },
];

type PanelState = { mode: "create"; key: number } | { mode: "edit"; faq: AdminFaq } | null;

function toUpsert(values: FormValues): FaqUpsertRequest {
  return {
    question: values.question as LocalizedText,
    answer: values.answer as LocalizedText,
    displayOrder: Number(values.displayOrder) || 0,
  };
}

export function FaqManagerComp() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState<PanelState>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminFaq | null>(null);

  const listQuery = useAdminFaqsQuery({ search, pageNumber: page, pageSize: PAGE_SIZE });
  const editId = panel?.mode === "edit" ? panel.faq.id : null;
  const detailQuery = useFaqAllLanguagesQuery(editId);

  const createMutation = useCreateFaq();
  const updateMutation = useUpdateFaq();
  const deleteMutation = useDeleteFaq();

  const pageData = listQuery.data;
  const rows = pageData?.items ?? [];

  // Surface list / detail load failures.
  useEffect(() => {
    if (listQuery.isError) toast.error(extractErrorMessage(listQuery.error));
  }, [listQuery.isError, listQuery.error]);

  useEffect(() => {
    if (detailQuery.isError) {
      toast.error(extractErrorMessage(detailQuery.error));
      setPanel(null);
    }
  }, [detailQuery.isError, detailQuery.error]);

  // If a delete empties the current page, step back one page.
  useEffect(() => {
    if (pageData && pageData.items.length === 0 && page > 1) setPage((p) => p - 1);
  }, [pageData, page]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const closePanel = useCallback(() => setPanel(null), []);

  const initialValues: FormValues = useMemo(() => {
    if (panel?.mode === "edit" && detailQuery.data) {
      return {
        question: detailQuery.data.question,
        answer: detailQuery.data.answer,
        displayOrder: detailQuery.data.displayOrder,
      };
    }
    return {
      question: emptyLocalized(),
      answer: emptyLocalized(),
      displayOrder: (pageData?.totalCount ?? 0) + 1,
    };
  }, [panel, detailQuery.data, pageData?.totalCount]);

  const formKey =
    panel?.mode === "edit"
      ? `edit-${detailQuery.dataUpdatedAt}`
      : `create-${panel?.mode === "create" ? panel.key : 0}`;

  const handleSubmit = (values: FormValues) => {
    const body = toUpsert(values);
    if (panel?.mode === "edit") {
      updateMutation.mutate({ id: panel.faq.id, body }, { onSuccess: closePanel });
    } else {
      createMutation.mutate(body, { onSuccess: closePanel });
    }
  };

  const isEdit = panel?.mode === "edit";

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="FAQs"
        description="Manage the frequently asked questions shown on the website."
        actionLabel="Add FAQ"
        onAction={() => setPanel({ mode: "create", key: Date.now() })}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search questions..." />
        {pageData && (
          <p className="flex items-center gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#334155]">{pageData.totalCount}</span> total
            <span className="text-[#CBD5E1]">·</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-2.5 py-0.5 text-xs font-medium text-[#0E4A68] shadow-2xs">
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
          </p>
        )}
      </div>

      <DataTable
        columns={FAQ_COLUMNS}
        rows={rows}
        getRowKey={(row) => row.id}
        isLoading={listQuery.isLoading}
        isFetching={listQuery.isFetching}
        emptyTitle={search ? "No FAQs match your search" : "No FAQs yet"}
        emptyDescription={search ? "Try a different keyword." : "Click “Add FAQ” to create the first one."}
        onEdit={(row) => setPanel({ mode: "edit", faq: row })}
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

      <EntityFormPanel
        open={panel !== null}
        onClose={closePanel}
        title={isEdit ? "Edit FAQ" : "Add FAQ"}
        subtitle={
          isEdit
            ? "Update the question and answer in all four languages."
            : "English is required. Other languages are optional."
        }
        icon={isEdit ? <FiEdit3 className="h-5 w-5" /> : <FiPlusCircle className="h-5 w-5" />}
        fields={FAQ_FIELDS}
        initialValues={initialValues}
        formKey={formKey}
        localizedRequirement={isEdit ? "all" : "english"}
        optionalLanguageHint="Leave blank to reuse the English text."
        isLoading={isEdit && detailQuery.isLoading}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        submitLabel={isEdit ? "Save Changes" : "Create FAQ"}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete this FAQ?"
        description={
          <>
            <span className="font-medium text-[#334155]">“{deleteTarget?.question}”</span> will be
            removed in all languages. This can’t be undone.
          </>
        }
        isLoading={deleteMutation.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() =>
          deleteTarget &&
          deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) })
        }
      />
    </div>
  );
}

export default FaqManagerComp;
