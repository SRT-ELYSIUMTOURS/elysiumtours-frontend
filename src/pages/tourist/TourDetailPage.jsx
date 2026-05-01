import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PopularTourCard from "../../components/cards/PopularTourCard";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import ShareModal from "../../components/ui/ShareModal";

// Route: /tours/:country/:tour
// e.g. /tours/ghana/elmina-heritage-coastal-journey

// ─── Static tour data (replace with API call later) ───────────────────────────
//
// Strategy: shared TOUR_TEMPLATE provides rich placeholder content
// (itinerary, guide, reviews, addOns, etc.) and per-tour overrides
// supply the unique fields (title, location, description, price, etc.)
const TOUR_TEMPLATE = {
  rating: 4.8,
  reviewCount: 24,
  maxGuests: 12,
  languages: "English, Twi, French",
  cancellation: "Cancellation available",
  images: Array.from({ length: 24 }, (_, i) => `https://picsum.photos/seed/tour-detail-${i + 1}/856/717`),
  heroMainImage: "https://picsum.photos/seed/tour-hero-main/856/717",
  heroTopRight: "https://picsum.photos/seed/tour-hero-top/867/366",
  heroBottomLeft: "https://picsum.photos/seed/tour-hero-bl/430/347",
  heroBottomRight: "https://picsum.photos/seed/tour-hero-bottom/432/347",
  bestFor: ["Cultural Enthusiasts", "Diaspora Travelers", "International Tourists", "Couples"],
  included: [
    { type: "check", text: "Expert certified local guides" },
    { type: "check", text: "Hotel accommodation (where applicable)" },
    { type: "check", text: "Daily meals as per itinerary" },
    { type: "check", text: "All entrance fees" },
    { type: "check", text: "Hotel pickup & drop-off" },
    { type: "check", text: "Private comfortable transport" },
    { type: "cross", text: "International/domestic flights" },
    { type: "cross", text: "Personal spending & tips" },
    { type: "cross", text: "Travel insurance" },
    { type: "cross", text: "Alcoholic beverages" },
  ],
  itinerary: [
    {
      day: 1,
      title: "Departure & Arrival",
      activities: ["Hotel pickup and orientation", "Scenic transit to destination", "Traditional welcome dinner"],
    },
    {
      day: 2,
      title: "Main Exploration Day",
      activities: ["Guided tour of key sights", "Cultural immersion experience", "Local cuisine tasting"],
    },
    {
      day: 3,
      title: "Return Journey",
      activities: ["Optional morning excursion", "Souvenir shopping", "Departure and transfer back"],
    },
  ],
  guide: {
    name: "Ailsa Mensah-Asante",
    rating: 4.9,
    reviews: 124,
    speciality: "Heritage Guide",
    yearsExp: 8,
    languages: ["🇬🇧 English", "🇫🇷 French", "🇬🇭 Twi"],
    certifications: ["UNESCO Certified", "History MA"],
    image: "https://picsum.photos/seed/guide-ailsa/296/393",
    testimonials: [
      {
        quote: "Ailsa's depth of knowledge brought the history to life in a way no textbook ever could. A truly transformative experience.",
        reviewer: "Estella Sackey",
        date: "2 weeks ago",
      },
      {
        quote: "Her passion for Ghana's heritage is infectious. Every stop felt personal and deeply meaningful — I'll never forget it.",
        reviewer: "James O.",
        date: "1 month ago",
      },
    ],
  },
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      avatar: "https://picsum.photos/seed/reviewer-1/40/40",
      rating: 5,
      date: "January 2025",
      text: "Absolutely life-changing experience. The guide's knowledge was profound and deeply moving. Highly recommend to every traveler.",
    },
    {
      id: 2,
      name: "James O.",
      avatar: "https://picsum.photos/seed/reviewer-2/40/40",
      rating: 5,
      date: "December 2024",
      text: "A perfect blend of history, culture, and natural beauty. Elysium Tours truly exceeded our expectations.",
    },
    {
      id: 3,
      name: "Priya K.",
      avatar: "https://picsum.photos/seed/reviewer-3/40/40",
      rating: 4,
      date: "November 2024",
      text: "Wonderful tour with excellent organisation. Comfortable accommodations and delicious meals.",
    },
  ],
  ratingBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
  totalReviews: 3249,
  categoryRatings: [
    { label: "Guide Quality",      score: 4.9 },
    { label: "Value for Money",    score: 4.8 },
    { label: "Logistical Quality", score: 4.9 },
    { label: "Transport",          score: 4.5 },
  ],
  addOns: [
    { name: "Professional Photo Package",   desc: "High-resolution photos & edited highlights reel",    price: "GH₵ 850" },
    { name: "Private Vehicle Upgrade",       desc: "Exclusive private transfer throughout the tour",      price: "GH₵ 850" },
    { name: "International Flights",         desc: "Return flights from your home country",               price: "GH₵ 850" },
    { name: "Souvenir Bundle",               desc: "Curated artisan souvenirs and gifts",                  price: "GH₵ 850" },
  ],
};

