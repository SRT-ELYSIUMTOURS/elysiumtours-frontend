import React from "react";
import { classNames } from "../../../utils/classNames";
import { deriveTourTags } from "../../../utils/tourTags";
import PopularTourCard from "../../cards/PopularTourCard";
import PopularTourCardSkeleton from "../../cards/PopularTourCardSkeleton";

// Figma assets
import sectionLine from "../../../assets/ElysiumAssets/section-line.svg";

const TourFeaturedSection = React.forwardRef(({ className, tours: toursProp, isLoading = false, ...props }, ref) => {
  const displayTours = (toursProp && toursProp.length > 0 ? toursProp : []).map((t, i) => {
    // Build duration from backend fields
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

    // Price from cheapest pricing tier, fallback to basePrice
    const tiers = t.pricingTiers;
    const minPrice = tiers && tiers.length > 0
      ? Math.min(...tiers.map((tier) => tier.pricePerPerson))
      : t.basePrice;
    const price = minPrice != null ? `Ghs.${Number(minPrice).toFixed(2)}` : t.price || "Contact us";

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
      tags: deriveTourTags(t),
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
  });
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
          <div className="flex items-center h-fit gap-2 shrink-0">
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
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <PopularTourCardSkeleton key={i} className="w-full" />
              ))
            : displayTours.map((tour) => (
                <PopularTourCard key={tour.id} {...tour} className="w-full" />
              ))
          }
        </div>
      </div>
    </section>
  );
});
TourFeaturedSection.displayName = "TourFeaturedSection";

export default TourFeaturedSection;