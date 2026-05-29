import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../../../utils/classNames";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";
import GalleryPhotoCard from "../../cards/GalleryPhotoCard";
import GalleryBecomePartSection from "./GalleryBecomePartSection";
import GalleryCardSkeleton from "./GalleryCardSkeleton";
import GallerySectionEmptyState from "./GallerySectionEmptyState";
import GallerySectionErrorState from "./GallerySectionErrorState";
import {
  fetchOverviewGalleryThunk,
  fetchPartnerGallerySummaryThunk,
  selectOverviewGalleryImages,
  selectPartnerSummary,
  selectOverviewGalleryStatus,
  selectPartnerSummaryStatus,
} from "../../../store/slices/gallerySlice";

// Gallery Category Section — all 7 category sections for the gallery main page
// Each section follows: LEFT eyebrow + RIGHT title/desc/Explore More button
// Layout differs per category (Videos = 3 equal cols, Destinations = bento, etc.)
// Figma nodes: 616:6236 (Videos tab), plus other tab variants

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
    <ExploreMoreArrowIcon />
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
// image fields intentionally null — real images are injected from the API via mergeRealCards.

const CATEGORY_DATA = {
  destinations: {
    label: "DESTINATIONS",
    bg: "bg-primary-light-default",
    title: "Where Will Your Next Adventure Take You?",
    description: "Explore iconic destinations across Ghana and West Africa — from historic castles and lush national parks to vibrant cities and serene beaches. Each photo captures the spirit of a place waiting to be discovered.",
    cards: [
      { id: 1, image: null, title: "Cape Coast", count: "", size: "large" },
      { id: 2, image: null, title: "Kakum Park", count: "", size: "medium" },
      { id: 3, image: null, title: "Elmina", count: "", size: "small" },
      { id: 4, image: null, title: "Mole", count: "", size: "small" },
      { id: 5, image: null, title: "Accra", count: "", size: "large" },
      { id: 6, image: null, title: "Volta", count: "", size: "small" },
      { id: 7, image: null, title: "Kumasi", count: "", size: "small" },
      { id: 8, image: null, title: "Ada Foah", count: "", size: "medium" },
    ],
  },
  activities: {
    label: "ACTIVITIES",
    bg: "bg-secondary-light-default",
    title: "Exciting Activities for Every Kind of Traveler",
    description: "From thrilling canopy walks and surfing to cultural drumming and guided tours, Ghana offers activities that energize every explorer. Browse real moments captured during our most unforgettable tours.",
    cards: [
      { id: 1, image: null, title: "Canopy Walk", count: "", size: "medium" },
      { id: 2, image: null, title: "Surfing", count: "", size: "medium" },
      { id: 3, image: null, title: "Drumming", count: "", size: "medium" },
      { id: 4, image: null, title: "Boat Tours", count: "", size: "medium" },
      { id: 5, image: null, title: "Safari", count: "", size: "medium" },
      { id: 6, image: null, title: "Cooking", count: "", size: "medium" },
    ],
  },
  nature: {
    label: "NATURE",
    bg: "bg-primary-light-default",
    title: "Ghana's Breathtaking Natural Wonders",
    description: "Lush rainforests, golden savannahs, cascading waterfalls, and pristine coastlines — Ghana's natural beauty is truly awe-inspiring. These photos capture the country's diverse ecosystems in their full glory.",
    cards: [
      { id: 1, image: null, title: "Boti Falls", count: "", size: "medium" },
      { id: 2, image: null, title: "Wli Falls", count: "", size: "large" },
      { id: 3, image: null, title: "Kakum Forest", count: "", size: "medium" },
      { id: 4, image: null, title: "Mole National Park", count: "", size: "medium" },
      { id: 5, image: null, title: "Shai Hills", count: "", size: "medium" },
      { id: 6, image: null, title: "Lake Bosumtwi", count: "", size: "medium" },
      { id: 7, image: null, title: "Bui National Park", count: "", size: "large" },
    ],
  },
  culture: {
    label: "CULTURE",
    bg: "bg-secondary-light-default",
    title: "Rich Traditions, Vibrant Celebrations",
    description: "Experience the colors, rhythms, and stories of Ghanaian culture — from royal durbars and kente weaving to vibrant festivals and traditional ceremonies. Culture is at the heart of every Ghanaian experience.",
    cards: [
      { id: 1, image: null, title: "Traditional Dance", count: "", size: "large" },
      { id: 2, image: null, title: "Kente Weaving", count: "", size: "medium" },
      { id: 3, image: null, title: "Festivals", count: "", size: "medium" },
      { id: 4, image: null, title: "Royal Durbars", count: "", size: "large" },
      { id: 5, image: null, title: "Markets", count: "", size: "medium" },
      { id: 6, image: null, title: "Craft & Artisans", count: "", size: "medium" },
    ],
  },
  videos: {
    label: "VIDEOS",
    bg: "bg-secondary-light-default",
    title: "See Ghana Through Real Traveler Stories",
    description: "Watch captivating short videos showcasing real moments from tours across Ghana — the landscapes, cultures, food, and excitement that make each experience unique. Feel the energy of the journey before you even set foot on the road.",
    cards: [],
  },
  partners: {
    label: "PARTNERS",
    bg: "bg-primary-light-default",
    title: "Trusted Partners for Smooth Travel",
    description: "We collaborate with reliable local tour operators, hotels, guides, and transport providers to ensure every traveler enjoys quality service and safe, well-planned adventures.",
    cards: [
      { id: 1, image: null, title: "Hotels", count: "", size: "medium" },
      { id: 2, image: null, title: "Hotels", count: "", size: "medium" },
      { id: 3, image: null, title: "Transportation", count: "", size: "large" },
      { id: 4, image: null, title: "Tour Partners", count: "", size: "medium" },
      { id: 5, image: null, title: "Restaurants", count: "", size: "medium" },
    ],
  },
  "captured-by-you": {
    label: "CAPTURED BY YOU",
    bg: "bg-secondary-light-default",
    title: "Your Lens, Your Story",
    description: "These are your moments — photos submitted by travelers just like you who fell in love with Ghana. Upload your own travel photos and become part of our growing community gallery.",
    cards: [],
  },
};

