import React from "react";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../../utils/classNames";
import CountryTourCard from "../../cards/CountryTourCard";

// Figma: 1903:25307 — section, bg secondary-light-default
// Header: left = line(46px) + "TOUR BY COUNTRIES" label / right = heading w-[795px] text-right
// Grid: 4×2, card 331×192, gap-x-[32px] gap-y-[40px]
const COUNTRIES = [
  { country: "Ghana",       slug: "ghana",        image: "https://picsum.photos/seed/country-ghana/331/192",    tourCount: 14 },
  { country: "Nigeria",     slug: "nigeria",      image: "https://picsum.photos/seed/country-nigeria/331/192",  tourCount: 10 },
  { country: "Togo",        slug: "togo",         image: "https://picsum.photos/seed/country-togo/331/192",     tourCount: 6  },
  { country: "Benin",       slug: "benin",        image: "https://picsum.photos/seed/country-benin/331/192",    tourCount: 5  },
  { country: "Ivory Coast", slug: "ivory-coast",  image: "https://picsum.photos/seed/country-ivory/331/192",   tourCount: 8  },
  { country: "Senegal",     slug: "senegal",      image: "https://picsum.photos/seed/country-senegal/331/192", tourCount: 7  },
  { country: "Sierra Leone",slug: "sierra-leone", image: "https://picsum.photos/seed/country-sierra/331/192",  tourCount: 4  },
  { country: "Cameroon",    slug: "cameroon",     image: "https://picsum.photos/seed/country-cameroon/331/192",tourCount: 9  },
];

const TourByCountriesSection = React.forwardRef(({ className, ...props }, ref) => {
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className={classNames("w-full bg-white py-12 md:py-16 lg:py-[80px]", className)}
      {...props}
    >
      <div className="px-6 md:px-[30px] lg:px-[156px]">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full mb-10 lg:mb-[94px] gap-4">
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
          {COUNTRIES.map((c) => (
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
