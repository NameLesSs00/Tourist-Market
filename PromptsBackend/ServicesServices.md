now we need to create a plan for the ServicesServices could you create a plan for it it will be named site-services it's a better name for it as ServicesServices does not make much sense for the frontend project okay could you create a plan for it so we could implment it ?



GET
/api/services/services


Parameters
Cancel
Name	Description
search
string
(query)
search
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
  'https://touristtt.runasp.net/api/services/services?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/services/services?pageNumber=1&pageSize=10
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
        "id": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
        "imageUrl": "/uploads/services/79993b1e13224ab8b77823682fe7d08d.webp",
        "title": "string11",
        "description": "string11",
        "isActive": true,
        "createdAt": "2026-10-21T13:58:21.1483546"
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
 date: Wed,21 Oct 2026 14:00:55 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/services


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "description": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/services' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "description": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/services/services
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Service created successfully.",
  "data": {
    "id": "b498f6b7-26a2-4157-9664-b52874a64907",
    "imageUrl": null,
    "title": "string1",
    "description": "string1",
    "isActive": true,
    "createdAt": "2026-10-21T14:00:35.1155163Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:00:34 GMT 
 location: https://touristtt.runasp.net/api/services/services/b498f6b7-26a2-4157-9664-b52874a64907 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/services/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b4ff501d-394a-4ca9-9232-5ca24cedaba2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2
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
    "id": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
    "imageUrl": null,
    "title": "string1",
    "description": "string1",
    "isActive": true,
    "createdAt": "2026-10-21T13:58:21.1483546"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:58:34 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/services/services/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
b4ff501d-394a-4ca9-9232-5ca24cedaba2
Request body

application/json
{
  "title": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "description": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "description": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Service updated successfully.",
  "data": {
    "id": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
    "imageUrl": null,
    "title": "string11",
    "description": "string11",
    "isActive": true,
    "createdAt": "2026-10-21T13:58:21.1483546"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:59:06 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/services/services/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b498f6b7-26a2-4157-9664-b52874a64907
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/services/services/b498f6b7-26a2-4157-9664-b52874a64907' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/services/services/b498f6b7-26a2-4157-9664-b52874a64907
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Service deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:00:47 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/services/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
b4ff501d-394a-4ca9-9232-5ca24cedaba2
Request body

multipart/form-data
file
string($binary)
adminLogin.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@adminLogin.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Image uploaded successfully.",
  "data": {
    "id": "b4ff501d-394a-4ca9-9232-5ca24cedaba2",
    "imageUrl": "/uploads/services/79993b1e13224ab8b77823682fe7d08d.webp",
    "title": "string11",
    "description": "string11",
    "isActive": true,
    "createdAt": "2026-10-21T13:58:21.1483546"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:00:23 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/services/services/{id}/image


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
b4ff501d-394a-4ca9-9232-5ca24cedaba2
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/services/services/b4ff501d-394a-4ca9-9232-5ca24cedaba2/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Image deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 14:00:09 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK