import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import GalleryPhotoCard from "../../cards/GalleryPhotoCard";

// Gallery Category Section — all 7 category sections for the gallery main page
// Each section follows: LEFT eyebrow + RIGHT title/desc/Explore More button
// Layout differs per category (Videos = 3 equal cols, Destinations = bento, etc.)
// Figma nodes: 616:6236 (Videos tab), plus other tab variants

// ─── Shared SVG icons ────────────────────────────────────────────────────────

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#7b2cbf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Large play circle icon (52px) used on video cards in the gallery Videos section
const PlayCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.5" fill="rgba(0,0,0,0.2)" />
    <path d="M21 18L36 26L21 34V18Z" fill="white" />
  </svg>
);

// ─── Explore More pill button (matches PartnerCategorySection) ────────────────

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

// ─── Section header (eyebrow left + title/desc/button right) ─────────────────

const SectionHeader = ({ label, title, description, onExplore }) => (
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full mb-8 lg:mb-[48px] gap-4 lg:gap-0">
    {/* Left — eyebrow */}
    <div className="flex items-center gap-[8px] pt-[10px]">
      <div className="w-[46px] h-px shrink-0 bg-secondary-dark-darker" />
      <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker uppercase tracking-[0.05em]">
        {label}
      </span>
    </div>
    {/* Right — title + description + button */}
    <div className="flex flex-col gap-[16px] items-start lg:items-end w-full lg:w-[677px]">
      <h2 className="font-raleway font-bold text-[20px] md:text-[25px] leading-[34px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[630px]">
        {title}
      </h2>
      <p className="font-raleway font-normal text-[14px] md:text-[16px] leading-[24px] text-[#2d2d2d] text-left lg:text-right w-full lg:w-[565px]">
        {description}
      </p>
      <ExploreButton onClick={onExplore} />
    </div>
  </div>
);

// ─── Category data ────────────────────────────────────────────────────────────

