import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: 1914:40900 — Frame 6 (Ghana hero), y=166, h=717
// Title: "Discover Ghana Where History Breathes" [56px/700] centered, w=957, y=198
// Subtitle in Frame 8 (w=867): "From the Door of No Return..."
// No Up-Next card on country page (not visible in Figma)
// Stats row below hero (in separate section): 18 | 06 | 4.8 | 5

const SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/ghana-hero-1/1728/717", alt: "Ghana landscape" },
  { id: 2, image: "https://picsum.photos/seed/ghana-hero-2/1728/717", alt: "Ghana coast" },
  { id: 3, image: "https://picsum.photos/seed/ghana-hero-3/1728/717", alt: "Ghana culture" },
];

const COUNTRY_CONFIG = {
  ghana: {
    title: "Discover Ghana Where History Breathes",
    subtitle: "From the Door of No Return to the canopies of Kakum, Ghana holds centuries of culture, resilience, and natural wonder. Every tour is crafted to go beyond the surface.",
    stats: [
      { value: "18", label: "Tours Available" },
      { value: "06", label: "Average Days" },
      { value: "4.8", label: "Average Rating" },
      { value: "5", label: "Local Guides" },
    ],
  },
  nigeria: {
    title: "Discover Nigeria Where Culture Thrives",
    subtitle: "From Lagos' vibrant markets to Abuja's modern skyline, Nigeria is a tapestry of cultures, art, and unforgettable experiences waiting to be explored.",
    stats: [
      { value: "12", label: "Tours Available" },
      { value: "04", label: "Average Days" },
      { value: "4.7", label: "Average Rating" },
      { value: "4", label: "Local Guides" },
    ],
  },
};

const DEFAULT_CONFIG = {
  title: "Discover This Destination",
  subtitle: "Explore the beauty and culture of this amazing destination with Elysium Tours.",
  stats: [
    { value: "10", label: "Tours Available" },
    { value: "04", label: "Average Days" },
    { value: "4.8", label: "Average Rating" },
    { value: "3", label: "Local Guides" },
  ],
};

const TourCountryHero = React.forwardRef(({ country = "ghana", className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const config = COUNTRY_CONFIG[country?.toLowerCase()] || { ...DEFAULT_CONFIG, title: `Discover ${country}` };

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>
      {/* Hero image section */}
      <section className="relative w-full h-[717px] overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={classNames(
              "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
              i === current ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
            )}
          >
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 z-[15]" />
          </div>
        ))}

        {/* Centered content — y=198 in Figma */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-xl z-30" style={{ paddingTop: "0" }}>
          <div className="flex flex-col items-center gap-md">
            <h1 className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-center w-[957px]">
              {config.title}
            </h1>
            <div className="w-[867px]">
              <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default text-center px-[8.5px]">
                {config.subtitle}
              </p>
            </div>
          </div>
          <Button
            variant="neutral"
            shape="pill"
            className="h-[56px] gap-md border-secondary-normal-default"
            endIcon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#2b0f43" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            Explore Tours
          </Button>
        </div>

        {/* Carousel dots */}
        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-40">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={classNames(
                "w-4 h-4 rounded-full border border-solid transition-all duration-300 ease-in",
                i === current
                  ? "bg-secondary-normal-default border-secondary-normal-default"
                  : "bg-transparent border-primary-dark-default hover:border-secondary-normal-hover"
              )}
              aria-label={i === current ? "Current slide" : `Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats row below hero — white strip */}
      <div className="w-full bg-primary-light-default py-[40px]">
        <div className="px-[156px] flex items-center justify-between">
          {config.stats.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col gap-[8px] items-center">
                <span className="font-raleway font-bold text-[56px] leading-[64px] text-secondary-normal-default">
                  {stat.value}
                </span>
                <span className="font-raleway font-medium text-[16px] leading-[24px] text-primary-dark-darker">
                  {stat.label}
                </span>
              </div>
              {i < config.stats.length - 1 && (
                <div className="w-[1px] h-[107px] bg-secondary-light-active" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
});

TourCountryHero.displayName = "TourCountryHero";
export default TourCountryHero;
