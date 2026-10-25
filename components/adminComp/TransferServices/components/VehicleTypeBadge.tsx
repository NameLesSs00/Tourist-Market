import React from "react";
import { FaBus, FaCar, FaShuttleVan } from "react-icons/fa";
import {
  VEHICLE_TYPE_CONFIGS,
  VehicleType,
} from "@/models/transferRoutePrice";

interface VehicleTypeBadgeProps {
  vehicleType: VehicleType | number;
  showHint?: boolean;
  className?: string;
}

function getVehicleIcon(type: VehicleType | number) {
  const num = Number(type);
  switch (num) {
    case VehicleType.Bus:
    case VehicleType.CoasterBus:
      return <FaBus className="h-3 w-3" />;
    case VehicleType.Microbus:
    case VehicleType.Minibus:
    case VehicleType.Minivan:
      return <FaShuttleVan className="h-3 w-3" />;
    case 0:
    case VehicleType.Car:
    case VehicleType.StandardSedan:
    case VehicleType.VipSedan:
    default:
      return <FaCar className="h-3 w-3" />;
  }
}

export function VehicleTypeBadge({
  vehicleType,
  showHint = false,
  className = "",
}: VehicleTypeBadgeProps) {
  const num = Number(vehicleType);
  const config =
    VEHICLE_TYPE_CONFIGS[num] ??
    VEHICLE_TYPE_CONFIGS[0] ??
    VEHICLE_TYPE_CONFIGS[VehicleType.Car];
  const label = config?.label || "Car";
  const range = config?.passengerRange;
  const badgeColor =
    config?.badgeColor || "bg-teal-50 text-teal-800 border-teal-200";

  return (
    <div className={`inline-flex flex-col items-start gap-0.5 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-2xs ${badgeColor}`}
      >
        {getVehicleIcon(num)}
        <span>{label}</span>
        {range && <span className="opacity-75 font-normal">({range})</span>}
      </span>
      {showHint && config?.capacityHint && (
        <span className="text-[11px] text-slate-500 pl-1">
          {config.capacityHint}
        </span>
      )}
    </div>
  );
}
