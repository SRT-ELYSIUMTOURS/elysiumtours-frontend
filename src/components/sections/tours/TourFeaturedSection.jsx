import React from "react";
import { classNames } from "../../../utils/classNames";
import PopularTourCard from "../../cards/PopularTourCard";
import Button from "../../ui/button";

// Figma: 1914:37658 — Frame 103, h=2922
// Header: "FEATURED TOURS" left / "Explore Our Most Popular Tours and Experiences" right + desc
// Grid: 4-col × 4-row, each card 351×615, gap-x 8px (359-351), gap-y 20px (635-615)
const TOURS = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/featured-tour-${i + 1}/351/373`,
  location: ["Cape Coast/Central Region", "Accra/Ghana", "Ashanti/Ghana", "Volta Region/Ghana"][i % 4],
  duration: { class: ["Multi-Day", "Day Tour", "Multi-Day", "Day Tour"][i % 4], span: ["3 Days/2 Nights", "1 Day", "5 Days/4 Nights", "1 Day"][i % 4] },
  maxGroupSize: [12, 8, 15, 10][i % 4],
  pickupIncluded: i % 3 === 0,
  tags: [["Cultural", "Diaspora"], ["Heritage", "Nature"], ["Cultural", "Adventure"], ["Nature", "Scenic"]][i % 4],
  rating: [4.9, 4.8, 4.7, 4.9][i % 4],
  title: [
    "The Homecoming Experience to Kakum National Park",
    "Elmina Heritage & Coastal Journey Tour",
    "Lagos Adventures & Market Heritage Exploration",
    "Accra to Cape Coast Day Road Trip Tour",
  ][i % 4],
  availabilityBadge: "Opened Daily",
  price: ["Ghs.400.00", "Ghs.350.00", "Ghs.500.00", "Ghs.450.00"][i % 4],
}));

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.33325 6.25C1.91904 6.25 1.58325 6.58579 1.58325 7C1.58325 7.41421 1.91904 7.75 2.33325 7.75V7V6.25ZM11.6666 7.75C12.0808 7.75 12.4166 7.41421 12.4166 7C12.4166 6.58579 12.0808 6.25 11.6666 6.25V7V7.75ZM9.86121 3.55068C9.56701 3.2591 9.09214 3.26122 8.80056 3.55542C8.50898 3.84961 8.5111 4.32448 8.80529 4.61606L9.33325 4.08337L9.86121 3.55068ZM2.33325 7.75H11.6666V6.25H2.33325V7.75ZM8.80529 4.61606L9.83369 5.63533L10.8896 4.56995L9.86121 3.55068L8.80529 4.61606ZM9.83369 8.36475L8.80529 9.38402L9.86121 10.4494L10.8896 9.43014L9.83369 8.36475ZM9.83369 5.63533C10.2563 6.05416 10.5274 6.32448 10.7074 6.54863C10.8779 6.76094 10.9041 6.85793 10.911 6.91209L12.399 6.72243C12.3427 6.28124 12.1323 5.92733 11.877 5.60938C11.6311 5.30327 11.2871 4.96395 10.8896 4.56995L9.83369 5.63533ZM10.911 7.08799C10.9041 7.14215 10.8779 7.23914 10.7074 7.45145C10.5274 7.6756 10.2563 7.94592 9.83369 8.36475L10.8896 9.43014C11.2871 9.03613 11.6311 8.69681 11.877 8.3907C12.1323 8.07275 12.3427 7.71885 12.399 7.27765L10.911 7.08799ZM10.911 6.91209C10.9184 6.9705 10.9184 7.02958 10.911 7.08799L12.399 7.27765C12.4225 7.09331 12.4225 6.90677 12.399 6.72243L10.911 6.91209Z" fill="#7B2CBF"/>
  </svg>
);

const TourFeaturedSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("w-full bg-secondary-light-default py-[80px]", className)}
      {...props}
    >
      <div className="px-[148px]">
        {/* Section header */}
        <div className="flex items-start justify-between w-full mb-[206px]">
          {/* Left */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span className="font-raleway font-bold text-[13px] leading-[18px] text-secondary-dark-darker whitespace-nowrap tracking-[0.05em] uppercase">
              Featured Tours
            </span>
          </div>

          {/* Right — w=677 */}
          <div className="flex flex-col gap-md items-end w-[677px]">
            <h2 className="font-raleway font-bold text-[25px] leading-[34px] text-tertiary-normal-default text-right pl-[80px]">
              Explore Our Most Popular Tours and Experiences
            </h2>
            <p className="font-raleway font-normal text-[16px] leading-[24px] text-tertiary-normal-default text-right pl-[111px]">
              Ghana is buzzing with spots like Kakum National Park, that canopy walkway is a thrill. Cape Coast Castle, super eye-opening on history. Kwame Nkrumah Memorial Park in Accra's topping lists, with over three hundred thousand visitors last year alone.
            </p>
          </div>
        </div>

        {/* 4-col × 4-row grid — card w=351, gap-x=8px, gap-y=20px */}
        <div className="grid grid-cols-4 gap-x-[8px] gap-y-[20px]">
          {TOURS.map((tour) => (
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
              className="w-[351px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TourFeaturedSection.displayName = "TourFeaturedSection";
export default TourFeaturedSection;
