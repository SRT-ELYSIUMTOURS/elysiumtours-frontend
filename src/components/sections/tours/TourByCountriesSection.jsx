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
      className={classNames("w-full bg-white py-[80px]", className)}
      {...props}
    >
      <div className="px-[156px]">
        {/* Section header */}
        <div className="flex items-start justify-between w-full mb-[94px]">
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
          <div style={{ width: "795px" }}>
            <h2
              style={{
                fontFamily: "Raleway, sans-serif",
                fontSize: "25px",
                fontWeight: 700,
                lineHeight: "34px",
                color: "#2d2d2d",
                textAlign: "right",
              }}
            >
              Journey Through the Heart of West Africa with Elysium Tours
            </h2>
          </div>
        </div>

        {/* 4×2 grid — gap-x: 32px, gap-y: 40px */}
        <div className="grid grid-cols-4 gap-x-[32px] gap-y-[40px]">
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
