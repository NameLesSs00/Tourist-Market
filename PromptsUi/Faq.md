now for the next section we should have the faq the faq section is the last section that should be displayed in the homepage okay ?
and here is how it should work the question will be fetched from the backend 
here is the schema we have 
GET
/api/faqs


Parameters
Cancel
Name	Description
language
string
(query)
language
search
string
(query)
search
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
  'https://touristtt.runasp.net/api/faqs?pageNumber=1&pageSize=10' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImY4MmI2YmM3LTYzY2UtNGQwZC01YTczLTA4ZGYyZDFmOTY4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImUwYzliMDc5LTNmMzItNGJlZC1hNTAzLTY3MjcyMmY0ZDFmZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI0MDkzNDYsImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.uQqz4QeDq1qr9BFMOuN-ali7h4X61o84VW51taGvORU'
Request URL
https://touristtt.runasp.net/api/faqs?pageNumber=1&pageSize=10
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
        "id": "6ee5b905-9bdc-4fd1-ab25-1b36d8881a0d",
        "question": "test",
        "answer": "string1",
        "displayOrder": 1
      },
      {
        "id": "4bdb52ae-e1ba-4344-af6c-1c058ea9de02",
        "question": "test2",
        "answer": "string2",
        "displayOrder": 1
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
we just will use the schema we will not show the id we will just take the question adn the answer and the display order other than that is we will not do anything for now we will have 5 dumm question to view the component until we like the backend 
here is all of hte data you gonna use to make the design to life
first is the design images
C:\Users\VIP\Desktop\work\tourist-market\PromptsUi\FAQMobile.png
C:\Users\VIP\Desktop\work\tourist-market\PromptsUi\FAQDesktop.png
as you can see it's half of a crycle and drop shadow here is how to make it 
background: #0E4A68CC;
box-shadow: 10px 10px 20px 0px #BE9393CC;

and for the text
Frequently Asked
font-family: Poppins;
font-weight: 600;
font-style: SemiBold;
font-size: 40px;
leading-trim: NONE;
line-height: 42px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;
#003D5B

questoin
font-family: Poppins;
font-weight: 600;
font-style: SemiBold;
font-size: 40px;
leading-trim: NONE;
line-height: 42px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;

#D48C28

Find answers to everything you need
font-family: Poppins;
font-weight: 400;
font-style: Regular;
font-size: 21px;
leading-trim: NONE;
line-height: 35px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;

#646464

the svgs used 
C:\Users\VIP\Desktop\work\tourist-market\public\homepage\Faq\mark.svg
C:\Users\VIP\Desktop\work\tourist-market\public\homepage\Faq\Questions.svg

Still need A Help ?
font-family: Poppins;
font-weight: 600;
font-style: SemiBold;
font-size: 28px;
leading-trim: NONE;
line-height: 25px;
letter-spacing: 0%;
text-align: center;
vertical-align: middle;


#0E4A68

button bg #0E4A68
border: 0.4px solid #000000

text for it 
font-family: Poppins;
font-weight: 600;
font-style: SemiBold;
font-size: 18px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;

#FFFFFF

by defalut the statue of the first question should be open and note that when you click on the + it will be shaped or routated 90deg so it turns to X
and when we click on another questoin we will show the answer for it 


font-family: Poppins;
font-weight: 600;
font-style: SemiBold;
font-size: 20px;
leading-trim: NONE;
line-height: 40px;
letter-spacing: 0%;
vertical-align: middle;

What services do you offer ?
#0E4A68



We offer a wide range of services designed to make your experience on the Red Sea seamless and memorable. From hotel bookings and tourist activities to private and group excursions, we help you discover the best experiences the region has to offer. We also provide car rental services for convenient travel and real estate opportunities for those looking to invest or find their ideal property by the sea.

font-family: Poppins;
font-weight: 400;
font-style: Regular;
font-size: 18px;
leading-trim: NONE;
line-height: 28px;
letter-spacing: 0%;
vertical-align: middle;


#000000

this is all of the data we have now could you create this section for both the mobile and desktop based on the desgin image we have please create a plan

bg of this section is #FFF2DF