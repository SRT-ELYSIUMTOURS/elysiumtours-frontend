import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { classNames } from "../../utils/classNames";
import BlogBreadcrumbBar from "../../components/sections/blog/BlogBreadcrumbBar";
import PopularTourCard from "../../components/cards/PopularTourCard";
import ImageGalleryModal from "../../components/ui/ImageGalleryModal";
import ShareModal from "../../components/ui/ShareModal";

// Route: /tours/:country/:tour
// e.g. /tours/ghana/elmina-heritage-coastal-journey

// ─── Static tour data (replace with API call later) ───────────────────────────
const TOUR_DATA = {
  "elmina-heritage-coastal-journey": {
    title: "Elmina Heritage & Coastal Journey",
    country: "Ghana",
    location: "Cape Coast, Ghana",
    rating: 4.9,
    reviewCount: 24,
    maxGuests: 12,
    duration: "3 Days / 2 Nights",
    languages: "English, Twi, French",
    cancellation: "Cancellation available",
    price: "GHC 4,590",
    description: "Embark on a transformative journey through Ghana's Central Region, where history meets the sea. Visit the iconic Elmina Castle and Cape Coast Castle — UNESCO World Heritage Sites that tell the story of the transatlantic slave trade with sobering depth. Walk through the Door of No Return, stand in the dungeons, and feel the weight of history. Beyond the castles, explore vibrant local fishing villages, sample fresh seafood at the harbour, and discover the natural wonder of Kakum National Park's canopy walkway suspended 30 metres above the forest floor.",
    images: Array.from({ length: 24 }, (_, i) => `https://picsum.photos/seed/tour-detail-${i + 1}/856/717`),
    heroMainImage: "https://picsum.photos/seed/tour-hero-main/856/717",
    heroTopRight: "https://picsum.photos/seed/tour-hero-top/856/366",
    heroBottomRight: "https://picsum.photos/seed/tour-hero-bottom/856/347",
    bestFor: ["Cultural Enthusiasts", "Diaspora Travelers", "International Tourists", "Couples"],
    included: [
      { type: "check", text: "All inter-continental travels" },
      { type: "check", text: "Expert certified heritage guides" },
      { type: "check", text: "2 nights hotel accommodation" },
      { type: "check", text: "4 meals (2x Lunch, 2x Breakfast)" },
      { type: "check", text: "All entrance fees" },
      { type: "check", text: "Hotel pickup & drop-off" },
      { type: "cross", text: "International/domestic flights" },
      { type: "cross", text: "Personal spending & tips" },
      { type: "cross", text: "Travel insurance" },
      { type: "cross", text: "Alcoholic beverages" },
      { type: "cross", text: "Dinner meals (Day 1 & 2)" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Accra Departure → Cape Coast Arrival",
        activities: ["Early drive along the coastal highway", "Orientation walk through Cape Coast town", "Traditional cuisine walk at local market"],
      },
      {
        day: 2,
        title: "Coastal Exploration",
        activities: ["Fort Elmina & Cape Coast Castle visits", "Kakum National Park canopy walk", "Local fishing harbour market tour"],
      },
      {
        day: 3,
        title: "Return to Accra",
        activities: ["W.E.B Du Bois Memorial Museum visit", "Departure and transfer back to Accra"],
      },
    ],
    guide: {
      name: "Kwame Asante",
      rating: 4.9,
      reviews: 124,
      speciality: "Heritage Guide",
      image: "https://picsum.photos/seed/guide-kwame/80/80",
    },
    reviews: [
      {
        id: 1,
        name: "Sarah M.",
        avatar: "https://picsum.photos/seed/reviewer-1/40/40",
        rating: 5,
        date: "January 2025",
        text: "Absolutely life-changing experience. Kwame's knowledge of the history was profound and deeply moving. The castle visits were emotional but necessary. Highly recommend to every person of African descent.",
      },
      {
        id: 2,
        name: "James O.",
        avatar: "https://picsum.photos/seed/reviewer-2/40/40",
        rating: 5,
        date: "December 2024",
        text: "A perfect blend of history, culture, and natural beauty. The canopy walk was exhilarating and the coastal views were stunning. Elysium Tours truly exceeded our expectations.",
      },
      {
        id: 3,
        name: "Priya K.",
        avatar: "https://picsum.photos/seed/reviewer-3/40/40",
        rating: 4,
        date: "November 2024",
        text: "Wonderful tour with excellent organisation. The accommodations were comfortable and the meals were delicious. Would love to return for the extended tour next time.",
      },
    ],
    ratingBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
  },
};

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

