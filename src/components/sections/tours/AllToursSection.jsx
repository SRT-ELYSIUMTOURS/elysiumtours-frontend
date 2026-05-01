import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import PopularTourCard from "../../cards/PopularTourCard";

// ── Figma: 1914:41067 — "All Tours" listing section (Tours country page)
// Structure:
//   Header: "{N} tours in {country}" label LEFT | "SORT" + dropdown RIGHT
//   Body:   3-row × 4-col grid of PopularTourCard (12 cards per page)
//   Footer: centred "Load More" button
//
// Dimensions: 1728×2201px, py-[80px], px-[148px]
// Cards: gap-x-[8px] gap-y-[20px], each 351×615px
// Load More: 169×56px, bg #fefefe, border #7b2cbf, rounded-[40px], mt-[32px]

// ── Inline chevron for sort dropdown (Hicon/Linear/Down2) ─────────────────────
const ChevronDownIcon = ({ open = false }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={classNames("shrink-0 transition-transform duration-200", open ? "rotate-180" : "")}
    aria-hidden="true"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#949494"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── Sort options ───────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  "Most Popular",
  "Price: Low to High",
  "Price: High to Low",
  "Highest Rated",
  "Newest First",
];

// ── Tour data — 12 Ghana placeholder tours (3 rows × 4 cols) ──────────────────
// statusBadge colours: #027920 (New Tour), #940a02 (Fully Booked), #b28f05 (Limited)
const GHANA_TOURS = [
  // ── Row 1 ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    image: "https://picsum.photos/seed/at-ghana-1/351/373",
    location: "Cape Coast/Central Region",
    duration: { class: "Multi-Day", span: "3 Days/2 Nights" },
    maxGroupSize: 12,
    pickupIncluded: true,
    tags: ["Cultural", "Diaspora"],
    rating: 4.9,
    title: "Elmina Heritage & Coastal Journey Tour",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    country: "ghana",
    slug: "elmina-heritage-coastal-journey",
    statusBadge: { label: "New Tour", color: "#027920" },
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/at-ghana-2/351/373",
    location: "Accra/Greater Accra",
    duration: { class: "Multi-Day", span: "4 Days/3 Nights" },
    maxGroupSize: 20,
    pickupIncluded: true,
    tags: ["Business", "Executive"],
    rating: 4.8,
    title: "Accra Corporate Executive Tour",
    availabilityBadge: "Opened Daily",
    price: "USD 1,200",
    country: "ghana",
    slug: "accra-corporate-executive-tour",
    statusBadge: { label: "Corporate", color: "#7b2cbf" },
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/at-ghana-3/351/373",
    location: "Kumasi/Ashanti Region",
    duration: { class: "Multi-Day", span: "2 Days/1 Night" },
    maxGroupSize: 10,
    pickupIncluded: true,
    tags: ["Cultural", "Food"],
    rating: 4.7,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
    country: "ghana",
    slug: "kumasi-heritage-market-discovery",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/at-ghana-4/351/373",
    location: "Volta Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 8,
    pickupIncluded: false,
    tags: ["Nature", "Scenic"],
    rating: 4.9,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
    country: "ghana",
    slug: "wli-waterfalls-nature-exploration",
  },

  // ── Row 2 ─────────────────────────────────────────────────────────────────
  {
    id: 5,
    image: "https://picsum.photos/seed/at-ghana-5/351/373",
    location: "Central Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 20,
    pickupIncluded: true,
    tags: ["Adventure", "Nature"],
    rating: 4.6,
    title: "Canopy Bridges & Adventure at Kakum",
    availabilityBadge: "Opened Daily",
    price: "Ghs.350.00",
    country: "ghana",
    slug: "canopy-bridges-kakum",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/at-ghana-6/351/373",
    location: "Cape Coast/Ghana",
    duration: { class: "Multi-Day", span: "4 Days/3 Nights" },
    maxGroupSize: 12,
    pickupIncluded: false,
    tags: ["Diaspora", "Heritage"],
    rating: 5.0,
    title: "Legacy & Return — Diaspora Experience",
    availabilityBadge: "Opened Daily",
    price: "Ghs.750.00",
    country: "ghana",
    slug: "legacy-return-diaspora-experience",
    statusBadge: { label: "Limited Slots", color: "#b28f05" },
  },
  {
    id: 7,
    image: "https://picsum.photos/seed/at-ghana-7/351/373",
    location: "Northern Region/Ghana",
    duration: { class: "Multi-Day", span: "3 Days" },
    maxGroupSize: 10,
    pickupIncluded: false,
    tags: ["Eco", "Adventure"],
    rating: 4.9,
    featureType: "eco",
    featureLabel: "Eco-Certified",
    title: "Mole National Park Safari",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
    country: "ghana",
    slug: "mole-national-park-safari",
    // Fully Booked — dark red badge (Figma #940a02)
    statusBadge: { label: "Fully-Booked", color: "#940a02" },
  },
  {
    id: 8,
    image: "https://picsum.photos/seed/at-ghana-8/351/373",
    location: "Eastern Region/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 8,
    pickupIncluded: true,
    tags: ["Cultural", "Leisure"],
    rating: 4.7,
    title: "Boti Falls & Umbrella Rock Day Trip",
    availabilityBadge: "Opened Daily",
    price: "Ghs.300.00",
    country: "ghana",
    slug: "boti-falls-umbrella-rock",
  },

  // ── Row 3 ─────────────────────────────────────────────────────────────────
  {
    id: 9,
    image: "https://picsum.photos/seed/at-ghana-9/351/373",
    location: "Greater Accra/Ghana",
    duration: { class: "Multi-Day", span: "2 Days/1 Night" },
    maxGroupSize: 15,
    pickupIncluded: true,
    tags: ["Business", "Heritage"],
    rating: 4.8,
    featureType: "business",
    featureLabel: "Business Class",
    title: "Premium Accra Heritage & Business Tour",
    availabilityBadge: "Opened Daily",
    price: "Ghs.600.00",
    country: "ghana",
    slug: "premium-accra-heritage-business",
  },
  {
    id: 10,
    image: "https://picsum.photos/seed/at-ghana-10/351/373",
    location: "Upper East/Ghana",
    duration: { class: "Multi-Day", span: "5 Days/4 Nights" },
    maxGroupSize: 12,
    pickupIncluded: false,
    tags: ["Cultural", "Adventure"],
    rating: 4.6,
    title: "Bolgatanga Arts, Crafts & Paga Crocodile",
    availabilityBadge: "Opened Daily",
    price: "Ghs.850.00",
    country: "ghana",
    slug: "bolgatanga-arts-crafts-paga",
  },
  {
    id: 11,
    image: "https://picsum.photos/seed/at-ghana-11/351/373",
    location: "Brong-Ahafo/Ghana",
    duration: { class: "Day Tour", span: "1 Day" },
    maxGroupSize: 10,
    pickupIncluded: true,
    tags: ["Nature", "Scenic"],
    rating: 4.8,
    title: "Kintampo Falls & Rock Village Tour",
    availabilityBadge: "Opened Daily",
    price: "Ghs.320.00",
    country: "ghana",
    slug: "kintampo-falls-rock-village",
  },
  {
    id: 12,
    image: "https://picsum.photos/seed/at-ghana-12/351/373",
    location: "Western Region/Ghana",
    duration: { class: "Multi-Day", span: "3 Days/2 Nights" },
    maxGroupSize: 8,
    pickupIncluded: false,
    tags: ["Heritage", "Nature"],
    rating: 4.9,
    title: "Cape Three Points & Coastal Heritage",
    availabilityBadge: "Opened Daily",
    price: "Ghs.550.00",
    country: "ghana",
    slug: "cape-three-points-coastal-heritage",
    statusBadge: { label: "New Tour", color: "#027920" },
  },
];

// ── AllToursSection ────────────────────────────────────────────────────────────
// Figma 1914:41067 — full tours listing for a country page
// bg: #fefefe, py-[80px], px-[148px]
const AllToursSection = React.forwardRef(({ country = "Ghana", tourCount = 10, className, ...props }, ref) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  return (
    <section
      ref={ref}
      className={classNames("w-full py-[80px] bg-secondary-light-default", className)}
      {...props}
    >
      <div className="px-[148px]">

        {/* ── Header row — Figma 1914:41068 ────────────────────────────────── */}
        {/* Left: 46px line + "{N} tours in {country}" | Right: SORT label + dropdown */}
        <div className="flex items-center justify-between w-full mb-[24px]">

          {/* Left: section label — same pattern as SignatureExperiencesSection */}
          <div className="flex items-center gap-[8px] shrink-0">
            {/* 46px decorative line — Figma 1914:41070 */}
            <div className="w-[46px] h-[1px]" style={{ backgroundColor: "#2b0f43" }} />
            {/* "{N} tours in {country}" — Figma 1914:41072, Bold 13px/18px #2b0f43 */}
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "13px",
                fontWeight: 700,
                lineHeight: "18px",
                color:      "#2b0f43",
                padding:    "10px",
              }}
            >
              {tourCount} tours in {country}
            </span>
          </div>

          {/* Right: SORT label + dropdown — Figma 1942:31163 */}
          <div className="flex items-center gap-[12px] shrink-0">
            {/* "SORT" label — Figma 1942:31164, Bold 13px/18px #2b0f43, p-[10px] */}
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "13px",
                fontWeight: 700,
                lineHeight: "18px",
                color:      "#2b0f43",
                padding:    "10px",
              }}
            >
              SORT
            </span>

            {/* Sort dropdown — Figma 1942:31166, 134×44px */}
            {/* border #949494, rounded-[20px], shadow-[0px_4px_20px_rgba(0,0,0,0.05)] */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center justify-center gap-[8px] rounded-[20px] border border-[#949494] px-[10px] py-[10px] transition-colors hover:border-[#7b2cbf]"
                style={{
                  height:    "44px",
                  boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)",
                }}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <span
                  className="flex-1 text-left whitespace-nowrap"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    fontSize:   "13px",
                    fontWeight: 600,
                    lineHeight: "18px",
                    color:      "#949494",
                  }}
                >
                  {selectedSort}
                </span>
                <ChevronDownIcon open={sortOpen} />
              </button>

              {/* Dropdown panel */}
              {sortOpen && (
                <div
                  className="absolute right-0 top-[48px] z-50 bg-white rounded-[12px] border border-[#e9eaeb] overflow-hidden min-w-full"
                  style={{ boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.12)" }}
                  role="listbox"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      role="option"
                      aria-selected={opt === selectedSort}
                      onClick={() => { setSelectedSort(opt); setSortOpen(false); }}
                      className="w-full text-left px-[14px] py-[10px] transition-colors hover:bg-[#f9f5ff]"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize:   "13px",
                        fontWeight: opt === selectedSort ? 600 : 500,
                        lineHeight: "18px",
                        color:      opt === selectedSort ? "#7b2cbf" : "#4a4a4a",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Tour grid — 3 rows × 4 cols, gap-x-[8px] gap-y-[20px] ──────── */}
        {/* Figma 1942:31179: cards 351×615, rows at y=0/635/1270, col spacing=359 */}
        <div className="grid grid-cols-4 gap-x-[8px] gap-y-[20px]">
          {GHANA_TOURS.map((tour) => (
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
              pickupIncluded={tour.pickupIncluded}
              maxGroupSize={tour.maxGroupSize}
              featureType={tour.featureType ?? null}
              featureLabel={tour.featureLabel ?? null}
              statusBadge={tour.statusBadge ?? null}
              country={tour.country}
              tourSlug={tour.slug}
            />
          ))}
        </div>

        {/* ── Load More button — Figma 1942:31174, centred ─────────────────── */}
        {/* 169×56px, bg #fefefe, border #7b2cbf, rounded-[40px], shadow       */}
        <div className="flex justify-center mt-[32px]">
          <button
            type="button"
            className="flex items-center justify-center border border-[#7b2cbf] rounded-[40px] transition-colors hover:bg-[#f9f5ff]"
            style={{
              width:           "169px",
              height:          "56px",
              backgroundColor: "#fefefe",
              boxShadow:       "0px 4px 10px 0px rgba(0,0,0,0.05)",
            }}
          >
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "16px",
                fontWeight: 600,
                lineHeight: "22px",
                color:      "#7b2cbf",
              }}
            >
              Load More
            </span>
          </button>
        </div>

      </div>
    </section>
  );
});

AllToursSection.displayName = "AllToursSection";
export default AllToursSection;