// ─── Skeleton grid for loading state ─────────────────────────────────────────

const SKELETON_COUNTS = { destinations: 8, activities: 6, nature: 6, culture: 6, partners: 4 };

const SectionSkeletonGrid = ({ catKey }) => {
  const count = SKELETON_COUNTS[catKey] ?? 6;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[22px] w-full">
      {Array.from({ length: count }).map((_, i) => (
        <GalleryCardSkeleton key={i} className="aspect-[4/5]" />
      ))}
    </div>
  );
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

// How many cards each section grid expects
const SECTION_CARD_COUNTS = {
  destinations: 8,
  activities: 6,
  nature: 7,
  culture: 6,
};

// Map live highlight images (from API) into CATEGORY_DATA card slots,
// replacing only image + title so grid layouts and aspect ratios are preserved.
function mergeRealCards(staticCards, liveImages, limit) {
  if (!liveImages || liveImages.length === 0) return staticCards;
  const sliced = liveImages.slice(0, limit ?? staticCards.length);
  return staticCards.map((card, i) => {
    const live = sliced[i];
    if (!live) return card;
    return { ...card, image: live.image, title: live.title };
  });
}

// Derive partner cards from the partner summary API response.
// PartnersGrid positional slots: [hotelTop, hotelBot, transportation, tourPartners, restaurants]
function mapPartnerSummaryToCards(summary) {
  if (!summary || summary.length === 0) return null;
  const staticSizes = ["medium", "medium", "large", "medium", "medium"];
  return summary.slice(0, 5).map((p, i) => ({
    id: i + 1,
    image: p.coverImage,
    title: p.label,
    count: `${p.count} Partners`,
    size: staticSizes[i],
  }));
}

