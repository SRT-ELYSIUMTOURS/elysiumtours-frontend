import React from "react";
import { classNames } from "../../../utils/classNames";
import PopularTourCard from "../../cards/PopularTourCard";

// Figma assets
import sectionLine      from "../../../assets/ElysiumAssets/section-line.svg";
import tourElmina       from "../../../assets/ElysiumAssets/tour-elmina.png";
import tourMoleSafari   from "../../../assets/ElysiumAssets/tour-mole-safari.png";
import tourAccraArts    from "../../../assets/ElysiumAssets/tour-accra-arts.png";
import tourDakarBiz     from "../../../assets/ElysiumAssets/tour-dakar-business.png";

// Figma: 1903-25395 — TourFeaturedSection
// Header: px-[156px], flex justify-between items-start, mb-[60px]
// Grid: px-[148px], grid-cols-4 gap-x-[8px] gap-y-[20px], 4 unique cards × 4 rows = 16 cards

const BASE_TOURS = [
  {
    id: 1,
    image: tourElmina,
    location: "Cape Coast/Ghana",
    rating: 4.9,
    title: "Elmina Heritage & Coastal Journey",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    tags: ["Cultural", "Diaspora", "International"],
    duration: { class: "Multi-Day", span: "3 Days/2 Nights" },
    maxGroupSize: 12,
    featureType: "pickup",
    featureLabel: "Pickup Included",
    statusBadge: { label: "New Tour", color: "#027920" },
    reviewCount: 231,
  },
  {
    id: 2,
    image: tourMoleSafari,
    location: "Northern Region/Ghana",
    rating: 4.8,
    title: "Mole National Park Safari",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
    tags: ["Eco", "Adventure", "Leisure"],
    duration: { class: "Multi-Day", span: "3 Days" },
    maxGroupSize: 10,
    featureType: "eco",
    featureLabel: "Eco-Certified",
    statusBadge: { label: "Fully-Booked", color: "#940a02" },
    reviewCount: 189,
  },
  {
    id: 3,
    image: tourAccraArts,
    location: "Cape Coast/Ghana",
    rating: 4.7,
    title: "Accra Arts, Culture & Food Day",
    availabilityBadge: "Opened Daily",
    price: "Ghs.250.00",
    tags: ["Cultural", "First Time"],
    duration: { class: "Day Tour", span: "8 hours" },
    maxGroupSize: 16,
    featureType: "lunch",
    featureLabel: "Lunch Included",
    statusBadge: null,
    reviewCount: 312,
  },
  {
    id: 4,
    image: tourDakarBiz,
    location: "Dakar, Senegal",
    rating: 4.9,
    title: "Dakar Business & Immersion",
    availabilityBadge: "Opened Daily",
    price: "Ghs.650.00",
    tags: ["Cultural", "Diaspora", "International"],
    duration: { class: "Multi-Day", span: "3 Days" },
    maxGroupSize: 12,
    featureType: "business",
    featureLabel: "Business Included",
    statusBadge: null,
    reviewCount: 145,
  },
];

// 4 unique cards × 4 rows = 16 total
const TOURS = Array.from({ length: 16 }, (_, i) => ({
  ...BASE_TOURS[i % 4],
  id: i + 1,
}));

const TourFeaturedSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      // Figma: bg-[#f2eaf9] (secondary-light-default), pt-[80px] pb-[80px]
      className={classNames("w-full bg-[#f2eaf9] pt-[80px] pb-[80px]", className)}
      {...props}
    >
      {/* ── Section header — px-[156px] ────────────────────────────────────── */}
      <div className="px-[156px] mb-[60px]">
        <div className="flex items-start justify-between w-full">

          {/* Left — line SVG + "FEATURED TOURS" label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <img
              src={sectionLine}
              alt=""
              aria-hidden="true"
              style={{ width: "46px", height: "2px", display: "block" }}
            />
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                lineHeight: "18px",
                color: "#2b0f43",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Featured Tours
            </span>
          </div>

          {/* Right — heading + description, w-[677px], items-end */}
          <div className="flex flex-col gap-[16px] items-end w-[677px]">

            {/* Heading — Raleway Bold 25px/34px #2d2d2d, text-right */}
            <div className="flex items-center justify-end w-full">
              <h2
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "25px",
                  fontWeight: 700,
                  lineHeight: "34px",
                  color: "#2d2d2d",
                  textAlign: "right",
                }}
              >
                Explore Our Most Popular Tours and Experiences
              </h2>
            </div>

            {/* Description — Raleway Regular 16px/24px #2d2d2d, text-right */}
            <div className="flex items-center justify-end w-full">
              <p
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#2d2d2d",
                  textAlign: "right",
                }}
              >
                Ghana is buzzing with spots like Kakum National Park, that canopy walkway is a
                thrill. Cape Coast Castle, super eye-opening on history. Kwame Nkrumah Memorial
                Park in Accra&apos;s topping lists, with over three hundred thousand visitors last
                year alone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards grid — px-[148px] ─────────────────────────────────────────── */}
      {/* Figma: grid-cols-4 gap-x-[8px] gap-y-[20px] */}
      <div className="px-[148px]">
        <div className="grid grid-cols-4 gap-x-[8px] gap-y-[20px]">
          {TOURS.map((tour) => (
            <PopularTourCard
              key={tour.id}
              image={tour.image}
              location={tour.location}
              rating={tour.rating}
              title={tour.title}
              availabilityBadge={tour.availabilityBadge}
              price={tour.price}
              tags={tour.tags}
              duration={tour.duration}
              maxGroupSize={tour.maxGroupSize}
              featureType={tour.featureType}
              featureLabel={tour.featureLabel}
              statusBadge={tour.statusBadge}
              reviewCount={tour.reviewCount}
              className="w-[351px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TourFeaturedSection.displayName = "TourFeaturedSection";
export default TourFeaturedSection;
