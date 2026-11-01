import type { SiteServiceSubItemUpsertRequest } from "../../models/siteServiceItem";

const TOURIST_SERVICE_ID = "17e7c22e-e19e-431d-9b24-1b6f75cd01f9";

export const SEED_TOURIST_SERVICES: {
  payload: SiteServiceSubItemUpsertRequest;
  imagePaths: string[];
}[] = [
  {
    payload: {
      serviceId: TOURIST_SERVICE_ID,
      title: {
        en: "Personal Translator & Multilingual Local Guide",
        de: "Persoenlicher Uebersetzer & Lokaler Reiseleiter",
        ru: "Персональный переводчик и местный гид",
        fr: "Traducteur Personnel et Guide Local Multilingue",
      },
      subtitle: {
        en: "Certified Language Assistance for Shopping, Clinics & Exploring",
        de: "Zertifizierte Sprachbegleitung fuer Shopping, Kliniken & Ausfluege",
        ru: "Сертифицированная языковая помощь для покупок, клиник и экскурсий",
        fr: "Assistance linguistique certifiee pour shopping, soins et excursions",
      },
      description: {
        en: "Professional certified language assistance and cultural guiding across Hurghada, El Gouna, and Luxor. We bridge communication for shopping, medical visits, and private excursions.",
        de: "Professionelle Sprachbegleitung und kulturelle Fuehrung in Hurghada, El Gouna und Luxor fuer Einkauefe, Arztbesuche und Privatausfluege.",
        ru: "Профессиональный перевод и сопровождение в Хургаде, Эль Гуне и Луксоре. Помощь в общении на рынках, в клиниках и на частных экскурсиях.",
        fr: "Assistance linguistique professionnelle et guidage culturel a Hurghada, El Gouna et Louxor pour le shopping, visites medicales et excursions.",
      },
      textTopImage: {
        en: "Multilingual Guide (EN / DE / RU / FR)",
        de: "Mehrsprachiger Guide (EN / DE / RU / FR)",
        ru: "Многоязычный гид (EN / DE / RU / FR)",
        fr: "Guide multilingue (EN / DE / RU / FR)",
      },
      note: {
        en: "1) Guide transportation within Hurghada city center is included.\n2) For destinations outside central Hurghada (El Gouna, Soma Bay, Safaga), a $10 transfer surcharge applies.\n3) Minimum booking duration is 2 consecutive hours.",
        de: "1) Anfahrt des Guides im Stadtzentrum von Hurghada inbegriffen.\n2) Fuer Ziele ausserhalb des Zentrums (El Gouna, Soma Bay) faellt ein Zuschlag von $10 an.\n3) Mindestbuchungsdauer: 2 aufeinanderfolgende Stunden.",
        ru: "1) Трансфер гида в пределах центра Хургады включен.\n2) За пределы центра (Эль Гуна, Сома Бей) доплата $10.\n3) Минимальное время бронирования: 2 часа подряд.",
        fr: "1) Deplacement du guide inclus dans le centre d'Hurghada.\n2) Supplement de $10 pour les zones exterieures (El Gouna, Soma Bay).\n3) Duree minimale de reservation: 2 heures consecutives.",
      },
      alert: {
        en: "Advance booking of at least 4 hours is recommended for specific foreign language requests.",
        de: "Eine Vorabreservierung von mindestens 4 Stunden wird fuer bestimmte Sprachen empfohlen.",
        ru: "Рекомендуется бронировать минимум за 4 часа для выбора языка.",
        fr: "Reservation conseillee au moins 4 heures a l'avance selon la langue souhaitee.",
      },
      basePriceUSD: 25,
      isActive: true,
      options: [
        {
          name: {
            en: "Duration Packages",
            de: "Dauerpakete",
            ru: "Пакеты по времени",
            fr: "Forfaits de duree",
          },
          values: [
            {
              key: { en: "Hourly Rate (Min 2h)", de: "Stundensatz (ab 2 Std.)", ru: "Почасовая оплата (от 2 ч)", fr: "Tarif horaire (min 2h)" },
              value: { en: "$25 per hour", de: "$25 pro Stunde", ru: "$25 в час", fr: "$25 par heure" },
            },
            {
              key: { en: "Half-Day Package (4 Hours)", de: "Halbtagspaket (4 Stunden)", ru: "Полдня (4 часа)", fr: "Forfait demi-journee (4h)" },
              value: { en: "$85 flat package", de: "$85 Pauschale", ru: "$85 фиксированный пакет", fr: "$85 forfait fixe" },
            },
            {
              key: { en: "Full-Day Escort (8 Hours)", de: "Ganztagsbegleitung (8 Stunden)", ru: "Полный день (8 часов)", fr: "Journee complete (8h)" },
              value: { en: "$150 flat package", de: "$150 Pauschale", ru: "$150 фиксированный пакет", fr: "$150 forfait fixe" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Guiding Qualifications",
            de: "Qualifikationen",
            ru: "Квалификация и профиль",
            fr: "Qualifications du guide",
          },
          values: [
            { name: { en: "Fluent Languages: English, German, Russian, French, Arabic", de: "Sprachen: Englisch, Deutsch, Russisch, Franzoesisch, Arabisch", ru: "Языки: английский, немецкий, русский, французский, арабский", fr: "Langues: anglais, allemand, russe, francais, arabe" } },
            { name: { en: "Official Ministry Tourism License", de: "Offizielle Fremdenverkehrslizenz", ru: "Официальная туристическая лицензия Министерства", fr: "Licence officielle de tourisme" } },
            { name: { en: "Bazaar Price Negotiation Expertise", de: "Erfahrung bei Preisverhandlungen auf dem Basar", ru: "Помощь в торге на рынках и в лавках", fr: "Expertise de negociation sur les bazars" } },
            { name: { en: "Private Medical & Pharmacy Translation", de: "Medizinische und pharmazeutische Uebersetzung", ru: "Медицинский перевод в клиниках и аптеках", fr: "Traduction medicale et pharmaceutique" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/Touristservices/eec14d086d4c28248eb2587d5080add1f603096c.png",
      "public/Services/Touristservices/hero.png",
    ],
  },
  {
    payload: {
      serviceId: TOURIST_SERVICE_ID,
      title: {
        en: "Private Egyptologist Guide & Cultural Tour",
        de: "Privater Aegyptologe & Kulturreiseleiter",
        ru: "Частный гид-египтолог и культурный тур",
        fr: "Guide Egyptologue Prive et Visite Culturelle",
      },
      subtitle: {
        en: "Academic Historical Guiding to Ancient Temples & Historic Sites",
        de: "Akademische historische Fuehrungen zu Tempeln und Staetten",
        ru: "Профессиональные исторические экскурсии по древним храмам и музеям",
        fr: "Guidage historique et universitaire des temples et sites antiques",
      },
      description: {
        en: "Discover the captivating history of ancient Egypt with a certified university Egyptologist. Private personalized storytelling for Luxor, Cairo, Hurghada Museum, and Old Town.",
        de: "Erleben Sie die Geschichte des alten Aegyptens mit einem Universitaets-Aegyptologen. Personalisierte Fuehrungen fuer Luxor, Kairo und das Hurghada Museum.",
        ru: "Познакомьтесь с историей Древнего Египта с дипломированным египтологом. Индивидуальные экскурсии по Луксору, Каиру, Музею Хургады и Старому городу.",
        fr: "Decouvrez l'histoire fascinante de l'Egypte antique avec un egyptologue certifie. Visites privees personnalisees a Louxor, Le Caire et au musee d'Hurghada.",
      },
      textTopImage: {
        en: "Certified University Egyptologist",
        de: "Zertifizierter Aegyptologe",
        ru: "Дипломированный египтолог",
        fr: "Egyptologue universitaire certifie",
      },
      note: {
        en: "1) Museum and temple entrance tickets are purchased separately at venue gates.\n2) Tailor-made itineraries can be customized according to your interests.\n3) Available in English, German, French, and Russian.",
        de: "1) Eintrittskarten fuer Museen und Tempel sind separat erhaeltlich.\n2) Individuelle Routen nach Ihren Wuenschen moeglich.\n3) Verfuegbar auf Deutsch, Englisch, Franzoesisch und Russisch.",
        ru: "1) Входные билеты в храмы и музеи приобретаются отдельно.\n2) Маршрут составляется индивидуально под ваши пожелания.\n3) Экскурсии на русском, английском, немецком или французском языках.",
        fr: "1) Les billets d'entree sont a regler directement sur place.\n2) Itineraires personnalises selon vos centres d'interet.\n3) Disponible en francais, anglais, allemand et russe.",
      },
      alert: {
        en: "Private museum transport can be arranged upon request with luxury Mercedes van.",
        de: "Privater Transfer mit Mercedes-Van auf Wunsch zubuchbar.",
        ru: "По запросу предоставляется частный трансфер на микроавтобусе Mercedes.",
        fr: "Transport prive en van Mercedes possible sur demande.",
      },
      basePriceUSD: 40,
      isActive: true,
      options: [
        {
          name: {
            en: "Tour Format",
            de: "Tour-Format",
            ru: "Формат экскурсии",
            fr: "Format de visite",
          },
          values: [
            {
              key: { en: "Hurghada City & Museum (3 Hours)", de: "Hurghada Stadt & Museum (3 Std.)", ru: "Город Хургада и Музей (3 часа)", fr: "Ville et Musee d'Hurghada (3h)" },
              value: { en: "$100 flat group rate", de: "$100 Gruppenpauschale", ru: "$100 за группу", fr: "$100 forfait groupe" },
            },
            {
              key: { en: "Full-Day Luxor Escort (12 Hours)", de: "Ganztagesbegleitung Luxor (12 Std.)", ru: "Сопровождение в Луксор на весь день (12 ч)", fr: "Journee complete a Louxor (12h)" },
              value: { en: "$220 flat private rate", de: "$220 private Pauschale", ru: "$220 фиксированная цена", fr: "$220 forfait prive" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Academic Credentials",
            de: "Fachqualifikationen",
            ru: "Академическая квалификация",
            fr: "Titres universitaires",
          },
          values: [
            { name: { en: "Degree in Egyptology & Archaeology", de: "Abschluss in Aegyptologie und Archaeologie", ru: "Диплом по египтологии и археологии", fr: "Diplome en egyptologie et archeologie" } },
            { name: { en: "10+ Years Professional Guiding Experience", de: "Ueber 10 Jahre Berufserfahrung", ru: "Более 10 лет опыта работы гидом", fr: "Plus de 10 ans d'experience professionnelle" } },
            { name: { en: "Interactive Hieroglyphics Translation", de: "Interaktive Uebersetzung von Hieroglyphen", ru: "Чтение и перевод древних иероглифов", fr: "Traduction interactive des hieroglyphes" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/Touristservices/hero.png",
      "public/Services/Touristservices/eec14d086d4c28248eb2587d5080add1f603096c.png",
    ],
  },
];

