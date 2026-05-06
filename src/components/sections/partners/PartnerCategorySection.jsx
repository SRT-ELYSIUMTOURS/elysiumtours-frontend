import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";

// Figma: Category section layout — used for all 7 partner categories on the overview page
// Layout: LEFT = eyebrow (line + label), RIGHT = title + description + "Explore More" button
// BELOW: 4 PartnerHighlightCard in a flex row
// px-[156px] matches Figma's left-[156px] w-[1416px] content area on 1728px design
// Backgrounds alternate: #f2eaf9 (purple-tint) and #fefefe (white)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CATEGORY_DATA = {
  "tour-sites": {
    label: "TOUR SITES & EVENTS",
    title: "Explore Tour Sites & Events",
    description: "Discover iconic landmarks, guided tours, and vibrant local events offered by our trusted partners. From historic sites and nature reserves to cultural festivals and special experiences, each listing connects you with authentic ways to explore West Africa.",
    bg: "bg-secondary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/ts-a/335/568", category: "Cape Coast Castle" },
      { id: 2, image: "https://picsum.photos/seed/ts-b/335/568", category: "Kakum National Park" },
      { id: 3, image: "https://picsum.photos/seed/ts-c/335/568", category: "Nkrumah Mausoleum" },
      { id: 4, image: "https://picsum.photos/seed/ts-d/335/568", category: "Elmina Castle" },
    ],
  },
  accommodation: {
    label: "ACCOMMODATION",
    title: "Places to Stay",
    description: "Find comfortable and trusted places to stay, offered by our verified accommodation partners. From boutique hotels and eco-lodges to guesthouses and resorts, each option is selected to support a safe, relaxing, and enjoyable travel experience across West Africa.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/acc-a/335/568", category: "Labadi Beach Hotel" },
      { id: 2, image: "https://picsum.photos/seed/acc-b/335/568", category: "Kempinski Gold Coast" },
      { id: 3, image: "https://picsum.photos/seed/acc-c/335/568", category: "Coconut Grove Hotel" },
      { id: 4, image: "https://picsum.photos/seed/acc-d/335/568", category: "Royal Senchi Resort" },
    ],
  },
  transportation: {
    label: "TRANSPORTATION",
    title: "Experiences & Destinations",
    description: "Discover iconic landmarks, guided tours, and vibrant local events offered by our trusted partners. From historic sites and nature reserves to cultural festivals and special experiences, each listing connects you with authentic ways to explore West Africa.",
    bg: "bg-secondary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/tr-a/335/568", category: "Airport Transfers" },
      { id: 2, image: "https://picsum.photos/seed/tr-b/335/568", category: "Private SUV Hire" },
      { id: 3, image: "https://picsum.photos/seed/tr-c/335/568", category: "Luxury Coach" },
      { id: 4, image: "https://picsum.photos/seed/tr-d/335/568", category: "Boat & Ferry" },
    ],
  },
  guides: {
    label: "TOUR GUIDES",
    title: "Guides Who Know the Way",
    description: "Explore with knowledgeable local guides who bring destinations to life through stories, history, and firsthand experience. Our trusted guides help you navigate each place with confidence, offering authentic insights and meaningful connections that make every tour memorable.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/gu-a/335/568", category: "Heritage Guides" },
      { id: 2, image: "https://picsum.photos/seed/gu-b/335/568", category: "Cultural Guides" },
      { id: 3, image: "https://picsum.photos/seed/gu-c/335/568", category: "Adventure Guides" },
      { id: 4, image: "https://picsum.photos/seed/gu-d/335/568", category: "Food Tour Guides" },
    ],
  },
  restaurants: {
    label: "RESTAURANTS & DINING",
    title: "Dining Experiences",
    description: "Discover the flavors of West Africa through curated dining experiences offered by our trusted partners. From traditional local meals to modern culinary concepts, each experience is designed to immerse you in the region's culture, hospitality, and taste.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/re-a/335/568", category: "Fine Dining" },
      { id: 2, image: "https://picsum.photos/seed/re-b/335/568", category: "Local Cuisine" },
      { id: 3, image: "https://picsum.photos/seed/re-c/335/568", category: "Beachside Dining" },
      { id: 4, image: "https://picsum.photos/seed/re-d/335/568", category: "Street Food Tours" },
    ],
  },
  photographers: {
    label: "PHOTOS AND VIDEOGRAPHERS",
    title: "Photography & Videography",
    description: "Capture your journey through the lens of skilled photography and videography partners who know how to tell stories visually. From personal travel shoots to event coverage, these creatives help preserve your experiences in high-quality images and videos you'll want to revisit and share.",
    bg: "bg-secondary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/ph-a/335/568", category: "Tour Photography" },
      { id: 2, image: "https://picsum.photos/seed/ph-b/335/568", category: "Drone Footage" },
      { id: 3, image: "https://picsum.photos/seed/ph-c/335/568", category: "Event Coverage" },
      { id: 4, image: "https://picsum.photos/seed/ph-d/335/568", category: "Documentary" },
    ],
  },
  insurance: {
    label: "INSURANCE & OTHER SERVICES",
    title: "Insurance & Travel Services",
    description: "Travel with added peace of mind through our trusted insurance and service partners. From travel insurance and safety coverage to essential support services, these partners help ensure your journey is protected, smooth, and worry-free from start to finish.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/in-a/335/568", category: "Travel Insurance" },
      { id: 2, image: "https://picsum.photos/seed/in-b/335/568", category: "Visa Services" },
      { id: 3, image: "https://picsum.photos/seed/in-c/335/568", category: "Currency Exchange" },
      { id: 4, image: "https://picsum.photos/seed/in-d/335/568", category: "Health Insurance" },
    ],
  },
};

