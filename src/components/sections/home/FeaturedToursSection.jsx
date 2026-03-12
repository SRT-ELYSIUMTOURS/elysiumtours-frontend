import React from "react";
import { classNames } from "../../../utils/classNames";
import { SectionHeadline } from "../../ui/SectionHeadline";
import PopularTourCard from "../../cards/PopularTourCard";
import Button from "../../ui/button";

const TOUR_DATA = [
  {
    id: 1,
    image: "https://picsum.photos/seed/tour1/351/373",
    location: "Cape coast/Ghana",
    rating: 4.9,
    title: "Elmina Heritage & Coastal Journey",
    availabilityBadge: "Opened Daily",
    price: "Ghs.400.00",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/tour2/351/373",
    location: "Accra/Ghana",
    rating: 4.8,
    title: "Accra Bustling City & Market Tour",
    availabilityBadge: "Opened Daily",
    price: "Ghs.350.00",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/tour3/351/373",
    location: "Ashanti/Ghana",
    rating: 4.7,
    title: "Kumasi Heritage & Market Discovery",
    availabilityBadge: "Opened Daily",
    price: "Ghs.500.00",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/tour4/351/373",
    location: "Volta Region/Ghana",
    rating: 4.9,
    title: "Wli Waterfalls & Nature Exploration",
    availabilityBadge: "Opened Daily",
    price: "Ghs.450.00",
  },
];

const FeaturedToursSection = React.forwardRef(({ className, ...props }, ref) => {
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
              Featured Tours
            </span>
          </div>

          <div className="flex flex-col items-end gap-4 max-w-[677px]">
            <h2 className="font-raleway font-bold text-[22px] leading-[30px] lg:text-High-md-bold lg:leading-[34px] text-tertiary-normal-default text-right">
              Explore Our Most Popular Tours and Experiences
            </h2>
            <p className="font-raleway font-medium text-[14px] leading-[22px] lg:text-md-Medium lg:leading-[26px] text-primary-dark-active text-right">
              Ghana is buzzing with spots like Kakum National Park, that canopy
              walkway is a thrill. Cape Coast Castle, super eye-opening on
              history. Kwame Nkrumah Memorial Park in Accra&apos;s topping
              lists, with over three hundred thousand visitors last year alone.
            </p>
            <Button variant="secondaryOutline" size="small" shape="pill">
              See All Tours
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
            />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturedToursSection.displayName = "FeaturedToursSection";

export default FeaturedToursSection;
