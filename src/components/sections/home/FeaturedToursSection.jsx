import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import { SectionHeadline } from "../../ui/SectionHeadline";
import PopularTourCard from "../../cards/PopularTourCard";
import PopularTourCardSkeleton from "../../cards/PopularTourCardSkeleton";
import Button from "../../ui/button";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";

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
  const currency = t.displayCurrency || "GHS";
  const CURRENCY_SYMBOLS = { USD: "$", GHS: "GHS ", EUR: "€", GBP: "£" };
  const symbol = CURRENCY_SYMBOLS[currency] ?? `${currency} `;
  const price = minPrice != null
    ? `${symbol}${Number(minPrice).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : t.price || "Contact us";

  return {
    id: t._id || t.id || i,
    image: t.coverImage || t.image,
    location: t.destination?.name
      ? `${t.destination.name}/${t.country || "Ghana"}`
      : (t.location || t.country || "Ghana"),
    rating: t.rating || 4.8,
    title: t.title || t.name || "Tour",
    availabilityBadge: t.availabilityBadge || "Available",
    price,
    tags: t.tags || [],
    duration: { class: durationClass, span: durationSpan },
    maxGroupSize: t.totalCapacity ?? t.maxGroupSize,
    pickupIncluded: t.pickupIncluded ?? false,
    featureType: t.featureType ?? null,
    featureLabel: t.featureLabel ?? null,
    statusBadge: t.statusBadge || null,
    reviewCount: t.reviewCount || 0,
    country: t.country || "ghana",
    tourSlug: t.slug || t.tourSlug || String(t._id || t.id || i),
    startDate: t.startDate || null,
  };
};

const FeaturedToursSection = React.forwardRef(
  ({ className, tours: toursProp, isLoading = false, ...props }, ref) => {
    const navigate = useNavigate();
    const displayTours = toursProp && toursProp.length > 0
      ? toursProp.slice(0, 4).map(buildCardProps)
      : [];

    const renderCards = (wrapperClass) => {
      if (isLoading) {
        return Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={wrapperClass}>
            <PopularTourCardSkeleton className="w-full" />
          </div>
        ));
      }
      return displayTours.map((tour) => (
        <div key={tour.id} className={wrapperClass}>
          <PopularTourCard
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
            startDate={tour.startDate}
            showImageOverlays={false}
          />
        </div>
      ));
    };

    return (
      <section
        ref={ref}
        className={classNames(
          "bg-[#F2EAF9] py-16 md:py-20 lg:py-24",
          className
        )}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 lg:gap-8 mb-8 lg:mb-16">
            <div className="flex items-center justify-start w-full lg:w-auto gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Featured Tours
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                Explore Our Most Popular Tours and Experiences
              </h2>
              <p className="font-raleway font-medium text-[14px] leading-[22px] lg:pl-[111px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-center lg:text-right">
                Ghana is buzzing with spots like Kakum National Park, that
                canopy walkway is a thrill. Cape Coast Castle, super eye-opening
                on history. Kwame Nkrumah Memorial Park in Accra&apos;s topping
                lists, with over three hundred thousand visitors last year
                alone.
              </p>
              <Button
                endIcon={<ExploreMoreArrowIcon />}
                variant="secondaryOutline"
                size="small"
                shape="pill"
                onClick={() => navigate("/tours#featured")}
              >
                Explore More
              </Button>
            </div>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="overflow-hidden md:hidden -mx-6">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide">
              {renderCards("min-w-[280px] snap-start shrink-0")}
            </div>
          </div>

          {/* Tablet/Desktop: grid layout */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-md">
            {renderCards("")}
          </div>
        </div>
      </section>
    );
  }
);

FeaturedToursSection.displayName = "FeaturedToursSection";

export default FeaturedToursSection;
