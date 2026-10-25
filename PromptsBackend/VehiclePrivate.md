
VehiclePrivate


POST
/api/vehicle-private


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "car",
    "ru": "car1",
    "de": "car2",
    "fr": "car3"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/vehicle-private' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjZiNGY2NWE4LTM3ODEtNDNiNy1iM2U1LWJiMTBhM2M4OGFlZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5MDE1NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.Zi5cQWvS7SN99iCk3YY7fob9GpiRpeGJhBqfM6KVRLc' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "car",
    "ru": "car1",
    "de": "car2",
    "fr": "car3"
  }
}'
Request URL
https://touristtt.runasp.net/api/vehicle-private
Server response
Code	Details
201	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Vehicle created successfully.",
  "data": {
    "id": "822c2c05-838e-4bc9-938a-725d56bfe9b2",
    "name": "car",
    "isActive": true,
    "createdAt": "2026-10-24T16:12:56.7902398Z",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 16:12:56 GMT 
 location: https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2 
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
    "name": "string",
    "isActive": true,
    "createdAt": "2026-10-24T16:16:34.583Z",
    "updatedAt": "2026-10-24T16:16:34.583Z"
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

GET
/api/vehicle-private


Parameters
Cancel
Name	Description
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
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-private' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjZiNGY2NWE4LTM3ODEtNDNiNy1iM2U1LWJiMTBhM2M4OGFlZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5MDE1NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.Zi5cQWvS7SN99iCk3YY7fob9GpiRpeGJhBqfM6KVRLc'
Request URL
https://touristtt.runasp.net/api/vehicle-private
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Retrieved 1 vehicle(s).",
  "data": {
    "items": [
      {
        "id": "822c2c05-838e-4bc9-938a-725d56bfe9b2",
        "name": "car",
        "isActive": true,
        "createdAt": "2026-10-24T16:12:56.7902398",
        "updatedAt": null
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 16:15:40 GMT 
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
        "name": "string",
        "isActive": true,
        "createdAt": "2026-10-24T16:16:34.588Z",
        "updatedAt": "2026-10-24T16:16:34.589Z"
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
/api/vehicle-private/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
822c2c05-838e-4bc9-938a-725d56bfe9b2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjZiNGY2NWE4LTM3ODEtNDNiNy1iM2U1LWJiMTBhM2M4OGFlZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5MDE1NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.Zi5cQWvS7SN99iCk3YY7fob9GpiRpeGJhBqfM6KVRLc'
Request URL
https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Vehicle retrieved successfully.",
  "data": {
    "id": "822c2c05-838e-4bc9-938a-725d56bfe9b2",
    "name": "car",
    "isActive": true,
    "createdAt": "2026-10-24T16:12:56.7902398",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 16:13:25 GMT 
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
    "name": "string",
    "isActive": true,
    "createdAt": "2026-10-24T16:16:34.593Z",
    "updatedAt": "2026-10-24T16:16:34.593Z"
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
/api/vehicle-private/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
822c2c05-838e-4bc9-938a-725d56bfe9b2
Request body

application/json
{
  "name": {
    "en": "car",
    "ru": "car1",
    "de": "car2",
    "fr": "car3"
  },
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjZiNGY2NWE4LTM3ODEtNDNiNy1iM2U1LWJiMTBhM2M4OGFlZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5MDE1NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.Zi5cQWvS7SN99iCk3YY7fob9GpiRpeGJhBqfM6KVRLc' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "car",
    "ru": "car1",
    "de": "car2",
    "fr": "car3"
  },
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Vehicle updated successfully.",
  "data": {
    "id": "822c2c05-838e-4bc9-938a-725d56bfe9b2",
    "name": "car",
    "isActive": true,
    "createdAt": "2026-10-24T16:12:56.7902398",
    "updatedAt": "2026-10-24T16:16:25.1318161Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 16:16:24 GMT 
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
    "name": "string",
    "isActive": true,
    "createdAt": "2026-10-24T16:16:34.598Z",
    "updatedAt": "2026-10-24T16:16:34.598Z"
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
/api/vehicle-private/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
822c2c05-838e-4bc9-938a-725d56bfe9b2
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjZiNGY2NWE4LTM3ODEtNDNiNy1iM2U1LWJiMTBhM2M4OGFlZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5MDE1NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.Zi5cQWvS7SN99iCk3YY7fob9GpiRpeGJhBqfM6KVRLc'
Request URL
https://touristtt.runasp.net/api/vehicle-private/822c2c05-838e-4bc9-938a-725d56bfe9b2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Vehicle deleted successfully.",
  "data": null,
  "errors": null
}