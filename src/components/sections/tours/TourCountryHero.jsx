import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Slide dot assets — same as TourHero (Figma 1914:40903/40904) ──────────────
import slideDotActive   from "../../../assets/ElysiumAssets/slide-dot-active.svg";
import slideDotInactive from "../../../assets/ElysiumAssets/slide-dot-inactive.svg";

// ── Info bar icon assets (Figma 1942:30898) ────────────────────────────────────
// All icons use stroke="var(--stroke-0, #D6BEEB)"
import iconCalendar    from "../../../assets/ElysiumAssets/infobar-calendar.svg";
import iconCurrency    from "../../../assets/ElysiumAssets/infobar-currency.svg";
import iconLanguage    from "../../../assets/ElysiumAssets/infobar-language.svg";
import iconMainEntry   from "../../../assets/ElysiumAssets/infobar-mainentry.svg";
import iconClock       from "../../../assets/ElysiumAssets/infobar-clock.svg";
import iconTemperature from "../../../assets/ElysiumAssets/infobar-temperature.svg";

// ── Figma overlay (1914:40901) — identical to TourHero overlay ─────────────────
// Layer 1: flat linear rgba(0,0,0,0.3) across entire slide
// Layer 2: purple radial gradient, center ~40% 64%, ellipse 28.5% / 165%
const OVERLAY_STYLE = {
  background: [
    "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)",
    "radial-gradient(ellipse 28.5% 165% at 40% 64%, rgba(132,44,207,0.4) 45.67%, rgba(104,35,164,0.555) 61.78%, rgba(77,26,120,0.71) 77.88%, rgba(43,15,67,0.8) 100%)",
  ].join(", "),
};

// ── Flag strip: repeating-linear-gradient across flag colours ─────────────────
// Each colour segment is 20px wide, with a 6px dark gap after the full group.
// Repeat cycle: (20px × n colours) + 6px gap
// Figma 1942:30897: strip occupies top 16px (items container starts at y=16)
const STRIP_GAP_COLOR = "#2b0f43"; // matches infobar bg — creates visible separation
function getFlagStripBg(colors, segmentPx = 20, gapPx = 32) {
  const stops = [];
  let pos = 0;
  colors.forEach((color) => {
    stops.push(`${color} ${pos}px`);
    pos += segmentPx;
    stops.push(`${color} ${pos}px`);
  });
  // dark gap after each complete flag group
  stops.push(`${STRIP_GAP_COLOR} ${pos}px`);
  pos += gapPx;
  stops.push(`${STRIP_GAP_COLOR} ${pos}px`);
  return `repeating-linear-gradient(90deg, ${stops.join(", ")})`;
}

// ── Slides ────────────────────────────────────────────────────────────────────
const GHANA_SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/ghana-hero-1/1728/717", alt: "Ghana landscape" },
  { id: 2, image: "https://picsum.photos/seed/ghana-hero-2/1728/717", alt: "Ghana coast" },
  { id: 3, image: "https://picsum.photos/seed/ghana-hero-3/1728/717", alt: "Ghana culture" },
];

const NIGERIA_SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/nigeria-hero/1728/717",   alt: "Nigeria landscape" },
  { id: 2, image: "https://picsum.photos/seed/nigeria-hero-2/1728/717", alt: "Nigeria city" },
  { id: 3, image: "https://picsum.photos/seed/nigeria-hero-3/1728/717", alt: "Nigeria culture" },
];