// Order for the overview page
const OVERVIEW_ORDER = [
  "tour-sites",
  "accommodation",
  "transportation",
  "guides",
  "restaurants",
  "photographers",
  "insurance",
];

// Small outlined pill button matching Figma: h-[32px] border-[0.8px] rounded-[40px] text-[13px] semibold
const ExploreButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      "flex items-center gap-[9px] h-[32px] px-[10px]",
      "border-[0.8px] border-solid border-secondary-normal-default",
      "rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]",
      "font-raleway font-semibold text-[13px] leading-[18px] text-secondary-normal-default",
      "hover:bg-secondary-light-default transition-all duration-300 ease-in cursor-pointer",
      "bg-transparent"
    )}
  >
    Explore More
    <ArrowRightIcon />
  </button>
);

const CategorySectionBlock = ({ catKey, navigate }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  return (
    <section className={classNames("w-full py-[80px]", data.bg)}>
      <div className="px-[156px]">
        {/* Header: LEFT eyebrow | RIGHT title + desc + button */}
        <div className="flex items-start justify-between w-full mb-[48px]">
          {/* Left — eyebrow (line + uppercase label) */}
          <div className="flex items-center gap-[8px] pt-[10px]">
            <div className="w-[46px] h-[1px] shrink-0 bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
              {data.label}
            </span>
          </div>

          {/* Right — title + description + button (right-aligned) */}
          <div className="flex flex-col gap-[16px] items-end w-[597px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right">
              {data.title}
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right w-[565px]">
              {data.description}
            </p>
            <ExploreButton onClick={() => navigate(`/tour-partners/${catKey}/all`)} />
          </div>
        </div>

        {/* 4 partner highlight cards */}
        <div className="flex gap-[24px]">
          {data.cards.map((card, index) => (
            <PartnerHighlightCard
              key={card.id}
              image={card.image}
              category={card.category}
              onClick={() => navigate(`/tour-partners/${catKey}/all`)}
              className={` flex-1 h-[568px] ${index === 0 || index === 3 ? "lg:mt-[74px]" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnerCategorySection = React.forwardRef(({
  category,
  showAll = false,
  className = "",
  ...props
}, ref) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>
      {showAll
        ? OVERVIEW_ORDER.map((catKey) => (
            <CategorySectionBlock key={catKey} catKey={catKey} navigate={navigate} />
          ))
        : <CategorySectionBlock catKey={category} navigate={navigate} />
      }
    </div>
  );
});

PartnerCategorySection.displayName = "PartnerCategorySection";
export default PartnerCategorySection;
