POST
/api/transfer-bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "fromLocationId": "77125963-cf49-4293-bbaf-f40496b75665",
  "toLocationId": "cee4a0ce-2633-486a-b754-fa8ddd9bd77e",
  "adults": 2,
  "children": 0,
  "tripType": 2,
  "tripDate": "2026-11-22",
  "tripTime": "10:00:00",
  "returnDate": "2026-11-25",
  "returnTime": "18:00:00",
  "customerName": "Ahmed Hassan",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "email": "ahmed.hassan@example.com",
  "communicationMethod": 1,
  "phoneNumber": "+201001234567",
  "luggageCount": 2,
  "notes": "Round-trip transfer test"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/transfer-bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromLocationId": "77125963-cf49-4293-bbaf-f40496b75665",
  "toLocationId": "cee4a0ce-2633-486a-b754-fa8ddd9bd77e",
  "adults": 2,
  "children": 0,
  "tripType": 2,
  "tripDate": "2026-11-22",
  "tripTime": "10:00:00",
  "returnDate": "2026-11-25",
  "returnTime": "18:00:00",
  "customerName": "Ahmed Hassan",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "email": "ahmed.hassan@example.com",
  "communicationMethod": 1,
  "phoneNumber": "+201001234567",
  "luggageCount": 2,
  "notes": "Round-trip transfer test"
}'
Request URL
https://touristtt.runasp.net/api/transfer-bookings
Server response
Code	Details
200	
Response body
Download
{
  "message": "Transfer booking created successfully.",
  "totalPrice": 20.4,
  "paymentMessage": "Please continue to payment."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 17:03:55 GMT 
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
  "message": "string",
  "totalPrice": 0,
  "paymentMessage": "string"
}
No links

GET
/api/transfer-bookings


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/transfer-bookings
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "353f0fec-0dfa-452c-af52-04994f81b8a8",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 1,
    "children": 6,
    "tripType": 2,
    "vehicleTypeTransferId": "debf5a42-26de-4b6d-a4fd-a60799f32568",
    "tripDate": "2026-11-03",
    "tripTime": "12:00:00",
    "customerName": "string",
    "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
    "email": "string@gmail.com",
    "communicationMethod": 1,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "totalPrice": 66.3,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 1,
    "createdAt": "2026-11-01T12:46:45.9723699"
  },
  {
    "id": "dd97391e-a152-4add-9d65-86ee76aad574",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 2,
    "children": 0,
    "tripType": 1,
    "vehicleTypeTransferId": null,
    "tripDate": "2026-11-27",
    "tripTime": "10:00:00",
    "customerName": "Test User",
    "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
    "email": "test@example.com",
    "communicationMethod": 2,
    "phoneNumber": "+201234567890",
    "luggageCount": 1,
    "notes": "Integration test",
    "totalPrice": 50,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 1,
    "createdAt": "2026-10-28T16:26:17.5835824"
  },
  {
    "id": "98060cff-a4a7-4726-898a-a298bda2dc3b",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 1,
    "children": 6,
    "tripType": 1,
    "vehicleTypeTransferId": "debf5a42-26de-4b6d-a4fd-a60799f32568",
    "tripDate": "2026-11-02",
    "tripTime": "12:00:00",
    "customerName": "string",
    "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
    "email": "string@gmail.com",
    "communicationMethod": 1,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "totalPrice": 39,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 1,
    "createdAt": "2026-11-01T12:46:26.6121755"
  },
  {
    "id": "b782ad55-8f4d-4b21-8618-d353100b1c3f",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 3,
    "children": 1,
    "tripType": 2,
    "vehicleTypeTransferId": null,
    "tripDate": "2026-11-27",
    "tripTime": "14:30:00",
    "customerName": "Test RoundTrip",
    "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
    "email": "rt@example.com",
    "communicationMethod": 1,
    "phoneNumber": "+201234567890",
    "luggageCount": 2,
    "notes": null,
    "totalPrice": 100,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 1,
    "createdAt": "2026-10-28T16:26:28.0442705"
  },
  {
    "id": "e0431ee4-c600-461a-b68b-decf0dc17391",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 2,
    "children": 1,
    "tripType": 1,
    "vehicleTypeTransferId": null,
    "tripDate": "2026-10-26",
    "tripTime": "09:00:00",
    "customerName": "John Doe",
    "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
    "email": "john.doe@example.com",
    "communicationMethod": 1,
    "phoneNumber": "+201001234567",
    "luggageCount": 3,
    "notes": "Please arrange pickup at hotel lobby",
    "totalPrice": 20,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 2,
    "createdAt": "2026-10-25T08:58:06.4678883"
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 17:02:06 GMT 
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
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "adults": 0,
    "children": 0,
    "tripType": 1,
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "tripDate": "2026-11-01",
    "tripTime": "string",
    "customerName": "string",
    "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "email": "string",
    "communicationMethod": 1,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "totalPrice": 0,
    "discountPercentage": 0,
    "discountAmount": 0,
    "status": 1,
    "createdAt": "2026-11-01T17:03:55.666Z"
  }
]
No links

GET
/api/transfer-bookings/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b782ad55-8f4d-4b21-8618-d353100b1c3f
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-bookings/b782ad55-8f4d-4b21-8618-d353100b1c3f' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/transfer-bookings/b782ad55-8f4d-4b21-8618-d353100b1c3f
Server response
Code	Details
200	
Response body
Download
{
  "id": "b782ad55-8f4d-4b21-8618-d353100b1c3f",
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "adults": 3,
  "children": 1,
  "tripType": 2,
  "vehicleTypeTransferId": null,
  "tripDate": "2026-11-27",
  "tripTime": "14:30:00",
  "customerName": "Test RoundTrip",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "email": "rt@example.com",
  "communicationMethod": 1,
  "phoneNumber": "+201234567890",
  "luggageCount": 2,
  "notes": null,
  "totalPrice": 100,
  "discountPercentage": 0,
  "discountAmount": 0,
  "status": 1,
  "createdAt": "2026-10-28T16:26:28.0442705"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 17:02:22 GMT 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "adults": 0,
  "children": 0,
  "tripType": 1,
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "tripDate": "2026-11-01",
  "tripTime": "string",
  "customerName": "string",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "email": "string",
  "communicationMethod": 1,
  "phoneNumber": "string",
  "luggageCount": 0,
  "notes": "string",
  "totalPrice": 0,
  "discountPercentage": 0,
  "discountAmount": 0,
  "status": 1,
  "createdAt": "2026-11-01T17:03:55.671Z"
}
No links

PATCH
/api/transfer-bookings/{id}/status


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
1
Responses
Code	Description	Links
200	
OK