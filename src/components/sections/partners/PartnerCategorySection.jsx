import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import HighlightCard from "../../cards/HighlightCard";
import GuideSpotlightCard from "../../cards/GuideSpotlightCard";
import PartnerSectionHeader from "./PartnerSectionHeader";

// Figma: Category section layout — used for all 7 partner categories on the overview page
// Layout: LEFT = eyebrow (line + label), RIGHT = title + description + "Explore More" button
// BELOW: 4 preview cards (names only — no navigation; Explore More goes to the category listing)
// px-[156px] matches Figma's left-[156px] w-[1416px] content area on 1728px design
// Backgrounds alternate: #f2eaf9 (purple-tint) and #fefefe (white)

const CATEGORY_DATA = {
  "tour-sites": {
    label: "TOUR SITES & EVENTS",
    title: "Explore Tour Sites & Events",
    description: "Discover iconic landmarks, guided tours, and vibrant local events offered by our trusted partners. From historic sites and nature reserves to cultural festivals and special experiences, each listing connects you with authentic ways to explore West Africa.",
    bg: "bg-secondary-light-default",
  },
  accommodation: {
    label: "ACCOMMODATION",
    title: "Places to Stay",
    description: "Find comfortable and trusted places to stay, offered by our verified accommodation partners. From boutique hotels and eco-lodges to guesthouses and resorts, each option is selected to support a safe, relaxing, and enjoyable travel experience across West Africa.",
    bg: "bg-primary-light-default",
  },
  transportation: {
    label: "TRANSPORTATION",
    title: "Experiences & Destinations",
    description: "Discover iconic landmarks, guided tours, and vibrant local events offered by our trusted partners. From historic sites and nature reserves to cultural festivals and special experiences, each listing connects you with authentic ways to explore West Africa.",
    bg: "bg-secondary-light-default",
  },
  guides: {
    label: "TOUR GUIDES",
    title: "Guides Who Know the Way",
    description: "Explore with knowledgeable local guides who bring destinations to life through stories, history, and firsthand experience. Our trusted guides help you navigate each place with confidence, offering authentic insights and meaningful connections that make every tour memorable.",
    bg: "bg-primary-light-default",
  },
  restaurants: {
    label: "RESTAURANTS & DINING",
    title: "Dining Experiences",
    description: "Discover the flavors of West Africa through curated dining experiences offered by our trusted partners. From traditional local meals to modern culinary concepts, each experience is designed to immerse you in the region's culture, hospitality, and taste.",
    bg: "bg-primary-light-default",
  },
  photographers: {
    label: "PHOTOS AND VIDEOGRAPHERS",
    title: "Photography & Videography",
    description: "Capture your journey through the lens of skilled photography and videography partners who know how to tell stories visually. From personal travel shoots to event coverage, these creatives help preserve your experiences in high-quality images and videos you'll want to revisit and share.",
    bg: "bg-secondary-light-default",
  },
  insurance: {
    label: "INSURANCE & OTHER SERVICES",
    title: "Insurance & Travel Services",
    description: "Travel with added peace of mind through our trusted insurance and service partners. From travel insurance and safety coverage to essential support services, these partners help ensure your journey is protected, smooth, and worry-free from start to finish.",
    bg: "bg-primary-light-default",
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

const CategorySectionBlock = ({ catKey, navigate, cardsOverride }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  // When cardsOverride is explicitly provided (even an empty array), use it — no mock fallback.
  // Only fall back to data.cards when the prop is absent (non-wired categories).
  const cards = cardsOverride !== undefined ? cardsOverride : (data.cards || []);

  return (
    <section className={classNames("w-full py-12 md:py-16 lg:py-[80px]", data.bg)}>
      <div className="px-6 md:px-[30px] lg:px-[156px]">
        <PartnerSectionHeader
          className="mb-8 lg:mb-[48px]"
          eyebrow={data.label}
          title={data.title}
          description={data.description}
          onExploreClick={() => navigate(`/tour-partners/${catKey}/all`)}
        />

        {/* 4 cards — Guides use Meet-the-Experts (purple + lighting); others HighlightCard
            Mobile: horizontal scroll. Desktop: row of 4. */}
        <div className="flex gap-[24px] overflow-x-auto scrollbar-hide -mx-6 px-6 md:-mx-[30px] md:px-[30px] lg:mx-0 lg:px-0 lg:overflow-visible pb-4 lg:pb-0">
          {cards.map((card, index) => {
            const stagger = index === 0 || index === 3 ? "lg:mt-[74px]" : "";
            const cardLayout = classNames(
              "flex-1 min-w-[335px] h-[568px]",
              stagger
            );
            if (catKey === "guides") {
              return (
                <GuideSpotlightCard
                  key={card.id}
                  image={card.image}
                  title={card.name}
                  alt={card.name}
                  className={cardLayout}
                />
              );
            }
            return (
              <HighlightCard
                key={card.id}
                image={card.image}
                category={card.name}
                className={cardLayout}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PartnerCategorySection = React.forwardRef(({
  category,
  showAll = false,
  cardsOverride,
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
        : <CategorySectionBlock catKey={category} navigate={navigate} cardsOverride={cardsOverride} />
      }
    </div>
  );
});

PartnerCategorySection.displayName = "PartnerCategorySection";
export default PartnerCategorySection;
