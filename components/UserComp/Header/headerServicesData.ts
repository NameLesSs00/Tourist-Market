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
  return [
    {
      id: "all-services",
      title: "All Services",
      iconSrc: "/header/list.svg",
      iconAlt: "All Services",
      items: [
        { title: "Tourist Services", href: `/${locale}/services/tourist` },
        { title: "RED SEA REAL ESTATE", href: `/${locale}/services/real-estate` },
        { title: "CAR RENTAL SERVICE", href: `/${locale}/services/car-rental` },
        { title: "VIP Services-Hurghada Airport", href: `/${locale}/services/vip-airport` },
      ],
    },
    {
      id: "excursions",
      title: "Excursions",
      iconSrc: "/header/map.svg",
      iconAlt: "Excursions",
      items: [
        { title: "Group Excursions", href: `/${locale}/group-excursions` },
        { title: "Private Excursions", href: `/${locale}/private-excursions` },
      ],
    },
    {
      id: "transportation",
      title: "Transportation",
      iconSrc: "/header/bus.svg",
      iconAlt: "Transportation",
      items: [
        { title: "Transfer Services", href: `/${locale}/services/transfer` },
      ],
    },
  ];
}
