now for the last type of the reviews we should create a plan for it and make sure it work right could you create a plan for it ?
ExcursionReviews


GET
/api/excursion-reviews


Parameters
Cancel
Name	Description
excursionId
string($uuid)
(query)
excursionId
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
isApproved
boolean
(query)

--
languageCode
string
(query)
languageCode
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
  'https://touristtt.runasp.net/api/excursion-reviews?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM'
Request URL
https://touristtt.runasp.net/api/excursion-reviews?pageNumber=1&pageSize=10
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
        "id": "3a851823-536e-4ec1-bfbe-8cee6651d3b3",
        "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
        "excursionName": "Private Dolphin House Speedboat & Snorkeling Trip",
        "customerName": "pola",
        "customerEmail": "pola@f.com",
        "rating": 3,
        "title": "title of the comment ",
        "comment": "string woooooooooooooooow",
        "helpfulCount": 1,
        "isPublished": true,
        "createdAt": "2026-10-22T12:32:24.5744278"
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
 date: Thu,22 Oct 2026 12:33:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/excursion-reviews


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
  "customerName": "pola",
  "customerEmail": "pola@f.com",
  "rating": 3,
  "title": "title of the comment ",
  "comment": "string woooooooooooooooow"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursion-reviews' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM' \
  -H 'Content-Type: application/json' \
  -d '{
  "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
  "customerName": "pola",
  "customerEmail": "pola@f.com",
  "rating": 3,
  "title": "title of the comment ",
  "comment": "string woooooooooooooooow"
}'
Request URL
https://touristtt.runasp.net/api/excursion-reviews
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Review created successfully and pending moderation.",
  "data": {
    "id": "3a851823-536e-4ec1-bfbe-8cee6651d3b3",
    "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "excursionName": "Private Dolphin House Speedboat & Snorkeling Trip",
    "customerName": "pola",
    "customerEmail": "pola@f.com",
    "rating": 3,
    "title": "title of the comment ",
    "comment": "string woooooooooooooooow",
    "helpfulCount": 0,
    "isPublished": false,
    "createdAt": "2026-10-22T12:32:24.5744278"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:32:24 GMT 
 location: https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/excursion-reviews/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
3a851823-536e-4ec1-bfbe-8cee6651d3b3
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM'
Request URL
https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3
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
    "id": "3a851823-536e-4ec1-bfbe-8cee6651d3b3",
    "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "excursionName": "Private Dolphin House Speedboat & Snorkeling Trip",
    "customerName": "pola",
    "customerEmail": "pola@f.com",
    "rating": 3,
    "title": "title of the comment ",
    "comment": "string woooooooooooooooow",
    "helpfulCount": 0,
    "isPublished": false,
    "createdAt": "2026-10-22T12:32:24.5744278"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:32:33 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/excursion-reviews/{id}


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
/api/excursion-reviews/{id}/publish


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
3a851823-536e-4ec1-bfbe-8cee6651d3b3
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3/publish' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM'
Request URL
https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3/publish
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
    "id": "3a851823-536e-4ec1-bfbe-8cee6651d3b3",
    "excursionId": "6a273ca0-c9cf-4970-863f-8bd515d692da",
    "excursionName": "Private Dolphin House Speedboat & Snorkeling Trip",
    "customerName": "pola",
    "customerEmail": "pola@f.com",
    "rating": 3,
    "title": "title of the comment ",
    "comment": "string woooooooooooooooow",
    "helpfulCount": 0,
    "isPublished": true,
    "createdAt": "2026-10-22T12:32:24.5744278"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:32:56 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/excursion-reviews/{id}/unpublish


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
/api/excursion-reviews/{id}/helpful


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
3a851823-536e-4ec1-bfbe-8cee6651d3b3
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3/helpful' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImE1NzI3NTE2LTg4OTItNDFhOS1iYmEzLTY4NDZmYTQ1ODY0MyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2NzU4ODIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.xAD8WasDNWd5vtWRxuFVz6otvyYKd443omiEv3_OFFM' \
  -d ''
Request URL
https://touristtt.runasp.net/api/excursion-reviews/3a851823-536e-4ec1-bfbe-8cee6651d3b3/helpful
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Review marked as helpful.",
  "data": 1,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,22 Oct 2026 12:33:03 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK