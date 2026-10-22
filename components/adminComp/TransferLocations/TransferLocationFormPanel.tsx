"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type {
  TransferLocationItem,
  TransferLocationType,
  TransferLocationUpsertRequest,
} from "@/models/transferLocation";
import {
  useTransferFromLocationAllLanguagesQuery,
  useTransferToLocationAllLanguagesQuery,
} from "@/features/transferLocations/useTransferLocationAdmin";
import { TransferLocationLocalizedFields } from "./components";

interface TransferLocationFormPanelProps {
  open: boolean;
  locationType: TransferLocationType;
  location?: TransferLocationItem;
  onClose: () => void;
  onSubmitCreate: (body: TransferLocationUpsertRequest) => void;
  onSubmitUpdate: (id: string, body: TransferLocationUpsertRequest) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function TransferLocationFormPanel({
  open,
  locationType,
  location,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: TransferLocationFormPanelProps) {
  const isEdit = Boolean(location);

  const fromDetailQuery = useTransferFromLocationAllLanguagesQuery(
    isEdit && locationType === "from" ? location?.id : null
  );
  const toDetailQuery = useTransferToLocationAllLanguagesQuery(
    isEdit && locationType === "to" ? location?.id : null
  );

  const activeDetail =
    locationType === "from" ? fromDetailQuery.data : toDetailQuery.data;

  const [name, setName] = useState<LocalizedText>(emptyLocalized());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && location) {
      if (activeDetail) {
        setName(activeDetail.name || emptyLocalized());
      } else {
        setName({ en: location.name || "", ru: "", de: "", fr: "" });
      }
      setErrors({});
    } else if (!isEdit) {
      setName(emptyLocalized());
      setErrors({});
    }
  }, [location, isEdit, activeDetail, open]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.en?.trim()) {
      errs["name.en"] = "English location name is required.";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Please fill in the required English location name.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body: TransferLocationUpsertRequest = { name };

    if (isEdit && location) {
      onSubmitUpdate(location.id, body);
    } else {
      onSubmitCreate(body);
    }
  };

  const typeLabel =
    locationType === "from" ? "Pickup Location" : "Destination Location";

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? `Edit ${typeLabel}` : `Add ${typeLabel}`}
      subtitle={
        locationType === "from"
          ? "Configure departure and origin pickup points for transfer routes."
          : "Configure drop-off and arrival destinations for transfer routes."
      }
      widthClassName="max-w-xl"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="transfer-location-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#0A344A] disabled:opacity-60 cursor-pointer transition-colors"
          >
            {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
            <span>{isEdit ? "Save Changes" : `Create ${typeLabel}`}</span>
          </button>
        </div>
      }
    >
      <form
        id="transfer-location-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <TransferLocationLocalizedFields
          name={name}
          errors={errors}
          onNameChange={(lang: LangCode, val: string) => {
            setName((prev) => ({ ...prev, [lang]: val }));
            if (errors[`name.${lang}`]) {
              setErrors((prev) => ({ ...prev, [`name.${lang}`]: "" }));
            }
          }}
        />
      </form>
    </SlidePanel>
  );
}
