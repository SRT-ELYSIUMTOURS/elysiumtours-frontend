import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../../utils/classNames";

// ── Slide dot assets — same as TourHero (Figma 1914:40903/40904) ──────────────
import slideDotActive   from "../../../assets/ElysiumAssets/slide-dot-active.svg";
import slideDotInactive from "../../../assets/ElysiumAssets/slide-dot-inactive.svg";

// ── Info bar icon assets (Figma 1942:30898) ────────────────────────────────────
import iconCalendar    from "../../../assets/ElysiumAssets/infobar-calendar.svg";
import iconCurrency    from "../../../assets/ElysiumAssets/infobar-currency.svg";
import iconLanguage    from "../../../assets/ElysiumAssets/infobar-language.svg";
import iconMainEntry   from "../../../assets/ElysiumAssets/infobar-mainentry.svg";
import iconClock       from "../../../assets/ElysiumAssets/infobar-clock.svg";
import iconTemperature from "../../../assets/ElysiumAssets/infobar-temperature.svg";

// ── Figma overlay (1914:40901) ─────────────────────────────────────────────────
const OVERLAY_STYLE = {
  background: [
    "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)",
    "radial-gradient(ellipse 28.5% 165% at 40% 64%, rgba(132,44,207,0.4) 45.67%, rgba(104,35,164,0.555) 61.78%, rgba(77,26,120,0.71) 77.88%, rgba(43,15,67,0.8) 100%)",
  ].join(", "),
};

// ISO 3166-1 alpha-2 codes — stable, never change for sovereign nations.
// Used to build flagcdn.com URLs: https://flagcdn.com/{iso2}.svg
// Normalised key = lowercase, diacritics stripped, non-alpha removed, spaces collapsed.
const COUNTRY_ISO2 = {
  "ghana":          "gh",
  "nigeria":        "ng",
  "togo":           "tg",
  "senegal":        "sn",
  "benin":          "bj",
  "mali":           "ml",
  "burkina faso":   "bf",
  "guinea":         "gn",
  "guinea bissau":  "gw",
  "sierra leone":   "sl",
  "liberia":        "lr",
  "gambia":         "gm",
  "cameroon":       "cm",
  "cote divoire":   "ci",
  "ivory coast":    "ci",
  "niger":          "ne",
  "mauritania":     "mr",
  "cape verde":     "cv",
};

