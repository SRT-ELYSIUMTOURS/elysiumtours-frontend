import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";

const SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/partners-hero-1/1728/1080", alt: "Tour partners in West Africa" },
  { id: 2, image: "https://picsum.photos/seed/partners-hero-2/1728/1080", alt: "Local accommodation partners" },
  { id: 3, image: "https://picsum.photos/seed/partners-hero-3/1728/1080", alt: "Transportation partners" },
];

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="9.5" cy="9.5" r="7" stroke="#fefefe" strokeWidth="1.8" />
    <path d="M14.5 14.5L20 20" stroke="#fefefe" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PartnerHero = React.forwardRef(({ onSearch, className = "", ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>
      {/* Hero container uses aspect ratio instead of fixed height */}
      <section className="relative w-full overflow-hidden aspect-[16/9]">
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={classNames(
              "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
              i === current ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
            )}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-center object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[15]" />
          </div>
        ))}

        {/* Content centered vertically and horizontally in the hero */}
        <div className="absolute top-1/2 left-1/2 w-full max-w-[1728px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-6 sm:gap-8 px-5 sm:px-8 md:px-10 z-30">
          {/* Title + subtitle */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-raleway font-bold text-primary-light-default text-center text-[28px] leading-[38px] sm:text-[36px] sm:leading-[46px] md:text-[46px] md:leading-[56px] lg:text-[56px] lg:leading-[66px] max-w-[95%] sm:max-w-[90%] lg:w-[851px]">
              Partnering With the Best in West Africa
            </h1>
            <p className="font-raleway font-medium text-primary-light-default text-center text-[14px] leading-[24px] sm:text-[15px] sm:leading-[25px] md:text-[16px] md:leading-[26px] max-w-[95%] sm:max-w-[90%] lg:w-[850px]">
              From trusted local guides to premium accommodations, every partner in our network is handpicked for quality, authenticity, and care.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center w-full max-w-[798px] h-[60px] sm:h-[70px] md:h-[78px] lg:h-[88px] bg-white rounded-[100px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] px-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search partners…"
              className="flex-1 font-raleway font-medium text-[16px] leading-[24px] text-primary-dark-hover bg-transparent outline-none placeholder:text-primary-dark-hover"
            />
            <button
              onClick={handleSearch}
              className="w-[54px] h-[54px] rounded-full bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active flex items-center justify-center transition-all duration-300 ease-in cursor-pointer shadow"
              aria-label="Search partners"
            >
              <SearchIcon />
            </button>
          </div>
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
    </div>
  );
});

PartnerHero.displayName = "PartnerHero";
export default PartnerHero;
