DELETE
/api/admin/subservices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
c1785ddb-9b0a-41ae-b993-1f62a657b456
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/admin/subservices/c1785ddb-9b0a-41ae-b993-1f62a657b456' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ2OTU0NzNlLWQ2NjUtNDc5Mi04ODBhLTVhYjI5NTRkZDVhMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM5MjgwODAsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.4bYQ0JhLbeZ2mbsKyMu98jwcS_Ixy3bG-0ENR1OSI7A'
Request URL
https://touristtt.runasp.net/api/admin/subservices/c1785ddb-9b0a-41ae-b993-1f62a657b456
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubService deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,05 Nov 2026 13:37:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/admin/subservices/deleted


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
  'https://touristtt.runasp.net/api/admin/subservices/deleted?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ2OTU0NzNlLWQ2NjUtNDc5Mi04ODBhLTVhYjI5NTRkZDVhMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM5MjgwODAsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.4bYQ0JhLbeZ2mbsKyMu98jwcS_Ixy3bG-0ENR1OSI7A'
Request URL
https://touristtt.runasp.net/api/admin/subservices/deleted?pageNumber=1&pageSize=10
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
        "id": "5d8e44ca-2433-4946-a1b7-b354e5b8f580",
        "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
        "title": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "subtitle": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "description": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "textTopImage": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "note": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "alert": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitp",
        "basePriceUSD": 0,
        "price": 0,
        "currency": "USD",
        "isActive": false,
        "createdAt": "2026-11-05T13:26:02.8691238",
        "isDeleted": true,
        "deletedAt": "2026-11-05T13:26:02.9737959",
        "images": [],
        "options": [
          {
            "id": "fd656ffa-c265-412c-9905-a6f92a4c1427",
            "name": "Rate Basis",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "89bc873d-d535-4ab6-94d7-91be8837687d",
                "optionId": "fd656ffa-c265-412c-9905-a6f92a4c1427",
                "key": "limitprobe limitprobe limitpro",
                "value": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "8c6e54c9-75be-4789-a2d7-65b1e4bd0ce4",
            "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "112f3645-f742-4f9e-a1e2-6d843e7b9b95",
                "featureId": "8c6e54c9-75be-4789-a2d7-65b1e4bd0ce4",
                "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "a1755276-5927-41d8-a7d5-938cb1c18205",
        "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
        "title": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "subtitle": null,
        "description": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "textTopImage": null,
        "note": null,
        "alert": null,
        "basePriceUSD": 0,
        "price": 0,
        "currency": "USD",
        "isActive": false,
        "createdAt": "2026-11-05T13:25:47.0501284",
        "isDeleted": true,
        "deletedAt": "2026-11-05T13:26:02.6018631",
        "images": [],
        "options": [
          {
            "id": "1c8c4a49-0edd-46d6-bda3-832937b2af94",
            "name": "Rate Basis",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "61cfc8e9-6dcb-48a2-a2d5-a26895afd72a",
                "optionId": "1c8c4a49-0edd-46d6-bda3-832937b2af94",
                "key": "limitprobe limitprobe limitpro",
                "value": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "be50fce0-52f5-4be6-8698-45698cbafcc1",
            "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "c1282dfe-822d-40bd-a8ed-0853bd0ec86e",
                "featureId": "be50fce0-52f5-4be6-8698-45698cbafcc1",
                "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "95748459-598e-4089-ae55-80b6680b371f",
        "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
        "title": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "subtitle": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "description": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "textTopImage": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "note": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitp",
        "alert": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "basePriceUSD": 0,
        "price": 0,
        "currency": "USD",
        "isActive": false,
        "createdAt": "2026-11-05T13:24:18.9066833",
        "isDeleted": true,
        "deletedAt": "2026-11-05T13:24:19.1561002",
        "images": [],
        "options": [
          {
            "id": "584809d8-8344-4985-bcee-525d2855bbbe",
            "name": "Rate Basis",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "55016aca-56dd-4076-b8d0-0064bc353b04",
                "optionId": "584809d8-8344-4985-bcee-525d2855bbbe",
                "key": "limitprobe limitprobe limitpro",
                "value": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "7236e1bb-7432-43ec-9295-6fbaf199b9e5",
            "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "12887993-8305-491e-ac0b-7678dc82e200",
                "featureId": "7236e1bb-7432-43ec-9295-6fbaf199b9e5",
                "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "7743a67a-781f-4390-a458-7e264c46c73f",
        "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
        "title": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "subtitle": null,
        "description": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "textTopImage": null,
        "note": null,
        "alert": null,
        "basePriceUSD": 0,
        "price": 0,
        "currency": "USD",
        "isActive": false,
        "createdAt": "2026-11-05T13:23:11.4376698",
        "isDeleted": true,
        "deletedAt": "2026-11-05T13:23:47.6277764",
        "images": [],
        "options": [
          {
            "id": "263c5bc7-942d-4aa0-9409-52dab85014dd",
            "name": "Rate Basis",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "5527d28f-af03-43e3-912d-a46958ce3ec8",
                "optionId": "263c5bc7-942d-4aa0-9409-52dab85014dd",
                "key": "limitprobe limitprobe limitpro",
                "value": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "41c230bb-5d9c-4383-b208-72714ec018a9",
            "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "6981e520-8ec5-4e45-bed4-a06e7c6b5da6",
                "featureId": "41c230bb-5d9c-4383-b208-72714ec018a9",
                "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ]
      },
      {
        "id": "7b37cd2f-c7ff-43dd-9eb9-e0ba2c9ba607",
        "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
        "title": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "subtitle": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "description": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitp",
        "textTopImage": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "note": "limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe limitprobe",
        "alert": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
        "basePriceUSD": 0,
        "price": 0,
        "currency": "USD",
        "isActive": false,
        "createdAt": "2026-11-05T13:21:17.4843532",
        "isDeleted": true,
        "deletedAt": "2026-11-05T13:21:28.3603398",
        "images": [],
        "options": [
          {
            "id": "94988de9-b2a6-41cf-8251-202e0e5c8d71",
            "name": "Rate Basis",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "7d66fc35-81bd-430f-8847-be20808152a0",
                "optionId": "94988de9-b2a6-41cf-8251-202e0e5c8d71",
                "key": "limitprobe limitprobe limitpro",
                "value": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
                "isActive": true,
                "displayOrder": 0
              }
            ]
          }
        ],
        "features": [
          {
            "id": "d389933d-12da-4ed9-94e1-a78fa51d1d2d",
            "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
            "isActive": true,
            "displayOrder": 0,
            "values": [
              {
                "id": "68d35f0d-6ece-48a3-86fc-099547e7170f",
                "featureId": "d389933d-12da-4ed9-94e1-a78fa51d1d2d",
                "name": "limitprobe limitprobe limitprobe limitprobe limitprobe limit",
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
    "totalCount": 5,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,05 Nov 2026 13:36:18 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admin/subservices/{id}/restore


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
c1785ddb-9b0a-41ae-b993-1f62a657b456
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/admin/subservices/c1785ddb-9b0a-41ae-b993-1f62a657b456/restore' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ2OTU0NzNlLWQ2NjUtNDc5Mi04ODBhLTVhYjI5NTRkZDVhMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM5MjgwODAsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.4bYQ0JhLbeZ2mbsKyMu98jwcS_Ixy3bG-0ENR1OSI7A' \
  -d ''
Request URL
https://touristtt.runasp.net/api/admin/subservices/c1785ddb-9b0a-41ae-b993-1f62a657b456/restore
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubService restored successfully.",
  "data": {
    "id": "c1785ddb-9b0a-41ae-b993-1f62a657b456",
    "serviceId": "ab273263-625a-4a30-b7a7-1514a37f63ab",
    "title": "One7 Residence Hurghada Penthouse",
    "subtitle": "Luxury 2-Bedroom Rooftop Penthouse in Central El Kawther",
    "description": "Modern luxury 2-bedroom penthouse in the prestigious One7 Residence. Features private rooftop terrace, community swimming pools, landscaped gardens, and 24/7 security.",
    "textTopImage": "Exclusive Penthouse for Rent",
    "note": "1) Check-in from 14:00, Check-out by 11:00.\n2) A refundable security deposit of  is required upon check-in.\n3) Strict no-smoking policy inside the apartment.",
    "alert": "Fiber-optic internet, community pool pass, and weekly cleaning service included.",
    "basePriceUSD": 130,
    "price": 130,
    "currency": "USD",
    "isActive": false,
    "createdAt": "2026-10-29T16:22:27.28057",
    "isDeleted": false,
    "deletedAt": null,
    "images": [
      {
        "id": "117afab9-2645-4e86-9d22-bd97fa5b7c8a",
        "subServiceId": "c1785ddb-9b0a-41ae-b993-1f62a657b456",
        "imageUrl": "/uploads/services/subservices/ecddf2901a9e40c8aa5e24670be44acd.webp",
        "displayOrder": 1,
        "createdAt": "2026-10-31T12:02:52.6824778"
      },
      {
        "id": "ed2a6fde-f6c0-4e20-8ce2-b0cdbdd4610c",
        "subServiceId": "c1785ddb-9b0a-41ae-b993-1f62a657b456",
        "imageUrl": "/uploads/services/subservices/12c24ba64c374ad5956b782ba4758a0e.webp",
        "displayOrder": 2,
        "createdAt": "2026-11-01T15:46:08.433847"
      },
      {
        "id": "607166b1-1f86-4b41-ae94-9a20a5aba4b8",
        "subServiceId": "c1785ddb-9b0a-41ae-b993-1f62a657b456",
        "imageUrl": "/uploads/services/subservices/bb54eb41a598499aaa44769f2a58d5d2.webp",
        "displayOrder": 3,
        "createdAt": "2026-11-01T15:46:08.9104528"
      }
    ],
    "options": [
      {
        "id": "d7bffdd6-e831-46a2-b31e-3c471f5194fb",
        "name": "Rental Duration",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "f144b4aa-9ce2-4e2b-8415-03f0ba51b7b6",
            "optionId": "d7bffdd6-e831-46a2-b31e-3c471f5194fb",
            "key": "Daily Rate (Min 2 Days)",
            "value": " per night",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "d5a1a39a-99c3-443f-a687-5ceb67fc7cc3",
            "optionId": "d7bffdd6-e831-46a2-b31e-3c471f5194fb",
            "key": "Weekly Rate (7+ Days)",
            "value": " per night",
            "isActive": true,
            "displayOrder": 0
          }
        ]
      }
    ],
    "features": [
      {
        "id": "5a59a7a6-89dd-41eb-952c-e58a52b9d522",
        "name": "Property Specs",
        "isActive": true,
        "displayOrder": 0,
        "values": [
          {
            "id": "48c57788-f0f6-47aa-9298-0c695cff03ad",
            "featureId": "5a59a7a6-89dd-41eb-952c-e58a52b9d522",
            "name": "Layout: 2 King Bedrooms + 2 Bathrooms",
            "isActive": true,
            "displayOrder": 0
          },
          {
            "id": "af4c7e7c-812a-4520-befa-93bd884360a8",
            "featureId": "5a59a7a6-89dd-41eb-952c-e58a52b9d522",
            "name": "Location: El Kawther, Hurghada",
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
 date: Thu,05 Nov 2026 13:38:35 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description