now we should create a plan for the transferbooking in the admin page we will not create any booking but disply them and edit thier sttaues
 Pending = 1,
        Confirmed = 2,
        Completed = 3,
        Cancelled = 4

        could you review it and create a full plan for it ?
TransferBookings


GET
/api/transfer-bookings/preview


Parameters
Cancel
Name	Description
fromLocationId
string($uuid)
(query)
018f5b2d-1f32-4662-9eb3-3865e516256b
toLocationId
string($uuid)
(query)
c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706
adults
integer($int32)
(query)
4
children
integer($int32)
(query)
children
tripType
integer($int32)
(query)

2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-bookings/preview?fromLocationId=018f5b2d-1f32-4662-9eb3-3865e516256b&toLocationId=c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706&adults=4&tripType=2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/transfer-bookings/preview?fromLocationId=018f5b2d-1f32-4662-9eb3-3865e516256b&toLocationId=c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706&adults=4&tripType=2
Server response
Code	Details
200	
Response body
Download
{
  "vehicleType": "Microbus",
  "totalPrice": 40
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:40:14 GMT 
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
  "vehicleType": 1,
  "totalPrice": 0
}
No links

POST
/api/transfer-bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "adults": 2,
  "children": 1,
  "tripType": 1,
  "tripDate": "2026-10-26",
  "tripTime": "09:00:00",
  "customerName": "John Doe",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "email": "john.doe@example.com",
  "communicationMethod": 1,
  "phoneNumber": "+201001234567",
  "luggageCount": 3,
  "notes": "Please arrange pickup at hotel lobby"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/transfer-bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "adults": 2,
  "children": 1,
  "tripType": 1,
  "tripDate": "2026-10-26",
  "tripTime": "09:00:00",
  "customerName": "John Doe",
  "countryId": "142b2b3b-2235-4001-9376-f059c3f8290f",
  "email": "john.doe@example.com",
  "communicationMethod": 1,
  "phoneNumber": "+201001234567",
  "luggageCount": 3,
  "notes": "Please arrange pickup at hotel lobby"
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
  "totalPrice": 20,
  "paymentMessage": "Please continue to payment."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:58:05 GMT 
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
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/transfer-bookings
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "e0431ee4-c600-461a-b68b-decf0dc17391",
    "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
    "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
    "adults": 2,
    "children": 1,
    "tripType": 1,
    "vehicleType": 0,
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
    "status": 1,
    "createdAt": "2026-10-25T08:58:06.4678883"
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:58:16 GMT 
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
    "vehicleType": 1,
    "tripDate": "2026-10-25",
    "tripTime": "string",
    "customerName": "string",
    "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "email": "string",
    "communicationMethod": 1,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "totalPrice": 0,
    "status": 1,
    "createdAt": "2026-10-25T08:58:49.360Z"
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
e0431ee4-c600-461a-b68b-decf0dc17391
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-bookings/e0431ee4-c600-461a-b68b-decf0dc17391' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/transfer-bookings/e0431ee4-c600-461a-b68b-decf0dc17391
Server response
Code	Details
200	
Response body
Download
{
  "id": "e0431ee4-c600-461a-b68b-decf0dc17391",
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "adults": 2,
  "children": 1,
  "tripType": 1,
  "vehicleType": 0,
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
  "status": 1,
  "createdAt": "2026-10-25T08:58:06.4678883"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:58:30 GMT 
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
  "vehicleType": 1,
  "tripDate": "2026-10-25",
  "tripTime": "string",
  "customerName": "string",
  "countryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "email": "string",
  "communicationMethod": 1,
  "phoneNumber": "string",
  "luggageCount": 0,
  "notes": "string",
  "totalPrice": 0,
  "status": 1,
  "createdAt": "2026-10-25T08:58:49.373Z"
}
No links

PATCH
/api/transfer-bookings/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
e0431ee4-c600-461a-b68b-decf0dc17391
Request body

application/json
2
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://touristtt.runasp.net/api/transfer-bookings/e0431ee4-c600-461a-b68b-decf0dc17391/status' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '2'
Request URL
https://touristtt.runasp.net/api/transfer-bookings/e0431ee4-c600-461a-b68b-decf0dc17391/status
Server response
Code	Details
204
Undocumented
Response headers
 access-control-allow-origin: * 
 date: Sun,25 Oct 2026 08:58:46 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK