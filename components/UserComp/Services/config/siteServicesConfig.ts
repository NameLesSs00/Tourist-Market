/**
 * Centralized developer configuration for Site Services.
 *
 * Maps public service categories directly to their backend UUIDs.
 * Update or replace IDs here when services change in the database.
 * Note: Transfer Service is handled separately under Transportation.
 */

export interface SiteServiceConfigItem {
  id: string;
  name: string;
  slug: string;
  routePath: string;
}

export const SITE_SERVICES_CONFIG = {
  realEstate: {
    id: "ab273263-625a-4a30-b7a7-1514a37f63ab",
    name: "Red Sea Real Estate",
    slug: "real-estate",
    routePath: "services/real-estate",
  },
  carRental: {
    id: "f28eafbc-fe21-4d0f-92c8-66965c761e4e",
    name: "Car Rental",
    slug: "car-rental",
    routePath: "services/car-rental",
  },
  touristServices: {
    id: "17e7c22e-e19e-431d-9b24-1b6f75cd01f9",
    name: "Tourist Services",
    slug: "tourist",
    routePath: "services/tourist",
  },
  vipAirport: {
    id: "a275d037-ad85-4a4f-9c75-14c0249b4783",
    name: "VIP Services - Hurghada Airport",
    slug: "vip-airport",
    routePath: "services/vip-airport",
  },
} as const;

export type SiteServiceKey = keyof typeof SITE_SERVICES_CONFIG;
