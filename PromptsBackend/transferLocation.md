could you create a plan to add both of those ? they should be in the same place  in the same page in the adminpage could you do that ?
could you create a plan for it and name it Transfer Locations
review those and create a plan for it 
TransferToLocations


POST
/api/transfer-to-locations


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/transfer-to-locations' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  }
}'
Request URL
https://touristtt.runasp.net/api/transfer-to-locations
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": {
    "id": "9c9d6884-9860-4aba-9feb-c62938344cd9",
    "name": "string1"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 09:11:13 GMT 
 location: https://touristtt.runasp.net/api/transfer-to-locations/9c9d6884-9860-4aba-9feb-c62938344cd9 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-to-locations


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
lang
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-to-locations?pageNumber=1&pageSize=10&lang=en' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-to-locations?pageNumber=1&pageSize=10&lang=en
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
        "id": "9c9d6884-9860-4aba-9feb-c62938344cd9",
        "name": "string1"
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
 date: Thu,22 Oct 2026 09:11:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-to-locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
9c9d6884-9860-4aba-9feb-c62938344cd9
lang
string
(query)
de
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-to-locations/9c9d6884-9860-4aba-9feb-c62938344cd9?lang=de' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-to-locations/9c9d6884-9860-4aba-9feb-c62938344cd9?lang=de
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
    "id": "9c9d6884-9860-4aba-9feb-c62938344cd9",
    "name": "string3"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 09:11:30 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/transfer-to-locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
{
  "name": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}
Execute
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/transfer-to-locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
9c9d6884-9860-4aba-9feb-c62938344cd9
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/transfer-to-locations/9c9d6884-9860-4aba-9feb-c62938344cd9' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-to-locations/9c9d6884-9860-4aba-9feb-c62938344cd9
Server response
Code	Details
204
Undocumented
Response headers
 access-control-allow-origin: * 
 date: Thu,22 Oct 2026 09:11:43 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

TransferFromLocations


POST
/api/transfer-from-locations


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "Hur",
    "ru": "Hur",
    "de": "Hur",
    "fr": "Hur"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/transfer-from-locations' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "Hur",
    "ru": "Hur",
    "de": "Hur",
    "fr": "Hur"
  }
}'
Request URL
https://touristtt.runasp.net/api/transfer-from-locations
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": {
    "id": "75e3d2d2-c638-4a95-868d-8c9f06f7c660",
    "name": "Hur"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 09:09:55 GMT 
 location: https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-from-locations


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
lang
string
(query)
de
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-from-locations?pageNumber=1&pageSize=10&lang=de' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-from-locations?pageNumber=1&pageSize=10&lang=de
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
        "id": "75e3d2d2-c638-4a95-868d-8c9f06f7c660",
        "name": "Hur3"
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
 date: Thu,22 Oct 2026 09:10:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-from-locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
75e3d2d2-c638-4a95-868d-8c9f06f7c660
lang
string
(query)
de
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660?lang=de' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660?lang=de
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
    "id": "75e3d2d2-c638-4a95-868d-8c9f06f7c660",
    "name": "Hur"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 09:10:12 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/transfer-from-locations/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
75e3d2d2-c638-4a95-868d-8c9f06f7c660
Request body

application/json
{
  "name": {
    "en": "Hur1",
    "ru": "Hur2",
    "de": "Hur3",
    "fr": "Hur4"
  }
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "Hur1",
    "ru": "Hur2",
    "de": "Hur3",
    "fr": "Hur4"
  }
}'
Request URL
https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660
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
    "id": "75e3d2d2-c638-4a95-868d-8c9f06f7c660",
    "name": "Hur1"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 09:10:30 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/transfer-from-locations/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
75e3d2d2-c638-4a95-868d-8c9f06f7c660
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjBjMDFmMzQ3LTk4M2YtNGZhYS1iOWI2LWZiY2JlMTNkMWEyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NjM3MzYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.BwrqlYDGk67-Zbza7qEj259MMTYgGQ1BkkDrLrqt-Nk'
Request URL
https://touristtt.runasp.net/api/transfer-from-locations/75e3d2d2-c638-4a95-868d-8c9f06f7c660
Server response
Code	Details
204
Undocumented
Response headers
 access-control-allow-origin: * 
 date: Thu,22 Oct 2026 09:10:50 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK