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
    country: "ghana",
    tourSlug: "elmina-heritage-coastal-journey",
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
    country: "ghana",
    tourSlug: "mole-national-park-safari",
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
    country: "ghana",
    tourSlug: "accra-arts-culture-food-day",
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
    country: "senegal",
    tourSlug: "dakar-business-immersion",
  },
];

// Show the 4 unique featured tours (no duplication)
const TOURS = BASE_TOURS;

const TourFeaturedSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames(
        "w-full bg-[#f2eaf9] py-10 md:py-16 lg:py-20",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="px-4 md:px-10 lg:px-[156px] mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          {/* Left */}
          <div className="flex items-center gap-2 shrink-0">
            <img src={sectionLine} alt="" className="w-[46px] h-[2px]" />
            <span className="font-bold text-sm text-[#2b0f43] uppercase">
              Featured Tours
            </span>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 w-full md:max-w-[677px] md:items-end">

            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2d2d2d] text-left md:text-right">
              Explore Our Most Popular Tours and Experiences
            </h2>

            <p className="text-sm md:text-base text-[#2d2d2d] text-left md:text-right">
              Ghana is buzzing with spots like Kakum National Park...
            </p>

          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 md:px-10 lg:px-[148px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TOURS.map((tour) => (
            <PopularTourCard
              key={tour.id}
              {...tour}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
});
TourFeaturedSection.displayName = "TourFeaturedSection";

export default TourFeaturedSection;