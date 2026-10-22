now we will create a plan for the ServicesReviews they will be related to the sub  services could you review all of that and create a plan for it before you change anything please review it could you do that ?
ServicesReviews


GET
/api/services/reviews


Parameters
Cancel
Name	Description
subServiceId
string($uuid)
(query)
subServiceId
minRate
integer($int32)
(query)
minRate
maxRate
integer($int32)
(query)
maxRate
isPublished
boolean
(query)

--
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
  'https://touristtt.runasp.net/api/services/reviews?pageNumber=1&pageSize=10' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/services/reviews?pageNumber=1&pageSize=10
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
        "id": "cd751e57-3dad-4246-a2d0-13cb27a272cc",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceName": "Kia Cerato Rental",
        "fullName": "pola samy",
        "email": "pola@123.com",
        "phone": "0123165467",
        "rate": 4,
        "comment": "wow wow that's so good",
        "isPublished": false,
        "helpfulCount": 0,
        "createdAt": "2026-10-22T12:01:35.5881739"
      },
      {
        "id": "de2f6fcc-da07-4ccd-b480-da02b1010647",
        "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
        "subServiceName": "Kia Cerato Rental",
        "fullName": "testing",
        "email": "a@b.com",
        "phone": "0123456798",
        "rate": 5,
        "comment": "test",
        "isPublished": false,
        "helpfulCount": 0,
        "createdAt": "2026-10-22T07:52:06.115377"
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
 date: Thu,22 Oct 2026 12:02:49 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/services/reviews


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "fullName": "pola samy",
  "email": "pola@123.com",
  "phone": "0123165467",
  "rate": 4,
  "comment": "wow wow that's so good"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/reviews' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
  "fullName": "pola samy",
  "email": "pola@123.com",
  "phone": "0123165467",
  "rate": 4,
  "comment": "wow wow that'\''s so good"
}'
Request URL
https://touristtt.runasp.net/api/services/reviews
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Review created successfully.",
  "data": {
    "id": "cd751e57-3dad-4246-a2d0-13cb27a272cc",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceName": "Kia Cerato Rental",
    "fullName": "pola samy",
    "email": "pola@123.com",
    "phone": "0123165467",
    "rate": 4,
    "comment": "wow wow that's so good",
    "isPublished": false,
    "helpfulCount": 0,
    "createdAt": "2026-10-22T12:01:35.5881739"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:01:35 GMT 
 location: https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/services/reviews/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cd751e57-3dad-4246-a2d0-13cb27a272cc
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImY2MzI4ODM1LTRmZjgtNDU0OC1hOGI3LWFkNDE2MzVkZmI5YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzQyNDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.KJE9L9TMcdfRapYAgDqcBgG9Vp9TEXEJDzLNSKywuV8'
Request URL
https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc
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
    "id": "cd751e57-3dad-4246-a2d0-13cb27a272cc",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceName": "Kia Cerato Rental",
    "fullName": "pola samy",
    "email": "pola@123.com",
    "phone": "0123165467",
    "rate": 4,
    "comment": "wow wow that's so good",
    "isPublished": true,
    "helpfulCount": 2,
    "createdAt": "2026-10-22T12:01:35.5881739"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:05:55 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/services/reviews/{id}


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

No links

PUT
/api/services/reviews/{id}/publish


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cd751e57-3dad-4246-a2d0-13cb27a272cc
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc/publish' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImY2MzI4ODM1LTRmZjgtNDU0OC1hOGI3LWFkNDE2MzVkZmI5YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzQyNDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.KJE9L9TMcdfRapYAgDqcBgG9Vp9TEXEJDzLNSKywuV8'
Request URL
https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc/publish
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Review published successfully.",
  "data": {
    "id": "cd751e57-3dad-4246-a2d0-13cb27a272cc",
    "subServiceId": "2ce3abae-b488-46f5-ab41-401527a5652c",
    "subServiceName": "Kia Cerato Rental",
    "fullName": "pola samy",
    "email": "pola@123.com",
    "phone": "0123165467",
    "rate": 4,
    "comment": "wow wow that's so good",
    "isPublished": true,
    "helpfulCount": 0,
    "createdAt": "2026-10-22T12:01:35.5881739"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:05:31 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/services/reviews/{id}/unpublish


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

No links

POST
/api/services/reviews/{id}/helpful


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
cd751e57-3dad-4246-a2d0-13cb27a272cc
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc/helpful' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImY2MzI4ODM1LTRmZjgtNDU0OC1hOGI3LWFkNDE2MzVkZmI5YiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzQyNDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.KJE9L9TMcdfRapYAgDqcBgG9Vp9TEXEJDzLNSKywuV8' \
  -d ''
Request URL
https://touristtt.runasp.net/api/services/reviews/cd751e57-3dad-4246-a2d0-13cb27a272cc/helpful
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Review marked as helpful.",
  "data": 2,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:05:37 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK