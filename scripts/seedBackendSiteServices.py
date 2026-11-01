"""
Backend Seeding Script for Tourist Market Site Services
Updates and posts rich localized services to the live ASP.NET backend API
using the SuperAdmin Bearer token.
"""

import os
import json
import uuid
import urllib.request
import urllib.error

TOKEN = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0."
    "EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY"
)

BASE_URL = "https://touristtt.runasp.net/api"

CAR_RENTAL_PARENT = "f28eafbc-fe21-4d0f-92c8-66965c761e4e"
REAL_ESTATE_PARENT = "ab273263-625a-4a30-b7a7-1514a37f63ab"
TOURIST_SERVICES_PARENT = "17e7c22e-e19e-431d-9b24-1b6f75cd01f9"
VIP_AIRPORT_PARENT = "a275d037-ad85-4a4f-9c75-14c0249b4783"

def make_request(endpoint, method="GET", data=None, content_type="application/json"):
    url = f"{BASE_URL}{endpoint}"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/json"
    }
    encoded_data = None
    if data is not None:
        headers["Content-Type"] = content_type
        if isinstance(data, (dict, list)):
            encoded_data = json.dumps(data).encode("utf-8")
        else:
            encoded_data = data

    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"HTTP {e.code} on {method} {url}: {err_body}")
        raise

def upload_images(subservice_id, file_paths):
    url = f"{BASE_URL}/services/subservices/{subservice_id}/images"
    boundary = "----FormBoundary" + uuid.uuid4().hex

    body = bytearray()
    valid_count = 0
    for rel_path in file_paths:
        abs_path = os.path.abspath(rel_path)
        if not os.path.exists(abs_path):
            print(f"  Warning: file not found {abs_path}")
            continue

        filename = os.path.basename(abs_path)
        content_type = "image/png" if filename.lower().endswith(".png") else "image/jpeg"
        with open(abs_path, "rb") as f:
            file_bytes = f.read()

        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="files"; filename="{filename}"\r\n'.encode("utf-8"))
        body.extend(f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"))
        body.extend(file_bytes)
        body.extend(b"\r\n")
        valid_count += 1

    if valid_count == 0:
        return

    body.extend(f"--{boundary}--\r\n".encode("utf-8"))

    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Accept": "application/json"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"  Uploaded {valid_count} images for {subservice_id} (Status: {resp.status})")
    except urllib.error.HTTPError as e:
        print(f"  Image upload HTTP {e.code}: {e.read().decode('utf-8')}")

def run_seeding():
    print("=== Starting Site Services Seeding ===")

    # 1. Car Rentals
    car_1_payload = {
        "serviceId": CAR_RENTAL_PARENT,
        "title": {
            "en": "Mercedes-Benz E-Class 2024 AMG",
            "de": "Mercedes-Benz E-Klasse 2024 AMG",
            "ru": "Mercedes-Benz E-Class 2024 AMG",
            "fr": "Mercedes-Benz Classe E 2024 AMG"
        },
        "subtitle": {
            "en": "Executive Luxury Sedan with Dual-Zone Climate Control",
            "de": "Exklusive Luxuslimousine mit Zwei-Zonen-Klimaautomatik",
            "ru": "Представительский люкс-седан с двухзонным климат-контролем",
            "fr": "Berline de luxe avec climatisation bi-zone"
        },
        "description": {
            "en": "Experience Hurghada and the Red Sea in unrivaled comfort and prestige. The Mercedes-Benz E-Class AMG combines dynamic elegance with smooth highway cruising.",
            "de": "Erleben Sie Hurghada und das Rote Meer mit unvergleichlichem Komfort und Prestige.",
            "ru": "Путешествуйте по Хургаде с непревзойденным комфортом и престижем.",
            "fr": "Decouvrez Hurghada dans un confort et un prestige incomparables."
        },
        "textTopImage": {
            "en": "Prestige Luxury Sedan",
            "de": "Prestige-Luxuslimousine",
            "ru": "Премиальный седан",
            "fr": "Berline de prestige"
        },
        "note": {
            "en": "1) A refundable security deposit of $500 is required upon contract signing.\n2) Vehicle must be returned with a full fuel tank.\n3) Drivers must be at least 25 years old with a valid license.",
            "de": "1) Kaution von $500 erforderlich.\n2) Fahrzeug vollgetankt zurueckgeben.\n3) Mindestalter 25 Jahre.",
            "ru": "1) Возвратный залог $500.\n2) Возврат с полным баком.\n3) Возраст от 25 лет.",
            "fr": "1) Caution de $500 requise.\n2) Retour avec le plein.\n3) Age minimum 25 ans."
        },
        "alert": {
            "en": "Comprehensive insurance and 24/7 roadside assistance included in Red Sea resort area.",
            "de": "Vollkaskoversicherung und 24/7 Pannenhilfe inbegriffen.",
            "ru": "Полная страховка и техподдержка 24/7 включены.",
            "fr": "Assurance tous risques et assistance 24/7 incluses."
        },
        "basePriceUSD": 120.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Duration Tier", "de": "Mietdauer-Staffel", "ru": "Тариф по дням", "fr": "Palier de duree" },
                "values": [
                    { "key": { "en": "1 to 3 Days", "de": "1 bis 3 Tage", "ru": "1-3 дня", "fr": "1 a 3 jours" }, "value": { "en": "$120 per day", "de": "$120 pro Tag", "ru": "$120 в день", "fr": "$120 par jour" } },
                    { "key": { "en": "4 to 7 Days", "de": "4 bis 7 Tage", "ru": "4-7 дней", "fr": "4 a 7 jours" }, "value": { "en": "$105 per day (Save 12%)", "de": "$105 pro Tag (-12%)", "ru": "$105 в день (скидка 12%)", "fr": "$105 par jour (-12%)" } },
                    { "key": { "en": "8+ Days Extended", "de": "Ab 8 Tagen", "ru": "От 8 дней", "fr": "8+ jours" }, "value": { "en": "$90 per day (Save 25%)", "de": "$90 pro Tag (-25%)", "ru": "$90 в день (скидка 25%)", "fr": "$90 par jour (-25%)" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Vehicle Specifications", "de": "Fahrzeugspezifikationen", "ru": "Характеристики", "fr": "Specifications" },
                "values": [
                    { "name": { "en": "Model Year: 2024 AMG Line", "de": "Baujahr: 2024 AMG Line", "ru": "Год: 2024 AMG Line", "fr": "Annee: 2024 AMG Line" } },
                    { "name": { "en": "Transmission: 9G-Tronic Automatic", "de": "Getriebe: 9G-Tronic Automatik", "ru": "КПП: Автомат 9G-Tronic", "fr": "Boite: Automatique 9G-Tronic" } },
                    { "name": { "en": "Air Conditioning: Dual-Zone Thermotronic", "de": "Klimaanlage: 2-Zonen", "ru": "Климат-контроль: двухзонный", "fr": "Climatisation: Bi-zone" } },
                    { "name": { "en": "Capacity: 5 Passengers / 3 Large Bags", "de": "Kapazitaet: 5 Personen / 3 Koffer", "ru": "Вместимость: 5 мест / 3 багажа", "fr": "Capacite: 5 passagers / 3 bagages" } }
                ]
            }
        ]
    }

    print("Updating Car 1 (47fd8d6a-5d82-4a40-961a-0dffd507708d)...")
    make_request("/services/subservices/47fd8d6a-5d82-4a40-961a-0dffd507708d", method="PUT", data=car_1_payload)
    upload_images("47fd8d6a-5d82-4a40-961a-0dffd507708d", [
        "public/Services/carServices/2904766165ec95034637ec51e18a64da61ed29b3.png",
        "public/Services/carServices/hero.jpg"
    ])

    car_2_payload = {
        "serviceId": CAR_RENTAL_PARENT,
        "title": {
            "en": "Toyota Fortuner 4x4 2024",
            "de": "Toyota Fortuner 4x4 2024",
            "ru": "Toyota Fortuner 4x4 2024",
            "fr": "Toyota Fortuner 4x4 2024"
        },
        "subtitle": {
            "en": "7-Seater All-Terrain SUV for Desert & Coastal Touring",
            "de": "7-Sitzer Gelaende-SUV fuer Wueste und Kueste",
            "ru": "7-местный рамный внедорожник для пустыни и побережья",
            "fr": "SUV tout-terrain 7 places pour desert et littoral"
        },
        "description": {
            "en": "Rugged dependability meets comfort in the Toyota Fortuner 4x4. Seats up to 7 passengers with expansive luggage space.",
            "de": "Zuverlaessigkeit trifft Komfort im Toyota Fortuner 4x4 mit 7 Sitzen.",
            "ru": "Надежность и комфорт внедорожника Toyota Fortuner 4x4 на 7 мест.",
            "fr": "Fiabilite et confort avec le Toyota Fortuner 4x4 a 7 places."
        },
        "textTopImage": {
            "en": "All-Terrain 7-Seater SUV",
            "de": "7-Sitzer Allrad-SUV",
            "ru": "7-местный внедорожник",
            "fr": "SUV 7 places 4x4"
        },
        "note": {
            "en": "1) Refundable security deposit of $350 required.\n2) Valid driver license and passport must be presented.\n3) Fuel policy: full-to-full.",
            "de": "1) Kaution $350 erforderlich.\n2) Fuehrerschein und Pass vorlegen.\n3) Tankregelung: voll zu voll.",
            "ru": "1) Возвратный залог $350.\n2) Водительские права и паспорт.\n3) Полный бак при возврате.",
            "fr": "1) Caution de $350 requise.\n2) Permis et passeport requis.\n3) Plein a plein."
        },
        "alert": {
            "en": "Free delivery to all central Hurghada resorts and hotels.",
            "de": "Kostenlose Zustellung zu allen Hotels in Hurghada.",
            "ru": "Бесплатная доставка к отелям в пределах Хургады.",
            "fr": "Livraison gratuite dans tous les hotels d'Hurghada."
        },
        "basePriceUSD": 95.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Rental Duration", "de": "Mietdauer", "ru": "Срок аренды", "fr": "Duree de location" },
                "values": [
                    { "key": { "en": "1 to 3 Days", "de": "1 bis 3 Tage", "ru": "1-3 дня", "fr": "1 a 3 jours" }, "value": { "en": "$95 per day", "de": "$95 pro Tag", "ru": "$95 в день", "fr": "$95 par jour" } },
                    { "key": { "en": "4 to 7 Days", "de": "4 bis 7 Tage", "ru": "4-7 дней", "fr": "4 a 7 jours" }, "value": { "en": "$82 per day (Save 14%)", "de": "$82 pro Tag (-14%)", "ru": "$82 в день (скидка 14%)", "fr": "$82 par jour (-14%)" } },
                    { "key": { "en": "8+ Days", "de": "Ab 8 Tagen", "ru": "От 8 дней", "fr": "8+ jours" }, "value": { "en": "$72 per day (Save 24%)", "de": "$72 pro Tag (-24%)", "ru": "$72 в день (скидка 24%)", "fr": "$72 par jour (-24%)" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Vehicle Specifications", "de": "Fahrzeugspezifikationen", "ru": "Характеристики", "fr": "Specifications" },
                "values": [
                    { "name": { "en": "Drivetrain: Four-Wheel Drive 4x4", "de": "Antrieb: Allradantrieb 4x4", "ru": "Привод: Полный 4x4", "fr": "Transmission: 4 roues motrices 4x4" } },
                    { "name": { "en": "Seating: 7 Full Passenger Seats", "de": "Sitzplaetze: 7 Sitze", "ru": "Мест: 7 полноценных мест", "fr": "Places: 7 sieges" } },
                    { "name": { "en": "Transmission: 6-Speed Automatic", "de": "Getriebe: 6-Gang Automatik", "ru": "КПП: Автомат 6-ступ.", "fr": "Boite: Automatique 6 vitesses" } }
                ]
            }
        ]
    }

    print("Updating Car 2 (10d03700-ed85-46a7-90c3-830b124118b6)...")
    make_request("/services/subservices/10d03700-ed85-46a7-90c3-830b124118b6", method="PUT", data=car_2_payload)
    upload_images("10d03700-ed85-46a7-90c3-830b124118b6", [
        "public/Services/carServices/2b382879db647cf7e2c7ccd72c6c4d76e3b0d920.png",
        "public/Services/carServices/f0db2556faea9c8a7b8af9ccbbdc284fba4a4207.png"
    ])

    car_3_payload = {
        "serviceId": CAR_RENTAL_PARENT,
        "title": {
            "en": "Hyundai Elantra CN7 2024",
            "de": "Hyundai Elantra CN7 2024",
            "ru": "Hyundai Elantra CN7 2024",
            "fr": "Hyundai Elantra CN7 2024"
        },
        "subtitle": {
            "en": "Comfortable & Economical Sedan for City & Coast Cruising",
            "de": "Komfortable und sparsame Limousine fuer Stadt und Kueste",
            "ru": "Комфортный и экономичный седан для города и поездок",
            "fr": "Berline confortable et economique pour ville et cote"
        },
        "description": {
            "en": "The Hyundai Elantra CN7 delivers outstanding fuel economy, modern cockpit technology, and smooth driving along Hurghada.",
            "de": "Hervorragende Kraftstoffeffizienz und moderne Technologie.",
            "ru": "Отличная экономичность и современные технологии.",
            "fr": "Excellente economie de carburant et cockpit moderne."
        },
        "textTopImage": {
            "en": "Economy Comfort Sedan",
            "de": "Wirtschaftliche Komfortlimousine",
            "ru": "Экономичный седан",
            "fr": "Berline economique"
        },
        "note": {
            "en": "1) Refundable security deposit of $200 required.\n2) Drivers must be at least 21 years old.\n3) Unlimited mileage inside Red Sea Governorate.",
            "de": "1) Kaution $200.\n2) Mindestalter 21 Jahre.\n3) Unbegrenzte Kilometer am Roten Meer.",
            "ru": "1) Залог $200.\n2) Возраст от 21 года.\n3) Безлимитный пробег по побережью.",
            "fr": "1) Caution $200.\n2) Age minimum 21 ans.\n3) Kilometrage illimite en mer Rouge."
        },
        "alert": {
            "en": "Special weekly rate: book 7 days and get 1 day free.",
            "de": "Wochen-Special: 7 Tage buchen, 1 Tag gratis.",
            "ru": "Спецпредложение: при бронировании на 7 дней 1 день бесплатно.",
            "fr": "Offre speciale: 7 jours reserves, 1 jour offert."
        },
        "basePriceUSD": 45.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Rental Duration", "de": "Mietdauer", "ru": "Срок аренды", "fr": "Duree de location" },
                "values": [
                    { "key": { "en": "1 to 3 Days", "de": "1 bis 3 Tage", "ru": "1-3 дня", "fr": "1 a 3 jours" }, "value": { "en": "$45 per day", "de": "$45 pro Tag", "ru": "$45 в день", "fr": "$45 par jour" } },
                    { "key": { "en": "4 to 7 Days", "de": "4 bis 7 Tage", "ru": "4-7 дней", "fr": "4 a 7 jours" }, "value": { "en": "$38 per day", "de": "$38 pro Tag", "ru": "$38 в день", "fr": "$38 par jour" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Vehicle Specifications", "de": "Fahrzeugspezifikationen", "ru": "Характеристики", "fr": "Specifications" },
                "values": [
                    { "name": { "en": "Transmission: Automatic Smartstream", "de": "Getriebe: Automatik", "ru": "КПП: Автомат Smartstream", "fr": "Boite: Automatique" } },
                    { "name": { "en": "Air Conditioning: Dual Zone Climate", "de": "Klimaanlage: 2-Zonen", "ru": "Кондиционер: двухзонный", "fr": "Climatisation: Bi-zone" } },
                    { "name": { "en": "Infotainment: Apple CarPlay & Android Auto", "de": "Infotainment: Apple CarPlay & Android", "ru": "Мультимедиа: Apple CarPlay и Android Auto", "fr": "Infodivertissement: Apple CarPlay & Android" } }
                ]
            }
        ]
    }

    print("Posting Car 3 (Hyundai Elantra)...")
    res_car3 = make_request("/services/subservices", method="POST", data=car_3_payload)
    car3_id = res_car3.get("data", {}).get("id")
    if car3_id:
        upload_images(car3_id, [
            "public/Services/carServices/f0db2556faea9c8a7b8af9ccbbdc284fba4a4207.png",
            "public/Services/carServices/2904766165ec95034637ec51e18a64da61ed29b3.png"
        ])

    # 2. Red Sea Real Estate (Penthouse already updated above, upload image + post 2nd property)
    print("Uploading images for Real Estate 1 (c1785ddb-9b0a-41ae-b993-1f62a657b456)...")
    upload_images("c1785ddb-9b0a-41ae-b993-1f62a657b456", [
        "public/Services/RealEstate/87871600177d8e1c7fa1f6efeb42de7a23897951.jpg",
        "public/Services/RealEstate/hero.png"
    ])

    re_2_payload = {
        "serviceId": REAL_ESTATE_PARENT,
        "title": {
            "en": "Long Beach Resort Seafront Suite",
            "de": "Long Beach Resort Seafront Suite",
            "ru": "Seafront Suite в Long Beach Resort",
            "fr": "Suite Front de Mer Long Beach Resort"
        },
        "subtitle": {
            "en": "Direct Beachfront Resort Residence with Panoramic Sea Views",
            "de": "Direkt am Strand gelegene Resort-Residenz mit Meerblick",
            "ru": "Апартаменты на первой линии пляжа с панорамным видом на море",
            "fr": "Residence de villegiature en bord de mer avec vue panoramique"
        },
        "description": {
            "en": "Exclusive seaside suite inside the Long Beach Resort complex with panoramic Red Sea views, private beach access, multi-pool lagoons, and resort amenities.",
            "de": "Exklusive Strand-Suite im Long Beach Resort mit Panoramablick.",
            "ru": "Эксклюзивные апартаменты в комплексе Long Beach Resort с панорамным видом.",
            "fr": "Suite exclusive en front de mer dans le complexe Long Beach Resort."
        },
        "textTopImage": {
            "en": "Seafront Beach Residence",
            "de": "Strandresidenz am Meer",
            "ru": "Резиденция у моря",
            "fr": "Residence front de mer"
        },
        "note": {
            "en": "1) Direct resort access card and beach towel card provided upon arrival.\n2) Minimum stay requirement: 2 nights.\n3) Housekeeping provided every 3 days.",
            "de": "1) Resort-Ausweis bei Ankunft.\n2) Mindestaufenthalt: 2 Naechte.\n3) Zimmerservice alle 3 Tage.",
            "ru": "1) Карты курорта при заезде.\n2) Минимум 2 ночи.\n3) Уборка каждые 3 дня.",
            "fr": "1) Carte d'acces fournie a l'arrivee.\n2) Minimum 2 nuits.\n3) Menage tous les 3 jours."
        },
        "alert": {
            "en": "Private beach loungers and free resort lagoon pool access included for all registered guests.",
            "de": "Strandliegen und Zugang zu den Lagunenpools inklusive.",
            "ru": "Шезлонги и бассейны-лагуны включены.",
            "fr": "Transats et piscines lagons inclus."
        },
        "basePriceUSD": 75.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Length of Stay", "de": "Aufenthaltsdauer", "ru": "Срок проживания", "fr": "Duree du sejour" },
                "values": [
                    { "key": { "en": "Standard Nightly Rate", "de": "Standard-Nachtpreis", "ru": "Стандартная цена за ночь", "fr": "Tarif par nuit" }, "value": { "en": "$75 per night", "de": "$75 pro Nacht", "ru": "$75 за ночь", "fr": "$75 par nuit" } },
                    { "key": { "en": "7+ Nights Discount", "de": "Ab 7 Naechten", "ru": "От 7 ночей", "fr": "7+ nuits" }, "value": { "en": "$65 per night (Save 13%)", "de": "$65 pro Nacht (-13%)", "ru": "$65 за ночь (скидка 13%)", "fr": "$65 par nuit (-13%)" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Resort Facilities & Specs", "de": "Resort-Ausstattung", "ru": "Удобства и параметры", "fr": "Equipements" },
                "values": [
                    { "name": { "en": "Location: Long Beach Coastline, Hurghada", "de": "Lage: Long Beach Kueste", "ru": "Район: побережье Лонг Бич", "fr": "Lieu: Long Beach Coastline" } },
                    { "name": { "en": "Suite: 1 Bedroom + Living Lounge (65 sqm)", "de": "Suite: 1 Schlafzimmer + Wohnzimmer (65 qm)", "ru": "1 спальня + гостиная (65 кв.м)", "fr": "Suite: 1 chambre + salon (65 m²)" } },
                    { "name": { "en": "Private Sandy Beach Access (150m)", "de": "Privater Sandstrandzugang (150m)", "ru": "Частный песчаный пляж (150 м)", "fr": "Plage de sable privee (150m)" } }
                ]
            }
        ]
    }

    print("Posting Real Estate 2 (Long Beach Resort)...")
    res_re2 = make_request("/services/subservices", method="POST", data=re_2_payload)
    re2_id = res_re2.get("data", {}).get("id")
    if re2_id:
        upload_images(re2_id, [
            "public/Services/RealEstate/hero.png",
            "public/Services/RealEstate/87871600177d8e1c7fa1f6efeb42de7a23897951.jpg"
        ])

    # 3. VIP Airport Services
    vip_1_payload = {
        "serviceId": VIP_AIRPORT_PARENT,
        "title": {
            "en": "VIP Fast Track & Lounge (Terminal 1)",
            "de": "VIP Fast Track & Lounge (Terminal 1)",
            "ru": "VIP Fast Track и бизнес-зал (Терминал 1)",
            "fr": "VIP Fast Track et Salon (Terminal 1)"
        },
        "subtitle": {
            "en": "Priority Clearance and First-Class Lounge Comfort",
            "de": "Bevorzugte Abfertigung und erstklassiger Lounge-Komfort",
            "ru": "Приоритетный контроль и комфорт бизнес-зала",
            "fr": "Acces prioritaire et confort du salon"
        },
        "description": {
            "en": "Arrive or depart with absolute peace of mind. Skip queues with dedicated priority immigration and relax in our quiet first-class lounge featuring a buffet, Wi-Fi, and refreshments.",
            "de": "Reisen Sie entspannt an oder ab. Umgehen Sie Warteschlangen mit separater Passkontrolle.",
            "ru": "Прибывайте или вылетайте с максимальным комфортом без очередей.",
            "fr": "Arrivez ou partez en toute serenite sans files d'attente."
        },
        "textTopImage": {
            "en": "Terminal 1 Priority Service",
            "de": "Terminal 1 Prioritaetsservice",
            "ru": "Приоритет Терминал 1",
            "fr": "Service prioritaire Terminal 1"
        },
        "note": {
            "en": "1) Please provide your flight number and scheduled time at least 12 hours before arrival/departure.\n2) Children under 2 years of age enter free of charge when accompanied by a paying adult.\n3) Lounge stay is valid for up to 3 hours prior to scheduled departure.",
            "de": "1) Flugnummer mindestens 12 Stunden vor Abflug angeben.\n2) Kinder unter 2 Jahren frei.\n3) Lounge-Aufenthalt bis zu 3 Stunden.",
            "ru": "1) Номер рейса минимум за 12 часов.\n2) Дети до 2 лет бесплатно.\n3) Пребывание в зале до 3 часов.",
            "fr": "1) Numero de vol 12 heures a l'avance.\n2) Moins de 2 ans gratuit.\n3) Acces au salon 3 heures."
        },
        "alert": {
            "en": "Dedicated airport representative meets you at the entrance with your name placard.",
            "de": "Flughafenmitarbeiter erwartet Sie mit Namensschild.",
            "ru": "Сотрудник аэропорта встречает вас с именной табличкой.",
            "fr": "Un representant vous accueille avec une pancarte a votre nom."
        },
        "basePriceUSD": 65.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Passenger Category", "de": "Passagierkategorie", "ru": "Категория пассажира", "fr": "Categorie de passager" },
                "values": [
                    { "key": { "en": "Adult Pass (12+)", "de": "Erwachsener (12+)", "ru": "Взрослый (12+)", "fr": "Adulte (12+)" }, "value": { "en": "$65 per person", "de": "$65 pro Person", "ru": "$65 с человека", "fr": "$65 par personne" } },
                    { "key": { "en": "Child Pass (2-11)", "de": "Kind (2-11)", "ru": "Ребенок (2-11)", "fr": "Enfant (2-11)" }, "value": { "en": "$35 per child", "de": "$35 pro Kind", "ru": "$35 за ребенка", "fr": "$35 par enfant" } },
                    { "key": { "en": "Infant (Under 2)", "de": "Kleinkind (unter 2)", "ru": "Младенец (до 2)", "fr": "Bebe (moins de 2)" }, "value": { "en": "Complimentary", "de": "Kostenlos", "ru": "Бесплатно", "fr": "Gratuit" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Service Scope", "de": "Serviceumfang", "ru": "Объем услуги", "fr": "Prestations" },
                "values": [
                    { "name": { "en": "Terminal 1 Hurghada Airport", "de": "Terminal 1 Flughafen Hurghada", "ru": "Терминал 1 аэропорта Хургады", "fr": "Terminal 1 Aeroport Hurghada" } },
                    { "name": { "en": "Fast-Track Passport Control", "de": "Schnelle Passkontrolle", "ru": "Ускоренный паспортный контроль", "fr": "Controle coupe-file" } },
                    { "name": { "en": "VIP Lounge Access (3h)", "de": "VIP-Lounge-Zugang (3 Std.)", "ru": "Доступ в VIP-зал (3 часа)", "fr": "Acces salon VIP (3h)" } },
                    { "name": { "en": "Buffet & Soft Drinks Included", "de": "Buffet und Getraenke inklusive", "ru": "Шведский стол и напитки", "fr": "Buffet et boissons inclus" } }
                ]
            }
        ]
    }

    print("Updating VIP Airport 1 (ddee2801-008c-4f7b-b33e-ddbcf6780889)...")
    make_request("/services/subservices/ddee2801-008c-4f7b-b33e-ddbcf6780889", method="PUT", data=vip_1_payload)
    upload_images("ddee2801-008c-4f7b-b33e-ddbcf6780889", [
        "public/Services/Vip-airport/08fce0cae9cd55f0000c966353fe2589e26ed61f.png",
        "public/Services/Vip-airport/hero.png"
    ])

    vip_2_payload = {
        "serviceId": VIP_AIRPORT_PARENT,
        "title": {
            "en": "VIP Fast Track & Meet and Assist (Terminal 2)",
            "de": "VIP Fast Track & Meet and Assist (Terminal 2)",
            "ru": "VIP Fast Track и сопровождение (Терминал 2)",
            "fr": "VIP Fast Track et Assistance (Terminal 2)"
        },
        "subtitle": {
            "en": "Expedited Escort and Luggage Porterage at Terminal 2",
            "de": "Beschleunigte Begleitung und Gepaeckservice am Terminal 2",
            "ru": "Ускоренное сопровождение и помощь с багажом в Терминале 2",
            "fr": "Escorte acceleree et portage des bagages au Terminal 2"
        },
        "description": {
            "en": "Expedited escort through customs and passport control at Hurghada Terminal 2 with dedicated porter support from gate to your ground transport.",
            "de": "Beschleunigte Begleitung durch Zoll und Passkontrolle am Terminal 2.",
            "ru": "Персональное сопровождение через паспортный контроль в Терминале 2.",
            "fr": "Escorte acceleree aux douanes et au controle des passeports au Terminal 2."
        },
        "textTopImage": {
            "en": "Terminal 2 Fast Track",
            "de": "Terminal 2 Schnellabfertigung",
            "ru": "Ускоренный контроль Терминал 2",
            "fr": "Acces rapide Terminal 2"
        },
        "note": {
            "en": "1) Meeting point is directly at the aircraft gate or main airport entrance.\n2) Porter luggage handling is included up to 3 bags per passenger.\n3) 24/7 dispatch phone support is provided.",
            "de": "1) Treffpunkt am Flugzeugausstieg oder Haupteingang.\n2) Gepaeckservice bis 3 Koffer.\n3) 24/7 telefonischer Support.",
            "ru": "1) Встреча у выхода из самолета или входа.\n2) Носильщик до 3 сумок.\n3) Круглосуточная поддержка по телефону.",
            "fr": "1) Point de rencontre a la porte de l'avion ou a l'entree.\n2) Portage inclus jusqu'a 3 valises.\n3) Assistance 24/7 par telephone."
        },
        "alert": {
            "en": "Please provide flight number and arrival time at least 6 hours in advance.",
            "de": "Flugnummer mindestens 6 Stunden im Voraus angeben.",
            "ru": "Номер рейса и время прибытия минимум за 6 часов.",
            "fr": "Numero de vol et heure d'arrivee au moins 6h a l'avance."
        },
        "basePriceUSD": 45.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Service Direction", "de": "Servicerichtung", "ru": "Направление", "fr": "Direction du service" },
                "values": [
                    { "key": { "en": "Arrival Escort", "de": "Ankunftsbegleitung", "ru": "Встреча (прилет)", "fr": "Arrivee" }, "value": { "en": "$45 per person", "de": "$45 pro Person", "ru": "$45 с человека", "fr": "$45 par personne" } },
                    { "key": { "en": "Departure Escort", "de": "Abflugbegleitung", "ru": "Проводы (вылет)", "fr": "Depart" }, "value": { "en": "$45 per person", "de": "$45 pro Person", "ru": "$45 с человека", "fr": "$45 par personne" } },
                    { "key": { "en": "Roundtrip (Arrival + Departure)", "de": "Hin- und Rueckreise", "ru": "Туда и обратно", "fr": "Aller-retour" }, "value": { "en": "$80 special package", "de": "$80 Sonderpaket", "ru": "$80 спецпакет", "fr": "$80 forfait special" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Included Amenities", "de": "Inbegriffene Leistungen", "ru": "Включено", "fr": "Prestations incluses" },
                "values": [
                    { "name": { "en": "Hurghada Airport Terminal 2", "de": "Flughafen Hurghada Terminal 2", "ru": "Аэропорт Хургада Терминал 2", "fr": "Aeroport Hurghada Terminal 2" } },
                    { "name": { "en": "Priority Security & Passport Stamping", "de": "Prioritaere Sicherheits- und Passkontrolle", "ru": "Приоритетный досмотр и паспортный контроль", "fr": "Securite et tampon prioritaires" } },
                    { "name": { "en": "Dedicated Luggage Porterage", "de": "Persoenlicher Gepaecktraeger", "ru": "Помощь носильщика с багажом", "fr": "Porteur de bagages dedie" } }
                ]
            }
        ]
    }

    print("Posting VIP Airport 2 (Terminal 2)...")
    res_vip2 = make_request("/services/subservices", method="POST", data=vip_2_payload)
    vip2_id = res_vip2.get("data", {}).get("id")
    if vip2_id:
        upload_images(vip2_id, [
            "public/Services/Vip-airport/hero.png",
            "public/Services/Vip-airport/08fce0cae9cd55f0000c966353fe2589e26ed61f.png"
        ])

    # 4. Tourist Services
    tourist_1_payload = {
        "serviceId": TOURIST_SERVICES_PARENT,
        "title": {
            "en": "Personal Translator & Multilingual Local Guide",
            "de": "Persoenlicher Uebersetzer & Lokaler Reiseleiter",
            "ru": "Персональный переводчик и местный гид",
            "fr": "Traducteur Personnel et Guide Local Multilingue"
        },
        "subtitle": {
            "en": "Certified Language Assistance for Shopping, Clinics & Exploring",
            "de": "Zertifizierte Sprachbegleitung fuer Shopping, Kliniken & Ausfluege",
            "ru": "Сертифицированная языковая помощь для покупок, клиник и экскурсий",
            "fr": "Assistance linguistique certifiee pour shopping, soins et excursions"
        },
        "description": {
            "en": "Professional certified language assistance and cultural guiding across Hurghada, El Gouna, and Luxor. We bridge communication for shopping, medical visits, and private excursions.",
            "de": "Professionelle Sprachbegleitung und kulturelle Fuehrung in Hurghada, El Gouna und Luxor.",
            "ru": "Профессиональный перевод и сопровождение в Хургаде, Эль Гуне и Луксоре.",
            "fr": "Assistance linguistique professionnelle et guidage culturel a Hurghada, El Gouna et Louxor."
        },
        "textTopImage": {
            "en": "Multilingual Guide (EN / DE / RU / FR)",
            "de": "Mehrsprachiger Guide",
            "ru": "Многоязычный гид",
            "fr": "Guide multilingue"
        },
        "note": {
            "en": "1) Guide transportation within Hurghada city center is included.\n2) For destinations outside central Hurghada (El Gouna, Soma Bay, Safaga), a $10 transfer surcharge applies.\n3) Minimum booking duration is 2 consecutive hours.",
            "de": "1) Anfahrt im Stadtzentrum inbegriffen.\n2) Ausserhalb des Zentrums zzgl. $10.\n3) Mindestdauer: 2 Stunden.",
            "ru": "1) Проезд гида по центру включен.\n2) За пределы центра +$10.\n3) Минимум 2 часа.",
            "fr": "1) Deplacement inclus au centre.\n2) Hors centre supplement de $10.\n3) Minimum 2 heures."
        },
        "alert": {
            "en": "Advance booking of at least 4 hours is recommended for specific foreign language requests.",
            "de": "Vorabreservierung von mindestens 4 Stunden empfohlen.",
            "ru": "Рекомендуется бронировать минимум за 4 часа.",
            "fr": "Reservation conseillee au moins 4 heures a l'avance."
        },
        "basePriceUSD": 25.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Duration Packages", "de": "Dauerpakete", "ru": "Пакеты по времени", "fr": "Forfaits de duree" },
                "values": [
                    { "key": { "en": "Hourly Rate (Min 2h)", "de": "Stundensatz (ab 2 Std.)", "ru": "Почасовая оплата (от 2 ч)", "fr": "Tarif horaire (min 2h)" }, "value": { "en": "$25 per hour", "de": "$25 pro Stunde", "ru": "$25 в час", "fr": "$25 par heure" } },
                    { "key": { "en": "Half-Day Package (4 Hours)", "de": "Halbtagspaket (4 Stunden)", "ru": "Полдня (4 часа)", "fr": "Forfait demi-journee (4h)" }, "value": { "en": "$85 flat package", "de": "$85 Pauschale", "ru": "$85 фиксированный пакет", "fr": "$85 forfait fixe" } },
                    { "key": { "en": "Full-Day Escort (8 Hours)", "de": "Ganztagsbegleitung (8 Stunden)", "ru": "Полный день (8 часов)", "fr": "Journee complete (8h)" }, "value": { "en": "$150 flat package", "de": "$150 Pauschale", "ru": "$150 фиксированный пакет", "fr": "$150 forfait fixe" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Guiding Qualifications", "de": "Qualifikationen", "ru": "Квалификация", "fr": "Qualifications" },
                "values": [
                    { "name": { "en": "Fluent Languages: English, German, Russian, French, Arabic", "de": "Sprachen: Englisch, Deutsch, Russisch, Franzoesisch, Arabisch", "ru": "Языки: английский, немецкий, русский, французский, арабский", "fr": "Langues: anglais, allemand, russe, francais, arabe" } },
                    { "name": { "en": "Official Ministry Tourism License", "de": "Offizielle Tourismuslizenz", "ru": "Официальная лицензия Министерства туризма", "fr": "Licence officielle de tourisme" } },
                    { "name": { "en": "Bazaar Price Negotiation Expertise", "de": "Verhandlungsgeschick auf dem Basar", "ru": "Помощь в торге на базарах", "fr": "Expertise negociation bazars" } }
                ]
            }
        ]
    }

    print("Posting Tourist Service 1 (Personal Translator)...")
    res_tour1 = make_request("/services/subservices", method="POST", data=tourist_1_payload)
    tour1_id = res_tour1.get("data", {}).get("id")
    if tour1_id:
        upload_images(tour1_id, [
            "public/Services/Touristservices/eec14d086d4c28248eb2587d5080add1f603096c.png",
            "public/Services/Touristservices/hero.png"
        ])

    tourist_2_payload = {
        "serviceId": TOURIST_SERVICES_PARENT,
        "title": {
            "en": "Private Egyptologist Guide & Cultural Tour",
            "de": "Privater Aegyptologe & Kulturreiseleiter",
            "ru": "Частный гид-египтолог и культурный тур",
            "fr": "Guide Egyptologue Prive et Visite Culturelle"
        },
        "subtitle": {
            "en": "Academic Historical Guiding to Ancient Temples & Historic Sites",
            "de": "Akademische historische Fuehrungen zu Tempeln und Staetten",
            "ru": "Профессиональные исторические экскурсии по храмам и музеям",
            "fr": "Guidage historique et universitaire des temples et sites antiques"
        },
        "description": {
            "en": "Discover the captivating history of ancient Egypt with a certified university Egyptologist. Private personalized storytelling for Luxor, Cairo, Hurghada Museum, and Old Town.",
            "de": "Erleben Sie die Geschichte des alten Aegyptens mit einem Aegyptologen.",
            "ru": "Познакомьтесь с историей Древнего Египта с профессиональным египтологом.",
            "fr": "Decouvrez l'histoire fascinante de l'Egypte antique avec un egyptologue certifie."
        },
        "textTopImage": {
            "en": "Certified University Egyptologist",
            "de": "Zertifizierter Aegyptologe",
            "ru": "Дипломированный египтолог",
            "fr": "Egyptologue certifie"
        },
        "note": {
            "en": "1) Museum and temple entrance tickets are purchased separately at venue gates.\n2) Tailor-made itineraries can be customized according to your interests.\n3) Available in English, German, French, and Russian.",
            "de": "1) Eintrittskarten separat erhaeltlich.\n2) Individuelle Routen moeglich.\n3) Verfuegbar auf Deutsch, Englisch, Franzoesisch und Russisch.",
            "ru": "1) Билеты в музеи приобретаются отдельно.\n2) Индивидуальный маршрут.\n3) Доступно на русском, английском, немецком, французском.",
            "fr": "1) Billets d'entree a regler sur place.\n2) Itineraires sur mesure.\n3) Disponible en francais, anglais, allemand, russe."
        },
        "alert": {
            "en": "Private museum transport can be arranged upon request with luxury Mercedes van.",
            "de": "Privater Transfer mit Mercedes-Van auf Wunsch zubuchbar.",
            "ru": "Частный трансфер на Mercedes по запросу.",
            "fr": "Transport prive en van Mercedes sur demande."
        },
        "basePriceUSD": 40.0,
        "isActive": True,
        "options": [
            {
                "name": { "en": "Tour Format", "de": "Tour-Format", "ru": "Формат экскурсии", "fr": "Format de visite" },
                "values": [
                    { "key": { "en": "Hurghada City & Museum (3 Hours)", "de": "Hurghada Stadt & Museum (3 Std.)", "ru": "Хургада и музей (3 ч)", "fr": "Hurghada ville et musee (3h)" }, "value": { "en": "$100 flat group rate", "de": "$100 Gruppenpauschale", "ru": "$100 за группу", "fr": "$100 forfait groupe" } },
                    { "key": { "en": "Full-Day Luxor Escort (12 Hours)", "de": "Ganztagesbegleitung Luxor (12 Std.)", "ru": "Луксор на весь день (12 ч)", "fr": "Journee complete a Louxor (12h)" }, "value": { "en": "$220 flat private rate", "de": "$220 private Pauschale", "ru": "$220 частный тур", "fr": "$220 forfait prive" } }
                ]
            }
        ],
        "features": [
            {
                "name": { "en": "Academic Credentials", "de": "Fachqualifikationen", "ru": "Квалификация", "fr": "Titres universitaires" },
                "values": [
                    { "name": { "en": "Degree in Egyptology & Archaeology", "de": "Abschluss in Aegyptologie", "ru": "Диплом по египтологии и археологии", "fr": "Diplome en egyptologie" } },
                    { "name": { "en": "10+ Years Professional Guiding Experience", "de": "Ueber 10 Jahre Erfahrung", "ru": "Более 10 лет опыта работы гидом", "fr": "Plus de 10 ans d'experience" } }
                ]
            }
        ]
    }

    print("Posting Tourist Service 2 (Egyptologist)...")
    res_tour2 = make_request("/services/subservices", method="POST", data=tourist_2_payload)
    tour2_id = res_tour2.get("data", {}).get("id")
    if tour2_id:
        upload_images(tour2_id, [
            "public/Services/Touristservices/hero.png",
            "public/Services/Touristservices/eec14d086d4c28248eb2587d5080add1f603096c.png"
        ])

    print("=== All items seeded! Verifying backend... ===")
    all_items = make_request("/services/subservices?pageSize=100")
    items = all_items.get("data", {}).get("items", [])
    print(f"Total Subservices now in backend: {len(items)}")
    for it in items:
        opts = len(it.get("options") or [])
        feats = len(it.get("features") or [])
        imgs = len(it.get("images") or [])
        print(f"  [{it.get('id')}] {it.get('title')} | Options: {opts} | Features: {feats} | Images: {imgs}")

if __name__ == "__main__":
    run_seeding()

