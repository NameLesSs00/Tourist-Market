VehicleTypeTransfer


POST
/api/vehicle-type-transfers


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
  },
  "fromPerson": 10,
  "toPerson": 35,
  "additionalHoursUsd": 15,
  "discountPercentage": 10
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/vehicle-type-transfers' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "fromPerson": 10,
  "toPerson": 35,
  "additionalHoursUsd": 15,
  "discountPercentage": 10
}'
Request URL
https://touristtt.runasp.net/api/vehicle-type-transfers
Server response
Code	Details
201	
Response body
Download
{
  "id": "4ca58f89-d8de-449b-b855-0f2721764494",
  "name": "string1",
  "fromPerson": 10,
  "toPerson": 35,
  "additionalHours": 15,
  "discountPercentage": 10,
  "currency": "USD"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:07:40 GMT 
 location: https://touristtt.runasp.net/api/vehicle-type-transfers/4ca58f89-d8de-449b-b855-0f2721764494?currency=USD&lang=en 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
201	
Created

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "fromPerson": 0,
  "toPerson": 0,
  "additionalHours": 0,
  "discountPercentage": 0,
  "currency": "string"
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/vehicle-type-transfers


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
currency
string
(query)
USD
lang
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-type-transfers?pageNumber=1&pageSize=10&currency=USD&lang=en' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/vehicle-type-transfers?pageNumber=1&pageSize=10&currency=USD&lang=en
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "debf5a42-26de-4b6d-a4fd-a60799f32568",
      "name": "Bus",
      "fromPerson": 4,
      "toPerson": 9,
      "additionalHours": 10,
      "discountPercentage": 15,
      "currency": "USD"
    },
    {
      "id": "373b6d7d-8a54-4f23-8759-7b175a98926b",
      "name": "Car",
      "fromPerson": 1,
      "toPerson": 3,
      "additionalHours": 10,
      "discountPercentage": 15,
      "currency": "USD"
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 2,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:06:17 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "fromPerson": 0,
      "toPerson": 0,
      "additionalHours": 0,
      "discountPercentage": 0,
      "currency": "string"
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links

GET
/api/vehicle-type-transfers/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
373b6d7d-8a54-4f23-8759-7b175a98926b
currency
string
(query)
USD
lang
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/vehicle-type-transfers/373b6d7d-8a54-4f23-8759-7b175a98926b?currency=USD&lang=en' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/vehicle-type-transfers/373b6d7d-8a54-4f23-8759-7b175a98926b?currency=USD&lang=en
Server response
Code	Details
200	
Response body
Download
{
  "id": "373b6d7d-8a54-4f23-8759-7b175a98926b",
  "name": "Car",
  "fromPerson": 1,
  "toPerson": 3,
  "additionalHours": 10,
  "discountPercentage": 15,
  "currency": "USD"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:06:46 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "fromPerson": 0,
  "toPerson": 0,
  "additionalHours": 0,
  "discountPercentage": 0,
  "currency": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/vehicle-type-transfers/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "fromPerson": 0,
  "toPerson": 0,
  "additionalHoursUsd": 0,
  "discountPercentage": 0
}
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "fromPerson": 0,
  "toPerson": 0,
  "additionalHours": 0,
  "discountPercentage": 0,
  "currency": "string"
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

DELETE
/api/vehicle-type-transfers/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
373b6d7d-8a54-4f23-8759-7b175a98926b
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/vehicle-type-transfers/373b6d7d-8a54-4f23-8759-7b175a98926b' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/vehicle-type-transfers/373b6d7d-8a54-4f23-8759-7b175a98926b
Server response
Code	Details
400	
Error: response status is 400

Response body
Download
{
  "message": "Cannot delete vehicle type '373b6d7d-8a54-4f23-8759-7b175a98926b' because it is referenced by existing route prices."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:07:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
204	
No Content

No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
TransferVehiclePrice


POST
/api/transfer-vehicle-prices


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "priceUsd": 0
}
Responses
Code	Description	Links
201	
Created

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeName": "string",
  "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocation": "string",
  "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocation": "string",
  "priceUsd": 0,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string",
  "additionalHours": 0,
  "discountPercentage": 0
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/transfer-vehicle-prices


Parameters
Cancel
Name	Description
VehicleTypeTransferId
string($uuid)
(query)
VehicleTypeTransferId
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
DisplayCurrency
string
(query)
DisplayCurrency
Lang
string
(query)
Lang
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
SortBy
string
(query)
SortBy
SortDirection
string
(query)
SortDirection
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-vehicle-prices' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/transfer-vehicle-prices
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "a1c38ca0-e375-4290-89e4-3ab1ab6726c0",
      "vehicleTypeTransferId": "373b6d7d-8a54-4f23-8759-7b175a98926b",
      "vehicleTypeName": "Car",
      "fromId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
      "fromLocation": "string1",
      "toId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
      "toLocation": "string11",
      "priceUsd": 39,
      "displayCurrency": "USD",
      "displayPrice": 39,
      "displayCurrencySymbol": "$",
      "additionalHours": 10,
      "discountPercentage": 15
    },
    {
      "id": "792c49ad-ec4d-4ec4-bf10-8db7413d07c4",
      "vehicleTypeTransferId": "debf5a42-26de-4b6d-a4fd-a60799f32568",
      "vehicleTypeName": "Bus",
      "fromId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
      "fromLocation": "string1",
      "toId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
      "toLocation": "string11",
      "priceUsd": 39,
      "displayCurrency": "USD",
      "displayPrice": 39,
      "displayCurrencySymbol": "$",
      "additionalHours": 10,
      "discountPercentage": 15
    }
  ],
  "pageNumber": 1,
  "pageSize": 20,
  "totalCount": 2,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:08:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleTypeName": "string",
      "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocation": "string",
      "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocation": "string",
      "priceUsd": 0,
      "displayCurrency": "string",
      "displayPrice": 0,
      "displayCurrencySymbol": "string",
      "additionalHours": 0,
      "discountPercentage": 0
    }
  ],
  "pageNumber": 0,
  "pageSize": 0,
  "totalCount": 0,
  "totalPages": 0,
  "hasPreviousPage": true,
  "hasNextPage": true
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/transfer-vehicle-prices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
792c49ad-ec4d-4ec4-bf10-8db7413d07c4
currency
string
(query)
currency
lang
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-vehicle-prices/792c49ad-ec4d-4ec4-bf10-8db7413d07c4?lang=en' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/transfer-vehicle-prices/792c49ad-ec4d-4ec4-bf10-8db7413d07c4?lang=en
Server response
Code	Details
200	
Response body
Download
{
  "id": "792c49ad-ec4d-4ec4-bf10-8db7413d07c4",
  "vehicleTypeTransferId": "debf5a42-26de-4b6d-a4fd-a60799f32568",
  "vehicleTypeName": "Bus",
  "fromId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "fromLocation": "string1",
  "toId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "toLocation": "string11",
  "priceUsd": 39,
  "displayCurrency": "USD",
  "displayPrice": 39,
  "displayCurrencySymbol": "$",
  "additionalHours": 10,
  "discountPercentage": 15
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,01 Nov 2026 16:08:29 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeName": "string",
  "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocation": "string",
  "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocation": "string",
  "priceUsd": 0,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string",
  "additionalHours": 0,
  "discountPercentage": 0
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

PUT
/api/transfer-vehicle-prices/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "priceUsd": 0
}
Responses
Code	Description	Links
200	
OK

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "vehicleTypeName": "string",
  "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocation": "string",
  "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocation": "string",
  "priceUsd": 0,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string",
  "additionalHours": 0,
  "discountPercentage": 0
}
No links
400	
Bad Request

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

DELETE
/api/transfer-vehicle-prices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
792c49ad-ec4d-4ec4-bf10-8db7413d07c4
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/transfer-vehicle-prices/792c49ad-ec4d-4ec4-bf10-8db7413d07c4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjgzYWY3MjdmLWU1M2UtNDYyNS04YTFiLWYwOTdkMzRlMDA0OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM1OTA1MTYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.EOagBaxSRBLcWgkg8DPxgCYPRDcettm5JSrkFhDHHFY'
Request URL
https://touristtt.runasp.net/api/transfer-vehicle-prices/792c49ad-ec4d-4ec4-bf10-8db7413d07c4
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Sun,01 Nov 2026 16:08:38 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
204	
No Content

No links
404	
Not Found

Media type

application/json
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}