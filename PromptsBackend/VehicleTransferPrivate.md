now we should create a plan so that we could put the pirces for the priavte trips after we have entered some vheivles and then we could use those endpoints so that we can set the price range for each group of ppl okay i want you to create a plan for it and where we gonna put in the in admin UI and after that note that the last endpoint the match GET
/api/vehicle-transfer-private/match
this will be used only later in the clinet side but we should not use it now implment it but we will not use it okay ? create a plan 
VehicleTransferPrivate


POST
/api/vehicle-transfer-private


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
  "vehiclePrivateId": "27ef8ade-24e7-49aa-bcb5-70dec0f863b1",
  "from": 4,
  "to": 9,
  "priceUSD": 25
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/vehicle-transfer-private' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
  "vehiclePrivateId": "27ef8ade-24e7-49aa-bcb5-70dec0f863b1",
  "from": 4,
  "to": 9,
  "priceUSD": 25
}'
Request URL
https://touristtt.runasp.net/api/vehicle-transfer-private
Server response
Code	Details
201	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Vehicle transfer configuration created successfully.",
  "data": {
    "id": "567d6fa6-d7f1-4487-959f-1009dd265463",
    "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
    "vehiclePrivateId": "27ef8ade-24e7-49aa-bcb5-70dec0f863b1",
    "vehicleName": "bus1",
    "from": 4,
    "to": 9,
    "priceUSD": 25,
    "price": 25,
    "currency": "USD",
    "exchangeRate": 1,
    "isActive": true,
    "createdAt": "2026-10-25T07:45:15.2612156Z",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 07:45:14 GMT 
 location: https://touristtt.runasp.net/api/vehicle-transfer-private/567d6fa6-d7f1-4487-959f-1009dd265463 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "priceUSD": 0,
    "price": 0,
    "currency": "string",
    "exchangeRate": 0,
    "isActive": true,
    "createdAt": "2026-10-25T07:46:39.301Z",
    "updatedAt": "2026-10-25T07:46:39.301Z"
  },
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
401	
Unauthorized

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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

GET
/api/vehicle-transfer-private


Parameters
Cancel
Name	Description
PrivateExcursionId
string($uuid)
(query)
PrivateExcursionId
VehiclePrivateId
string($uuid)
(query)
VehiclePrivateId
PassengerCount
integer($int32)
(query)
PassengerCount
IsActive
boolean
(query)

--
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
lang
string
(query)
lang
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-transfer-private' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/vehicle-transfer-private
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Retrieved 2 configuration(s).",
  "data": {
    "items": [
      {
        "id": "2def18fe-4ef6-41da-9395-39e7dfb3a9e5",
        "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
        "vehiclePrivateId": "d8053696-a148-4d5e-9517-fc458de2ef27",
        "vehicleName": "car1",
        "from": 1,
        "to": 3,
        "priceUSD": 25,
        "price": 25,
        "currency": "USD",
        "exchangeRate": 1,
        "isActive": true,
        "createdAt": "2026-10-25T07:44:17.1324106",
        "updatedAt": null
      },
      {
        "id": "567d6fa6-d7f1-4487-959f-1009dd265463",
        "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
        "vehiclePrivateId": "27ef8ade-24e7-49aa-bcb5-70dec0f863b1",
        "vehicleName": "bus1",
        "from": 4,
        "to": 9,
        "priceUSD": 25,
        "price": 25,
        "currency": "USD",
        "exchangeRate": 1,
        "isActive": true,
        "createdAt": "2026-10-25T07:45:15.2612156",
        "updatedAt": null
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
 date: Sun,25 Oct 2026 07:45:23 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "vehicleName": "string",
        "from": 0,
        "to": 0,
        "priceUSD": 0,
        "price": 0,
        "currency": "string",
        "exchangeRate": 0,
        "isActive": true,
        "createdAt": "2026-10-25T07:46:39.313Z",
        "updatedAt": "2026-10-25T07:46:39.313Z"
      }
    ],
    "pageNumber": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0,
    "hasPreviousPage": true,
    "hasNextPage": true
  },
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

GET
/api/vehicle-transfer-private/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
567d6fa6-d7f1-4487-959f-1009dd265463
lang
string
(query)
lang
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-transfer-private/567d6fa6-d7f1-4487-959f-1009dd265463?lang=de' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/vehicle-transfer-private/567d6fa6-d7f1-4487-959f-1009dd265463?lang=de
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Configuration retrieved successfully.",
  "data": {
    "id": "567d6fa6-d7f1-4487-959f-1009dd265463",
    "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
    "vehiclePrivateId": "27ef8ade-24e7-49aa-bcb5-70dec0f863b1",
    "vehicleName": "bus3",
    "from": 4,
    "to": 9,
    "priceUSD": 25,
    "price": 25,
    "currency": "USD",
    "exchangeRate": 1,
    "isActive": true,
    "createdAt": "2026-10-25T07:45:15.2612156",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 07:45:46 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "priceUSD": 0,
    "price": 0,
    "currency": "string",
    "exchangeRate": 0,
    "isActive": true,
    "createdAt": "2026-10-25T07:46:39.319Z",
    "updatedAt": "2026-10-25T07:46:39.319Z"
  },
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

PUT
/api/vehicle-transfer-private/{id}


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
  "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "from": 0,
  "to": 0,
  "priceUSD": 0,
  "isActive": true
}
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "priceUSD": 0,
    "price": 0,
    "currency": "string",
    "exchangeRate": 0,
    "isActive": true,
    "createdAt": "2026-10-25T07:46:39.324Z",
    "updatedAt": "2026-10-25T07:46:39.324Z"
  },
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
401	
Unauthorized

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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/vehicle-transfer-private/{id}


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
401	
Unauthorized

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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

GET
/api/vehicle-transfer-private/match


Parameters
Cancel
Name	Description
privateExcursionId
string($uuid)
(query)
6b3b08ee-0232-479c-8bfe-3f992ecfe68d
passengerCount
integer($int32)
(query)
3
lang
string
(query)
lang
currency
string
(query)
currency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-transfer-private/match?privateExcursionId=6b3b08ee-0232-479c-8bfe-3f992ecfe68d&passengerCount=3' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/vehicle-transfer-private/match?privateExcursionId=6b3b08ee-0232-479c-8bfe-3f992ecfe68d&passengerCount=3
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Matching vehicle configuration found.",
  "data": {
    "id": "2def18fe-4ef6-41da-9395-39e7dfb3a9e5",
    "privateExcursionId": "6b3b08ee-0232-479c-8bfe-3f992ecfe68d",
    "vehiclePrivateId": "d8053696-a148-4d5e-9517-fc458de2ef27",
    "vehicleName": "car1",
    "from": 1,
    "to": 3,
    "priceUSD": 25,
    "price": 25,
    "currency": "USD",
    "exchangeRate": 1,
    "isActive": true,
    "createdAt": "2026-10-25T07:44:17.1324106",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 07:46:37 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "privateExcursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehiclePrivateId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "priceUSD": 0,
    "price": 0,
    "currency": "string",
    "exchangeRate": 0,
    "isActive": true,
    "createdAt": "2026-10-25T07:46:39.335Z",
    "updatedAt": "2026-10-25T07:46:39.335Z"
  },
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}