now let's have fun with the backend a bit here is a plan on what we should be doing
here is the base url
https://touristtt.runasp.net/api
the goal now to create the login page for the admin it will be admin/login
and when you open it you will visit the admin/dashboard
here are the endpoints we gonna use 
Auth


POST
/api/auth/login


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
"userName": "superadmin",
"password": "SuperAdmin@123!"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/auth/login' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhhZWQ3YTQzLTI1YjQtNDQzNy1iNDhkLTE2NDIxM2FmODQ4YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0MjA3ODEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.0pUZhfLrzs_CSXghQYAqqRSTNlz7HVbaWwozbPBrNek' \
  -H 'Content-Type: application/json' \
  -d '{
"userName": "superadmin",
"password": "SuperAdmin@123!"
}'
Request URL
https://touristtt.runasp.net/api/auth/login
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6Ijg4NDU3NGUyLWU0OTEtNDhjZC1iMDZmLTk2Nzk4YTFlYzgzOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0MjEyMDIsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.VDM1uNQMF42MD6r8exYf71P06uJHISW3GYa_OuIYobc",
    "expiresAt": "2026-10-19T14:46:42.1054888Z",
    "user": {
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
    }
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,19 Oct 2026 13:46:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/auth/me


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/auth/me' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhhZWQ3YTQzLTI1YjQtNDQzNy1iNDhkLTE2NDIxM2FmODQ4YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0MjA3ODEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.0pUZhfLrzs_CSXghQYAqqRSTNlz7HVbaWwozbPBrNek'
Request URL
https://touristtt.runasp.net/api/auth/me
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
 date: Mon,19 Oct 2026 13:45:39 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/auth/change-password


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "currentPassword": "SuperAdmin@123!",
  "newPassword": "SuperAdmin@123",
  "confirmPassword": "SuperAdmin@123"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/auth/change-password' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhhZWQ3YTQzLTI1YjQtNDQzNy1iNDhkLTE2NDIxM2FmODQ4YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0MjA3ODEsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.0pUZhfLrzs_CSXghQYAqqRSTNlz7HVbaWwozbPBrNek' \
  -H 'Content-Type: application/json' \
  -d '{
  "currentPassword": "SuperAdmin@123!",
  "newPassword": "SuperAdmin@123",
  "confirmPassword": "SuperAdmin@123"
}'
Request URL
https://touristtt.runasp.net/api/auth/change-password
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Password changed successfully.",
  "data": null,
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,19 Oct 2026 13:46:57 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK
note that the expiresAt is not right it should take around 1 hour after it's created 
and for the admin login page it should look like that 
the following image 
C:\Users\VIP\Desktop\work\tourist-market\public\admin\login\adminLogin.png
on the left with the logo used and have a filter on it so that you can view some text will be place on it 
and on the right we will have the form for login the password should have to toggle for the eye and after we login we should be redirected to the admin/dashboard if we have a wokring token it should by defalut not let us visit the admin login page and visit the dashbaord instaed please create a plan so that we create the admin login page and an empty page for the dashbaord and also link the endpoints for the login and auth and change password the way I told you so so that we can change password and login right could you create a plan so that we follow the folder stucher i gave you and so that everything works right ?