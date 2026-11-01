import type { SiteServiceSubItemUpsertRequest } from "../../models/siteServiceItem";

const CAR_RENTAL_SERVICE_ID = "f28eafbc-fe21-4d0f-92c8-66965c761e4e";

export const SEED_CAR_RENTALS: {
  payload: SiteServiceSubItemUpsertRequest;
  imagePaths: string[];
}[] = [
  {
    payload: {
      serviceId: CAR_RENTAL_SERVICE_ID,
      title: {
        en: "Mercedes-Benz E-Class 2024 AMG",
        de: "Mercedes-Benz E-Klasse 2024 AMG",
        ru: "Mercedes-Benz E-Class 2024 AMG",
        fr: "Mercedes-Benz Classe E 2024 AMG",
      },
      subtitle: {
        en: "Executive Luxury Sedan with Dual-Zone Climate Control",
        de: "Exklusive Luxuslimousine mit Zwei-Zonen-Klimaautomatik",
        ru: "Представительский люкс-седан с двухзонным климат-контролем",
        fr: "Berline de luxe avec climatisation bi-zone",
      },
      description: {
        en: "Experience Hurghada and the Red Sea in unrivaled comfort and prestige. The Mercedes-Benz E-Class AMG combines dynamic elegance with smooth highway cruising.",
        de: "Erleben Sie Hurghada und das Rote Meer mit unvergleichlichem Komfort und Prestige. Die Mercedes-Benz E-Klasse AMG vereint Eleganz mit Fahrkomfort.",
        ru: "Путешествуйте по Хургаде с непревзойденным комфортом и престижем. Mercedes-Benz E-Class AMG сочетает динамику и максимальное удобство.",
        fr: "Découvrez Hurghada dans un confort et un prestige incomparables. La Mercedes-Benz Classe E AMG allie élégance et performance.",
      },
      textTopImage: {
        en: "Prestige Luxury Sedan",
        de: "Prestige-Luxuslimousine",
        ru: "Премиальный седан",
        fr: "Berline de prestige",
      },
      note: {
        en: "1) A refundable security deposit of $500 is required upon contract signing.\n2) Vehicle must be returned with a full fuel tank.\n3) Drivers must be at least 25 years old with a valid license.",
        de: "1) Eine erstattbare Kaution von $500 ist bei Vertragsunterzeichnung erforderlich.\n2) Das Fahrzeug muss vollgetankt zurückgegeben werden.\n3) Mindestalter des Fahrers: 25 Jahre.",
        ru: "1) Возвратный залог $500 при подписании договора.\n2) Автомобиль возвращается с полным баком.\n3) Водитель должен быть старше 25 лет с действующими правами.",
        fr: "1) Une caution remboursable de $500 est exigée à la signature du contrat.\n2) Le véhicule doit être rendu avec le plein.\n3) Le conducteur doit avoir au moins 25 ans.",
      },
      alert: {
        en: "Comprehensive insurance and 24/7 roadside assistance included in Red Sea resort area.",
        de: "Vollkaskoversicherung und 24/7 Pannenhilfe im Bereich des Roten Meeres inbegriffen.",
        ru: "Полная страховка и круглосуточная поддержка на дорогах в курортной зоне Красного моря.",
        fr: "Assurance tous risques et assistance 24h/24 incluses dans la zone côtière de la mer Rouge.",
      },
      basePriceUSD: 120,
      isActive: true,
      options: [
        {
          name: {
            en: "Duration Discount",
            de: "Rabatt nach Mietdauer",
            ru: "Скидка по сроку",
            fr: "Remise selon la durée",
          },
          values: [
            {
              key: { en: "1 to 3 Days", de: "1 bis 3 Tage", ru: "1-3 дня", fr: "1 à 3 jours" },
              value: { en: "$120 per day", de: "$120 pro Tag", ru: "$120 в день", fr: "$120 par jour" },
            },
            {
              key: { en: "4 to 7 Days", de: "4 bis 7 Tage", ru: "4-7 дней", fr: "4 à 7 jours" },
              value: { en: "$105 per day", de: "$105 pro Tag", ru: "$105 в день", fr: "$105 par jour" },
            },
            {
              key: { en: "8+ Days", de: "Ab 8 Tagen", ru: "8+ дней", fr: "8+ jours" },
              value: { en: "$90 per day", de: "$90 pro Tag", ru: "$90 в день", fr: "$90 par jour" },
            },
          ],
        },
      ],
      features: [
        {
          name: { en: "Specifications", de: "Spezifikationen", ru: "Характеристики", fr: "Spécifications" },
          values: [
            { name: { en: "Model Year: 2024", de: "Baujahr: 2024", ru: "Год выпуска: 2024", fr: "Année: 2024" } },
            { name: { en: "Transmission: Automatic", de: "Getriebe: Automatik", ru: "Коробка передач: Автомат", fr: "Boîte: Automatique" } },
            { name: { en: "Dual-Zone Climate Control", de: "Zwei-Zonen-Klimaanlage", ru: "Климат-контроль 2 зоны", fr: "Climatisation bi-zone" } },
            { name: { en: "Engine: 2.0L Turbo", de: "Motor: 2.0L Turbo", ru: "Двигатель: 2.0л Турбо", fr: "Moteur: 2.0L Turbo" } },
          ],
        },
        {
          name: { en: "Inclusions", de: "Inbegriffen", ru: "Включено", fr: "Inclus" },
          values: [
            { name: { en: "Full CDW Insurance Included", de: "Vollkaskoschutz inklusive", ru: "Полное страхование КАСКО", fr: "Assurance tous risques incluse" } },
            { name: { en: "Unlimited Mileage in Red Sea", de: "Unbegrenzte Kilometer am Roten Meer", ru: "Неограниченный пробег по побережью", fr: "Kilométrage illimité mer Rouge" } },
            { name: { en: "Free Additional Driver", de: "Kostenloser Zusatzfahrer", ru: "Бесплатный второй водитель", fr: "Deuxième conducteur gratuit" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/carServices/2904766165ec95034637ec51e18a64da61ed29b3.png",
      "public/Services/carServices/2b382879db647cf7e2c7ccd72c6c4d76e3b0d920.png",
      "public/Services/carServices/f0db2556faea9c8a7b8af9ccbbdc284fba4a4207.png",
    ],
  },
  {
    payload: {
      serviceId: CAR_RENTAL_SERVICE_ID,
      title: {
        en: "Hyundai Tucson Turbo 2024",
        de: "Hyundai Tucson Turbo 2024",
        ru: "Hyundai Tucson Turbo 2024",
        fr: "Hyundai Tucson Turbo 2024",
      },
      subtitle: {
        en: "Spacious Modern SUV for Families and Red Sea Explorers",
        de: "Geräumiger moderner SUV für Familien und Entdecker",
        ru: "Просторный современный кроссовер для семейных поездок",
        fr: "SUV moderne et spacieux pour familles",
      },
      description: {
        en: "The versatile Hyundai Tucson offers high driving clearance, generous luggage space, and smooth fuel economy for all coastal excursions.",
        de: "Der vielseitige Hyundai Tucson bietet hohe Bodenfreiheit, viel Gepäckraum und sparsamen Kraftstoffverbrauch für alle Ausflüge.",
        ru: "Универсальный Hyundai Tucson сочетает высокий клиренс, вместительный багажник и отличную экономичность.",
        fr: "Le Hyundai Tucson polyvalent offre une garde au sol élevée, un coffre généreux et une excellente économie de carburant.",
      },
      textTopImage: {
        en: "Comfort Family SUV",
        de: "Komfort-Familien-SUV",
        ru: "Семейный кроссовер",
        fr: "SUV familial tout confort",
      },
      note: {
        en: "1) $300 refundable security deposit required.\n2) Minimum rental duration: 1 day.\n3) Free pickup and drop-off at company office.",
        de: "1) $300 erstattbare Kaution erforderlich.\n2) Mindestmietdauer: 1 Tag.\n3) Kostenlose Übergabe im Büro.",
        ru: "1) Возвратный залог $300.\n2) Минимальный срок аренды: 1 день.\n3) Бесплатная подача у офиса.",
        fr: "1) Caution remboursable de $300 exigée.\n2) Durée minimum: 1 jour.\n3) Prise en charge gratuite à l'agence.",
      },
      alert: {
        en: "Best-selling SUV in Hurghada. Book in advance to guarantee availability.",
        de: "Beliebtester SUV in Hurghada. Frühzeitige Buchung empfohlen.",
        ru: "Самый популярный кроссовер в Хургаде. Рекомендуем бронировать заранее.",
        fr: "SUV le plus populaire à Hurghada. Réservez à l'avance pour garantir la disponibilité.",
      },
      basePriceUSD: 65,
      isActive: true,
      options: [
        {
          name: {
            en: "Duration Discount",
            de: "Rabatt nach Mietdauer",
            ru: "Скидка по сроку",
            fr: "Remise selon la durée",
          },
          values: [
            {
              key: { en: "1 to 3 Days", de: "1 bis 3 Tage", ru: "1-3 дня", fr: "1 à 3 jours" },
              value: { en: "$65 per day", de: "$65 pro Tag", ru: "$65 в день", fr: "$65 par jour" },
            },
            {
              key: { en: "4 to 7 Days", de: "4 bis 7 Tage", ru: "4-7 дней", fr: "4 à 7 jours" },
              value: { en: "$58 per day", de: "$58 pro Tag", ru: "$58 в день", fr: "$58 par jour" },
            },
            {
              key: { en: "8+ Days", de: "Ab 8 Tagen", ru: "8+ дней", fr: "8+ jours" },
              value: { en: "$50 per day", de: "$50 pro Tag", ru: "$50 в день", fr: "$50 par jour" },
            },
          ],
        },
      ],
      features: [
        {
          name: { en: "Specifications", de: "Spezifikationen", ru: "Характеристики", fr: "Spécifications" },
          values: [
            { name: { en: "Model Year: 2024", de: "Baujahr: 2024", ru: "Год: 2024", fr: "Année: 2024" } },
            { name: { en: "Transmission: 7-Speed Automatic", de: "Getriebe: 7-Gang Automatik", ru: "Коробка: 7-ст Автомат", fr: "Boîte: Automatique 7 vitesses" } },
            { name: { en: "Seating: 5 Passengers", de: "Sitzplätze: 5 Personen", ru: "Мест: 5 пассажиров", fr: "Capacité: 5 passagers" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/carServices/2b382879db647cf7e2c7ccd72c6c4d76e3b0d920.png",
      "public/Services/carServices/f0db2556faea9c8a7b8af9ccbbdc284fba4a4207.png",
    ],
  },
  {
    payload: {
      serviceId: CAR_RENTAL_SERVICE_ID,
      title: {
        en: "Nissan Sunny 2024 Economy",
        de: "Nissan Sunny 2024 Economy",
        ru: "Nissan Sunny 2024 Эконом",
        fr: "Nissan Sunny 2024 Économique",
      },
      subtitle: {
        en: "Smart, Economical and Reliable Sedan for Daily Red Sea Commutes",
        de: "Wirtschaftliche und zuverlässige Limousine für tägliche Fahrten",
        ru: "Надежный и экономичный седан для поездок по курорту",
        fr: "Berline économique et fiable pour vos trajets quotidiens",
      },
      description: {
        en: "Enjoy easy maneuvering, low fuel consumption, and dependable air conditioning with the Nissan Sunny 2024.",
        de: "Genießen Sie einfaches Einparken, geringen Kraftstoffverbrauch und zuverlässige Klimaanlage mit dem Nissan Sunny 2024.",
        ru: "Оцените легкость управления, экономичный расход топлива и надежный кондиционер с Nissan Sunny 2024.",
        fr: "Profitez d'une conduite fluide, d'une faible consommation de carburant et d'une climatisation efficace.",
      },
      textTopImage: {
        en: "Best Economy Choice",
        de: "Beste Spar-Option",
        ru: "Лучший выбор эконом",
        fr: "Meilleur choix économique",
      },
      note: {
        en: "1) $200 refundable deposit required.\n2) Fuel policy: full to full.\n3) Free cancellation up to 24 hours before pickup.",
        de: "1) $200 erstattbare Kaution.\n2) Kraftstoffregelung: voll zu voll.\n3) Kostenlose Stornierung bis 24h vorher.",
        ru: "1) Возвратный залог $200.\n2) Топливо: полный к полному.\n3) Бесплатная отмена за 24 часа.",
        fr: "1) Caution remboursable de $200.\n2) Politique carburant: plein à plein.\n3) Annulation gratuite jusqu'à 24h avant.",
      },
      alert: {
        en: "Great budget option for easy city travel and market shopping in Hurghada.",
        de: "Hervorragende Option für Stadtfahrten und Einkäufe in Hurghada.",
        ru: "Отличный вариант для поездок по городу и шопинга в Хургаде.",
        fr: "Excellente option pour circuler facilement en ville à Hurghada.",
      },
      basePriceUSD: 35,
      isActive: true,
      options: [
        {
          name: {
            en: "Duration Discount",
            de: "Rabatt nach Mietdauer",
            ru: "Скидка по сроку",
            fr: "Remise selon la durée",
          },
          values: [
            {
              key: { en: "1 to 3 Days", de: "1 bis 3 Tage", ru: "1-3 дня", fr: "1 à 3 jours" },
              value: { en: "$35 per day", de: "$35 pro Tag", ru: "$35 в день", fr: "$35 par jour" },
            },
            {
              key: { en: "4 to 7 Days", de: "4 bis 7 Tage", ru: "4-7 дней", fr: "4 à 7 jours" },
              value: { en: "$30 per day", de: "$30 pro Tag", ru: "$30 в день", fr: "$30 par jour" },
            },
            {
              key: { en: "8+ Days", de: "Ab 8 Tagen", ru: "8+ дней", fr: "8+ jours" },
              value: { en: "$26 per day", de: "$26 pro Tag", ru: "$26 в день", fr: "$26 par jour" },
            },
          ],
        },
      ],
      features: [
        {
          name: { en: "Specifications", de: "Spezifikationen", ru: "Характеристики", fr: "Spécifications" },
          values: [
            { name: { en: "Model Year: 2024", de: "Baujahr: 2024", ru: "Год: 2024", fr: "Année: 2024" } },
            { name: { en: "Transmission: Automatic", de: "Getriebe: Automatik", ru: "Коробка: Автомат", fr: "Boîte: Automatique" } },
            { name: { en: "Seating: 5 Passengers", de: "Sitzplätze: 5 Personen", ru: "Мест: 5 пассажиров", fr: "Capacité: 5 passagers" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/carServices/2904766165ec95034637ec51e18a64da61ed29b3.png",
      "public/Services/carServices/f0db2556faea9c8a7b8af9ccbbdc284fba4a4207.png",
    ],
  },
];