// ─── TourDetailPage ────────────────────────────────────────────────────────────
const TourDetailPage = () => {
  const { country, tour } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
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

  const tabs = ["Description", "Guide", "Reviews"];

  return (
    <main className="w-full bg-white min-h-screen" style={{ fontFamily: "Raleway, sans-serif" }}>
      {/* Breadcrumb */}
      <BlogBreadcrumbBar
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: countryDisplay, href: `/tours/${country}` },
          { label: tourData.title, href: "#" },
        ]}
      />

      {/* Main content area */}
      <div className="px-[80px] pt-[40px] pb-[80px]">
        {/* Title + meta header */}
        <div className="mb-[24px]">
          <div className="flex items-start justify-between mb-[12px]">
            <h1 className="font-raleway font-bold text-[48px] leading-[58px] text-[#2d2d2d] max-w-[800px]">
              {tourData.title}
            </h1>
            <div className="flex items-center gap-[12px] mt-[8px]">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#e9eaeb] hover:border-[#7b2cbf] transition-colors"
                aria-label="Bookmark"
              >
                <BookmarkIcon active={bookmarked} />
              </button>
              <button
                onClick={() => setShareOpen(true)}
                className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#e9eaeb] hover:border-[#7b2cbf] transition-colors"
                aria-label="Share"
              >
                <ShareIcon />
              </button>
            </div>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-[12px] mb-[12px]">
            <ReviewStars rating={tourData.rating} />
            <span className="font-raleway font-semibold text-[14px] text-[#7b2cbf]">{tourData.rating}</span>
            <span className="font-raleway font-normal text-[14px] text-[#6f6f6f]">({tourData.reviewCount} reviews)</span>
            <div className="w-[4px] h-[4px] rounded-full bg-[#d0d0d0]" />
            <div className="flex items-center gap-[6px]">
              <MapPinIcon />
              <span className="font-raleway font-medium text-[14px] text-[#6f6f6f]">{tourData.location}</span>
            </div>
          </div>

          {/* Tour meta row */}
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[6px]">
              <UsersIcon />
              <span className="font-raleway font-medium text-[14px] text-[#6f6f6f]">Max {tourData.maxGuests} guests</span>
            </div>
            <div className="w-[1px] h-[14px] bg-[#d0d0d0]" />
            <div className="flex items-center gap-[6px]">
              <ClockIcon />
              <span className="font-raleway font-medium text-[14px] text-[#6f6f6f]">{tourData.duration}</span>
            </div>
            <div className="w-[1px] h-[14px] bg-[#d0d0d0]" />
            <div className="flex items-center gap-[6px]">
              <GlobeIcon />
              <span className="font-raleway font-medium text-[14px] text-[#6f6f6f]">{tourData.languages}</span>
            </div>
            <div className="w-[1px] h-[14px] bg-[#d0d0d0]" />
            <div className="flex items-center gap-[6px]">
              <CancelIcon />
              <span className="font-raleway font-medium text-[14px] text-[#6f6f6f]">{tourData.cancellation}</span>
            </div>
          </div>
        </div>

        {/* Hero image grid */}
        <div className="flex gap-[8px] mb-[32px]" style={{ height: "717px" }}>
          {/* Left: main image slider (half width) */}
          <div
            className="relative overflow-hidden rounded-[12px] cursor-pointer flex-1"
            onClick={() => openGallery(0)}
          >
            <img
              src={tourData.heroMainImage}
              alt={tourData.title}
              className="w-full h-full object-cover"
            />
            {/* Dot nav */}
            <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] z-10">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={classNames(
                    "w-[10px] h-[10px] rounded-full border border-solid transition-all",
                    i === 0 ? "bg-white border-white" : "bg-transparent border-white/60"
                  )}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: 2 stacked images */}
          <div className="flex flex-col gap-[8px] flex-1 relative">
            <div
              className="overflow-hidden rounded-[12px] cursor-pointer"
              style={{ height: "366px" }}
              onClick={() => openGallery(1)}
            >
              <img src={tourData.heroTopRight} alt="Tour view 2" className="w-full h-full object-cover"/>
            </div>
            <div
              className="overflow-hidden rounded-[12px] cursor-pointer relative"
              style={{ height: "347px" }}
              onClick={() => openGallery(2)}
            >
              <img src={tourData.heroBottomRight} alt="Tour view 3" className="w-full h-full object-cover"/>
              {/* Image count badge */}
              <div
                className="absolute bottom-[16px] right-[16px] flex items-center gap-[6px] px-[14px] py-[8px] rounded-[40px] bg-black/60 cursor-pointer hover:bg-black/75 transition-colors"
                onClick={(e) => { e.stopPropagation(); openGallery(0); }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="3" width="10" height="8" rx="1.5" stroke="white" strokeWidth="1.2"/>
                  <path d="M5 11V13H14V5H12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-raleway font-semibold text-[13px] text-white">3 of {tourData.images.length} images</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + action icons row */}
        <div className="flex items-center justify-between border-b border-[#e9eaeb] mb-[40px]">
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={classNames(
                  "px-[24px] py-[14px] font-raleway font-semibold text-[15px] transition-colors border-b-2",
                  activeTab === tab.toLowerCase()
                    ? "text-[#7b2cbf] border-[#7b2cbf]"
                    : "text-[#6f6f6f] border-transparent hover:text-[#2d2d2d]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[8px] pb-[2px]">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#e9eaeb] hover:border-[#7b2cbf] transition-colors"
              aria-label="Bookmark"
            >
              <BookmarkIcon active={bookmarked} />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="w-[40px] h-[40px] flex items-center justify-center rounded-full border border-[#e9eaeb] hover:border-[#7b2cbf] transition-colors"
              aria-label="Share"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-[40px] items-start">
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col gap-[48px]">

            {/* Description */}
            <div>
              <p className={classNames(
                "font-raleway font-normal text-[16px] leading-[28px] text-[#4a4a4a]",
                !descExpanded ? "line-clamp-4" : ""
              )}>
                {tourData.description}
              </p>
              {!descExpanded && (
                <button
                  onClick={() => setDescExpanded(true)}
                  className="mt-[8px] font-raleway font-semibold text-[14px] text-[#7b2cbf] hover:underline"
                >
                  Read More
                </button>
              )}

              {/* Best for tags */}
              <div className="mt-[20px]">
                <span className="font-raleway font-semibold text-[14px] text-[#2d2d2d] mr-[12px]">Best for:</span>
                <div className="inline-flex flex-wrap gap-[8px] mt-[8px]">
                  {tourData.bestFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-[14px] py-[6px] rounded-[20px] font-raleway font-medium text-[13px] text-[#4a4a4a] border border-[#d0d0d0] bg-[#fafafa]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What's included */}
            <div>
              <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[20px]">
                What's included
              </h2>
              <div className="grid grid-cols-2 gap-x-[32px] gap-y-[12px]">
                {tourData.included.map((item, i) => (
                  <div key={i} className="flex items-start gap-[10px]">
                    {item.type === "check" ? <CheckIcon /> : <CrossIcon />}
                    <span className="font-raleway font-medium text-[14px] leading-[22px] text-[#4a4a4a]">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What you'll do — Itinerary */}
            <div>
              <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[20px]">
                What you'll do
              </h2>
              <div className="flex flex-col gap-[12px]">
                {tourData.itinerary.map((day) => (
                  <ItineraryDay key={day.day} day={day} />
                ))}
              </div>
            </div>

            {/* Tour Guide preview */}
            <div className="p-[24px] rounded-[16px] border border-[#e9eaeb] bg-[#fafafa] flex items-center gap-[20px]">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden flex-shrink-0">
                <img src={tourData.guide.image} alt={tourData.guide.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1">
                <h3 className="font-raleway font-bold text-[18px] text-[#2d2d2d] mb-[4px]">{tourData.guide.name}</h3>
                <div className="flex items-center gap-[8px] mb-[6px]">
                  <ReviewStars rating={tourData.guide.rating} size={13} />
                  <span className="font-raleway font-medium text-[13px] text-[#6f6f6f]">{tourData.guide.rating} · {tourData.guide.reviews} reviews</span>
                </div>
                <span className="inline-flex px-[10px] py-[4px] rounded-[20px] bg-[#f3e8ff] text-[#7b2cbf] font-raleway font-semibold text-[12px]">
                  {tourData.guide.speciality}
                </span>
              </div>
              <button className="px-[20px] py-[10px] rounded-[40px] border border-[#7b2cbf] text-[#7b2cbf] font-raleway font-semibold text-[14px] hover:bg-[#f9f5ff] transition-colors">
                View Profile
              </button>
            </div>

            {/* Reviews section */}
            <div>
              <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[24px]">
                What People Say
              </h2>

              {/* Overall rating */}
              <div className="flex items-start gap-[40px] p-[24px] rounded-[16px] border border-[#e9eaeb] bg-[#fafafa] mb-[24px]">
                <div className="flex flex-col items-center gap-[4px]">
                  <span className="font-raleway font-bold text-[56px] leading-[64px] text-[#2d2d2d]">{tourData.rating}</span>
                  <ReviewStars rating={tourData.rating} size={16} />
                  <span className="font-raleway font-medium text-[13px] text-[#6f6f6f]">out of 5</span>
                </div>
                <div className="flex-1 flex flex-col gap-[8px]">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = tourData.ratingBreakdown[star] || 0;
                    return (
                      <div key={star} className="flex items-center gap-[10px]">
                        <span className="font-raleway font-medium text-[13px] text-[#6f6f6f] w-[12px]">{star}</span>
                        <StarIcon size={12} filled />
                        <div className="flex-1 h-[6px] rounded-full bg-[#e9eaeb] overflow-hidden">
                          <div className="h-full rounded-full bg-[#7b2cbf] transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-raleway font-medium text-[12px] text-[#6f6f6f] w-[32px] text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review cards */}
              <div className="flex flex-col gap-[20px] mb-[24px]">
                {tourData.reviews.map((review) => (
                  <div key={review.id} className="p-[20px] rounded-[16px] border border-[#e9eaeb]">
                    <div className="flex items-center gap-[12px] mb-[12px]">
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1">
                        <p className="font-raleway font-bold text-[15px] text-[#2d2d2d]">{review.name}</p>
                        <p className="font-raleway font-normal text-[12px] text-[#6f6f6f]">{review.date}</p>
                      </div>
                      <ReviewStars rating={review.rating} size={13} />
                    </div>
                    <p className="font-raleway font-normal text-[14px] leading-[22px] text-[#4a4a4a]">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Load more */}
              <button className="w-full h-[48px] rounded-[40px] border border-[#7b2cbf] text-[#7b2cbf] font-raleway font-semibold text-[15px] hover:bg-[#f9f5ff] transition-colors">
                Load More Reviews
              </button>
            </div>

            {/* Map section */}
            <div>
              <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[20px]">
                Booking Point on a Map
              </h2>
              <div className="w-full h-[320px] rounded-[16px] bg-[#e9eaeb] relative overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center gap-[12px]">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#7b2cbf] flex items-center justify-center">
                    <MapPinIcon />
                  </div>
                  <p className="font-raleway font-medium text-[14px] text-[#6f6f6f]">{tourData.location}</p>
                  <button className="px-[20px] py-[8px] rounded-[40px] bg-white border border-[#e9eaeb] text-[#2d2d2d] font-raleway font-semibold text-[13px] hover:border-[#7b2cbf] transition-colors shadow-sm">
                    Get Directions
                  </button>
                </div>
                {/* Map grid lines for placeholder */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, #9ca3af 0, #9ca3af 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #9ca3af 0, #9ca3af 1px, transparent 1px, transparent 40px)"
                }} />
              </div>
            </div>

            {/* Travelling with a group CTA */}
            <div className="p-[32px] rounded-[20px] bg-gradient-to-r from-[#2b0f43] to-[#4a1470] flex items-center justify-between">
              <div>
                <h3 className="font-raleway font-bold text-[22px] leading-[30px] text-white mb-[8px]">
                  Travelling with a group?
                </h3>
                <p className="font-raleway font-normal text-[15px] leading-[22px] text-white/70 max-w-[400px]">
                  Get exclusive group rates and customised itineraries for parties of 6 or more. We'll make your group adventure unforgettable.
                </p>
              </div>
              <button className="flex-shrink-0 px-[24px] py-[12px] rounded-[40px] bg-[#7b2cbf] text-white font-raleway font-semibold text-[15px] hover:bg-[#6b22af] transition-colors">
                Enquire Now
              </button>
            </div>

            {/* You might also like */}
            <div>
              <h2 className="font-raleway font-bold text-[20px] leading-[28px] text-[#2d2d2d] mb-[24px]">
                You might also like
              </h2>
              <div className="grid grid-cols-3 gap-[16px]">
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

          {/* RIGHT: Sticky Booking Widget */}
          <div className="w-[400px] flex-shrink-0 sticky top-[100px]">
            <div className="rounded-[20px] border border-[#e9eaeb] bg-white shadow-lg overflow-hidden">
              <div className="p-[24px]">
                {/* Price */}
                <div className="flex items-baseline gap-[6px] mb-[20px]">
                  <span className="font-raleway font-bold text-[32px] leading-[40px] text-[#7b2cbf]">
                    {tourData.price}
                  </span>
                  <span className="font-raleway font-normal text-[16px] text-[#6f6f6f]">/Person</span>
                </div>

                {/* Mini tabs */}
                <div className="flex items-center border border-[#e9eaeb] rounded-[10px] overflow-hidden mb-[20px]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={classNames(
                        "flex-1 py-[8px] font-raleway font-semibold text-[13px] transition-colors",
                        activeTab === tab.toLowerCase()
                          ? "bg-[#7b2cbf] text-white"
                          : "bg-white text-[#6f6f6f] hover:bg-[#fafafa]"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#e9eaeb] mb-[20px]" />

                {/* Choose your date */}
                <p className="font-raleway font-bold text-[12px] uppercase tracking-[0.08em] text-[#2d2d2d] mb-[12px]">
                  Choose Your Date
                </p>

                {/* Date inputs */}
                <div className="grid grid-cols-2 gap-[10px] mb-[20px]">
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-[0.06em] text-[#6f6f6f] mb-[6px]">
                      Departure
                    </label>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full h-[42px] px-[12px] rounded-[10px] border border-[#e9eaeb] font-raleway font-medium text-[13px] text-[#2d2d2d] focus:outline-none focus:border-[#7b2cbf] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-raleway font-semibold text-[11px] uppercase tracking-[0.06em] text-[#6f6f6f] mb-[6px]">
                      Return
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full h-[42px] px-[12px] rounded-[10px] border border-[#e9eaeb] font-raleway font-medium text-[13px] text-[#2d2d2d] focus:outline-none focus:border-[#7b2cbf] transition-colors"
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div className="flex flex-col gap-[12px] mb-[24px]">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-[12px] rounded-[10px] border border-[#e9eaeb]">
                    <div>
                      <p className="font-raleway font-semibold text-[14px] text-[#2d2d2d]">Adults</p>
                      <p className="font-raleway font-normal text-[12px] text-[#6f6f6f]">Age 13+</p>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <button
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-[32px] h-[32px] rounded-full border border-[#e9eaeb] flex items-center justify-center hover:border-[#7b2cbf] hover:text-[#7b2cbf] transition-colors text-[18px] font-light"
                      >
                        −
                      </button>
                      <span className="font-raleway font-bold text-[16px] text-[#2d2d2d] w-[20px] text-center">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-[32px] h-[32px] rounded-full border border-[#e9eaeb] flex items-center justify-center hover:border-[#7b2cbf] hover:text-[#7b2cbf] transition-colors text-[18px] font-light"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-[12px] rounded-[10px] border border-[#e9eaeb]">
                    <div>
                      <p className="font-raleway font-semibold text-[14px] text-[#2d2d2d]">Children</p>
                      <p className="font-raleway font-normal text-[12px] text-[#6f6f6f]">Age 0-12</p>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <button
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-[32px] h-[32px] rounded-full border border-[#e9eaeb] flex items-center justify-center hover:border-[#7b2cbf] hover:text-[#7b2cbf] transition-colors text-[18px] font-light"
                      >
                        −
                      </button>
                      <span className="font-raleway font-bold text-[16px] text-[#2d2d2d] w-[20px] text-center">{children}</span>
                      <button
                        onClick={() => setChildren(children + 1)}
                        className="w-[32px] h-[32px] rounded-full border border-[#e9eaeb] flex items-center justify-center hover:border-[#7b2cbf] hover:text-[#7b2cbf] transition-colors text-[18px] font-light"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Check Availability button */}
                <button className="w-full h-[56px] rounded-[40px] bg-[#7b2cbf] text-white font-raleway font-bold text-[16px] hover:bg-[#6b22af] transition-colors mb-[12px]">
                  Check Availability
                </button>

                {/* Save to Wishlist */}
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="w-full flex items-center justify-center gap-[8px] py-[10px] font-raleway font-semibold text-[14px] text-[#6f6f6f] hover:text-[#7b2cbf] transition-colors mb-[16px]"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 3C4.07 3 2.5 4.57 2.5 6.5C2.5 10 9 15 9 15C9 15 15.5 10 15.5 6.5C15.5 4.57 13.93 3 12 3C10.87 3 9.86 3.55 9.28 4.4C8.7 3.55 7.69 3 6 3Z" stroke={bookmarked ? "#7b2cbf" : "#6f6f6f"} fill={bookmarked ? "#7b2cbf" : "none"} strokeWidth="1.3"/>
                  </svg>
                  Save to Wishlist
                </button>

                {/* Cancellation notice */}
                <div className="flex items-start gap-[8px] p-[12px] rounded-[10px] bg-[#f0fdf4]">
                  <GreenCheckIcon />
                  <p className="font-raleway font-normal text-[13px] leading-[20px] text-[#4a4a4a]">
                    Free cancellation up to 48 hours before departure
                  </p>
                </div>
              </div>
            </div>
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
