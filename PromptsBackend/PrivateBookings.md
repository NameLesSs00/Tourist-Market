PrivateBookings


POST
/api/bookings/excursions/private


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "customerName": "John Doe",
  "phone": "+201001234567",
  "whatsApp": "+201001234567",
  "hotelName": "Hilton Hurghada",
  "roomNumber": "305",
  "paymentMethod": 1,
  "notes": "Please arrange pickup at hotel lobby at 8 AM",
  "excursions": [
    {
      "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
      "excursionDate": "2026-10-27T15:42:08.897Z",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0,
      "serviceIds": [
        "03f87255-1428-45e7-aa6a-a64f4cd8b813",
        "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
        "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
        "b844f692-162b-4dd3-82af-3b2c808a1099",
        "6598a749-870e-4902-a67b-d23dc2af7289"
      ],
      "attractionIds": [
        "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
        "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
        "e25086dc-87c9-463c-9ce1-b81293c27ed4"
      ]
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/bookings/excursions/private' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "John Doe",
  "phone": "+201001234567",
  "whatsApp": "+201001234567",
  "hotelName": "Hilton Hurghada",
  "roomNumber": "305",
  "paymentMethod": 1,
  "notes": "Please arrange pickup at hotel lobby at 8 AM",
  "excursions": [
    {
      "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
      "excursionDate": "2026-10-27T15:42:08.897Z",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0,
      "serviceIds": [
        "03f87255-1428-45e7-aa6a-a64f4cd8b813",
        "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
        "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
        "b844f692-162b-4dd3-82af-3b2c808a1099",
        "6598a749-870e-4902-a67b-d23dc2af7289"
      ],
      "attractionIds": [
        "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
        "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
        "e25086dc-87c9-463c-9ce1-b81293c27ed4"
      ]
    }
  ]
}'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/private
Server response
Code	Details
200	
Response body
Download
{
  "bookingId": "ebec9678-9e41-496e-9957-2265d6b520cb",
  "bookingReference": "PVT-20261025-27489E",
  "totalPrice": 171,
  "currency": "USD",
  "message": "Private booking created successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 15:44:54 GMT 
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
  "totalPrice": 0,
  "currency": "string",
  "message": "string"
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
/api/bookings/excursions/private


Parameters
Cancel
Name	Description
ExcursionId
string($uuid)
(query)
ExcursionId
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
CustomerName
string
(query)
CustomerName
Phone
string
(query)
Phone
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
  'https://touristtt.runasp.net/api/bookings/excursions/private' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjRkYmZmMTY5LTM0NjEtNDFmYy04ZDk4LTA0MDY4YjI1YzUxMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5ODY0MTIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.oss8l9qOI2Pio083ta63Jo0acn9nkY9At7qWmsqfTck'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/private
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "ebec9678-9e41-496e-9957-2265d6b520cb",
      "bookingReference": "PVT-20261025-27489E",
      "customerName": "John Doe",
      "customerPhone": "+201001234567",
      "customerWhatsApp": "+201001234567",
      "hotelName": "Hilton Hurghada",
      "roomNumber": "305",
      "bookingStatus": 2,
      "paymentMethod": 1,
      "currencyCode": "USD",
      "exchangeRate": 1,
      "totalAmountUsd": 171,
      "notes": "Please arrange pickup at hotel lobby at 8 AM",
      "createdAt": "2026-10-25T15:44:54.9841807",
      "items": [
        {
          "id": "438ac06b-3b67-4ffd-ac0a-5828b4146c50",
          "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
          "excursionTitle": "Dolphin",
          "excursionDate": "2026-10-27T15:42:08.897",
          "adultsCount": 2,
          "childrenCount": 1,
          "infantsCount": 0,
          "totalPassengers": 3,
          "basePrice": 0,
          "vehicleTransferPrivateId": "00a4c42b-c04b-4a85-9ab5-fd86c28b1b14",
          "vehiclePrivateId": "d8053696-a148-4d5e-9517-fc458de2ef27",
          "vehicleName": "car1",
          "vehicleFrom": 1,
          "vehicleTo": 3,
          "vehiclePrice": 25,
          "maxAttractions": 3,
          "servicesTotal": 21,
          "itemTotal": 171,
          "selectedAttractions": [
            {
              "attractionId": "e25086dc-87c9-463c-9ce1-b81293c27ed4",
              "title": "Fisch",
              "adultPrice": 10,
              "childPrice": 5,
              "infantPrice": 0,
              "totalPrice": 25
            },
            {
              "attractionId": "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
              "title": "Schnorchel",
              "adultPrice": 15,
              "childPrice": 8,
              "infantPrice": 0,
              "totalPrice": 38
            },
            {
              "attractionId": "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
              "title": "Foto",
              "adultPrice": 25,
              "childPrice": 12,
              "infantPrice": 0,
              "totalPrice": 62
            }
          ],
          "selectedServices": [
            {
              "serviceId": "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
              "title": "Transport",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 10,
              "totalPrice": 0
            },
            {
              "serviceId": "b844f692-162b-4dd3-82af-3b2c808a1099",
              "title": "Mittagessen",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 20,
              "totalPrice": 0
            },
            {
              "serviceId": "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
              "title": "Guide",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 25,
              "totalPrice": 0
            },
            {
              "serviceId": "03f87255-1428-45e7-aa6a-a64f4cd8b813",
              "title": "Schnorchel",
              "adultPrice": 10,
              "childPrice": 1,
              "infantPrice": 15,
              "totalPrice": 21
            },
            {
              "serviceId": "6598a749-870e-4902-a67b-d23dc2af7289",
              "title": "Weste",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 5,
              "totalPrice": 0
            }
          ]
        }
      ]
    },
    {
      "id": "eea4e534-bcfe-4dbd-811a-1062206d1245",
      "bookingReference": "PVT-20261025-B251F9",
      "customerName": "John Doe",
      "customerPhone": "+201001234567",
      "customerWhatsApp": "+201001234567",
      "hotelName": "Hilton Hurghada",
      "roomNumber": "305",
      "bookingStatus": 1,
      "paymentMethod": 1,
      "currencyCode": "USD",
      "exchangeRate": 1,
      "totalAmountUsd": 225,
      "notes": "Please arrange pickup at hotel lobby at 8 AM",
      "createdAt": "2026-10-25T10:09:20.5140098",
      "items": [
        {
          "id": "2b870c90-b72e-493a-be15-bbfc64d55846",
          "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
          "excursionTitle": "Dolphin",
          "excursionDate": "2026-10-26T10:03:21.793",
          "adultsCount": 2,
          "childrenCount": 1,
          "infantsCount": 0,
          "totalPassengers": 3,
          "basePrice": 0,
          "vehicleTransferPrivateId": "00a4c42b-c04b-4a85-9ab5-fd86c28b1b14",
          "vehiclePrivateId": "d8053696-a148-4d5e-9517-fc458de2ef27",
          "vehicleName": "car1",
          "vehicleFrom": 1,
          "vehicleTo": 3,
          "vehiclePrice": 25,
          "maxAttractions": 3,
          "servicesTotal": 75,
          "itemTotal": 225,
          "selectedAttractions": [
            {
              "attractionId": "e25086dc-87c9-463c-9ce1-b81293c27ed4",
              "title": "Fisch",
              "adultPrice": 10,
              "childPrice": 5,
              "infantPrice": 0,
              "totalPrice": 25
            },
            {
              "attractionId": "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
              "title": "Schnorchel",
              "adultPrice": 15,
              "childPrice": 8,
              "infantPrice": 0,
              "totalPrice": 38
            },
            {
              "attractionId": "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
              "title": "Foto",
              "adultPrice": 25,
              "childPrice": 12,
              "infantPrice": 0,
              "totalPrice": 62
            }
          ],
          "selectedServices": [
            {
              "serviceId": "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
              "title": "Transport",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 10
            },
            {
              "serviceId": "b844f692-162b-4dd3-82af-3b2c808a1099",
              "title": "Mittagessen",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 20
            },
            {
              "serviceId": "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
              "title": "Guide",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 25
            },
            {
              "serviceId": "03f87255-1428-45e7-aa6a-a64f4cd8b813",
              "title": "Schnorchel",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 15
            },
            {
              "serviceId": "6598a749-870e-4902-a67b-d23dc2af7289",
              "title": "Weste",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 5
            }
          ]
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
 date: Sun,25 Oct 2026 16:02:36 GMT 
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "bookingReference": "string",
      "customerName": "string",
      "customerPhone": "string",
      "customerWhatsApp": "string",
      "hotelName": "string",
      "roomNumber": "string",
      "bookingStatus": 1,
      "paymentMethod": 1,
      "currencyCode": "string",
      "exchangeRate": 0,
      "totalAmountUsd": 0,
      "notes": "string",
      "createdAt": "2026-10-25T16:02:37.453Z",
      "items": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "excursionTitle": "string",
          "excursionDate": "2026-10-25T16:02:37.453Z",
          "adultsCount": 0,
          "childrenCount": 0,
          "infantsCount": 0,
          "totalPassengers": 0,
          "basePrice": 0,
          "vehicleTransferPrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "vehicleName": "string",
          "vehicleFrom": 0,
          "vehicleTo": 0,
          "vehiclePrice": 0,
          "maxAttractions": 0,
          "servicesTotal": 0,
          "itemTotal": 0,
          "selectedAttractions": [
            {
              "attractionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "title": "string",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 0
            }
          ],
          "selectedServices": [
            {
              "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "title": "string",
              "adultPrice": 0,
              "childPrice": 0,
              "infantPrice": 0,
              "totalPrice": 0
            }
          ]
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

GET
/api/bookings/excursions/private/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
ebec9678-9e41-496e-9957-2265d6b520cb
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/bookings/excursions/private/ebec9678-9e41-496e-9957-2265d6b520cb' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjRkYmZmMTY5LTM0NjEtNDFmYy04ZDk4LTA0MDY4YjI1YzUxMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5ODY0MTIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.oss8l9qOI2Pio083ta63Jo0acn9nkY9At7qWmsqfTck'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/private/ebec9678-9e41-496e-9957-2265d6b520cb
Server response
Code	Details
200	
Response body
Download
{
  "id": "ebec9678-9e41-496e-9957-2265d6b520cb",
  "bookingReference": "PVT-20261025-27489E",
  "customerName": "John Doe",
  "customerPhone": "+201001234567",
  "customerWhatsApp": "+201001234567",
  "hotelName": "Hilton Hurghada",
  "roomNumber": "305",
  "bookingStatus": 2,
  "paymentMethod": 1,
  "currencyCode": "USD",
  "exchangeRate": 1,
  "totalAmountUsd": 171,
  "notes": "Please arrange pickup at hotel lobby at 8 AM",
  "createdAt": "2026-10-25T15:44:54.9841807",
  "items": [
    {
      "id": "438ac06b-3b67-4ffd-ac0a-5828b4146c50",
      "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
      "excursionTitle": "Dolphin",
      "excursionDate": "2026-10-27T15:42:08.897",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0,
      "totalPassengers": 3,
      "basePrice": 0,
      "vehicleTransferPrivateId": "00a4c42b-c04b-4a85-9ab5-fd86c28b1b14",
      "vehiclePrivateId": "d8053696-a148-4d5e-9517-fc458de2ef27",
      "vehicleName": "car1",
      "vehicleFrom": 1,
      "vehicleTo": 3,
      "vehiclePrice": 25,
      "maxAttractions": 3,
      "servicesTotal": 21,
      "itemTotal": 171,
      "selectedAttractions": [
        {
          "attractionId": "e25086dc-87c9-463c-9ce1-b81293c27ed4",
          "title": "Fisch",
          "adultPrice": 10,
          "childPrice": 5,
          "infantPrice": 0,
          "totalPrice": 25
        },
        {
          "attractionId": "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
          "title": "Schnorchel",
          "adultPrice": 15,
          "childPrice": 8,
          "infantPrice": 0,
          "totalPrice": 38
        },
        {
          "attractionId": "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
          "title": "Foto",
          "adultPrice": 25,
          "childPrice": 12,
          "infantPrice": 0,
          "totalPrice": 62
        }
      ],
      "selectedServices": [
        {
          "serviceId": "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
          "title": "Transport",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 10,
          "totalPrice": 0
        },
        {
          "serviceId": "b844f692-162b-4dd3-82af-3b2c808a1099",
          "title": "Mittagessen",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 20,
          "totalPrice": 0
        },
        {
          "serviceId": "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
          "title": "Guide",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 25,
          "totalPrice": 0
        },
        {
          "serviceId": "03f87255-1428-45e7-aa6a-a64f4cd8b813",
          "title": "Schnorchel",
          "adultPrice": 10,
          "childPrice": 1,
          "infantPrice": 15,
          "totalPrice": 21
        },
        {
          "serviceId": "6598a749-870e-4902-a67b-d23dc2af7289",
          "title": "Weste",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 5,
          "totalPrice": 0
        }
      ]
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 15:52:15 GMT 
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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "bookingReference": "string",
  "customerName": "string",
  "customerPhone": "string",
  "customerWhatsApp": "string",
  "hotelName": "string",
  "roomNumber": "string",
  "bookingStatus": 1,
  "paymentMethod": 1,
  "currencyCode": "string",
  "exchangeRate": 0,
  "totalAmountUsd": 0,
  "notes": "string",
  "createdAt": "2026-10-25T16:02:37.462Z",
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "excursionTitle": "string",
      "excursionDate": "2026-10-25T16:02:37.462Z",
      "adultsCount": 0,
      "childrenCount": 0,
      "infantsCount": 0,
      "totalPassengers": 0,
      "basePrice": 0,
      "vehicleTransferPrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleName": "string",
      "vehicleFrom": 0,
      "vehicleTo": 0,
      "vehiclePrice": 0,
      "maxAttractions": 0,
      "servicesTotal": 0,
      "itemTotal": 0,
      "selectedAttractions": [
        {
          "attractionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "title": "string",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 0,
          "totalPrice": 0
        }
      ],
      "selectedServices": [
        {
          "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "title": "string",
          "adultPrice": 0,
          "childPrice": 0,
          "infantPrice": 0,
          "totalPrice": 0
        }
      ]
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
/api/bookings/excursions/private/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
ebec9678-9e41-496e-9957-2265d6b520cb
Request body

application/json
{
  "status": 2}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://touristtt.runasp.net/api/bookings/excursions/private/ebec9678-9e41-496e-9957-2265d6b520cb/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjRkYmZmMTY5LTM0NjEtNDFmYy04ZDk4LTA0MDY4YjI1YzUxMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5ODY0MTIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.oss8l9qOI2Pio083ta63Jo0acn9nkY9At7qWmsqfTck' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": 2}'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/private/ebec9678-9e41-496e-9957-2265d6b520cb/status
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Sun,25 Oct 2026 15:47:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 