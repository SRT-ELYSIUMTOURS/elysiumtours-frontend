import React from "react";
import { classNames } from "../../../utils/classNames";
import { SectionHeadline } from "../../ui/SectionHeadline";
import PopularTourCard from "../../cards/PopularTourCard";
import Button from "../../ui/button";
import ExploreMoreArrowIcon from "../../icons/ExploreMoreArrowIcon";

const TOUR_DATA = [
  {
    id: 1,
    image: "./src/assets/homeAssets/Image-2.webp",
    location: "Cape coast/Ghana",
    duration: { class: "Multi-Day", span: "3 Days/2 days" },
    maxGroupSize: 12,
    pickupIncluded: true,
    tags: ["Cultural", "Diaspora", "International"],
    rating: 4.9,
    title: "Elmina Heritage & Coastal Journey",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
  },
  {
    id: 2,
    image: "./src/assets/homeAssets/Image-3.webp",
    location: "Accra/Ghana",
    duration: { class: "Multi-Day", span: "3 Days/2 days" },
    tags: ["Cultural", "Diaspora", "International"],
    pickupIncluded: true,

    rating: 4.8,
    title: "Accra Bustling City & Market Tour",
    availabilityBadge: "Opened Daily",
    price: "Ghs.350.00",
  },
  {
    id: 3,
    image: "./src/assets/homeAssets/Image-4.webp",
    location: "Ashanti/Ghana",
    maxGroupSize: 12,
    tags: ["Cultural", "Diaspora", "International"],
    pickupIncluded: true,

    rating: 4.7,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
  },
  {
    id: 4,
    image: "./src/assets/homeAssets/Image-5.webp",
    location: "Volta Region/Ghana",
    pickupIncluded: true,
    tags: ["Cultural", "Diaspora", "International"],

    rating: 4.9,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
  },
];

const FeaturedToursSection = React.forwardRef(
  ({ className, ...props }, ref) => {
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
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12 lg:mb-16">
            <div className="flex items-center gap-sm shrink-0">
              <div className="w-[46px] h-[2px] bg-secondary-dark-darker" />
              <span className="font-raleway font-bold text-med-small-bold text-secondary-dark-darker uppercase tracking-wide">
                Featured Tours
              </span>
            </div>

            <div className="flex flex-col items-end gap-4 max-w-[677px]">
              <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
                Explore Our Most Popular Tours and Experiences
              </h2>
              <p className="font-raleway font-medium text-[14px] leading-[22px] lg:pl-[111px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-right">
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
              >
                Explore More
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-md">
            {TOUR_DATA.map((tour) => (
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
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
);

FeaturedToursSection.displayName = "FeaturedToursSection";

export default FeaturedToursSection;
