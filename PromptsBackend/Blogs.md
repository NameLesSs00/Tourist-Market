here is the full docs for the blogs could you create a plan to add them ?
we need a comprehnsive plan so that we could create blogs just like the backend wanted 
and for the key and value those are like list of power points so that we could add them 
could you now create a plan for those to be working right ?
Blogs


GET
/api/blogs


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
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/blogs?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE'
Request URL
https://touristtt.runasp.net/api/blogs?pageNumber=1&pageSize=10
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
        "id": "9f591ed7-96f5-4ea4-9372-9696854d5abd",
        "title": "string",
        "description": "string",
        "imageUrl": null,
        "sections": null
      },
      {
        "id": "9decd588-2d64-4365-a038-69629e9ddfaf",
        "title": "string1",
        "description": "string1",
        "imageUrl": "/uploads/blogs/9e7f052b55514e3f9d079d37150dc29b.webp",
        "sections": [
          {
            "id": "961ead0a-0419-4d26-a88e-154423d981ee",
            "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
            "title": "string",
            "description": "string",
            "shortDescription": "string",
            "keys": [
              "string"
            ],
            "values": [
              "string"
            ]
          },
          {
            "id": "7bb3afec-e67b-4d11-a301-e893869f835f",
            "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
            "title": "string",
            "description": "string",
            "shortDescription": "string",
            "keys": [
              "string"
            ],
            "values": [
              "string"
            ]
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
 date: Tue,20 Oct 2026 12:10:44 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "imageUrl": "string",
        "sections": [
          {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "title": "string",
            "description": "string",
            "shortDescription": "string",
            "keys": [
              "string"
            ],
            "values": [
              "string"
            ]
          }
        ]
      }
    ],
    "pageNumber": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0,
    "hasPreviousPage": true,
    "hasNextPage": true
  },
  "errors": [
    "string"
  ]
}
No links

POST
/api/blogs


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "description": {
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

curl -X 'POST' \
  'https://touristtt.runasp.net/api/blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  },
  "description": {
    "en": "string1",
    "ru": "string2",
    "de": "string3",
    "fr": "string4"
  }
}'
Request URL
https://touristtt.runasp.net/api/blogs
Server response
Code	Details
201	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Blog created successfully.",
  "data": {
    "id": "9decd588-2d64-4365-a038-69629e9ddfaf",
    "title": "string1",
    "description": "string1",
    "imageUrl": null,
    "sections": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:00:52 GMT 
 location: https://touristtt.runasp.net/api/blogs/9decd588-2d64-4365-a038-69629e9ddfaf 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
201	
Created

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "sections": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/blogs/{id}


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "sections": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/blogs/{id}


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
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "description": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  }
}
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "sections": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/blogs/{id}


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": true,
  "errors": [
    "string"
  ]
}
No links

GET
/api/blogs/{id}/sections


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "description": "string",
      "shortDescription": "string",
      "keys": [
        "string"
      ],
      "values": [
        "string"
      ]
    }
  ],
  "errors": [
    "string"
  ]
}
No links

POST
/api/blogs/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
string($uuid)
(path)
9decd588-2d64-4365-a038-69629e9ddfaf
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
  'https://touristtt.runasp.net/api/blogs/9decd588-2d64-4365-a038-69629e9ddfaf/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@adminLogin.png;type=image/png'
Request URL
https://touristtt.runasp.net/api/blogs/9decd588-2d64-4365-a038-69629e9ddfaf/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Blog image uploaded successfully.",
  "data": {
    "id": "9decd588-2d64-4365-a038-69629e9ddfaf",
    "title": "string1",
    "description": "string1",
    "imageUrl": "/uploads/blogs/9e7f052b55514e3f9d079d37150dc29b.webp",
    "sections": null
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:01:54 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "sections": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/blogs/{id}/image


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": true,
  "errors": [
    "string"
  ]
}
BlogSections


GET
/api/blog-sections


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
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/blog-sections?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE'
Request URL
https://touristtt.runasp.net/api/blog-sections?pageNumber=1&pageSize=10
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
        "id": "7bb3afec-e67b-4d11-a301-e893869f835f",
        "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
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
 date: Tue,20 Oct 2026 12:06:54 GMT 
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "shortDescription": "string",
        "keys": [
          "string"
        ],
        "values": [
          "string"
        ]
      }
    ],
    "pageNumber": 0,
    "pageSize": 0,
    "totalCount": 0,
    "totalPages": 0,
    "hasPreviousPage": true,
    "hasNextPage": true
  },
  "errors": [
    "string"
  ]
}
No links

POST
/api/blog-sections


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "description": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "shortDescription": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "keys": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  },
  "values": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/blog-sections' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjhiY2FmZWQ0LWU5ZmItNDJiZC05OWMyLTY0OTJhNjZlZTMwMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0OTkzNDcsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.JM9G88djpLHHHJtp1r1ONg0yvjZpp1iXcM9PAagS_GE' \
  -H 'Content-Type: application/json' \
  -d '{
  "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "description": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "shortDescription": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "keys": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  },
  "values": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  }
}'
Request URL
https://touristtt.runasp.net/api/blog-sections
Server response
Code	Details
201	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "BlogSection created successfully.",
  "data": {
    "id": "961ead0a-0419-4d26-a88e-154423d981ee",
    "blogId": "9decd588-2d64-4365-a038-69629e9ddfaf",
    "title": "string",
    "description": "string",
    "shortDescription": "string",
    "keys": [
      "string"
    ],
    "values": [
      "string"
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,20 Oct 2026 12:10:35 GMT 
 location: https://touristtt.runasp.net/api/blog-sections/961ead0a-0419-4d26-a88e-154423d981ee 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
201	
Created

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "shortDescription": "string",
    "keys": [
      "string"
    ],
    "values": [
      "string"
    ]
  },
  "errors": [
    "string"
  ]
}
No links

GET
/api/blog-sections/{id}


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "shortDescription": "string",
    "keys": [
      "string"
    ],
    "values": [
      "string"
    ]
  },
  "errors": [
    "string"
  ]
}
No links

PUT
/api/blog-sections/{id}


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
  "title": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "description": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "shortDescription": {
    "en": "string",
    "ru": "string",
    "de": "string",
    "fr": "string"
  },
  "keys": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  },
  "values": {
    "en": [
      "string"
    ],
    "ru": [
      "string"
    ],
    "de": [
      "string"
    ],
    "fr": [
      "string"
    ]
  }
}
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
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "blogId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "shortDescription": "string",
    "keys": [
      "string"
    ],
    "values": [
      "string"
    ]
  },
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/blog-sections/{id}


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

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": true,
  "errors": [
    "string"
  ]
}