// ── Country config ─────────────────────────────────────────────────────────────
// Info bar fields match Figma 1942:30898 exactly (incl. "VIST" typo on label)
const COUNTRY_CONFIG = {
  ghana: {
    title:     "Discover Ghana Where History Breathes",
    subtitle:  "From the Door of No Return to the canopies of Kakum, Ghana holds centuries of culture, resilience, and natural wonder. Every tour is crafted to go beyond the surface.",
    slides:    GHANA_SLIDES,
    stats:     { tours: "18", regions: "06", rating: "4.8", guides: "5" },
    bestTime:  "Nov-Mar(Dry Season)\n& Dec-Jan",
    currency:  "Ghanaian Cedi\n(Ghs.)",
    languages: "English, Twi, Ga,\nHausa, Ewe",
    mainEntry: "Kotoka International\nAirport",
    timeZone:  "GMT+0(No daylight\nSaving)",
    climate:   "Tropical, 24-32c\navg",
    // Official Ghana flag colours (red / gold / green)
    flagColors: ["#CE1126", "#FCD116", "#006B3F"],
  },
  nigeria: {
    title:     "Nigeria: Bold Beautiful & Boundless",
    subtitle:  "From the bustling markets of Lagos to the ancient city of Kano, Nigeria is a mosaic of over 250 ethnic groups, rich traditions, and breathtaking landscapes.",
    slides:    NIGERIA_SLIDES,
    stats:     { tours: "24", regions: "08", rating: "4.7", guides: "8" },
    bestTime:  "Nov-Feb (Dry\nSeason)",
    currency:  "Nigerian Naira\n(NGN)",
    languages: "English, Yoruba,\nHausa, Igbo",
    mainEntry: "Murtala Muhammed\nInt'l Airport",
    timeZone:  "WAT (UTC+1)",
    climate:   "Tropical, 25-35c\navg",
    // Official Nigeria flag colours (green / white / green)
    flagColors: ["#008751", "#FFFFFF", "#008751"],
  },
};

const DEFAULT_CONFIG = {
  title:      "Discover This Destination",
  subtitle:   "Explore the beauty and culture of this amazing destination with Elysium Tours.",
  slides:     GHANA_SLIDES,
  stats:      { tours: "10", regions: "04", rating: "4.8", guides: "3" },
  bestTime:   "Year-round",
  currency:   "Local Currency",
  languages:  "Local Languages",
  mainEntry:  "International Airport",
  timeZone:   "UTC+0",
  climate:    "Tropical",
  flagColors: ["#CE1126", "#FCD116", "#006B3F"],
};

// ── TourCountryHero ────────────────────────────────────────────────────────────
// Hero:     Figma 1914:40901 — 1728×717px
// Info bar: Figma 1942:30897 — 1728×138px (incl. 16px flag strip at top)
const TourCountryHero = React.forwardRef(({ country = "ghana", className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const config = COUNTRY_CONFIG[country?.toLowerCase()] || { ...DEFAULT_CONFIG, title: `Discover ${country}` };
  const slides  = config.slides || GHANA_SLIDES;

  const startAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoPlay();
  };

  return (
    <div ref={ref} className={classNames("w-full", className)} {...props}>

      {/* ── HERO (Figma 1914:40901) — 1728×717px ──────────────────────────── */}
      <section className="relative w-full h-[420px] md:h-[550px] lg:h-[717px] overflow-hidden">

        {/* Slide images + overlay */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={classNames(
              "absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out",
              i === current ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
            )}
          >
            <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
            {/* Same overlay as TourHero: rgba(0,0,0,0.3) linear + purple radial */}
            <div className="absolute inset-0 z-[15]" style={OVERLAY_STYLE} />
          </div>
        ))}

        {/* ── Content block (1914:40906): flex-col gap-[12px] items-center ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[12px] z-30 px-6 md:px-10">

          {/* Title + Subtitle */}
          <div className="flex flex-col items-center gap-[12px] w-full max-w-[957px]">
            {/* Title — Raleway Bold 56px/66px #fefefe (1914:40908) */}
            <h1
              className="text-center w-full"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 700,
                color:      "#fefefe",
              }}
            >
              <span className="block text-[28px] leading-[36px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[66px]">
                {config.title}
              </span>
            </h1>

            {/* Subtitle — Raleway Medium 16px/26px #fefefe (1914:40910) */}
            <div className="w-full max-w-[867px]">
              <p
                className="text-center"
                style={{
                  fontFamily: "Raleway, sans-serif",
                  fontWeight: 500,
                  color:      "#fefefe",
                }}
              >
                <span className="block text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-2">
                  {config.subtitle}
                </span>
              </p>
            </div>
          </div>

          {/* ── Stats row (1942:30741) — gap-[24px], no dividers ─────────── */}
          <div className="grid grid-cols-2 gap-4 md:flex md:items-start md:gap-[24px]">
            {[
              { value: config.stats.tours,   label: "Tours Available" },
              { value: config.stats.regions, label: "Regions Covered" },
              { value: config.stats.rating,  label: "Avg. Rating" },
              { value: config.stats.guides,  label: "Local Guides" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center w-[120px] md:w-[180px]">
                {/* Number — Raleway Bold #ebdff5 */}
                <span className="text-[32px] leading-[40px] md:text-[44px] md:leading-[54px] lg:text-[56px] lg:leading-[66px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, color: "#ebdff5" }}>
                  {stat.value}
                </span>
                {/* Label — Raleway Medium #ebdff5 */}
                <span className="text-[12px] leading-[18px] md:text-[14px] md:leading-[22px] lg:text-[16px] lg:leading-[26px]" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, color: "#ebdff5" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot navigation — bottom:22px, gap:12px (1914:40903/40904) ─── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[12px] z-40"
          style={{ bottom: "22px" }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="shrink-0 transition-opacity duration-300 ease-in"
              aria-label={i === current ? "Current slide" : `Go to slide ${i + 1}`}
            >
              <img
                src={i === current ? slideDotActive : slideDotInactive}
                alt=""
                width={16}
                height={16}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── INFO BAR (Figma 1942:30897) — 1728×138px ─────────────────────── */}
      {/* Structure: 16px flag strip at top + 109px items row + 13px bottom  */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "138px", backgroundColor: "#2b0f43" }}
      >
        {/* Flag strip — 16px, full width, country flag colours repeating */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height:     "10px",
            background: getFlagStripBg(config.flagColors),
          }}
        />

        {/* Items row — centred horizontally, 109px tall, starts at y=16 */}
        {/* gap-[32px] with 1px dividers between each item (Figma 1942:31034 etc.) */}
        <div
          className="absolute left-0 right-0 flex items-center lg:justify-center gap-[20px] lg:gap-[32px] overflow-x-auto scrollbar-hide"
          style={{ top: "16px", height: "109px", paddingLeft: "24px", paddingRight: "24px" }}
        >
          {INFO_BAR_ITEMS(config).map((item, idx, arr) => (
            <React.Fragment key={item.label}>
              {/* Info item: icon + text block */}
              <div className="flex items-center gap-[12px] shrink-0">
                {/* Icon — 24×24px, colour #D6BEEB */}
                <div className="shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  {item.icon}
                </div>

                {/* Text block — w-[143px], flex-col gap-[4px] items-center */}
                <div className="flex flex-col gap-[4px] items-center" style={{ width: "143px" }}>
                  {/* Label — Raleway SemiBold 10px #d6beeb (Figma typo "VIST" kept) */}
                  <p
                    className="w-full text-center"
                    style={{
                      fontFamily:    "Raleway, sans-serif",
                      fontSize:      "10px",
                      fontWeight:    600,
                      lineHeight:    "normal",
                      color:         "#d6beeb",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </p>

                  {/* Value — h-[54px] wrapper to centre multi-line text (1942:31031) */}
                  <div
                    className="flex items-center justify-center w-full"
                    style={{ height: "54px", padding: "10px" }}
                  >
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "Raleway, sans-serif",
                        fontSize:   "13px",
                        fontWeight: 500,
                        lineHeight: "22px",
                        color:      "#c6c6c6",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider — 1px × 109px, bg-[#371456] (Figma 1942:31034 etc.) */}
              {idx < arr.length - 1 && (
                <div
                  className="shrink-0"
                  style={{ width: "1px", height: "109px", backgroundColor: "#371456" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
});

// ── Info bar item definitions ──────────────────────────────────────────────────
function INFO_BAR_ITEMS(config) {
  return [
    {
      label: "BEST TIME TO VIST", // "VIST" typo matches Figma exactly
      value: config.bestTime,
      icon:  <img src={iconCalendar}    alt="" width={24} height={24} />,
    },
    {
      label: "CURRENCY",
      value: config.currency,
      icon:  <img src={iconCurrency}    alt="" width={24} height={24} />,
    },
    {
      label: "LANGUAGES",
      value: config.languages,
      icon:  <img src={iconLanguage}    alt="" width={24} height={24} />,
    },
    {
      label: "MAIN ENTRY",
      value: config.mainEntry,
      icon:  <img src={iconMainEntry}   alt="" width={24} height={24} />,
    },
    {
      label: "TIME ZONE",
      value: config.timeZone,
      icon:  <img src={iconClock}       alt="" width={24} height={24} />,
    },
    {
      label: "CLIMATE",
      value: config.climate,
      icon:  <img src={iconTemperature} alt="" width={24} height={24} />,
    },
  ];
}

TourCountryHero.displayName = "TourCountryHero";
export default TourCountryHero;
