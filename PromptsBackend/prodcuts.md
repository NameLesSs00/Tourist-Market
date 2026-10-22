create a plan to add the prodcuts to our admin pages note that the subcatfoies is the SubCategoriesProdcuts could you review it and create a plan for it ?
Products


GET
/api/products


Parameters
Cancel
Name	Description
search
string
(query)
search
subCategoryId
integer($int32)
(query)
subCategoryId
minPrice
number($double)
(query)
minPrice
maxPrice
number($double)
(query)
maxPrice
sortBy
string
(query)
sortBy
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
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/products?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ'
Request URL
https://touristtt.runasp.net/api/products?pageNumber=1&pageSize=10
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
        "id": 2,
        "title": "Premium Red Sea Souvenir Gift Box",
        "subTitle": "A curated collection of authentic local Egyptian crafts and sweets",
        "price": 35,
        "priceFor": "per box",
        "subCategoryId": 2,
        "images": [
          {
            "id": 6,
            "imageUrl": "/uploads/products/1ad6564b1bce4e9c8be44b9395b7a6ef.webp",
            "displayOrder": 1,
            "productId": 2
          },
          {
            "id": 5,
            "imageUrl": "/uploads/products/ab254a1d03834212acb2c3c83589984c.webp",
            "displayOrder": 2,
            "productId": 2
          }
        ]
      },
      {
        "id": 1,
        "title": "string",
        "subTitle": "string",
        "price": 0,
        "priceFor": "string",
        "subCategoryId": 2,
        "images": [
          {
            "id": 1,
            "imageUrl": "/uploads/products/2325f5e6bfe84209ac75844e59b35a07.webp",
            "displayOrder": 0,
            "productId": 1
          },
          {
            "id": 2,
            "imageUrl": "/uploads/products/8ed32fdbf896450ca8fc50332a22877b.webp",
            "displayOrder": 0,
            "productId": 1
          }
        ]
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
 date: Wed,21 Oct 2026 18:34:01 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/products


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": {
    "en": "Premium Red Sea Souvenir Gift Box",
    "ru": "Подарочная коробка с сувенирами Красного моря",
    "de": "Premium Rotmeer-Souvenir-Geschenkbox",
    "fr": "Coffret cadeau souvenir de la mer Rouge"
  },
  "subtitle": {
    "en": "A curated collection of authentic local Egyptian crafts and sweets",
    "ru": "Коллекция аутентичных местных египетских ремесел и сладостей",
    "de": "Eine handverlesene Kollektion authentischer lokaler ägyptischer Handwerkskunst und Süßigkeiten",
    "fr": "Une collection d'artisanat et de douceurs égyptiennes locales authentiques"
  },
  "price": 35,
  "priceFor": {
    "en": "per box",
    "ru": "за коробку",
    "de": "pro Box",
    "fr": "par boîte"
  },
  "subCategoryId": 2
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/products' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "Premium Red Sea Souvenir Gift Box",
    "ru": "Подарочная коробка с сувенирами Красного моря",
    "de": "Premium Rotmeer-Souvenir-Geschenkbox",
    "fr": "Coffret cadeau souvenir de la mer Rouge"
  },
  "subtitle": {
    "en": "A curated collection of authentic local Egyptian crafts and sweets",
    "ru": "Коллекция аутентичных местных египетских ремесел и сладостей",
    "de": "Eine handverlesene Kollektion authentischer lokaler ägyptischer Handwerkskunst und Süßigkeiten",
    "fr": "Une collection d'\''artisanat et de douceurs égyptiennes locales authentiques"
  },
  "price": 35,
  "priceFor": {
    "en": "per box",
    "ru": "за коробку",
    "de": "pro Box",
    "fr": "par boîte"
  },
  "subCategoryId": 2
}'
Request URL
https://touristtt.runasp.net/api/products
Server response
Code	Details
201
Undocumented
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Product created successfully.",
  "data": {
    "id": 2,
    "title": "Premium Red Sea Souvenir Gift Box",
    "subTitle": "A curated collection of authentic local Egyptian crafts and sweets",
    "price": 35,
    "priceFor": "per box",
    "subCategoryId": 2,
    "images": []
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:31:52 GMT 
 location: https://touristtt.runasp.net/api/products/2 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

GET
/api/products/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
2
language
string
(query)
language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/products/2' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ'
Request URL
https://touristtt.runasp.net/api/products/2
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
    "title": "Premium Red Sea Souvenir Gift Box",
    "subTitle": "A curated collection of authentic local Egyptian crafts and sweets",
    "price": 35,
    "priceFor": "per box",
    "subCategoryId": 2,
    "images": [
      {
        "id": 6,
        "imageUrl": "/uploads/products/1ad6564b1bce4e9c8be44b9395b7a6ef.webp",
        "displayOrder": 1,
        "productId": 2
      },
      {
        "id": 5,
        "imageUrl": "/uploads/products/ab254a1d03834212acb2c3c83589984c.webp",
        "displayOrder": 2,
        "productId": 2
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:33:51 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/products/{id}


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
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "subtitle": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "price": 0,
  "priceFor": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "subCategoryId": 0
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/products/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Responses
Code	Description	Links
200	
OK

No links

GET
/api/products/{productId}/images


Parameters
Cancel
Name	Description
productId *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/products/2/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ'
Request URL
https://touristtt.runasp.net/api/products/2/images
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
      "id": 6,
      "imageUrl": "/uploads/products/1ad6564b1bce4e9c8be44b9395b7a6ef.webp",
      "displayOrder": 1,
      "productId": 2
    },
    {
      "id": 5,
      "imageUrl": "/uploads/products/ab254a1d03834212acb2c3c83589984c.webp",
      "displayOrder": 2,
      "productId": 2
    }
  ],
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:33:44 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

POST
/api/products/{productId}/images


Parameters
Cancel
Reset
Name	Description
productId *
integer($int32)
(path)
2
Request body

multipart/form-data
files
array<string>
Frame 545.png-
adminLogin.png-
Polygon 1.png-
Polygon 2.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/products/2/images' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ' \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@Frame 545.png;type=image/png' \
  -F 'files=@adminLogin.png;type=image/png' \
  -F 'files=@Polygon 1.png;type=image/png' \
  -F 'files=@Polygon 2.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/products/2/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "4 image(s) uploaded successfully.",
  "data": [
    {
      "id": 3,
      "imageUrl": "/uploads/products/879497095e8849b698571c7ad22c52cb.webp",
      "displayOrder": 1,
      "productId": 2
    },
    {
      "id": 4,
      "imageUrl": "/uploads/products/da609e8adab548bb9fcfb351f2e3235e.webp",
      "displayOrder": 2,
      "productId": 2
    },
    {
      "id": 5,
      "imageUrl": "/uploads/products/ab254a1d03834212acb2c3c83589984c.webp",
      "displayOrder": 3,
      "productId": 2
    },
    {
      "id": 6,
      "imageUrl": "/uploads/products/1ad6564b1bce4e9c8be44b9395b7a6ef.webp",
      "displayOrder": 4,
      "productId": 2
    }
  ],
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:32:28 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

PUT
/api/products/{productId}/images/reorder


Parameters
Cancel
Reset
Name	Description
productId *
integer($int32)
(path)
2
Request body

application/json
{
  "images": [
    {
      "imageId": 6,
      "displayOrder": 1
    },
    {
      "imageId": 5,
      "displayOrder": 2
    },
    {
      "imageId": 4,
      "displayOrder": 3
    },
    {
      "imageId": 3,
      "displayOrder": 4
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/products/2/images/reorder' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ' \
  -H 'Content-Type: application/json' \
  -d '{
  "images": [
    {
      "imageId": 6,
      "displayOrder": 1
    },
    {
      "imageId": 5,
      "displayOrder": 2
    },
    {
      "imageId": 4,
      "displayOrder": 3
    },
    {
      "imageId": 3,
      "displayOrder": 4
    }
  ]
}'
Request URL
https://touristtt.runasp.net/api/products/2/images/reorder
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Images reordered successfully.",
  "data": [
    {
      "id": 6,
      "imageUrl": "/uploads/products/1ad6564b1bce4e9c8be44b9395b7a6ef.webp",
      "displayOrder": 1,
      "productId": 2
    },
    {
      "id": 5,
      "imageUrl": "/uploads/products/ab254a1d03834212acb2c3c83589984c.webp",
      "displayOrder": 2,
      "productId": 2
    },
    {
      "id": 4,
      "imageUrl": "/uploads/products/da609e8adab548bb9fcfb351f2e3235e.webp",
      "displayOrder": 3,
      "productId": 2
    },
    {
      "id": 3,
      "imageUrl": "/uploads/products/879497095e8849b698571c7ad22c52cb.webp",
      "displayOrder": 4,
      "productId": 2
    }
  ],
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:33:14 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/products/{productId}/images/{imageId}


Parameters
Cancel
Name	Description
productId *
integer($int32)
(path)
2
imageId *
integer($int32)
(path)
4
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/products/2/images/4' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjUyNjZhNGNmLWU1NDQtNDFjMy1iYzRhLTFhNDU5YTAxOWVkZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI2MTEwODcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.kdm4RLL44Z4qWgP3Qw_FS787SM4XyjdkYJhu0s3XJOQ'
Request URL
https://touristtt.runasp.net/api/products/2/images/4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Product image deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Wed,21 Oct 2026 18:33:32 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK