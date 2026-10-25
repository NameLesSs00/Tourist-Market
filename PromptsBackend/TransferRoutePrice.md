create a plan so that we could add the controler for the transfer route price it should be in the same place as the Transfer Locations and we will call this from now on transfer service okay now create a plan for it so that we could add the  TransferRoutePrice to the rest of the thing in the amdin


public enum VehicleType
    {
        Car = 1,
        Microbus = 2,
        Minibus = 3,
        Bus = 4,
        StandardSedan = 5,
        VipSedan = 6,
        Minivan =7,
        CoasterBus = 8
    }

POST
/api/transfer-route-prices


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "vehicleType": 1,
  "priceUsd": 25,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/transfer-route-prices' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "vehicleType": 1,
  "priceUsd": 25,
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/transfer-route-prices
Server response
Code	Details
201	
Response body
Download
{
  "id": "db488978-c88d-411c-bdb8-c0eb61552f19",
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "fromLocationName": null,
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "toLocationName": null,
  "vehicleType": 0,
  "priceUsd": 25,
  "isActive": true,
  "displayCurrency": "USD",
  "displayPrice": 25,
  "displayCurrencySymbol": "$"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 15:23:57 GMT 
 location: https://touristtt.runasp.net/api/transfer-route-prices/db488978-c88d-411c-bdb8-c0eb61552f19 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocationName": "string",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationName": "string",
  "vehicleType": 1,
  "priceUsd": 0,
  "isActive": true,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string"
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
/api/transfer-route-prices


Parameters
Cancel
Name	Description
fromLocationId
string($uuid)
(query)
fromLocationId
toLocationId
string($uuid)
(query)
toLocationId
vehicleType
integer($int32)
(query)

--
isActive
boolean
(query)

--
minPrice
number($double)
(query)
minPrice
maxPrice
number($double)
(query)
maxPrice
displayCurrency
string
(query)
displayCurrency
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
20
sortBy
string
(query)
Price
sortDirection
string
(query)
asc
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-route-prices?pageNumber=1&pageSize=20&sortBy=Price&sortDirection=asc' \
  -H 'accept: application/json'
Request URL
https://touristtt.runasp.net/api/transfer-route-prices?pageNumber=1&pageSize=20&sortBy=Price&sortDirection=asc
Server response
Code	Details
200	
Response body
Download
{
  "items": [
    {
      "id": "db488978-c88d-411c-bdb8-c0eb61552f19",
      "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
      "fromLocationName": "string1",
      "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
      "toLocationName": "string11",
      "vehicleType": 0,
      "priceUsd": 25,
      "isActive": true,
      "displayCurrency": "USD",
      "displayPrice": 25,
      "displayCurrencySymbol": "$"
    }
  ],
  "pageNumber": 1,
  "pageSize": 20,
  "totalCount": 1,
  "totalPages": 1,
  "hasPreviousPage": false,
  "hasNextPage": false
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 15:24:43 GMT 
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
      "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationName": "string",
      "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocationName": "string",
      "vehicleType": 1,
      "priceUsd": 0,
      "isActive": true,
      "displayCurrency": "string",
      "displayPrice": 0,
      "displayCurrencySymbol": "string"
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
/api/transfer-route-prices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
db488978-c88d-411c-bdb8-c0eb61552f19
displayCurrency
string
(query)
displayCurrency
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/transfer-route-prices/db488978-c88d-411c-bdb8-c0eb61552f19' \
  -H 'accept: application/json'
Request URL
https://touristtt.runasp.net/api/transfer-route-prices/db488978-c88d-411c-bdb8-c0eb61552f19
Server response
Code	Details
200	
Response body
Download
{
  "id": "db488978-c88d-411c-bdb8-c0eb61552f19",
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "fromLocationName": "string1",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "toLocationName": "string11",
  "vehicleType": 0,
  "priceUsd": 25,
  "isActive": true,
  "displayCurrency": "USD",
  "displayPrice": 25,
  "displayCurrencySymbol": "$"
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 15:24:50 GMT 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocationName": "string",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationName": "string",
  "vehicleType": 1,
  "priceUsd": 0,
  "isActive": true,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string"
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
/api/transfer-route-prices/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
db488978-c88d-411c-bdb8-c0eb61552f19
Request body

application/json
{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "vehicleType": 1,
  "priceUsd": 20,
  "isActive": true
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/transfer-route-prices/db488978-c88d-411c-bdb8-c0eb61552f19' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "vehicleType": 1,
  "priceUsd": 20,
  "isActive": true
}'
Request URL
https://touristtt.runasp.net/api/transfer-route-prices/db488978-c88d-411c-bdb8-c0eb61552f19
Server response
Code	Details
200	
Response body
Download
{
  "id": "db488978-c88d-411c-bdb8-c0eb61552f19",
  "fromLocationId": "018f5b2d-1f32-4662-9eb3-3865e516256b",
  "fromLocationName": null,
  "toLocationId": "c47d1a72-6bc2-4cfa-a57b-cc6f0d4c3706",
  "toLocationName": null,
  "vehicleType": 0,
  "priceUsd": 20,
  "isActive": true,
  "displayCurrency": "USD",
  "displayPrice": 20,
  "displayCurrencySymbol": "$"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 15:24:56 GMT 
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
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "fromLocationName": "string",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationName": "string",
  "vehicleType": 1,
  "priceUsd": 0,
  "isActive": true,
  "displayCurrency": "string",
  "displayPrice": 0,
  "displayCurrencySymbol": "string"
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
/api/transfer-route-prices/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
60908452-556b-4ee6-90ba-c5defcbd2b20
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/transfer-route-prices/60908452-556b-4ee6-90ba-c5defcbd2b20' \
  -H 'accept: */*'
Request URL
https://touristtt.runasp.net/api/transfer-route-prices/60908452-556b-4ee6-90ba-c5defcbd2b20
Server response
Code	Details
204	
Response headers
 access-control-allow-origin: * 
 date: Sat,24 Oct 2026 15:23:46 GMT 
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