function toFlagKey(name) {
  return (name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/-/g, " ")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const DEFAULT_SLIDES = [
  { id: 1, image: "https://picsum.photos/seed/country-hero-1/1728/717", alt: "Country landscape" },
  { id: 2, image: "https://picsum.photos/seed/country-hero-2/1728/717", alt: "Country culture" },
  { id: 3, image: "https://picsum.photos/seed/country-hero-3/1728/717", alt: "Country people" },
];

// ── TourCountryHero ────────────────────────────────────────────────────────────
// Hero:     Figma 1914:40901 — 1728×717px
// Info bar: Figma 1942:30897 — 1728×138px (incl. 16px flag strip at top)
//
// countryData — Country DB document (from countriesSlice). When null, hero shows
//               generic title + destination slides; info bar shows placeholder text.
const TourCountryHero = React.forwardRef(({ country = "ghana", countryData, countryDestinations, tourCount, className, ...props }, ref) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const displayName = country
    ? country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "Country";

  // Build hero slides from destination cover images; fall back to placeholder
  const slides = React.useMemo(() => {
    if (countryDestinations && countryDestinations.length > 0) {
      const built = countryDestinations
        .filter((d) => d.coverImage)
        .map((d, i) => ({ id: i + 1, image: d.coverImage, alt: d.name }))
        .slice(0, 5);
      if (built.length > 0) return built;
    }
    return DEFAULT_SLIDES;
  }, [countryDestinations]);

  // Derive region count and climate hint from live destination data
  const regionCount = React.useMemo(() => {
    if (countryDestinations && countryDestinations.length > 0) {
      return new Set(countryDestinations.map((d) => d.region).filter(Boolean)).size;
    }
    return null;
  }, [countryDestinations]);

  const firstDest = countryDestinations && countryDestinations[0];

  // Resolve ISO2 code → flagcdn.com image URL
  const flagUrl = React.useMemo(() => {
    const key = toFlagKey(countryData?.name || country);
    const iso2 = COUNTRY_ISO2[key];
    return iso2 ? `https://flagcdn.com/${iso2}.svg` : null;
  }, [countryData, country]);


  // Build config: DB record is authoritative, sensible defaults where DB is empty
  const config = {
    title:      countryData?.heroTitle      || `Discover ${displayName}`,
    subtitle:   countryData?.heroSubtitle   || `Explore the beauty and culture of ${displayName} with Elysium Tours.`,
    currency:   countryData?.currency       || "Local Currency",
    languages:  countryData?.languages      || "Local Languages",
    mainEntry:  countryData?.mainAirport    || "International Airport",
    timeZone:   countryData?.timeZone       || "UTC+0",
    bestTime:   firstDest?.bestTimeToVisit  || "Year-round",
    climate:    firstDest?.weather?.avgTemp
      ? `Tropical, ${firstDest.weather.avgTemp}°C avg`
      : "Tropical",
    stats: {
      tours:   tourCount != null ? String(tourCount) : "0",
      regions: regionCount != null ? String(regionCount).padStart(2, "0") : "01",
      rating:  "4.8",
      guides:  "0",
    },
  };

  const startAutoPlay = React.useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    setCurrent(0);
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [slides, startAutoPlay]);

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
            <div className="absolute inset-0 z-[15]" style={OVERLAY_STYLE} />
          </div>
        ))}

        {/* ── Content block (1914:40906): flex-col gap-[12px] items-center ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[12px] z-30 px-6 md:px-10">

          {/* Title + Subtitle */}
          <div className="flex flex-col items-center gap-[12px] w-full max-w-[957px]">
            <h1
              className="text-center w-full"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, color: "#fefefe" }}
            >
              <span className="block text-[28px] leading-[36px] md:text-[40px] md:leading-[50px] lg:text-[56px] lg:leading-[66px]">
                {config.title}
              </span>
            </h1>
            <div className="w-full max-w-[867px]">
              <p className="text-center" style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, color: "#fefefe" }}>
                <span className="block text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] px-2">
                  {config.subtitle}
                </span>
              </p>
            </div>
          </div>

          {/* ── Stats row (1942:30741) — gap-[24px] ─────────────────────── */}
          <div className="grid grid-cols-2 gap-4 md:flex md:items-start md:gap-[24px]">
            {[
              { value: config.stats.tours,   label: "Tours Available" },
              { value: config.stats.regions, label: "Regions Covered" },
              { value: config.stats.rating,  label: "Avg. Rating" },
              { value: config.stats.guides,  label: "Local Guides" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center w-[120px] md:w-[180px]">
                <span
                  className="text-[32px] leading-[40px] md:text-[44px] md:leading-[54px] lg:text-[56px] lg:leading-[66px]"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700, color: "#ebdff5" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[12px] leading-[18px] md:text-[14px] md:leading-[22px] lg:text-[16px] lg:leading-[26px]"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500, color: "#ebdff5" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot navigation — bottom:22px (1914:40903/40904) ─────────── */}
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
              <img src={i === current ? slideDotActive : slideDotInactive} alt="" width={16} height={16} />
            </button>
          ))}
        </div>
      </section>

      {/* ── INFO BAR (Figma 1942:30897) — 1728×138px ─────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "138px", backgroundColor: "#2b0f43" }}
      >
        {/* Flag strip — 20 fixed 100px tiles, overflow-hidden clips the last partial one */}
        <div
          className="absolute top-0 left-0 w-full flex items-center overflow-hidden"
          style={{ height: "10px", backgroundColor: "#2b0f43", justifyContent: "space-between" }}
        >
          {flagUrl && Array.from({ length: 20 }).map((_, i) => (
            <img
              key={i}
              src={flagUrl}
              alt=""
              aria-hidden="true"
              style={{ flex: "0 0 50px", height: "10px", objectFit: "fill", display: "block" }}
            />
          ))}
        </div>

        {/* Items row */}
        <div
          className="absolute left-0 right-0 flex items-center lg:justify-center gap-[20px] lg:gap-[32px] overflow-x-auto scrollbar-hide"
          style={{ top: "16px", height: "109px", paddingLeft: "24px", paddingRight: "24px" }}
        >
          {INFO_BAR_ITEMS(config).map((item, idx, arr) => (
            <React.Fragment key={item.label}>
              <div className="flex items-center gap-[12px] shrink-0">
                <div className="shrink-0 w-[24px] h-[24px] flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-[2px] items-center w-[160px] lg:w-[143px]">
                  <p className="w-full text-center font-raleway font-semibold uppercase text-[10px] text-[#d6beeb]">
                    {item.label}
                  </p>
                  <p className="text-center font-raleway font-medium text-[13px] leading-[18px] text-[#c6c6c6] whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </div>
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

function INFO_BAR_ITEMS(config) {
  return [
    { label: "BEST TIME TO VIST", value: config.bestTime,  icon: <img src={iconCalendar}    alt="" width={24} height={24} /> },
    { label: "CURRENCY",          value: config.currency,  icon: <img src={iconCurrency}    alt="" width={24} height={24} /> },
    { label: "LANGUAGES",         value: config.languages, icon: <img src={iconLanguage}    alt="" width={24} height={24} /> },
    { label: "MAIN ENTRY",        value: config.mainEntry, icon: <img src={iconMainEntry}   alt="" width={24} height={24} /> },
    { label: "TIME ZONE",         value: config.timeZone,  icon: <img src={iconClock}       alt="" width={24} height={24} /> },
    { label: "CLIMATE",           value: config.climate,   icon: <img src={iconTemperature} alt="" width={24} height={24} /> },
  ];
}

TourCountryHero.displayName = "TourCountryHero";
export default TourCountryHero;
