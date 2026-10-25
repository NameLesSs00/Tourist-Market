those are things we should add to the single excursion images and faq they need a new section note that they still will need to be added in the pirvate excursiotn could you create a  full plan so that we could add them to our project ? they are related to the excetions overall okay
review it and create a plan for it 
GET
/api/admin/excursions/{excursionId}/faqs


Parameters
Cancel
Name	Description
excursionId *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
lang
string
(query)
de
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs?lang=de' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs?lang=de
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "d8368a81-fe44-4dd2-917c-9a7694e6fb0d",
    "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
    "question": "string33",
    "answer": "string",
    "displayOrder": 1
  },
  {
    "id": "8cfb8e27-5180-445e-8df2-de83845e46e3",
    "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
    "question": "string3",
    "answer": "string",
    "displayOrder": 1
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:46:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admin/excursions/{excursionId}/faqs


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
Request body

application/json
{
  "displayOrder": 1,
  "isActive": true,
  "question": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "answer": {
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
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "displayOrder": 1,
  "isActive": true,
  "question": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "answer": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs
Server response
Code	Details
200	
Response body
Download
{
  "id": "d8368a81-fe44-4dd2-917c-9a7694e6fb0d",
  "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
  "question": "string11",
  "answer": "string",
  "displayOrder": 1
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:46:09 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/admin/excursions/{excursionId}/faqs/{faqId}


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
faqId *
string($uuid)
(path)
d8368a81-fe44-4dd2-917c-9a7694e6fb0d
Request body

application/json
{
  "displayOrder": 2,
  "isActive": true,
  "question": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "answer": {
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

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs/d8368a81-fe44-4dd2-917c-9a7694e6fb0d' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: application/json' \
  -d '{
  "displayOrder": 2,
  "isActive": true,
  "question": {
    "en": "string11",
    "ru": "string22",
    "de": "string33",
    "fr": "string44"
  },
  "answer": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs/d8368a81-fe44-4dd2-917c-9a7694e6fb0d
Server response
Code	Details
200	
Response body
Download
{
  "id": "d8368a81-fe44-4dd2-917c-9a7694e6fb0d",
  "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
  "question": "string11",
  "answer": "string",
  "displayOrder": 2
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:46:46 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admin/excursions/{excursionId}/faqs/{faqId}


Parameters
Cancel
Name	Description
excursionId *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
faqId *
string($uuid)
(path)
d8368a81-fe44-4dd2-917c-9a7694e6fb0d
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs/d8368a81-fe44-4dd2-917c-9a7694e6fb0d' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/faqs/d8368a81-fe44-4dd2-917c-9a7694e6fb0d
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Excursion FAQ soft-deleted successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:47:16 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admin/excursions/{id}/images


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
isPrimary
boolean
(query)

true
Request body

multipart/form-data
file
string($binary)
adminLogin.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images?isPrimary=true' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@adminLogin.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images?isPrimary=true
Server response
Code	Details
200	
Response body
Download
{
  "id": "261055cf-c67e-486d-8eb6-c60914bd23f1",
  "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
  "imageUrl": "/uploads/executions/3ad6f994027d440992d9079b0067c9e7.webp",
  "isPrimary": true
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:50:42 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/admin/excursions/{id}/images


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "605b9116-537e-4b0e-b794-a673b408cb80",
    "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
    "imageUrl": "/uploads/executions/0dd8ccae13854849a15c90aaf5253fc6.webp",
    "isPrimary": false
  },
  {
    "id": "261055cf-c67e-486d-8eb6-c60914bd23f1",
    "excursionId": "89938ccb-cf05-420c-9538-079f0e298a26",
    "imageUrl": "/uploads/executions/3ad6f994027d440992d9079b0067c9e7.webp",
    "isPrimary": true
  }
]
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:50:51 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admin/excursions/{id}/images/{imageId}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
89938ccb-cf05-420c-9538-079f0e298a26
imageId *
string($uuid)
(path)
605b9116-537e-4b0e-b794-a673b408cb80
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images/605b9116-537e-4b0e-b794-a673b408cb80' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/admin/excursions/89938ccb-cf05-420c-9538-079f0e298a26/images/605b9116-537e-4b0e-b794-a673b408cb80
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image deleted successfully."
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,24 Oct 2026 10:51:09 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

GET
/api/admin/excursions/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
afb3308b-2061-4a57-84b9-f77840ddf734
lang
string
(query)
lang
currency
string
(query)
USD
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admin/excursions/afb3308b-2061-4a57-84b9-f77840ddf734?currency=USD' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4ZjJhNWRmLWQzNjYtNGY3Ni1hYWU4LWY2NmE0MjdmODk5ZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI4NzgzMTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.paI259ZxzERiUhM8lTPThvC8_dsWY3Jlj_cUjJtDqk0'
Request URL
https://touristtt.runasp.net/api/admin/excursions/afb3308b-2061-4a57-84b9-f77840ddf734?currency=USD
Server response
Code	Details
200	
Response body
Download
{
  "fullProgram": "",
  "videoUrl": "https://www.youtube.com/watch?v=example",
  "imageList": [
    {
      "id": "5bbac46a-2d20-445f-bb79-fff507e488b1",
      "excursionId": "afb3308b-2061-4a57-84b9-f77840ddf734",
      "imageUrl": "/uploads/executions/5246a8b21fb44caaa1dd18e8dcd690c3.webp",
      "isPrimary": true
    },
    {
      "id": "f19eee8d-b75c-4364-8b27-5bbf8307e14d",
      "excursionId": "afb3308b-2061-4a57-84b9-f77840ddf734",
      "imageUrl": "/uploads/executions/a897983d50714e0eb37a6573bd961694.webp",
      "isPrimary": false
    }
  ],
  "faqs": [
    {
      "id": "155d839d-38ca-47b3-a17b-bc3fa650a83e",
      "excursionId": "afb3308b-2061-4a57-84b9-f77840ddf734",
      "question": "string11",
      "answer": "string",
      "displayOrder": 1
    }
  ],
  "attractions": [],
  "services": [],
  "id": "afb3308b-2061-4a57-84b9-f77840ddf734",
  "slug": "hurghada-red-sea-snorkeling-trip",
  "title": "Red Sea Snorkeling & Island Boat Tour",
  "subtitle": "Discover vibrant coral reefs and marine life in Hurghada",
  "shortDescription": "Embark on an unforgettable boat trip in the Red Sea. Enjoy snorkeling at top coral reef spots, relaxing on pristine beaches, and a delicious lunch on board.",
  "excursionType": "Boat Tour & Water Sports",
  "durationHours": 8,
  "stars": "4.8",
  "maxAttractions": 3,
  "primaryImageUrl": "/uploads/executions/5246a8b21fb44caaa1dd18e8dcd690c3.webp",
  "categorySlug": null,
  "categoryTitle": "string123",
  "isFeatured": true,
  "rating": 0,
  "prices": [
    {
      "currencyCode": "USD",
      "adultPrice": 45,
      "childPrice": 25,
      "infantPrice": 0
    }
  ]
}