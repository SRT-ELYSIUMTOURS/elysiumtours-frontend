import React from "react";
import { classNames } from "../../../utils/classNames";
import FeaturedDestinationCard from "../../cards/FeaturedDestinationCard";

const DESTINATIONS = {
  leftCol: [
    {
      id: 1,
      name: "Kakum National Park",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "./src/assets/homeAssets/Image-6.webp",
    },
    {
      id: 2,
      name: "National Theater",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "./src/assets/homeAssets/Image-7.webp",
    },
  ],
  center: {
    id: 3,
    name: "Independence Square",
    subtitle: "Discover Ghana's most captivating destinations",
    image: "./src/assets/homeAssets/Image-8.webp",
  },
  rightCol: [
    {
      id: 4,
      name: "Kakum National Park",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "./src/assets/homeAssets/Image-9.webp",
    },
    {
      id: 5,
      name: "Boti Falls",
      subtitle: "Discover Ghana's most captivating destinations",
      image: "./src/assets/homeAssets/Image-10.webp",
    },
  ],
};

const FeaturedDestinationsSection = React.forwardRef(
  ({ className, ...props }, ref) => {
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

          {/* Desktop masonry grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-[29px] items-start">
            {/* Left column — 2 short cards */}
            <div className="flex flex-col gap-2xl ">
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
              className=" lg:h-full"
            />

            {/* Right column — 2 short cards */}
            <div className="flex flex-col gap-2xl">
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

          {/* Mobile: horizontal scroll */}
          <div className="overflow-hidden md:hidden -mx-6">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide">
              {[
                ...DESTINATIONS.leftCol,
                DESTINATIONS.center,
                ...DESTINATIONS.rightCol,
              ].map((dest) => (
                <div key={dest.id} className="min-w-[200px] snap-start shrink-0">
                  <FeaturedDestinationCard
                    image={dest.image}
                    name={dest.name}
                    subtitle={dest.subtitle}
                    size="default"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet: 2-col grid */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:hidden">
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
