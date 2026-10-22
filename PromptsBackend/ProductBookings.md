now we need to create a plan for this to be added for the app note that the booking will not be in the admin we will review them and will not create any booking there 
public enum BookingStatus
 {
     Pending = 1,
     Confirmed = 2,
     Completed = 3,
     Cancelled = 4
 }

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
  "customerName": "pola",
  "phoneNumber": "012364547852",
  "email": "pola@123.com",
  "hotelName": "ttetttest",
  "address": "abo el 3 amle ",
  "notes": "notes",
  "items": [
    {
      "productId": 1,
      "quantity": 10
    },
{
      "productId": 2,
      "quantity": 5
    },
{
      "productId": 3,
      "quantity": 1
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
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "pola",
  "phoneNumber": "012364547852",
  "email": "pola@123.com",
  "hotelName": "ttetttest",
  "address": "abo el 3 amle ",
  "notes": "notes",
  "items": [
    {
      "productId": 1,
      "quantity": 10
    },
{
      "productId": 2,
      "quantity": 5
    },
{
      "productId": 3,
      "quantity": 1
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
  "bookingId": "f4a813c0-bfa0-4192-bbe1-2717cdc3cfef",
  "bookingReference": "PRD-20261022-AB5CF1",
  "bookingType": "Product",
  "customerName": "pola",
  "phoneNumber": "012364547852",
  "email": "pola@123.com",
  "hotelName": "ttetttest",
  "address": "abo el 3 amle",
  "notes": "notes",
  "bookingDate": "2026-10-22T12:57:05.0483852Z",
  "status": 1,
  "statusName": "Pending",
  "subtotalUsd": 185,
  "discountAmountUsd": 0,
  "finalPriceUsd": 185,
  "currency": "USD",
  "exchangeRate": 1,
  "displayFinalPrice": 185,
  "items": [
    {
      "id": "5e541c3f-b3c0-445e-bdbd-9531fe9791f4",
      "productId": 1,
      "productName": "string",
      "productTitle": "string",
      "quantity": 10,
      "unitPriceUsd": 0,
      "lineSubtotalUsd": 0,
      "discountAmountUsd": 0,
      "lineTotalUsd": 0,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    },
    {
      "id": "78e52836-22aa-4108-b993-5b5cc0356f52",
      "productId": 2,
      "productName": "Premium Red Sea Souvenir Gift Box",
      "productTitle": "Premium Red Sea Souvenir Gift Box",
      "quantity": 5,
      "unitPriceUsd": 35,
      "lineSubtotalUsd": 175,
      "discountAmountUsd": 0,
      "lineTotalUsd": 175,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    },
    {
      "id": "aab200e9-92fe-461a-b076-168f49f32722",
      "productId": 3,
      "productName": "d",
      "productTitle": "d",
      "quantity": 1,
      "unitPriceUsd": 10,
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
 date: Thu,22 Oct 2026 12:57:04 GMT 
 location: https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef 
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
  "hotelName": "string",
  "address": "string",
  "notes": "string",
  "bookingDate": "2026-10-22T12:59:39.305Z",
  "status": 1,
  "statusName": "string",
  "subtotalUsd": 0,
  "discountAmountUsd": 0,
  "finalPriceUsd": 0,
  "currency": "string",
  "exchangeRate": 0,
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
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM'
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
      "bookingId": "f4a813c0-bfa0-4192-bbe1-2717cdc3cfef",
      "bookingReference": "PRD-20261022-AB5CF1",
      "bookingType": "Product",
      "customerName": "pola",
      "phoneNumber": "012364547852",
      "email": "pola@123.com",
      "hotelName": "ttetttest",
      "address": "abo el 3 amle",
      "notes": "notes",
      "bookingDate": "2026-10-22T12:57:05.0483852",
      "status": 1,
      "statusName": "Pending",
      "subtotalUsd": 185,
      "discountAmountUsd": 0,
      "finalPriceUsd": 185,
      "currency": "USD",
      "exchangeRate": 1,
      "displayFinalPrice": 185,
      "items": [
        {
          "id": "aab200e9-92fe-461a-b076-168f49f32722",
          "productId": 3,
          "productName": "d",
          "productTitle": "d",
          "quantity": 1,
          "unitPriceUsd": 10,
          "lineSubtotalUsd": 10,
          "discountAmountUsd": 0,
          "lineTotalUsd": 10,
          "unitPriceDisplay": null,
          "lineTotalDisplay": null
        },
        {
          "id": "78e52836-22aa-4108-b993-5b5cc0356f52",
          "productId": 2,
          "productName": "Premium Red Sea Souvenir Gift Box",
          "productTitle": "Premium Red Sea Souvenir Gift Box",
          "quantity": 5,
          "unitPriceUsd": 35,
          "lineSubtotalUsd": 175,
          "discountAmountUsd": 0,
          "lineTotalUsd": 175,
          "unitPriceDisplay": null,
          "lineTotalDisplay": null
        },
        {
          "id": "5e541c3f-b3c0-445e-bdbd-9531fe9791f4",
          "productId": 1,
          "productName": "string",
          "productTitle": "string",
          "quantity": 10,
          "unitPriceUsd": 0,
          "lineSubtotalUsd": 0,
          "discountAmountUsd": 0,
          "lineTotalUsd": 0,
          "unitPriceDisplay": null,
          "lineTotalDisplay": null
        }
      ]
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 1,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:57:11 GMT 
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
      "hotelName": "string",
      "address": "string",
      "notes": "string",
      "bookingDate": "2026-10-22T12:59:39.324Z",
      "status": 1,
      "statusName": "string",
      "subtotalUsd": 0,
      "discountAmountUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
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
f4a813c0-bfa0-4192-bbe1-2717cdc3cfef
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM'
Request URL
https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef
Server response
Code	Details
200	
Response body
Download
{
  "bookingId": "f4a813c0-bfa0-4192-bbe1-2717cdc3cfef",
  "bookingReference": "PRD-20261022-AB5CF1",
  "bookingType": "Product",
  "customerName": "pola",
  "phoneNumber": "012364547852",
  "email": "pola@123.com",
  "hotelName": "ttetttest",
  "address": "abo el 3 amle",
  "notes": "notes",
  "bookingDate": "2026-10-22T12:57:05.0483852",
  "status": 1,
  "statusName": "Pending",
  "subtotalUsd": 185,
  "discountAmountUsd": 0,
  "finalPriceUsd": 185,
  "currency": "USD",
  "exchangeRate": 1,
  "displayFinalPrice": 185,
  "items": [
    {
      "id": "aab200e9-92fe-461a-b076-168f49f32722",
      "productId": 3,
      "productName": "d",
      "productTitle": "d",
      "quantity": 1,
      "unitPriceUsd": 10,
      "lineSubtotalUsd": 10,
      "discountAmountUsd": 0,
      "lineTotalUsd": 10,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    },
    {
      "id": "78e52836-22aa-4108-b993-5b5cc0356f52",
      "productId": 2,
      "productName": "Premium Red Sea Souvenir Gift Box",
      "productTitle": "Premium Red Sea Souvenir Gift Box",
      "quantity": 5,
      "unitPriceUsd": 35,
      "lineSubtotalUsd": 175,
      "discountAmountUsd": 0,
      "lineTotalUsd": 175,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    },
    {
      "id": "5e541c3f-b3c0-445e-bdbd-9531fe9791f4",
      "productId": 1,
      "productName": "string",
      "productTitle": "string",
      "quantity": 10,
      "unitPriceUsd": 0,
      "lineSubtotalUsd": 0,
      "discountAmountUsd": 0,
      "lineTotalUsd": 0,
      "unitPriceDisplay": null,
      "lineTotalDisplay": null
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:57:28 GMT 
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
  "hotelName": "string",
  "address": "string",
  "notes": "string",
  "bookingDate": "2026-10-22T12:59:39.336Z",
  "status": 1,
  "statusName": "string",
  "subtotalUsd": 0,
  "discountAmountUsd": 0,
  "finalPriceUsd": 0,
  "currency": "string",
  "exchangeRate": 0,
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
No links


PATCH
/api/product-bookings/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
f4a813c0-bfa0-4192-bbe1-2717cdc3cfef
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
  'https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": 2
}'
Request URL
https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef/status
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Thu,22 Oct 2026 12:58:56 GMT 
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
f4a813c0-bfa0-4192-bbe1-2717cdc3cfef
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef/cancel' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM' \
  -d ''
Request URL
https://touristtt.runasp.net/api/product-bookings/f4a813c0-bfa0-4192-bbe1-2717cdc3cfef/cancel
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
 date: Thu,22 Oct 2026 12:59:38 GMT 
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