const CATEGORY_DATA = {
  destinations: {
    label: "DESTINATIONS",
    bg: "bg-primary-light-default",
    title: "Where Will Your Next Adventure Take You?",
    description: "Explore iconic destinations across Ghana and West Africa — from historic castles and lush national parks to vibrant cities and serene beaches. Each photo captures the spirit of a place waiting to be discovered.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/dest-a/335/663", title: "Cape Coast", count: "42 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/dest-b/338/568", title: "Kakum Park", count: "28 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/dest-c/162/197", title: "Elmina", count: "19", size: "small" },
      { id: 4, image: "https://picsum.photos/seed/dest-d/162/197", title: "Mole", count: "24", size: "small" },
      { id: 5, image: "https://picsum.photos/seed/dest-e/335/663", title: "Accra", count: "56 Photos", size: "large" },
      { id: 6, image: "https://picsum.photos/seed/dest-f/162/197", title: "Volta", count: "31", size: "small" },
      { id: 7, image: "https://picsum.photos/seed/dest-g/162/197", title: "Kumasi", count: "37", size: "small" },
      { id: 8, image: "https://picsum.photos/seed/dest-h/338/568", title: "Ada Foah", count: "22 Photos", size: "medium" },
    ],
  },
  activities: {
    label: "ACTIVITIES",
    bg: "bg-secondary-light-default",
    title: "Exciting Activities for Every Kind of Traveler",
    description: "From thrilling canopy walks and surfing to cultural drumming and guided tours, Ghana offers activities that energize every explorer. Browse real moments captured during our most unforgettable tours.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/act-a/335/568", title: "Canopy Walk", count: "18 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/act-b/335/568", title: "Surfing", count: "25 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/act-c/335/568", title: "Drumming", count: "14 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/act-d/335/568", title: "Boat Tours", count: "32 Photos", size: "medium" },
      { id: 5, image: "https://picsum.photos/seed/act-e/335/568", title: "Safari", count: "44 Photos", size: "medium" },
      { id: 6, image: "https://picsum.photos/seed/act-f/335/568", title: "Cooking", count: "11 Photos", size: "medium" },
    ],
  },
  nature: {
    label: "NATURE",
    bg: "bg-primary-light-default",
    title: "Ghana's Breathtaking Natural Wonders",
    description: "Lush rainforests, golden savannahs, cascading waterfalls, and pristine coastlines — Ghana's natural beauty is truly awe-inspiring. These photos capture the country's diverse ecosystems in their full glory.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/nat-a/335/663", title: "Boti Falls", count: "28 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/nat-b/335/568", title: "Kakum Forest", count: "35 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/nat-c/335/568", title: "Mole Game", count: "19 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/nat-d/335/663", title: "Wli Falls", count: "22 Photos", size: "large" },
    ],
  },
  culture: {
    label: "CULTURE",
    bg: "bg-secondary-light-default",
    title: "Rich Traditions, Vibrant Celebrations",
    description: "Experience the colors, rhythms, and stories of Ghanaian culture — from royal durbars and kente weaving to vibrant festivals and traditional ceremonies. Culture is at the heart of every Ghanaian experience.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/cul-a/338/568", title: "Kente Weaving", count: "33 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/cul-b/162/197", title: "Festivals", count: "47", size: "small" },
      { id: 3, image: "https://picsum.photos/seed/cul-c/162/197", title: "Durbars", count: "21", size: "small" },
      { id: 4, image: "https://picsum.photos/seed/cul-d/335/663", title: "Traditional Dance", count: "29 Photos", size: "large" },
      { id: 5, image: "https://picsum.photos/seed/cul-e/162/197", title: "Markets", count: "38", size: "small" },
      { id: 6, image: "https://picsum.photos/seed/cul-f/162/197", title: "Craft", count: "15", size: "small" },
      { id: 7, image: "https://picsum.photos/seed/cul-g/338/568", title: "Funerals", count: "12 Photos", size: "medium" },
    ],
  },
  videos: {
    label: "VIDEOS",
    bg: "bg-secondary-light-default",
    title: "See Ghana Through Real Traveler Stories",
    description: "Watch captivating short videos showcasing real moments from tours across Ghana — the landscapes, cultures, food, and excitement that make each experience unique. Feel the energy of the journey before you even set foot on the road.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/vid-a/451/364", title: "Destinations", count: "28 Videos" },
      { id: 2, image: "https://picsum.photos/seed/vid-b/451/364", title: "Activities", count: "28 Videos" },
      { id: 3, image: "https://picsum.photos/seed/vid-c/451/364", title: "Nature", count: "28 Videos" },
    ],
  },
  partners: {
    label: "PARTNERS",
    bg: "bg-primary-light-default",
    title: "Trusted Partners for Smooth Travel",
    description: "We collaborate with reliable local tour operators, hotels, guides, and transport providers to ensure every traveler enjoys quality service and safe, well-planned adventures.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/par-a/335/568", title: "Hotels", count: "24 Photos", size: "medium" },
      { id: 2, image: "https://picsum.photos/seed/par-b/335/568", title: "Guides", count: "18 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/par-c/335/568", title: "Restaurants", count: "32 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/par-d/335/568", title: "Transport", count: "15 Photos", size: "medium" },
    ],
  },
  "captured-by-you": {
    label: "CAPTURED BY YOU",
    bg: "bg-secondary-light-default",
    title: "Your Lens, Your Story",
    description: "These are your moments — photos submitted by travelers just like you who fell in love with Ghana. Upload your own travel photos and become part of our growing community gallery.",
    cards: [
      { id: 1, image: "https://picsum.photos/seed/cap-a/335/663", title: "Traveler Shots", count: "85 Photos", size: "large" },
      { id: 2, image: "https://picsum.photos/seed/cap-b/338/568", title: "Sunsets", count: "42 Photos", size: "medium" },
      { id: 3, image: "https://picsum.photos/seed/cap-c/338/568", title: "Wildlife", count: "31 Photos", size: "medium" },
      { id: 4, image: "https://picsum.photos/seed/cap-d/335/663", title: "Portraits", count: "67 Photos", size: "large" },
    ],
  },
};

const OVERVIEW_ORDER = [
  "destinations",
  "activities",
  "nature",
  "culture",
  "videos",
  "partners",
  "captured-by-you",
];

// ─── Videos section card row (3 equal flex-1 cards with play icons) ───────────

