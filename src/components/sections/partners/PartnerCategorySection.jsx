import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import PartnerHighlightCard from "../../cards/PartnerHighlightCard";
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
    cards: [
      { id: 1, image: "https://picsum.photos/seed/ts-place1/335/568", name: "Cape Coast Castle" },
      { id: 2, image: "https://picsum.photos/seed/ts-place2/335/568", name: "Kakum Canopy Walk" },
      { id: 3, image: "https://picsum.photos/seed/ts-place3/335/568", name: "Kwame Nkrumah Memorial" },
      { id: 4, image: "https://picsum.photos/seed/ts-place4/335/568", name: "Elmina Fishing Harbour" },
    ],
  },
  accommodation: {
    label: "ACCOMMODATION",
    title: "Places to Stay",
    description: "Find comfortable and trusted places to stay, offered by our verified accommodation partners. From boutique hotels and eco-lodges to guesthouses and resorts, each option is selected to support a safe, relaxing, and enjoyable travel experience across West Africa.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/acc-hotel1/335/568", name: "Labadi Beach Hotel" },
      { id: 2, image: "https://picsum.photos/seed/acc-hotel2/335/568", name: "Kempinski Gold Coast City" },
      { id: 3, image: "https://picsum.photos/seed/acc-hotel3/335/568", name: "Coconut Grove Beach Resort" },
      { id: 4, image: "https://picsum.photos/seed/acc-hotel4/335/568", name: "Royal Senchi Resort & Spa" },
    ],
  },
  transportation: {
    label: "TRANSPORTATION",
    title: "Experiences & Destinations",
    description: "Discover iconic landmarks, guided tours, and vibrant local events offered by our trusted partners. From historic sites and nature reserves to cultural festivals and special experiences, each listing connects you with authentic ways to explore West Africa.",
    bg: "bg-secondary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/tr-brand1/335/568", name: "Accra Premier Shuttle" },
      { id: 2, image: "https://picsum.photos/seed/tr-brand2/335/568", name: "Volta Express Coaches" },
      { id: 3, image: "https://picsum.photos/seed/tr-brand3/335/568", name: "Coastal Routes Private Hire" },
      { id: 4, image: "https://picsum.photos/seed/tr-brand4/335/568", name: "Ada Lagoon Ferries" },
    ],
  },
  guides: {
    label: "TOUR GUIDES",
    title: "Guides Who Know the Way",
    description: "Explore with knowledgeable local guides who bring destinations to life through stories, history, and firsthand experience. Our trusted guides help you navigate each place with confidence, offering authentic insights and meaningful connections that make every tour memorable.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "/tourCountryAssets/guide1.png", name: "Kwame Mensah" },
      { id: 2, image: "/tourCountryAssets/guide2.png", name: "Ama Boateng" },
      { id: 3, image: "/tourCountryAssets/guide1.png", name: "Kofi Asante" },
      { id: 4, image: "/tourCountryAssets/guide2.png", name: "Yaa Serwaa" },
    ],
  },
  restaurants: {
    label: "RESTAURANTS & DINING",
    title: "Dining Experiences",
    description: "Discover the flavors of West Africa through curated dining experiences offered by our trusted partners. From traditional local meals to modern culinary concepts, each experience is designed to immerse you in the region's culture, hospitality, and taste.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/re-rest1/335/568", name: "Sankofa Grill & Terrace" },
      { id: 2, image: "https://picsum.photos/seed/re-rest2/335/568", name: "Maquis Chez Clarisse" },
      { id: 3, image: "https://picsum.photos/seed/re-rest3/335/568", name: "Skybar 25" },
      { id: 4, image: "https://picsum.photos/seed/re-rest4/335/568", name: "Asanka Local Kitchen" },
    ],
  },
  photographers: {
    label: "PHOTOS AND VIDEOGRAPHERS",
    title: "Photography & Videography",
    description: "Capture your journey through the lens of skilled photography and videography partners who know how to tell stories visually. From personal travel shoots to event coverage, these creatives help preserve your experiences in high-quality images and videos you'll want to revisit and share.",
    bg: "bg-secondary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/ph-scene1/335/568", name: "Mole National Park" },
      { id: 2, image: "https://picsum.photos/seed/ph-scene2/335/568", name: "Independence Square" },
      { id: 3, image: "https://picsum.photos/seed/ph-scene3/335/568", name: "Aburi Botanical Gardens" },
      { id: 4, image: "https://picsum.photos/seed/ph-scene4/335/568", name: "Busua Beach at Dusk" },
    ],
  },
  insurance: {
    label: "INSURANCE & OTHER SERVICES",
    title: "Insurance & Travel Services",
    description: "Travel with added peace of mind through our trusted insurance and service partners. From travel insurance and safety coverage to essential support services, these partners help ensure your journey is protected, smooth, and worry-free from start to finish.",
    bg: "bg-primary-light-default",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/in-part1/335/568", name: "SecureTravel Ghana" },
      { id: 2, image: "https://picsum.photos/seed/in-part2/335/568", name: "Atlas Visa Desk" },
      { id: 3, image: "https://picsum.photos/seed/in-part3/335/568", name: "Peak Assist West Africa" },
      { id: 4, image: "https://picsum.photos/seed/in-part4/335/568", name: "Guardian Health Cover" },
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

const CategorySectionBlock = ({ catKey, navigate }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  return (
    <section className={classNames("w-full py-[80px]", data.bg)}>
      <div className="px-[156px]">
        <PartnerSectionHeader
          className="mb-[48px]"
          eyebrow={data.label}
          title={data.title}
          description={data.description}
          onExploreClick={() => navigate(`/tour-partners/${catKey}/all`)}
        />

        {/* 4 cards — Guides use Meet-the-Experts (purple + lighting); others PartnerHighlightCard */}
        <div className="flex gap-[24px]">
          {data.cards.map((card, index) => {
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
              <PartnerHighlightCard
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
