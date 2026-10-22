now we need to create a full plan so that we could create the admin page for the private excursions could you create a plan for it like the rest of things we did note that the services we serach from should be the ExcursionServices and the attractoin should be from the Attractions could you now create a plan?
PrivateExcursions


POST
/api/private-excursions


Parameters
Cancel
Reset
Name	Description
lang
string
(query)
lang
Request body

application/json
{
  "slug": "private-dolphin-house-speed-boat-trip",
  "categoryId": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
  "adultPriceUsd": 190,
  "childPriceUsd": 95,
  "infantPriceUsd": 0,
  "stars": "5",
  "maxAttractions": 3,
  "durationHours": 5,
  "videoUrl": "https://www.youtube.com/watch?v=privatedolphin",
  "isFeatured": true,
  "isActive": true,
  "title": {
    "en": "Private Dolphin House Speedboat & Snorkeling Trip",
    "ru": "Частная поездка на скоростном катере в Дольфин-Хаус и сноркелинг",
    "de": "Privates Schnellboot- und Schnorchelausflug zum Dolphin House",
    "fr": "Excursion privée en speedboat et snorkeling à Dolphin House"
  },
  "subtitle": {
    "en": "Swim with wild dolphins and explore secluded coral reefs in total privacy",
    "ru": "Плавайте с дикими дельфинами и исследуйте уединенные коралловые рифы в полной приватности",
    "de": "Schwimmen Sie mit wilden Delfinen und erkunden Sie abgelegene Korallenriffe",
    "fr": "Nagez avec des dauphins sauvages et explorez des récifs coralliens isolés"
  },
  "excursionType": {
    "en": "Private Boat Trip",
    "ru": "Частная поездка на лодке",
    "de": "Private Bootstour",
    "fr": "Excursion en bateau privé"
  },
  "shortDescription": {
    "en": "Take an exclusive private speedboat directly to the famous Dolphin House reef, avoid the crowds, and enjoy customized snorkeling stops with professional guidance.",
    "ru": "Отправляйтесь на эксклюзивном катере к знаменитому рифу Дольфин-Хаус без толпы туристов.",
    "de": "Fahren Sie mit einem exklusiven Schnellboot zum berühmten Dolphin House Riff.",
    "fr": "Prenez un speedboat privé exclusif vers le célèbre récif Dolphin House."
  },
  "fullProgram": {
    "en": "1. Private hotel pickup in an air-conditioned car.\n2. Board your private speedboat at the marina.\n3. High-speed cruise to the Dolphin House reef.\n4. Guided snorkeling sessions to swim near wild dolphins.\n5. Additional coral reef snorkeling stop.\n6. Return transfer to your hotel.",
    "ru": "1. Частный трансфер из отеля.\n2. Посадка на частный катер в марине.\n3. Поездка к рифу Дольфин-Хаус.\n4. Сноркелинг и плавание рядом с дельфинами.\n5. Дополнительная остановка у кораллового рифа.\n6. Возвращение в отель.",
    "de": "1. Private Hotelabholung im klimatisierten Auto.\n2. Einschiffung auf das private Schnellboot in der Marina.\n3. Fahrt zum Dolphin House Riff.\n4. Geführtes Schnorcheln mit Delfinen.\n5. Zusätzlicher Schnorchelstopp am Korallenriff.\n6. Rücktransfer zum Hotel.",
    "fr": "1. Prise en charge à l'hôtel en voiture climatisée.\n2. Embarquement à bord du speedboat privé.\n3. Croisière rapide vers le récif Dolphin House.\n4. Sessions de snorkeling guidées pour nager avec les dauphins.\n5. Arrêt de snorkeling supplémentaire.\n6. Transfert de retour à l'hôtel."
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/private-excursions' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "slug": "private-dolphin-house-speed-boat-trip",
  "categoryId": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
  "adultPriceUsd": 190,
  "childPriceUsd": 95,
  "infantPriceUsd": 0,
  "stars": "5",
  "maxAttractions": 3,
  "durationHours": 5,
  "videoUrl": "https://www.youtube.com/watch?v=privatedolphin",
  "isFeatured": true,
  "isActive": true,
  "title": {
    "en": "Private Dolphin House Speedboat & Snorkeling Trip",
    "ru": "Частная поездка на скоростном катере в Дольфин-Хаус и сноркелинг",
    "de": "Privates Schnellboot- und Schnorchelausflug zum Dolphin House",
    "fr": "Excursion privée en speedboat et snorkeling à Dolphin House"
  },
  "subtitle": {
    "en": "Swim with wild dolphins and explore secluded coral reefs in total privacy",
    "ru": "Плавайте с дикими дельфинами и исследуйте уединенные коралловые рифы в полной приватности",
    "de": "Schwimmen Sie mit wilden Delfinen und erkunden Sie abgelegene Korallenriffe",
    "fr": "Nagez avec des dauphins sauvages et explorez des récifs coralliens isolés"
  },
  "excursionType": {
    "en": "Private Boat Trip",
    "ru": "Частная поездка на лодке",
    "de": "Private Bootstour",
    "fr": "Excursion en bateau privé"
  },
  "shortDescription": {
    "en": "Take an exclusive private speedboat directly to the famous Dolphin House reef, avoid the crowds, and enjoy customized snorkeling stops with professional guidance.",
    "ru": "Отправляйтесь на эксклюзивном катере к знаменитому рифу Дольфин-Хаус без толпы туристов.",
    "de": "Fahren Sie mit einem exklusiven Schnellboot zum berühmten Dolphin House Riff.",
    "fr": "Prenez un speedboat privé exclusif vers le célèbre récif Dolphin House."
  },
  "fullProgram": {
    "en": "1. Private hotel pickup in an air-conditioned car.\n2. Board your private speedboat at the marina.\n3. High-speed cruise to the Dolphin House reef.\n4. Guided snorkeling sessions to swim near wild dolphins.\n5. Additional coral reef snorkeling stop.\n6. Return transfer to your hotel.",
    "ru": "1. Частный трансфер из отеля.\n2. Посадка на частный катер в марине.\n3. Поездка к рифу Дольфин-Хаус.\n4. Сноркелинг и плавание рядом с дельфинами.\n5. Дополнительная остановка у кораллового рифа.\n6. Возвращение в отель.",
    "de": "1. Private Hotelabholung im klimatisierten Auto.\n2. Einschiffung auf das private Schnellboot in der Marina.\n3. Fahrt zum Dolphin House Riff.\n4. Geführtes Schnorcheln mit Delfinen.\n5. Zusätzlicher Schnorchelstopp am Korallenriff.\n6. Rücktransfer zum Hotel.",
    "fr": "1. Prise en charge à l'\''hôtel en voiture climatisée.\n2. Embarquement à bord du speedboat privé.\n3. Croisière rapide vers le récif Dolphin House.\n4. Sessions de snorkeling guidées pour nager avec les dauphins.\n5. Arrêt de snorkeling supplémentaire.\n6. Transfert de retour à l'\''hôtel."
  }
}'
Request URL
https://touristtt.runasp.net/api/private-excursions
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Private excursion created successfully.",
  "data": {
    "fullProgram": "",
    "videoUrl": "https://www.youtube.com/watch?v=privatedolphin",
    "imageList": [],
    "faqs": [],
    "attractions": [],
    "services": [],
    "id": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "slug": "private-dolphin-house-speed-boat-trip",
    "title": "Private Dolphin House Speedboat & Snorkeling Trip",
    "subtitle": "Swim with wild dolphins and explore secluded coral reefs in total privacy",
    "shortDescription": "Take an exclusive private speedboat directly to the famous Dolphin House reef, avoid the crowds, and enjoy customized snorkeling stops with professional guidance.",
    "excursionType": "Private Boat Trip",
    "durationHours": 5,
    "stars": "5",
    "maxAttractions": 3,
    "primaryImageUrl": null,
    "categorySlug": "string123",
    "categoryTitle": "string123",
    "isFeatured": true,
    "rating": 5,
    "prices": [
      {
        "currencyCode": "USD",
        "adultPrice": 190,
        "childPrice": 95,
        "infantPrice": 0
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:35:30 GMT 
 location: https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/private-excursions


Parameters
Cancel
Name	Description
categoryId
string($uuid)
(query)
categoryId
lang
string
(query)
lang
currency
string
(query)
USD
page
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/private-excursions?currency=USD&page=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ'
Request URL
https://touristtt.runasp.net/api/private-excursions?currency=USD&page=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": {
    "items": [
      {
        "id": "6a273ca0-c9cf-4970-863f-8bd515d692da",
        "slug": "private-dolphin-house-speed-boat-trip",
        "title": "Private Dolphin House Speedboat & Snorkeling Trip",
        "subtitle": "Swim with wild dolphins and explore secluded coral reefs in total privacy",
        "shortDescription": "Take an exclusive private speedboat directly to the famous Dolphin House reef, avoid the crowds, and enjoy customized snorkeling stops with professional guidance.",
        "excursionType": "Private Boat Trip",
        "durationHours": 5,
        "stars": "5",
        "maxAttractions": 3,
        "primaryImageUrl": null,
        "categorySlug": "string123",
        "categoryTitle": "string123",
        "isFeatured": true,
        "rating": 5,
        "prices": [
          {
            "currencyCode": "USD",
            "adultPrice": 190,
            "childPrice": 95,
            "infantPrice": 0
          }
        ]
      },
      {
        "id": "7b510da9-d094-4568-bf4e-258a42e82ad4",
        "slug": "luxor-private-tomb-and-temple-tour",
        "title": "Luxor Valley of the Kings & Karnak Temple Day Trip",
        "subtitle": "Explore ancient pharaonic history with an expert Egyptologist guide",
        "shortDescription": "Travel from the Red Sea to Luxor to discover the Valley of the Kings, Hatshepsut Temple, the Colossi of Memnon, and Karnak Temple.",
        "excursionType": "Historical Day Tour",
        "durationHours": 14,
        "stars": "4.5",
        "maxAttractions": 5,
        "primaryImageUrl": null,
        "categorySlug": "string123",
        "categoryTitle": "string123",
        "isFeatured": true,
        "rating": 5,
        "prices": [
          {
            "currencyCode": "USD",
            "adultPrice": 110,
            "childPrice": 55,
            "infantPrice": 0
          }
        ]
      },
      {
        "id": "17997996-bb67-494c-8b51-a01542c477cb",
        "slug": "private-vip-speedboat-snorkeling",
        "title": "Private VIP Speedboat & Snorkeling Adventure",
        "subtitle": "Exclusive access to Giftun Island and coral reefs",
        "shortDescription": "Experience the Red Sea at your own pace with a private speedboat, professional guide, and custom snorkeling stops.",
        "excursionType": "Private Boat Trip",
        "durationHours": 5,
        "stars": "5",
        "maxAttractions": 3,
        "primaryImageUrl": null,
        "categorySlug": "string123",
        "categoryTitle": "string123",
        "isFeatured": true,
        "rating": 5,
        "prices": [
          {
            "currencyCode": "USD",
            "adultPrice": 180,
            "childPrice": 90,
            "infantPrice": 0
          }
        ]
      },
      {
        "id": "5494f7b4-7144-4f49-b278-7befef030461",
        "slug": "private-desert-sunset-safari",
        "title": "Private Desert Sunset Safari & Bedouin Dinner",
        "subtitle": "Private 4x4 quad ride, camel ride, and traditional barbecue dinner under the stars",
        "shortDescription": "Enjoy an exclusive desert journey with a dedicated guide, private 4x4 Jeep, quad bikes, and a private Bedouin dinner show.",
        "excursionType": "Private Desert Safari",
        "durationHours": 6,
        "stars": "5",
        "maxAttractions": 4,
        "primaryImageUrl": null,
        "categorySlug": "string123",
        "categoryTitle": "string123",
        "isFeatured": false,
        "rating": 5,
        "prices": [
          {
            "currencyCode": "USD",
            "adultPrice": 120,
            "childPrice": 60,
            "infantPrice": 0
          }
        ]
      }
    ],
    "totalCount": 4,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:35:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/private-excursions/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
lang
string
(query)
lang
Request body

application/json
Example Value
Schema
{
  "slug": "string",
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "adultPriceUsd": 0,
  "childPriceUsd": 0,
  "infantPriceUsd": 0,
  "stars": "string",
  "maxAttractions": 0,
  "durationHours": 0,
  "videoUrl": "string",
  "isFeatured": true,
  "isActive": true,
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "subtitle": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "excursionType": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "shortDescription": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "fullProgram": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/private-excursions/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
lang
string
(query)
lang
currency
string
(query)
USD
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": {
    "fullProgram": "",
    "videoUrl": "https://www.youtube.com/watch?v=privatedolphin",
    "imageList": [],
    "faqs": [],
    "attractions": [],
    "services": [],
    "id": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "slug": "private-dolphin-house-speed-boat-trip",
    "title": "Private Dolphin House Speedboat & Snorkeling Trip",
    "subtitle": "Swim with wild dolphins and explore secluded coral reefs in total privacy",
    "shortDescription": "Take an exclusive private speedboat directly to the famous Dolphin House reef, avoid the crowds, and enjoy customized snorkeling stops with professional guidance.",
    "excursionType": "Private Boat Trip",
    "durationHours": 5,
    "stars": "5",
    "maxAttractions": 3,
    "primaryImageUrl": null,
    "categorySlug": "string123",
    "categoryTitle": "string123",
    "isFeatured": true,
    "rating": 5,
    "prices": [
      {
        "currencyCode": "USD",
        "adultPrice": 190,
        "childPrice": 95,
        "infantPrice": 0
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:36:12 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/private-excursions/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
200	
OK

No links

POST
/api/private-excursions/{id}/attractions


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
Request body

application/json
{
  "attractionIds": [
    "9ad9718d-32ec-43f7-9023-f42e8b61e8c8","b89e0704-41eb-4d90-a872-d62edda1acf4"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "attractionIds": [
    "9ad9718d-32ec-43f7-9023-f42e8b61e8c8","b89e0704-41eb-4d90-a872-d62edda1acf4"
  ]
}'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Attractions assigned successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:37:23 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/private-excursions/{id}/attractions


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
lang
string
(query)
lang
currency
string
(query)
USD
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": [
    {
      "id": "b89e0704-41eb-4d90-a872-d62edda1acf4",
      "title": "Professional Underwater Photo & Video Package",
      "description": "Capture your best moments underwater with a professional photographer. Includes edited high-resolution digital photos and a highlight video clip sent directly to your phone.",
      "heroImage": "/uploads/attractions/hero/e6b68f05ee7a4bdb822c0832f32fb401.webp",
      "displayOrder": 2,
      "adultPriceUsd": 0,
      "childPriceUsd": 8,
      "infantPriceUsd": 0,
      "adultPrice": 0,
      "childPrice": 8,
      "infantPrice": 0,
      "currency": "USD",
      "images": [
        {
          "id": "38c069f7-a7b2-498d-888d-1382356afeb5",
          "imageUrl": "/uploads/attractions/fec153603bd241e995629a8848182af8.webp"
        },
        {
          "id": "4921d7b1-7dcf-4ad8-a54a-38b4fe38580c",
          "imageUrl": "/uploads/attractions/75e5ff6377064c50af47be9de4986ef3.webp"
        },
        {
          "id": "e04b2cb1-bd79-4389-9594-d7af4b0b6417",
          "imageUrl": "/uploads/attractions/505bc8af931c4899a876d8a99de1d583.webp"
        },
        {
          "id": "1e382d98-d386-4071-9403-e08be5b469e0",
          "imageUrl": "/uploads/attractions/101cb7ab0e864625b4827152c4eff9bb.webp"
        }
      ],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 0,
          "childPrice": 8,
          "infantPrice": 0
        }
      ]
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:38:27 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/private-excursions/{id}/attractions/{attractionId}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Attraction removed from private excursion successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:38:21 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/private-excursions/{id}/services


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
Request body

application/json
{
  "serviceIds": [
    "791facb1-45ae-4d91-afd6-87c7db98c9ca"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/services' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "serviceIds": [
    "791facb1-45ae-4d91-afd6-87c7db98c9ca"
  ]
}'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/services
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Extra services assigned successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:39:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/private-excursions/{id}/services


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
lang
string
(query)
lang
currency
string
(query)
USD
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/services?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc0YjNmZmE2LWNjNGEtNDQ3MS1hNjA3LTZiODFiOTRkZWI0NiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MDM4NzIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.CJtNW_h9_EzMHBS2WDiFgzNA6SBXxUNtBho5MW5RHUQ'
Request URL
https://touristtt.runasp.net/api/private-excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/services?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": [
    {
      "id": "791facb1-45ae-4d91-afd6-87c7db98c9ca",
      "title": "string",
      "description": "string",
      "heroImage": null,
      "displayOrder": 0,
      "basePriceUSD": 0,
      "basePrice": 0,
      "displayedPrice": 0,
      "currency": "USD",
      "imageUrls": [],
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 0
        }
      ]
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 16:39:20 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/private-excursions/{id}/services/{serviceId}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
serviceId *
string($uuid)
(path)
serviceId
Responses
Code	Description	Links
200	
OK