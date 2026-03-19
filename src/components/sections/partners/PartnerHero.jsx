import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";

// Figma: 772:10494 — Partner Hero section
// Height: 717px, search bar: 798px wide rounded pill, 3 carousel dots
// Title: 56px bold white, Subtitle: 16px medium white
// Search bar: bg-white h-[88px] rounded-[100px] w-[798px]

const SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/partners-hero-1/1728/717", alt: "Tour partners in West Africa" },
  { id: 2, image: "https://picsum.photos/seed/partners-hero-2/1728/717", alt: "Local accommodation partners" },
  { id: 3, image: "https://picsum.photos/seed/partners-hero-3/1728/717", alt: "Transportation partners" },
];

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="9.5" cy="9.5" r="7" stroke="#fefefe" strokeWidth="1.8" />
    <path d="M14.5 14.5L20 20" stroke="#fefefe" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PartnerHero = React.forwardRef(({
  onSearch,
  className = "",
  ...props
}, ref) => {
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
      <section className="relative w-full h-[717px] overflow-hidden">
        {/* Slides */}
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

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[32px] z-30 px-[40px]">
          {/* Title + subtitle */}
          <div className="flex flex-col items-center gap-[16px]">
            <h1 className="font-raleway font-bold text-[56px] leading-[66px] text-primary-light-default text-center w-[851px]">
              Partnering With the Best in West Africa
            </h1>
            <p className="font-raleway font-medium text-[16px] leading-[26px] text-primary-light-default text-center w-[850px]">
              From trusted local guides to premium accommodations, every partner in our network is handpicked for quality, authenticity, and care.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-[798px] h-[88px] bg-primary-light-default rounded-[100px] overflow-hidden shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search partners…"
              className={classNames(
                "absolute left-[40px] w-[620px]",
                "font-raleway font-medium text-[16px] leading-[24px] text-primary-dark-hover",
                "bg-transparent outline-none border-none placeholder:text-primary-dark-hover"
              )}
            />
            {/* Search button */}
            <button
              onClick={handleSearch}
              className={classNames(
                "absolute right-[17px] w-[54px] h-[54px] rounded-full",
                "bg-secondary-normal-default hover:bg-secondary-normal-hover active:bg-secondary-normal-active",
                "flex items-center justify-center",
                "transition-all duration-300 ease-in cursor-pointer shadow"
              )}
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
