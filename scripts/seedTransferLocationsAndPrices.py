import json
import urllib.request
import urllib.error

API_BASE = "https://touristtt.runasp.net/api"
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

def api_call(path, method="GET", payload=None):
    url = f"{API_BASE}{path}"
    data = json.dumps(payload).encode("utf-8") if payload else None
    req = urllib.request.Request(url, data=data, headers=HEADERS, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode("utf-8")
            return json.loads(content) if content else {}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8")
        print(f"HTTPError {e.code} on {method} {path}: {err_msg}")
        return None
    except Exception as e:
        print(f"Exception on {method} {path}: {e}")
        return None

def main():
    print("--- 1. Aligning Vehicle Types ---")
    vt_res = api_call("/vehicle-type-transfers?pageSize=50")
    vehicle_types = vt_res.get("items", []) if vt_res else []
    print(f"Found {len(vehicle_types)} existing vehicle types.")

    car_id = None
    van_id = None
    bus_id = None

    for vt in vehicle_types:
        v_id = vt.get("id")
        to_p = vt.get("toPerson", 0)
        from_p = vt.get("fromPerson", 0)

        if to_p <= 3 or "car" in vt.get("name", "").lower():
            car_id = v_id
            print(f"Updating Car ({v_id})...")
            api_call(f"/vehicle-type-transfers/{v_id}", method="PUT", payload={
                "name": {
                    "en": "Standard Sedan / Car",
                    "ru": "Стандартный седан / Авто",
                    "de": "Standard-Limousine / Auto",
                    "fr": "Berline standard / Voiture"
                },
                "fromPerson": 1,
                "toPerson": 3,
                "additionalHoursUsd": 10.0,
                "discountPercentage": 15.0
            })
        elif to_p <= 9 or "microbus" in vt.get("name", "").lower() or "van" in vt.get("name", "").lower():
            van_id = v_id
            print(f"Updating Minivan/Microbus ({v_id})...")
            api_call(f"/vehicle-type-transfers/{v_id}", method="PUT", payload={
                "name": {
                    "en": "Minivan / Microbus",
                    "ru": "Минивэн / Микроавтобус",
                    "de": "Minivan / Kleinbus",
                    "fr": "Monospace / Minibus"
                },
                "fromPerson": 4,
                "toPerson": 9,
                "additionalHoursUsd": 12.0,
                "discountPercentage": 15.0
            })
        elif to_p > 9 or "bus" in vt.get("name", "").lower() or "string" in vt.get("name", "").lower():
            bus_id = v_id
            print(f"Updating Tour Bus ({v_id})...")
            api_call(f"/vehicle-type-transfers/{v_id}", method="PUT", payload={
                "name": {
                    "en": "Tour Bus / Coach",
                    "ru": "Туристический автобус",
                    "de": "Reisebus",
                    "fr": "Autocar de tourisme"
                },
                "fromPerson": 10,
                "toPerson": 35,
                "additionalHoursUsd": 18.0,
                "discountPercentage": 10.0
            })

    print(f"Vehicle Type IDs - Car: {car_id}, Van: {van_id}, Bus: {bus_id}")

    print("\n--- 2. Seeding Departure Locations (Transfer From) ---")
    from_definitions = [
        {
            "en": "Hurghada International Airport (HRG)",
            "ru": "Международный аэропорт Хургада (HRG)",
            "de": "Internationaler Flughafen Hurghada (HRG)",
            "fr": "Aéroport international de Hurghada (HRG)"
        },
        {
            "en": "Makadi Bay Hotels & Resorts",
            "ru": "Отели и курорты Макади Бэй",
            "de": "Hotels und Resorts in Makadi Bay",
            "fr": "Hôtels et complexes de Makadi Bay"
        },
        {
            "en": "El Gouna Marina & Town",
            "ru": "Эль-Гуна Марина и Город",
            "de": "El Gouna Marina & Stadt",
            "fr": "Marina et ville d'El Gouna"
        },
        {
            "en": "Sahl Hasheesh Old Town & Resorts",
            "ru": "Сахл Хашиш Старый Город и Курорты",
            "de": "Sahl Hasheesh Altstadt und Resorts",
            "fr": "Vieille ville et complexes de Sahl Hasheesh"
        },
        {
            "en": "Hurghada Downtown & Sheraton Road",
            "ru": "Центр Хургады и улица Шератон",
            "de": "Hurghada Innenstadt & Sheraton Road",
            "fr": "Centre-ville d'Hurghada et route Sheraton"
        },
        {
            "en": "Soma Bay Luxury Resorts",
            "ru": "Роскошные курорты Сома Бэй",
            "de": "Soma Bay Luxusresorts",
            "fr": "Complexes hôteliers de luxe de Soma Bay"
        }
    ]

    existing_from_res = api_call("/transfer-from-locations?pageSize=50")
    existing_from = existing_from_res.get("data", {}).get("items", []) if existing_from_res else []
    from_map = {}

    for idx, fdef in enumerate(from_definitions):
        name_en = fdef["en"]
        if idx < len(existing_from):
            item_id = existing_from[idx]["id"]
            print(f"Updating existing From location {item_id} -> {name_en}...")
            api_call(f"/transfer-from-locations/{item_id}", method="PUT", payload={"name": fdef})
            from_map[name_en] = item_id
        else:
            match = next((e for e in existing_from if name_en.lower() in (e.get("name") or "").lower()), None)
            if match:
                from_map[name_en] = match["id"]
                print(f"From location '{name_en}' already exists: {match['id']}")
            else:
                print(f"Creating From location '{name_en}'...")
                res = api_call("/transfer-from-locations", method="POST", payload={"name": fdef})
                if res and "data" in res and res["data"]:
                    from_map[name_en] = res["data"]["id"]
                elif res and "id" in res:
                    from_map[name_en] = res["id"]

    print("\n--- 3. Seeding Destination Locations (Transfer To) ---")
    to_definitions = [
        {
            "en": "Hurghada Senzo Mall",
            "ru": "Торговый центр Сензо Молл Хургада",
            "de": "Hurghada Senzo Mall",
            "fr": "Centre commercial Senzo Mall Hurghada"
        },
        {
            "en": "Makadi Dolphin World",
            "ru": "Дельфинарий Макади Дельфин Ворлд",
            "de": "Makadi Dolphin World",
            "fr": "Monde des Dauphins de Makadi"
        },
        {
            "en": "Hurghada Grand Aquarium",
            "ru": "Большой аквариум Хургады",
            "de": "Großes Aquarium von Hurghada",
            "fr": "Grand Aquarium d'Hurghada"
        },
        {
            "en": "Hurghada Marina Boulevard",
            "ru": "Набережная Марина Бульвар Хургада",
            "de": "Hurghada Marina Boulevard",
            "fr": "Boulevard de la Marina d'Hurghada"
        },
        {
            "en": "Desert Rose & Dana Beach Resorts Area",
            "ru": "Район отелей Дезерт Роуз и Дана Бич",
            "de": "Hotelbereich Desert Rose & Dana Beach",
            "fr": "Zone hôtelière Desert Rose & Dana Beach"
        },
        {
            "en": "El Gouna Golf & Lagoon Promenade",
            "ru": "Эль-Гуна Гольф и Лагунная Набережная",
            "de": "El Gouna Golf & Lagunenpromenade",
            "fr": "Golf et promenade de la lagune d'El Gouna"
        }
    ]

    existing_to_res = api_call("/transfer-to-locations?pageSize=50")
    existing_to = existing_to_res.get("data", {}).get("items", []) if existing_to_res else []
    to_map = {}

    for idx, tdef in enumerate(to_definitions):
        name_en = tdef["en"]
        if idx < len(existing_to):
            item_id = existing_to[idx]["id"]
            print(f"Updating existing To location {item_id} -> {name_en}...")
            api_call(f"/transfer-to-locations/{item_id}", method="PUT", payload={"name": tdef})
            to_map[name_en] = item_id
        else:
            match = next((e for e in existing_to if name_en.lower() in (e.get("name") or "").lower()), None)
            if match:
                to_map[name_en] = match["id"]
                print(f"To location '{name_en}' already exists: {match['id']}")
            else:
                print(f"Creating To location '{name_en}'...")
                res = api_call("/transfer-to-locations", method="POST", payload={"name": tdef})
                if res and "data" in res and res["data"]:
                    to_map[name_en] = res["data"]["id"]
                elif res and "id" in res:
                    to_map[name_en] = res["id"]

    # Refresh map from server
    fresh_from = api_call("/transfer-from-locations?pageSize=50").get("data", {}).get("items", [])
    for f in fresh_from:
        from_map[f.get("name", "")] = f.get("id")

    fresh_to = api_call("/transfer-to-locations?pageSize=50").get("data", {}).get("items", [])
    for t in fresh_to:
        to_map[t.get("name", "")] = t.get("id")

    print("\n--- 4. Seeding Route Prices ---")
    prices_to_seed = [
        # Airport -> Makadi
        ("Hurghada International Airport (HRG)", "Makadi Dolphin World", car_id, 25.0),
        ("Hurghada International Airport (HRG)", "Makadi Dolphin World", van_id, 40.0),
        ("Hurghada International Airport (HRG)", "Makadi Dolphin World", bus_id, 85.0),
        # Airport -> Senzo Mall
        ("Hurghada International Airport (HRG)", "Hurghada Senzo Mall", car_id, 20.0),
        ("Hurghada International Airport (HRG)", "Hurghada Senzo Mall", van_id, 32.0),
        # Airport -> El Gouna
        ("Hurghada International Airport (HRG)", "El Gouna Golf & Lagoon Promenade", car_id, 30.0),
        ("Hurghada International Airport (HRG)", "El Gouna Golf & Lagoon Promenade", van_id, 48.0),
        # Makadi Bay -> Senzo Mall
        ("Makadi Bay Hotels & Resorts", "Hurghada Senzo Mall", car_id, 18.0),
        ("Makadi Bay Hotels & Resorts", "Hurghada Senzo Mall", van_id, 28.0),
        # Makadi Bay -> Aquarium
        ("Makadi Bay Hotels & Resorts", "Hurghada Grand Aquarium", car_id, 22.0),
        # Downtown -> Marina
        ("Hurghada Downtown & Sheraton Road", "Hurghada Marina Boulevard", car_id, 12.0),
        ("Hurghada Downtown & Sheraton Road", "Hurghada Marina Boulevard", van_id, 20.0),
        # Sahl Hasheesh -> Aquarium
        ("Sahl Hasheesh Old Town & Resorts", "Hurghada Grand Aquarium", car_id, 20.0),
        # Soma Bay -> Senzo Mall
        ("Soma Bay Luxury Resorts", "Hurghada Senzo Mall", car_id, 35.0),
    ]

    existing_prices_res = api_call("/transfer-vehicle-prices?pageSize=100")
    existing_prices = existing_prices_res.get("items", []) if existing_prices_res else []
    print(f"Existing route prices: {len(existing_prices)}")

    created_count = 0
    for from_name, to_name, v_id, price in prices_to_seed:
        f_id = from_map.get(from_name)
        t_id = to_map.get(to_name)
        if not f_id or not t_id or not v_id:
            print(f"Skipping ({from_name} -> {to_name}): missing ID (From:{f_id}, To:{t_id}, Veh:{v_id})")
            continue

        exists = any(
            p.get("fromId") == f_id and p.get("toId") == t_id and p.get("vehicleTypeTransferId") == v_id
            for p in existing_prices
        )
        if exists:
            print(f"Route already priced: {from_name} -> {to_name} (${price})")
            continue

        print(f"Creating route price: {from_name} -> {to_name} (${price} USD)...")
        res = api_call("/transfer-vehicle-prices", method="POST", payload={
            "vehicleTypeTransferId": v_id,
            "fromId": f_id,
            "toId": t_id,
            "priceUsd": price
        })
        if res:
            created_count += 1

    print(f"\n--- Seeding Complete! Created {created_count} new route prices. ---")

if __name__ == "__main__":
    main()

