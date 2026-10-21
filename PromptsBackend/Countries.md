here are the enpoidnts for the countries  note that the get all countires anyone could call it so pleaes make sure it works right and everything is right create a plan for it please
AdminCountries


POST
/api/admin/countries


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "code": "123",
  "phoneCode": "string",
  "name": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/admin/countries' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "123",
  "phoneCode": "string",
  "name": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}'
Request URL
https://touristtt.runasp.net/api/admin/countries
Server response
Code	Details
200	
Response body
Download
{
  "id": "bcc63588-5853-4570-95e3-a96a913ee271",
  "code": "123",
  "phoneCode": "string",
  "name": "string"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 13:06:15 GMT 
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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code": "string",
  "phoneCode": "string",
  "name": "string"
}
No links

PUT
/api/admin/countries/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
bcc63588-5853-4570-95e3-a96a913ee271
Request body

application/json
{
  "code": "321",
  "phoneCode": "string",
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  }
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/admin/countries/bcc63588-5853-4570-95e3-a96a913ee271' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc' \
  -H 'Content-Type: application/json' \
  -d '{
  "code": "321",
  "phoneCode": "string",
  "name": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  }
}'
Request URL
https://touristtt.runasp.net/api/admin/countries/bcc63588-5853-4570-95e3-a96a913ee271
Server response
Code	Details
200	
Response body
Download
{
  "id": "bcc63588-5853-4570-95e3-a96a913ee271",
  "code": "321",
  "phoneCode": "string",
  "name": "string1"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 13:06:30 GMT 
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
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "code": "string",
  "phoneCode": "string",
  "name": "string"
}
No links

DELETE
/api/admin/countries/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
d922b8de-6459-479a-93c7-c868338bf060
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/admin/countries/d922b8de-6459-479a-93c7-c868338bf060' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc'
Request URL
https://touristtt.runasp.net/api/admin/countries/d922b8de-6459-479a-93c7-c868338bf060
Server response
Code	Details
204
Undocumented
Response headers
 access-control-allow-origin: * 
 date: Tue,20 Oct 2026 13:06:11 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

GET
/api/countries


Parameters
Cancel
Name	Description
lang
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/countries?lang=en' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc'
Request URL
https://touristtt.runasp.net/api/countries?lang=en
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "bcc63588-5853-4570-95e3-a96a913ee271",
    "code": "321",
    "phoneCode": "string",
    "name": "string1"
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 13:06:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses