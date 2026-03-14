import React from "react";
import { classNames } from "../../../utils/classNames";
import { SectionHeadline } from "../../ui/SectionHeadline";
import PopularTourCard from "../../cards/PopularTourCard";
import Button from "../../ui/button";

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
                endIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2.33325 6.25004C1.91904 6.25004 1.58325 6.58583 1.58325 7.00004C1.58325 7.41426 1.91904 7.75004 2.33325 7.75004L2.33325 7.00004L2.33325 6.25004ZM11.6666 7.75004C12.0808 7.75004 12.4166 7.41425 12.4166 7.00004C12.4166 6.58583 12.0808 6.25004 11.6666 6.25004V7.00004V7.75004ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM10.3617 5.10264L9.83369 5.63533V5.63533L10.3617 5.10264ZM10.3617 8.89744L10.8896 9.43014V9.43014L10.3617 8.89744ZM8.80529 9.38402C8.5111 9.6756 8.50898 10.1505 8.80056 10.4447C9.09214 10.7389 9.56701 10.741 9.86121 10.4494L9.33325 9.91671L8.80529 9.38402ZM11.655 6.81726L12.399 6.72243L12.399 6.72243L11.655 6.81726ZM11.655 7.18282L12.399 7.27765V7.27765L11.655 7.18282ZM2.33325 7.00004L2.33325 7.75004L11.6666 7.75004V7.00004V6.25004L2.33325 6.25004L2.33325 7.00004ZM9.33325 4.08337L8.80529 4.61606L9.83369 5.63533L10.3617 5.10264L10.8896 4.56995L9.86121 3.55068L9.33325 4.08337ZM10.3617 8.89744L9.83369 8.36475L8.80529 9.38402L9.33325 9.91671L9.86121 10.4494L10.8896 9.43014L10.3617 8.89744ZM10.3617 5.10264L9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L11.655 6.81726L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L10.3617 5.10264ZM10.3617 8.89744L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L11.655 7.18282L10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.3617 8.89744ZM11.655 6.81726L10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L11.655 7.18282L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L11.655 6.81726Z"
                      fill="#7B2CBF"
                    />
                  </svg>
                }
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
