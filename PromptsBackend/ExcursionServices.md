create a plan so that we could add the ExcursionServices to the admin dahsboard could you review it and create a plan for it 


POST
/api/ExcursionServices/options


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "basePriceUSD": 15,
  "displayOrder": 4,
  "title": {
    "en": "Seafood Lunch Upgrade",
    "ru": "Обновление до обеда с морепродуктами",
    "de": "Upgrade auf Meeresfrüchte-Mittagessen",
    "fr": "Surclassement pour le déjeuner aux fruits de mer"
  },
  "description": {
    "en": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
    "ru": "Замените стандартный шведский стол на свежеприготовленное ассорти из морепродуктов, включая креветки и кальмары.",
    "de": "Erweitern Sie Ihr Standardbuffet um eine frisch gegrillte Meeresfrüchte-Platte mit Garnelen und Calamari.",
    "fr": "Améliorez votre buffet standard avec un plateau de fruits de mer grillés, comprenant crevettes et calamars."
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/ExcursionServices/options' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "basePriceUSD": 15,
  "displayOrder": 4,
  "title": {
    "en": "Seafood Lunch Upgrade",
    "ru": "Обновление до обеда с морепродуктами",
    "de": "Upgrade auf Meeresfrüchte-Mittagessen",
    "fr": "Surclassement pour le déjeuner aux fruits de mer"
  },
  "description": {
    "en": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
    "ru": "Замените стандартный шведский стол на свежеприготовленное ассорти из морепродуктов, включая креветки и кальмары.",
    "de": "Erweitern Sie Ihr Standardbuffet um eine frisch gegrillte Meeresfrüchte-Platte mit Garnelen und Calamari.",
    "fr": "Améliorez votre buffet standard avec un plateau de fruits de mer grillés, comprenant crevettes et calamars."
  }
}'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "id": "c83243c3-6dfa-46a0-970c-bac05052f098",
  "title": "Seafood Lunch Upgrade",
  "description": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
  "heroImage": null,
  "displayOrder": 4,
  "basePriceUSD": 15,
  "basePrice": 15,
  "displayedPrice": 15,
  "currency": "USD",
  "imageUrls": [],
  "images": [],
  "prices": [
    {
      "currencyCode": "USD",
      "adultPrice": 15,
      "childPrice": 15,
      "infantPrice": 15
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:44:09 GMT 
 location: https://touristtt.runasp.net/api/ExcursionServices/options/c83243c3-6dfa-46a0-970c-bac05052f098 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/ExcursionServices/options


Parameters
Cancel
Name	Description
excursionId
string($uuid)
(query)
excursionId
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
  'https://touristtt.runasp.net/api/ExcursionServices/options?currency=USD&page=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options?currency=USD&page=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "items": [
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
    },
    {
      "id": "5386c8cb-7b47-4e9f-ab20-31ecc34631da",
      "title": "Full Scuba Diving Equipment Rental",
      "description": "Includes regulator, BCD, wetsuit, mask, fins, and weight belt for certified divers.",
      "heroImage": null,
      "displayOrder": 1,
      "basePriceUSD": 25,
      "basePrice": 25,
      "displayedPrice": 25,
      "currency": "USD",
      "imageUrls": [],
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 25,
          "childPrice": 25,
          "infantPrice": 25
        }
      ]
    },
    {
      "id": "eb031c7c-a4f9-409f-8ebe-85dcf5b9d6c8",
      "title": "Professional Underwater & Land Photography",
      "description": "A professional photographer will capture your best moments with high-resolution edited photos and videos.",
      "heroImage": null,
      "displayOrder": 2,
      "basePriceUSD": 30,
      "basePrice": 30,
      "displayedPrice": 30,
      "currency": "USD",
      "imageUrls": [],
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 30,
          "childPrice": 30,
          "infantPrice": 30
        }
      ]
    },
    {
      "id": "350fdcbd-53f8-4ca0-8361-b58a4b747877",
      "title": "Private Hotel Transfer Upgrade",
      "description": "Upgrade your group pickup to an exclusive, air-conditioned private car for you and your family.",
      "heroImage": null,
      "displayOrder": 3,
      "basePriceUSD": 20,
      "basePrice": 20,
      "displayedPrice": 20,
      "currency": "USD",
      "imageUrls": [],
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 20,
          "childPrice": 20,
          "infantPrice": 20
        }
      ]
    },
    {
      "id": "c83243c3-6dfa-46a0-970c-bac05052f098",
      "title": "Seafood Lunch Upgrade",
      "description": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
      "heroImage": null,
      "displayOrder": 4,
      "basePriceUSD": 15,
      "basePrice": 15,
      "displayedPrice": 15,
      "currency": "USD",
      "imageUrls": [],
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 15,
          "childPrice": 15,
          "infantPrice": 15
        }
      ]
    },
    {
      "id": "fb6e17f4-b955-45d3-ac5d-faf0fd4928b6",
      "title": "Seafood Lunch Upgrade",
      "description": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
      "heroImage": "/uploads/excursion-services/hero/4c40c922edd8401dbc0e5e852d814134.webp",
      "displayOrder": 4,
      "basePriceUSD": 15,
      "basePrice": 15,
      "displayedPrice": 15,
      "currency": "USD",
      "imageUrls": [
        "/uploads/excursion-services/ef5aec9be7804d39a1145afc5444b985.webp",
        "/uploads/excursion-services/b6d19a0b33f54bb196716e04382a903c.webp",
        "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp"
      ],
      "images": [
        {
          "id": "1a3dd32a-2f8d-4433-a265-8bc8139eb2ad",
          "imageUrl": "/uploads/excursion-services/ef5aec9be7804d39a1145afc5444b985.webp"
        },
        {
          "id": "832201ef-1d15-4959-b3f8-a03ac7367958",
          "imageUrl": "/uploads/excursion-services/b6d19a0b33f54bb196716e04382a903c.webp"
        },
        {
          "id": "f64a6a00-dfb1-4ff0-ba0a-c68935c24bfa",
          "imageUrl": "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp"
        }
      ],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 15,
          "childPrice": 15,
          "infantPrice": 15
        }
      ]
    }
  ],
  "totalCount": 6,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:44:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/ExcursionServices/options/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Request body

