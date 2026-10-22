could you create a plan so that we could add the attractoin to the admin dashboard revewi it and create a plan for it 
Attractions


POST
/api/attractions


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
    "adultPriceUsd": 20,
    "childPriceUsd": 10,
    "infantPriceUsd": 0,
    "displayOrder": 3,
    "title": {
      "en": "Private Hotel Transfer Upgrade (Round Trip)",
      "ru": "Обновление до индивидуального трансфера из отеля (туда и обратно)",
      "de": "Upgrade auf privaten Hoteltransfer (Hin- und Rückfahrt)",
      "fr": "Surclassement pour un transfert d'hôtel privé (aller-retour)"
    },
    "description": {
      "en": "Upgrade your shared pickup to a private, air-conditioned modern vehicle dedicated solely to you and your party for a more comfortable and direct journey.",
      "ru": "Замените общий трансфер на поездку в современном автомобиле с кондиционером исключительно для вашей группы.",
      "de": "Wählen Sie ein privates, klimatisiertes Fahrzeug ausschließlich für Sie und Ihre Gruppe für eine komfortablere Fahrt.",
      "fr": "Optez pour un véhicule privé et climatisé réservé exclusivement à votre groupe pour un trajet plus confortable et direct."
    }
  }
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/attractions' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
    "adultPriceUsd": 20,
    "childPriceUsd": 10,
    "infantPriceUsd": 0,
    "displayOrder": 3,
    "title": {
      "en": "Private Hotel Transfer Upgrade (Round Trip)",
      "ru": "Обновление до индивидуального трансфера из отеля (туда и обратно)",
      "de": "Upgrade auf privaten Hoteltransfer (Hin- und Rückfahrt)",
      "fr": "Surclassement pour un transfert d'\''hôtel privé (aller-retour)"
    },
    "description": {
      "en": "Upgrade your shared pickup to a private, air-conditioned modern vehicle dedicated solely to you and your party for a more comfortable and direct journey.",
      "ru": "Замените общий трансфер на поездку в современном автомобиле с кондиционером исключительно для вашей группы.",
      "de": "Wählen Sie ein privates, klimatisiertes Fahrzeug ausschließlich für Sie und Ihre Gruppe für eine komfortablere Fahrt.",
      "fr": "Optez pour un véhicule privé et climatisé réservé exclusivement à votre groupe pour un trajet plus confortable et direct."
    }
  }'
Request URL
https://touristtt.runasp.net/api/attractions
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "id": "d464080c-9150-4ff2-8a17-e63f11d1ea75",
  "title": "Private Hotel Transfer Upgrade (Round Trip)",
  "description": "Upgrade your shared pickup to a private, air-conditioned modern vehicle dedicated solely to you and your party for a more comfortable and direct journey.",
  "heroImage": null,
  "displayOrder": 3,
  "adultPriceUsd": 20,
  "childPriceUsd": 10,
  "infantPriceUsd": 0,
  "adultPrice": 20,
  "childPrice": 10,
  "infantPrice": 0,
  "currency": "USD",
  "images": [],
  "prices": [
    {
      "currencyCode": "USD",
      "adultPrice": 20,
      "childPrice": 10,
      "infantPrice": 0
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:14:37 GMT 
 location: https://touristtt.runasp.net/api/attractions/d464080c-9150-4ff2-8a17-e63f11d1ea75 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/attractions


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
  'https://touristtt.runasp.net/api/attractions?currency=USD&page=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/attractions?currency=USD&page=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "9ad9718d-32ec-43f7-9023-f42e8b61e8c8",
      "title": "Extra VIP Lounge Access & Priority Boarding",
      "description": "Enjoy complimentary drinks, comfortable seating, and skip-the-line privileges before your excursion begins.",
      "heroImage": "/uploads/attractions/hero/ca1839b10f95423f93e9cbdeccaa4ea0.webp",
      "displayOrder": 1,
      "adultPriceUsd": 25,
      "childPriceUsd": 12,
      "infantPriceUsd": 0,
      "adultPrice": 25,
      "childPrice": 12,
      "infantPrice": 0,
      "currency": "USD",
      "images": [
        {
          "id": "2e4c0b03-ca4d-4640-8a91-1c7efcfe0142",
          "imageUrl": "/uploads/attractions/26c07e4ff201423f90d35fbc35a961f0.webp"
        },
        {
          "id": "158eb349-a195-4928-aea8-b4ced425eadd",
          "imageUrl": "/uploads/attractions/81d989d8c0a2482a94fff069e05919f4.webp"
        }
      ],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 25,
          "childPrice": 12,
          "infantPrice": 0
        }
      ]
    },
    {
      "id": "b89e0704-41eb-4d90-a872-d62edda1acf4",
      "title": "Professional Underwater Photo & Video Package",
      "description": "Capture your best moments underwater with a professional photographer. Includes edited high-resolution digital photos and a highlight video clip sent directly to your phone.",
      "heroImage": null,
      "displayOrder": 2,
      "adultPriceUsd": 0,
      "childPriceUsd": 8,
      "infantPriceUsd": 0,
      "adultPrice": 0,
      "childPrice": 8,
      "infantPrice": 0,
      "currency": "USD",
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 0,
          "childPrice": 8,
          "infantPrice": 0
        }
      ]
    },
    {
      "id": "d464080c-9150-4ff2-8a17-e63f11d1ea75",
      "title": "Private Hotel Transfer Upgrade (Round Trip)",
      "description": "Upgrade your shared pickup to a private, air-conditioned modern vehicle dedicated solely to you and your party for a more comfortable and direct journey.",
      "heroImage": null,
      "displayOrder": 3,
      "adultPriceUsd": 20,
      "childPriceUsd": 10,
      "infantPriceUsd": 0,
      "adultPrice": 20,
      "childPrice": 10,
      "infantPrice": 0,
      "currency": "USD",
      "images": [],
      "prices": [
        {
          "currencyCode": "USD",
          "adultPrice": 20,
          "childPrice": 10,
          "infantPrice": 0
        }
      ]
    }
  ],
  "totalCount": 3,
  "page": 1,
  "pageSize": 10,
  "totalPages": 1
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:18:29 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/attractions/{id}


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
  "adultPriceUsd": 0,
  "childPriceUsd": 0,
  "infantPriceUsd": 0,
  "displayOrder": 0,
  "title": {
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
  }
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/attractions/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
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
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "id": "9ad9718d-32ec-43f7-9023-f42e8b61e8c8",
  "title": "Extra VIP Lounge Access & Priority Boarding",
  "description": "Enjoy complimentary drinks, comfortable seating, and skip-the-line privileges before your excursion begins.",
  "heroImage": null,
  "displayOrder": 1,
  "adultPriceUsd": 25,
  "childPriceUsd": 12,
  "infantPriceUsd": 0,
  "adultPrice": 25,
  "childPrice": 12,
  "infantPrice": 0,
  "currency": "USD",
  "images": [
    {
      "id": "61ca1445-f74e-41a6-9dcf-1a7c9b1772cf",
      "imageUrl": "/uploads/attractions/c597a8d66428468db85297e63373c952.webp"
    },
    {
      "id": "2e4c0b03-ca4d-4640-8a91-1c7efcfe0142",
      "imageUrl": "/uploads/attractions/26c07e4ff201423f90d35fbc35a961f0.webp"
    },
    {
      "id": "158eb349-a195-4928-aea8-b4ced425eadd",
      "imageUrl": "/uploads/attractions/81d989d8c0a2482a94fff069e05919f4.webp"
    }
  ],
  "prices": [
    {
      "currencyCode": "USD",
      "adultPrice": 25,
      "childPrice": 12,
      "infantPrice": 0
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:16:52 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/attractions/{id}


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
/api/attractions/{attractionId}/images


Parameters
Cancel
Reset
Name	Description
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
Request body

multipart/form-data
files
array<string>
adminLogin.png-
homeHeroBg.jpg-
Polygon 1.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@adminLogin.png;type=image/png' \
  -F 'files=@homeHeroBg.jpg;type=image/jpeg' \
  -F 'files=@Polygon 1.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "images": [
    {
      "id": "158eb349-a195-4928-aea8-b4ced425eadd",
      "imageUrl": "/uploads/attractions/81d989d8c0a2482a94fff069e05919f4.webp"
    },
    {
      "id": "61ca1445-f74e-41a6-9dcf-1a7c9b1772cf",
      "imageUrl": "/uploads/attractions/c597a8d66428468db85297e63373c952.webp"
    },
    {
      "id": "2e4c0b03-ca4d-4640-8a91-1c7efcfe0142",
      "imageUrl": "/uploads/attractions/26c07e4ff201423f90d35fbc35a961f0.webp"
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:15:35 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/attractions/{attractionId}/images


Parameters
Cancel
Name	Description
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "2e4c0b03-ca4d-4640-8a91-1c7efcfe0142",
    "imageUrl": "/uploads/attractions/26c07e4ff201423f90d35fbc35a961f0.webp"
  },
  {
    "id": "158eb349-a195-4928-aea8-b4ced425eadd",
    "imageUrl": "/uploads/attractions/81d989d8c0a2482a94fff069e05919f4.webp"
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:18:45 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/attractions/{attractionId}/images/{imageId}


Parameters
Cancel
Name	Description
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
imageId *
string($uuid)
(path)
61ca1445-f74e-41a6-9dcf-1a7c9b1772cf
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images/61ca1445-f74e-41a6-9dcf-1a7c9b1772cf' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/images/61ca1445-f74e-41a6-9dcf-1a7c9b1772cf
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Attraction image deleted successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:17:18 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/attractions/{attractionId}/hero


Parameters
Cancel
Reset
Name	Description
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
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
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/hero' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Polygon 2-1.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/hero
Server response
Code	Details
200	
Response body
Download
{
  "imageUrl": "/uploads/attractions/hero/ca1839b10f95423f93e9cbdeccaa4ea0.webp"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:17:51 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/attractions/{attractionId}/hero


Parameters
Cancel
Name	Description
attractionId *
string($uuid)
(path)
9ad9718d-32ec-43f7-9023-f42e8b61e8c8
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/hero' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/attractions/9ad9718d-32ec-43f7-9023-f42e8b61e8c8/hero
Server response
Code	Details
200	
Response body
Download
{
  "imageUrl": "/uploads/attractions/hero/ca1839b10f95423f93e9cbdeccaa4ea0.webp"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 12:19:08 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/attractions/{attractionId}/hero


Parameters
Try it out
Name	Description
attractionId *
string($uuid)
(path)
attractionId
Responses
Code	Description	Links
200	
OK