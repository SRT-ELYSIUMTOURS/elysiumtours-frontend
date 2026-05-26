import React from "react";
import { classNames } from "../../../utils/classNames";
import FeaturedDestinationCard from "../../cards/FeaturedDestinationCard";

/**
 * FeaturedDestinationsSection
 *
 * Displays up to 5 tour highlight stops from featured tour packages in a
 * 3-column masonry layout (desktop) / horizontal scroll (mobile) / 2-col grid (tablet).
 *
 * Props:
 *   highlights  — array of { id, name, subtitle, image } from the parent page.
 *                 Sourced by flattening tourHighlights[] from featured tour packages.
 *                 Index 0-1 → left column, index 2 → centre (tall), index 3-4 → right column.
 *   isLoading   — show skeleton cards while the API call is in flight.
 */

// ── Skeleton card placeholder shown while highlights are loading ────────────
const SkeletonCard = ({ size = "default" }) => (
  <div
    className={classNames(
      "w-full rounded-[var(--radius-md)] bg-gray-200 animate-pulse",
      size === "large" ? "h-[656px]" : "h-[316px]"
    )}
    aria-hidden="true"
  />
);

// ── Splits the flat highlights array into the 3-column layout positions ─────
function toColumns(items = []) {
  return {
    left:   items.slice(0, 2),
    center: items[2] ?? null,
    right:  items.slice(3, 5),
  };
}

const FeaturedDestinationsSection = React.forwardRef(
  ({ className, highlights = [], isLoading = false, ...props }, ref) => {
    const { left, center, right } = toColumns(highlights);
    const allItems = [...left, ...(center ? [center] : []), ...right];

    return (
      <section
        ref={ref}
        className={classNames(
          "bg-primary-light-default font-raleway py-16 md:py-20 lg:py-24",
          className
        )}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px] lg:px-[164px]">

          {/* ── Section header ─────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 mb-8 lg:mb-16">
            <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Featured Destinations
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-center lg:text-right">
                Discover Ghana&apos;s Hidden Gems
              </h2>
              <p className="font-raleway lg:pl-[111px] text-[14px] leading-[22px] lg:text-md-Regular lg:leading-[26px] text-primary-dark-active text-center lg:text-right">
                Discover Ghana&apos;s most captivating destinations handpicked
                by Elysium Tours. From the historic castles of Cape Coast to the
                serene shores of Lake Volta and the vibrant streets of Accra,
                each location offers a unique blend of culture, heritage, and
                natural beauty.
              </p>
            </div>
          </div>

          {/* ── Desktop: 3-column masonry grid ─────────────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-[29px] items-start">

            {/* Left column — 2 short cards (indices 0, 1) */}
            <div className="flex flex-col gap-2xl">
              {isLoading
                ? [0, 1].map((i) => <SkeletonCard key={i} />)
                : left.map((item) => (
                    <FeaturedDestinationCard
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      subtitle={item.subtitle}
                      size="default"
                    />
                  ))}
            </div>

            {/* Centre — 1 tall card (index 2) */}
            <div className="lg:h-full">
              {isLoading
                ? <SkeletonCard size="large" />
                : center && (
                    <FeaturedDestinationCard
                      image={center.image}
                      name={center.name}
                      subtitle={center.subtitle}
                      size="large"
                      className="lg:h-full"
                    />
                  )}
            </div>

            {/* Right column — 2 short cards (indices 3, 4) */}
            <div className="flex flex-col gap-2xl">
              {isLoading
                ? [0, 1].map((i) => <SkeletonCard key={i} />)
                : right.map((item) => (
                    <FeaturedDestinationCard
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      subtitle={item.subtitle}
                      size="default"
                    />
                  ))}
            </div>
          </div>

          {/* ── Mobile: horizontal scroll ───────────────────────────────────── */}
          <div className="overflow-hidden md:hidden -mx-6">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide">
              {(isLoading ? [0, 1, 2, 3, 4] : allItems).map((item, i) => (
                <div key={isLoading ? i : item.id} className="min-w-[200px] snap-start shrink-0">
                  {isLoading
                    ? <SkeletonCard />
                    : (
                        <FeaturedDestinationCard
                          image={item.image}
                          name={item.name}
                          subtitle={item.subtitle}
                          size="default"
                        />
                      )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Tablet: 2-column grid ───────────────────────────────────────── */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
            {isLoading
              ? [0, 1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
              : allItems.map((item) => (
                  <FeaturedDestinationCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    subtitle={item.subtitle}
                    size="default"
                  />
                ))}
          </div>

        </div>
      </section>
    );
  }
);

FeaturedDestinationsSection.displayName = "FeaturedDestinationsSection";
export default FeaturedDestinationsSection;