// Per-tour overrides — only the fields that should be unique per tour.
// Anything not specified falls back to TOUR_TEMPLATE.
const TOUR_OVERRIDES = {
  // ── Featured tours (TourPage's TourFeaturedSection) ────────────────────
  "elmina-heritage-coastal-journey": {
    title: "Elmina Heritage & Coastal Journey",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 4,590",
    description: "Embark on a transformative journey through Ghana's Central Region, where history meets the sea. Visit the iconic Elmina Castle and Cape Coast Castle — UNESCO World Heritage Sites that tell the story of the transatlantic slave trade with sobering depth. Walk through the Door of No Return, stand in the dungeons, and feel the weight of history. Beyond the castles, explore vibrant local fishing villages, sample fresh seafood at the harbour, and discover the natural wonder of Kakum National Park's canopy walkway suspended 30 metres above the forest floor.",
  },
  "mole-national-park-safari": {
    title: "Mole National Park Safari",
    country: "Ghana",
    location: "Northern Region, Ghana",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: "GHC 5,500",
    description: "Experience Ghana's largest wildlife sanctuary on this immersive safari adventure. Spot elephants, antelopes, baboons, and over 300 bird species across 4,840 km² of pristine savannah. Take guided walking safaris with armed rangers, swim in the lodge's pool overlooking the watering hole, and learn about traditional northern Ghanaian culture. An eco-certified experience that supports local conservation.",
  },
  "accra-arts-culture-food-day": {
    title: "Accra Arts, Culture & Food Day",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.7,
    duration: "1 Day (8 hours)",
    price: "GHC 2,500",
    description: "A vibrant single-day immersion into Ghana's capital. Explore the Centre for National Culture for traditional crafts, visit the Kwame Nkrumah Memorial Park, sample street food at Makola Market, and enjoy a curated lunch at a local fusion restaurant. Perfect for first-time visitors looking to capture the essence of Accra in a single, memorable day.",
  },
  "dakar-business-immersion": {
    title: "Dakar Business & Immersion",
    country: "Senegal",
    location: "Dakar, Senegal",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 6,500",
    description: "A premium business-class tour of West Africa's francophone hub. Combine networking opportunities with cultural immersion: visit the historic Île de Gorée (UNESCO World Heritage Site), explore the bustling Sandaga Market, dine at Senegal's finest restaurants, and experience the warmth of Teranga hospitality. Ideal for business travelers seeking both work and discovery.",
  },

  // ── HomePage FeaturedToursSection ───────────────────────────────────────
  "accra-bustling-city-market-tour": {
    title: "Accra Bustling City & Market Tour",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.8,
    duration: "3 Days / 2 Nights",
    price: "GHC 3,500",
    description: "Dive into the energetic heart of Accra with this multi-day exploration. Wander through Makola, Kantamanto, and Madina markets to experience daily Ghanaian life. Visit Jamestown's lighthouse, the W.E.B. Du Bois Memorial Centre, and Independence Square. Evenings include sunset drives along the coast and dinner at Accra's most beloved chop bars and high-end restaurants.",
  },
  "kumasi-heritage-market-discovery": {
    title: "Kumasi Heritage & Market Discovery",
    country: "Ghana",
    location: "Kumasi, Ashanti Region",
    rating: 4.7,
    duration: "2 Days / 1 Night",
    price: "GHC 5,000",
    description: "Experience the cultural heart of the Ashanti Kingdom. Visit the Manhyia Palace Museum, Kejetia Market (one of West Africa's largest open-air markets), and the National Cultural Centre. Watch master craftsmen weave authentic kente cloth in Bonwire village, and learn the history of the Golden Stool — sacred symbol of the Ashanti people.",
  },
  "wli-waterfalls-nature-exploration": {
    title: "Wli Waterfalls & Nature Exploration",
    country: "Ghana",
    location: "Volta Region, Ghana",
    rating: 4.9,
    duration: "1 Day",
    price: "GHC 4,500",
    description: "Trek to West Africa's highest waterfall in the lush mountains of the Volta Region. The hike through the Agumatsa Wildlife Sanctuary takes you past tropical butterflies, fruit bats, and dense rainforest before revealing the spectacular 80-metre Wli Falls. Cool off in the natural pool below, then enjoy a traditional Ewe lunch at a riverside village.",
  },

  // ── Country page SignatureExperiencesSection / AllToursSection ─────────
  "homecoming-kakum-national-park": {
    title: "The Homecoming Experience to Kakum National Park",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 4.8,
    duration: "5 Days / 4 Nights",
    price: "GHC 4,000",
    description: "A specially curated diaspora homecoming experience combining heritage with adventure. Walk through the Cape Coast and Elmina Castles, traverse Kakum's iconic canopy walkway high above the rainforest, and join in a naming ceremony at a traditional Akan village. The journey ends with a healing beach retreat at Busua. A profound reconnection with ancestral roots.",
  },
  "accra-city-culture-tour": {
    title: "Accra City & Culture Full-Day Tour",
    country: "Ghana",
    location: "Accra, Greater Accra",
    rating: 4.8,
    duration: "1 Day",
    price: "GHC 250",
    description: "The definitive single-day introduction to Accra. From Independence Square to the National Museum, from Jamestown fishing harbour to the Arts Centre, this tour packs the highlights of Ghana's capital into one carefully-paced day. Includes a traditional Ghanaian lunch and time for souvenir shopping.",
  },
  "canopy-bridges-kakum": {
    title: "Canopy Bridges & Adventure at Kakum",
    country: "Ghana",
    location: "Central Region, Ghana",
    rating: 4.6,
    duration: "1 Day",
    price: "GHC 350",
    description: "An adrenaline-filled day at Kakum National Park's famous canopy walkway. Suspended 30 metres above the rainforest floor across seven swaying bridges, this is one of only three such walkways in Africa. Combine the walk with a guided forest hike, learn about medicinal plants, and spot rare species of butterflies and birds.",
  },
  "legacy-return-diaspora-experience": {
    title: "Legacy & Return — Diaspora Experience",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 5.0,
    duration: "4 Days / 3 Nights",
    price: "GHC 7,500",
    description: "An emotionally profound diaspora journey designed for travelers tracing their African roots. Visit Cape Coast and Elmina Castles with specialised heritage guides, participate in libation and naming ceremonies, meet with traditional chiefs, and explore W.E.B. Du Bois's legacy. Limited slots ensure an intimate, deeply personal experience.",
  },
  "boti-falls-umbrella-rock": {
    title: "Boti Falls & Umbrella Rock Day Trip",
    country: "Ghana",
    location: "Eastern Region, Ghana",
    rating: 4.7,
    duration: "1 Day",
    price: "GHC 300",
    description: "Discover the natural wonders of Ghana's Eastern Region. The twin Boti Falls plunge 30 metres into a serene pool — locals affectionately call them the 'male and female' falls. A short hike away, marvel at the gravity-defying Umbrella Rock and the mysterious 'three-headed' palm tree. A perfect day-trip from Accra.",
  },
  "premium-accra-heritage-business": {
    title: "Premium Accra Heritage & Business Tour",
    country: "Ghana",
    location: "Greater Accra, Ghana",
    rating: 4.8,
    duration: "2 Days / 1 Night",
    price: "GHC 6,000",
    description: "A business-class tour designed for executives visiting Accra. Combines high-quality cultural sites (Du Bois Centre, Nkrumah Mausoleum, Jamestown) with networking opportunities at Accra's premier business venues. Stay in a 5-star hotel, dine at fine restaurants, and travel in a private chauffeured vehicle throughout.",
  },
  "bolgatanga-arts-crafts-paga-crocodile": {
    title: "Bolgatanga Arts, Crafts & Paga Crocodile",
    country: "Ghana",
    location: "Upper East, Ghana",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: "GHC 8,500",
    description: "Travel to Ghana's far north for a deep cultural immersion. Visit the famous Bolgatanga craft market for handmade leather and basketry, see the legendary Paga Crocodile Pond where sacred crocodiles coexist peacefully with humans, and explore the Sirigu Women's Organisation for Pottery and Art.",
  },
  "bolgatanga-arts-crafts-paga": {
    title: "Bolgatanga Arts, Crafts & Paga Crocodile",
    country: "Ghana",
    location: "Upper East, Ghana",
    rating: 4.6,
    duration: "5 Days / 4 Nights",
    price: "GHC 8,500",
    description: "Travel to Ghana's far north for a deep cultural immersion. Visit the famous Bolgatanga craft market for handmade leather and basketry, see the legendary Paga Crocodile Pond where sacred crocodiles coexist peacefully with humans, and explore the Sirigu Women's Organisation for Pottery and Art.",
  },
  "kintampo-falls-rock-village": {
    title: "Kintampo Falls & Rock Village Tour",
    country: "Ghana",
    location: "Brong-Ahafo, Ghana",
    rating: 4.8,
    duration: "1 Day",
    price: "GHC 320",
    description: "Visit the breathtaking Kintampo Falls — three cascading falls plunging into deep emerald pools surrounded by tropical forest. Continue to the unique Rock Village (Tongo Rocks) where traditional shrines are built into the natural rock formations. A day rich in both natural wonder and spiritual heritage.",
  },
  "cape-three-points-coastal-heritage": {
    title: "Cape Three Points & Coastal Heritage",
    country: "Ghana",
    location: "Western Region, Ghana",
    rating: 4.9,
    duration: "3 Days / 2 Nights",
    price: "GHC 5,500",
    description: "Visit the southernmost tip of Ghana — Cape Three Points — where three coastal points meet the Atlantic. Explore the historic Fort Apollonia, walk the pristine beaches of Princes Town, and experience the slower pace of Ghana's lesser-known western coast. Includes a stay at an eco-lodge surrounded by mangroves and a guided fishing trip with local fishermen.",
  },
};

