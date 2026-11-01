import type { SiteServiceSubItemUpsertRequest } from "../../models/siteServiceItem";

const REAL_ESTATE_SERVICE_ID = "ab273263-625a-4a30-b7a7-1514a37f63ab";

export const SEED_REAL_ESTATE_SERVICES: {
  payload: SiteServiceSubItemUpsertRequest;
  imagePaths: string[];
}[] = [
  {
    payload: {
      serviceId: REAL_ESTATE_SERVICE_ID,
      title: {
        en: "One7 Residence Hurghada Penthouse",
        de: "One7 Residence Hurghada Penthouse",
        ru: "Пентхаус в One7 Residence Хургада",
        fr: "Penthouse One7 Residence Hurghada",
      },
      subtitle: {
        en: "Luxury 2-Bedroom Rooftop Penthouse in Central El Kawther",
        de: "Luxus-Penthouse mit 2 Schlafzimmern im Zentrum von El Kawther",
        ru: "Роскошный 2-комнатный пентхаус на крыше в районе Эль Каусер",
        fr: "Penthouse de luxe 2 chambres sur le toit au centre d'El Kawther",
      },
      description: {
        en: "Modern luxury 2-bedroom penthouse in the prestigious One7 Residence. Features private rooftop terrace, community swimming pools, landscaped gardens, and 24/7 security.",
        de: "Modernes Luxus-Penthouse mit 2 Schlafzimmern in der renommierten One7 Residence mit privater Dachterrasse, Gemeinschaftspools und 24/7-Sicherheitsdienst.",
        ru: "Современный люксовый 2-комнатный пентхаус в престижном комплексе One7 Residence с собственной террасой на крыше, бассейнами и охраной 24/7.",
        fr: "Penthouse moderne de luxe avec 2 chambres dans la prestigieuse residence One7, comprenant terrasse privee sur le toit, piscines et securite 24h/24.",
      },
      textTopImage: {
        en: "Exclusive Penthouse for Rent",
        de: "Exklusives Penthouse zur Miete",
        ru: "Эксклюзивный пентхаус в аренду",
        fr: "Penthouse exclusif a louer",
      },
      note: {
        en: "1) Check-in from 14:00, Check-out by 11:00.\n2) A refundable security deposit of $300 is required upon check-in.\n3) Strict no-smoking policy inside the apartment (balcony permitted).",
        de: "1) Check-in ab 14:00 Uhr, Check-out bis 11:00 Uhr.\n2) Erstattbare Kaution von $300 beim Check-in erforderlich.\n3) Strenges Rauchverbot in der Wohnung (Balkon gestattet).",
        ru: "1) Заезд с 14:00, выезд до 11:00.\n2) Возвратный залог $300 при заселении.\n3) Курение строго запрещено внутри апартаментов (разрешено на балконе).",
        fr: "1) Arrivee a partir de 14h00, depart avant 11h00.\n2) Caution remboursable de $300 requise a l'arrivee.\n3) Logement strictement non-fumeur a l'interieur (balcon autorise).",
      },
      alert: {
        en: "Fiber-optic internet, community pool pass, and weekly cleaning service included.",
        de: "Glasfaser-Internet, Gemeinschaftspool-Zugang und woechentlicher Reinigungsservice inklusive.",
        ru: "Оптоволоконный интернет, пропуск в бассейн и еженедельная уборка включены.",
        fr: "Internet fibre optique, acces piscine et menage hebdomadaire inclus.",
      },
      basePriceUSD: 130,
      isActive: true,
      options: [
        {
          name: {
            en: "Rental Duration",
            de: "Mietdauer",
            ru: "Срок аренды",
            fr: "Duree de location",
          },
          values: [
            {
              key: { en: "Daily Rate (Min 2 Days)", de: "Tagespreis (ab 2 Tagen)", ru: "Посуточно (от 2 дней)", fr: "Tarif journalier (min 2 j)" },
              value: { en: "$130 per night", de: "$130 pro Nacht", ru: "$130 за ночь", fr: "$130 par nuit" },
            },
            {
              key: { en: "Weekly Rate (7+ Days)", de: "Wochenpreis (7+ Tage)", ru: "Неделя (от 7 дней)", fr: "Tarif hebdomadaire (7+ j)" },
              value: { en: "$110 per night (Save 15%)", de: "$110 pro Nacht (-15%)", ru: "$110 за ночь (скидка 15%)", fr: "$110 par nuit (-15%)" },
            },
            {
              key: { en: "Monthly Contract (30+ Days)", de: "Monatsvertrag (30+ Tage)", ru: "Месячный контракт (30+ дней)", fr: "Contrat mensuel (30+ j)" },
              value: { en: "$2,200 per month all inclusive", de: "$2.200 monatlich all-inclusive", ru: "$2200 в месяц все включено", fr: "$2200 par mois tout inclus" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Property Specifications",
            de: "Objektmerkmale",
            ru: "Характеристики объекта",
            fr: "Caracteristiques du bien",
          },
          values: [
            { name: { en: "Location: El Kawther, Hurghada", de: "Lage: El Kawther, Hurghada", ru: "Район: Эль Каусер, Хургада", fr: "Emplacement: El Kawther, Hurghada" } },
            { name: { en: "Layout: 2 King Bedrooms + 2 Bathrooms", de: "Aufteilung: 2 Schlafzimmer + 2 Baeder", ru: "Планировка: 2 спальни + 2 санузла", fr: "Disposition: 2 chambres + 2 salles de bain" } },
            { name: { en: "Capacity: Up to 4 Guests", de: "Kapazitaet: Bis zu 4 Personen", ru: "Вместимость: До 4 человек", fr: "Capacite: Jusqu'a 4 personnes" } },
            { name: { en: "Private Rooftop Solarium & BBQ Area", de: "Private Dachterrasse mit Grillbereich", ru: "Собственная терраса на крыше с зоной барбекю", fr: "Solarium prive sur le toit et coin barbecue" } },
            { name: { en: "Access to 3 Resort Pools & Gym", de: "Zugang zu 3 Pools und Fitnessstudio", ru: "Доступ к 3 бассейнам и тренажерному залу", fr: "Acces a 3 piscines et salle de sport" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/RealEstate/87871600177d8e1c7fa1f6efeb42de7a23897951.jpg",
      "public/Services/RealEstate/hero.png",
    ],
  },
  {
    payload: {
      serviceId: REAL_ESTATE_SERVICE_ID,
      title: {
        en: "Long Beach Resort Seafront Suite",
        de: "Long Beach Resort Seafront Suite",
        ru: "Seafront Suite в Long Beach Resort",
        fr: "Suite Front de Mer Long Beach Resort",
      },
      subtitle: {
        en: "Direct Beachfront Resort Residence with Panoramic Sea Views",
        de: "Direkt am Strand gelegene Resort-Residenz mit Meerblick",
        ru: "Апартаменты на первой линии пляжа с панорамным видом на Красное море",
        fr: "Residence de villegiature en bord de mer avec vue panoramique",
      },
      description: {
        en: "Exclusive seaside suite inside the Long Beach Resort complex with panoramic Red Sea views, private beach access, multi-pool lagoons, and resort amenities.",
        de: "Exklusive Strand-Suite im Long Beach Resort Komplex mit Panoramablick auf das Rote Meer, privatem Strandzugang und Resort-Ausstattung.",
        ru: "Эксклюзивные апартаменты в комплексе Long Beach Resort с панорамным видом на Красное море, собственным пляжем и бассейнами-лагунами.",
        fr: "Suite exclusive en front de mer dans le complexe Long Beach Resort avec vue panoramique sur la mer Rouge, plage privee et piscines lagons.",
      },
      textTopImage: {
        en: "Seafront Beach Residence",
        de: "Strandresidenz am Meer",
        ru: "Резиденция у моря",
        fr: "Residence front de mer",
      },
      note: {
        en: "1) Direct resort access card and beach towel card provided upon arrival.\n2) Minimum stay requirement: 2 nights.\n3) Housekeeping provided every 3 days.",
        de: "1) Resort-Ausweis und Badetuchkarten bei Ankunft.\n2) Mindestaufenthalt: 2 Naechte.\n3) Zimmerservice alle 3 Tage.",
        ru: "1) Карта доступа к курорту и пляжным полотенцам выдается при заезде.\n2) Минимальный срок бронирования: 2 ночи.\n3) Уборка каждые 3 дня.",
        fr: "1) Carte d'acces au complexe et cartes serviettes fournies a l'arrivee.\n2) Sejour minimum: 2 nuits.\n3) Menage effectue tous les 3 jours.",
      },
      alert: {
        en: "Private beach loungers and free resort lagoon pool access included for all registered guests.",
        de: "Private Strandliegen und Zugang zu den Lagunenpools fuer alle Gaeste inbegriffen.",
        ru: "Шезлонги на частном пляже и доступ ко всем бассейнам-лагунам включены.",
        fr: "Transats prives sur la plage et acces aux piscines lagons inclus.",
      },
      basePriceUSD: 75,
      isActive: true,
      options: [
        {
          name: {
            en: "Length of Stay",
            de: "Aufenthaltsdauer",
            ru: "Длительность пребывания",
            fr: "Duree du sejour",
          },
          values: [
            {
              key: { en: "Standard Nightly Rate", de: "Standard-Uebernachtungspreis", ru: "Стандартный тариф за ночь", fr: "Tarif standard par nuit" },
              value: { en: "$75 per night", de: "$75 pro Nacht", ru: "$75 за ночь", fr: "$75 par nuit" },
            },
            {
              key: { en: "7+ Nights Discount", de: "Rabatt ab 7 Naechten", ru: "Скидка от 7 ночей", fr: "Remise a partir de 7 nuits" },
              value: { en: "$65 per night (Save 13%)", de: "$65 pro Nacht (-13%)", ru: "$65 за ночь (скидка 13%)", fr: "$65 par nuit (-13%)" },
            },
            {
              key: { en: "Long Term (Monthly)", de: "Langzeitmiete (Monat)", ru: "Долгосрочно (в месяц)", fr: "Longue duree (mensuel)" },
              value: { en: "$1,350 per month", de: "$1.350 pro Monat", ru: "$1350 в месяц", fr: "$1350 par mois" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Resort Facilities & Specs",
            de: "Resort-Ausstattung",
            ru: "Удобства курорта и параметры",
            fr: "Equipements du resort",
          },
          values: [
            { name: { en: "Location: Long Beach Coastline, Hurghada", de: "Lage: Long Beach Kueste, Hurghada", ru: "Расположение: побережье Лонг Бич, Хургада", fr: "Emplacement: Cote Long Beach, Hurghada" } },
            { name: { en: "Suite: 1 Bedroom + Living Lounge (65 sqm)", de: "Suite: 1 Schlafzimmer + Wohnbereich (65 qm)", ru: "Номер: 1 спальня + гостиная (65 кв.м)", fr: "Suite: 1 chambre + salon (65 m²)" } },
            { name: { en: "Private Sandy Beach Access (150m)", de: "Privater Sandstrandzugang (150m)", ru: "Собственный песчаный пляж (150 м)", fr: "Acces direct plage privee de sable (150m)" } },
            { name: { en: "6 Lagoon Pools with Sun Deck & Bar", de: "6 Lagunenpools mit Sonnendeck & Bar", ru: "6 бассейнов-лагун с террасами и баром", fr: "6 piscines lagons avec solarium et bar" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/RealEstate/hero.png",
      "public/Services/RealEstate/87871600177d8e1c7fa1f6efeb42de7a23897951.jpg",
    ],
  },
];