application/json
{
  "basePriceUSD": 15,
  "displayOrder": 4,
  "title": {
    "en": "Seafood Lunch Upgrade",
    "ru": "Обновление до обеда с морепродуктами",
    "de": "Upgrade auf Meeresfrüchte-Mittagessen",
    "fr": "Surclassement pour le déjeuner aux fruits de mer"
  },
  "description": {
    "en": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
    "ru": "Замените стандартный шведский стол на свежеприготовленное ассорти из морепродуктов, включая креветки и кальмары.",
    "de": "Erweitern Sie Ihr Standardbuffet um eine frisch gegrillte Meeresfrüchte-Platte mit Garnelen und Calamari.",
    "fr": "Améliorez votre buffet standard avec un plateau de fruits de mer grillés, comprenant crevettes et calamars."
  }
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "basePriceUSD": 15,
  "displayOrder": 4,
  "title": {
    "en": "Seafood Lunch Upgrade",
    "ru": "Обновление до обеда с морепродуктами",
    "de": "Upgrade auf Meeresfrüchte-Mittagessen",
    "fr": "Surclassement pour le déjeuner aux fruits de mer"
  },
  "description": {
    "en": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
    "ru": "Замените стандартный шведский стол на свежеприготовленное ассорти из морепродуктов, включая креветки и кальмары.",
    "de": "Erweitern Sie Ihr Standardbuffet um eine frisch gegrillte Meeresfrüchte-Platte mit Garnelen und Calamari.",
    "fr": "Améliorez votre buffet standard avec un plateau de fruits de mer grillés, comprenant crevettes et calamars."
  }
}'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Server response
Code	Details
200	
Response body
Download
{
  "id": "fb6e17f4-b955-45d3-ac5d-faf0fd4928b6",
  "title": "Seafood Lunch Upgrade",
  "description": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
  "heroImage": null,
  "displayOrder": 4,
  "basePriceUSD": 15,
  "basePrice": 15,
  "displayedPrice": 15,
  "currency": "USD",
  "imageUrls": [],
  "images": [],
  "prices": [
    {
      "currencyCode": "USD",
      "adultPrice": 15,
      "childPrice": 15,
      "infantPrice": 15
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:42:01 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/ExcursionServices/options/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
lang
string
(query)
lang
currency
string
(query)
EUR
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6?currency=EUR' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6?currency=EUR
Server response
Code	Details
200	
Response body
Download
{
  "id": "fb6e17f4-b955-45d3-ac5d-faf0fd4928b6",
  "title": "Seafood Lunch Upgrade",
  "description": "Upgrade your standard buffet to a freshly grilled seafood lunch platter including shrimp and calamari.",
  "heroImage": null,
  "displayOrder": 4,
  "basePriceUSD": 15,
  "basePrice": 16.8,
  "displayedPrice": 16.8,
  "currency": "EUR",
  "imageUrls": [
    "/uploads/excursion-services/ef5aec9be7804d39a1145afc5444b985.webp",
    "/uploads/excursion-services/b6d19a0b33f54bb196716e04382a903c.webp",
    "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp",
    "/uploads/excursion-services/1737187d78ec4464907e5d05ac6e3b57.webp"
  ],
  "images": [
    {
      "id": "1a3dd32a-2f8d-4433-a265-8bc8139eb2ad",
      "imageUrl": "/uploads/excursion-services/ef5aec9be7804d39a1145afc5444b985.webp"
    },
    {
      "id": "832201ef-1d15-4959-b3f8-a03ac7367958",
      "imageUrl": "/uploads/excursion-services/b6d19a0b33f54bb196716e04382a903c.webp"
    },
    {
      "id": "f64a6a00-dfb1-4ff0-ba0a-c68935c24bfa",
      "imageUrl": "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp"
    },
    {
      "id": "0a14331d-2f93-45a3-b94f-f19b109d2a96",
      "imageUrl": "/uploads/excursion-services/1737187d78ec4464907e5d05ac6e3b57.webp"
    }
  ],
  "prices": [
    {
      "currencyCode": "EUR",
      "adultPrice": 16.8,
      "childPrice": 16.8,
      "infantPrice": 16.8
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/ExcursionServices/options/{id}


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
/api/ExcursionServices/options/{optionId}/images


Parameters
Cancel
Reset
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Request body

multipart/form-data
files
array<string>
Polygon 3.png-
Polygon 3-1.png-
Polygon 2-1.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@Polygon 3.png;type=image/png' \
  -F 'files=@Polygon 3-1.png;type=image/png' \
  -F 'files=@Polygon 2-1.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "images": {
    "id": "f64a6a00-dfb1-4ff0-ba0a-c68935c24bfa",
    "imageUrl": "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:04 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/ExcursionServices/options/{optionId}/images


Parameters
Cancel
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "1a3dd32a-2f8d-4433-a265-8bc8139eb2ad",
    "imageUrl": "/uploads/excursion-services/ef5aec9be7804d39a1145afc5444b985.webp"
  },
  {
    "id": "832201ef-1d15-4959-b3f8-a03ac7367958",
    "imageUrl": "/uploads/excursion-services/b6d19a0b33f54bb196716e04382a903c.webp"
  },
  {
    "id": "f64a6a00-dfb1-4ff0-ba0a-c68935c24bfa",
    "imageUrl": "/uploads/excursion-services/ec1c08e06f544acc9705df1740829c94.webp"
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/ExcursionServices/options/{optionId}/images/{imageId}


Parameters
Cancel
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
imageId *
string($uuid)
(path)
0a14331d-2f93-45a3-b94f-f19b109d2a96
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images/0a14331d-2f93-45a3-b94f-f19b109d2a96' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/images/0a14331d-2f93-45a3-b94f-f19b109d2a96
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service option image deleted successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:37 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/ExcursionServices/options/{optionId}/hero


Parameters
Cancel
Reset
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Request body

multipart/form-data
file
string($binary)
Polygon 2-1.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Polygon 2-1.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero
Server response
Code	Details
200	
Response body
Download
{
  "imageUrl": "/uploads/excursion-services/hero/4c40c922edd8401dbc0e5e852d814134.webp"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:44:01 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/ExcursionServices/options/{optionId}/hero


Parameters
Cancel
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero
Server response
Code	Details
200	
Response body
Download
{
  "imageUrl": "/uploads/excursion-services/hero/b476e5f0000e4dd48948fd6748300500.webp"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:53 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/ExcursionServices/options/{optionId}/hero


Parameters
Cancel
Name	Description
optionId *
string($uuid)
(path)
fb6e17f4-b955-45d3-ac5d-faf0fd4928b6
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/ExcursionServices/options/fb6e17f4-b955-45d3-ac5d-faf0fd4928b6/hero
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service option hero image deleted successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:43:57 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK