now for the ExcursionAvailability this should be added to the private excation to tell how many days of the way it will be avabilae okay 
could you create a plan so that we could add it in the app ? please create a plan for it 


GET
/api/excursions/{excursionId}/availability


Parameters
Cancel
Name	Description
excursionId *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImMzNTViN2NmLWQ1ZmItNDk1Mi1hNmI4LTcxZjkxMThlZmJkZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzE2NDksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.vQNR4NGUvj2IMH0elLUiMBa5_NYXuCNWiyRSIREHOgU'
Request URL
https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Availability retrieved successfully.",
  "data": {
    "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "days": [
      {
        "id": "8625c541-920e-4341-ac39-f496d6592f1e",
        "dayNo": 0,
        "dayName": "Sunday",
        "isAvailable": true
      },
      {
        "id": "a102270f-e823-4e8f-988f-0383b73ca72b",
        "dayNo": 1,
        "dayName": "Monday",
        "isAvailable": true
      },
      {
        "id": "8df8ea23-8e3e-4ad2-b13f-3bffbac3e6c7",
        "dayNo": 2,
        "dayName": "Tuesday",
        "isAvailable": true
      },
      {
        "id": "048262c1-93e8-4701-8046-d002798d6071",
        "dayNo": 3,
        "dayName": "Wednesday",
        "isAvailable": true
      },
      {
        "id": "998fca47-2e9a-4bc6-ad59-402af4d75c34",
        "dayNo": 4,
        "dayName": "Thursday",
        "isAvailable": true
      },
      {
        "id": "a1332f2f-e74d-4070-b146-26685ebc2295",
        "dayNo": 5,
        "dayName": "Friday",
        "isAvailable": true
      },
      {
        "id": "f8a69672-0b83-49ac-8396-b841a2cb2349",
        "dayNo": 6,
        "dayName": "Saturday",
        "isAvailable": true
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 11:21:57 GMT 
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
    "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "days": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "dayNo": 0,
        "dayName": "string",
        "isAvailable": true
      }
    ]
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
No links

POST
/api/excursions/{excursionId}/availability


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
Request body

application/json
{
  "days": [
    {
      "dayNo": 0,
      "isAvailable": true
    },
{
      "dayNo": 1,
      "isAvailable": true
    },
{
      "dayNo": 2,
      "isAvailable": true
    },
{
      "dayNo": 3,
      "isAvailable": true
    },
{
      "dayNo": 4,
      "isAvailable": true
    },
{
      "dayNo": 5,
      "isAvailable": true
    },
{
      "dayNo": 6,
      "isAvailable": true
    }

  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImMzNTViN2NmLWQ1ZmItNDk1Mi1hNmI4LTcxZjkxMThlZmJkZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzE2NDksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.vQNR4NGUvj2IMH0elLUiMBa5_NYXuCNWiyRSIREHOgU' \
  -H 'Content-Type: application/json' \
  -d '{
  "days": [
    {
      "dayNo": 0,
      "isAvailable": true
    },
{
      "dayNo": 1,
      "isAvailable": true
    },
{
      "dayNo": 2,
      "isAvailable": true
    },
{
      "dayNo": 3,
      "isAvailable": true
    },
{
      "dayNo": 4,
      "isAvailable": true
    },
{
      "dayNo": 5,
      "isAvailable": true
    },
{
      "dayNo": 6,
      "isAvailable": true
    }

  ]
}'
Request URL
https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Weekly availability updated successfully.",
  "data": {
    "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "days": [
      {
        "id": "8625c541-920e-4341-ac39-f496d6592f1e",
        "dayNo": 0,
        "dayName": "Sunday",
        "isAvailable": true
      },
      {
        "id": "a102270f-e823-4e8f-988f-0383b73ca72b",
        "dayNo": 1,
        "dayName": "Monday",
        "isAvailable": true
      },
      {
        "id": "8df8ea23-8e3e-4ad2-b13f-3bffbac3e6c7",
        "dayNo": 2,
        "dayName": "Tuesday",
        "isAvailable": true
      },
      {
        "id": "048262c1-93e8-4701-8046-d002798d6071",
        "dayNo": 3,
        "dayName": "Wednesday",
        "isAvailable": true
      },
      {
        "id": "998fca47-2e9a-4bc6-ad59-402af4d75c34",
        "dayNo": 4,
        "dayName": "Thursday",
        "isAvailable": true
      },
      {
        "id": "a1332f2f-e74d-4070-b146-26685ebc2295",
        "dayNo": 5,
        "dayName": "Friday",
        "isAvailable": true
      },
      {
        "id": "f8a69672-0b83-49ac-8396-b841a2cb2349",
        "dayNo": 6,
        "dayName": "Saturday",
        "isAvailable": true
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 11:21:09 GMT 
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
    "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "days": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "dayNo": 0,
        "dayName": "string",
        "isAvailable": true
      }
    ]
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
No links

GET
/api/excursions/{excursionId}/availability/{availabilityId}


Parameters
Cancel
Name	Description
excursionId *
string($uuid)
(path)
6a273ca0-c9cf-4970-863f-8bd515d692da
availabilityId *
string($uuid)
(path)
8625c541-920e-4341-ac39-f496d6592f1e
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability/8625c541-920e-4341-ac39-f496d6592f1e' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImMzNTViN2NmLWQ1ZmItNDk1Mi1hNmI4LTcxZjkxMThlZmJkZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzE2NDksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.vQNR4NGUvj2IMH0elLUiMBa5_NYXuCNWiyRSIREHOgU'
Request URL
https://touristtt.runasp.net/api/excursions/6a273ca0-c9cf-4970-863f-8bd515d692da/availability/8625c541-920e-4341-ac39-f496d6592f1e
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Availability record retrieved successfully.",
  "data": {
    "id": "8625c541-920e-4341-ac39-f496d6592f1e",
    "dayNo": 0,
    "dayName": "Sunday",
    "isAvailable": true
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 11:21:50 GMT 
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
    "dayNo": 0,
    "dayName": "string",
    "isAvailable": true
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
No links

PUT
/api/excursions/{excursionId}/availability/{availabilityId}


Parameters
Try it out
Name	Description
excursionId *
string($uuid)
(path)
excursionId
availabilityId *
string($uuid)
(path)
availabilityId
Request body

application/json
Example Value
Schema
{
  "dayNo": 0,
  "isAvailable": true
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
    "dayNo": 0,
    "dayName": "string",
    "isAvailable": true
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
No links
409	
Conflict

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
/api/excursions/{excursionId}/availability/{availabilityId}


Parameters
Try it out
Name	Description
excursionId *
string($uuid)
(path)
excursionId
availabilityId *
string($uuid)
(path)
availabilityId
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