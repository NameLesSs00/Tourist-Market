
now we should create a plan for the GroupBookings they are some excrution for hte goups and this is the way you can book them we will not be able to use the create or the post in the admin dashboard but we should be able to update the statue okay could you create a plan for it ?


POST
/api/bookings/excursions/group


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "customerName": "John Doe",
  "phone": "+201234567890",
  "whatsApp": "+201234567890",
  "hotelName": "Sunrise Holidays Resort Hurghada",
  "roomNumber": "412",
  "paymentMethod": 1,
  "notes": "Please include vegetarian option for lunch and pick up from the lobby.",
  "excursions": [
    {
      "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
      "excursionDate": "2026-11-05T01:00:00.000Z",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/bookings/excursions/group' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "customerName": "John Doe",
  "phone": "+201234567890",
  "whatsApp": "+201234567890",
  "hotelName": "Sunrise Holidays Resort Hurghada",
  "roomNumber": "412",
  "paymentMethod": 1,
  "notes": "Please include vegetarian option for lunch and pick up from the lobby.",
  "excursions": [
    {
      "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
      "excursionDate": "2026-11-05T01:00:00.000Z",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0
    }
  ]
}'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/group
Server response
Code	Details
200	
Response body
Download
{
  "bookingId": "1e8ecfd6-47a6-4682-af04-b8f4d4706fff",
  "bookingReference": "GRP-20261025-8EA29B",
  "totalPrice": 475,
  "currency": "USD",
  "message": "Group booking created successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 09:49:10 GMT 
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
/api/bookings/excursions/group


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
  'https://touristtt.runasp.net/api/bookings/excursions/group' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/group
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "1e8ecfd6-47a6-4682-af04-b8f4d4706fff",
      "bookingReference": "GRP-20261025-8EA29B",
      "customerName": "John Doe",
      "customerPhone": "+201234567890",
      "customerWhatsApp": "+201234567890",
      "hotelName": "Sunrise Holidays Resort Hurghada",
      "roomNumber": "412",
      "bookingStatus": 1,
      "paymentMethod": 1,
      "currencyCode": "USD",
      "exchangeRate": 1,
      "totalAmountUsd": 475,
      "notes": "Please include vegetarian option for lunch and pick up from the lobby.",
      "createdAt": "2026-10-25T09:49:10.8565673",
      "items": [
        {
          "id": "231e1edd-7cca-4b3c-9d0d-86184d28beaa",
          "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
          "excursionTitle": "Dolphin",
          "excursionDate": "2026-11-05T01:00:00",
          "adultsCount": 2,
          "childrenCount": 1,
          "infantsCount": 0,
          "basePrice": 158.33,
          "itemTotal": 475
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
 date: Sun,25 Oct 2026 09:49:21 GMT 
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
      "createdAt": "2026-10-25T09:51:38.247Z",
      "items": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "excursionTitle": "string",
          "excursionDate": "2026-10-25T09:51:38.247Z",
          "adultsCount": 0,
          "childrenCount": 0,
          "infantsCount": 0,
          "basePrice": 0,
          "itemTotal": 0
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
/api/bookings/excursions/group/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
1e8ecfd6-47a6-4682-af04-b8f4d4706fff
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/bookings/excursions/group/1e8ecfd6-47a6-4682-af04-b8f4d4706fff' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/group/1e8ecfd6-47a6-4682-af04-b8f4d4706fff
Server response
Code	Details
200	
Response body
Download
{
  "id": "1e8ecfd6-47a6-4682-af04-b8f4d4706fff",
  "bookingReference": "GRP-20261025-8EA29B",
  "customerName": "John Doe",
  "customerPhone": "+201234567890",
  "customerWhatsApp": "+201234567890",
  "hotelName": "Sunrise Holidays Resort Hurghada",
  "roomNumber": "412",
  "bookingStatus": 1,
  "paymentMethod": 1,
  "currencyCode": "USD",
  "exchangeRate": 1,
  "totalAmountUsd": 475,
  "notes": "Please include vegetarian option for lunch and pick up from the lobby.",
  "createdAt": "2026-10-25T09:49:10.8565673",
  "items": [
    {
      "id": "231e1edd-7cca-4b3c-9d0d-86184d28beaa",
      "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
      "excursionTitle": "Dolphin",
      "excursionDate": "2026-11-05T01:00:00",
      "adultsCount": 2,
      "childrenCount": 1,
      "infantsCount": 0,
      "basePrice": 158.33,
      "itemTotal": 475
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 09:51:27 GMT 
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
  "createdAt": "2026-10-25T09:51:38.254Z",
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "excursionTitle": "string",
      "excursionDate": "2026-10-25T09:51:38.254Z",
      "adultsCount": 0,
      "childrenCount": 0,
      "infantsCount": 0,
      "basePrice": 0,
      "itemTotal": 0
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
/api/bookings/excursions/group/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
1e8ecfd6-47a6-4682-af04-b8f4d4706fff
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
  'https://touristtt.runasp.net/api/bookings/excursions/group/1e8ecfd6-47a6-4682-af04-b8f4d4706fff/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": 2
}'
Request URL
https://touristtt.runasp.net/api/bookings/excursions/group/1e8ecfd6-47a6-4682-af04-b8f4d4706fff/status
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Sun,25 Oct 2026 09:51:36 GMT 
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