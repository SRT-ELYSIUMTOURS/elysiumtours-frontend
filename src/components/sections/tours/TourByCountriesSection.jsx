import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import CountryTourCard from "../../cards/CountryTourCard";

// Replicates slugify(name, { lower: true, strict: true }) from the backend.
// NFD decomposition strips diacritics (ô→o, é→e), then non-alphanumeric
// chars (apostrophes, etc.) are removed, spaces become hyphens.
function toCountrySlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const buildCards = (apiDestinations) => {
  if (!apiDestinations || apiDestinations.length === 0) return null;

  const map = {};
  apiDestinations.forEach((dest) => {
    const key = (dest.country || "Ghana").toLowerCase();
    if (!map[key]) {
      map[key] = {
        country: dest.country || "Ghana",
        slug: toCountrySlug(dest.country || "Ghana"),
        image: dest.coverImage || (dest.images && dest.images[0]) || null,
        tourCount: 0,
      };
    }
    if (!map[key].image) {
      map[key].image = dest.coverImage || (dest.images && dest.images[0]) || null;
    }
  });

  const seen = new Set();
  return Object.values(map).filter((c) => {
    const k = c.country.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const TourByCountriesSection = React.forwardRef(({ className, destinations: apiDestinations, tours, ...props }, ref) => {
  const navigate = useNavigate();

  const cards = React.useMemo(() => {
    const base = buildCards(apiDestinations);
    if (!base) return null;
    if (!tours) return base;

    const countMap = {};
    tours.forEach((t) => {
      const key = (t.country || "ghana").toLowerCase();
      countMap[key] = (countMap[key] || 0) + 1;
    });

    return base.map((card) => ({
      ...card,
      tourCount: countMap[card.country.toLowerCase()] ?? card.tourCount,
    }));
  }, [apiDestinations, tours]);

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-white py-12 md:py-16 lg:py-[80px]", className)}
      {...props}
    >
      <div className="px-6 md:px-[30px] lg:px-[156px]">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row items-start justify-between w-full mb-10 lg:mb-[94px] gap-4">
          {/* Left — line + label */}
          <div className="flex items-center gap-[8px] shrink-0">
            <div className="w-[46px] h-[1px] bg-secondary-dark-darker" />
            <span
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                lineHeight: "18px",
                color: "#2b0f43",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Tour By Countries
            </span>
          </div>

          {/* Right — heading */}
          <div className="w-full lg:w-[795px]">
            <h2
              className="text-center lg:text-right text-[22px] leading-[30px] lg:text-[25px] lg:leading-[34px]"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 700,
                color: "#2d2d2d",
              }}
            >
              Journey Through the Heart of West Africa with Elysium Tours
            </h2>
          </div>
        </div>

        {/* Responsive grid: 2 cols mobile, 3 tablet, 4 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 lg:gap-x-[32px] gap-y-6 lg:gap-y-[40px]">
          {cards && cards.map((c) => (
            <CountryTourCard
              key={c.slug}
              country={c.country}
              image={c.image}
              tourCount={c.tourCount}
              onClick={() => navigate(`/tours/${c.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

TourByCountriesSection.displayName = "TourByCountriesSection";
export default TourByCountriesSection;