// Build TOUR_DATA by merging template + overrides for each slug
const TOUR_DATA = Object.fromEntries(
  Object.entries(TOUR_OVERRIDES).map(([slug, overrides]) => [
    slug,
    { ...TOUR_TEMPLATE, ...overrides },
  ])
);

const RELATED_TOURS = [
  {
    id: 1,
    image: "https://picsum.photos/seed/related-1/351/373",
    location: "Accra/Ghana",
    duration: { class: "Multi-Day", span: "5 Days/4 Nights" },
    maxGroupSize: 15,
    pickupIncluded: false,
    tags: ["Cultural", "Diaspora"],
    rating: 4.8,
    title: "The Homecoming Experience to Kakum National Park",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    country: "ghana",
    slug: "homecoming-kakum-national-park",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/related-2/351/373",
    location: "Kumasi/Ghana",
    duration: { class: "Multi-Day", span: "4 Days/3 Nights" },
    maxGroupSize: 10,
    pickupIncluded: true,
    tags: ["Heritage", "Culture"],
    rating: 4.9,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
    country: "ghana",
    slug: "kumasi-heritage-market-discovery",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/related-3/351/373",
    location: "Volta Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 8,
    pickupIncluded: false,
    tags: ["Nature", "Scenic"],
    rating: 4.7,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
    country: "ghana",
    slug: "wli-waterfalls-nature-exploration",
  },
];

