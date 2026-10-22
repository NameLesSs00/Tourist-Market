could you create a plan so that we could add the currency to the admin dashboard just like we did before create a plan and follow the same folder strucher as before could you do that ?
Currency


GET
/api/currencies


Parameters
Cancel
Name	Description
code
string
(query)
code
isActive
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
20
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/currencies?pageNumber=1&pageSize=20' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/currencies?pageNumber=1&pageSize=20
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
        "id": 3,
        "code": "CAD",
        "name": "Canadian dollar",
        "symbol": "CA$",
        "exchangeRate": 0.71,
        "isActive": true,
        "updatedAt": "2026-10-21T11:48:57.8847663"
      },
      {
        "id": 2,
        "code": "EUR",
        "name": "euro",
        "symbol": "€",
        "exchangeRate": 1.12,
        "isActive": true,
        "updatedAt": "2026-10-21T11:48:38.5824973"
      },
      {
        "id": 1,
        "code": "USD",
        "name": "dollar",
        "symbol": "$",
        "exchangeRate": 1,
        "isActive": true,
        "updatedAt": "2026-10-21T11:47:33.1099576"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 3,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:49:01 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/currencies


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
    "code": "GBP",
    "name": "British pound",
    "symbol": "£",
    "exchangeRate": 1.34,
    "isActive": true
  }
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/currencies' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA' \
  -H 'Content-Type: application/json' \
  -d '{
    "code": "GBP",
    "name": "British pound",
    "symbol": "£",
    "exchangeRate": 1.34,
    "isActive": true
  }'
Request URL
https://touristtt.runasp.net/api/currencies
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Currency created successfully.",
  "data": {
    "id": 4,
    "code": "GBP",
    "name": "British pound",
    "symbol": "£",
    "exchangeRate": 1.34,
    "isActive": true,
    "updatedAt": "2026-10-21T11:49:52.1029899Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:49:51 GMT 
 location: https://touristtt.runasp.net/api/currencies/4 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/currencies/active


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/currencies/active' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/currencies/active
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": null,
  "data": [
    {
      "id": 3,
      "code": "CAD",
      "name": "Canadian dollar",
      "symbol": "CA$",
      "exchangeRate": 0.71,
      "isActive": true,
      "updatedAt": "2026-10-21T11:48:57.8847663"
    },
    {
      "id": 2,
      "code": "EUR",
      "name": "euro",
      "symbol": "€",
      "exchangeRate": 1.12,
      "isActive": true,
      "updatedAt": "2026-10-21T11:48:38.5824973"
    },
    {
      "id": 4,
      "code": "GBP",
      "name": "British pound",
      "symbol": "£",
      "exchangeRate": 1.34,
      "isActive": true,
      "updatedAt": "2026-10-21T11:49:52.1029899"
    },
    {
      "id": 1,
      "code": "USD",
      "name": "dollar",
      "symbol": "$",
      "exchangeRate": 1,
      "isActive": true,
      "updatedAt": "2026-10-21T11:47:33.1099576"
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:49:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/currencies/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/currencies/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/currencies/2
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
    "id": 2,
    "code": "EUR",
    "name": "euro",
    "symbol": "€",
    "exchangeRate": 1.12,
    "isActive": true,
    "updatedAt": "2026-10-21T11:48:38.5824973"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:49:20 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/currencies/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Request body

application/json
Example Value
Schema
{
  "code": "string",
  "name": "string",
  "symbol": "string",
  "exchangeRate": 0,
  "isActive": true
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/currencies/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
3
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/currencies/3' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/currencies/3
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Currency deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:50:04 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/currencies/code/{code}


Parameters
Cancel
Name	Description
code *
string
(path)
EUR
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/currencies/code/EUR' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijc1Yjk1NGY2LTJjNjUtNDZjOC04NzJiLWU5MGFkZDU5OTkxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1ODY3NTcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.PgKIu9az4S21TpujpisUbzGImD9ZxxSPcCy3aPG02kA'
Request URL
https://touristtt.runasp.net/api/currencies/code/EUR
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
    "id": 2,
    "code": "EUR",
    "name": "euro",
    "symbol": "€",
    "exchangeRate": 1.12,
    "isActive": true,
    "updatedAt": "2026-10-21T11:48:38.5824973"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 11:50:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK