DeliveryProducts


GET
/api/delivery-products


Parameters
Cancel
Name	Description
isActive
boolean
(query)

--
currency
string
(query)
currency
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
20
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/delivery-products?pageNumber=1&pageSize=20' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM'
Request URL
https://touristtt.runasp.net/api/delivery-products?pageNumber=1&pageSize=20
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
        "area": "HUR",
        "priceUsd": 4,
        "isActive": true,
        "createdAt": "2026-11-01T08:20:16.4530917"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 1,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:20:20 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/delivery-products


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "area": {
    "en": "HUR",
    "ru": "HURru",
    "de": "HURde",
    "fr": "HURfr"
  },
  "priceUsd": 4
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/delivery-products' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM' \
  -H 'Content-Type: application/json' \
  -d '{
  "area": {
    "en": "HUR",
    "ru": "HURru",
    "de": "HURde",
    "fr": "HURfr"
  },
  "priceUsd": 4
}'
Request URL
https://touristtt.runasp.net/api/delivery-products
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Delivery product created successfully.",
  "data": {
    "id": 2,
    "area": "HUR",
    "priceUsd": 4,
    "isActive": true,
    "createdAt": "2026-11-01T08:20:58.3620873Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:20:57 GMT 
 location: https://touristtt.runasp.net/api/delivery-products/2 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/delivery-products/{id}


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
language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/delivery-products/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM'
Request URL
https://touristtt.runasp.net/api/delivery-products/1
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
    "area": "HUR",
    "priceUsd": 4,
    "isActive": true,
    "createdAt": "2026-11-01T08:20:16.4530917"
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:20:26 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/delivery-products/{id}


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
  "area": {
    "en": "HUR",
    "ru": "HURru",
    "de": "HURde",
    "fr": "HURfr"
  },
  "priceUsd": 4,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/delivery-products/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM' \
  -H 'Content-Type: application/json' \
  -d '{
  "area": {
    "en": "HUR",
    "ru": "HURru",
    "de": "HURde",
    "fr": "HURfr"
  },
  "priceUsd": 4,
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/delivery-products/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Delivery product updated successfully.",
  "data": {
    "id": 1,
    "area": "HUR",
    "priceUsd": 4,
    "isActive": true,
    "createdAt": "2026-11-01T08:20:16.4530917"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:20:46 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/delivery-products/{id}


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
  'https://touristtt.runasp.net/api/delivery-products/1' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjljMDI5YWZlLWQwYmEtNDdlYS05ZmEwLTQ2MTliMDQyMDZhMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1NjQyMzEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.jdZ4N8ws0gUOWRUrhTgTDiyR4BxjrxIWYjMV1pRa3XM'
Request URL
https://touristtt.runasp.net/api/delivery-products/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Delivery product deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 08:20:52 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK