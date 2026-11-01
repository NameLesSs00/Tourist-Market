import type { SiteServiceSubItemUpsertRequest } from "../../models/siteServiceItem";

const VIP_AIRPORT_SERVICE_ID = "a275d037-ad85-4a4f-9c75-14c0249b4783";

export const SEED_VIP_AIRPORT_SERVICES: {
  payload: SiteServiceSubItemUpsertRequest;
  imagePaths: string[];
}[] = [
  {
    payload: {
      serviceId: VIP_AIRPORT_SERVICE_ID,
      title: {
        en: "VIP Fast Track & Lounge (Terminal 1)",
        de: "VIP Fast Track & Lounge (Terminal 1)",
        ru: "VIP Fast Track и бизнес-зал (Терминал 1)",
        fr: "VIP Fast Track et Salon (Terminal 1)",
      },
      subtitle: {
        en: "Priority Clearance and First-Class Lounge Comfort",
        de: "Bevorzugte Abfertigung und erstklassiger Lounge-Komfort",
        ru: "Приоритетное прохождение контроля и комфорт бизнес-зала",
        fr: "Accès prioritaire et confort du salon de première classe",
      },
      description: {
        en: "Arrive or depart with absolute peace of mind. Skip queues with dedicated priority immigration and relax in our quiet first-class lounge featuring a buffet, Wi-Fi, and refreshments.",
        de: "Reisen Sie entspannt an oder ab. Umgehen Sie Warteschlangen mit separater Passkontrolle und entspannen Sie in der First-Class-Lounge mit Buffet und WLAN.",
        ru: "Прибывайте или вылетайте с максимальным комфортом. Проходите паспортный контроль без очередей и отдыхайте в тихом бизнес-зале с фуршетом и Wi-Fi.",
        fr: "Arrivez ou partez en toute sérénité. Évitez les files grâce aux formalités prioritaires et détendez-vous dans notre salon avec buffet et Wi-Fi.",
      },
      textTopImage: {
        en: "Terminal 1 Priority Service",
        de: "Terminal 1 Prioritaetsservice",
        ru: "Приоритетный сервис Терминала 1",
        fr: "Service prioritaire Terminal 1",
      },
      note: {
        en: "1) Please provide your flight number and scheduled time at least 12 hours before arrival/departure.\n2) Children under 2 years of age enter free of charge when accompanied by a paying adult.\n3) Lounge stay is valid for up to 3 hours prior to scheduled departure.",
        de: "1) Bitte Flugnummer und Flugzeit mindestens 12 Stunden vor Ankunft/Abflug angeben.\n2) Kinder unter 2 Jahren haben in Begleitung eines zahlenden Erwachsenen freien Eintritt.\n3) Lounge-Aufenthalt ist bis zu 3 Stunden vor Abflug gueltig.",
        ru: "1) Укажите номер рейса и время вылета минимум за 12 часов до рейса.\n2) Дети до 2 лет в сопровождении взрослого обслуживаются бесплатно.\n3) Пребывание в бизнес-зале до 3 часов перед вылетом.",
        fr: "1) Veuillez fournir le numero de vol au moins 12 heures avant l'arrivee.\n2) Les enfants de moins de 2 ans entrent gratuitement avec un adulte payant.\n3) L'acces au salon est valable jusqu'a 3 heures avant le depart.",
      },
      alert: {
        en: "Dedicated airport representative meets you at the entrance with your name placard.",
        de: "Ein persoenlicher Flughafenmitarbeiter erwartet Sie am Eingang mit Namensschild.",
        ru: "Сотрудник аэропорта встречает вас у входа с именной табличкой.",
        fr: "Un representant vous accueille a l'entree avec une pancarte a votre nom.",
      },
      basePriceUSD: 65,
      isActive: true,
      options: [
        {
          name: {
            en: "Passenger Category",
            de: "Passagierkategorie",
            ru: "Категория пассажира",
            fr: "Categorie de passager",
          },
          values: [
            {
              key: { en: "Adult Pass (12+)", de: "Erwachsener (12+)", ru: "Взрослый (12+)", fr: "Adulte (12+)" },
              value: { en: "$65 per person", de: "$65 pro Person", ru: "$65 с человека", fr: "$65 par personne" },
            },
            {
              key: { en: "Child Pass (2-11)", de: "Kind (2-11)", ru: "Ребенок (2-11)", fr: "Enfant (2-11)" },
              value: { en: "$35 per child", de: "$35 pro Kind", ru: "$35 par enfant", fr: "$35 par enfant" },
            },
            {
              key: { en: "Infant (Under 2)", de: "Kleinkind (unter 2)", ru: "Младенец (до 2)", fr: "Bebe (moins de 2)" },
              value: { en: "Complimentary", de: "Kostenlos", ru: "Бесплатно", fr: "Gratuit" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Service Scope",
            de: "Serviceumfang",
            ru: "Объем услуги",
            fr: "Portee du service",
          },
          values: [
            { name: { en: "Terminal 1 Hurghada Airport", de: "Terminal 1 Flughafen Hurghada", ru: "Терминал 1 аэропорта Хургады", fr: "Terminal 1 Aeroport Hurghada" } },
            { name: { en: "Fast-Track Passport Control", de: "Schnelle Passkontrolle", ru: "Ускоренный паспортный контроль", fr: "Controle passeport coupe-file" } },
            { name: { en: "VIP Lounge Access (3h)", de: "VIP-Lounge-Zugang (3 Std.)", ru: "Доступ в VIP-зал (3 часа)", fr: "Acces salon VIP (3h)" } },
            { name: { en: "Buffet & Soft Drinks Included", de: "Buffet und alkoholfreie Getraenke inklusive", ru: "Шведский стол и напитки включены", fr: "Buffet et boissons inclus" } },
            { name: { en: "High-Speed Private Wi-Fi", de: "Highspeed-WLAN", ru: "Скоростной Wi-Fi", fr: "Wi-Fi haut debit" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/Vip-airport/08fce0cae9cd55f0000c966353fe2589e26ed61f.png",
      "public/Services/Vip-airport/hero.png",
    ],
  },
  {
    payload: {
      serviceId: VIP_AIRPORT_SERVICE_ID,
      title: {
        en: "VIP Fast Track & Meet and Assist (Terminal 2)",
        de: "VIP Fast Track & Meet and Assist (Terminal 2)",
        ru: "VIP Fast Track и сопровождение (Терминал 2)",
        fr: "VIP Fast Track et Assistance (Terminal 2)",
      },
      subtitle: {
        en: "Expedited Escort and Luggage Porterage at Terminal 2",
        de: "Beschleunigte Begleitung und Gepaeckservice am Terminal 2",
        ru: "Ускоренное сопровождение и помощь с багажом в Терминале 2",
        fr: "Escorte acceleree et portage des bagages au Terminal 2",
      },
      description: {
        en: "Expedited escort through customs and passport control at Hurghada Terminal 2 with dedicated porter support from gate to your ground transport.",
        de: "Beschleunigte Begleitung durch Zoll und Passkontrolle am Terminal 2 mit persoenlichem Gepaecktraeger bis zum Transferfahrzeug.",
        ru: "Персональное сопровождение через паспортный контроль и таможню в Терминале 2 с помощью носильщика до трансфера.",
        fr: "Escorte acceleree aux douanes et au controle des passeports au Terminal 2 avec porteur dedie jusqu'a votre transport.",
      },
      textTopImage: {
        en: "Terminal 2 Fast Track",
        de: "Terminal 2 Schnellabfertigung",
        ru: "Ускоренный контроль Терминал 2",
        fr: "Acces rapide Terminal 2",
      },
      note: {
        en: "1) Meeting point is directly at the aircraft gate or main airport entrance.\n2) Porter luggage handling is included up to 3 bags per passenger.\n3) 24/7 dispatch phone support is provided upon reservation confirmation.",
        de: "1) Treffpunkt direkt am Flugzeugausstieg oder am Haupteingang.\n2) Gepaecktraeger bis zu 3 Koffer pro Passagier inbegriffen.\n3) 24/7 Telefon-Support bei Buchungsbestaetigung.",
        ru: "1) Встреча у выхода из самолета или у главного входа.\n2) Помощь носильщика до 3 мест багажа на пассажира.\n3) Круглосуточная телефонная поддержка после подтверждения.",
        fr: "1) Point de rencontre a la porte de l'avion ou a l'entree principale.\n2) Assistance bagages incluse jusqu'a 3 valises par passager.\n3) Support telephonique 24/7 confirme apres reservation.",
      },
      alert: {
        en: "Please provide flight number and arrival time at least 6 hours in advance.",
        de: "Bitte Flugnummer und Ankunftszeit mindestens 6 Stunden im Voraus mitteilen.",
        ru: "Пожалуйста, предоставьте номер рейса и время прилета минимум за 6 часов.",
        fr: "Veuillez fournir le numero de vol et l'heure au moins 6 heures a l'avance.",
      },
      basePriceUSD: 45,
      isActive: true,
      options: [
        {
          name: {
            en: "Service Direction",
            de: "Servicerichtung",
            ru: "Направление услуги",
            fr: "Direction du service",
          },
          values: [
            {
              key: { en: "Arrival Escort", de: "Ankunftsbegleitung", ru: "Встреча по прилету", fr: "Escorte a l'arrivee" },
              value: { en: "$45 per person", de: "$45 pro Person", ru: "$45 с человека", fr: "$45 par personne" },
            },
            {
              key: { en: "Departure Escort", de: "Abflugbegleitung", ru: "Проводы на вылет", fr: "Escorte au depart" },
              value: { en: "$45 per person", de: "$45 pro Person", ru: "$45 с человека", fr: "$45 par personne" },
            },
            {
              key: { en: "Roundtrip (Arrival + Departure)", de: "Hin- und Rueckreise", ru: "Туда и обратно", fr: "Aller-retour" },
              value: { en: "$80 special package", de: "$80 Sonderpaket", ru: "$80 спецпакет", fr: "$80 forfait special" },
            },
          ],
        },
      ],
      features: [
        {
          name: {
            en: "Included Amenities",
            de: "Inbegriffene Leistungen",
            ru: "Включенные услуги",
            fr: "Prestations incluses",
          },
          values: [
            { name: { en: "Hurghada Airport Terminal 2", de: "Flughafen Hurghada Terminal 2", ru: "Аэропорт Хургада Терминал 2", fr: "Aeroport Hurghada Terminal 2" } },
            { name: { en: "Priority Security & Passport Stamping", de: "Prioritaere Sicherheits- und Passkontrolle", ru: "Приоритетный досмотр и штамп в паспорте", fr: "Securite et tampon passeport prioritaires" } },
            { name: { en: "Dedicated Luggage Porterage", de: "Persoenlicher Gepaecktraeger", ru: "Помощь носильщика с багажом", fr: "Porteur de bagages dedie" } },
            { name: { en: "Direct Escort to Transfer Vehicle", de: "Direkte Begleitung zum Fahrzeug", ru: "Сопровождение прямо к автомобилю", fr: "Escorte directe jusqu'au vehicule" } },
          ],
        },
      ],
    },
    imagePaths: [
      "public/Services/Vip-airport/hero.png",
      "public/Services/Vip-airport/08fce0cae9cd55f0000c966353fe2589e26ed61f.png",
    ],
  },
];

