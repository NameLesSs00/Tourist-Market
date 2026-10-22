those are the set of endpoints for the subCatagoies for the catagoies for the prodcuts okay could you create a plan so that we could add them right ?
make sure we don't show the catagoie id but show the name and we should be able to search between them could you createa a full plan so that we could add them to the app?
SubCategories


GET
/api/subcategories


Parameters
Cancel
Name	Description
search
string
(query)
search
categoryId
integer($int32)
(query)
categoryId
language
string
(query)
language
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
  'https://touristtt.runasp.net/api/subcategories?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/subcategories?pageNumber=1&pageSize=10
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
        "id": 1,
        "name": "string1",
        "imageUrl": "/uploads/subcategories/87d27ef76a814cbfbbbc97b068304795.webp",
        "displayOrder": 2,
        "categoryId": 1,
        "noOfItems": 0
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
 date: Wed,21 Oct 2026 13:21:30 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/subcategories


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "123",
    "ru": "321",
    "de": "123",
    "fr": "123123"
  },
  "displayOrder": 1,
  "categoryId": 2
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/subcategories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "123",
    "ru": "321",
    "de": "123",
    "fr": "123123"
  },
  "displayOrder": 1,
  "categoryId": 2
}'
Request URL
https://touristtt.runasp.net/api/subcategories
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategory created successfully.",
  "data": {
    "id": 1,
    "name": "123",
    "imageUrl": null,
    "displayOrder": 1,
    "categoryId": 2,
    "noOfItems": 0
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:18:55 GMT 
 location: https://touristtt.runasp.net/api/subcategories/1 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/subcategories/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
language
string
(query)
ru
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/subcategories/1?language=ru' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/subcategories/1?language=ru
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
    "id": 1,
    "name": "string2",
    "imageUrl": "/uploads/subcategories/87d27ef76a814cbfbbbc97b068304795.webp",
    "displayOrder": 2,
    "categoryId": 1,
    "noOfItems": 0
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:21:26 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/subcategories/{id}


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

application/json
{
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "displayOrder": 1,
  "categoryId": 1
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/subcategories/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "displayOrder": 1,
  "categoryId": 1
}'
Request URL
https://touristtt.runasp.net/api/subcategories/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategory updated successfully.",
  "data": {
    "id": 1,
    "name": "string1",
    "imageUrl": null,
    "displayOrder": 1,
    "categoryId": 1,
    "noOfItems": 0
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:20:36 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/subcategories/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/subcategories/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/subcategories/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategory deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:21:46 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/subcategories/reorder


Parameters
Cancel
Reset
No parameters

Request body

application/json
[
  {
    "id": 1,
    "displayOrder": 2
  }
]
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/subcategories/reorder' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '[
  {
    "id": 1,
    "displayOrder": 2
  }
]'
Request URL
https://touristtt.runasp.net/api/subcategories/reorder
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategories reordered successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:20:47 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/subcategories/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

multipart/form-data
file
string($binary)
Polygon 3.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/subcategories/1/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Polygon 3.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/subcategories/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategory image uploaded successfully.",
  "data": {
    "id": 1,
    "name": "string1",
    "imageUrl": "/uploads/subcategories/87d27ef76a814cbfbbbc97b068304795.webp",
    "displayOrder": 2,
    "categoryId": 1,
    "noOfItems": 0
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:21:22 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/subcategories/{id}/image


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/subcategories/1/image' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/subcategories/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "SubCategory image deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 13:21:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK