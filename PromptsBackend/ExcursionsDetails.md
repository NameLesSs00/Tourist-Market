now for the excrution dealtis it should be place after we create a single excrution we should create them and be able to edit them i gave you a realy example of how they will be working could you create a full plan for them 
ExcursionsDetails


POST
/api/excursions-details/excursion/{excursionId}


Parameters
Cancel
Reset
Name	Description
excursionId *
string($uuid)
(path)
a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
lang
string
(query)
lang
Request body

application/json
{
  "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
  "highlights": {
    "en": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "includes": {
    "en": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "excludes": {
    "en": [
      "Round trip transfer from Safaga and Soma Bay with an extra charge of $10 per person (minimum 2 persons).",
      "Round trip transfer from Makadi Bay, Sahl Hasheesh, and El Gouna with an extra charge of $5 per person (minimum 2 persons).",
      "Entrance inside the Pyramids: Khufu Pyramid ($20), Khafre Pyramid ($6), Menkaure Pyramid ($6).",
      "Camel and horse riding at the Pyramids (optional).",
      "Entrance tickets to any other places not included in the program.",
      "Hot & cold beverages, tips, and personal expenses are not included."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "whatToBring": {
    "en": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "cancellationPolicy": {
    "en": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "literally": {
    "en": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ],
    "ru": [],
    "de": [],
    "fr": []
  }
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
  "highlights": {
    "en": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "includes": {
    "en": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "excludes": {
    "en": [
      "Round trip transfer from Safaga and Soma Bay with an extra charge of $10 per person (minimum 2 persons).",
      "Round trip transfer from Makadi Bay, Sahl Hasheesh, and El Gouna with an extra charge of $5 per person (minimum 2 persons).",
      "Entrance inside the Pyramids: Khufu Pyramid ($20), Khafre Pyramid ($6), Menkaure Pyramid ($6).",
      "Camel and horse riding at the Pyramids (optional).",
      "Entrance tickets to any other places not included in the program.",
      "Hot & cold beverages, tips, and personal expenses are not included."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "whatToBring": {
    "en": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "cancellationPolicy": {
    "en": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "literally": {
    "en": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ],
    "ru": [],
    "de": [],
    "fr": []
  }
}'
Request URL
https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
Server response
Code	Details
201	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Excursion details created successfully.",
  "data": {
    "id": "32bfcece-d48a-4f2f-a296-0454d42b579e",
    "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
    "languageCode": "en",
    "highlights": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "excludes": [],
    "includes": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "whatToBring": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "cancellationPolicy": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "literally": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:28:33 GMT 
 location: https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8 
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
    "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "languageCode": "string",
    "highlights": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "cancellationPolicy": [
      "string"
    ],
    "literally": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
409	
Conflict

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

GET
/api/excursions-details/excursion/{excursionId}


Parameters
Try it out
Name	Description
excursionId *
string($uuid)
(path)
a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
lang
string
(query)
lang
currency
string
(query)
Default value : USD

USD
Responses
Curl

curl -X 'GET' \
  'https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8?currency=USD' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8?currency=USD
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
    "id": "32bfcece-d48a-4f2f-a296-0454d42b579e",
    "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
    "languageCode": "en",
    "highlights": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "excludes": [],
    "includes": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "whatToBring": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "cancellationPolicy": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "literally": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ]
  },
  "errors": null
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:30:04 GMT 
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
    "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "languageCode": "string",
    "highlights": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "cancellationPolicy": [
      "string"
    ],
    "literally": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

PUT
/api/excursions-details/excursion/{excursionId}


Parameters
Try it out
Reset
Name	Description
excursionId *
string($uuid)
(path)
a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
lang
string
(query)
lang
Request body

application/json
Example Value
Schema
{
  "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
  "highlights": {
    "en": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "includes": {
    "en": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "excludes": {
    "en": [
      "Round trip transfer from Safaga and Soma Bay with an extra charge of $10 per person (minimum 2 persons).",
      "Round trip transfer from Makadi Bay, Sahl Hasheesh, and El Gouna with an extra charge of $5 per person (minimum 2 persons).",
      "Entrance inside the Pyramids: Khufu Pyramid ($20), Khafre Pyramid ($6), Menkaure Pyramid ($6).",
      "Camel and horse riding at the Pyramids (optional).",
      "Entrance tickets to any other places not included in the program.",
      "Hot & cold beverages, tips, and personal expenses are not included."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "whatToBring": {
    "en": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "cancellationPolicy": {
    "en": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "literally": {
    "en": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ],
    "ru": [],
    "de": [],
    "fr": []
  }
}
Responses
Curl

curl -X 'PUT' \
  'https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0' \
  -H 'Content-Type: application/json' \
  -d '{
  "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
  "highlights": {
    "en": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "includes": {
    "en": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "excludes": {
    "en": [
      "Round trip transfer from Safaga and Soma Bay with an extra charge of $10 per person (minimum 2 persons).",
      "Round trip transfer from Makadi Bay, Sahl Hasheesh, and El Gouna with an extra charge of $5 per person (minimum 2 persons).",
      "Entrance inside the Pyramids: Khufu Pyramid ($20), Khafre Pyramid ($6), Menkaure Pyramid ($6).",
      "Camel and horse riding at the Pyramids (optional).",
      "Entrance tickets to any other places not included in the program.",
      "Hot & cold beverages, tips, and personal expenses are not included."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "whatToBring": {
    "en": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "cancellationPolicy": {
    "en": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "ru": [],
    "de": [],
    "fr": []
  },
  "literally": {
    "en": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ],
    "ru": [],
    "de": [],
    "fr": []
  }
}'
Request URL
https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Excursion details updated successfully.",
  "data": {
    "id": "32bfcece-d48a-4f2f-a296-0454d42b579e",
    "excursionId": "a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8",
    "languageCode": "en",
    "highlights": [
      "Pick-up from hotels starts at 01:00 AM. The day before the trip, we will contact you to confirm the final and accurate pick-up time for your hotel.",
      "The distance from Hurghada to Cairo is approximately 465 kilometers.",
      "During the trip from Hurghada to Cairo, and also on the return journey, there will be a 30–40 minute rest stop. Refreshments and restroom access are available at the rest stop cafeteria (paid).",
      "The tour guide determines the order of visiting the places included in the program based on the traffic conditions.",
      "Return to your hotel in Hurghada is expected around 22:30."
    ],
    "excludes": [],
    "includes": [
      "Hotel pickup and drop-off",
      "All transfers are provided by air-conditioned vehicles.",
      "Egyptologist guide available in English, French, German, and Russian.",
      "Entrance tickets to all places and activities included in the program.",
      "Lunch during the tour at a local restaurant (open buffet – drinks are paid separately)."
    ],
    "whatToBring": [
      "Passport and travel insurance photos, or just photos of them on your phone.",
      "Breakfast box (can be ordered free of charge at the hotel the evening before).",
      "Small backpack or comfortable travel bag to carry personal belongings.",
      "Light jacket or sweater during the winter season.",
      "Light, loose-fitting clothes during the summer season.",
      "Hat or cap for sun protection.",
      "Sunglasses.",
      "Comfortable walking shoes.",
      "Extra bottled water.",
      "Any necessary medication.",
      "Camera or smartphone with a charger.",
      "It is recommended to bring a book or prepare some music for the long ride.",
      "Money for additional expenses and souvenirs."
    ],
    "cancellationPolicy": [
      "At least 50% of the trip cost must be paid after booking confirmation and at least one day before the start of the trip.",
      "For a full refund, you must cancel at least 24 hours before the experience’s start time.",
      "If you cancel less than 24 hours before the experience’s start time, the 50% amount paid will not be refunded.",
      "Any changes made less than 24 hours before the experience’s start time will not be accepted.",
      "Cut-off times are based on the experience’s local time.",
      "This experience requires good weather. If it is cancelled due to poor weather, you will be offered a different date or a full refund."
    ],
    "literally": [
      {
        "key": "Title",
        "value": "Cairo in a Day — Journey Through Time"
      },
      {
        "key": "Description",
        "value": "Visiting Cairo, the modern capital of Egypt, on a one-day trip from Hurghada, is essential to explore its rich historical treasures. Cairo is a vibrant city where ancient wonders like the Pyramids of Giza and the Sphinx stand in harmony with modern life. The city’s museums, mosques, and markets offer a fascinating glimpse into Egypt’s past and vibrant culture. A trip to Cairo promises a unique blend of history, culture, and adventure, leaving a lasting impression on any traveler."
      },
      {
        "key": "Itinerary 1",
        "value": "The Giza Plateau: Icons of Eternity - Experience the last remaining Wonder of the Ancient World. Marvel at the Great Pyramids of Giza, architectural masterpieces aligned with the stars over 4,500 years ago. Stand before the Great Sphinx, the legendary guardian of royal wisdom, and explore the Solar Barque, a ceremonial vessel built for a Pharaoh’s journey to the afterlife. As the sun sets, the plateau transforms into a breathtaking golden landscape that captures the timeless spirit of Egypt."
      },
      {
        "key": "Itinerary 2",
        "value": "The Egyptian National Museum: A Golden Legacy - Step into a treasure trove of over 120,000 artifacts spanning 5,000 years of history. This Neoclassical landmark houses the world’s most famous archaeological find: the Treasures of Tutankhamun. From his iconic golden mask to ancient mummies and papyrus scrolls, the museum offers an unparalleled deep dive into the art and soul of Ancient Egyptian civilization."
      },
      {
        "key": "Itinerary 3",
        "value": "Coptic Old Cairo: A Tapestry of Faith - Walk through the spiritual heart of the city where diverse religions have coexisted for centuries. Visit the 7th-century Hanging Church, suspended over a Roman fortress, and the Coptic Museum, home to exquisite Christian art. This district also hosts the historic Ben Ezra Synagogue, a site steeped in biblical legend, offering an authentic glimpse into Egypt’s rich religious heritage."
      },
      {
        "key": "Itinerary 4",
        "value": "The Nile: The Lifeblood of History - No visit is complete without sailing the world’s longest river. Whether by a traditional felucca or a modern cruiser, a Nile boat trip reveals Cairo’s skyline from a serene perspective. Glide along the same waters the Pharaohs once navigated, soaking in a peaceful atmosphere that has fueled Egyptian life and culture since the dawn of time."
      }
    ]
  },
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:30:00 GMT 
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
    "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "languageCode": "string",
    "highlights": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "cancellationPolicy": [
      "string"
    ],
    "literally": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  },
  "errors": [
    "string"
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links

DELETE
/api/excursions-details/excursion/{excursionId}


Parameters
Try it out
Name	Description
excursionId *
string($uuid)
(path)
a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
Responses
Curl

curl -X 'DELETE' \
  'https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjZlM2Y2NmVmLWExZmItNGQ3Ni1mNjg4LTA4ZGYzMWQ2ZDRmMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJzdXBlcmFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoic3VwZXJhZG1pbkB0b3VyaXN0bWFya2V0LmNvbSIsImp0aSI6ImQ5MjczYmM4LWRkNDMtNDEyNi05NWM5LTI0NjY3NTczMzRlOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3OTI5NTYyNTksImlzcyI6IlRvdXJpc3RNYXJrZXRBUEkiLCJhdWQiOiJUb3VyaXN0TWFya2V0Q2xpZW50In0.U2hjsQ18XYiltQ5kkDruXndxleRr1TcvltAp5M56Kh0'
Request URL
https://touristtt.runasp.net/api/excursions-details/excursion/a6cbb7bc-fe9d-4d70-b40b-dc4e4df35ba8
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "isSuccess": true,
  "message": "Excursion details deleted successfully.",
  "data": null,
  "errors": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sun,25 Oct 2026 08:31:51 GMT 
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
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "success": true,
  "isSuccess": true,
  "message": "string",
  "data": "string",
  "errors": [
    "string"
  ]
}