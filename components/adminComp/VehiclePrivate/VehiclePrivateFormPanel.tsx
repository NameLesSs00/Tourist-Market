"use client";

import React, { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { SlidePanel } from "@/components/adminComp/Shared";
import { type LangCode, type LocalizedText } from "@/models/localization";
import type {
  VehiclePrivateItem,
  VehiclePrivateUpsertRequest,
} from "@/models/vehiclePrivate";
import { useVehiclePrivateAllLanguagesQuery } from "@/features/vehiclePrivate/useVehiclePrivateAdmin";
import { VehiclePrivateLocalizedFields } from "./components";

interface VehiclePrivateFormPanelProps {
  open: boolean;
  vehicle?: VehiclePrivateItem;
  onClose: () => void;
  onSubmitCreate: (body: VehiclePrivateUpsertRequest) => void;
  onSubmitUpdate: (id: string, body: VehiclePrivateUpsertRequest) => void;
  isSubmitting: boolean;
}

const emptyLocalized = (): LocalizedText => ({
  en: "",
  ru: "",
  de: "",
  fr: "",
});

export function VehiclePrivateFormPanel({
  open,
  vehicle,
  onClose,
  onSubmitCreate,
  onSubmitUpdate,
  isSubmitting,
}: VehiclePrivateFormPanelProps) {
  const isEdit = Boolean(vehicle);
  const [name, setName] = useState<LocalizedText>(emptyLocalized);
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const detailQuery = useVehiclePrivateAllLanguagesQuery(
    isEdit && open ? vehicle?.id : null
  );

  useEffect(() => {
    if (isEdit && detailQuery.data) {
      setName(detailQuery.data.name);
      setIsActive(detailQuery.data.isActive);
    } else if (!isEdit) {
      setName(emptyLocalized());
      setIsActive(true);
    }
    setErrors({});
  }, [isEdit, detailQuery.data, open]);

  const handleNameChange = (lang: LangCode, value: string) => {
    setName((prev) => ({ ...prev, [lang]: value }));
    if (errors[`name.${lang}`]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[`name.${lang}`];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.en?.trim()) {
      errs["name.en"] = "Vehicle name in English is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload: VehiclePrivateUpsertRequest = {
      name,
      isActive,
    };

    if (isEdit && vehicle) {
      onSubmitUpdate(vehicle.id, payload);
    } else {
      onSubmitCreate(payload);
    }
  };

  const isLoadingDetails = isEdit && detailQuery.isLoading;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Vehicle Private" : "Add Vehicle Private"}
      subtitle={
        isEdit
          ? "Update localized details and status for this private vehicle."
          : "Register a new vehicle available for private services."
      }
    >
      {isLoadingDetails ? (
        <div className="flex flex-col items-center justify-center gap-3 p-12 text-[#64748B]">
          <FiLoader className="h-6 w-6 animate-spin text-[#0E4A68]" />
          <p className="text-xs">Loading vehicle translations...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
          <VehiclePrivateLocalizedFields
            name={name}
            errors={errors}
            onNameChange={handleNameChange}
          />

          {/* Active Status Switch */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
            <div>
              <p className="text-xs font-semibold text-slate-800">Active Vehicle</p>
              <p className="text-[11px] text-slate-500">
                When inactive, this vehicle is not available for bookings.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                isActive ? "bg-[#0E4A68]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#0E4A68] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#083952] cursor-pointer disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                ? "Update Vehicle"
                : "Create Vehicle"}
            </button>
          </div>
        </form>
      )}
    </SlidePanel>
  );
}
