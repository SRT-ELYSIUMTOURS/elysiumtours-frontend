import React from "react";
import { classNames } from "../../../utils/classNames";
import FeaturedDestinationCard from "../../cards/FeaturedDestinationCard";

const DESTINATIONS = {
  leftCol: [
    {
      id: 1,
      name: "Kakum National Park",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "https://picsum.photos/seed/dest1/454/300",
    },
    {
      id: 2,
      name: "National Theater",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "https://picsum.photos/seed/dest2/454/300",
    },
  ],
  center: {
    id: 3,
    name: "Independence Square",
    subtitle: "Discover Ghana's most captivating destinations",
    image: "https://picsum.photos/seed/dest3/451/656",
  },
  rightCol: [
    {
      id: 4,
      name: "Kakum National Park",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "https://picsum.photos/seed/dest4/454/300",
    },
    {
      id: 5,
      name: "Boti Falls",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "https://picsum.photos/seed/dest5/454/300",
    },
  ],
};

const FeaturedDestinationsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={classNames(
          "bg-primary-light-default py-16 md:py-20 lg:py-24",
          className
        )}
        {...props}
      >
        <div className="max-w-[1728px] mx-auto px-6 md:px-[30px]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
            <div className="flex items-center gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Featured Destinations
              </span>
            </div>

            <div className="flex flex-col items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
                Discover Ghana&apos;s Hidden Gems
              </h2>
              <p className="font-raleway font-medium text-[14px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-right">
                Discover Ghana&apos;s most captivating destinations handpicked
                by Elysium Tours. From the historic castles of Cape Coast to the
                serene shores of Lake Volta and the vibrant streets of Accra,
                each location offers a unique blend of culture, heritage, and
                natural beauty.
              </p>
            </div>
          </div>

          {/* Desktop masonry grid */}
          <div className="hidden lg:flex gap-[29px] items-start">
            {/* Left column — 2 short cards */}
            <div className="flex flex-col gap-2xl w-[454px]">
              {DESTINATIONS.leftCol.map((dest) => (
                <FeaturedDestinationCard
                  key={dest.id}
                  image={dest.image}
                  name={dest.name}
                  subtitle={dest.subtitle}
                  size="default"
                />
              ))}
            </div>

            {/* Center — 1 tall card */}
            <FeaturedDestinationCard
              image={DESTINATIONS.center.image}
              name={DESTINATIONS.center.name}
              subtitle={DESTINATIONS.center.subtitle}
              size="large"
              className="w-[451px]"
            />

            {/* Right column — 2 short cards */}
            <div className="flex flex-col gap-2xl w-[454px]">
              {DESTINATIONS.rightCol.map((dest) => (
                <FeaturedDestinationCard
                  key={dest.id}
                  image={dest.image}
                  name={dest.name}
                  subtitle={dest.subtitle}
                  size="default"
                />
              ))}
            </div>
          </div>

          {/* Mobile/tablet grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {[
              ...DESTINATIONS.leftCol,
              DESTINATIONS.center,
              ...DESTINATIONS.rightCol,
            ].map((dest) => (
              <FeaturedDestinationCard
                key={dest.id}
                image={dest.image}
                name={dest.name}
                subtitle={dest.subtitle}
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