const VideosSectionCards = ({ cards, navigate, catKey }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start w-full">
    {cards.map((card) => (
      <button
        key={card.id}
        className={classNames(
          "relative overflow-hidden w-full",
          "border border-secondary-light-active",
          "rounded-[40px]",
          "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]",
          "cursor-pointer bg-[rgba(0,0,0,0.5)]"
        )}
        style={{ height: "264px" }}
        onClick={() => navigate(`/gallery/${catKey}/all`)}
      >
        {card.image && (
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        {/* Play circle icon — top right */}
        <div className="absolute top-[27px] right-[27px]">
          <PlayCircleIcon />
        </div>
        {/* Title + count — bottom left */}
        <div className="absolute bottom-[22px] left-[22px] flex flex-col gap-[4px] items-start">
          <p className="font-raleway font-bold text-[25px] leading-[34px] text-[#f7f7f7]">
            {card.title}
          </p>
          {card.count && (
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-[#f7f7f7]">
              {card.count}
            </p>
          )}
        </div>
      </button>
    ))}
  </div>
);

// ─── Destinations bento grid layout ──────────────────────────────────────────
// Col A (left=0): tall card h=663, top=42px offset
// Col B (left=353): flex-col: medium card h=568 + small pair row (2×162)
// Col C (left=714): tall card h=663, top=42px offset
// Col D (left=1071): flex-col: small pair row (2×162) + medium card h=568

const DestinationsBentoGrid = ({ cards, navigate, catKey }) => {
  const [cardA, cardB, cardC, cardD, cardE, cardF, cardG, cardH] = cards;
  return (
    <>
      {/* Mobile/tablet: 2-col grid */}
      <div className="grid grid-cols-2 gap-[15px] lg:hidden">
        {cards.map((card) => (
          <GalleryPhotoCard
            key={card.id}
            image={card.image}
            title={card.title}
            count={card.count}
            size="medium"
            className="w-full h-[200px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        ))}
      </div>
      {/* Desktop: original absolute bento */}
      <div className="hidden lg:block relative w-full" style={{ height: "705px" }}>
      {/* Col A — tall, offset 42px from top */}
      <div className="absolute" style={{ left: 0, top: 42, width: 335, height: 663 }}>
        <GalleryPhotoCard
          image={cardA?.image}
          title={cardA?.title}
          count={cardA?.count}
          size="large"
          className="w-full h-full"
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
      </div>
      {/* Col B — flex-col: medium (568) + small pair (197) */}
      <div className="absolute flex flex-col gap-[36px]" style={{ left: 353, top: 0, width: 338 }}>
        <GalleryPhotoCard
          image={cardB?.image}
          title={cardB?.title}
          count={cardB?.count}
          size="medium"
          className="w-full"
          style={{ height: 568 }}
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
        <div className="flex gap-[14px]">
          <GalleryPhotoCard
            image={cardC?.image}
            title={cardC?.title}
            size="small"
            className="w-[162px] h-[197px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
          <GalleryPhotoCard
            image={cardD?.image}
            title={cardD?.title}
            size="small"
            className="w-[162px] h-[197px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        </div>
      </div>
      {/* Col C — tall, offset 42px from top */}
      <div className="absolute" style={{ left: 715, top: 42, width: 335, height: 663 }}>
        <GalleryPhotoCard
          image={cardE?.image}
          title={cardE?.title}
          count={cardE?.count}
          size="large"
          className="w-full h-full"
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
      </div>
      {/* Col D — flex-col: small pair + medium (568) */}
      <div className="absolute flex flex-col gap-[33px]" style={{ left: 1074, top: 0, width: 338 }}>
        <div className="flex gap-[14px]">
          <GalleryPhotoCard
            image={cardF?.image}
            title={cardF?.title}
            size="small"
            className="w-[162px] h-[197px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
          <GalleryPhotoCard
            image={cardG?.image}
            title={cardG?.title}
            size="small"
            className="w-[162px] h-[197px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        </div>
        <GalleryPhotoCard
          image={cardH?.image}
          title={cardH?.title}
          count={cardH?.count}
          size="medium"
          className="w-full"
          style={{ height: 568 }}
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
      </div>
      </div>
    </>
  );
};

// ─── Standard grid (2-3 cols of medium cards) ────────────────────────────────

const StandardPhotoGrid = ({ cards, navigate, catKey, cols = 3 }) => (
  <div className={`grid gap-[24px] grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}`}>
    {cards.map((card) => (
      <GalleryPhotoCard
        key={card.id}
        image={card.image}
        title={card.title}
        count={card.count}
        size={card.size || "medium"}
        className="w-full h-[220px] md:h-[300px] lg:h-[400px]"
        onClick={() => navigate(`/gallery/${catKey}/all`)}
      />
    ))}
  </div>
);

// ─── Nature section: 2 tall + 2 medium ───────────────────────────────────────

const NatureGrid = ({ cards, navigate, catKey }) => {
  const [cardA, cardB, cardC, cardD] = cards;
  return (
    <>
      {/* Mobile/tablet */}
      <div className="grid grid-cols-2 gap-[16px] lg:hidden">
        {cards.map((card) => (
          <GalleryPhotoCard
            key={card.id}
            image={card.image}
            title={card.title}
            count={card.count}
            size="medium"
            className="w-full h-[220px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        ))}
      </div>
      {/* Desktop */}
      <div className="hidden lg:flex gap-[24px] items-start w-full">
        <GalleryPhotoCard
          image={cardA?.image}
          title={cardA?.title}
          count={cardA?.count}
          size="large"
          className="w-[335px] h-[663px]"
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
        <div className="flex flex-col gap-[24px] flex-1">
          <GalleryPhotoCard
            image={cardB?.image}
            title={cardB?.title}
            count={cardB?.count}
            size="medium"
            className="w-full h-[568px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
          <GalleryPhotoCard
            image={cardC?.image}
            title={cardC?.title}
            count={cardC?.count}
            size="medium"
            className="w-full h-[568px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        </div>
        <GalleryPhotoCard
          image={cardD?.image}
          title={cardD?.title}
          count={cardD?.count}
          size="large"
          className="w-[335px] h-[663px]"
          onClick={() => navigate(`/gallery/${catKey}/all`)}
        />
      </div>
    </>
  );
};

// ─── Culture bento grid ───────────────────────────────────────────────────────

const CultureBentoGrid = ({ cards, navigate, catKey }) => {
  const [c1, c2, c3, c4, c5, c6, c7] = cards;
  return (
    <>
      {/* Mobile/tablet: 2-col grid */}
      <div className="grid grid-cols-2 gap-[16px] lg:hidden">
        {cards.map((card) => (
          <GalleryPhotoCard
            key={card.id}
            image={card.image}
            title={card.title}
            count={card.count}
            size="medium"
            className="w-full h-[200px]"
            onClick={() => navigate(`/gallery/${catKey}/all`)}
          />
        ))}
      </div>
      {/* Desktop: 3-col bento */}
      <div className="hidden lg:flex gap-[24px] items-start w-full">
        {/* Col 1: medium + small pair */}
        <div className="flex flex-col gap-[24px]" style={{ width: 338 }}>
          <GalleryPhotoCard image={c1?.image} title={c1?.title} count={c1?.count} size="medium" className="w-full h-[568px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
          <div className="flex gap-[14px]">
            <GalleryPhotoCard image={c2?.image} title={c2?.title} size="small" className="w-[162px] h-[197px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
            <GalleryPhotoCard image={c3?.image} title={c3?.title} size="small" className="w-[162px] h-[197px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
          </div>
        </div>
        {/* Col 2: large (tall) */}
        <GalleryPhotoCard image={c4?.image} title={c4?.title} count={c4?.count} size="large" className="h-[663px]" style={{ width: 335 }} onClick={() => navigate(`/gallery/${catKey}/all`)} />
        {/* Col 3: small pair + medium */}
        <div className="flex flex-col gap-[24px]" style={{ width: 338 }}>
          <div className="flex gap-[14px]">
            <GalleryPhotoCard image={c5?.image} title={c5?.title} size="small" className="w-[162px] h-[197px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
            <GalleryPhotoCard image={c6?.image} title={c6?.title} size="small" className="w-[162px] h-[197px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
          </div>
          <GalleryPhotoCard image={c7?.image} title={c7?.title} count={c7?.count} size="medium" className="w-full h-[568px]" onClick={() => navigate(`/gallery/${catKey}/all`)} />
        </div>
      </div>
    </>
  );
};

// ─── Section renderer ─────────────────────────────────────────────────────────

const CategorySectionBlock = ({ catKey, navigate }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  const renderCards = () => {
    switch (catKey) {
      case "destinations":
        return <DestinationsBentoGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "nature":
        return <NatureGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "culture":
        return <CultureBentoGrid cards={data.cards} navigate={navigate} catKey={catKey} />;
      case "videos":
        return <VideosSectionCards cards={data.cards} navigate={navigate} catKey={catKey} />;
      default:
        // activities, partners, captured-by-you: standard grid
        return <StandardPhotoGrid cards={data.cards} navigate={navigate} catKey={catKey} cols={catKey === "activities" ? 3 : Math.min(data.cards.length, 4)} />;
    }
  };

  return (
    <section className={classNames("w-full py-10 lg:py-[80px]", data.bg)}>
      <div className="px-4 md:px-8 lg:px-[156px]">
        <SectionHeader
          label={data.label}
          title={data.title}
          description={data.description}
          onExplore={() => navigate(`/gallery/${catKey}/all`)}
        />
        {renderCards()}
      </div>
    </section>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

const GalleryCategorySection = React.forwardRef(({
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

GalleryCategorySection.displayName = "GalleryCategorySection";
export default GalleryCategorySection;