// ─── Icon components ──────────────────────────────────────────────────────────
const StarIcon = ({ filled = true, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      d="M7.02 1.47C7.35 0.51 8.65 0.51 8.98 1.47L9.97 4.43C10.1 4.83 10.47 5.1 10.88 5.1H13.97C14.97 5.1 15.38 6.38 14.57 6.95L12.08 8.77C11.73 9.02 11.58 9.47 11.71 9.87L12.7 12.83C13.03 13.79 11.93 14.59 11.12 14.02L8.63 12.2C8.25 11.93 7.75 11.93 7.37 12.2L4.88 14.02C4.07 14.59 2.97 13.79 3.3 12.83L4.29 9.87C4.42 9.47 4.27 9.02 3.92 8.77L1.43 6.95C0.62 6.38 1.03 5.1 2.03 5.1H5.12C5.53 5.1 5.9 4.83 6.03 4.43L7.02 1.47Z"
      fill={filled ? "#7B2CBF" : "none"}
      stroke={filled ? "none" : "#7B2CBF"}
      strokeWidth="1.2"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-[2px]">
    <circle cx="9" cy="9" r="8" fill="#dcfce7"/>
    <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-[2px]">
    <circle cx="9" cy="9" r="8" fill="#fee2e2"/>
    <path d="M6 6L12 12M12 6L6 12" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 9C9.105 9 10 8.105 10 7C10 5.895 9.105 5 8 5C6.895 5 6 5.895 6 7C6 8.105 6.895 9 8 9Z" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M8 2C5.33 2 3 4.27 3 6.87C3 10.33 8 14 8 14C8 14 13 10.33 13 6.87C13 4.27 10.67 2 8 2Z" stroke="#6f6f6f" strokeWidth="1.2"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M1.5 13C1.5 10.51 3.51 8.5 6 8.5C8.49 8.5 10.5 10.51 10.5 13" stroke="#6f6f6f" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="12" cy="5.5" r="2" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M14.5 12.5C14.5 10.57 13.43 9 12 9" stroke="#6f6f6f" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M8 5V8.5L10 10" stroke="#6f6f6f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M8 1.5C8 1.5 6 4 6 8C6 12 8 14.5 8 14.5M8 1.5C8 1.5 10 4 10 8C10 12 8 14.5 8 14.5M1.5 8H14.5" stroke="#6f6f6f" strokeWidth="1.2"/>
  </svg>
);

const CancelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="#6f6f6f" strokeWidth="1.2"/>
    <path d="M5.5 8H10.5" stroke="#6f6f6f" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const BookmarkIcon = ({ active }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 3H15C15.55 3 16 3.45 16 4V18L10 14.5L4 18V4C4 3.45 4.45 3 5 3Z" stroke="#6f6f6f" strokeWidth="1.5" fill={active ? "#7b2cbf" : "none"} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="15" cy="4" r="2" stroke="#6f6f6f" strokeWidth="1.5"/>
    <circle cx="15" cy="16" r="2" stroke="#6f6f6f" strokeWidth="1.5"/>
    <circle cx="5" cy="10" r="2" stroke="#6f6f6f" strokeWidth="1.5"/>
    <path d="M6.8 9L13.2 5M6.8 11L13.2 15" stroke="#6f6f6f" strokeWidth="1.5"/>
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={classNames("transition-transform duration-200", open ? "rotate-180" : "")}>
    <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#2d2d2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GreenCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
    <circle cx="8" cy="8" r="7" fill="#22c55e"/>
    <path d="M4.5 8L6.5 10L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Tour Hero Section — Figma 3075:39137 ─────────────────────────────────────
// Full-width section: title+meta header (pl-156px) + 4-photo image grid (h-717px)
// Must sit OUTSIDE the padded content container so images reach edge-to-edge.
//
// Image grid layout (all absolute-positioned within the 1728×717 frame):
//   Left carousel:   left-0       w-856px  h-717px (gap of 8px to right column)
//   Right column:    left-864px   w-864px  h-717px   flex-col gap-4px
//     ↳ Top image:   w-full       h-366px
//     ↳ Bottom row:  w-full       h-347px  flex gap-4px
//         Bottom-L:  w-430px      h-347px
//         Bottom-R:  flex-1       h-347px  + "Show all photos" button
//
// "Show all photos" button — Figma 3071:39004:
//   backdrop-blur(7.45px) bg rgba(123,44,191,0.5) border-[#f2eaf9] rounded-[10px]
//   left-248px top-294px  w-160px h-38px  within the 432×347 bottom-right image
const TourHeroSection = React.forwardRef(({ tourData, onOpenGallery }, ref) => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div ref={ref} className="w-full flex flex-col bg-secondary-light-hover" style={{ gap: "16px" }}>

      {/* ── Title + meta row — Figma 3075:39109 ──────────────────────────── */}
      {/* pl-156px matches the standard page left gutter; pt-32px from gap to tab nav */}
      <div className="flex flex-col px-6 md:px-[30px] lg:pl-[156px] lg:pr-0" style={{ gap: "8px", paddingTop: "32px" }}>

        {/* h1 — Raleway SemiBold 39px/50lh #7b2cbf — Figma 3075:39111 */}
        <h1 className="text-[26px] leading-[34px] md:text-[32px] md:leading-[42px] lg:text-[39px] lg:leading-[50px]" style={{
          fontFamily: "Raleway, sans-serif",
          fontWeight: 600,
          color: "#7b2cbf",
        }}>
          {tourData.title}
        </h1>

        {/* Meta row — Figma 3075:39112 — h-20px flex gap-8px */}
        <div className="flex items-center flex-wrap" style={{ gap: "8px" }}>

          {/* Star + rating + review count */}
          <div className="flex items-center" style={{ gap: "4px" }}>
            {/* star SVG 18×19px — Figma 3075:39115 */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M8.523 1.164c.292-.842 1.662-.842 1.954 0l1.12 3.232a1.04 1.04 0 0 0 .987.716h3.4c.893 0 1.264 1.145.542 1.67l-2.75 2.002a1.04 1.04 0 0 0-.378 1.163l1.052 3.042c.29.84-.69 1.54-1.408 1.017l-2.752-2.003a1.04 1.04 0 0 0-1.224 0L6.358 14.006c-.718.523-1.698-.176-1.408-1.017l1.052-3.042a1.04 1.04 0 0 0-.378-1.163L2.874 6.782c-.722-.525-.351-1.67.542-1.67h3.4a1.04 1.04 0 0 0 .987-.716L8.923 1.164Z" fill="#7b2cbf" />
            </svg>
            {/* rating value — Raleway SemiBold 13px #0a0a0a */}
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#0a0a0a" }}>
              {tourData.rating}
            </span>
            {/* review count — Raleway SemiBold 13px #4a5565 */}
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#4a5565" }}>
              ({tourData.reviewCount} reviews)
            </span>
          </div>

          {/* Dot separator — Inter Regular 14px #99a1af tracking-[-0.15px] */}
          <span aria-hidden="true" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#99a1af", letterSpacing: "-0.1504px" }}>
            ·
          </span>

          {/* Location — Raleway SemiBold 13px #2d2d2d underline — Figma 3075:39124 */}
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#2d2d2d", textDecoration: "underline", textDecorationStyle: "solid", whiteSpace: "nowrap" }}>
            {tourData.location}
          </span>
        </div>
      </div>

      {/* ── Mobile/Tablet: single hero image with "Show all photos" button ── */}
      <div className="relative w-full overflow-hidden lg:hidden" style={{ height: "320px" }}>
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => onOpenGallery(0)}
        >
          <img
            src={tourData.heroMainImage}
            alt={tourData.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onOpenGallery(0); }}
          className="absolute flex items-center"
          style={{
            right: "16px",
            bottom: "16px",
            width: "160px",
            height: "38px",
            borderRadius: "10px",
            backdropFilter: "blur(7.45px)",
            WebkitBackdropFilter: "blur(7.45px)",
            backgroundColor: "rgba(123, 44, 191, 0.5)",
            border: "1px solid #f2eaf9",
            paddingLeft: "12px",
            gap: "8px",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <rect x="0" y="0" width="5" height="5" rx="1" fill="#ebdff5" />
            <rect x="7" y="0" width="5" height="5" rx="1" fill="#ebdff5" />
            <rect x="0" y="7" width="5" height="5" rx="1" fill="#ebdff5" />
            <rect x="7" y="7" width="5" height="5" rx="1" fill="#ebdff5" />
          </svg>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#f2eaf9", whiteSpace: "nowrap" }}>
            Show all photos
          </span>
        </button>
      </div>

      {/* ── Desktop: 4-photo image grid — Figma 3047:42325 ──────────────── */}
      {/* Full width, h-717px, border-r #d6beeb, overflow-hidden */}
      <div className="relative w-full overflow-hidden hidden lg:block" style={{ height: "717px", borderRight: "1px solid #d6beeb" }}>

        {/* LEFT: carousel — absolute, left-0, w-856px */}
        <div
          className="absolute left-0 top-0 overflow-hidden cursor-pointer"
          style={{ width: "856px", height: "717px" }}
          onClick={() => onOpenGallery(slideIndex)}
        >
          <img
            src={tourData.heroMainImage}
            alt={tourData.title}
            className="absolute inset-0 w-full h-full object-cover"
          />


        </div>

        {/* RIGHT: 3-image column — absolute, left-864px (8px gap), w-864px */}
        <div
          className="absolute top-0 flex flex-col"
          style={{ left: "864px", width: "864px", height: "717px", gap: "4px" }}
        >
          {/* Top image — h-366px, full right width */}
          <div
            className="overflow-hidden flex-shrink-0 cursor-pointer"
            style={{ width: "100%", height: "366px" }}
            onClick={() => onOpenGallery(1)}
          >
            <img src={tourData.heroTopRight} alt="Tour view 2" className="w-full h-full object-cover" />
          </div>

          {/* Bottom row — h-347px, two images side by side gap-4px */}
          <div className="flex" style={{ gap: "4px", height: "347px" }}>

            {/* Bottom-left — w-430px */}
            <div
              className="overflow-hidden flex-shrink-0 cursor-pointer"
              style={{ width: "430px", height: "347px" }}
              onClick={() => onOpenGallery(2)}
            >
              <img src={tourData.heroBottomLeft} alt="Tour view 3" className="w-full h-full object-cover" />
            </div>

            {/* Bottom-right — flex-1 (~432px), has "Show all photos" button */}
            <div
              className="relative overflow-hidden cursor-pointer"
              style={{ flex: "1 0 0", height: "347px" }}
              onClick={() => onOpenGallery(3)}
            >
              <img src={tourData.heroBottomRight} alt="Tour view 4" className="w-full h-full object-cover" />

              {/* "Show all photos" button — Figma 3071:39004
                  Frosted glass: backdrop-blur(7.45px) rgba(123,44,191,0.5) border-[#f2eaf9]
                  Position within image: left-248px top-294px
                  Interaction: opens image gallery carousel (pop-up) */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenGallery(0); }}
                className="absolute flex items-center"
                style={{
                  left: "248px",
                  top: "294px",
                  width: "160px",
                  height: "38px",
                  borderRadius: "10px",
                  backdropFilter: "blur(7.45px)",
                  WebkitBackdropFilter: "blur(7.45px)",
                  backgroundColor: "rgba(123, 44, 191, 0.5)",
                  border: "1px solid #f2eaf9",
                  paddingLeft: "12px",
                  gap: "8px",
                }}
              >
                {/* Grid icon — Figma uses ⋮⋮ (two vertical ellipsis chars); rendered as SVG 4-square grid for crisp rendering */}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <rect x="0" y="0" width="5" height="5" rx="1" fill="#ebdff5" />
                  <rect x="7" y="0" width="5" height="5" rx="1" fill="#ebdff5" />
                  <rect x="0" y="7" width="5" height="5" rx="1" fill="#ebdff5" />
                  <rect x="7" y="7" width="5" height="5" rx="1" fill="#ebdff5" />
                </svg>
                <span style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  lineHeight: "18px",
                  color: "#f2eaf9",
                  whiteSpace: "nowrap",
                }}>
                  Show all photos
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
TourHeroSection.displayName = "TourHeroSection";

// ─── Sticky section nav bar — Figma 3045:42287 ────────────────────────────────
// 1728×64px, bg #fefefe, borderBottom 2px solid #d6beeb, sticky below main nav
// Tabs: flex row gap-8px, left-aligned inside px-156px container
// Active:   SemiBold 13px/18lh #7b2cbf + 2px bottom border #7b2cbf
// Inactive: Medium   13px/22lh #565656 + transparent border
const DETAIL_TABS = [
  { key: "overview",   label: "Overview"   },
  { key: "itinerary",  label: "Itinerary"  },
  { key: "inclusions", label: "Inclusions" },
  { key: "tour-guide", label: "Tour Guide" },
  { key: "reviews",    label: "Reviews"    },
  { key: "location",   label: "Location"   },
];

const TourDetailNavBar = ({ activeSection, onTabClick }) => (
  <div
    className="w-full bg-[#fefefe] sticky z-40 top-[70px] lg:top-[112px]"
    style={{ height: "64px", borderBottom: "2px solid #d6beeb" }}
  >
    <div className="h-full flex items-center px-6 md:px-[30px] lg:px-[156px] overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-[8px]">
        {DETAIL_TABS.map((tab) => {
          const isActive = activeSection === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabClick(tab.key)}
              className="h-[63px] relative flex items-center justify-center px-[10px] flex-shrink-0 transition-colors"
              style={{
                borderBottom: isActive ? "2px solid #7b2cbf" : "2px solid transparent",
                marginBottom: "-2px", // align bottom border with bar's bottom border
              }}
            >
              <span
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  lineHeight: isActive ? "18px" : "22px",
                  color: isActive ? "#7b2cbf" : "#565656",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Itinerary accordion item ──────────────────────────────────────────────────
const ItineraryDay = ({ day }) => {
  const [open, setOpen] = useState(day.day === 1);
  return (
    <div className="border border-[#e9eaeb] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-[20px] bg-white hover:bg-[#fafafa] transition-colors text-left"
      >
        <div className="flex items-center gap-[16px]">
          <div className="w-[36px] h-[36px] rounded-full bg-[#7b2cbf] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-raleway font-bold text-[14px]">{day.day}</span>
          </div>
          <span className="font-raleway font-semibold text-[16px] text-[#2d2d2d]">Day {day.day}: {day.title}</span>
        </div>
        <ChevronDownIcon open={open} />
      </button>
      {open && (
        <div className="px-[20px] pb-[20px] bg-[#fafafa]">
          <div className="pl-[52px] flex flex-col gap-[8px]">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-[8px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#7b2cbf] flex-shrink-0" />
                <span className="font-raleway font-normal text-[15px] text-[#4a4a4a]">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Rating stars row ──────────────────────────────────────────────────────────
const ReviewStars = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-[2px]">
    {[1, 2, 3, 4, 5].map((s) => (
      <StarIcon key={s} filled={s <= Math.round(rating)} size={size} />
    ))}
  </div>
);

// ─── ItineraryStep ────────────────────────────────────────────────────────────
// Figma 3111:40578 — step circle (48px) + vertical connector line + accordion
// Active circle: bg-#7b2cbf border-2 white, text white   Inactive: bg-#ebdff5 border-#d6beeb, text #7b2cbf
const ItineraryStep = ({ day, isFirst }) => {
  const [open, setOpen] = useState(isFirst);
  return (
    <div className="flex" style={{ gap: "24px", paddingBottom: open ? "32px" : "28px" }}>
      {/* Circle */}
      <div className="flex-shrink-0" style={{ paddingTop: "2px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: open ? "#7b2cbf" : "#ebdff5",
            border: open ? "2px solid #ffffff" : "1.5px solid #d6beeb",
            boxShadow: open ? "0 0 0 2px #7b2cbf" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: 1, color: open ? "#ffffff" : "#7b2cbf" }}>
            {day.day}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1" style={{ paddingTop: "8px" }}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left flex items-start justify-between"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <div style={{ flex: 1, paddingRight: "12px" }}>
            <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "28px", color: "#4a1a73", marginBottom: "2px" }}>
              Day {day.day}: {day.title}
            </h3>
            <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "20px", color: "#6a7282" }}>
              {day.activities.join(" • ")}
            </p>
          </div>
          <ChevronDownIcon open={open} />
        </button>
        {open && (
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #ebdff5" }}>
            <div className="flex flex-col" style={{ gap: "6px" }}>
              {day.activities.map((act, i) => (
                <div key={i} className="flex items-start" style={{ gap: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#7b2cbf", flexShrink: 0, marginTop: "9px" }} />
                  <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "24px", color: "#364153" }}>
                    {act}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── AddOnRow ─────────────────────────────────────────────────────────────────
// Figma 3112:40669 — icon + name + desc on left; price + checkbox on right
const AddOnRow = ({ addon }) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3" style={{ paddingTop: "16px", paddingBottom: "16px", borderBottom: "1px solid #ebdff5" }}>
      <div className="flex items-center min-w-0" style={{ gap: "14px" }}>
        {/* Icon chip */}
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "#f2eaf9", border: "1px solid #ebdff5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7.5" stroke="#7b2cbf" strokeWidth="1.5"/>
            <path d="M7 10.5L9 12.5L13.5 8" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "15px", lineHeight: "22px", color: "#2d2d2d" }}>
            {addon.name}
          </p>
          <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "20px", color: "#6a7282", marginTop: "2px" }}>
            {addon.desc}
          </p>
        </div>
      </div>
      <div className="flex items-center" style={{ gap: "14px", flexShrink: 0 }}>
        <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "14px", color: "#7b2cbf", whiteSpace: "nowrap" }}>
          + {addon.price}
        </span>
        <button
          type="button"
          onClick={() => setSelected(!selected)}
          style={{ width: "24px", height: "24px", flexShrink: 0, background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="#7b2cbf"/>
              <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="#d1d5dc" strokeWidth="1.5"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── GuideCard ────────────────────────────────────────────────────────────────
// Figma 3112:40961 — rounded-30px card; left photo panel (gradient #2b0f43→#6c26a9)
// Right content: name / subtitle / language+cert badges / 2 testimonial quotes / link
const GuideCard = ({ guide }) => (
  <div
    className="relative overflow-hidden flex flex-col md:flex-row"
    style={{ borderRadius: "30px", border: "1.5px solid #d6beeb", minHeight: "393px" }}
  >
    {/* Left: photo panel */}
    <div className="relative flex-shrink-0 w-full h-[260px] md:h-auto md:w-[296px]">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #2b0f43 0%, #6c26a9 100%)",
          opacity: 0.82,
          borderRadius: "0",
          zIndex: 1,
        }}
      />
      {/* Glow ellipse */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "455px",
          height: "366px",
          left: "-63px",
          bottom: "-80px",
          borderRadius: "50%",
          background: "rgba(123,44,191,0.45)",
          filter: "blur(64px)",
          zIndex: 2,
        }}
      />
      <img
        src={guide.image}
        alt={guide.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ borderRadius: "28px 0 0 28px" }}
      />
    </div>

    {/* Right: content */}
    <div className="flex-1 flex flex-col justify-center p-6 md:p-8 md:pl-9">
      {/* Name */}
      <h3 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "4px" }}>
        {guide.name}
      </h3>
      {/* Subtitle */}
      <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "22px", color: "#6a7282", marginBottom: "16px" }}>
        {guide.speciality} · {guide.yearsExp} yrs · {guide.rating} ★ ({guide.reviews} reviews)
      </p>
      {/* Language + certification badges */}
      <div className="flex flex-wrap" style={{ gap: "8px", marginBottom: "24px" }}>
        {(guide.languages || []).map((lang) => (
          <span key={lang} style={{ fontFamily: "Raleway, sans-serif", fontSize: "13px", fontWeight: 500, color: "#364153", backgroundColor: "#fafafa", border: "1px solid #d6beeb", borderRadius: "100px", padding: "4px 12px" }}>
            {lang}
          </span>
        ))}
        {(guide.certifications || []).map((cert) => (
          <span key={cert} style={{ fontFamily: "Raleway, sans-serif", fontSize: "13px", fontWeight: 600, color: "#4a1a73", backgroundColor: "#f2eaf9", border: "1px solid #d6beeb", borderRadius: "100px", padding: "4px 12px" }}>
            {cert}
          </span>
        ))}
      </div>
      {/* Testimonial quotes — border-l-2 #7b2cbf */}
      <div className="flex flex-col" style={{ gap: "16px", marginBottom: "24px" }}>
        {(guide.testimonials || []).map((t, i) => (
          <div key={i} style={{ borderLeft: "2px solid #7b2cbf", paddingLeft: "14px" }}>
            <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "22px", color: "#364153", fontStyle: "italic" }}>
              "{t.quote}"
            </p>
            <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "12px", color: "#6a7282", marginTop: "4px" }}>
              — {t.reviewer}, {t.date}
            </p>
          </div>
        ))}
      </div>
      {/* View Full Details link */}
      <button
        type="button"
        style={{ alignSelf: "flex-end", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "14px", color: "#7b2cbf", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        View Full Details →
      </button>
    </div>
  </div>
);

// ─── ReviewsSection ───────────────────────────────────────────────────────────
// Figma 3123:42908 — 4.9 score + category bars + filter tabs + 4 review cards
const REVIEW_FILTER_TABS = ["All", "Cultural Interests", "Cleanness", "International", "Business", "Groups"];

const ReviewsSection = ({ tourData }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <div>
      {/* Rating overview */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12" style={{ marginBottom: "28px" }}>
        {/* Big number + stars */}
        <div className="flex flex-col items-center flex-shrink-0" style={{ gap: "8px", width: "127px" }}>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "56px", lineHeight: "56px", color: "#0a0a0a" }}>
            {tourData.rating}
          </span>
          <ReviewStars rating={tourData.rating} size={18} />
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "13px", color: "#6a7282", marginTop: "2px" }}>
            {(tourData.totalReviews || 3249).toLocaleString()} reviews
          </span>
        </div>
        {/* Category rating bars */}
        <div className="w-full md:flex-1 flex flex-col" style={{ gap: "18px", paddingTop: "8px" }}>
          {(tourData.categoryRatings || []).map(({ label, score }) => (
            <div key={label} className="flex items-center" style={{ gap: "12px" }}>
              <span className="w-[110px] md:w-[140px] flex-shrink-0" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "20px", color: "#364153" }}>
                {label}
              </span>
              <div
                className="flex-1 overflow-hidden"
                style={{ height: "8px", borderRadius: "100px", backgroundColor: "#e9eaeb" }}
              >
                <div style={{ width: `${(score / 5) * 100}%`, height: "100%", backgroundColor: "#7b2cbf", borderRadius: "100px" }} />
              </div>
              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", color: "#364153", width: "32px", textAlign: "right", flexShrink: 0 }}>
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center flex-wrap" style={{ gap: "8px", marginBottom: "28px" }}>
        {REVIEW_FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: isActive ? 600 : 500,
                fontSize: "13px",
                lineHeight: "22px",
                color: isActive ? "#7b2cbf" : "#364153",
                backgroundColor: isActive ? "#f2eaf9" : "#fafafa",
                border: `1.5px solid ${isActive ? "#d6beeb" : "#e9eaeb"}`,
                borderRadius: "100px",
                padding: "6px 16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Review cards */}
      <div className="flex flex-col">
        {tourData.reviews.map((review) => (
          <div key={review.id} style={{ padding: "28px 10px", borderBottom: "1px solid #ebdff5" }}>
            <div className="flex items-start" style={{ gap: "16px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "15px", lineHeight: "22px", color: "#2d2d2d" }}>{review.name}</p>
                    <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "12px", color: "#6a7282", marginTop: "2px" }}>{review.date}</p>
                  </div>
                  <ReviewStars rating={review.rating} size={14} />
                </div>
                <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "24px", color: "#364153", marginTop: "12px" }}>
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More — centered, w=215px h=56px — Figma 3126:43291 */}
      <div className="flex justify-center" style={{ marginTop: "32px" }}>
        <button
          type="button"
          style={{ width: "215px", height: "56px", borderRadius: "40px", border: "1.5px solid #7b2cbf", color: "#7b2cbf", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "15px", backgroundColor: "transparent", cursor: "pointer" }}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

// ─── BookingWidget ────────────────────────────────────────────────────────────
// Figma 3156:45940 — 457×755px card; gradient header + 3-step stepper + date inputs
// + traveler counters + Check Availability CTA + free cancellation notice
const BookingWidget = ({ tourData, adults, setAdults, children, setChildren, departureDate, setDepartureDate, returnDate, setReturnDate, bookmarked, setBookmarked }) => (
  <div
    className="w-full"
    style={{
      borderRadius: "24px",
      border: "1px solid #d6beeb",
      overflow: "hidden",
      boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1)",
      backgroundColor: "white",
    }}
  >
    {/* ── Gradient header — bg from-#7b2cbf to-#391559 ─────── */}
    <div className="px-4 pt-6 pb-4 md:px-[18px] md:pt-6 md:pb-0 md:h-[140px]" style={{ background: "linear-gradient(180deg, #7b2cbf 0%, #391559 100%)", display: "flex", flexDirection: "column", gap: "8px" }}>
      <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "10px", lineHeight: "18px", color: "#d6beeb", letterSpacing: "0.08em" }}>FROM</p>
      <p className="text-[28px] leading-[36px] md:text-[39px] md:leading-[50px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, color: "white", margin: 0 }}>GH₵ 4,590</p>
      <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "22px", color: "#ebdff5", margin: 0 }}>per person · USD ~$290 equivalent</p>
    </div>

    {/* ── 3-step stepper — h-105px border-b #f2eaf9 ─────────────────── */}
    <div style={{ height: "105px", borderBottom: "1px solid #f2eaf9", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="flex items-center" style={{ gap: "12px" }}>
        {/* Step 1 — active */}
        <div className="flex flex-col items-center w-[70px] md:w-[91px]" style={{ gap: "8px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "100px", backgroundColor: "#7b2cbf", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", color: "white" }}>1</span>
          </div>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "13px", lineHeight: "18px", color: "#7b2cbf" }}>Dates</span>
        </div>
        {/* Connector line */}
        <div className="w-[20px] md:w-[47px]" style={{ height: "2px", borderRadius: "10px", backgroundColor: "#ebdff5" }} />
        {/* Step 2 — inactive */}
        <div className="flex flex-col items-center w-[70px] md:w-[91px]" style={{ gap: "8px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "100px", backgroundColor: "#f2eaf9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", color: "#d6beeb" }}>2</span>
          </div>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#d6beeb" }}>Review</span>
        </div>
        {/* Connector line */}
        <div className="w-[20px] md:w-[47px]" style={{ height: "2px", borderRadius: "10px", backgroundColor: "#ebdff5" }} />
        {/* Step 3 — inactive */}
        <div className="flex flex-col items-center w-[70px] md:w-[91px]" style={{ gap: "8px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "100px", backgroundColor: "#f2eaf9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", color: "#d6beeb" }}>3</span>
          </div>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "18px", color: "#d6beeb" }}>Payment</span>
        </div>
      </div>
    </div>

    {/* ── Content area ─────────────────────────────────────────────────── */}
    <div className="px-4 md:px-7" style={{ paddingTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* CHOOSE YOUR DATE */}
      <div>
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "13px", lineHeight: "18px", color: "#4a1a73", marginBottom: "16px" }}>CHOOSE YOUR DATE</p>
        <div className="grid grid-cols-2" style={{ gap: "16px" }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6a7282", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.04em" }}>DEPARTURE</p>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              style={{ width: "100%", height: "42px", borderRadius: "10px", border: "1px solid #d1d5dc", padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#0a0a0a", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "12px", color: "#6a7282", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.04em" }}>RETURN</p>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={{ width: "100%", height: "42px", borderRadius: "10px", border: "1px solid #d1d5dc", padding: "0 12px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#0a0a0a", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      {/* TRAVELERS */}
      <div>
        <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, fontSize: "13px", lineHeight: "18px", color: "#4a1a73", marginBottom: "12px" }}>Travelers</p>
        <div className="flex flex-col" style={{ gap: "0" }}>
          {/* Adults */}
          <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
            <div>
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "20px", color: "#2d2d2d" }}>Adults</p>
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "10px", color: "#7b2cbf" }}>Age 13+</p>
            </div>
            <div className="flex items-center" style={{ gap: "12px" }}>
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #d6beeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#7b2cbf", fontSize: "18px", fontWeight: "bold", cursor: "pointer", backgroundColor: "transparent", lineHeight: 1 }}
              >−</button>
              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", color: "#4a1a73", width: "32px", textAlign: "center" }}>{adults}</span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #d6beeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#7b2cbf", fontSize: "18px", fontWeight: "bold", cursor: "pointer", backgroundColor: "transparent", lineHeight: 1 }}
              >+</button>
            </div>
          </div>
          {/* Children */}
          <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
            <div>
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "13px", lineHeight: "20px", color: "#2d2d2d" }}>Children</p>
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "10px", color: "#7b2cbf" }}>Age 4–12</p>
            </div>
            <div className="flex items-center" style={{ gap: "12px" }}>
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #d6beeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#7b2cbf", fontSize: "18px", fontWeight: "bold", cursor: "pointer", backgroundColor: "transparent", lineHeight: 1 }}
              >−</button>
              <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", color: "#4a1a73", width: "32px", textAlign: "center" }}>{children}</span>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #d6beeb", display: "flex", alignItems: "center", justifyContent: "center", color: "#7b2cbf", fontSize: "18px", fontWeight: "bold", cursor: "pointer", backgroundColor: "transparent", lineHeight: 1 }}
              >+</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA ACTIONS */}
      <div className="flex flex-col" style={{ gap: "12px" }}>
        {/* Check Availability — h-52px rounded-40px bg-#7b2cbf */}
        <button
          type="button"
          style={{ width: "100%", height: "52px", borderRadius: "40px", backgroundColor: "#7b2cbf", border: "1px solid #7b2cbf", color: "#f2eaf9", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "22px", cursor: "pointer", boxShadow: "0px 4px 4px rgba(0,0,0,0.05)" }}
        >
          Check Availability
        </button>
        {/* Save to Wishlist — send/arrow icon + text */}
        <button
          type="button"
          onClick={() => setBookmarked(!bookmarked)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "8px 0", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: "scaleY(-1)" }}>
            <path d="M1.5 1.5L16.5 9L1.5 16.5V11.25L11.5 9L1.5 6.75V1.5Z" stroke={bookmarked ? "#7b2cbf" : "#2d2d2d"} fill={bookmarked ? "#7b2cbf" : "none"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", color: "#2d2d2d" }}>Save to Wishlist</span>
        </button>
      </div>
    </div>

    {/* Free cancellation notice — pinned at bottom of widget */}
    <div className="mx-4 md:mx-7 mb-7" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 11px", backgroundColor: "rgba(235,223,245,0.5)", border: "1px solid #d6beeb", borderRadius: "10px", minHeight: "40px" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="7" fill="#22c55e"/>
        <path d="M4.5 8L6.5 10L11.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "22px", color: "#7b2cbf" }}>
        Free cancellation up to 48 hours before departure
      </span>
    </div>
  </div>
);

