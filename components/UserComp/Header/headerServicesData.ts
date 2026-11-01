import { getDictionary } from "@/shared/utils/getDictionary";

export interface MegaMenuItem {
  title: string;
  href: string;
}

export interface MegaMenuCategory {
  id: string;
  title: string;
  iconSrc: string;
  iconAlt: string;
  items: MegaMenuItem[];
}

export function getHeaderServicesData(locale = "en"): MegaMenuCategory[] {
  const dict = getDictionary(locale);
  const hs = dict.headerServices;

  return [
    {
      id: "all-services",
      title: hs.allServices,
      iconSrc: "/header/list.svg",
      iconAlt: hs.allServices,
      items: [
        { title: hs.touristServices, href: `/${locale}/services/tourist` },
        { title: hs.realEstate, href: `/${locale}/services/real-estate` },
        { title: hs.carRental, href: `/${locale}/services/car-rental` },
        { title: hs.vipAirport, href: `/${locale}/services/vip-airport` },
      ],
    },
    {
      id: "excursions",
      title: hs.excursions,
      iconSrc: "/header/map.svg",
      iconAlt: hs.excursions,
      items: [
        { title: hs.groupExcursions, href: `/${locale}/group-excursions` },
        { title: hs.privateExcursions, href: `/${locale}/private-excursions` },
      ],
    },
    {
      id: "transportation",
      title: hs.transportation,
      iconSrc: "/header/bus.svg",
      iconAlt: hs.transportation,
      items: [
        { title: hs.transferServices, href: `/${locale}/services/transfer` },
      ],
    },
  ];
}

export default getHeaderServicesData;
