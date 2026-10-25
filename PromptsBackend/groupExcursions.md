now we need to create a plan so that add the gropus excrtions to the website to the admin pages note that the update for the images for the single trips is that we should put the same things like the images and heros it's also used in the private and also in the group okay ?
also the group should have the detalis only the attractoins and the excerutions servers and private vhciels is not realted at all only the detlais could you now create a full plan so that we could add the missing endpoints for the private and add the group excruitons to the website please create a a full plan to it 
note that the "isPrimary": false is not working for not and it will not be so we need to check the same id image that has the value of it or check the url okay review the data we will find hte answer for this create a full plan please 
GET
/api/admin/excursions/group


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
  'https://touristtt.runasp.net/api/admin/excursions/group?currency=USD&page=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjkxMTVjY2NmLWY4NTItNDcwOS04ZjBhLTZiYWUxZmMzODY4ZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NzMzOTMsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.lQULl53ZY1oFaOspdm3jBHdZL74HOt6wpg-mKW9qSR4'
Request URL
https://touristtt.runasp.net/api/admin/excursions/group?currency=USD&page=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
      "slug": "orange-bay-island-snorkeling-1792914191",
      "title": "Orange Bay Island Full-Day Snorkeling Trip",
      "subtitle": "Crystal-clear waters and white sandy beaches",
      "shortDescription": "Sail to Orange Bay Island with snorkeling",
      "excursionType": "Boat Trip & Island Tour",
      "durationHours": 8,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": "/uploads/executions/54cd43394d1f47f0b1788cc74ee3659c.webp",
      "heroImageUrl": null,
      "categorySlug": "boat-trips-and-snorkeling",
      "categoryTitle": "Boat Trips & Snorkeling",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 45,
        "childPrice": 25,
        "infantPrice": 0
      }
    },
    {
      "id": "f741c11c-bcc2-406d-aada-ad9877ead20f",
      "slug": "private-desert-safari-2",
      "title": "Private Desert Sunset Safari & Bedouin Dinner",
      "subtitle": "Private 4x4 quad ride and traditional dinner",
      "shortDescription": "Exclusive desert journey with private guide",
      "excursionType": "Private Desert Safari",
      "durationHours": 6,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "desert-safaris",
      "categoryTitle": "Desert Safaris",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 120,
        "childPrice": 60,
        "infantPrice": 0
      }
    },
    {
      "id": "b9803795-3709-4557-ac11-eec2c9b19bf1",
      "slug": "private-vip-speedboat-snorkeling-2",
      "title": "Private VIP Speedboat & Snorkeling Adventure",
      "subtitle": "Exclusive access to Giftun Island",
      "shortDescription": "Private speedboat with custom snorkeling",
      "excursionType": "Private Boat Trip",
      "durationHours": 5,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "boat-trips-and-snorkeling",
      "categoryTitle": "Boat Trips & Snorkeling",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 180,
        "childPrice": 90,
        "infantPrice": 0
      }
    },
    {
      "id": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
      "slug": "private-dolphin-house-snorkeling-2",
      "title": "Private Dolphin House Speedboat & Snorkeling Trip",
      "subtitle": "Swim with wild dolphins in total privacy",
      "shortDescription": "Exclusive private speedboat to Dolphin House reef",
      "excursionType": "Private Boat Trip",
      "durationHours": 5,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "boat-trips-and-snorkeling",
      "categoryTitle": "Boat Trips & Snorkeling",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 190,
        "childPrice": 95,
        "infantPrice": 0
      }
    },
    {
      "id": "7a478024-fa99-43e2-b9d2-5bd35d59ca2f",
      "slug": "luxor-day-trip-2",
      "title": "Luxor Valley of the Kings & Karnak Temple Day Trip",
      "subtitle": "Explore ancient pharaonic history",
      "shortDescription": "Travel to Luxor to discover ancient temples",
      "excursionType": "Historical Day Tour",
      "durationHours": 14,
      "stars": "4.5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "historical-tours",
      "categoryTitle": "Historical Tours",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 110,
        "childPrice": 55,
        "infantPrice": 0
      }
    },
    {
      "id": "b31eecd2-3f35-4de2-a9a2-c415c91755bb",
      "slug": "desert-sunset-safari",
      "title": "Private Desert Sunset Safari & Bedouin Dinner",
      "subtitle": "Private 4x4 quad ride and traditional dinner",
      "shortDescription": "Exclusive desert journey with private guide",
      "excursionType": "Private Desert Safari",
      "durationHours": 6,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "desert-safaris",
      "categoryTitle": "Desert Safaris",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 120,
        "childPrice": 60,
        "infantPrice": 0
      }
    },
    {
      "id": "26f331ac-b64b-4e5e-9503-f688838be1f2",
      "slug": "luxor-day-trip",
      "title": "Luxor Valley of the Kings & Karnak Temple Day Trip",
      "subtitle": "Explore ancient pharaonic history",
      "shortDescription": "Travel to Luxor to discover ancient temples",
      "excursionType": "Historical Day Tour",
      "durationHours": 14,
      "stars": "4.5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "historical-tours",
      "categoryTitle": "Historical Tours",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 110,
        "childPrice": 55,
        "infantPrice": 0
      }
    },
    {
      "id": "b995e856-993b-4954-a7dd-6feba479d3c5",
      "slug": "group-boat-trip-2",
      "title": "Orange Bay Island Full-Day Snorkeling Trip",
      "subtitle": "Crystal-clear waters and white sandy beaches",
      "shortDescription": "Sail to Orange Bay Island with snorkeling",
      "excursionType": "Boat Trip & Island Tour",
      "durationHours": 8,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "boat-trips-and-snorkeling",
      "categoryTitle": "Boat Trips & Snorkeling",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 45,
        "childPrice": 25,
        "infantPrice": 0
      }
    },
    {
      "id": "70d37295-8b66-45f4-84db-079218fe5692",
      "slug": "group-boat-trip",
      "title": "Orange Bay Island Full-Day Snorkeling Trip",
      "subtitle": "Crystal-clear waters and white sandy beaches",
      "shortDescription": "Sail to Orange Bay Island with snorkeling",
      "excursionType": "Boat Trip & Island Tour",
      "durationHours": 8,
      "stars": "5",
      "maxAttractions": 0,
      "primaryImageUrl": null,
      "heroImageUrl": null,
      "categorySlug": "boat-trips-and-snorkeling",
      "categoryTitle": "Boat Trips & Snorkeling",
      "isFeatured": true,
      "rating": 5,
      "price": {
        "currencyCode": "USD",
        "adultPrice": 45,
        "childPrice": 25,
        "infantPrice": 0
      }
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 9,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 12:10:17 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admin/excursions/group


Parameters
Try it out
Name	Description
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
GET
/api/admin/excursions/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
292df7dc-f7b7-4056-bc9b-3b368717ad2d
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
  'https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjkxMTVjY2NmLWY4NTItNDcwOS04ZjBhLTZiYWUxZmMzODY4ZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NzMzOTMsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.lQULl53ZY1oFaOspdm3jBHdZL74HOt6wpg-mKW9qSR4'
Request URL
https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "fullProgram": "Two snorkeling stops, open-buffet lunch",
  "videoUrl": "https://www.youtube.com/watch?v=orangebay",
  "heroImage": null,
  "primaryImageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp",
  "imageList": [
    {
      "id": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54",
      "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
      "imageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp",
      "isPrimary": false
    },
    {
      "id": "2415d4a3-759c-4a67-b1a5-b0dc200a66e4",
      "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
      "imageUrl": "/uploads/executions/54cd43394d1f47f0b1788cc74ee3659c.webp",
      "isPrimary": false
    },
    {
      "id": "6b437946-ae91-4262-a1b7-c8145f21208e",
      "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
      "imageUrl": "/uploads/executions/8e02fd24a4a548fabbafab502ce65f72.webp",
      "isPrimary": false
    }
  ],
  "faqs": [],
  "attractions": [],
  "services": [],
  "id": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
  "slug": "orange-bay-island-snorkeling-1792914191",
  "title": "Orange Bay Island Full-Day Snorkeling Trip",
  "subtitle": "Crystal-clear waters and white sandy beaches",
  "shortDescription": "Sail to Orange Bay Island with snorkeling",
  "excursionType": "Boat Trip & Island Tour",
  "durationHours": 8,
  "stars": "5",
  "maxAttractions": 0,
  "heroImageUrl": null,
  "categorySlug": null,
  "categoryTitle": "Boat Trips & Snorkeling",
  "isFeatured": true,
  "rating": 0,
  "price": {
    "currencyCode": "USD",
    "adultPrice": 45,
    "childPrice": 25,
    "infantPrice": 0
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 13:53:28 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/admin/excursions/{id}


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
  "excursionType": "string",
  "stars": "string",
  "maxAttractions": 0,
  "adultPriceUsd": 0,
  "childPriceUsd": 0,
  "infantPriceUsd": 0,
  "durationHours": 0,
  "videoUrl": "string",
  "isFeatured": true,
  "isActive": true,
  "translations": {
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
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admin/excursions/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses

POST
/api/admin/excursions/{id}/images


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
isPrimary
boolean
(query)
Default value : false


false
Request body

multipart/form-data
file
string($binary)
Responses
Code	Description	Links
200	
OK

No links

GET
/api/admin/excursions/{id}/images


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
292df7dc-f7b7-4056-bc9b-3b368717ad2d
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjkxMTVjY2NmLWY4NTItNDcwOS04ZjBhLTZiYWUxZmMzODY4ZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NzMzOTMsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.lQULl53ZY1oFaOspdm3jBHdZL74HOt6wpg-mKW9qSR4'
Request URL
https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d/images
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54",
    "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
    "imageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp",
    "isPrimary": false
  },
  {
    "id": "2415d4a3-759c-4a67-b1a5-b0dc200a66e4",
    "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
    "imageUrl": "/uploads/executions/54cd43394d1f47f0b1788cc74ee3659c.webp",
    "isPrimary": false
  },
  {
    "id": "6b437946-ae91-4262-a1b7-c8145f21208e",
    "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
    "imageUrl": "/uploads/executions/8e02fd24a4a548fabbafab502ce65f72.webp",
    "isPrimary": false
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 12:11:40 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admin/excursions/{id}/images/{imageId}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
imageId *
string($uuid)
(path)
imageId
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/admin/excursions/{id}/primary-image


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
292df7dc-f7b7-4056-bc9b-3b368717ad2d
Request body

application/json
{
  "imageId": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54"
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d/primary-image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjkxMTVjY2NmLWY4NTItNDcwOS04ZjBhLTZiYWUxZmMzODY4ZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NzMzOTMsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.lQULl53ZY1oFaOspdm3jBHdZL74HOt6wpg-mKW9qSR4' \
  -H 'Content-Type: application/json' \
  -d '{
  "imageId": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54"
}'
Request URL
https://touristtt.runasp.net/api/admin/excursions/292df7dc-f7b7-4056-bc9b-3b368717ad2d/primary-image
Server response
Code	Details
200	
Response body
Download
{
  "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
  "primaryImageId": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54",
  "primaryImageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 12:11:35 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admin/excursions/{id}/hero-image


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

multipart/form-data
file
string($binary)
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admin/excursions/{id}/hero-image


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