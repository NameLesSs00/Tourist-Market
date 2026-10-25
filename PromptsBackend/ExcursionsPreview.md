create a plan for the preview this will not be used now but it's better to implment them they don't have a way to show them way could you create a plan for it ? it will be used later for the client booking for the trips could you create a plan for it ?
Excursions


POST
/api/excursions/{excursionId}/private-price-preview


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
15aa7446-3110-4829-8d52-d4e1eed7886c
Request body

application/json
{
  "adults": 2,
  "children": 1,
  "infants": 0,
  "selectedAttractionIds": [
    "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
    "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
    "e25086dc-87c9-463c-9ce1-b81293c27ed4"
  ],
  "selectedServiceIds": [
    "03f87255-1428-45e7-aa6a-a64f4cd8b813",
    "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
    "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
    "b844f692-162b-4dd3-82af-3b2c808a1099",
    "6598a749-870e-4902-a67b-d23dc2af7289"
  ],
  "currency": "USD"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursions/15aa7446-3110-4829-8d52-d4e1eed7886c/private-price-preview' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "adults": 2,
  "children": 1,
  "infants": 0,
  "selectedAttractionIds": [
    "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
    "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
    "e25086dc-87c9-463c-9ce1-b81293c27ed4"
  ],
  "selectedServiceIds": [
    "03f87255-1428-45e7-aa6a-a64f4cd8b813",
    "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
    "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
    "b844f692-162b-4dd3-82af-3b2c808a1099",
    "6598a749-870e-4902-a67b-d23dc2af7289"
  ],
  "currency": "USD"
}'
Request URL
https://touristtt.runasp.net/api/excursions/15aa7446-3110-4829-8d52-d4e1eed7886c/private-price-preview
Server response
Code	Details
200	
Response body
Download
{
  "excursionId": "15aa7446-3110-4829-8d52-d4e1eed7886c",
  "excursionType": "Private",
  "currency": "USD",
  "adults": 2,
  "children": 1,
  "infants": 0,
  "totalPassengers": 3,
  "vehicleType": "car1",
  "baseExcursionPrice": 25,
  "attractionsTotal": 125,
  "attractionItems": [
    {
      "attractionId": "e25086dc-87c9-463c-9ce1-b81293c27ed4",
      "title": "Fish Feeding Experience",
      "adultPricePerPerson": 10,
      "childPricePerPerson": 5,
      "infantPricePerPerson": 0,
      "itemTotal": 25
    },
    {
      "attractionId": "1c3a2735-963c-4465-84e1-c1dbbdbaf764",
      "title": "Snorkeling Equipment Rental",
      "adultPricePerPerson": 15,
      "childPricePerPerson": 8,
      "infantPricePerPerson": 0,
      "itemTotal": 38
    },
    {
      "attractionId": "d1b0224e-7f59-4874-9105-ce6766a3ffbc",
      "title": "Underwater Photography",
      "adultPricePerPerson": 25,
      "childPricePerPerson": 12,
      "infantPricePerPerson": 0,
      "itemTotal": 62
    }
  ],
  "servicesTotal": 21,
  "serviceItems": [
    {
      "serviceId": "31f2f1a5-b845-4bc0-b367-02e7ad6cb2db",
      "title": "Transportation Package",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 10,
      "itemTotal": 0
    },
    {
      "serviceId": "b844f692-162b-4dd3-82af-3b2c808a1099",
      "title": "Lunch & Refreshments",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 20,
      "itemTotal": 0
    },
    {
      "serviceId": "7f784e3c-cdd5-4877-a1bf-7e8c066e2edf",
      "title": "Private Guide Service",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 25,
      "itemTotal": 0
    },
    {
      "serviceId": "03f87255-1428-45e7-aa6a-a64f4cd8b813",
      "title": "Snorkeling Gear Package",
      "adultPricePerPerson": 10,
      "childPricePerPerson": 1,
      "infantPricePerPerson": 15,
      "itemTotal": 21
    },
    {
      "serviceId": "6598a749-870e-4902-a67b-d23dc2af7289",
      "title": "Life Jacket Rental",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 5,
      "itemTotal": 0
    }
  ],
  "subtotalBeforeDiscount": 171,
  "finalPrice": 171
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 15:36:47 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "excursionType": "string",
  "currency": "string",
  "adults": 0,
  "children": 0,
  "infants": 0,
  "totalPassengers": 0,
  "vehicleType": "string",
  "baseExcursionPrice": 0,
  "attractionsTotal": 0,
  "attractionItems": [
    {
      "attractionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 0,
      "itemTotal": 0
    }
  ],
  "servicesTotal": 0,
  "serviceItems": [
    {
      "serviceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "adultPricePerPerson": 0,
      "childPricePerPerson": 0,
      "infantPricePerPerson": 0,
      "itemTotal": 0
    }
  ],
  "subtotalBeforeDiscount": 0,
  "finalPrice": 0
}
No links
400	
Bad Request

Media type

text/plain
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

text/plain
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

POST
/api/excursions/{excursionId}/group-price-preview


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
292df7dc-f7b7-4056-bc9b-3b368717ad2d
Request body

application/json
{
  "adults": 2,
  "children": 1,
  "infants": 0,
  "currency": "USD"
}
