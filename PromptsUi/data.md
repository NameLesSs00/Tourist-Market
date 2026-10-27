{
  "GET /admin/excursions/group": {
    "items": [
      {
        "id": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
        "slug": "orange-bay-island-snorkeling-1792914191", will not be used
        "title": "Orange Bay Island Full-Day Snorkeling Trip", used as the title that is behind the hero
        "subtitle": "Crystal-clear waters and white sandy beaches", subtitile that is under the title 
        "shortDescription": "Sail to Orange Bay Island with snorkeling", idk where this should be used...
        "excursionType": "Boat Trip & Island Tour", on the primery image 
        "durationHours": 8,
        "stars": "5", used 
        "maxAttractions": 0,not used on groups
        "primaryImageUrl": "/uploads/executions/54cd43394d1f47f0b1788cc74ee3659c.webp", if null use the fall backimage like we did with the cards on the goups page 
        "heroImageUrl": null, leave empty
        "categorySlug": "boat-trips-and-snorkeling", not used
        "categoryTitle": "Boat Trips & Snorkeling", idk
        "isFeatured": true, not used
        "rating": 5,not used
        "price": { if price is 0 hide it from UI
          "currencyCode": "USD",
          "adultPrice": 45,
          "childPrice": 25,
          "infantPrice": 0
        }
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 9,
    "totalPages": 1,
    "hasPreviousPage": false,
    "hasNextPage": false
  },

  "GET /admin/excursions/{id}": {
    "fullProgram": "Two snorkeling stops, open-buffet lunch", this should be the descptoin tab
    "videoUrl": "https://www.youtube.com/watch?v=orangebay", not used
    "heroImage": null,
    "primaryImageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp",
    "imageList": [ you should not call each image by id we fetch them all 
      {
        "id": "c5f7ac1b-34ca-4257-9532-4ccb3c89cf54",
        "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
        "imageUrl": "/uploads/executions/c68b41e3623b41499a4ba728f9ebdb76.webp",
        "isPrimary": false
      }
    ],
    "faqs": [ you should add the tap for it 
      {
        "id": "22222222-0001-0001-0001-000000000001",
        "question": "What time is hotel pickup in Hurghada?",
        "answer": "Hotel pickup is between 4:00 AM and 4:30 AM.",
        "displayOrder": 1,
        "isActive": true,
        "languageCode": "en"
      }
    ],
    "attractions": [], not used in groups
    "services": [], not used in gourps
    "id": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
    "slug": "orange-bay-island-snorkeling-1792914191", not used
    "title": "Luxor Full Day Tour from Hurghada", used
    "subtitle": "Explore Ancient Egyptian History", used
    "shortDescription": "Experience the wonders of ancient Thebes with expert Egyptologist guide", idk where to place
    "excursionType": "Historical Day Tour", idk where to place 
    "durationHours": 14,
    "stars": "4.5", used
    "maxAttractions": 0, not used
    "heroImageUrl": null, 
    "categorySlug": null, not used
    "categoryTitle": "Historical Tours",
    "isFeatured": true, not used
    "rating": 0, not used
    "price": { same as befroer
      "currencyCode": "USD",
      "adultPrice": 45,
      "childPrice": 25,
      "infantPrice": 0
    },
    "category": {
      "id": "00000000-0000-0000-0000-000000000000",
      "slug": "boat-trips-and-snorkeling",
      "title": "Boat Trips & Snorkeling"
    }
  },

  "GET /excursions-details/excursion/{id}": {
    "id": "26217727-dc4f-441c-91df-00a575bca858",
    "excursionId": "292df7dc-f7b7-4056-bc9b-3b368717ad2d",
    "languageCode": "en",
    "highlights": [ used in it's tab name 
      "Valley of the Kings - 3 royal tombs",
      "Karnak Temple - Largest religious site in the world"
    ],
    "excludes": [ used in it's tab name 
      "Tutankhamun's Tomb (extra 300 EGP)",
      "Hot air balloon ride (optional 95)"
    ],
    "includes": [ used in it's tab name 
      {
        "title": "Hotel Pick-Up and Drop-Off",
        "description": "Round-trip transportation from Hurghada hotels in air-conditioned vehicle"
      }
    ],
    "whatToBring": [ used in it's tab name 
      "Sunscreen (high SPF)",
      "Plenty of drinking water"
    ],
    "cancellationPolicy": "Free cancellation up to 24 hours before the experience.", used in it's tab name 
    "literally": [ used in it's tab name this is currenty not used right currenty 
      { "key": "Departure Time", "value": "04:00 AM" },
      { "key": "Return Time", "value": "08:00 PM (approximately)" },
      { "key": "Duration", "value": "Full Day (14-16 hours)" },
      { "key": "Group Size", "value": "Maximum 45 passengers" },
      { "key": "Languages Available", "value": "English, German, Russian, French" },
      { "key": "Pickup Location", "value": "All Hurghada hotels" },
      { "key": "Best Season", "value": "October to April" },
      { "key": "Difficulty Level", "value": "Easy to Moderate" },
      { "key": "Distance to Luxor", "value": "Approximately 280 km (4 hours drive)" },
      { "key": "Age Restriction", "value": "Suitable for all ages" }
    ]
  },

  "GET /excursions/{id}/availability": {
    "success": true,
    "isSuccess": true,
    "message": "success",
    "data": {
      "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "days": [
        { "dayNo": 1, "dayName": "Sunday", "isAvailable": true },
        { "dayNo": 2, "dayName": "Monday", "isAvailable": false },
        { "dayNo": 3, "dayName": "Tuesday", "isAvailable": true },
        { "dayNo": 4, "dayName": "Wednesday", "isAvailable": true },
        { "dayNo": 5, "dayName": "Thursday", "isAvailable": true },
        { "dayNo": 6, "dayName": "Friday", "isAvailable": true },
        { "dayNo": 7, "dayName": "Saturday", "isAvailable": true }
      ]
    },
    "errors": null
  },

  "GET /excursion-reviews?excursionId={id}": {
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "excursionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "customerName": "string",
        "customerEmail": "user@example.com",
        "rating": 0,
        "title": "string",
        "comment": "string",
        "helpfulCount": 0,
        "isPublished": true,
        "createdAt": "2026-10-27T00:00:00Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 20,
    "totalCount": 0,
    "totalPages": 0,
    "hasPreviousPage": false,
    "hasNextPage": false
  }, add the fetcher to make it marked as helpfull from the backend but we should add it only once for each comment per user so we will need to create a plan so that the user can't just add many likes at least for one sestion could be using cookes to trick this user

 
  "GET /admin/excursions/{id}/faqs": [ we have int we should not call it again
    {
      "id": "22222222-0001-0001-0001-000000000001",
      "question": "What time is hotel pickup in Hurghada?",
      "answer": "Hotel pickup is between 4:00 AM and 4:30 AM.",
      "displayOrder": 1,
      "isActive": true,
      "languageCode": "en"
    }
  ]
}

this is all of the data which is used and which is not you should create a full plan so that we make sure the single gourp page works right could you create aplan for it and please fo that right could you create aplan about the chagnes ?