// ─── TourDetailPage ────────────────────────────────────────────────────────────
const TourDetailPage = () => {
  const { country, tour } = useParams();
  // activeSection drives the sticky nav bar tabs
  const [activeSection, setActiveSection] = useState("overview");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const tourData = TOUR_DATA[tour] || TOUR_DATA["elmina-heritage-coastal-journey"];
  const countryDisplay = country
    ? country.charAt(0).toUpperCase() + country.slice(1)
    : "Ghana";

  const openGallery = (index = 0) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  // Scroll to section when nav tab is clicked (offset = navbar + detail nav + buffer)
  const scrollToSection = useCallback((key) => {
    setActiveSection(key);
    const el = document.getElementById(`section-${key}`);
    if (!el) return;
    // Mobile navbar is 70px, desktop is 112px
    const navbarHeight = window.innerWidth >= 1024 ? 112 : 70;
    const offset = navbarHeight + 64 + 8;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Update active section as user scrolls (highlight whichever section is in the middle of the viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.id.replace("section-", "");
            setActiveSection(key);
          }
        });
      },
      // Trigger when section crosses the midpoint of the viewport
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    DETAIL_TABS.forEach(({ key }) => {
      const el = document.getElementById(`section-${key}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full bg-secondary-light-hover min-h-screen" style={{ fontFamily: "Raleway, sans-serif" }}>
      {/* Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: countryDisplay, href: `/tours/${country}` },
          { label: tourData.title, href: "#" },
        ]}
      />

      {/* Sticky section nav — Figma 3045:42287 */}
      <TourDetailNavBar activeSection={activeSection} onTabClick={scrollToSection} />

      {/* Full-width tour hero — Figma 3075:39137
          Title + meta (pl-156px) + 4-photo image grid (h-717px)
          Must be OUTSIDE the padded content div so images reach both edges */}
      <TourHeroSection tourData={tourData} onOpenGallery={openGallery} />

      {/* ── Main content — Figma Frame 1000006773 ────────────────────────────────
           Mobile: stacked column (widget below content)
           Desktop: two-column with sticky widget right                         */}
      <div className="px-6 md:px-[30px] lg:px-[156px] pt-8 lg:pt-[56px] pb-12 lg:pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start">

          {/* ── LEFT CONTENT — w=928px on desktop, full width on mobile ── */}
          <div className="w-full lg:flex-1 lg:max-w-[928px] min-w-0 flex flex-col">

            {/* ① OVERVIEW: Tour Meta Bar + About The Tour ─ id=section-overview */}
            <div id="section-overview" style={{ paddingBottom: "32px", borderBottom: "1.5px solid #ebdff5" }}>

              {/* Meta subtitle — "3-day tour hosted by Heritage Guides" */}
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#364153", marginBottom: "12px" }}>
                3-day tour hosted by Heritage Guides
              </p>
              {/* Info bar: Users · Duration · Languages · Cancellation */}
              <div className="flex items-center flex-wrap" style={{ gap: "8px" }}>
                <span className="flex items-center" style={{ gap: "6px", fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "14px", color: "#6a7282" }}>
                  <UsersIcon /> Max {tourData.maxGuests} guests
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center" style={{ gap: "6px", fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "14px", color: "#6a7282" }}>
                  <ClockIcon /> {tourData.duration}
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center" style={{ gap: "6px", fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "14px", color: "#6a7282" }}>
                  <GlobeIcon /> {tourData.languages}
                </span>
                <span style={{ color: "#99a1af" }}>·</span>
                <span className="flex items-center" style={{ gap: "6px", fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "14px", color: "#6a7282" }}>
                  <CancelIcon /> {tourData.cancellation}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: "1.5px", backgroundColor: "#ebdff5", margin: "24px 0" }} />

              {/* About The Tour heading */}
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "16px" }}>
                About The Tour
              </h2>
              {/* Description */}
              <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#364153" }}>
                {tourData.description}
              </p>

              {/* Best For tags */}
              <div className="flex flex-wrap items-center" style={{ gap: "8px", marginTop: "20px" }}>
                <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "14px", color: "#364153", flexShrink: 0 }}>Best For:</span>
                {tourData.bestFor.map((tag) => (
                  <span key={tag} style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "13px", color: "#4a1a73", backgroundColor: "#f2eaf9", border: "1px solid #d6beeb", borderRadius: "100px", padding: "5px 14px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ② WHAT'S INCLUDED ─ id=section-inclusions */}
            <div id="section-inclusions" style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "20px" }}>
                What's included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px 40px" }}>
                {tourData.included.map((item, i) => (
                  <div key={i} className="flex items-start" style={{ gap: "12px" }}>
                    {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                    <span style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, fontSize: "15px", lineHeight: "24px", color: "#364153" }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ③ ITINERARY ─ id=section-itinerary */}
            {/* Step circles (48px) + vertical connector line + expandable days */}
            <div id="section-itinerary" style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "28px" }}>
                What you'll do
              </h2>
              <div className="relative pl-12 md:pl-[72px]">
                {/* Vertical connector line linking all circles */}
                <div
                  className="absolute"
                  style={{ left: "23px", top: "26px", width: "1.5px", bottom: "26px", backgroundColor: "#d6beeb" }}
                />
                <div className="flex flex-col">
                  {tourData.itinerary.map((day, idx) => (
                    <ItineraryStep key={day.day} day={day} isFirst={idx === 0} />
                  ))}
                </div>
              </div>
            </div>

            {/* ④ OPTIONAL ADD-ONS */}
            <div style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "8px" }}>
                + Optional Add-ons
              </h2>
              <div className="flex flex-col">
                {tourData.addOns.map((addon, i) => (
                  <AddOnRow key={i} addon={addon} />
                ))}
              </div>
            </div>

            {/* ⑤ MEET YOUR TOUR GUIDE ─ id=section-tour-guide */}
            <div id="section-tour-guide" style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "24px" }}>
                Meet Your Tour Guide
              </h2>
              <GuideCard guide={tourData.guide} />
            </div>

            {/* ⑥ WHAT OUR TRAVELERS SAY ─ id=section-reviews */}
            <div id="section-reviews" style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "24px" }}>
                What Our Travelers Say
              </h2>
              <ReviewsSection tourData={tourData} />
            </div>

            {/* ⑦ MEETING POINT & LOCATION ─ id=section-location */}
            <div id="section-location" style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "20px" }}>
                Meeting Point & Location
              </h2>
              {/* Map placeholder — 928×393px */}
              <div className="relative w-full overflow-hidden" style={{ height: "393px", borderRadius: "16px", backgroundColor: "#e9eaeb" }}>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,#9ca3af 0,#9ca3af 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#9ca3af 0,#9ca3af 1px,transparent 1px,transparent 40px)" }} />
                {/* Map pin + label */}
                <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-60%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <svg width="38" height="47" viewBox="0 0 38 47" fill="none">
                    <path d="M19 0C8.51 0 0 8.51 0 19C0 33.25 19 47 19 47C19 47 38 33.25 38 19C38 8.51 29.49 0 19 0Z" fill="#7b2cbf"/>
                    <circle cx="19" cy="19" r="8" fill="white"/>
                  </svg>
                  <div style={{ backgroundColor: "white", padding: "8px 16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", fontFamily: "Raleway, sans-serif", fontSize: "12px", fontWeight: 500, color: "#2d2d2d", whiteSpace: "nowrap" }}>
                    Accra, Greater Accra Region
                  </div>
                </div>
                {/* Get Directions button */}
                <button
                  type="button"
                  style={{ position: "absolute", right: "16px", bottom: "16px", fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "14px", color: "#2d2d2d", backgroundColor: "white", border: "1px solid #e9eaeb", borderRadius: "8px", padding: "10px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer" }}
                >
                  Get Directions →
                </button>
              </div>
              {/* Pickup note */}
              <p style={{ marginTop: "16px", fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "22px", color: "#6a7282" }}>
                Hotel pickup available from Greater Accra and Cape Coast downtown. We will contact you the day before to confirm your exact pickup time.
              </p>
            </div>

            {/* ⑧ TRAVELLING WITH 6 OR MORE? ─ group CTA */}
            <div style={{ padding: "32px 0", borderBottom: "1.5px solid #ebdff5" }}>
              <div className="flex-col md:flex-row md:items-center" style={{ borderRadius: "16px", border: "1.5px solid #ebdff5", padding: "24px", display: "flex", justifyContent: "space-between", gap: "24px" }}>
                <div>
                  <h4 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "12px" }}>
                    Travelling with 6 or more?
                  </h4>
                  <p style={{ fontFamily: "Raleway, sans-serif", fontWeight: 400, fontSize: "15px", lineHeight: "24px", color: "#364153", maxWidth: "509px" }}>
                    Get bespoke itineraries tailored around your group — greater value, shared memories, and seamless logistics designed just for you.
                  </p>
                </div>
                <button
                  type="button"
                  style={{ flexShrink: 0, fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "15px", lineHeight: "22px", color: "#4a1a73", border: "1.5px solid #4a1a73", borderRadius: "40px", padding: "14px 24px", whiteSpace: "nowrap", cursor: "pointer", backgroundColor: "transparent" }}
                >
                  Get a Group Quote →
                </button>
              </div>
            </div>

            {/* ⑨ YOU MIGHT ALSO LOVE */}
            <div style={{ paddingTop: "40px" }}>
              <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "28px", color: "#4a1a73", marginBottom: "24px" }}>
                You Might Also Love
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "24px" }}>
                {RELATED_TOURS.map((t) => (
                  <PopularTourCard
                    key={t.id}
                    image={t.image}
                    location={t.location}
                    rating={t.rating}
                    title={t.title}
                    availabilityBadge={t.availabilityBadge}
                    price={t.price}
                    tags={t.tags}
                    duration={t.duration}
                    pickupIncluded={t.pickupIncluded}
                    maxGroupSize={t.maxGroupSize}
                    country={t.country}
                    tourSlug={t.slug}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Booking Widget — Figma 3156:45940 ─────────────────── */}
          {/* Mobile: full width below content. Desktop: sticky 457px right column
              sticky top = 112px navbar + 64px detail nav + 12px buffer = 188px */}
          <div className="w-full max-w-[457px] mx-auto lg:mx-0 lg:flex-shrink-0 lg:sticky lg:w-[457px] lg:top-[188px] order-last lg:order-none">
            <BookingWidget
              tourData={tourData}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              bookmarked={bookmarked}
              setBookmarked={setBookmarked}
            />
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryOpen && (
        <ImageGalleryModal
          images={tourData.images}
          currentIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          title={tourData.title}
          location="Ghana — Central Region, Cape Coast"
        />
      )}

      {/* Share Modal */}
      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          tour={{
            title: tourData.title,
            description: tourData.description.slice(0, 160) + "...",
            image: tourData.heroMainImage,
            url: window.location.href,
            author: {
              name: "Davida Dzato",
              avatar: "https://picsum.photos/seed/author-avatar/48/48",
              subtitle: "Giraffe Sanctuary",
              country: "🇬🇭 Ghana",
            },
          }}
        />
      )}
    </main>
  );
};

export default TourDetailPage;
