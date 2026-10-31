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
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjJjZDFlODAyLWZkMzctNGZmZC04NWE5LTJiZDcxY2NmMTUyMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM0ODA3MTQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.FYlv8zbgwdO7NBIv9vXx_YtyEcNrYaefgx4ricMkCNU'
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
        "id": 1,
        "title": "ANANAS-PINEAPPLES",
        "subTitle": "Pineapple: The Tropical Powerhouse",
        "price": 5,
        "priceFor": "PIECE",
        "subCategoryId": 1,
        "images": [
          {
            "id": 1,
            "imageUrl": "/uploads/products/5645c942c4764774831246a1c77e564e.webp",
            "displayOrder": 1,
            "productId": 1
          },
          {
            "id": 3,
            "imageUrl": "/uploads/products/0d89793586a04a968aaf770e4b866699.webp",
            "displayOrder": 2,
            "productId": 1
          },
          {
            "id": 4,
            "imageUrl": "/uploads/products/c1453327a342482ab1cceb77128d316f.webp",
            "displayOrder": 3,
            "productId": 1
          },
          {
            "id": 5,
            "imageUrl": "/uploads/products/3c846a337c6140b8a32f17fc0f305dc4.webp",
            "displayOrder": 4,
            "productId": 1
          }
        ],
        "keys": []
      },
      {
        "id": 2,
        "title": "black tea",
        "subTitle": "Black Tea: The Bold & Heart-Healthy Classic",
        "price": 5,
        "priceFor": "250g",
        "subCategoryId": 2,
        "images": [
          {
            "id": 2,
            "imageUrl": "/uploads/products/5f25eb3d7648477b91ffa5468548cd53.webp",
            "displayOrder": 1,
            "productId": 2
          },
          {
            "id": 6,
            "imageUrl": "/uploads/products/3fffdc7e5f52447c831351cb3f5f84c8.webp",
            "displayOrder": 2,
            "productId": 2
          },
          {
            "id": 7,
            "imageUrl": "/uploads/products/8831a4ea8d3b46928077fa0ca19ef725.webp",
            "displayOrder": 3,
            "productId": 2
          },
          {
            "id": 8,
            "imageUrl": "/uploads/products/dcb4fb33822547a5b57899ab63e298f6.webp",
            "displayOrder": 4,
            "productId": 2
          }
        ],
        "keys": []
      },
      {
        "id": 3,
        "title": "Deep Hydration Organic Shampoo",
        "subTitle": "Nourishes dry and damaged hair with natural argan oil",
        "price": 24.99,
        "priceFor": "Per Bottle (500 ml)",
        "subCategoryId": 1,
        "images": [],
        "keys": [
          {
            "id": 1,
            "name": "Hair Type",
            "displayOrder": 1,
            "values": [
              {
                "id": 1,
                "value": "Dry, Damaged & Frizzy Hair",
                "displayOrder": 1
              }
            ]
          },
          {
            "id": 2,
            "name": "Key Ingredients",
            "displayOrder": 2,
            "values": [
              {
                "id": 2,
                "value": "Argan Oil, Keratin, Vitamin E",
                "displayOrder": 1
              }
            ]
          },
          {
            "id": 3,
            "name": "Volume",
            "displayOrder": 3,
            "values": [
              {
                "id": 3,
                "value": "500 ml / 16.9 fl oz",
                "displayOrder": 1
              }
            ]
          }
        ]
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 3,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,31 Oct 2026 09:21:51 GMT 
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
    "en": "Deep Hydration Organic Shampoo",
    "ru": "Органический шампунь глубокого увлажнения",
    "de": "Bio-Shampoo für tiefenwirksame Feuchtigkeit",
    "fr": "Shampooing bio hydratation profonde"
  },
  "subtitle": {
    "en": "Nourishes dry and damaged hair with natural argan oil",
    "ru": "Питает сухие и поврежденные волосы натуральным аргановым маслом",
    "de": "Pflegt trockenes und strapaziertes Haar mit natürlichem Arganöl",
    "fr": "Nourrit les cheveux secs et abîmés à l'huile d'argan naturelle"
  },
  "price": 24.99,
  "priceFor": {
    "en": "Per Bottle (500 ml)",
    "ru": "За флакон (500 мл)",
    "de": "Pro Flasche (500 ml)",
    "fr": "Par flacon (500 ml)"
  },
  "subCategoryId": 1,
  "keys": [
    {
      "name": {
        "en": "Hair Type",
        "ru": "Тип волос",
        "de": "Haartyp",
        "fr": "Type de cheveux"
      },
      "displayOrder": 1,
      "values": [
        {
          "value": {
            "en": "Dry, Damaged & Frizzy Hair",
            "ru": "Сухие, поврежденные и пушащиеся волосы",
            "de": "Trockenes, strapaziertes & krauses Haar",
            "fr": "Cheveux secs, abîmés et frisés"
          },
          "displayOrder": 1
        }
      ]
    },
    {
      "name": {
        "en": "Key Ingredients",
        "ru": "Основные ингредиенты",
        "de": "Hauptinhaltsstoffe",
        "fr": "Ingrédients clés"
      },
      "displayOrder": 2,
      "values": [
        {
          "value": {
            "en": "Argan Oil, Keratin, Vitamin E",
            "ru": "Аргановое масло, кератин, витамин Е",
            "de": "Arganöl, Keratin, Vitamin E",
            "fr": "Huile d'argan, kératine, vitamine E"
          },
          "displayOrder": 1
        }
      ]
    },
    {
      "name": {
        "en": "Volume",
        "ru": "Объем",
        "de": "Inhalt",
        "fr": "Volume"
      },
      "displayOrder": 3,
      "values": [
        {
          "value": {
            "en": "500 ml / 16.9 fl oz",
            "ru": "500 мл",
            "de": "500 ml",
            "fr": "500 ml"
          },
          "displayOrder": 1
        }
      ]
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/products' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjJjZDFlODAyLWZkMzctNGZmZC04NWE5LTJiZDcxY2NmMTUyMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM0ODA3MTQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.FYlv8zbgwdO7NBIv9vXx_YtyEcNrYaefgx4ricMkCNU' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": {
    "en": "Deep Hydration Organic Shampoo",
    "ru": "Органический шампунь глубокого увлажнения",
    "de": "Bio-Shampoo für tiefenwirksame Feuchtigkeit",
    "fr": "Shampooing bio hydratation profonde"
  },
  "subtitle": {
    "en": "Nourishes dry and damaged hair with natural argan oil",
    "ru": "Питает сухие и поврежденные волосы натуральным аргановым маслом",
    "de": "Pflegt trockenes und strapaziertes Haar mit natürlichem Arganöl",
    "fr": "Nourrit les cheveux secs et abîmés à l'\''huile d'\''argan naturelle"
  },
  "price": 24.99,
  "priceFor": {
    "en": "Per Bottle (500 ml)",
    "ru": "За флакон (500 мл)",
    "de": "Pro Flasche (500 ml)",
    "fr": "Par flacon (500 ml)"
  },
  "subCategoryId": 1,
  "keys": [
    {
      "name": {
        "en": "Hair Type",
        "ru": "Тип волос",
        "de": "Haartyp",
        "fr": "Type de cheveux"
      },
      "displayOrder": 1,
      "values": [
        {
          "value": {
            "en": "Dry, Damaged & Frizzy Hair",
            "ru": "Сухие, поврежденные и пушащиеся волосы",
            "de": "Trockenes, strapaziertes & krauses Haar",
            "fr": "Cheveux secs, abîmés et frisés"
          },
          "displayOrder": 1
        }
      ]
    },
    {
      "name": {
        "en": "Key Ingredients",
        "ru": "Основные ингредиенты",
        "de": "Hauptinhaltsstoffe",
        "fr": "Ingrédients clés"
      },
      "displayOrder": 2,
      "values": [
        {
          "value": {
            "en": "Argan Oil, Keratin, Vitamin E",
            "ru": "Аргановое масло, кератин, витамин Е",
            "de": "Arganöl, Keratin, Vitamin E",
            "fr": "Huile d'\''argan, kératine, vitamine E"
          },
          "displayOrder": 1
        }
      ]
    },
    {
      "name": {
        "en": "Volume",
        "ru": "Объем",
        "de": "Inhalt",
        "fr": "Volume"
      },
      "displayOrder": 3,
      "values": [
        {
          "value": {
            "en": "500 ml / 16.9 fl oz",
            "ru": "500 мл",
            "de": "500 ml",
            "fr": "500 ml"
          },
          "displayOrder": 1
        }
      ]
    }
  ]
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
    "id": 3,
    "title": "Deep Hydration Organic Shampoo",
    "subTitle": "Nourishes dry and damaged hair with natural argan oil",
    "price": 24.99,
    "priceFor": "Per Bottle (500 ml)",
    "subCategoryId": 1,
    "images": [],
    "keys": [
      {
        "id": 1,
        "name": "Hair Type",
        "displayOrder": 1,
        "values": [
          {
            "id": 1,
            "value": "Dry, Damaged & Frizzy Hair",
            "displayOrder": 1
          }
        ]
      },
      {
        "id": 2,
        "name": "Key Ingredients",
        "displayOrder": 2,
        "values": [
          {
            "id": 2,
            "value": "Argan Oil, Keratin, Vitamin E",
            "displayOrder": 1
          }
        ]
      },
      {
        "id": 3,
        "name": "Volume",
        "displayOrder": 3,
        "values": [
          {
            "id": 3,
            "value": "500 ml / 16.9 fl oz",
            "displayOrder": 1
          }
        ]
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,31 Oct 2026 09:21:32 GMT 
 location: https://touristtt.runasp.net/api/products/3 
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
3
language
string
(query)
language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/products/3' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6IjJjZDFlODAyLWZkMzctNGZmZC04NWE5LTJiZDcxY2NmMTUyMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTM0ODA3MTQsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.FYlv8zbgwdO7NBIv9vXx_YtyEcNrYaefgx4ricMkCNU'
Request URL
https://touristtt.runasp.net/api/products/3
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
    "id": 3,
    "title": "Deep Hydration Organic Shampoo",
    "subTitle": "Nourishes dry and damaged hair with natural argan oil",
    "price": 24.99,
    "priceFor": "Per Bottle (500 ml)",
    "subCategoryId": 1,
    "images": [],
    "keys": [
      {
        "id": 1,
        "name": "Hair Type",
        "displayOrder": 1,
        "values": [
          {
            "id": 1,
            "value": "Dry, Damaged & Frizzy Hair",
            "displayOrder": 1
          }
        ]
      },
      {
        "id": 2,
        "name": "Key Ingredients",
        "displayOrder": 2,
        "values": [
          {
            "id": 2,
            "value": "Argan Oil, Keratin, Vitamin E",
            "displayOrder": 1
          }
        ]
      },
      {
        "id": 3,
        "name": "Volume",
        "displayOrder": 3,
        "values": [
          {
            "id": 3,
            "value": "500 ml / 16.9 fl oz",
            "displayOrder": 1
          }
        ]
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,31 Oct 2026 09:21:39 GMT 
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
  "subCategoryId": 0,
  "keys": [
    {
      "id": 0,
      "name": {
        "en": "string",
        "ru": "string",
        "de": "string",
        "fr": "string"
      },
      "displayOrder": 0,
      "values": [
        {
          "id": 0,
          "value": {
            "en": "string",
            "ru": "string",
            "de": "string",
            "fr": "string"
          },
          "displayOrder": 0
        }
      ]
    }
  ]
}
Responses
Code	Description	Links
200	
OK

No links

DELETE
/api/products/{id}