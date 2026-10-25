"use client";

import React, { useState } from "react";
import { FaBus, FaCar } from "react-icons/fa6";
import { FiCheckCircle, FiEdit2, FiPlus, FiTrash2, FiUsers, FiXCircle } from "react-icons/fi";
import { ConfirmDialog } from "@/components/adminComp/Shared";
import { SlidePanel } from "@/components/adminComp/Shared/SlidePanel";
import {
  useCreateVehicleTransferPrivateMutation,
  useDeleteVehicleTransferPrivateMutation,
  useUpdateVehicleTransferPrivateMutation,
  useVehicleTransferPrivatesQuery,
} from "@/features/vehicleTransferPrivate/useVehicleTransferPrivateAdmin";
import type { PrivateExcursionListItem } from "@/models/privateExcursion";
import type {
  VehicleTransferPrivateCreateRequest,
  VehicleTransferPrivateItem,
  VehicleTransferPrivateUpdateRequest,
} from "@/models/vehicleTransferPrivate";
import { VehiclePricingTierFormDrawer } from "./VehiclePricingTierFormDrawer";

interface PrivateExcursionVehiclePricingPanelProps {
  open: boolean;
  onClose: () => void;
  excursion: PrivateExcursionListItem | null;
}

export function PrivateExcursionVehiclePricingPanel({
  open,
  onClose,
  excursion,
}: PrivateExcursionVehiclePricingPanelProps) {
  const [tierFormTarget, setTierFormTarget] = useState<VehicleTransferPrivateItem | null | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<VehicleTransferPrivateItem | null>(null);

  const tiersQuery = useVehicleTransferPrivatesQuery(
    { privateExcursionId: excursion?.id },
    Boolean(open && excursion?.id)
  );

  const tiers = tiersQuery.data?.data?.items ?? [];

  const createMutation = useCreateVehicleTransferPrivateMutation();
  const updateMutation = useUpdateVehicleTransferPrivateMutation();
  const deleteMutation = useDeleteVehicleTransferPrivateMutation();

  const handleCreate = (body: VehicleTransferPrivateCreateRequest) => {
    createMutation.mutate(body, { onSuccess: () => setTierFormTarget(undefined) });
  };

  const handleUpdate = (id: string, body: VehicleTransferPrivateUpdateRequest) => {
    updateMutation.mutate({ id, body }, { onSuccess: () => setTierFormTarget(undefined) });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <>
      <SlidePanel
        open={open}
        onClose={onClose}
        title="Vehicle Transfer Rates"
        subtitle={`Configure passenger group pricing tiers for "${excursion?.title || "Private Excursion"}".`}
        widthClassName="max-w-2xl"
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-800">Configured Rate Tiers</p>
              <p className="text-[11px] text-slate-500">Each tier matches bookings based on group size.</p>
            </div>
            <button
              type="button"
              onClick={() => setTierFormTarget(null)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0E4A68] px-3.5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#083952] cursor-pointer"
            >
              <FiPlus className="h-3.5 w-3.5" />
              <span>Add Vehicle Rate</span>
            </button>
          </div>

          {tiersQuery.isLoading ? (
            <div className="flex h-32 items-center justify-center text-xs text-slate-400">Loading rates...</div>
          ) : tiers.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-8 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-2">
                <FaCar className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-slate-700">No vehicle rates configured</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Click &quot;Add Vehicle Rate&quot; to establish pricing for different party sizes.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex items-center justify-between p-3.5 hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0E4A680C] text-[#0E4A68]">
                      {tier.to > 9 ? <FaBus className="h-4 w-4" /> : <FaCar className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">{tier.vehicleName || "Private Vehicle"}</span>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                          tier.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}>
                          {tier.isActive ? (<><FiCheckCircle className="h-2.5 w-2.5 text-emerald-600" /> Active</>) : (<><FiXCircle className="h-2.5 w-2.5 text-slate-400" /> Inactive</>)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <FiUsers className="h-3 w-3 text-slate-400" />
                        <span>{tier.from} – {tier.to} Passengers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#0E4A68]">${Number(tier.priceUSD ?? tier.price ?? 0).toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">USD</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setTierFormTarget(tier)}
                        title="Edit Rate"
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#0E4A68] cursor-pointer"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(tier)}
                        title="Delete Rate"
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SlidePanel>

      {tierFormTarget !== undefined && excursion && (
        <VehiclePricingTierFormDrawer
          open={tierFormTarget !== undefined}
          onClose={() => setTierFormTarget(undefined)}
          tier={tierFormTarget ?? undefined}
          privateExcursionId={excursion.id}
          onSubmitCreate={handleCreate}
          onSubmitUpdate={handleUpdate}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Vehicle Rate"
        description={`Are you sure you want to delete rate for "${deleteTarget?.vehicleName || "Vehicle"}" (${deleteTarget?.from}–${deleteTarget?.to} passengers)? This action cannot be undone.`}
        confirmLabel="Delete Rate"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
