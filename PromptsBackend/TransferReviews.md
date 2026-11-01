TransferReviews


GET
/api/transfer-reviews


Parameters
Try it out
Name	Description
isApproved
boolean
(query)

--
currency
string
(query)
currency
language
string
(query)
language
pageNumber
integer($int32)
(query)
Default value : 1

1
pageSize
integer($int32)
(query)
Default value : 10

10
Responses
Code	Description	Links
200	
OK

No links

POST
/api/transfer-reviews


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "rate": 0,
  "comment": "string"
}
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-reviews/admin


Parameters
Try it out
Name	Description
isApproved
boolean
(query)

--
currency
string
(query)
currency
language
string
(query)
language
pageNumber
integer($int32)
(query)
Default value : 1

1
pageSize
integer($int32)
(query)
Default value : 10

10
Responses
Code	Description	Links
200	
OK

No links

GET
/api/transfer-reviews/{id}


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

No links

DELETE
/api/transfer-reviews/{id}


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

No links

GET
/api/transfer-reviews/admin/{id}


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

No links

PUT
/api/transfer-reviews/{id}/approve


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
  "isApproved": true
}