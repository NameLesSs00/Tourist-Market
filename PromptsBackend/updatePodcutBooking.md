ProductBookings


POST
/api/product-bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "communicationMethod": "WhatsApp",
  "hotelName": "Grand Resort",
  "roomNo": "402",
  "deliveryProductId": 2,
  "deliveryDate": "2026-11-01T08:31:05.991Z",
  "deliveryTime": "14:30",
  "notes": "Please leave the package at the front desk if no answer.",
  "items": [
    {
      "productId": 2,
      "quantity": 2
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/product-bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "communicationMethod": "WhatsApp",
  "hotelName": "Grand Resort",
  "roomNo": "402",
  "deliveryProductId": 2,
  "deliveryDate": "2026-11-01T08:31:05.991Z",
  "deliveryTime": "14:30",
  "notes": "Please leave the package at the front desk if no answer.",
  "items": [
    {
      "productId": 2,
      "quantity": 2
    }
  ]
}'
Request URL
https://touristtt.runasp.net/api/product-bookings
Server response
Code	Details
201	
Response body
Download
{
  "bookingId": "f1283ffb-af51-478a-9fa6-987e7d6c8c13",
  "bookingReference": "PRD-20261101-C759DA",
  "bookingType": "Product",
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "communicationMethod": "WhatsApp",
  "hotelName": "Grand Resort",
  "roomNo": "402",
  "deliveryProductId": 2,
  "deliveryArea": "HUR",
  "deliveryDate": "2026-11-01T08:31:05.991Z",
  "deliveryTime": "14:30:00",
  "notes": "Please leave the package at the front desk if no answer.",
  "bookingDate": "2026-11-01T08:33:15.304064Z",
  "status": 1,
  "statusName": "Pending",
  "subtotalUsd": 10,
  "deliveryFeeUsd": 4,
  "discountAmountUsd": 0,
  "finalPriceUsd": 14,
  "currency": "USD",
  "exchangeRate": 1,
  "displaySubtotal": null,
  "displayDeliveryFee": null,
  "displayFinalPrice": 14,
  "items": [
    {
      "id": "daccdb7f-0a30-4324-9edb-7cc120c96f24",
      "productId": 2,
      "productName": "black tea",
      "productTitle": "black tea",
      "quantity": 2,
      "unitPriceUsd": 5,
      "lineSubtotalUsd": 10,
      "discountAmountUsd": 0,
      "lineTotalUsd": 10,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:33:15 GMT 
 location: https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
201	
Created

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingReference": "string",
  "bookingType": "string",
  "customerName": "string",
  "phoneNumber": "string",
  "email": "string",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "communicationMethod": "string",
  "hotelName": "string",
  "roomNo": "string",
  "deliveryProductId": 0,
  "deliveryArea": "string",
  "deliveryDate": "2026-11-01T08:34:20.414Z",
  "deliveryTime": "string",
  "notes": "string",
  "bookingDate": "2026-11-01T08:34:20.414Z",
  "status": 1,
  "statusName": "string",
  "subtotalUsd": 0,
  "deliveryFeeUsd": 0,
  "discountAmountUsd": 0,
  "finalPriceUsd": 0,
  "currency": "string",
  "exchangeRate": 0,
  "displaySubtotal": 0,
  "displayDeliveryFee": 0,
  "displayFinalPrice": 0,
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "productId": 0,
      "productName": "string",
      "productTitle": "string",
      "quantity": 0,
      "unitPriceUsd": 0,
      "lineSubtotalUsd": 0,
      "discountAmountUsd": 0,
      "lineTotalUsd": 0,
      "unitPriceDisplay": 0,
      "lineTotalDisplay": 0
    }
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/product-bookings


Parameters
Cancel
Name	Description
Search
string
(query)
Search
Email
string
(query)
Email
PhoneNumber
string
(query)
PhoneNumber
Status
integer($int32)
(query)

--
FromDate
string($date-time)
(query)
FromDate
ToDate
string($date-time)
(query)
ToDate
Currency
string
(query)
Currency
SortBy
string
(query)
SortBy
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/product-bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM'
Request URL
https://touristtt.runasp.net/api/product-bookings
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "bookingId": "f1283ffb-af51-478a-9fa6-987e7d6c8c13",
      "bookingReference": "PRD-20261101-C759DA",
      "bookingType": "Product",
      "customerName": "John Doe",
      "phoneNumber": "+1234567890",
      "email": "john.doe@example.com",
      "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
      "communicationMethod": "WhatsApp",
      "hotelName": "Grand Resort",
      "roomNo": "402",
      "deliveryProductId": 2,
      "deliveryArea": "HUR",
      "deliveryDate": "2026-11-01T08:31:05.991",
      "deliveryTime": "14:30:00",
      "notes": "Please leave the package at the front desk if no answer.",
      "bookingDate": "2026-11-01T08:33:15.304064",
      "status": 1,
      "statusName": "Pending",
      "subtotalUsd": 10,
      "deliveryFeeUsd": 4,
      "discountAmountUsd": 0,
      "finalPriceUsd": 14,
      "currency": "USD",
      "exchangeRate": 1,
      "displaySubtotal": null,
      "displayDeliveryFee": null,
      "displayFinalPrice": 14,
      "items": [
        {
          "id": "daccdb7f-0a30-4324-9edb-7cc120c96f24",
          "productId": 2,
          "productName": "black tea",
          "productTitle": "black tea",
          "quantity": 2,
          "unitPriceUsd": 5,
          "lineSubtotalUsd": 10,
          "discountAmountUsd": 0,
          "lineTotalUsd": 10,
          "unitPriceDisplay": null,
          "lineTotalDisplay": null
        }
      ]
    },
    {
      "bookingId": "27257c5f-40c8-4af1-8842-671a4dde9f94",
      "bookingReference": "PRD-20261031-5E7548",
      "bookingType": "Product",
      "customerName": "John Doe",
      "phoneNumber": "+201234567890",
      "email": "johndoe@example.com",
      "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
      "communicationMethod": "WhatsApp",
      "hotelName": "Steigenberger ALDAU Beach Hotel",
      "roomNo": "402",
      "deliveryProductId": null,
      "deliveryArea": null,
      "deliveryDate": null,
      "deliveryTime": null,
      "notes": "Please deliver before 6 PM",
      "bookingDate": "2026-10-31T11:08:38.0293705",
      "status": 1,
      "statusName": "Pending",
      "subtotalUsd": 10,
      "deliveryFeeUsd": 0,
      "discountAmountUsd": 0,
      "finalPriceUsd": 10,
      "currency": "USD",
      "exchangeRate": 1,
      "displaySubtotal": null,
      "displayDeliveryFee": null,
      "displayFinalPrice": 10,
      "items": [
        {
          "id": "e6ed269d-6a0e-4f9b-ae39-f9784979b166",
          "productId": 1,
          "productName": "ANANAS-PINEAPPLES",
          "productTitle": "ANANAS-PINEAPPLES",
          "quantity": 2,
          "unitPriceUsd": 5,
          "lineSubtotalUsd": 10,
          "discountAmountUsd": 0,
          "lineTotalUsd": 10,
          "unitPriceDisplay": null,
          "lineTotalDisplay": null
        }
      ]
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 2,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:33:20 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "items": [
    {
      "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingReference": "string",
      "bookingType": "string",
      "customerName": "string",
      "phoneNumber": "string",
      "email": "string",
      "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "communicationMethod": "string",
      "hotelName": "string",
      "roomNo": "string",
      "deliveryProductId": 0,
      "deliveryArea": "string",
      "deliveryDate": "2026-11-01T08:34:20.429Z",
      "deliveryTime": "string",
      "notes": "string",
      "bookingDate": "2026-11-01T08:34:20.429Z",
      "status": 1,
      "statusName": "string",
      "subtotalUsd": 0,
      "deliveryFeeUsd": 0,
      "discountAmountUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
      "displaySubtotal": 0,
      "displayDeliveryFee": 0,
      "displayFinalPrice": 0,
      "items": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "productId": 0,
          "productName": "string",
          "productTitle": "string",
          "quantity": 0,
          "unitPriceUsd": 0,
          "lineSubtotalUsd": 0,
          "discountAmountUsd": 0,
          "lineTotalUsd": 0,
          "unitPriceDisplay": 0,
          "lineTotalDisplay": 0
        }
      ]
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/product-bookings/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
f1283ffb-af51-478a-9fa6-987e7d6c8c13
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM'
Request URL
https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13
Server response
Code	Details
200	
Response body
Download
{
  "bookingId": "f1283ffb-af51-478a-9fa6-987e7d6c8c13",
  "bookingReference": "PRD-20261101-C759DA",
  "bookingType": "Product",
  "customerName": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "communicationMethod": "WhatsApp",
  "hotelName": "Grand Resort",
  "roomNo": "402",
  "deliveryProductId": 2,
  "deliveryArea": "HUR",
  "deliveryDate": "2026-11-01T08:31:05.991",
  "deliveryTime": "14:30:00",
  "notes": "Please leave the package at the front desk if no answer.",
  "bookingDate": "2026-11-01T08:33:15.304064",
  "status": 1,
  "statusName": "Pending",
  "subtotalUsd": 10,
  "deliveryFeeUsd": 4,
  "discountAmountUsd": 0,
  "finalPriceUsd": 14,
  "currency": "USD",
  "exchangeRate": 1,
  "displaySubtotal": null,
  "displayDeliveryFee": null,
  "displayFinalPrice": 14,
  "items": [
    {
      "id": "daccdb7f-0a30-4324-9edb-7cc120c96f24",
      "productId": 2,
      "productName": "black tea",
      "productTitle": "black tea",
      "quantity": 2,
      "unitPriceUsd": 5,
      "lineSubtotalUsd": 10,
      "discountAmountUsd": 0,
      "lineTotalUsd": 10,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:33:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingReference": "string",
  "bookingType": "string",
  "customerName": "string",
  "phoneNumber": "string",
  "email": "string",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "communicationMethod": "string",
  "hotelName": "string",
  "roomNo": "string",
  "deliveryProductId": 0,
  "deliveryArea": "string",
  "deliveryDate": "2026-11-01T08:34:20.437Z",
  "deliveryTime": "string",
  "notes": "string",
  "bookingDate": "2026-11-01T08:34:20.437Z",
  "status": 1,
  "statusName": "string",
  "subtotalUsd": 0,
  "deliveryFeeUsd": 0,
  "discountAmountUsd": 0,
  "finalPriceUsd": 0,
  "currency": "string",
  "exchangeRate": 0,
  "displaySubtotal": 0,
  "displayDeliveryFee": 0,
  "displayFinalPrice": 0,
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "productId": 0,
      "productName": "string",
      "productTitle": "string",
      "quantity": 0,
      "unitPriceUsd": 0,
      "lineSubtotalUsd": 0,
      "discountAmountUsd": 0,
      "lineTotalUsd": 0,
      "unitPriceDisplay": 0,
      "lineTotalDisplay": 0
    }
  ]
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
PATCH
/api/product-bookings/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
f1283ffb-af51-478a-9fa6-987e7d6c8c13
Request body

application/json
{
  "status": 2
}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": 2
}'
Request URL
https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13/status
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Sun,01 Nov 2026 08:34:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
204	
No Content

No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

POST
/api/product-bookings/{id}/cancel


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
f1283ffb-af51-478a-9fa6-987e7d6c8c13
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13/cancel' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM' \
  -d ''
Request URL
https://touristtt.runasp.net/api/product-bookings/f1283ffb-af51-478a-9fa6-987e7d6c8c13/cancel
Server response
Code	Details
200	
Response body
Download
{
  "message": "Booking has been cancelled successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:34:19 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}