now we need to create a plan for the ServicesBookings those are all of the data you will need to create it could you create a plan for it and review it slowly as this is too much they need to be in the same page but we should have diffrent taps so that we view them all right could you create a plan or it ?

public enum ServicesBookingStatus
    {
        Pending = 1,
        Confirmed = 2,
        Completed = 3,
        Cancelled = 4
    }
       public enum ServicesBookingType
    {
        RealEstate = 1,
        TouristService = 2,
        CarRental = 3,
        VipHurghada = 4
    }
      public enum ServicesCommunicationMethod
    {
        Email = 1,
        WhatsApp = 2,
        Viber = 3,
        Phone = 4
    }

    public enum ServicesGuideLanguage
    {
        English = 1,
        Russian = 2,
        German = 3,
        French = 4
    }

POST
/api/services/bookings/real-estate


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "note": "string"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/bookings/real-estate' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "note": "string"
}'
Request URL
https://touristtt.runasp.net/api/services/bookings/real-estate
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Real Estate booking created successfully.",
  "data": {
    "id": "7512c36f-7052-42a8-b73c-a8b802cc7f92",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 1,
    "status": 1,
    "createdAt": "2026-10-24T10:10:13.2866878Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:10:13 GMT 
 location: https://touristtt.runasp.net/api/services/bookings/7512c36f-7052-42a8-b73c-a8b802cc7f92 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/real-estate


Parameters
Cancel
Name	Description
subServiceId
string($uuid)
(query)
subServiceId
status
integer($int32)
(query)

--
fromDate
string($date-time)
(query)
fromDate
toDate
string($date-time)
(query)
toDate
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
  'https://touristtt.runasp.net/api/services/bookings/real-estate?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/real-estate?pageNumber=1&pageSize=10
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
        "id": "7512c36f-7052-42a8-b73c-a8b802cc7f92",
        "name": "string",
        "country": "string",
        "hotel": "string",
        "roomNo": "string",
        "emailAddress": "a@b.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 1,
        "status": 1,
        "createdAt": "2026-10-24T10:10:13.2866878",
        "communicationMethod": 1,
        "note": "string"
      },
      {
        "id": "18b52033-817f-4dda-93fd-2ed0ecd80f88",
        "name": "pola real estate",
        "country": "Egypt",
        "hotel": "20 toot",
        "roomNo": "200",
        "emailAddress": "totale@om.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 1,
        "status": 1,
        "createdAt": "2026-10-22T13:47:13.9402604",
        "communicationMethod": 1,
        "note": "notes"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 2,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:10:22 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/bookings/tourist-service


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "John Doe",
  "country": "United Kingdom",
  "hotel": "Steigenberger Aldau Beach Hotel",
  "roomNo": "402",
  "emailAddress": "john.doe@example.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "guideLanguage": 1,
  "date": "2026-10-25T00:00:00.000Z",
  "timeFrom": "08:00:00",
  "timeTo": "16:00:00",
  "note": "Looking forward to the trip!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/bookings/tourist-service' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "John Doe",
  "country": "United Kingdom",
  "hotel": "Steigenberger Aldau Beach Hotel",
  "roomNo": "402",
  "emailAddress": "john.doe@example.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "guideLanguage": 1,
  "date": "2026-10-25T00:00:00.000Z",
  "timeFrom": "08:00:00",
  "timeTo": "16:00:00",
  "note": "Looking forward to the trip!"
}'
Request URL
https://touristtt.runasp.net/api/services/bookings/tourist-service
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Tourist Service booking created successfully.",
  "data": {
    "id": "2f5248d3-f73c-4b21-bcf6-9718e43895f4",
    "name": "John Doe",
    "country": "United Kingdom",
    "hotel": "Steigenberger Aldau Beach Hotel",
    "roomNo": "402",
    "emailAddress": "john.doe@example.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 2,
    "status": 1,
    "createdAt": "2026-10-24T10:11:29.4549628Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:11:28 GMT 
 location: https://touristtt.runasp.net/api/services/bookings/2f5248d3-f73c-4b21-bcf6-9718e43895f4 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/tourist-service


Parameters
Cancel
Name	Description
subServiceId
string($uuid)
(query)
subServiceId
status
integer($int32)
(query)

--
fromDate
string($date-time)
(query)
fromDate
toDate
string($date-time)
(query)
toDate
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
  'https://touristtt.runasp.net/api/services/bookings/tourist-service?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/tourist-service?pageNumber=1&pageSize=10
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
        "id": "2f5248d3-f73c-4b21-bcf6-9718e43895f4",
        "name": "John Doe",
        "country": "United Kingdom",
        "hotel": "Steigenberger Aldau Beach Hotel",
        "roomNo": "402",
        "emailAddress": "john.doe@example.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 2,
        "status": 1,
        "createdAt": "2026-10-24T10:11:29.4549628",
        "communicationMethod": 1,
        "guideLanguage": 1,
        "date": "2026-10-25T00:00:00",
        "timeFrom": "08:00:00",
        "timeTo": "16:00:00",
        "note": "Looking forward to the trip!"
      },
      {
        "id": "4b38a1dc-765e-4f73-b779-c7e1a3b9b014",
        "name": "pola service",
        "country": "egypt",
        "hotel": "abo el maged",
        "roomNo": "200",
        "emailAddress": "emial@com.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 2,
        "status": 1,
        "createdAt": "2026-10-22T13:50:06.6118296",
        "communicationMethod": 1,
        "guideLanguage": 1,
        "date": "2026-10-23T13:47:16.72",
        "timeFrom": "17:48:00",
        "timeTo": "20:48:00",
        "note": "string"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 2,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:11:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/bookings/car-rental


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "date": "2026-10-24T10:11:52.181Z",
  "numberOfDays": 2,
  "note": "string"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/bookings/car-rental' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "date": "2026-10-24T10:11:52.181Z",
  "numberOfDays": 2,
  "note": "string"
}'
Request URL
https://touristtt.runasp.net/api/services/bookings/car-rental
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Car Rental booking created successfully.",
  "data": {
    "id": "6b17a48e-9084-4212-9649-0d59cf288049",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 3,
    "status": 1,
    "createdAt": "2026-10-24T10:12:09.6747569Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:12:08 GMT 
 location: https://touristtt.runasp.net/api/services/bookings/6b17a48e-9084-4212-9649-0d59cf288049 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/car-rental


Parameters
Cancel
Name	Description
subServiceId
string($uuid)
(query)
subServiceId
status
integer($int32)
(query)

--
fromDate
string($date-time)
(query)
fromDate
toDate
string($date-time)
(query)
toDate
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
  'https://touristtt.runasp.net/api/services/bookings/car-rental?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/car-rental?pageNumber=1&pageSize=10
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
        "id": "6b17a48e-9084-4212-9649-0d59cf288049",
        "name": "string",
        "country": "string",
        "hotel": "string",
        "roomNo": "string",
        "emailAddress": "a@b.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 3,
        "status": 1,
        "createdAt": "2026-10-24T10:12:09.6747569",
        "communicationMethod": 1,
        "date": "2026-10-24T10:11:52.181",
        "numberOfDays": 2,
        "note": "string"
      },
      {
        "id": "3b9a3a95-be83-44eb-afe0-a894728d10ac",
        "name": "pola care rental",
        "country": "EGypt",
        "hotel": "my htel",
        "roomNo": "200",
        "emailAddress": "emila@1.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 3,
        "status": 1,
        "createdAt": "2026-10-22T13:51:04.82027",
        "communicationMethod": 1,
        "date": "2026-10-25T13:50:10.718",
        "numberOfDays": 10,
        "note": "test"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 2,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:12:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/bookings/vip-hurghada


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "flightNumber": "string",
  "departureTime": "2026-10-24T10:12:29.787Z",
  "noOfPersons": 2,
  "destinationTo": "string",
  "note": "string"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/bookings/vip-hurghada' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "country": "string",
  "hotel": "string",
  "roomNo": "string",
  "emailAddress": "a@b.com",
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "communicationMethod": 1,
  "flightNumber": "string",
  "departureTime": "2026-10-24T10:12:29.787Z",
  "noOfPersons": 2,
  "destinationTo": "string",
  "note": "string"
}'
Request URL
https://touristtt.runasp.net/api/services/bookings/vip-hurghada
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "VIP Hurghada booking created successfully.",
  "data": {
    "id": "b757e4c0-f915-4e9e-ac89-d849cd874a7c",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 4,
    "status": 1,
    "createdAt": "2026-10-24T10:12:51.8886255Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:12:51 GMT 
 location: https://touristtt.runasp.net/api/services/bookings/b757e4c0-f915-4e9e-ac89-d849cd874a7c 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/vip-hurghada


Parameters
Cancel
Name	Description
subServiceId
string($uuid)
(query)
subServiceId
status
integer($int32)
(query)

--
fromDate
string($date-time)
(query)
fromDate
toDate
string($date-time)
(query)
toDate
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
  'https://touristtt.runasp.net/api/services/bookings/vip-hurghada?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/vip-hurghada?pageNumber=1&pageSize=10
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
        "id": "b757e4c0-f915-4e9e-ac89-d849cd874a7c",
        "name": "string",
        "country": "string",
        "hotel": "string",
        "roomNo": "string",
        "emailAddress": "a@b.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 4,
        "status": 1,
        "createdAt": "2026-10-24T10:12:51.8886255",
        "communicationMethod": 1,
        "flightNumber": "string",
        "departureTime": "2026-10-24T10:12:29.787",
        "noOfPersons": 2,
        "destinationTo": "string",
        "note": "string"
      },
      {
        "id": "88927208-e9cb-4bd8-8d83-f0bac68b77b1",
        "name": "last vip hurghada",
        "country": "egypt",
        "hotel": "hotel",
        "roomNo": "200",
        "emailAddress": "a@b.com",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceTitle": "Kia Cerato Rental",
        "bookingType": 4,
        "status": 1,
        "createdAt": "2026-10-22T13:52:54.4194447",
        "communicationMethod": 1,
        "flightNumber": "200",
        "departureTime": "2026-10-24T13:51:14.925",
        "noOfPersons": 5,
        "destinationTo": "my home",
        "note": "string"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 2,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:13:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/real-estate/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
7512c36f-7052-42a8-b73c-a8b802cc7f92
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/bookings/real-estate/7512c36f-7052-42a8-b73c-a8b802cc7f92' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/real-estate/7512c36f-7052-42a8-b73c-a8b802cc7f92
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
    "id": "7512c36f-7052-42a8-b73c-a8b802cc7f92",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 1,
    "status": 1,
    "createdAt": "2026-10-24T10:10:13.2866878",
    "communicationMethod": 1,
    "note": "string"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:15:44 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/tourist-service/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
2f5248d3-f73c-4b21-bcf6-9718e43895f4
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/bookings/tourist-service/2f5248d3-f73c-4b21-bcf6-9718e43895f4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/tourist-service/2f5248d3-f73c-4b21-bcf6-9718e43895f4
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
    "id": "2f5248d3-f73c-4b21-bcf6-9718e43895f4",
    "name": "John Doe",
    "country": "United Kingdom",
    "hotel": "Steigenberger Aldau Beach Hotel",
    "roomNo": "402",
    "emailAddress": "john.doe@example.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 2,
    "status": 1,
    "createdAt": "2026-10-24T10:11:29.4549628",
    "communicationMethod": 1,
    "guideLanguage": 1,
    "date": "2026-10-25T00:00:00",
    "timeFrom": "08:00:00",
    "timeTo": "16:00:00",
    "note": "Looking forward to the trip!"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:15:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/car-rental/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
6b17a48e-9084-4212-9649-0d59cf288049
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/bookings/car-rental/6b17a48e-9084-4212-9649-0d59cf288049' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/car-rental/6b17a48e-9084-4212-9649-0d59cf288049
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
    "id": "6b17a48e-9084-4212-9649-0d59cf288049",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 3,
    "status": 1,
    "createdAt": "2026-10-24T10:12:09.6747569",
    "communicationMethod": 1,
    "date": "2026-10-24T10:11:52.181",
    "numberOfDays": 2,
    "note": "string"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:14:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/bookings/vip-hurghada/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b757e4c0-f915-4e9e-ac89-d849cd874a7c
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/bookings/vip-hurghada/b757e4c0-f915-4e9e-ac89-d849cd874a7c' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/services/bookings/vip-hurghada/b757e4c0-f915-4e9e-ac89-d849cd874a7c
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
    "id": "b757e4c0-f915-4e9e-ac89-d849cd874a7c",
    "name": "string",
    "country": "string",
    "hotel": "string",
    "roomNo": "string",
    "emailAddress": "a@b.com",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceTitle": "Kia Cerato Rental",
    "bookingType": 4,
    "status": 1,
    "createdAt": "2026-10-24T10:12:51.8886255",
    "communicationMethod": 1,
    "flightNumber": "string",
    "departureTime": "2026-10-24T10:12:29.787",
    "noOfPersons": 2,
    "destinationTo": "string",
    "note": "string"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:13:45 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

PATCH
/api/services/bookings/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
dd07b64b-1af7-4dd1-af62-5798e75170b3
Request body

application/json
{
  "bookingId": "dd07b64b-1af7-4dd1-af62-5798e75170b3",
  "newStatus": 2,
  "reason": "kida"
}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://touristtt.runasp.net/api/services/bookings/dd07b64b-1af7-4dd1-af62-5798e75170b3/status' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": "dd07b64b-1af7-4dd1-af62-5798e75170b3",
  "newStatus": 2,
  "reason": "kida"
}'
Request URL
https://touristtt.runasp.net/api/services/bookings/dd07b64b-1af7-4dd1-af62-5798e75170b3/status
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Booking status changed to Confirmed successfully.",
  "data": {
    "id": "dd07b64b-1af7-4dd1-af62-5798e75170b3",
    "name": "John Doe",
    "country": "Egypt",
    "hotel": "Hilton Hurghada",
    "roomNo": "305",
    "emailAddress": "john.doe@example.com",
    "subServiceId": "10d03700-ed85-46a7-90c3-830b124118b6",
    "subServiceTitle": "Hurghada Airport Pickup",
    "bookingType": 2,
    "status": 2,
    "createdAt": "2026-10-24T14:47:16.1762297"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 14:47:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
