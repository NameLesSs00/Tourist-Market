now those are the servicesSubServices we should name them site services item
as this make the most since could you create a plan for them ? 
after reviewing them and creating a plan for them also note that 
How Options and Features Work
Options let customers choose customizable variations (like Rental Duration or sizes), using keys to label specific choices (e.g., "1-3 Days") and values to show the corresponding price or detail (e.g., "60 USD per day").

Features highlight included perks or specifications (like Air Conditioning or Automatic Transmission), using names inside lists to simply display what comes with the service.
okay now create the plan for those could you do that?
ServicesSubServices


GET
/api/services/subservices


Parameters
Cancel
Name	Description
serviceId
string($uuid)
(query)
serviceId
search
string
(query)
search
isActive
boolean
(query)

--
currency
string
(query)
currency
pageNumber
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
  'https://touristtt.runasp.net/api/services/subservices?pageNumber=1&pageSize=10' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/services/subservices?pageNumber=1&pageSize=10
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
        "id": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
        "title": "Kia Cerato Rental",
        "subtitle": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
        "description": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
        "textTopImage": "Kia Cerato - Stylish Rental Sedan",
        "note": "A valid passport and driver's license must be presented at the time of delivery.",
        "alert": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
        "basePriceUSD": 55,
        "price": 55,
        "currency": "USD",
        "isActive": true,
        "createdAt": "2026-10-21T14:41:57.4213983",
        "images": [],
        "options": [
          {
            "id": "08da2745-1344-4037-9d37-638bf877a0e9",
            "name": "Rental Duration",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "c6822bbb-b58b-4971-98cd-0308ef03df82",
                "optionId": "08da2745-1344-4037-9d37-638bf877a0e9",
                "key": "1-3 Days",
                "value": "55 USD per day",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "ad44612d-d864-463a-8cc6-3fa69c3eed32",
                "optionId": "08da2745-1344-4037-9d37-638bf877a0e9",
                "key": "4+ Days",
                "value": "50 USD per day",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "865b34ac-e181-453b-848d-7e43f7b530c9",
            "name": "Vehicle Specifications",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "c6c3d7b7-c00b-4665-b219-bdb7fd2aba8d",
                "featureId": "865b34ac-e181-453b-848d-7e43f7b530c9",
                "name": "USB & Aux Audio Support",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "6679de75-4c2d-49c4-b332-e8c4de11b88a",
                "featureId": "865b34ac-e181-453b-848d-7e43f7b530c9",
                "name": "Power Steering & AC",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "b5066cfb-cc77-4b24-bb9f-f1543826c777",
                "featureId": "865b34ac-e181-453b-848d-7e43f7b530c9",
                "name": "Automatic Transmission",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
        "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
        "title": "Kia Cerato Rental",
        "subtitle": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
        "description": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
        "textTopImage": "Kia Cerato - Stylish Rental Sedan",
        "note": "A valid passport and driver's license must be presented at the time of delivery.",
        "alert": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
        "basePriceUSD": 55,
        "price": 55,
        "currency": "USD",
        "isActive": true,
        "createdAt": "2026-10-21T14:42:50.8354522",
        "images": [],
        "options": [
          {
            "id": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
            "name": "Rental Duration",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "abf498c2-6ab7-48b4-8cb2-73866021741c",
                "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
                "key": "1-3 Days",
                "value": "55 USD per day",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "7c1d9afb-c3bb-43ac-b320-74ddcdbf4898",
                "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
                "key": "4+ Days",
                "value": "50 USD per day",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "Vehicle Specifications",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "c9eb69af-ab13-4f00-814a-317c78b3d52a",
                "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
                "name": "USB & Aux Audio Support",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "4cdc8fe8-e762-4ea9-b764-6315193450c9",
                "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
                "name": "Automatic Transmission",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "3466efa2-6399-4c75-a062-63283f92c7f5",
                "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
                "name": "Power Steering & AC",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "85dc5b45-800c-4ef7-a4b2-dd1e6b17a7d8",
        "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
        "title": "Skoda Octavia Rental",
        "subtitle": "Comfortable and reliable modern sedan for your trip in Hurghada",
        "description": "Rent the spacious Skoda Octavia for effortless city driving and long road trips across Egypt. Features automatic transmission, air conditioning, and excellent fuel efficiency.",
        "textTopImage": "Skoda Octavia - Premium Sedan Rental",
        "note": "A valid driving license, passport, and security deposit are required at the time of vehicle pickup.",
        "alert": "Cross-border travel outside of Egypt or into restricted military zones is strictly prohibited.",
        "basePriceUSD": 60,
        "price": 60,
        "currency": "USD",
        "isActive": true,
        "createdAt": "2026-10-21T14:37:51.5836452",
        "images": [],
        "options": [
          {
            "id": "ba2d0b13-a2f4-4059-a609-0efae6bcb410",
            "name": "Rental Duration",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "926be39c-bd4e-45f1-8cc3-296c62df0226",
                "optionId": "ba2d0b13-a2f4-4059-a609-0efae6bcb410",
                "key": "4+ Days",
                "value": "55 USD per day",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "23e83fdf-fa27-41ea-8029-e80bfcd6ea35",
                "optionId": "ba2d0b13-a2f4-4059-a609-0efae6bcb410",
                "key": "1-3 Days",
                "value": "60 USD per day",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "6aab2b37-0e6d-4529-b01e-6e0d736919c4",
            "name": "Vehicle Specifications",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "460c728c-1a29-495e-a092-7ed7bbc2da84",
                "featureId": "6aab2b37-0e6d-4529-b01e-6e0d736919c4",
                "name": "5 Seats & Large Trunk",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "476a7c70-feb9-46fa-824e-f4cd0dc2b930",
                "featureId": "6aab2b37-0e6d-4529-b01e-6e0d736919c4",
                "name": "Air Conditioning",
                "isActive": true,
                "displayOrder": 0
              },
              {
                "id": "97cde54b-45e8-49ca-b1d8-f8a67a88e09b",
                "featureId": "6aab2b37-0e6d-4529-b01e-6e0d736919c4",
                "name": "Automatic Transmission",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 3,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:43:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/subservices


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
  "title": {
    "en": "Kia Cerato Rental",
    "ru": "Аренда Kia Cerato",
    "de": "Kia Cerato Mieten",
    "fr": "Location de Kia Cerato"
  },
  "subtitle": {
    "en": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
    "ru": "Современный, стильный и комфортный седан для плавных поездок по Хургаде",
    "de": "Moderne, stilvolle und komfortable Limousine für entspannte Fahrten in Hurghada",
    "fr": "Berline moderne, élégante et confortable pour rouler en toute sérénité à Hurghada"
  },
  "description": {
    "en": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
    "ru": "Наслаждайтесь отдыхом на седане Kia Cerato. Автоматическая коробка передач, отличный кондиционер, просторный салон и надежность для поездок по городу.",
    "de": "Genießen Sie Ihren Urlaub mit der Kia Cerato Limousine. Mit Automatikgetriebe, hervorragender Klimaanlage und einem geräumigen Innenraum.",
    "fr": "Profitez de vos vacances avec la berline Kia Cerato. Équipée d'une boîte automatique, d'une excellente climatisation et d'un habitacle spacieux."
  },
  "textTopImage": {
    "en": "Kia Cerato - Stylish Rental Sedan",
    "ru": "Kia Cerato - Стильный седан напрокат",
    "de": "Kia Cerato - Stilvolle Mietlimousine",
    "fr": "Kia Cerato - Berline de location élégante"
  },
  "note": {
    "en": "A valid passport and driver's license must be presented at the time of delivery.",
    "ru": "При выдаче автомобиля необходимо предъявить действующий паспорт и водительские права.",
    "de": "Bei der Übergabe müssen ein gültiger Reisepass und Führerschein vorgelegt werden.",
    "fr": "Un passeport et un permis de conduire valides doivent être présentés au moment de la livraison."
  },
  "alert": {
    "en": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
    "ru": "Езда по бездорожью в пустынных дюнах на этом стандартном седане строго запрещена.",
    "de": "Das Fahren im Gelände in Wüstendünen mit dieser Standardlimousine ist strengstens verboten.",
    "fr": "La conduite hors-piste dans les dunes du désert avec cette berline standard est strictement interdite."
  },
  "basePriceUSD": 55,
  "isActive": true,
  "options": [
    {
      "name": {
        "en": "Rental Duration",
        "ru": "Срок аренды",
        "de": "Mietdauer",
        "fr": "Durée de location"
      },
      "values": [
        {
          "key": {
            "en": "1-3 Days",
            "ru": "1-3 дня",
            "de": "1-3 Tage",
            "fr": "1-3 jours"
          },
          "value": {
            "en": "55 USD per day",
            "ru": "55 USD в день",
            "de": "55 USD pro Tag",
            "fr": "55 USD par jour"
          }
        },
        {
          "key": {
            "en": "4+ Days",
            "ru": "4+ дней",
            "de": "4+ Tage",
            "fr": "4+ jours"
          },
          "value": {
            "en": "50 USD per day",
            "ru": "50 USD в день",
            "de": "50 USD pro Tag",
            "fr": "50 USD par jour"
          }
        }
      ]
    }
  ],
  "features": [
    {
      "name": {
        "en": "Vehicle Specifications",
        "ru": "Характеристики автомобиля",
        "de": "Fahrzeugspezifikationen",
        "fr": "Spécifications du véhicule"
      },
      "values": [
        {
          "name": {
            "en": "Automatic Transmission",
            "ru": "Автоматическая коробка передач",
            "de": "Automatikgetriebe",
            "fr": "Transmission automatique"
          }
        },
        {
          "name": {
            "en": "Power Steering & AC",
            "ru": "Усилитель руля и кондиционер",
            "de": "Servolenkung & Klimaanlage",
            "fr": "Direction assistée et climatisation"
          }
        },
        {
          "name": {
            "en": "USB & Aux Audio Support",
            "ru": "Поддержка USB и Aux аудио",
            "de": "USB & Aux Audio-Unterstützung",
            "fr": "Support audio USB et Aux"
          }
        }
      ]
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/subservices' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
  "title": {
    "en": "Kia Cerato Rental",
    "ru": "Аренда Kia Cerato",
    "de": "Kia Cerato Mieten",
    "fr": "Location de Kia Cerato"
  },
  "subtitle": {
    "en": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
    "ru": "Современный, стильный и комфортный седан для плавных поездок по Хургаде",
    "de": "Moderne, stilvolle und komfortable Limousine für entspannte Fahrten in Hurghada",
    "fr": "Berline moderne, élégante et confortable pour rouler en toute sérénité à Hurghada"
  },
  "description": {
    "en": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
    "ru": "Наслаждайтесь отдыхом на седане Kia Cerato. Автоматическая коробка передач, отличный кондиционер, просторный салон и надежность для поездок по городу.",
    "de": "Genießen Sie Ihren Urlaub mit der Kia Cerato Limousine. Mit Automatikgetriebe, hervorragender Klimaanlage und einem geräumigen Innenraum.",
    "fr": "Profitez de vos vacances avec la berline Kia Cerato. Équipée d'\''une boîte automatique, d'\''une excellente climatisation et d'\''un habitacle spacieux."
  },
  "textTopImage": {
    "en": "Kia Cerato - Stylish Rental Sedan",
    "ru": "Kia Cerato - Стильный седан напрокат",
    "de": "Kia Cerato - Stilvolle Mietlimousine",
    "fr": "Kia Cerato - Berline de location élégante"
  },
  "note": {
    "en": "A valid passport and driver'\''s license must be presented at the time of delivery.",
    "ru": "При выдаче автомобиля необходимо предъявить действующий паспорт и водительские права.",
    "de": "Bei der Übergabe müssen ein gültiger Reisepass und Führerschein vorgelegt werden.",
    "fr": "Un passeport et un permis de conduire valides doivent être présentés au moment de la livraison."
  },
  "alert": {
    "en": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
    "ru": "Езда по бездорожью в пустынных дюнах на этом стандартном седане строго запрещена.",
    "de": "Das Fahren im Gelände in Wüstendünen mit dieser Standardlimousine ist strengstens verboten.",
    "fr": "La conduite hors-piste dans les dunes du désert avec cette berline standard est strictement interdite."
  },
  "basePriceUSD": 55,
  "isActive": true,
  "options": [
    {
      "name": {
        "en": "Rental Duration",
        "ru": "Срок аренды",
        "de": "Mietdauer",
        "fr": "Durée de location"
      },
      "values": [
        {
          "key": {
            "en": "1-3 Days",
            "ru": "1-3 дня",
            "de": "1-3 Tage",
            "fr": "1-3 jours"
          },
          "value": {
            "en": "55 USD per day",
            "ru": "55 USD в день",
            "de": "55 USD pro Tag",
            "fr": "55 USD par jour"
          }
        },
        {
          "key": {
            "en": "4+ Days",
            "ru": "4+ дней",
            "de": "4+ Tage",
            "fr": "4+ jours"
          },
          "value": {
            "en": "50 USD per day",
            "ru": "50 USD в день",
            "de": "50 USD pro Tag",
            "fr": "50 USD par jour"
          }
        }
      ]
    }
  ],
  "features": [
    {
      "name": {
        "en": "Vehicle Specifications",
        "ru": "Характеристики автомобиля",
        "de": "Fahrzeugspezifikationen",
        "fr": "Spécifications du véhicule"
      },
      "values": [
        {
          "name": {
            "en": "Automatic Transmission",
            "ru": "Автоматическая коробка передач",
            "de": "Automatikgetriebe",
            "fr": "Transmission automatique"
          }
        },
        {
          "name": {
            "en": "Power Steering & AC",
            "ru": "Усилитель руля и кондиционер",
            "de": "Servolenkung & Klimaanlage",
            "fr": "Direction assistée et climatisation"
          }
        },
        {
          "name": {
            "en": "USB & Aux Audio Support",
            "ru": "Поддержка USB и Aux аудио",
            "de": "USB & Aux Audio-Unterstützung",
            "fr": "Support audio USB et Aux"
          }
        }
      ]
    }
  ]
}'
Request URL
https://touristtt.runasp.net/api/services/subservices
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubService created successfully with all nested entities.",
  "data": {
    "id": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
    "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
    "title": "Kia Cerato Rental",
    "subtitle": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
    "description": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
    "textTopImage": "Kia Cerato - Stylish Rental Sedan",
    "note": "A valid passport and driver's license must be presented at the time of delivery.",
    "alert": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
    "basePriceUSD": 55,
    "price": 55,
    "currency": "USD",
    "isActive": true,
    "createdAt": "2026-10-21T14:42:50.8354522Z",
    "images": [],
    "options": [
      {
        "id": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
        "name": "Rental Duration",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "abf498c2-6ab7-48b4-8cb2-73866021741c",
            "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
            "key": "1-3 Days",
            "value": "55 USD per day",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "7c1d9afb-c3bb-43ac-b320-74ddcdbf4898",
            "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
            "key": "4+ Days",
            "value": "50 USD per day",
            "isActive": true,
            "displayOrder": 0
          }
        ]
      }
    ],
    "features": [
      {
        "id": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
        "name": "Vehicle Specifications",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "4cdc8fe8-e762-4ea9-b764-6315193450c9",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "Automatic Transmission",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "3466efa2-6399-4c75-a062-63283f92c7f5",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "Power Steering & AC",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "c9eb69af-ab13-4f00-814a-317c78b3d52a",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "USB & Aux Audio Support",
            "isActive": true,
            "displayOrder": 0
          }
        ]
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:42:50 GMT 
 location: https://touristtt.runasp.net/api/services/subservices/2a987153-a41c-4e9e-9b8b-48c1d792810e 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/subservices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2a987153-a41c-4e9e-9b8b-48c1d792810e
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/subservices/2a987153-a41c-4e9e-9b8b-48c1d792810e' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/services/subservices/2a987153-a41c-4e9e-9b8b-48c1d792810e
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
    "id": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
    "serviceId": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
    "title": "Kia Cerato Rental",
    "subtitle": "Modern, stylish, and comfortable sedan for smooth cruising in Hurghada",
    "description": "Enjoy your vacation with the Kia Cerato sedan. Featuring automatic transmission, excellent air conditioning, a spacious interior, and reliable performance for city tours or coastal roads.",
    "textTopImage": "Kia Cerato - Stylish Rental Sedan",
    "note": "A valid passport and driver's license must be presented at the time of delivery.",
    "alert": "Off-road driving in desert dunes with this standard sedan is strictly forbidden.",
    "basePriceUSD": 55,
    "price": 55,
    "currency": "USD",
    "isActive": true,
    "createdAt": "2026-10-21T14:42:50.8354522",
    "images": [
      {
        "id": "5b76c5f1-4379-4424-b4f9-7b2f1e0b839e",
        "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
        "imageUrl": "/uploads/services/subservices/b5d13ff3a4a04a5095a2922c50420421.webp",
        "displayOrder": 2,
        "createdAt": "2026-10-21T14:45:08.6866879"
      },
      {
        "id": "55ce1129-3fdd-45fc-9c8f-8ac5894b18a7",
        "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
        "imageUrl": "/uploads/services/subservices/80426d2b0e634014bc588c0078ea86c4.webp",
        "displayOrder": 3,
        "createdAt": "2026-10-21T14:45:08.7428128"
      },
      {
        "id": "de90a43a-4b49-4d75-b380-2d99bab3b680",
        "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
        "imageUrl": "/uploads/services/subservices/0778d6383a5549a4b37580543440acaf.webp",
        "displayOrder": 4,
        "createdAt": "2026-10-21T14:45:08.782338"
      }
    ],
    "options": [
      {
        "id": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
        "name": "Rental Duration",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "abf498c2-6ab7-48b4-8cb2-73866021741c",
            "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
            "key": "1-3 Days",
            "value": "55 USD per day",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "7c1d9afb-c3bb-43ac-b320-74ddcdbf4898",
            "optionId": "9c8be90d-3906-4b8b-8c46-7f50e7806eae",
            "key": "4+ Days",
            "value": "50 USD per day",
            "isActive": true,
            "displayOrder": 0
          }
        ]
      }
    ],
    "features": [
      {
        "id": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
        "name": "Vehicle Specifications",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "c9eb69af-ab13-4f00-814a-317c78b3d52a",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "USB & Aux Audio Support",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "4cdc8fe8-e762-4ea9-b764-6315193450c9",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "Automatic Transmission",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "3466efa2-6399-4c75-a062-63283f92c7f5",
            "featureId": "f1b7fbab-ce59-4114-88a3-199e04544cf5",
            "name": "Power Steering & AC",
            "isActive": true,
            "displayOrder": 0
          }
        ]
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:46:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/services/subservices/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
  "description": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "textTopImage": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "note": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "alert": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "basePriceUSD": 0,
  "isActive": true,
  "options": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": {
        "en": "string",
        "ru": "string",
        "de": "string",
        "fr": "string"
      },
      "values": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "key": {
            "en": "string",
            "ru": "string",
            "de": "string",
            "fr": "string"
          },
          "value": {
            "en": "string",
            "ru": "string",
            "de": "string",
            "fr": "string"
          }
        }
      ]
    }
  ],
  "features": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": {
        "en": "string",
        "ru": "string",
        "de": "string",
        "fr": "string"
      },
      "values": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": {
            "en": "string",
            "ru": "string",
            "de": "string",
            "fr": "string"
          }
        }
      ]
    }
  ]
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/services/subservices/{id}


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
/api/services/subservices/{id}/images


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
2a987153-a41c-4e9e-9b8b-48c1d792810e
Request body

multipart/form-data
files
array<string>
adminLogin.png-
curve.png-
Polygon 1.png-
Polygon 2.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/subservices/2a987153-a41c-4e9e-9b8b-48c1d792810e/images' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@adminLogin.png;type=image/png' \
  -F 'files=@curve.png;type=image/png' \
  -F 'files=@Polygon 1.png;type=image/png' \
  -F 'files=@Polygon 2.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/services/subservices/2a987153-a41c-4e9e-9b8b-48c1d792810e/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Images uploaded successfully.",
  "data": [
    {
      "id": "3d0874d8-cbf5-46f7-bb2f-b9560fcca02e",
      "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
      "imageUrl": "/uploads/services/subservices/bb3b31de48fa435087ca5f32124adb93.webp",
      "displayOrder": 1,
      "createdAt": "2026-10-21T14:45:08.4291708Z"
    },
    {
      "id": "5b76c5f1-4379-4424-b4f9-7b2f1e0b839e",
      "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
      "imageUrl": "/uploads/services/subservices/b5d13ff3a4a04a5095a2922c50420421.webp",
      "displayOrder": 2,
      "createdAt": "2026-10-21T14:45:08.6866879Z"
    },
    {
      "id": "55ce1129-3fdd-45fc-9c8f-8ac5894b18a7",
      "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
      "imageUrl": "/uploads/services/subservices/80426d2b0e634014bc588c0078ea86c4.webp",
      "displayOrder": 3,
      "createdAt": "2026-10-21T14:45:08.7428128Z"
    },
    {
      "id": "de90a43a-4b49-4d75-b380-2d99bab3b680",
      "subServiceId": "2a987153-a41c-4e9e-9b8b-48c1d792810e",
      "imageUrl": "/uploads/services/subservices/0778d6383a5549a4b37580543440acaf.webp",
      "displayOrder": 4,
      "createdAt": "2026-10-21T14:45:08.782338Z"
    }
  ],
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:45:07 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/services/subservices/images/{imageId}


Parameters
Cancel
Name	Description
imageId *
string($uuid)
(path)
3d0874d8-cbf5-46f7-bb2f-b9560fcca02e
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/services/subservices/images/3d0874d8-cbf5-46f7-bb2f-b9560fcca02e' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/services/subservices/images/3d0874d8-cbf5-46f7-bb2f-b9560fcca02e
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Image deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:46:26 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK