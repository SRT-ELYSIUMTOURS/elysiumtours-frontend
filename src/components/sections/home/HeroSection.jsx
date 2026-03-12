import React from "react";
import { classNames } from "../../../utils/classNames";
import HeroImageSlider from "../../ui/HeroImageSlider";
import SearchBar from "../../ui/SearchBar";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://picsum.photos/seed/hero1/1728/717",
    alt: "Ghana landmark",
    overlayOpacity: 0.6,
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/hero2/1728/717",
    alt: "Cape Coast Castle",
    overlayOpacity: 0.6,
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/hero3/1728/717",
    alt: "Kakum National Park",
    overlayOpacity: 0.6,
  },
];

const HeroSection = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={classNames("relative w-full", className)}
      {...props}
    >
      <HeroImageSlider
        slides={HERO_SLIDES}
        autoPlay
        interval={5000}
        height={717}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-8">
        <div className="flex flex-col items-center gap-xl max-w-[957px] w-full">
          <div className="flex flex-col items-center gap-md w-full">
            <h1 className="font-raleway font-bold text-[32px] leading-[40px] md:text-[44px] md:leading-[54px] xl:text-Display-xl xl:leading-[66px] text-primary-light-default text-center">
              Discover Ghana with Elysium Tours
            </h1>
            <p className="font-raleway font-medium text-[14px] leading-[22px] md:text-md-Medium md:leading-[26px] text-primary-light-default text-center max-w-[850px]">
              Elysium Tours offers exceptional travel experiences in Ghana,
              combining cultural immersion, historical landmarks, and natural
              beauty to create unforgettable and authentic journeys.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <SearchBar className="w-full max-w-[800px]" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
