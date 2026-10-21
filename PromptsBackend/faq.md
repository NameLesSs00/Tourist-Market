create a plan so that we could finsih this controler make sure to create a plan so that we could add the backend logic so that we could use them also note that in the edit we should fetch all of the langues the four of them so that we could edit it right as we edit all of them could you create a plan so that eveything is right
Faqs


GET
/api/faqs


Parameters
Cancel
Name	Description
language
string
(query)
language
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
  'https://touristtt.runasp.net/api/faqs?pageNumber=1&pageSize=10' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/faqs?pageNumber=1&pageSize=10
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
        "id": "6ee5b905-9bdc-4fd1-ab25-1b36d8881a0d",
        "question": "test",
        "answer": "string1",
        "displayOrder": 1
      },
      {
        "id": "4bdb52ae-e1ba-4344-af6c-1c058ea9de02",
        "question": "test2",
        "answer": "string2",
        "displayOrder": 1
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
 date: Tue,20 Oct 2026 11:28:52 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/faqs


Parameters
Cancel
No parameters

Request body

application/json
{
  "question": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "answer": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/faqs' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "answer": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}'
Request URL
https://touristtt.runasp.net/api/faqs
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "FAQ created successfully.",
  "data": {
    "id": "e7bf9253-8a80-4613-8123-6ba8110a54eb",
    "question": "string",
    "answer": "string",
    "displayOrder": 0
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 11:29:24 GMT 
 location: https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/faqs/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
e7bf9253-8a80-4613-8123-6ba8110a54eb
language
string
(query)
language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE'
Request URL
https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb
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
    "id": "e7bf9253-8a80-4613-8123-6ba8110a54eb",
    "question": "123",
    "answer": "str123ing",
    "displayOrder": 0
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 11:29:48 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/faqs/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
e7bf9253-8a80-4613-8123-6ba8110a54eb
Request body

application/json
{
  "question": {
    "en": "123",
    "ru": "str123ing",
    "de": "string",
    "fr": "string"
  },
  "answer": {
    "en": "str123ing",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE' \
  -H 'Content-Type: application/json' \
  -d '{
  "question": {
    "en": "123",
    "ru": "str123ing",
    "de": "string",
    "fr": "string"
  },
  "answer": {
    "en": "str123ing",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "displayOrder": 0
}'
Request URL
https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "FAQ updated successfully.",
  "data": {
    "id": "e7bf9253-8a80-4613-8123-6ba8110a54eb",
    "question": "123",
    "answer": "str123ing",
    "displayOrder": 0
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 11:29:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/faqs/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
e7bf9253-8a80-4613-8123-6ba8110a54eb
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE'
Request URL
https://touristtt.runasp.net/api/faqs/e7bf9253-8a80-4613-8123-6ba8110a54eb
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "FAQ deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 11:29:57 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK