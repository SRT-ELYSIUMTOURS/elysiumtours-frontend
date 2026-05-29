import React, { useState, useMemo, useEffect } from "react";
import { classNames } from "../../../utils/classNames";
import { deriveTourTags } from "../../../utils/tourTags";
import PopularTourCard from "../../cards/PopularTourCard";
import PopularTourCardSkeleton from "../../cards/PopularTourCardSkeleton";

// ── Figma: 1914:41067 — "All Tours" listing section (Tours country page)
// Structure:
//   Header: "{N} tours in {country}" label LEFT | "SORT" + dropdown RIGHT
//   Body:   4-col grid of PopularTourCard, 8 visible initially
//   Footer: centred "Load More" button (hidden when all tours are shown)

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

const SORT_OPTIONS = [
  "Most Popular",
  "Price: Low to High",
  "Price: High to Low",
  "Highest Rated",
  "Newest First",
];

const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP  = 8;

const AllToursSection = React.forwardRef(
  ({ country = "Ghana", tourCount = 0, tours: toursProp, isLoading = false, className, ...props }, ref) => {
    const [sortOpen,     setSortOpen]     = useState(false);
    const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    // Reset pagination whenever the tours list changes (country nav or filter change)
    useEffect(() => {
      setVisibleCount(INITIAL_VISIBLE);
    }, [toursProp]);

    // Sort raw tour objects before mapping to display format (avoids string-based price sort)
    const sortedRaw = useMemo(() => {
      if (!toursProp?.length) return [];
      const getMinPrice = (t) => {
        const tiers = t.pricingTiers;
        return tiers?.length
          ? Math.min(...tiers.map((tier) => tier.pricePerPerson))
          : (t.basePrice || 0);
      };
      const copy = [...toursProp];
      if (selectedSort === "Price: Low to High") return copy.sort((a, b) => getMinPrice(a) - getMinPrice(b));
      if (selectedSort === "Price: High to Low") return copy.sort((a, b) => getMinPrice(b) - getMinPrice(a));
      if (selectedSort === "Highest Rated")      return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      if (selectedSort === "Newest First")       return copy.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      // "Most Popular" — highest rated first
      return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }, [toursProp, selectedSort]);

    const displayTours = sortedRaw.map((t, i) => {
      const typeMap = { day_tour: "Day Tour", multi_day: "Multi-Day", express: "Express" };
      const typeLabel = typeMap[t.tourType] || t.duration?.class || "Multi-Day";
      const seats = t.remainingCapacity;
      const durationClass = seats != null
        ? `${typeLabel}: ${seats} Seat${seats !== 1 ? "s" : ""} Available`
        : typeLabel;
      const days = t.durationDays;
      const durationSpan = days
        ? (days === 1 ? "1 Day" : `${days} Days/${days - 1} Night${days - 1 !== 1 ? "s" : ""}`)
        : (t.duration?.span || "3 Days");

      const tiers = t.pricingTiers;
      const minPrice = tiers?.length
        ? Math.min(...tiers.map((tier) => tier.pricePerPerson))
        : t.basePrice;
      const currency = t.displayCurrency || "GHS";
      const CURRENCY_SYMBOLS = { USD: "$", GHS: "GHS ", EUR: "€", GBP: "£" };
      const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
      const price = minPrice != null
        ? `${symbol}${Number(minPrice).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
        : t.price || "Contact us";

      return {
        id:                t._id || t.id || i,
        image:             t.coverImage || t.image,
        location:          t.destination?.name
          ? `${t.destination.name}/${t.country || "Ghana"}`
          : (t.location || t.country || country),
        rating:            t.rating || 4.8,
        title:             t.title || t.name || "Tour",
        availabilityBadge: t.availabilityBadge || "Available",
        price,
        tags:              deriveTourTags(t),
        duration:          { class: durationClass, span: durationSpan },
        maxGroupSize:      t.totalCapacity ?? t.maxGroupSize,
        pickupIncluded:    t.pickupIncluded ?? false,
        featureType:       t.featureType ?? null,
        featureLabel:      t.featureLabel ?? null,
        statusBadge:       t.statusBadge || null,
        reviewCount:       t.reviewCount || 0,
        country:           t.country || country.toLowerCase(),
        slug:              t.slug || t.tourSlug || String(t._id || t.id || i),
        startDate:         t.startDate || null,
      };
    });

    const visibleTours = displayTours.slice(0, visibleCount);
    const hasMore      = visibleCount < displayTours.length;

    return (
      <section
        ref={ref}
        className={classNames("w-full py-[80px] bg-secondary-light-default", className)}
        {...props}
      >
        <div className="px-6 md:px-[30px] lg:px-[148px]">

          {/* ── Header row ───────────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-[24px] gap-4">

            <div className="flex items-center gap-[8px] shrink-0">
              <div className="w-[46px] h-[1px]" style={{ backgroundColor: "#2b0f43" }} />
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
                {tourCount} tours in {country}
              </span>
            </div>

            {/* Sort dropdown */}
            <div className="flex items-center gap-[12px] shrink-0">
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center justify-center gap-[8px] rounded-[20px] border border-[#949494] px-[10px] py-[10px] transition-colors hover:border-[#7b2cbf]"
                  style={{ height: "44px", boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.05)" }}
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

          {/* ── Tour grid ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[8px] gap-y-6 md:gap-y-[20px]">
            {isLoading
              ? Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
                  <PopularTourCardSkeleton key={i} />
                ))
              : visibleTours.map((tour) => (
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
                    reviewCount={tour.reviewCount}
                    country={tour.country}
                    tourSlug={tour.slug}
                    startDate={tour.startDate}
                  />
                ))
            }
          </div>

          {/* ── Load More ────────────────────────────────────────────────────── */}
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-[32px]">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
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
          )}

        </div>
      </section>
    );
  }
);

AllToursSection.displayName = "AllToursSection";
export default AllToursSection;
