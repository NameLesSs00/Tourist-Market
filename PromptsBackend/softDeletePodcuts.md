DELETE
/api/admin/products/{id}


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
/api/admin/products/deleted


Parameters
Try it out
Name	Description
search
string
(query)
search
subCategoryId
integer($int32)
(query)
subCategoryId
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
/api/admin/products/{id}/restore


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