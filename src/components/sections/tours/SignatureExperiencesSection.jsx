import React from "react";
import { classNames } from "../../../utils/classNames";
import { deriveTourTags } from "../../../utils/tourTags";
import PopularTourCard from "../../cards/PopularTourCard";
import PopularTourCardSkeleton from "../../cards/PopularTourCardSkeleton";
import Button from "../../ui/button";

const TOUR_TYPE_LABELS = { day_tour: "Day Tour", multi_day: "Multi-Day", express: "Express" };

const buildCardProps = (t, i) => {
  const typeLabel = TOUR_TYPE_LABELS[t.tourType] || t.duration?.class || "Multi-Day";
  const seats = t.remainingCapacity;
  const durationClass = seats != null
    ? `${typeLabel}: ${seats} Seat${seats !== 1 ? "s" : ""} Available`
    : typeLabel;
  const days = t.durationDays;
  const durationSpan = days
    ? (days === 1 ? "1 Day" : `${days} Days/${days - 1} Night${days - 1 !== 1 ? "s" : ""}`)
    : (t.duration?.span || "3 Days");
  const tiers = t.pricingTiers;
  const minPrice = tiers && tiers.length > 0
    ? Math.min(...tiers.map((tier) => tier.pricePerPerson))
    : t.basePrice;
  return {
    id: t._id || t.id || i,
    image: t.coverImage || t.image,
    location: t.destination?.name
      ? `${t.destination.name}/${t.country || "Ghana"}`
      : (t.location || t.country || "Ghana"),
    rating: t.rating || 4.8,
    title: t.title || "Tour",
    availabilityBadge: t.availabilityBadge || "Available",
    price: (() => {
      const currency = t.displayCurrency || "GHS";
      const prefix   = currency === "GHS" ? "Ghs." : `${currency} `;
      return minPrice != null ? `${prefix}${Number(minPrice).toFixed(2)}` : t.price || "Contact us";
    })(),
    tags: deriveTourTags(t),
    duration: { class: durationClass, span: durationSpan },
    maxGroupSize: t.totalCapacity ?? t.maxGroupSize,
    pickupIncluded: t.pickupIncluded ?? false,
    featureType: t.featureType ?? null,
    featureLabel: t.featureLabel ?? null,
    statusBadge: t.statusBadge || null,
    reviewCount: t.reviewCount || 0,
    country: t.country || "ghana",
    tourSlug: t.slug || String(t._id || t.id || i),
    startDate: t.startDate || null,
  };
};

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V6.25H2.33325V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

// ── SignatureExperiencesSection ────────────────────────────────────────────────
// Figma 1914:40952 — 1728px wide, py-[80px], px-[148px]
// Header: left label (46px line + "ONLY IN {COUNTRY}") | right (title + "See All Tours" btn)
// Body: 4-col grid of PopularTourCard — no sidebar, no filter trigger
const SignatureExperiencesSection = React.forwardRef(({ country = "Ghana", tours: toursProp, isLoading = false, onSeeAll, className, ...props }, ref) => {
  const displayTours = toursProp && toursProp.length > 0
    ? toursProp.slice(0, 4).map(buildCardProps)
    : [];

  return (
    <section
      ref={ref}
      className={classNames("w-full py-[48px] md:py-[60px] lg:py-[80px]", className)}
      style={{ backgroundColor: "#ffffff" }}
      {...props}
    >
      <div className="px-6 md:px-[30px] lg:px-[148px]">

        {/* ── Section header — Figma 1914:40955 (left) + 1914:40959 (right) ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-[32px] lg:mb-[60px] gap-4">

          {/* Left: 46px decorative line + "ONLY IN {COUNTRY}" label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span
              className="whitespace-nowrap uppercase"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "13px",
                fontWeight: 700,
                lineHeight: "18px",
                color:      "#2b0f43",
              }}
            >
              Only In {country}
            </span>
          </div>

          {/* Right: "Signature Experiences" title + "See All Tours" button */}
          <div className="flex flex-col items-center lg:items-end gap-[12px] w-full lg:max-w-[800px]">
            <h2
              className="text-center lg:text-right"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize:   "25px",
                fontWeight: 700,
                lineHeight: "34px",
                color:      "#2d2d2d",
              }}
            >
              Signature Experiences
            </h2>
            <Button
              variant="secondaryOutline"
              shape="pill"
              size="small"
              className="h-[32px] gap-[9px] border-[0.8px] border-[#7b2cbf]"
              style={{
                borderRadius: "40px",
                paddingLeft:  "10px",
                paddingRight: "10px",
                boxShadow:    "0px 4px 4px 0px rgba(0,0,0,0.05)",
              }}
              endIcon={<ArrowIcon />}
              onClick={onSeeAll}
            >
              See All Tours
            </Button>
          </div>
        </div>

        {/* ── 4-card grid — Figma 1914:40952 body ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[8px] gap-y-6 md:gap-y-[20px]">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <PopularTourCardSkeleton key={i} />
              ))
            : displayTours.map((tour) => (
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
                  featureType={tour.featureType}
                  featureLabel={tour.featureLabel}
                  statusBadge={tour.statusBadge}
                  reviewCount={tour.reviewCount}
                  country={tour.country}
                  tourSlug={tour.tourSlug}
                />
              ))
          }
        </div>

      </div>
    </section>
  );
});

SignatureExperiencesSection.displayName = "SignatureExperiencesSection";
export default SignatureExperiencesSection;