// Pick live images for a given section key from the full overview list.
function filterImagesForSection(allImages, sectionKey) {
  if (!allImages || allImages.length === 0) return [];
  if (sectionKey === "destinations") return allImages; // all highlights are destinations
  return allImages.filter(
    (img) => Array.isArray(img.gallerySections) && img.gallerySections.includes(sectionKey)
  );
}

// ─── Destinations bento grid layout ──────────────────────────────────────────
// Figma: 4 columns (335 / 338 / 335 / 338), staggered tops — cols 1 & 3 start ~42px lower.
// Implemented with flex + proportional flex-grow (no absolute / no fixed outer height).
// Card heights follow width via aspect-ratio so the strip scales fluidly.

const DEST_COL_GROW = [335, 338, 335, 338];

const DestinationsBentoGrid = ({ cards, navigate, catKey }) => {
  const [cardA, cardB, cardC, cardD, cardE, cardF, cardG, cardH] = cards;
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div className="flex w-full flex-col gap-8 xl:flex-row xl:items-start xl:gap-[clamp(12px,1.7vw,24px)]">
      {/* Col A — tall (starts lower than B/D) */}
      <div
        className="flex min-w-0 w-full flex-col"
        style={{ flex: `${DEST_COL_GROW[0]} 1 0%` }}
      >
        <div className="hidden shrink-0 xl:block xl:h-[clamp(24px,3.6vw,42px)]" aria-hidden />
        <GalleryPhotoCard
          image={cardA?.image}
          title={cardA?.title}
          count={cardA?.count}
          size="large"
          className="w-full aspect-335/663"
          onClick={go}
        />
      </div>

      {/* Col B — medium + small pair */}
      <div
        className="flex min-w-0 w-full flex-col gap-[clamp(20px,3vw,36px)]"
        style={{ flex: `${DEST_COL_GROW[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={cardB?.image}
          title={cardB?.title}
          count={cardB?.count}
          size="medium"
          className="w-full aspect-338/568"
          onClick={go}
        />
        <div className="flex gap-[clamp(8px,1vw,14px)]">
          <GalleryPhotoCard
            image={cardC?.image}
            title={cardC?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
          <GalleryPhotoCard
            image={cardD?.image}
            title={cardD?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
        </div>
      </div>

      {/* Col C — tall */}
      <div
        className="flex min-w-0 w-full flex-col"
        style={{ flex: `${DEST_COL_GROW[2]} 1 0%` }}
      >
        <div className="hidden shrink-0 xl:block xl:h-[clamp(24px,3.6vw,42px)]" aria-hidden />
        <GalleryPhotoCard
          image={cardE?.image}
          title={cardE?.title}
          count={cardE?.count}
          size="large"
          className="w-full aspect-335/663"
          onClick={go}
        />
      </div>

      {/* Col D — small pair + medium */}
      <div
        className="flex min-w-0 w-full flex-col gap-[clamp(20px,3vw,33px)]"
        style={{ flex: `${DEST_COL_GROW[3]} 1 0%` }}
      >
        <div className="flex gap-[clamp(8px,1vw,14px)]">
          <GalleryPhotoCard
            image={cardF?.image}
            title={cardF?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
          <GalleryPhotoCard
            image={cardG?.image}
            title={cardG?.title}
            size="small"
            className="min-w-0 flex-1 aspect-162/197"
            onClick={go}
          />
        </div>
        <GalleryPhotoCard
          image={cardH?.image}
          title={cardH?.title}
          count={cardH?.count}
          size="medium"
          className="w-full aspect-338/568"
          onClick={go}
        />
      </div>
      </div>
  );
};

// ─── Standard photo grid (activities / partners / captured-by-you) ────────────
// Figma (activities): gap 27px — row1: 363+363+629 (=1409) @371px; row2: 753+302+307 + gaps (=1416) @415px.
// Per-card aspect ratios make row heights differ (wide vs narrow columns). Lock each row with one
// aspect-[totalWidth/rowHeight] on the row flex + flex-weighted cells + h-full cards.

const STANDARD_GRID_GAP = "gap-[27px]";

const ActivitiesSixGrid = ({ cards, navigate, catKey }) => {
  const [a, b, c, d, e, f] = cards;
  const go = () => navigate(`/gallery/${catKey}/all`);

  const Card = ({ card, className }) =>
    card ? (
      <GalleryPhotoCard
        key={card.id}
        image={card.image}
        title={card.title}
        count={card.count}
        size="medium"
        className={classNames("min-h-0 w-full", className)}
        onClick={go}
      />
    ) : null;

  const RowCell = ({ card, weight }) => (
    <div className="flex min-h-0 min-w-0 flex-col" style={{ flex: `${weight} 1 0%` }}>
      <Card card={card} className="h-full min-h-0" />
    </div>
  );

  return (
    <>
      <div className={classNames("flex flex-col xl:hidden", STANDARD_GRID_GAP)}>
        {[a, b, c, d, e, f].filter(Boolean).map((card) => (
          <Card key={card.id} card={card} className="aspect-629/371" />
        ))}
      </div>

      <div className={classNames("hidden flex-col xl:flex", STANDARD_GRID_GAP)}>
        <div className="flex min-h-0 w-full items-stretch gap-[27px] aspect-[1409/371]">
          <RowCell card={a} weight={363} />
          <RowCell card={b} weight={363} />
          <RowCell card={c} weight={629} />
        </div>
        <div className="flex min-h-0 w-full items-stretch gap-[27px] aspect-[1416/415]">
          <RowCell card={d} weight={753} />
          <RowCell card={e} weight={302} />
          <RowCell card={f} weight={307} />
        </div>
      </div>
    </>
  );
};

/** Four cards: two-row brick (6+6 / 6+6) — row1 uses activities row1 height ratio, row2 row2 ratio */
const StandardFourGrid = ({ cards, navigate, catKey }) => {
  const go = () => navigate(`/gallery/${catKey}/all`);
  return (
    <div
      className={classNames(
        "grid w-full grid-cols-1",
        STANDARD_GRID_GAP,
        "xl:grid-cols-12"
      )}
    >
      {cards.map((card, index) => (
        <GalleryPhotoCard
          key={card.id}
          image={card.image}
          title={card.title}
          count={card.count}
          size="medium"
          className={classNames(
            "min-w-0 w-full xl:col-span-6",
            index < 2 ? "aspect-629/371" : "aspect-753/415"
          )}
          onClick={go}
        />
      ))}
    </div>
  );
};

const StandardPhotoGrid = ({ cards, navigate, catKey }) => {
  const n = cards?.length ?? 0;
  if (n === 6) {
    return <ActivitiesSixGrid cards={cards} navigate={navigate} catKey={catKey} />;
  }
  if (n === 4) {
    return <StandardFourGrid cards={cards} navigate={navigate} catKey={catKey} />;
  }

  const go = () => navigate(`/gallery/${catKey}/all`);
  return (
    <div
      className={classNames("grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", STANDARD_GRID_GAP)}
    >
      {cards.map((card) => (
        <GalleryPhotoCard
          key={card.id}
          image={card.image}
          title={card.title}
          count={card.count}
          size={card.size || "medium"}
          className={classNames(
            "min-w-0 w-full",
            card.size === "large" && "aspect-335/663",
            card.size === "small" && "aspect-162/197 max-w-[162px]",
            (!card.size || card.size === "medium") && "aspect-335/568"
          )}
          onClick={go}
        />
      ))}
    </div>
  );
};

// ─── Nature — Figma: 3 columns 457 / 458 / 463, gap 22px.
// Col1: small + large (419 + 48gap + 734); Col2: three mediums (392 + 12 + 392 + 12 + 392);
// Col3: small + large (433 + 34gap + 734). Cards array is column-major (7 items).

const NATURE_COL_FR = [457, 458, 463];

const NatureGrid = ({ cards, navigate, catKey }) => {
  const [
    col1Top,
    col1Bottom,
    col2Top,
    col2Mid,
    col2Bottom,
    col3Top,
    col3Bottom,
  ] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row xl:items-start"
      )}
    >
      {/* Column 1 — 2 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[48px]"
        style={{ flex: `${NATURE_COL_FR[0]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col1Top?.image}
          title={col1Top?.title}
          count={col1Top?.count}
          size="medium"
          className="w-full aspect-457/419 min-h-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col1Bottom?.image}
          title={col1Bottom?.title}
          count={col1Bottom?.count}
          size="large"
          className="w-full aspect-457/734 min-h-0"
          onClick={go}
        />
      </div>

      {/* Column 2 — 3 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[12px]"
        style={{ flex: `${NATURE_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col2Top?.image}
          title={col2Top?.title}
          count={col2Top?.count}
          size="medium"
          className="w-full aspect-458/392 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col2Mid?.image}
          title={col2Mid?.title}
          count={col2Mid?.count}
          size="medium"
          className="w-full aspect-458/392 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col2Bottom?.image}
          title={col2Bottom?.title}
          count={col2Bottom?.count}
          size="medium"
          className="w-full aspect-457/392 shrink-0"
          onClick={go}
        />
      </div>

      {/* Column 3 — 2 cards */}
      <div
        className="flex min-w-0 w-full flex-col gap-[34px]"
        style={{ flex: `${NATURE_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={col3Top?.image}
          title={col3Top?.title}
          count={col3Top?.count}
          size="medium"
          className="w-full aspect-463/433 min-h-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={col3Bottom?.image}
          title={col3Bottom?.title}
          count={col3Bottom?.count}
          size="large"
          className="w-full aspect-458/734 min-h-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Culture — Figma: 1415×743, cols 340 | 341 | 340 | 341, gap ~21px; outer cols one tall
// (340×653, top offset ~45px ⇒ vertically centred via items-center); inner cols two squares 341×364 + gap 15px.

const CULTURE_COL_FR = [340, 341, 340, 341];

const CultureGrid = ({ cards, navigate, catKey }) => {
  const [tallLeft, stack2Top, stack2Bot, tallMid, stack4Top, stack4Bot] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[21px]",
        "xl:flex-row xl:items-center"
      )}
    >
      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${CULTURE_COL_FR[0]} 1 0%` }}>
        <GalleryPhotoCard
          image={tallLeft?.image}
          title={tallLeft?.title}
          count={tallLeft?.count}
          size="large"
          className="w-full aspect-340/653 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${CULTURE_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={stack2Top?.image}
          title={stack2Top?.title}
          count={stack2Top?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={stack2Bot?.image}
          title={stack2Bot?.title}
          count={stack2Bot?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
      </div>

      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${CULTURE_COL_FR[2]} 1 0%` }}>
        <GalleryPhotoCard
          image={tallMid?.image}
          title={tallMid?.title}
          count={tallMid?.count}
          size="large"
          className="w-full aspect-340/653 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${CULTURE_COL_FR[3]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={stack4Top?.image}
          title={stack4Top?.title}
          count={stack4Top?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={stack4Bot?.image}
          title={stack4Bot?.title}
          count={stack4Bot?.count}
          size="medium"
          className="w-full aspect-341/364 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Captured by you — Figma: 1416px row, cols 366 | 357 | 314 | 314, gap 22px.
// Col2 stack gap 24px (319+319); Nature 366×743 (row height); cols 3–4 are 314×658 —
// Tour Partners bottom-aligned, Culture top-aligned within the stretched row.

const CAPTURED_COL_FR = [366, 357, 314, 314];

const CapturedByYouGrid = ({ cards, navigate, catKey }) => {
  const [nature, destinations, activities, tourPartners, culture] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row  xl:items-center xl:gap-[22px]"
      )}
    >
      <div
        className="flex min-w-0 w-full flex-col gap-[24px]"
        style={{ flex: `${CAPTURED_COL_FR[1]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={destinations?.image}
          title={destinations?.title}
          count={destinations?.count}
          size="medium"
          className="w-full aspect-357/319 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={activities?.image}
          title={activities?.title}
          count={activities?.count}
          size="medium"
          className="w-full aspect-357/319 shrink-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col justify-end"
        style={{ flex: `${CAPTURED_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={tourPartners?.image}
          title={tourPartners?.title}
          count={tourPartners?.count}
          size="medium"
          className="w-full aspect-314/658 shrink-0"
          onClick={go}
        />
      </div>

      <div className="min-w-0 w-full" style={{ flex: `${CAPTURED_COL_FR[0]} 1 0%` }}>
        <GalleryPhotoCard
          image={nature?.image}
          title={nature?.title}
          count={nature?.count}
          size="large"
          className="w-full aspect-366/743 min-h-0"
          onClick={go}
        />
      </div>

      

     

      <div
        className="flex min-w-0 w-full flex-col justify-start"
        style={{ flex: `${CAPTURED_COL_FR[3]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={culture?.image}
          title={culture?.title}
          count={culture?.count}
          size="medium"
          className="w-full aspect-314/658 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── Partners — Figma: 1416px row, cols 341 | 340 | 691, gap 22px; col1 stack gap 15px (426 + 309);
// col2 Transportation 340×743; col3 wide stack gap 24px (319 + 319).

const PARTNER_COL_FR = [341, 340, 691];

const PartnersGrid = ({ cards, navigate, catKey }) => {
  const [hotelTop, hotelBot, transportation, tourPartners, restaurants] = cards ?? [];
  const go = () => navigate(`/gallery/${catKey}/all`);

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-[22px]",
        "xl:flex-row xl:items-center xl:gap-[22px]"
      )}
    >
      <div
        className="flex min-w-0 w-full flex-col gap-[15px]"
        style={{ flex: `${PARTNER_COL_FR[0]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={hotelTop?.image}
          title={hotelTop?.title}
          count={hotelTop?.count}
          size="medium"
          className="w-full aspect-341/426 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={hotelBot?.image}
          title={hotelBot?.title}
          count={hotelBot?.count}
          size="medium"
          className="w-full aspect-341/309 shrink-0"
          onClick={go}
        />
      </div>

      <div className="flex min-w-0 w-full justify-center" style={{ flex: `${PARTNER_COL_FR[1]} 1 0%` }}>
        <GalleryPhotoCard
          image={transportation?.image}
          title={transportation?.title}
          count={transportation?.count}
          size="large"
          className="w-full aspect-340/743 min-h-0"
          onClick={go}
        />
      </div>

      <div
        className="flex min-w-0 w-full flex-col gap-[24px]"
        style={{ flex: `${PARTNER_COL_FR[2]} 1 0%` }}
      >
        <GalleryPhotoCard
          image={tourPartners?.image}
          title={tourPartners?.title}
          count={tourPartners?.count}
          size="medium"
          className="w-full aspect-691/319 shrink-0"
          onClick={go}
        />
        <GalleryPhotoCard
          image={restaurants?.image}
          title={restaurants?.title}
          count={restaurants?.count}
          size="medium"
          className="w-full aspect-691/319 shrink-0"
          onClick={go}
        />
      </div>
    </div>
  );
};

// ─── "Coming Soon" state for videos / captured-by-you ────────────────────────

const ComingSoonState = () => (
  <div className="flex flex-col items-center justify-center py-[72px] gap-[16px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.5" />
      <path d="M12 8v4l2.5 2.5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <p className="font-raleway font-semibold text-[16px] leading-[22px] text-[#b9b9b9]">Coming Soon</p>
    <p className="font-raleway font-normal text-[14px] leading-[22px] text-[#b9b9b9] text-center max-w-[280px]">
      We're working on it — check back soon.
    </p>
  </div>
);

// ─── Section renderer ─────────────────────────────────────────────────────────

const CategorySectionBlock = ({ catKey, navigate, liveCards, status, onRetry }) => {
  const data = CATEGORY_DATA[catKey];
  if (!data) return null;

  const isLoading = status === "loading" || status === "idle";
  const isError = status === "failed";
  const hasLive = liveCards && liveCards.length > 0;

  const renderContent = () => {
    // These categories have no API data source yet
    if (catKey === "videos" || catKey === "captured-by-you") {
      return <ComingSoonState />;
    }
    if (isLoading) {
      return <SectionSkeletonGrid catKey={catKey} />;
    }
    if (isError) {
      return <GallerySectionErrorState onRetry={onRetry} />;
    }
    if (!hasLive) {
      return <GallerySectionEmptyState />;
    }

    const resolvedCards = mergeRealCards(
      data.cards,
      liveCards,
      SECTION_CARD_COUNTS[catKey] ?? data.cards.length
    );

    switch (catKey) {
      case "destinations":
        return <DestinationsBentoGrid cards={resolvedCards} navigate={navigate} catKey={catKey} />;
      case "nature":
        return <NatureGrid cards={resolvedCards} navigate={navigate} catKey={catKey} />;
      case "culture":
        return <CultureGrid cards={resolvedCards} navigate={navigate} catKey={catKey} />;
      case "partners":
        return <PartnersGrid cards={resolvedCards} navigate={navigate} catKey={catKey} />;
      default:
        return <StandardPhotoGrid cards={resolvedCards} navigate={navigate} catKey={catKey} />;
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
        {renderContent()}
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
  const dispatch = useDispatch();
  const overviewImages = useSelector(selectOverviewGalleryImages);
  const partnerSummary = useSelector(selectPartnerSummary);
  const overviewStatus = useSelector(selectOverviewGalleryStatus);
  const partnerSummaryStatus = useSelector(selectPartnerSummaryStatus);

  useEffect(() => {
    dispatch(fetchOverviewGalleryThunk());
    dispatch(fetchPartnerGallerySummaryThunk());
  }, [dispatch]);

  const getLiveCards = (catKey) => {
    if (catKey === "videos" || catKey === "captured-by-you") return null;
    if (catKey === "partners") return mapPartnerSummaryToCards(partnerSummary);
    return filterImagesForSection(overviewImages, catKey);
  };

  const getStatus = (catKey) => {
    if (catKey === "videos" || catKey === "captured-by-you") return "idle";
    if (catKey === "partners") return partnerSummaryStatus;
    return overviewStatus;
  };

  const handleRetry = (catKey) => {
    if (catKey === "partners") dispatch(fetchPartnerGallerySummaryThunk());
    else dispatch(fetchOverviewGalleryThunk());
  };

  return (
    <div ref={ref} className={classNames("w-full bg-secondary-light-default", className)} {...props}>
      {showAll
        ? OVERVIEW_ORDER.map((catKey) => (
            <React.Fragment key={catKey}>
              <CategorySectionBlock
                catKey={catKey}
                navigate={navigate}
                liveCards={getLiveCards(catKey)}
                status={getStatus(catKey)}
                onRetry={() => handleRetry(catKey)}
              />
              {catKey === "captured-by-you" && <GalleryBecomePartSection />}
            </React.Fragment>
          ))
        : category === "captured-by-you" ? (
            <>
              <CategorySectionBlock
                catKey={category}
                navigate={navigate}
                liveCards={getLiveCards(category)}
                status={getStatus(category)}
                onRetry={() => handleRetry(category)}
              />
              <GalleryBecomePartSection />
            </>
          ) : (
            <CategorySectionBlock
              catKey={category}
              navigate={navigate}
              liveCards={getLiveCards(category)}
              status={getStatus(category)}
              onRetry={() => handleRetry(category)}
            />
          )}
    </div>
  );
});

GalleryCategorySection.displayName = "GalleryCategorySection";
export default GalleryCategorySection;
