import React, { useState } from "react";
import { classNames } from "../../../utils/classNames";
import Button from "../../ui/button";

// Figma: 1914:40900 — Frame 6 (Ghana hero), y=166, h=717
// Info bar below hero: BEST TIME TO VISIT / CURRENCY / LANGUAGES / MAIN ENTRY / VISA REQUIREMENTS
// Stats (tours, regions, rating, guides) show in the HERO image itself

const SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/ghana-hero-1/1728/717", alt: "Ghana landscape" },
  { id: 2, image: "https://picsum.photos/seed/ghana-hero-2/1728/717", alt: "Ghana coast" },
  { id: 3, image: "https://picsum.photos/seed/ghana-hero-3/1728/717", alt: "Ghana culture" },
];

const NIGERIA_SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/nigeria-hero/1728/717", alt: "Nigeria landscape" },
  { id: 2, image: "https://picsum.photos/seed/nigeria-hero-2/1728/717", alt: "Nigeria city" },
  { id: 3, image: "https://picsum.photos/seed/nigeria-hero-3/1728/717", alt: "Nigeria culture" },
];

const COUNTRY_CONFIG = {
  ghana: {
    title: "Discover Ghana Where History Breathes",
    subtitle: "From the Door of No Return to the canopies of Kakum, Ghana holds centuries of culture, resilience, and natural wonder. Every tour is crafted to go beyond the surface.",
    slides: SLIDES,
    stats: { tours: "18", regions: "06", rating: "4.8", guides: "5" },
    bestTime: "Nov-Mar (Dry Season) & Dec-Jan",
    currency: "Ghanaian Cedi (Ghs.)",
    languages: "English, Twi, Ga, Hausa, Ewe",
    mainEntry: "Kotoka International Airport",
    visa: "Visa on Arrival (Most countries)",
  },
  nigeria: {
    title: "Nigeria: Bold Beautiful & Boundless",
    subtitle: "From the bustling markets of Lagos to the ancient city of Kano, Nigeria is a mosaic of over 250 ethnic groups, rich traditions, and breathtaking landscapes.",
    slides: NIGERIA_SLIDES,
    stats: { tours: "24", regions: "08", rating: "4.7", guides: "8" },
    bestTime: "Nov-Feb (Dry Season)",
    currency: "Nigerian Naira (NGN)",
    languages: "English, Yoruba, Hausa, Igbo",
    mainEntry: "Murtala Muhammed Int'l Airport",
    visa: "Visa Required",
  },
};

const DEFAULT_CONFIG = {
  title: "Discover This Destination",
  subtitle: "Explore the beauty and culture of this amazing destination with Elysium Tours.",
  slides: SLIDES,
  stats: { tours: "10", regions: "04", rating: "4.8", guides: "3" },
  bestTime: "Year-round",
  currency: "Local Currency",
  languages: "Local Languages",
  mainEntry: "International Airport",
  visa: "Visa Required",
};

// Info bar icons
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2.5" y="4.5" width="15" height="13" rx="2" stroke="#7B2CBF" strokeWidth="1.5"/>
    <path d="M2.5 8.5H17.5" stroke="#7B2CBF" strokeWidth="1.5"/>
    <path d="M6.5 2.5V5.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13.5 2.5V5.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CurrencyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#7B2CBF" strokeWidth="1.5"/>
    <path d="M10 6V14M7.5 8.5C7.5 7.4 8.6 6.5 10 6.5C11.4 6.5 12.5 7.4 12.5 8.5C12.5 9.6 11.4 10.5 10 10.5C8.6 10.5 7.5 11.4 7.5 12.5C7.5 13.6 8.6 14 10 14C11.4 14 12.5 13.1 12.5 12" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LanguageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#7B2CBF" strokeWidth="1.5"/>
    <path d="M10 2.5C10 2.5 7.5 5.5 7.5 10C7.5 14.5 10 17.5 10 17.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 2.5C10 2.5 12.5 5.5 12.5 10C12.5 14.5 10 17.5 10 17.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.5 10H17.5" stroke="#7B2CBF" strokeWidth="1.5"/>
  </svg>
);

const PlaneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.5 3.5L3.5 10.5L8 12L9.5 17L13 13.5L16.5 3.5Z" stroke="#7B2CBF" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 12L10.5 9.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PassportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3.5" y="2.5" width="13" height="15" rx="2" stroke="#7B2CBF" strokeWidth="1.5"/>
    <circle cx="10" cy="9" r="2.5" stroke="#7B2CBF" strokeWidth="1.5"/>
    <path d="M6.5 14.5H13.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6.5 5H13.5" stroke="#7B2CBF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const INFO_BAR_ITEMS = (config) => [
  { icon: <CalendarIcon />, label: "BEST TIME TO VISIT", value: config.bestTime },
  { icon: <CurrencyIcon />, label: "CURRENCY", value: config.currency },
  { icon: <LanguageIcon />, label: "LANGUAGES", value: config.languages },
  { icon: <PlaneIcon />, label: "MAIN ENTRY", value: config.mainEntry },
  { icon: <PassportIcon />, label: "VISA REQUIREMENTS", value: config.visa },
];

const TourCountryHero = React.forwardRef(({ country = "ghana", className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const config = COUNTRY_CONFIG[country?.toLowerCase()] || { ...DEFAULT_CONFIG, title: `Discover ${country}` };
  const slides = config.slides || SLIDES;
  const infoItems = INFO_BAR_ITEMS(config);

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>
      {/* Hero image section */}
      <section className="relative w-full h-[717px] overflow-hidden">
        {slides.map((slide, i) => (
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-xl z-30">
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

          {/* Stats row IN the hero */}
          <div className="flex items-center gap-[60px] mt-[16px]">
            <div className="flex flex-col items-center gap-[4px]">
              <span className="font-raleway font-bold text-[40px] leading-[48px] text-secondary-normal-default">{config.stats.tours}</span>
              <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-light-default uppercase tracking-wide">Tours Available</span>
            </div>
            <div className="w-[1px] h-[48px] bg-white/30" />
            <div className="flex flex-col items-center gap-[4px]">
              <span className="font-raleway font-bold text-[40px] leading-[48px] text-secondary-normal-default">{config.stats.regions}</span>
              <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-light-default uppercase tracking-wide">Regions Covered</span>
            </div>
            <div className="w-[1px] h-[48px] bg-white/30" />
            <div className="flex flex-col items-center gap-[4px]">
              <span className="font-raleway font-bold text-[40px] leading-[48px] text-secondary-normal-default">{config.stats.rating}</span>
              <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-light-default uppercase tracking-wide">Avg Rating</span>
            </div>
            <div className="w-[1px] h-[48px] bg-white/30" />
            <div className="flex flex-col items-center gap-[4px]">
              <span className="font-raleway font-bold text-[40px] leading-[48px] text-secondary-normal-default">{config.stats.guides}</span>
              <span className="font-raleway font-medium text-[13px] leading-[18px] text-primary-light-default uppercase tracking-wide">Local Guides</span>
            </div>
          </div>

          <Button
            variant="neutral"
            shape="pill"
            className="h-[56px] gap-md border-secondary-normal-default mt-[8px]"
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
          {slides.map((_, i) => (
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

      {/* Info bar below hero — white strip */}
      <div className="w-full bg-primary-light-default py-[32px] shadow-sm border-b border-[#e9eaeb]">
        <div className="px-[80px] flex items-center justify-between">
          {infoItems.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-[12px]">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex flex-col gap-[2px]">
                  <span className="font-raleway font-bold text-[12px] leading-[16px] text-[#6f6f6f] uppercase tracking-[0.08em]">
                    {item.label}
                  </span>
                  <span className="font-raleway font-semibold text-[15px] leading-[22px] text-[#2d2d2d]">
                    {item.value}
                  </span>
                </div>
              </div>
              {i < infoItems.length - 1 && (
                <div className="w-[1px] h-[40px] bg-[#e9eaeb]" />
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
