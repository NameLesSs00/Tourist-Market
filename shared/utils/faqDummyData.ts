import type { FaqItem } from "@/models/faq";

/**
 * Placeholder FAQ content used while the UI is being reviewed.
 * Replace with `fetchFaqs()` (see `api/faqApi.ts`) once the backend data is signed off.
 *
 * Questions mirror the design comps; only the first answer copy is
 * final — the remaining answers are representative filler.
 */
export const FAQ_DUMMY_ITEMS: FaqItem[] = [
  {
    question: "What services do you offer ?",
    answer:
      "We offer a wide range of services designed to make your experience on the Red Sea seamless and memorable. From hotel bookings and tourist activities to private and group excursions, we help you discover the best experiences the region has to offer. We also provide car rental services for convenient travel and real estate opportunities for those looking to invest or find their ideal property by the sea.",
    displayOrder: 1,
  },
  {
    question: "Can you help me find the right hotel ?",
    answer:
      "Absolutely. Tell us your budget, preferred area and length of stay, and we will shortlist the options that fit — from beachfront resorts to boutique stays in the old town. Every booking includes delivery to your hotel, so anything you order reaches you directly.",
    displayOrder: 2,
  },
  {
    question: "What is the difference between private and group excursions ?",
    answer:
      "Private excursions are tailored to you alone, with a guide and vehicle at your disposal and the day paced entirely around your interests. Group excursions join a small shared party, which keeps the price lower and is a good way to meet other travellers.",
    displayOrder: 3,
  },
  {
    question: "Can I rent a car during my stay ?",
    answer:
      "Yes. We rent cars by the day and by the week, with insurance and a full licence check included. Delivery and collection can be arranged at your hotel or the airport, and we can hand over a second driver free of charge.",
    displayOrder: 4,
  },
  {
    question: "Can I customize my travel experience ?",
    answer:
      "That is the point. Build your own itinerary from our guided market tours, artisan craft workshops, culinary tastings and local transport, then add hotels, transfers and car hire. Our team will help you shape it into a trip that fits your dates and budget.",
    displayOrder: 5,
  },
];
