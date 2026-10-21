ExcursionCategories


GET
/api/excursion-categories


Parameters
Cancel
Name	Description
search
string
(query)
search
language
string
(query)
language
lang
string
(query)
lang
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
page
integer($int32)
(query)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursion-categories?pageNumber=1&pageSize=10&page=1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImZlMjM1Yzg1LWMzMDctNDdmNy1hZDAyLTM0YWQ0OGVkODc5OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDc2MDQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.I3WvyTUHTLi7auWdBKLWie71-OmI0bewlefwWhtTU4w'
Request URL
https://touristtt.runasp.net/api/excursion-categories?pageNumber=1&pageSize=10&page=1
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
        "id": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
        "name": "123",
        "slug": "123",
        "displayOrder": 0,
        "isActive": true,
        "noOfItems": 1,
        "createdAt": "2026-10-20T13:35:29.7213851",
        "updatedAt": null
      },
      {
        "id": "c06f55b5-e3b3-4cde-8768-681f5322d456",
        "name": "string",
        "slug": "string",
        "displayOrder": 0,
        "isActive": true,
        "noOfItems": 0,
        "createdAt": "2026-10-20T13:16:24.0188165",
        "updatedAt": null
      }
    ],
    "totalCount": 2,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 14:21:21 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/excursion-categories


Parameters
Try it out
Reset
No parameters

Request body

application/json
Example Value
Schema
{
  "name": {
    "en": "123",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursion-categories' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "123",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}'
Request URL
https://touristtt.runasp.net/api/excursion-categories
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Execution Category created successfully.",
  "data": {
    "id": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
    "name": "123",
    "slug": "123",
    "displayOrder": 0,
    "isActive": true,
    "noOfItems": 0,
    "createdAt": "2026-10-20T13:35:29.7213851",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 13:35:29 GMT 
 location: https://touristtt.runasp.net/api/excursion-categories/a1eb08c1-48dd-49b9-8822-608959e4ccd4 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/excursion-categories/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
a1eb08c1-48dd-49b9-8822-608959e4ccd4
language
string
(query)
language
lang
string
(query)
lang
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursion-categories/a1eb08c1-48dd-49b9-8822-608959e4ccd4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImZlMjM1Yzg1LWMzMDctNDdmNy1hZDAyLTM0YWQ0OGVkODc5OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDc2MDQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.I3WvyTUHTLi7auWdBKLWie71-OmI0bewlefwWhtTU4w'
Request URL
https://touristtt.runasp.net/api/excursion-categories/a1eb08c1-48dd-49b9-8822-608959e4ccd4
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
    "id": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
    "name": "string123",
    "slug": "string123",
    "displayOrder": 0,
    "isActive": true,
    "noOfItems": 1,
    "createdAt": "2026-10-20T13:35:29.7213851",
    "updatedAt": "2026-10-20T14:22:00.4026166"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 14:22:04 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/excursion-categories/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
a1eb08c1-48dd-49b9-8822-608959e4ccd4
Request body

application/json
{
  "name": {
    "en": "string123",
    "ru": "string321",
    "de": "string11",
    "fr": "string221"
  },
  "displayOrder": 0,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/excursion-categories/a1eb08c1-48dd-49b9-8822-608959e4ccd4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImZlMjM1Yzg1LWMzMDctNDdmNy1hZDAyLTM0YWQ0OGVkODc5OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDc2MDQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.I3WvyTUHTLi7auWdBKLWie71-OmI0bewlefwWhtTU4w' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "string123",
    "ru": "string321",
    "de": "string11",
    "fr": "string221"
  },
  "displayOrder": 0,
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/excursion-categories/a1eb08c1-48dd-49b9-8822-608959e4ccd4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Execution Category updated successfully.",
  "data": {
    "id": "a1eb08c1-48dd-49b9-8822-608959e4ccd4",
    "name": "string123",
    "slug": "string123",
    "displayOrder": 0,
    "isActive": true,
    "noOfItems": 1,
    "createdAt": "2026-10-20T13:35:29.7213851",
    "updatedAt": "2026-10-20T14:22:00.4026166"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 14:22:00 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/excursion-categories/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
c06f55b5-e3b3-4cde-8768-681f5322d456
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/excursion-categories/c06f55b5-e3b3-4cde-8768-681f5322d456' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImZlMjM1Yzg1LWMzMDctNDdmNy1hZDAyLTM0YWQ0OGVkODc5OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDc2MDQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.I3WvyTUHTLi7auWdBKLWie71-OmI0bewlefwWhtTU4w'
Request URL
https://touristtt.runasp.net/api/excursion-categories/c06f55b5-e3b3-4cde-8768-681f5322d456
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Execution Category deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 14:22:31 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK