Admin
the roles are only those two SuperAdmin,Admin

okay now create a full plan to add the admins to our system could you do that ? create a plan for it first ?

GET
/api/admins


Parameters
Cancel
Name	Description
Search
string
(query)
Search
Role
string
(query)
Role
IsActive
boolean
(query)

--
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
SortDescending
boolean
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admins' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc'
Request URL
https://touristtt.runasp.net/api/admins
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
        "id": "f82b6bc7-63ce-4d0d-5a73-08df2d1f9685",
        "userName": "superadmin",
        "email": "superadmin@touristmarket.com",
        "firstName": "Super",
        "lastName": "Admin",
        "isActive": true,
        "roles": [
          "SuperAdmin"
        ],
        "createdAt": "2026-10-18T13:56:19.9603935"
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
 date: Tue,20 Oct 2026 12:45:25 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/admins


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "userName": "pola",
  "email": "pola5samy55@gmail.com",
  "password": "Pola@123",
  "firstName": "pola",
  "lastName": "samy",
  "roles": [
    "SuperAdmin"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/admins' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc' \
  -H 'Content-Type: application/json' \
  -d '{
  "userName": "pola",
  "email": "pola5samy55@gmail.com",
  "password": "Pola@123",
  "firstName": "pola",
  "lastName": "samy",
  "roles": [
    "SuperAdmin"
  ]
}'
Request URL
https://touristtt.runasp.net/api/admins
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Administrator created successfully.",
  "data": {
    "id": "19ab5f92-2302-4a68-f4ca-08df2ea83070",
    "userName": "pola",
    "email": "pola5samy55@gmail.com",
    "firstName": "pola",
    "lastName": "samy",
    "isActive": true,
    "emailConfirmed": true,
    "lockoutEnabled": true,
    "lockoutEnd": null,
    "roles": [
      "SuperAdmin"
    ],
    "createdAt": "2026-10-20T12:46:40.9977961Z",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:46:40 GMT 
 location: https://touristtt.runasp.net/api/admins/19ab5f92-2302-4a68-f4ca-08df2ea83070 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/admins/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
f82b6bc7-63ce-4d0d-5a73-08df2d1f9685
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/admins/f82b6bc7-63ce-4d0d-5a73-08df2d1f9685' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc'
Request URL
https://touristtt.runasp.net/api/admins/f82b6bc7-63ce-4d0d-5a73-08df2d1f9685
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
    "id": "f82b6bc7-63ce-4d0d-5a73-08df2d1f9685",
    "userName": "superadmin",
    "email": "superadmin@touristmarket.com",
    "firstName": "Super",
    "lastName": "Admin",
    "isActive": true,
    "emailConfirmed": true,
    "lockoutEnabled": true,
    "lockoutEnd": null,
    "roles": [
      "SuperAdmin"
    ],
    "createdAt": "2026-10-18T13:56:19.9603935",
    "updatedAt": null
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:45:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/admins/{id}


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
19ab5f92-2302-4a68-f4ca-08df2ea83070
Request body

application/json
{
  "userName": "pola",
  "email": "pola5samy55@gmail.com",
  "password": "Pola@123",
  "firstName": "pola",
  "isActive": true,
  "lastName": "samy",
  "roles": [
    "SuperAdmin"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/admins/19ab5f92-2302-4a68-f4ca-08df2ea83070' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUzODg0ZjExLWY0ZTktNDQzMy1iZGQ2LWIyOTBhNDBlZjRiYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI1MDM5MDgsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.p4dSl_BOpUYZ03cXHaCFK2hgIqKDX1eElmQxBpPolhc' \
  -H 'Content-Type: application/json' \
  -d '{
  "userName": "pola",
  "email": "pola5samy55@gmail.com",
  "password": "Pola@123",
  "firstName": "pola",
  "isActive": true,
  "lastName": "samy",
  "roles": [
    "SuperAdmin"
  ]
}'
Request URL
https://touristtt.runasp.net/api/admins/19ab5f92-2302-4a68-f4ca-08df2ea83070
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Administrator updated successfully.",
  "data": {
    "id": "19ab5f92-2302-4a68-f4ca-08df2ea83070",
    "userName": "pola",
    "email": "pola5samy55@gmail.com",
    "firstName": "pola",
    "lastName": "samy",
    "isActive": true,
    "emailConfirmed": true,
    "lockoutEnabled": true,
    "lockoutEnd": null,
    "roles": [
      "SuperAdmin"
    ],
    "createdAt": "2026-10-20T12:46:40.9977961",
    "updatedAt": "2026-10-20T12:47:54.3050971Z"
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:47:54 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/admins/{id}


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