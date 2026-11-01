import { ComponentType } from "react";
import { FaBus, FaCar, FaVanShuttle } from "react-icons/fa6";

interface IconProps {
  className?: string;
}

export function getVehicleTypeIcon(
  name?: string,
  toPerson?: number
): ComponentType<IconProps> {
  const lower = (name || "").toLowerCase();

  if (lower.includes("bus") || lower.includes("coach")) {
    return FaBus;
  }
  if (
    lower.includes("van") ||
    lower.includes("microbus") ||
    lower.includes("minibus") ||
    lower.includes("shuttle")
  ) {
    return FaVanShuttle;
  }
  if (
    lower.includes("car") ||
    lower.includes("sedan") ||
    lower.includes("limo") ||
    lower.includes("suv")
  ) {
    return FaCar;
  }

  if (typeof toPerson === "number") {
    if (toPerson > 9) return FaBus;
    if (toPerson > 4) return FaVanShuttle;
  }

  return FaCar;
}

