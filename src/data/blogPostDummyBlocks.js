/**
 * Sample portable blocks for blog extended page (dev / demo).
 * Override with route state `contentBlocks` when wiring CMS.
 */

const BLOG_INTRO_P1 =
  "Ghana — often called the Gateway to Africa — is a country that invites you to experience its soul, not just its sights. From the moment you step off the plane and feel the warm, humid breeze, you're greeted by a rhythm that runs through everything: the laughter of street vendors calling out prices in the markets of Makola, the distant beat of drums echoing through neighborhoods, and the scent of grilled tilapia mingling with the aroma of fresh cocoa and spice. Ghana is a land of contrast and connection — where modern cities like Accra pulse with energy, creativity, and innovation, while rural villages preserve the timeless traditions that have shaped the nation's identity for centuries.";

const BLOG_INTRO_P2 =
  "Every region tells a story. In the Central Region, the haunting walls of Cape Coast Castle whisper of history and resilience; in the Ashanti Kingdom, gold-adorned chiefs and ceremonial drums reflect centuries of pride and culture; while the Volta Region invites you to unwind with waterfalls, mountain trails, and tranquil lakeside escapes. Head north, and the landscapes open up to vast savannas, ancient mosques, and vibrant festivals that blend the sacred with the joyful.";

const BLOG_INTRO_P3 =
  "But beyond the landmarks, it's Ghana's people who make it unforgettable. You'll find kindness in the woman who helps you navigate a tro-tro stop, wisdom in the elder who tells stories under a mango tree, and laughter in the children waving as you pass through their village. Each encounter reveals a different side of the country — one that's warm, human, and deeply alive.";

const BLOG_INTRO_P4 =
  "Traveling through Ghana isn't just about ticking off destinations; it's about immersing yourself in a living culture that embraces you like family. Whether you're savoring jollof rice at a seaside shack, dancing at a village festival, or watching the sun set over Lake Volta, Ghana invites you to slow down, listen, and connect. This guide will help you do just that — to move beneath the surface, travel safely and meaningfully, and experience Ghana the way locals do: with open arms, an open heart, and endless curiosity.";

export const DUMMY_BLOG_POST_BLOCKS = [
  { type: "paragraph", text: BLOG_INTRO_P1 },
  { type: "paragraph", text: BLOG_INTRO_P2 },
  { type: "paragraph", text: BLOG_INTRO_P3 },
  { type: "paragraph", text: BLOG_INTRO_P4 },
  { type: "imageTriplet" },
  {
    type: "sectionHeading",
    text: "🇬🇭1. Understanding Ghana: From Maps into Reality",
  },
  {
    type: "subheading",
    text: "1.1 Where to Visit First?",
  },
  {
    type: "paragraph",
    text: "Start where the stories are thickest: the Central Region for history, Greater Accra for energy, and the Volta for landscapes. Each hub lets you branch out without long transfers.",
  },
  {
    type: "bulletList",
    items: [
      {
        term: "Coastal corridor",
        text: "Forts, fishing towns, and Atlantic light — ideal for a first week.",
      },
      {
        term: "Inland rhythm",
        text: "Markets, workshops, and festivals that rarely make the brochure.",
      },
      "A flexible route lets you slow down when a conversation deserves another hour.",
    ],
  },
  {
    type: "subheading",
    text: "Urban Transport",
  },
  {
    type: "paragraph",
    text: "In cities, shared minibuses (tro-tros) and ride-hails stitch neighborhoods together. Peak hours reward patience; off-peak rides can feel almost leisurely.",
  },
 
  {
    type: "sectionHeading",
    text: "✈️2. Getting Around: From City Streets to Country Roads",
  },
  {
    type: "paragraph",
    text: "Intercity coaches and domestic flights shorten the map; rented cars and guided drives open detours. Match the mode to your comfort with navigation and time buffers.",
  },
  {
    type: "sectionHeading",
    text: "🚗3. Connectivity & Safety",
  },
  {
    type: "paragraph",
    text: "Connectivity is strongest in regional capitals; download offline maps and save guesthouse Wi‑Fi for uploads. Share your itinerary with someone you trust and check in at quiet intervals.",
  },
  {
    type: "subheading",
    text: "More Thoughts: The Spirit of Adventure",
  },
  {
    type: "paragraph",
    text: "The best Ghana itineraries leave slack — for a festival that starts late, a chief's greeting that runs long, or a beach afternoon that turns into dinner with new friends.",
  },
];
